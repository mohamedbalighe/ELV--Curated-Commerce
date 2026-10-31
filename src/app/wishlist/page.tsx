import { GetWishlist } from "../_components/Api/actions/getWishlist";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { ProductType } from "../_components/Api/services/Types/productType";
import Image from "next/image";
import AddBtn from "../_components/AddBtn/AddBtn";
import Link from "next/link";
import RemoveWishlistBtn from "../_components/Api/actions/removeWishlistBtn";
import Breadcrumbs from "../_components/Breadcrumbs/Breadcrumbs";

export default async function Wishlist() {
  const data = await GetWishlist();

  return (
    <main className="min-h-screen overflow-x-clip bg-background  text-foreground ">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 min-[400px]:px-5 sm:px-8 sm:py-12 lg:px-16 lg:py-16">
        {/* Page Header */}
        <header className="mb-8 border-b border-border  pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-5  ">
        <Breadcrumbs
          items={[
            { label: "Wishlist" },
                    ]}
        />
      </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <span className="h-px w-7 shrink-0 bg-[#D4AF37] sm:w-8" />
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-accent  min-[400px]:text-[10px] sm:tracking-[0.25em]">
                  Your personal collection
                </p>
              </div>

              <h1 className="font-serif text-4xl font-normal tracking-[-0.04em] min-[400px]:text-5xl sm:text-5xl lg:text-6xl">
                Wishlist<span className="text-accent ">.</span>
              </h1>

              <p className="mt-3 max-w-md text-[13px] leading-6 text-[#82776F] sm:mt-4 sm:text-sm sm:leading-7">
                The pieces you love, thoughtfully kept in one place.
                Return to your favourites whenever you like.
              </p>
            </div>

            {/* Wishlist Count */}
            <div className="flex w-fit items-center gap-4 border-t border-border  pt-4 sm:shrink-0 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <Heart
                size={20}
                strokeWidth={1.3}
                className="shrink-0 text-accent "
                aria-hidden="true"
              />

              <div>
                <p className="font-serif text-3xl leading-none tabular-nums">
                  {String(data.count).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.16em] text-[#82776F] sm:tracking-[0.2em]">
                  {data.count === 1 ? "Saved item" : "Saved items"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Wishlist */}
{data.count === 0 ? (
  <section className="flex min-h-[380px] flex-col items-center justify-center bg-white px-5 py-16 text-center sm:min-h-[440px] sm:py-20">
    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-sm border border-[#EAE6E0] bg-[#FAF9F7]">
      <Heart
        size={24}
        strokeWidth={1.3}
        className="text-[#806B45]"
        aria-hidden="true"
      />
    </div>

    <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground  sm:text-3xl">
      Your wishlist is waiting
    </h2>

    <p className="mt-3 max-w-[340px] text-sm leading-7 text-[#77716B]">
      Keep the pieces you love in one place.
      Discover something worth saving.
    </p>

    <Link
      href="/shop"
      className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#211D1B] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#806B45]"
    >
      Discover the collection
      <ArrowRight size={15} strokeWidth={1.5} />
    </Link>
  </section>
        ) : (
          <>
            {/* Results Label */}
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
              <p className="text-[11px] text-[#82776F] sm:text-xs">
                Showing{" "}
                <span className="mx-1 font-semibold text-foreground ">
                  {data.count}
                </span>
                saved {data.count === 1 ? "item" : "items"}
              </p>

              <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-accent  sm:block">
                Curated by you
              </span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 min-[400px]:gap-x-4 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
              {data.data.map((product: ProductType) => {
                const discount =
                  product.priceAfterDiscount && product.price > 0
                    ? Math.round(
                        ((product.price - product.priceAfterDiscount) /
                          product.price) *
                          100
                      )
                    : 0;

                return (
                  <article
                    key={product._id}
                    className="group flex min-w-0 flex-col self-stretch"                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-card ">
                      <Link
                        href={`/productDetails/${product._id}`}
                        aria-label={`View ${product.title}`}
                        className="absolute inset-0"
                      >
                        <Image
                          width={600}
                          height={800}
                          src={product.imageCover}
                          alt={product.title}
                          sizes="(max-width: 639px) 46vw, (max-width: 1023px) 44vw, (max-width: 1279px) 30vw, 23vw"
                          className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none sm:p-4"
                        />
                      </Link>

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute left-2 top-2 z-10 rounded-sm bg-[#211D1B] px-2 py-1.5 text-[9px] font-medium tracking-wide text-white sm:left-3 sm:top-3 sm:px-2.5">
                          -{discount}%
                        </span>
                      )}

                      {/* Remove from Wishlist */}
                      <div className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
                        <RemoveWishlistBtn prodId={product._id} />
                      </div>

                      {/* Hover Label */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center justify-between bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex sm:px-4 sm:pb-4">
                        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white sm:text-[10px]">
                          View product
                        </span>

                        <ArrowRight
                          size={15}
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      </div>
                    </div>

                    {/* Product Information */}
                      <div className="flex flex-1 flex-col pt-3 sm:pt-4">     
                         <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-accent  sm:text-[10px] sm:tracking-[0.16em]">
                        {product.brand?.name || "ELVÉ EDIT"}
                      </p>

                      <Link
                        href={`/productDetails/${product._id}`}
                        className="mt-1.5 block"
                      >
                        <h2 className="line-clamp-2 font-serif text-[13px] leading-snug transition-colors duration-300 group-hover:text-accent  min-[400px]:text-sm sm:text-base">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Rating */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-[#82776F] sm:text-[11px]">
                        <span className="text-accent ">★</span>
                        <span>{product.ratingsAverage ?? "—"}</span>

                        {product.ratingsQuantity ? (
                          <span className="text-[#82776F]">
                            · {product.ratingsQuantity} reviews
                          </span>
                        ) : null}
                      </div>

                      {/* Price */}
                      <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {product.priceAfterDiscount ? (
                          <>
                            <span className="text-[13px] font-semibold tabular-nums text-foreground  sm:text-sm">
                              {product.priceAfterDiscount} EGP
                            </span>

                            <span className="text-[10px] tabular-nums text-[#82776F] line-through sm:text-[11px]">
                              {product.price} EGP
                            </span>
                          </>
                        ) : (
                          <span className="text-[13px] font-semibold tabular-nums text-foreground  sm:text-sm">
                            {product.price} EGP
                          </span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <AddBtn
                        prodId={product._id}
                        cls="mt-3 flex min-h-11 w-full items-center justify-center rounded-sm border border-[#211D1B] bg-[#211D1B] px-1.5 py-3 text-[9px] font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-foreground  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] min-[400px]:gap-2 min-[400px]:tracking-[0.08em] sm:mt-5 sm:px-2 sm:text-[10px] sm:tracking-[0.14em]"
                        child={
                          <div className="flex items-center justify-center gap-1.5 min-[400px]:gap-2">
                            <ShoppingBag
                              size={14}
                              strokeWidth={1.5}
                              className="shrink-0"
                            />
                            <span>Add to bag</span>
                          </div>
                        }
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* Brand Signature */}
        <footer className="mt-12 border-t border-border  pt-7 sm:mt-20 sm:pt-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-accent  sm:tracking-[0.24em]">
                The ELVÉ philosophy
              </p>

              <p className="mt-3 font-serif text-xl leading-snug sm:text-2xl">
                Distinctive by nature. Timeless by design.
              </p>
            </div>

            <Link
              href="/Shop"
              className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#D4AF37] pb-2 text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-accent  sm:text-[10px] sm:tracking-[0.15em]"
            >
              Continue exploring
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
