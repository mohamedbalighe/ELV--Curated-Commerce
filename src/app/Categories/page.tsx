
import { getShopCategories } from '../_components/Api/actions/catogeryApi';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import ServiceHighlights from '../_components/ServiceHighlights/ServiceHighlights';
import Breadcrumbs from '../_components/Breadcrumbs/Breadcrumbs';

export default async function categories() {
  const CatogeryData = await getShopCategories();

  return (
    <section className="bg-background px-4 py-16 text-[#171717] sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
         <div className="mb-6 sm:mb-8">
  <Breadcrumbs
    items={[
      { label: "Home", href: "/" },
      { label: "Categories", href: "/Categories" },
    ]}
  />
</div>
 
          <header className="mb-10 flex flex-col justify-between gap-7 border-b border-[#D8D2C8] pb-8 sm:mb-14 sm:pb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8A7657]">
              <span className="h-px w-8 bg-[#D4AF37]" />
              Collections / 001
            </p>

            <h2 className="max-w-3xl dark:text-white font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              Find your
              <span className="block ml-3 italic text-accent ">
                own kind of style.
              </span>
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex w-fit items-center dark:text-[#f5c116] gap-4 border-b border-[#D4AF37] pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-[#8A7657]"
          >
            Explore the store
            <MoveRight
              size={16}
              className="text-[#A98A5E] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </header>

        {CatogeryData?.length ? (
          <div className="grid grid-cols-2  gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {CatogeryData.map((Categorie, index) => (
              <Link
                key={Categorie._id}
                href={`/Categories/${Categorie._id}`}
                className="group block min-w-0"
              >
                <div className="relative rounded-sm aspect-4/5 overflow-hidden bg-[#E7E1D8]">
                  <Image
                    src={Categorie.image}
                    alt={Categorie.name ?? 'Categories'}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 25vw"
                    className="object-cover transition-transform  duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 text-[10px] tracking-[0.18em] text-white/85 sm:left-5 sm:top-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#171717] sm:right-5 sm:top-5">
                    <ArrowUpRight size={16} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#E2CBA8]">
                      Explore collection
                    </p>

                    <div className="flex items-end justify-between gap-2">
                      <h3 className="font-serif text-xl font-normal leading-tight sm:text-2xl lg:text-3xl">
                        {Categorie.slug || Categorie.name}
                      </h3>
                      <span className="mb-1 shrink-0 text-[9px] uppercase tracking-[0.12em] text-white/75 transition-colors group-hover:text-[#E2CBA8]">
                        Discover
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#D8D2C8] px-5 py-16 text-center">
            <p className="text-sm text-[#78716C]">
              No categories are available right now.
            </p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-[#D8D2C8] pt-5 sm:mt-14">
          <p className="text-[9px] dark:text-yellow-500 uppercase tracking-[0.2em] text-[#78716C]">
            A considered selection
          </p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#78716C]">
            {String(CatogeryData?.length ?? 0).padStart(2, '0')} collections
          </p>
        </div>
      </div>
            <ServiceHighlights/>
      
    </section>
  );
}
