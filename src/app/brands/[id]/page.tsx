
import { getSpecificBrand } from "@/app/_components/Api/actions/getAllBrandFun";
import getAllCards from "@/app/_components/Api/actions/ProductApi";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/app/_components/productCarde/productCarde";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import Link from "next/link";

export type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getSpecificBrand(id),
    getAllCards(id),
  ]);

  return (
    <main className="min-h-screen bg-background  text-foreground ">
      {/* Brand Header */}
      <section className="border-b border-border  bg-white">
        <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-6 sm:px-8 sm:pb-14 lg:px-16 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: "Brands", href: "/brands" },
              { label: brand.name },
            ]}
          />

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end lg:mt-16">
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#806317]">
                  The ELVÉ collection
                </p>
              </div>

              <h1 className="max-w-4xl break-words font-serif text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                {brand.name}
                <span className="ml-2 text-accent ">.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#82776F] sm:text-base">
                Discover the latest pieces from {brand.name}, selected
                for their distinctive character and considered design.
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-border  pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <span className="font-serif text-5xl leading-none text-[#B89625]">
                {String(products.length).padStart(2, "0")}
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Products
                </p>
                <p className="mt-1 text-xs text-[#82776F]">
                  In this collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        <div className="mb-7 flex items-center justify-between gap-4 sm:mb-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#806317]">
              Explore the collection
            </p>

            <h2 className="mt-2 font-serif text-2xl font-normal sm:text-3xl">
              Selected pieces
            </h2>
          </div>

          <span className="hidden h-px max-w-40 flex-1 bg-[#E4DCD3] sm:block" />

          <p className="shrink-0 text-xs text-[#82776F]">
            {products.length} {products.length === 1 ? "item" : "items"}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center border border-border  bg-white px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center border border-border  bg-[#FBF7E9] text-[#806317]">
              <PackageOpen
                size={27}
                strokeWidth={1.2}
                aria-hidden="true"
              />
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#806317]">
              Collection unavailable
            </p>

            <h2 className="font-serif text-2xl font-normal sm:text-3xl">
              Nothing here just yet
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-[#82776F]">
              There are currently no products from this brand.
              Explore the full collection to discover more.
            </p>

            <Link
              href="/Shop"
              className="mt-8 inline-flex items-center gap-3 rounded-sm bg-[#D4AF37] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground  transition-colors duration-300 hover:bg-[#B89625]"
            >
              Explore all products
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        )}

        {/* Brand Footer */}
        <div className="mt-14 border-t border-border  pt-7 sm:mt-20 sm:pt-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#806317]">
                The ELVÉ philosophy
              </p>

              <p className="mt-3 font-serif text-xl sm:text-2xl">
                Distinctive by nature. Timeless by design.
              </p>
            </div>

            <Link
              href="/brands"
              className="inline-flex w-fit items-center gap-2 border-b border-[#D4AF37] pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-[#806317]"
            >
              Discover all brands
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
