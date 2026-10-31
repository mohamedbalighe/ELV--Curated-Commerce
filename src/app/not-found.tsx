
import Link from "next/link";
import { ArrowLeft, SearchX, ArrowUpRight } from "lucide-react";

export default function Not_found() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center overflow-hidden bg-white px-5 py-16 text-[#171717] sm:px-8 sm:py-20">
      <div className="relative mx-auto w-full max-w-3xl">
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-[#E8E2D9] sm:-right-16 sm:h-64 sm:w-64"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-8 h-32 w-32 rounded-full border border-[#E8E2D9] sm:-right-8 sm:h-48 sm:w-48"
        />

        <div className="relative border-y border-[#E8E2D9] py-12 sm:py-16 md:py-20">
          {/* Error Label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C4A477]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent ">
              
ELVÉ / Navigation error
            </p>
          </div>

          {/* Error Code */}
          <p
            aria-hidden="true"
            className="select-none font-serif text-[clamp(6rem,20vw,12rem)] font-normal leading-[0.8] tracking-[-0.08em] text-[#F0ECE5]"
          >
            404
          </p>

          {/* Content */}
          <div className="mt-8 max-w-lg sm:mt-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#E8E2D9] bg-[#F5F3EF] text-accent ">
              <SearchX size={23} strokeWidth={1.3} />
            </div>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-4xl md:text-5xl">
              This page is
              <span className="block italic text-accent ">
                nowhere to be found.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#8A8580] sm:text-base">
              The page may have moved, the link may be outdated, or the
              address may be incorrect. Let’s get you back to discovering
              something worth finding.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="group  rounded-sm inline-flex min-h-12 items-center justify-center gap-3 bg-[#171717] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4A477]"
              >
                <ArrowLeft size={15} strokeWidth={1.5} />
                Back to home
              </Link>

              <Link
                href="/Shop"
                className="group rounded-sm inline-flex min-h-12 items-center justify-center gap-3 border border-[#E8E2D9] bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#171717] transition-colors duration-300 hover:border-[#C4A477] hover:text-accent  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4A477]"
              >
                Explore the shop
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Footer Detail */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#E8E2D9] pt-5">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#8A8580]">
              Page not found
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-accent ">
              Error 404
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
