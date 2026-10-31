"use client";

import { useForm } from "react-hook-form";
import { PayCash } from "../_components/Api/actions/Payments/payCash.Action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PayOnline } from "../_components/Api/actions/Payments/payOnline.Action";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { CardResponseType } from "../_components/Api/services/Types/CardType";
import Link from "next/link";

export type CheckoutFormData = {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
};

export default function CheckoutForm({
  cartId,
  data,
}: {
  cartId: string;
  data?: CardResponseType;
}) {
  const router = useRouter();
  const query = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      paymentMethod: "Cash",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const watchedDetails = watch("details");
  const watchedPhone = watch("phone");
  const watchedCity = watch("city");
  const watchedPostal = watch("postalCode");

  async function PaymentMethod(formData: CheckoutFormData) {
    try {
      if (formData.paymentMethod === "Cash") {
        toast.info("Processing your Cash on Delivery order...");
        await HandlePaycashFun(formData);
        return;
      }

      if (formData.paymentMethod === "Online") {
        toast.info("Redirecting to secure payment gateway...");
        await HandleOnlineFun(formData);
        return;
      }

      toast.warning("Please select a payment method to continue.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function HandlePaycashFun(formData: CheckoutFormData) {
    try {
      const payload = await PayCash(cartId, formData);

      if (payload.status === "success") {
        toast.success("Order placed! We will deliver it to your door.");
        await query.invalidateQueries({ queryKey: ["getcart"] });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to place your order. Please check your details and try again."
      );
    }
  }

  async function HandleOnlineFun(formData: CheckoutFormData) {
    try {
      const payload = await PayOnline(cartId, formData);

      if (payload.status === "success") {
        toast.success("Payment session created! Redirecting now...");
        window.location.href = payload.session.url;
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not connect to the payment gateway. Please try again later."
      );
    }
  }

  const inputClassName =
    "w-full min-w-0 rounded-sm border border-border bg-background px-3.5 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-[#A39A90] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 sm:px-4";

  const labelClassName =
    "mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground sm:text-[10px] sm:tracking-[0.16em]";

  const hasShippingInfo =
    watchedCity || watchedPhone || watchedDetails || watchedPostal;

  const shippingFields = [
    { label: "Address", value: watchedDetails },
    { label: "Phone", value: watchedPhone },
    { label: "City", value: watchedCity },
    { label: "Postal code", value: watchedPostal },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-6 sm:mb-12 sm:pb-9">
          <p className="mb-4 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.19em] text-[#806317] sm:text-[10px] sm:tracking-[0.24em]">
            <span className="h-px w-7 shrink-0 bg-[#D4AF37] sm:w-8" />
            ELVÉ / Secure checkout
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="min-w-0">
              <h1 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] min-[400px]:text-4xl sm:text-5xl">
                Complete your
                <span className="block italic text-[#D4AF37]">
                  purchase.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-[13px] leading-6 text-[#82776F] sm:text-sm sm:leading-7">
                A considered final step. Confirm your delivery details and
                select your preferred payment method.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.13em] text-[#82776F] sm:text-[10px] sm:tracking-[0.16em]">
              <ShieldCheck
                size={18}
                strokeWidth={1.3}
                className="shrink-0 text-[#D4AF37]"
              />
              Secure checkout
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(PaymentMethod)}
          className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[minmax(0,1fr)_350px] xl:gap-10"
        >
          {/* Main Form */}
          <div className="min-w-0 space-y-6 sm:space-y-7">
            {/* Shipping Information */}
            <section className="min-w-0 border border-border bg-background p-4 min-[400px]:p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3 border-b border-border pb-5 sm:mb-7 sm:gap-4 sm:pb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background text-[#D4AF37] sm:h-11 sm:w-11">
                  <MapPin size={20} strokeWidth={1.3} />
                </div>

                <div className="min-w-0">
                  <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#D4AF37] sm:tracking-[0.2em]">
                    Step 01
                  </p>

                  <h2 className="font-serif text-xl tracking-[-0.025em] sm:text-2xl">
                    Shipping information
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#82776F]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="details" className={labelClassName}>
                    Address details
                  </label>
                  <input
                    id="details"
                    {...register("details", { required: true })}
                    type="text"
                    autoComplete="street-address"
                    placeholder="Street, building, apartment..."
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClassName}>
                    Phone number
                  </label>
                  <input
                    id="phone"
                    {...register("phone", { required: true })}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+20 100 000 0000"
                    className={inputClassName}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClassName}>
                      City
                    </label>
                    <input
                      id="city"
                      {...register("city", { required: true })}
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Cairo"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className={labelClassName}>
                      Postal code
                    </label>
                    <input
                      id="postalCode"
                      {...register("postalCode", { required: true })}
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="12345"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="min-w-0 border border-border bg-background p-4 min-[400px]:p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3 border-b border-border pb-5 sm:mb-7 sm:gap-4 sm:pb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background text-[#806317] sm:h-11 sm:w-11">
                  <CreditCard size={20} strokeWidth={1.3} />
                </div>

                <div className="min-w-0">
                  <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#806317] sm:tracking-[0.2em]">
                    Step 02
                  </p>

                  <h2 className="font-serif text-xl tracking-[-0.025em] sm:text-2xl">
                    Payment method
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#82776F]">
                    Choose how you would like to complete your purchase.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cash */}
                <label
                  className={`flex min-w-0 cursor-pointer items-center justify-between gap-3 border p-3.5 transition-colors sm:gap-4 sm:p-4 ${
                    paymentMethod === "Cash"
                      ? "border-[#D4AF37] bg-background"
                      : "border-border hover:border-[#D4AF37]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors sm:h-11 sm:w-11 ${
                        paymentMethod === "Cash"
                          ? "bg-[#211D1B] text-[#D4AF37]"
                          : "bg-background text-[#82776F]"
                      }`}
                    >
                      <Banknote size={21} strokeWidth={1.3} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[13px] font-medium sm:text-sm">
                        Cash on delivery
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#82776F]">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      paymentMethod === "Cash"
                        ? "border-[#D4AF37]"
                        : "border-[#D8D0C5]"
                    }`}
                  >
                    {paymentMethod === "Cash" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                    )}
                  </div>

                  <input
                    {...register("paymentMethod")}
                    value="Cash"
                    type="radio"
                    className="sr-only"
                  />
                </label>

                {/* Online */}
                <label
                  className={`flex min-w-0 cursor-pointer items-center justify-between gap-3 border p-3.5 transition-colors sm:gap-4 sm:p-4 ${
                    paymentMethod === "Online"
                      ? "border-[#D4AF37] bg-background"
                      : "border-border hover:border-[#D4AF37]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors sm:h-11 sm:w-11 ${
                        paymentMethod === "Online"
                          ? "bg-[#211D1B] text-[#D4AF37]"
                          : "bg-background text-[#82776F]"
                      }`}
                    >
                      <CreditCard size={21} strokeWidth={1.3} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[13px] font-medium sm:text-sm">
                        Online payment
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#82776F]">
                        Pay securely through the payment gateway
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      paymentMethod === "Online"
                        ? "border-[#D4AF37]"
                        : "border-[#D8D0C5]"
                    }`}
                  >
                    {paymentMethod === "Online" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-background" />
                    )}
                  </div>

                  <input
                    {...register("paymentMethod")}
                    value="Online"
                    type="radio"
                    className="sr-only"
                  />
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-border bg-background px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[#D4AF37] hover:text-[#806317] sm:text-[10px] sm:tracking-[0.13em]"
              >
                <ArrowLeft size={15} strokeWidth={1.5} />
                Back to shopping
              </Link>

              <button
                type="submit"
                disabled={
                  !watchedCity?.trim() ||
                  !watchedPhone?.trim() ||
                  !watchedDetails?.trim() ||
                  !watchedPostal?.trim() ||
                  isSubmitting
                }
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#211D1B] px-6 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#D4AF37] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:bg-[#E4DCD3] disabled:text-[#82776F] sm:px-7 sm:text-[10px] sm:tracking-[0.16em]"
              >
                {isSubmitting ? "Processing..." : "Place order"}
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <div className="border border-border bg-background p-4 min-[400px]:p-5 sm:p-6">
              <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#806317]">
                ELVÉ / Summary
              </p>

              <h2 className="font-serif text-2xl tracking-[-0.03em]">
                Your order
              </h2>

              <div className="mt-6 flex items-center justify-between gap-3 border-b border-border pb-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-background text-[#806317]">
                    <ShoppingBag size={19} strokeWidth={1.3} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">Shopping cart</p>
                    <p className="mt-1 text-xs text-[#82776F]">
                      Order total
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-right text-sm font-medium tabular-nums">
                  {data?.data.totalCartPrice ?? "—"} EGP
                </span>
              </div>

              {/* Delivery Preview */}
              <div className="mt-6">
                <h3 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#82776F]">
                  Delivery details
                </h3>

                {hasShippingInfo ? (
                  <div className="space-y-4">
                    {shippingFields.map((item) => (
                      <div key={item.label} className="flex min-w-0 flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-[0.12em] text-[#A39A90]">
                          {item.label}
                        </span>

                        <span className="break-words text-sm text-[#302C28]">
                          {item.value?.trim() || "Not entered"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[#A39A90]">
                    Your delivery information will appear here as you fill out
                    the form.
                  </p>
                )}
              </div>

              {/* Selected Payment */}
              <div className="mt-6 border-t border-border pt-5">
                <h3 className="mb-3 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#82776F]">
                  Payment selection
                </h3>

                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-background text-[#806317]">
                    {paymentMethod === "Cash" ? (
                      <Banknote size={18} strokeWidth={1.3} />
                    ) : (
                      <CreditCard size={18} strokeWidth={1.3} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {paymentMethod === "Cash"
                        ? "Cash on delivery"
                        : "Online payment"}
                    </p>

                    <p className="mt-1 text-xs text-[#82776F]">
                      {paymentMethod === "Cash"
                        ? "Pay on arrival"
                        : "Secure online payment"}
                    </p>
                  </div>

                  <Check
                    size={16}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 text-[#806317]"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-sm font-medium">Total</span>

                  <span className="font-serif text-2xl tracking-[-0.035em] tabular-nums">
                    {data?.data.totalCartPrice ?? "—"}
                    <span className="ml-1 font-sans text-xs tracking-normal text-[#82776F]">
                      EGP
                    </span>
                  </span>
                </div>

                <p className="mt-3 text-[10px] leading-5 text-[#82776F]">
                  Shipping fees and any additional charges are calculated
                  during checkout.
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-5 text-xs leading-5 text-[#82776F]">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.3}
                  className="shrink-0 text-[#806317]"
                />
                Your order details are handled securely.
              </div>

              {/* Brand Signature */}
              <div className="mt-6 border-t border-border pt-4 text-center">
                <span className="font-serif text-sm tracking-[0.2em] text-[#806317]">
                  ELVÉ
                </span>

                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#A39A90]">
                  Curated commerce
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
