
import {SlidersHorizontal,ArrowDownWideNarrow,ArrowUpRight,} from "lucide-react";
import Link from "next/link";
import { getShopCategories } from "../_components/Api/actions/catogeryApi";
import PriceFilter from "../_components/PriceFilter/PriceFilter";
import getAllCards, {getProductsByCategory,} from "../_components/Api/actions/ProductApi";
import ProductSearch from "../_components/ProductSearch/ProductSearch";
import Breadcrumbs from "../_components/Breadcrumbs/Breadcrumbs";
import ServiceHighlights from "../_components/ServiceHighlights/ServiceHighlights";
import { getFilteredProducts } from "../_components/Api/actions/FilteredProducts";

export default async function shop({searchParams,}: {searchParams: Promise<{
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  brandId?: string;
  sort?: string;
  keyword?: string;
}>;}) {
  
  const [{ categoryId, maxPrice,minPrice, keyword ,sort , brandId }, categories] = await Promise.all([
    searchParams,
    getShopCategories(),
  ]);
  console.log("Selected categoryId:", categoryId);


const products = await getFilteredProducts({
  categoryId,
  minPrice: minPrice ? Number(minPrice) : undefined,
  maxPrice: maxPrice ? Number(maxPrice) : undefined,
  brandId,
  sort,
  keyword,
});

  const activeCategory = categories.find(
    (catogery) => catogery._id === categoryId
  );

  return (
    <main className="min-h-screen bg-background text-[#171717]">
      {/* Editorial page header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-6 sm:px-8 sm:pb-14 lg:px-16 lg:pb-16">
          <Breadcrumbs
            items={[{ label: "Shop" },...(activeCategory
                ? [{ label: activeCategory.name }]
                : []),
            ]}
          />

          <div className="mt-10 grid gap-7 md:grid-cols-[1fr_auto] md:items-end lg:mt-14">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-background" />
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-foreground">
                  The 
ELVÉ collection
                </p>
              </div>

              <h1 className="font-serif text-4xl text-foreground font-normal tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                {activeCategory?.name || "Discover"}
                {!activeCategory && (
                  <span className="block italic text-accent ">
                    your next favourite.
                  </span>
                )}
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-foreground">
                A considered selection of distinctive pieces, chosen
                for their design, quality, and lasting appeal.
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-border pt-4 md:border-t-0 md:pb-1 md:pt-0">
              <span className="text-[10px] uppercase tracking-[0.18em] text-foreground">
                Curated
              </span>
              <span className="h-px w-8 bg-background" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground">
                Everyday essentials
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop content */}
      <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          {/* Sidebar filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain pr-2">
              <div className="mb-7 flex items-center gap-3 border-b border-border pb-5">
                <SlidersHorizontal
                  size={15}
                  strokeWidth={1.4}
                  className="text-foreground"
                />
                <h2 className="text-[10px] font-semibold uppercase text-foreground tracking-[0.22em]">
                  Refine selection
                </h2>
              </div>

              {/* Categories */}
              <div className="mb-9">
                <h3 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Categories
                </h3>

                <nav className="space-y-0.5">
                  <Link
                    href="/shop"
                    className={`group flex items-center justify-between border-b border-border py-3 text-sm transition-colors ${
                      !categoryId
                        ? "font-medium text-foreground"
                        : "text-foreground hover:text-foreground"
                    }`}
                  >
                    All products
                    {!categoryId && (
                      <span className="h-1.5 w-1.5 rounded-full bg-background" />
                    )}
                  </Link>

                  {categories.map((catogery) => {
                    const isActive = categoryId === catogery._id;

                    return (
                      <Link
                        key={catogery._id}
                        href={`/shop?categoryId=${encodeURIComponent(catogery._id)}`}
                        className={`group flex items-center justify-between border-b border-border py-3 text-sm transition-colors ${
                          isActive
                            ? "font-medium text-[#171717]"
                            : "text-foreground hover:text-accent "
                        }`}
                      >
                        <span>{catogery.name}</span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-background" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Price filter */}
              <div className="border-t border-border pt-6">
                <h3 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Price range
                </h3>

                <PriceFilter />
              </div>

              {/* Editorial note */}
              <div className="mt-10 border border-border bg-background text-foreground p-5">
                <p className="font-serif text-xl italic leading-snug">
                  Quality in every detail.
                </p>
                <p className="mt-3 text-[11px] leading-6 text-foreground">
                  Explore pieces selected with care and a focus on
                  timeless appeal.
                </p>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.3}
                  className="mt-5 text-foreground"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0">
            {/* Collection toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-foreground">
                  {activeCategory ? "Selected collection" : "The collection"}
                </p>
                <p className="mt-1 font-serif text-lg text-foreground">
                  {activeCategory?.name || "All products"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-foreground">
                <ArrowDownWideNarrow
                  size={14}
                  strokeWidth={1.4}
                  className="text-foreground"
                />
                <span>
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <ProductSearch products={products} />
          </div>
        </div>
      </section>
      <ServiceHighlights/>
    </main>
  );
}
