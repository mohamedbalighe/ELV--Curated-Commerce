
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ArrowUpRight } from "lucide-react";
import { ProductType } from "../Api/services/Types/productType";
import AddBtn from "../AddBtn/AddBtn";
import WishListBtn from "../AddWishlistBtn/AddWishlistBtn";

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
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
    : 0;

  return (
    <article className="group min-w-0 bg-background text-foreground border border-border">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-background  dark:bg-gray-800">
        <Link
          href={`/productDetails/${product._id}`}
          aria-label={`View ${product.title}`}
          className="relative block aspect-[3/4] overflow-hidden "
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 639px)  50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-contain dark:bg-black p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-5"
          />

          <div className="pointer-events-none absolute inset-0 border border-[#211D1B]/[0.05]" />

          {hasDiscount ? (
            <span className="absolute rounded-sm left-2.5 top-2.5 bg-[#171717] px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white sm:left-3 sm:top-3">
              Save {discountPercentage}%
            </span>
          ) : (
            <span className="absolute left-2.5 top-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#82776F] sm:left-3 sm:top-3">
              ELVÉ Edit
            </span>
          )}
        </Link>

        {/* Wishlist */}
        <div className="absolute right-2.5 top-2.5 z-20 sm:right-3 sm:top-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border  bg-card /95 transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]">
            <WishListBtn
              prodId={product._id}
              className="dark:bg-black dark:text-amber-500 flex h-full w-full items-center justify-center rounded-full bg-transparent text-foreground  transition-colors hover:bg-transparent hover:text-foreground "
            />
          </div>
        </div>

        {/* Quick View */}
        <Link
          href={`/productDetails/${product._id}`}
          aria-label={`Discover ${product.title}`}
          className="dark:bg-black dark:text-white absolute bottom-3 left-3 right-3 z-10 hidden items-center justify-between border border-border  bg-card  px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground  opacity-0 shadow-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] group-hover:opacity-100 sm:flex"
        >
          View product
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Product Details */}
      <div className="pt-3.5 sm:pt-4 dark:px-3 dark:py-3 py-3 px-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-[#806317] sm:text-[10px]">
              {product.brand?.name || "ELVÉ"}
            </p>

            <Link href={`/productDetails/${product._id}`}>
              <h3 className="mt-1.5 dark:text-gray-200 line-clamp-2 min-h-10 font-serif text-[15px] font-normal leading-snug text-foreground  transition-colors duration-300 group-hover:text-[#806317] sm:text-lg">
                {product.title}
              </h3>
            </Link>

            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-[#82776F]">
              {product.category?.name || "Collection"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 pt-0.5">
            <Star
              size={12}
              fill="#D4AF37"
              stroke="#D4AF37"
              strokeWidth={1.3}
            />
            <span className="text-[11px] tabular-nums dark:text-gray-200 text-foreground ">
              {typeof product.ratingsAverage === "number"
                ? product.ratingsAverage.toFixed(1)
                : product.ratingsAverage ?? "—"}
            </span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-border  pt-3">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm dark:text-gray-200 font-semibold tabular-nums text-foreground  sm:text-base">
              {hasDiscount
                ? product.priceAfterDiscount
                : product.price}{" "}
              <span className="text-[9px] font-medium uppercase tracking-wide dark:text-gray-100 text-[#82776F]">
                EGP
              </span>
            </span>

            {hasDiscount && (
              <span className="text-[11px]  tabular-nums text-[#82776F] line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <AddBtn
            prodId={product._id}
            cls="flex h-9 dark:text-gray-200 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-transparent text-foreground  transition-all duration-300 hover:bg-[#D4AF37] active:scale-95 sm:h-10 sm:w-10"
            child={<Plus size={18} strokeWidth={1.5} />}
          />
        </div>
      </div>
    </article>
  );
}
