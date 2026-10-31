
import ProductCard from '../productCarde/productCarde';
import { PackageOpen, ArrowRight, MoveRight } from 'lucide-react';
import Link from 'next/link';
import getAllCards, {
  getProductsByCategory,
} from '../Api/actions/ProductApi';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default async function FeaturedProduct({
  categoryId,
  maxPrice,
  categoryName,
  hideDescription = false,
}: {
  categoryId?: string;
  maxPrice?: string;
  hideDescription?: boolean;
  categoryName?: string;
}) {
  const products = categoryId
    ? await getProductsByCategory(categoryId)
    : await getAllCards();

  const data = maxPrice
    ? products.filter((product) => product.price <= Number(maxPrice))
    : products;

  if (data.length === 0) {
    return (
      <section className="bg-white px-4 py-20 text-[#171717] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px] border-y border-[#E5DED4] py-12 sm:py-16">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="flex aspect-square max-h-[300px] items-center justify-center bg-[#F5F3EF]">
              <div className="flex h-28 w-28 items-center justify-center border border-[#D8C8B1] sm:h-36 sm:w-36">
                <PackageOpen
                  size={48}
                  strokeWidth={1}
                  className="text-[#A98A5E]"
                />
              </div>
            </div>

            <div className="py-4 md:pl-8">
              <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A7657]">
                <span className="h-px w-7 bg-[#C4A477]" />
                Collection / 000
              </p>

              <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Nothing here.
                <span className="block ml-3 italic text-accent ">For now.</span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#78716C]">
                We couldn’t find products matching this selection. Explore the
                full collection to discover something new.
              </p>

              <Link
                href="/shop"
                className="group mt-8 inline-flex items-center gap-5 border-b border-[#C4A477] pb-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-accent "
              >
                Explore all products
                <MoveRight
                  size={16}
                  className="text-accent  transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-white px-4 py-16 dark:bg-black text-[#171717] sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
<div className="mb-8 sm:mb-10">
  <div className="mb-8 sm:mb-10">
  <Breadcrumbs
    items={[
      { label: "Categories", href: "/Categories" },
      { label: categoryName ?? "Products" },
    ]}
  />
</div>
</div>
        {!hideDescription && (
          <header className="mb-10 border-b border-[#E5DED4] dark:bg-black pb-8 sm:mb-14 sm:pb-10">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8A7657]">
                  <span className="h-px w-8 bg-[#C4A477]" />
                  {categoryId ? 'The collection' : 'Selected for you'}
                </p>

                <h2 className="max-w-4xl font-serif text-4xl dark:text-white font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
                  {categoryId ? (
                    <>
                      Made for
                      <span className="block ml-3 italic text-accent ">
                        your everyday.
                      </span>
                    </>
                  ) : (
                    <>
                      Good things.
                      <span className="block ml-3 italic text-accent ">
                        Well chosen.
                      </span>
                    </>
                  )}
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#78716C] sm:text-base">
                  {categoryId
                    ? 'Discover distinctive pieces from this collection, selected for everyday living.'
                    : 'A considered selection of everyday essentials and distinctive pieces.'}
                </p>
              </div>

              <div className="flex items-center justify-between gap-6 lg:min-w-[210px] lg:justify-end lg:pb-1">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#78716C]">
                  <span className="mr-2 text-sm font-medium tabular-nums text-[#171717]">
                    {String(data.length).padStart(2, '0')}
                  </span>
                  {data.length === 1 ? 'Piece' : 'Pieces'}
                </p>

                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 border-b border-[#D8C8B1] pb-2 text-xs font-medium transition-colors hover:border-[#D4AF37] hover:text-[#8A7657]"
                >
                  View all Categories
                  <ArrowRight
                    size={14}
                    className="text-[#A98A5E] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </header>
        )}

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-[#E5DED4] pt-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <p className="text-[9px] dark:text-yellow-500 uppercase tracking-[0.2em] text-[#78716C]">
            A considered selection / ELVÉ
          </p>

          <Link
            href="/shop"
            className="dark:text-yellow-500 group inline-flex w-fit items-center gap-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-accent "
          >
            Discover the full collection
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C8B1] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#171717]">
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
