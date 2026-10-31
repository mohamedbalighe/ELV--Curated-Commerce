
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MoveRight } from "lucide-react";

import { getAllBrands } from "../_components/Api/actions/getAllBrandFun";
import Breadcrumbs from "../_components/Breadcrumbs/Breadcrumbs";
import ServiceHighlights from "../_components/ServiceHighlights/ServiceHighlights";

export default async function Page() {
  const data = await getAllBrands();

  return (
    <main className="min-h-screen bg-background  text-foreground ">
      {/* Page Header */}
      <section className="border-b border-border  bg-white">
        <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-6 sm:px-8 sm:pb-14 lg:px-16 lg:pb-16">
          <Breadcrumbs items={[{ label: "Brands" }]} />

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end lg:mt-14">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#806317]">
                  The names behind ELVÉ
                </p>
              </div>

              <h1 className="font-serif text-4xl font-normal tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Our
                <span className="ml-3 italic text-accent ">
                  Brands.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#82776F] sm:text-base">
                Discover the names shaping our collection. Explore a
                considered selection of brands, each bringing its own
                perspective, character, and distinctive design.
              </p>
            </div>

            <div className="flex items-end gap-4 border-t border-border  pt-4 md:border-t-0 md:pb-2 md:pt-0">
              <span className="font-serif text-5xl leading-none text-accent ">
                {String(data.length).padStart(2, "0")}
              </span>

              <div className="pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Brands
                </p>
                <p className="mt-1 text-[10px] text-[#82776F]">
                  One considered collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Directory */}
      <section className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#806317]">
              The collection
            </p>
            <p className="mt-1 text-xs text-[#82776F]">
              Explore our brand directory
            </p>
          </div>

          <span className="h-px max-w-32 flex-1 bg-[#E4DCD3]" />
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {data.map((brand, index) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="group flex min-w-0 flex-col border border-border  bg-white p-3 transition-colors duration-300 hover:border-[#D4AF37] sm:p-5 lg:p-6"
              >
                {/* Card Header */}
                <div className="flex min-h-7 items-center justify-between gap-2">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#806317] sm:text-[9px] sm:tracking-[0.2em]">
                    Brand no. {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border  text-[#82776F] transition-colors duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-foreground ">
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                {/* Brand Logo */}
                <div className="relative mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden border border-[#F0EBE4] bg-card  px-3 py-5 sm:mt-5 sm:px-5 sm:py-7">
                  <Image
                    alt={brand.name}
                    src={brand.image}
                    width={400}
                    height={300}
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 22vw"
                    className="max-h-16 w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:max-h-24"
                  />

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#D4AF37] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Brand Details */}
                <div className="mt-4 flex min-w-0 flex-1 flex-col sm:mt-5">
                  <h2 className="line-clamp-2 min-h-[2.75rem] font-serif text-base leading-snug transition-colors duration-300 group-hover:text-[#806317] sm:min-h-[3.25rem] sm:text-lg lg:text-xl">
                    {brand.name}
                  </h2>

                  <div className="mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-border  pt-3">
                    <span className="truncate text-[8px] uppercase tracking-[0.12em] text-[#82776F] sm:text-[9px] sm:tracking-[0.14em]">
                      {brand.slug || "Collection"}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 text-[9px] font-medium text-[#806317] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View
                      <MoveRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-border  bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-border  bg-[#FBF7E9] text-[#806317]">
              <ArrowUpRight size={20} strokeWidth={1.4} />
            </div>

            <p className="font-serif text-2xl">No brands available</p>
            <p className="mt-3 text-sm text-[#82776F]">
              Please check back later for new additions.
            </p>

            <Link
              href="/Shop"
              className="mt-6 inline-flex items-center gap-2 border-b border-[#D4AF37] pb-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#806317]"
            >
              Explore the shop
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}

        {/* Closing Statement */}
        <div className="mt-12 border-t border-border  pt-6 sm:mt-16 sm:pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#806317]">
                The ELVÉ philosophy
              </p>

              <p className="mt-3 font-serif text-xl sm:text-2xl">
                Distinctive by nature. Timeless by design.
              </p>
            </div>

            <Link
              href="/Shop"
              className="inline-flex w-fit items-center gap-2 border-b border-[#D4AF37] pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-[#806317]"
            >
              Explore all products
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
            <ServiceHighlights/>

    </main>
  );
}
