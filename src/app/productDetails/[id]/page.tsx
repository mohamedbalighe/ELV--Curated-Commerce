
import Image from "next/image";
import {
  Check,
  Plus,
  ShieldCheck,
  Truck,
  PackageCheck,
  ShoppingBag,
  Star,
  ArrowUpRight,
} from "lucide-react";

import AddBtn from "@/app/_components/AddBtn/AddBtn";
import WishListBtn from "@/app/_components/AddWishlistBtn/AddWishlistBtn";
import { getProductDetails } from "@/app/_components/Api/actions/ProductApi";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import Slider from "@/app/_components/Slider/Slider";

export default async function ProductDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const product = await getProductDetails(id);

  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount > 0 &&
    product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) /
          product.price) *
          100
      )
    : null;

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  return (
    <main className="min-h-screen bg-background  text-foreground ">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1600px] px-4 pt-5 sm:px-7 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/Categories" },
            ...(product.category
              ? [
                  {
                    label: product.category.name,
                    href: `/Categories/${product.category._id}`,
                  },
                ]
              : []),
            { label: product.title },
          ]}
        />
      </div>

      {/* Product layout */}
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-4 pb-16 pt-6 sm:px-7 md:grid-cols-2 md:gap-10 lg:gap-16 lg:px-12 lg:pb-24 lg:pt-10">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="group relative overflow-hidden border border-border  bg-card ">
            <div className="relative flex aspect-[4/5] items-center justify-center p-5 sm:p-9 lg:p-12">
              <span className="absolute left-4 top-4 z-10 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#806317] sm:left-6 sm:top-6">
                ELVÉ / OBJECTS OF DESIRE
              </span>

              {discountPercentage !== null && (
                <span className="absolute bottom-4 rounded-sm left-4 z-10 bg-[#171717] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:bottom-6 sm:left-6">
                  Save {discountPercentage}%
                </span>
              )}

              <Image
                src={product.imageCover}
                alt={product.title}
                width={1000}
                height={1250}
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />

              <span className="pointer-events-none absolute inset-0 border border-[#211D1B]/[0.04]" />
            </div>
          </div>

          {/* Product images */}
          {product.images?.length > 0 && (
            <div className="mt-4">
              <Slider
                spaceBetween={12}
                slidesPerView={3}
                PageList={product.images}
              />
            </div>
          )}
        </div>

        {/* Product information */}
        <div className="flex min-w-0 flex-col md:py-3 lg:py-6">
          {/* Brand and category */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#806317]">
              {product.brand?.name || "ELVÉ"}
            </span>

            {product.category?.name && (
              <>
                <span className="h-px w-5 bg-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#82776F]">
                  {product.category.name}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-5 max-w-2xl font-serif text-3xl font-normal leading-[1.12] tracking-[-0.035em] sm:text-4xl lg:text-[52px]">
            {product.title}
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#82776F]">
            Carefully selected for those who appreciate exceptional design
            and considered details.
          </p>

          {/* Rating */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-border  pb-6">
            <Star
              size={14}
              fill="#D4AF37"
              stroke="#D4AF37"
              strokeWidth={1.3}
            />

            <span className="text-xs font-medium tabular-nums">
              {product.ratingsAverage ?? "New"}
            </span>

            <span className="text-xs text-[#82776F]">
              ({product.ratingsQuantity ?? 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#82776F]">
              Price
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-3xl font-medium tracking-tight tabular-nums sm:text-4xl">
                {currentPrice.toLocaleString("en-US")}
                <span className="ml-2 text-xs font-normal uppercase tracking-[0.12em] text-[#82776F]">
                  EGP
                </span>
              </span>

              {discountPercentage !== null && (
                <>
                  <span className="text-sm text-[#82776F] line-through">
                    {product.price.toLocaleString("en-US")} EGP
                  </span>

                  <span className="border rounded-sm border-[#D4AF37] bg-[#FBF7E9] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#806317]">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#D4AF37]" />
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                The details
              </h2>
            </div>

            <p className="mt-4 max-w-xl whitespace-pre-line text-sm leading-7 text-[#82776F]">
              {product.description ||
                "Detailed product information will be available soon."}
            </p>
          </div>

          {/* Purchase actions */}
          <div className="mt-8 border-t border-border  pt-6">
            <div className="flex items-stretch gap-3">
              <div className="min-w-0 flex-1">
                <AddBtn
                  prodId={product._id}
                  cls="group flex min-h-14 w-full rounded items-center justify-center gap-3 bg-[#171717] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#171717]"
                  child={
                    <>
                      <ShoppingBag size={17} strokeWidth={1.5} />
                      <span>Add to bag</span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  }
                />
              </div>

              <WishListBtn
                className="flex h-14 w-14 shrink-0 rounded-sm items-center justify-center border border-border  bg-card  text-foreground  transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] active:scale-95"
                prodId={product._id}
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Check size={13} className="shrink-0 text-[#B89625]" />
              <p className="text-center text-[10px] leading-5 text-[#82776F]">
                Prices are displayed in EGP. Availability may vary.
              </p>
            </div>
          </div>

          {/* Information accordions */}
          <div className="mt-8 divide-y divide-[#E4DCD3] border-y border-border ">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] marker:hidden">
                Product information
                <Plus
                  size={16}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B89625] transition-transform duration-300 group-open:rotate-45"
                />
              </summary>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#82776F]">
                {product.description ||
                  "No additional product information is available."}
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] marker:hidden">
                Shipping & delivery
                <Plus
                  size={16}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B89625] transition-transform duration-300 group-open:rotate-45"
                />
              </summary>

              <p className="mt-4 text-sm leading-7 text-[#82776F]">
                Available shipping options and delivery estimates are
                confirmed during checkout.
              </p>
            </details>
          </div>

          {/* Brand signature */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="font-serif text-lg tracking-[0.12em]">
              ELVÉ
            </span>
            <span className="text-right text-[9px] uppercase leading-5 tracking-[0.16em] text-[#806317]">
              Considered design.
              <br />
              Timeless appeal.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
