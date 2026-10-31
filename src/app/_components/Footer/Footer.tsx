"use client";

import Link from "next/link";
import {
  ArrowRight,
  MoveUpRight,
} from "lucide-react";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
    </svg>
  );
}

export default function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      Icon: FacebookIcon,
      href: "https://www.facebook.com/",
    },
  ];

  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Categories", href: "/Categories" },
    { label: "Brands", href: "/brands" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
  ];

  const careLinks = [
    { label: "Contact Us", href: "/" },
    { label: "Shipping Information", href: "/" },
    { label: "Returns & Exchanges", href: "/" },
    { label: "FAQs", href: "/" },
  ];

  const linkClass =
    "inline-flex max-w-full items-center text-[13px] leading-6 text-white/50 transition-colors duration-300 hover:text-accent ";

  return (
    <footer className="w-full overflow-hidden bg-[#171717] text-white">
      {/* Newsletter */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full border border-[#D4AF37]/10 sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full border border-[#D4AF37]/10 sm:h-56 sm:w-56" />

        <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-2 md:items-center md:gap-10 lg:px-16 lg:py-20">
          <div className="min-w-0 max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 shrink-0 bg-[#D4AF37] sm:w-8" />

              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent  sm:tracking-[0.28em]">
                The journal
              </p>
            </div>

            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              A more considered
              <br />
              <span className="italic text-accent ">
                way to discover.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[13px] leading-7 text-white/50 sm:mt-5 sm:text-sm">
              New arrivals, distinctive finds, and curated edits.
              Delivered occasionally, with intention.
            </p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="w-full min-w-0 md:ml-auto md:max-w-xl"
          >
            <label
              htmlFor="footer-email"
              className="mb-3 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 sm:tracking-[0.18em]"
            >
              Your email address
            </label>

            <div className="flex min-w-0 items-center gap-3 border-b border-white/30 pb-3 transition-colors focus-within:border-[#D4AF37]">
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="inline-flex shrink-0 items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-accent  transition-colors hover:text-white sm:gap-2 sm:text-[10px] sm:tracking-[0.15em]"
              >
                Subscribe
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>

            <p className="mt-3 text-[10px] leading-5 text-white/35">
              By subscribing, you agree to receive updates from ELVÉ.
            </p>
          </form>
        </div>
      </section>

      {/* Main footer */}
      <section className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 sm:py-14 lg:px-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-x-16">
          {/* Brand */}
          <div className="col-span-2 min-w-0 md:col-span-1">
            <Link
              href="/"
              className="inline-flex max-w-full flex-col gap-2"
              aria-label="ELVÉ home"
            >
              <span className="text-3xl font-semibold tracking-[0.2em]">
                ELVÉ
              </span>

              <span className="text-[8px] uppercase tracking-[0.3em] text-accent  sm:tracking-[0.42em]">
                Curated Commerce
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-[13px] leading-7 text-white/45 sm:mt-6">
              An appreciation for considered design, exceptional details,
              and everyday essentials worth keeping.
            </p>

            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white/65 transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#171717]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="min-w-0">
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:mb-6 sm:tracking-[0.2em]">
              Explore
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {shopLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div className="min-w-0">
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white sm:mb-6 sm:tracking-[0.2em]">
              Assistance
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {careLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand statement */}
          <div className="col-span-2 min-w-0 border-t border-white/10 pt-8 md:col-span-1 md:border-t-0 md:pt-0">
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:mb-6 sm:tracking-[0.2em]">
              Our philosophy
            </h3>

            <p className="font-serif text-xl leading-relaxed text-white/80 sm:text-2xl">
              Less noise.
              <br />
              <span className="italic text-accent ">
                More meaning.
              </span>
            </p>

            <Link
              href="/Shop"
              className="mt-5 inline-flex max-w-full items-center gap-2 border-b border-[#D4AF37]/50 pb-2 text-[9px] font-medium uppercase tracking-[0.1em] text-accent  transition-colors hover:border-white hover:text-white sm:mt-6 sm:gap-3 sm:text-[10px] sm:tracking-[0.16em]"
            >
              Discover ELVÉ
              <MoveUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-5 lg:px-16">
          <p className="text-[10px] leading-5 tracking-wide text-white/40">
            © {new Date().getFullYear()} ELVÉ. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
            <Link
              href="/"
              className="text-[10px] text-white/40 transition-colors hover:text-accent "
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="text-[10px] text-white/40 transition-colors hover:text-accent "
            >
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 sm:tracking-[0.25em]">
              Curated Commerce
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
