
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  ChevronDown,
  Truck,
  Menu,
  X,
  LogIn,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CardResponseType } from "../Api/services/Types/CardType";
import { getShopCategories } from "../Api/actions/catogeryApi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const focusRing =
  "focus-visible:outline focus-visible:outline-2  dark:border-white  dark:hover:border-black dark:text-white focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]";

const linkStyle =
  `text-[11px] font-medium uppercase dark:text-white tracking-[0.16em] transition-colors duration-200 hover:text-accent  ${focusRing}`;
export default function Navbar() {
  const { status } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
    useState(false);

  function Handle_Logout() {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }

  const { data: CartData } = useQuery<CardResponseType>({
    queryKey: ["getcart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
    enabled: status === "authenticated",
  });

  const { data: categorie } = useQuery({
    queryKey: ["categorie"],
    queryFn: getShopCategories,
  });

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  }

  const cartCount = CartData?.numOfCartItems ?? 0;

  const logo = (
    <Link
      href="/"
      onClick={closeMobileMenu}
      aria-label="VELORA home"
      className={`group flex flex-col items-center ${focusRing}`}
    >
      <span className="dark:text-white font-[var(--font-cormorant,Cormorant_Garamond,serif)] text-[35px] font-medium leading-none tracking-[0.12em] text-[#1C1917] transition-colors duration-200 group-hover:text-accent  sm:text-[40px]">
        ELVÉ
      </span>
      <span className="mt-1.5 text-[8px] dark:text-gray-300 font-medium uppercase tracking-[0.3em] text-[#78716C]">
        Curated Commerce
      </span>
    </Link>
  );

  const cartIcon = (
    <Link
      href="/cart"
      aria-label={`Shopping bag, ${cartCount} items`}
      className={`relative flex h-10 w-10 items-center  justify-center text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
    >
      <ShoppingBag size={20} strokeWidth={1.4} />

      {cartCount > 0 && (
        <span className="absolute right-0.5 dark:text-black top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-medium text-white">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF9] font-[var(--font-montserrat,Montserrat,sans-serif)] text-[#1C1917]">
      {/* Announcement bar */}
      <div className="bg-[#1C1917] text-white">
        <div className="mx-auto flex min-h-9 max-w-[1440px] items-center justify-center px-4 sm:justify-between sm:px-8 lg:px-12">
          <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] sm:text-[10px] sm:tracking-[0.16em]">
            <Truck
              size={14}
              strokeWidth={1.4}
              className="shrink-0 text-[#D6B77A]"
              aria-hidden="true"
            />
            <span>
              Complimentary shipping on orders over $200
            </span>
          </p>

          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/65 sm:block">
            Discover more. Choose better.
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          {/* Desktop layout */}
          <div className="hidden min-h-[94px] grid-cols-[1fr_auto_1fr] items-center gap-6 lg:grid">
            {/* Left navigation */}
            <nav
              aria-label="Primary navigation"
              className="flex h-full items-center gap-6 xl:gap-8"
            >
              <Link href="/" className={linkStyle}>
                Home
              </Link>

              <Link href="/shop" className={linkStyle}>
                Shop
              </Link>

              {/* Compact category dropdown */}
              <div className="group relative flex h-full items-center">
                <Link
                  href="/Categories"
                  className={`flex items-center gap-1.5 py-4 ${linkStyle}`}
                >
                  Categories
                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
                  />
                </Link>

                <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
                  <div className="border bg-card  py-2 shadow-[0_14px_35px_rgba(28,25,23,0.09)]">
                    <Link
                      href="/Categories"
                      className={`block px-5 py-3 font-[var(--font-cormorant,Cormorant_Garamond,serif)] dark:hover:bg-black text-xl text-[#1C1917] transition-colors hover:bg-[#FAFAF9] hover:text-accent  ${focusRing}`}
                    >
                      All Categories
                    </Link>

                    <div className="mx-5 h-px bg-[#E7E5E4]" />

                    <div className="max-h-64 overflow-y-auto py-1">
                      {categorie?.map((category) => (
                        <Link
                          key={category._id}
                          href={`/Categories/${category._id}`}
                          className={`block px-5 py-2.5 text-[11px] tracking-wide text-[#57534E] transition-colors dark:hover:bg-black hover:bg-[#FAFAF9] hover:text-accent  ${focusRing}`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/brands" className={linkStyle}>
                Brands
              </Link>
            </nav>

            {/* Centered brand */}
            {logo}

            {/* Right actions */}
            <div className="flex items-center justify-end gap-3 xl:gap-4">
                {/* <ThemeToggle /> */}

              {/* Underlined search */}
              <form
                action="/Shop"
                method="get"
                role="search"
                className="flex w-[130px] items-center border-b border-[#A8A29E] transition-colors focus-within:border-[#D4AF37] xl:w-[165px]"
              >
                <input
                  type="search"
                  name="search"
                  placeholder="Search"
                  aria-label="Search products"
                  className="h-9 min-w-0 flex-1 bg-transparent text-xs text-[#1C1917] outline-none placeholder:text-[#78716C] [&::-webkit-search-cancel-button]:appearance-none"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className={`flex h-9 w-7 shrink-0 items-center justify-center text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
                >
                  <Search size={17} strokeWidth={1.4} />
                </button>
              </form>
                    <ThemeToggle />

              {status === "authenticated" && (
                <>
                
                  <Link
                    href="/wishlist"
                    aria-label="Wishlist"
                    className={`flex h-10 w-8 items-center justify-center transition-colors hover:text-accent  ${focusRing}`}
                  >
                    <Heart size={19} strokeWidth={1.4} />
                  </Link>


                  {cartIcon}

                  <Link
                    href="/Profile"
                    aria-label="My account"
                    className={`flex h-10 w-8 items-center justify-center transition-colors hover:text-accent  ${focusRing}`}
                  >
                    <UserRound size={19} strokeWidth={1.4} />
                  </Link>

                  <button
                    type="button"
                    onClick={Handle_Logout}
                    className={`ml-1 whitespace-nowrap rounded-sm border border-[#1C1917] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-[#D4AF37] hover:text-black ${focusRing}`}
                  >
                    Sign Out
                  </button>
                </>
              )}

              {status !== "authenticated" && (
                <Link
                  href="/login"
                  className={`flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-accent  ${focusRing}`}
                >
                  <LogIn size={16} strokeWidth={1.4} />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile header */}
          <div className="relative flex h-[76px] items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`flex h-10 w-10 items-center justify-start text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
            >
              {isMobileMenuOpen ? (
                <X size={23} strokeWidth={1.4} />
                
              ) : (
                <Menu size={23} strokeWidth={1.4} />
              )}
            </button>

            <div className="absolute left-1/2 -translate-x-1/2">
            
              {logo}
            </div>

            <div className="flex items-center">
                                  <ThemeToggle />

              {cartIcon}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="border-b bg-card px-4 py-3 lg:hidden sm:px-8">
        <form
          action="/Shop"
          method="get"
          role="search"
          className="flex h-10 items-center border-b border-[#A8A29E] transition-colors focus-within:border-[#D4AF37]"
        >
          <Search
            size={17}
            strokeWidth={1.4}
            className="mr-3 shrink-0 text-[#78716C]"
            aria-hidden="true"
          />
          <input
            type="search"
            name="search"
            placeholder="What are you looking for?"
            aria-label="Search products"
            className="h-full min-w-0 flex-1 bg-transparent text-xs text-[#1C1917] outline-none placeholder:text-[#78716C] [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className={`flex h-9 w-9 shrink-0 items-center justify-center text-[#1C1917] hover:text-accent  ${focusRing}`}
          >
            <ArrowUpRight size={17} strokeWidth={1.4} />
          </button>
        </form>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-155px)] overflow-y-auto border-b bg-card bg-[#FAFAF9] lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="px-5 pb-7 pt-3 sm:px-8"
          >
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/Shop" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between border-b bg-card py-4 font-[var(--font-cormorant,Cormorant_Garamond,serif)] text-2xl text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
              >
                {item.label}
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.4}
                  className="text-accent "
                />
              </Link>
            ))}

            {/* Mobile categories */}
            <div className="border-b bg-card">
              <div className="flex items-center">
                <Link
                  href="/Categories"
                  onClick={closeMobileMenu}
                  className={`flex-1 py-4 font-[var(--font-cormorant,Cormorant_Garamond,serif)] text-2xl text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
                >
                  Categories
                </Link>

                <button
                  type="button"
                  aria-label="Toggle categories"
                  aria-expanded={isMobileCategoriesOpen}
                  onClick={() =>
                    setIsMobileCategoriesOpen((prev) => !prev)
                  }
                  className={`flex h-11 w-11 items-center justify-center text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
                >
                  <ChevronDown
                    size={19}
                    strokeWidth={1.4}
                    className={`transition-transform duration-200 ${
                      isMobileCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isMobileCategoriesOpen && (
                <div className="mb-4 ml-1 border-l border-[#D6B77A] pl-4">
                  <Link
                    href="/Categories"
                    onClick={closeMobileMenu}
                    className={`block py-3 font-[var(--font-cormorant,Cormorant_Garamond,serif)] text-xl text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
                  >
                    All Categories
                  </Link>

                  {categorie?.map((category) => (
                    <Link
                      key={category._id}
                      href={`/Categories/${category._id}`}
                      onClick={closeMobileMenu}
                      className={`block py-3 text-xs tracking-wide text-[#57534E] transition-colors hover:text-accent  ${focusRing}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/brands"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between border-b bg-card py-4 font-[var(--font-cormorant,Cormorant_Garamond,serif)] text-2xl text-[#1C1917] transition-colors hover:text-accent  ${focusRing}`}
            >
              Brands
              <ArrowUpRight
                size={17}
                strokeWidth={1.4}
                className="text-accent "
              />
            </Link>

            {/* Account actions */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/wishlist"
                    onClick={closeMobileMenu}
                    className={`flex min-h-12 items-center gap-2 border bg-card px-3 text-xs transition-colors hover:border-[#D4AF37] hover:text-accent  ${focusRing}`}
                  >
                    <Heart size={17} strokeWidth={1.4} />
                    Wishlist
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeMobileMenu}
                    className={`flex min-h-12 items-center gap-2 border bg-card px-3 text-xs transition-colors hover:border-[#D4AF37] hover:text-accent  ${focusRing}`}
                  >
                    <ShoppingBag size={17} strokeWidth={1.4} />
                    Cart
                    {cartCount > 0 && (
                      <span className="ml-auto text-[10px] text-accent ">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>


                  <Link
                    href="/Profile"
                    onClick={closeMobileMenu}
                    className={`flex min-h-12 items-center gap-2 border bg-card px-3 text-xs transition-colors hover:border-[#D4AF37] hover:text-accent  ${focusRing}`}
                  >
                    <UserRound size={17} strokeWidth={1.4} />
                    My account
                  </Link>

                  <button
                    type="button"
                    onClick={Handle_Logout}
                    className={`flex min-h-12 items-center gap-2 border  bg-card px-3 text-left text-xs transition-colors  hover:border-[#D4AF37] hover:text-accent  ${focusRing}`}
                  >
                    <LogOut size={17} strokeWidth={1.4} />
                    Sign Out
                  </button>
                  
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className={`col-span-2 flex min-h-12 items-center justify-center gap-2 bg-[#1C1917] px-4 text-xs uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#D4AF37] ${focusRing}`}
                >
                  <LogIn size={17} strokeWidth={1.4} />
                  Sign In
                </Link>
              )}
            </div>

            <p className="mt-7 font-(--font-cormorant,Cormorant_Garamond,serif) text-xl italic text-accent ">
              Discover your everyday.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
