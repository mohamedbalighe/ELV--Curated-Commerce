
"use client";

import Link from "next/link";
import { forgotPassword_Fun } from "@/app/_components/Api/actions/forgotPassword_Fun";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export type ForgotPasswordData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  async function userEmail(data: ForgotPasswordData) {
    try {
      const result = await forgotPassword_Fun(data.email);

      if (result.statusMsg === "success") {
        toast.success(
          "If an account exists with this email, password reset instructions have been sent."
        );

        router.push(
          `/verify-reset-code?email=${encodeURIComponent(data.email)}`
        );
      } else {
        toast.error(
          "We couldn't process your request. Please try again."
        );
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    }
  }

  return (
    <main className="min-h-screen bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border  pb-5">
          <Link
            href="/login"
            aria-label="Back to login"
            className="flex items-center gap-2 text-[10px] font-medium tracking-[0.14em] text-[#82776F] transition hover:text-[#806317] sm:text-xs"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">BACK TO LOGIN</span>
            <span className="sm:hidden">BACK</span>
          </Link>

          <Link
            href="/Shop"
            className="font-serif text-2xl font-medium tracking-[0.16em] sm:text-3xl"
          >
            ELVÉ
          </Link>

          <div className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] text-[#82776F] sm:text-[10px]">
            <LockKeyhole size={13} />
            <span>SECURE ACCESS</span>
          </div>
        </header>

        {/* Recovery Content */}
        <section className="flex flex-1 items-center justify-center py-12 sm:py-16">
          <div className="w-full max-w-[480px]">
            {/* Step Indicator */}
            <div
              className="mb-6 flex items-center justify-center gap-3"
              aria-label="Step 1 of 3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#D4AF37] text-xs font-semibold text-[#171717]">
                1
              </span>

              <span className="h-px w-10 bg-[#D4AF37]/50" />

              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border  bg-card  text-xs text-[#82776F]">
                2
              </span>

              <span className="h-px w-10 bg-[#E4DCD3]" />

              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border  bg-card  text-xs text-[#82776F]">
                3
              </span>
            </div>

            <div className="overflow-hidden rounded-sm border border-border  bg-card  shadow-[0_20px_70px_rgba(50,35,25,0.06)]">
              {/* Card Accent */}
              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="px-6 py-9 sm:px-10 sm:py-11">
                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-sm border border-[#D4AF37]/40 bg-[#FBF7E9] text-[#806317]">
                  <Mail size={25} strokeWidth={1.5} />
                </div>

                {/* Heading */}
                <div className="mb-8">
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#806317]">
                    ACCOUNT RECOVERY · STEP 01
                  </p>

                  <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                    Forgot your password?
                  </h1>

                  <p className="mt-4 text-sm leading-6 text-[#82776F]">
                    It happens. Enter the email address associated
                    with your account, and we&apos;ll guide you through
                    resetting your password.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit(userEmail)}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-semibold tracking-[0.1em] text-foreground "
                    >
                      EMAIL ADDRESS
                    </label>

                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className="h-13 w-full rounded-sm border border-border  bg-white px-4 pr-11 text-sm outline-none transition placeholder:text-[#B3A9A1] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15"
                      />

                      <Mail
                        size={17}
                        strokeWidth={1.6}
                        aria-hidden="true"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#82776F]"
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-[#171717] px-5 text-xs font-semibold tracking-[0.1em] text-white transition hover:bg-[#D4AF37] hover:text-[#171717] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "SENDING INSTRUCTIONS..."
                      : "SEND RESET INSTRUCTIONS"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                {/* Security Note */}
                <div className="mt-6 flex items-start gap-3 rounded-sm border border-border  bg-background  p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#B89625]"
                    strokeWidth={1.5}
                  />

                  <div>
                    <p className="text-xs font-semibold text-foreground ">
                      Your account stays protected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#82776F]">
                      We&apos;ll help you securely verify your identity
                      before you create a new password.
                    </p>
                  </div>
                </div>

                {/* Back to Login */}
                <div className="mt-7 border-t border-border  pt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#806317] transition hover:text-foreground "
                  >
                    <ArrowLeft size={16} />
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="mt-6 text-center text-[10px] tracking-[0.08em] text-[#82776F]">
              ELVÉ · CONSIDERED GOODS. EVERYDAY LIVING.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-border  pt-5 text-center text-[9px] tracking-[0.12em] text-[#82776F] sm:flex-row sm:text-left">
          <span>
            © {new Date().getFullYear()} ELVÉ. ALL RIGHTS RESERVED.
          </span>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-[#806317]"
            >
              PRIVACY
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#806317]"
            >
              TERMS
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
