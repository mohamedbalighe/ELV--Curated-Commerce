
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  UserRound,
  MapPin,
  ShoppingBag,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Breadcrumbs from "../_components/Breadcrumbs/Breadcrumbs";

export default function Profile() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  const accountMenu = [
    {
      label: "Personal information",
      icon: UserRound,
      href: "/profile",
      active: true,
    },
    {
      label: "My orders",
      icon: ShoppingBag,
      href: "/orders",
      active: false,
    },
    {
      label: "Addresses",
      icon: MapPin,
      href: "/addresses",
      active: false,
    },
  ];

  const personalInfo = [
    {
      label: "Full name",
      value: session?.user?.name,
    },
    {
      label: "Email address",
      value: session?.user?.email,
    },
    {
      label: "User ID",
      value: session?.user?.id,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
         <div className="mb-7 sm:mb-8">
                  <Breadcrumbs  items={[{ label: "Profile" }]} />
                </div>
        {/* Header */}
        <header className="mb-8 border-b border-border  pb-6 sm:mb-10 sm:pb-8">
          <p className="mb-4 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#806317] sm:text-[10px]">
            <span className="h-px w-8 bg-[#D4AF37]" />
            ELVÉ / My account
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-[-0.045em] sm:text-5xl">
                My account
                <span className="block italic text-accent ">
                  Personal space.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[13px] leading-6 text-[#82776F]">
                Manage your personal details and account information.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex min-h-10 w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#82776F] transition-colors hover:text-[#806317]"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
              Back to store
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1  items-start gap-6 sm:gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="min-w-0 overflow-hidden rounded-sm border border-border  bg-card ">
            <div className="bg-[#211D1B] px-5 py-7 text-white sm:px-6">
              <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-sm border border-[#D4AF37]/50 bg-white/[0.04] text-accent  sm:h-16 sm:w-16">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "Profile"}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={28} strokeWidth={1.2} />
                )}
              </div>

              <p className="text-[9px] uppercase tracking-[0.2em] text-accent ">
                {isLoading ? "Loading account" : "Welcome back"}
              </p>

              <h2 className="mt-2 break-words font-serif text-xl">
                {isLoading
                  ? "Loading..."
                  : session?.user?.name || "My Account"}
              </h2>

              <p className="mt-2 break-all text-xs leading-5 text-white/55">
                {session?.user?.email || ""}
              </p>
            </div>

            <nav className="p-3">
              <p className="px-3 pb-3 pt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#82776F]">
                Account menu
              </p>

              {accountMenu.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`mb-1  flex min-h-11 items-center gap-3 rounded-sm px-3 py-3 text-xs transition-colors ${
                      item.active
                        ? "bg-[#FBF7E9] text-[#806317]"
                        : "text-[#514840] hover:bg-background  hover:text-[#806317]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.4} />

                    <span className="min-w-0 flex-1  ">
                      {item.label}
                    </span>

                    <ChevronRight size={14} strokeWidth={1.4} />
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <section className="min-w-0 rounded-sm border border-border  bg-card  p-4 min-[400px]:p-5 sm:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border  pb-5 sm:mb-7 sm:flex-row sm:items-center sm:pb-6">
              <div>
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#806317]">
                  Account details
                </p>

                <h2 className="font-serif text-2xl tracking-[-0.025em]">
                  Personal information
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#82776F]">
                  Your personal details and account information.
                </p>
              </div>

             
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/Profile/updateUserInfo">
                <button
    type="button"
    disabled={!session || isLoading}
    className="inline-flex min-h-10 dark:border-white  w-fit items-center justify-center gap-2 rounded-sm border border-border  px-4 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-[#D4AF37] hover:text-[#806317] disabled:cursor-not-allowed disabled:opacity-50"
  >
    Edit profile
    <Pencil size={13} />
  </button>
                </Link>
  

  <Link href="/change-password">
  <button
    className="inline-flex min-h-10 w-fit items-center justify-center rounded-sm bg-button-bg px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-button-text transition-colors hover:bg-accent-hover"
  >
    Change password
  </button>
</Link>
</div>
            </div>
            

            

            {isLoading ? (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mb-5 h-8 w-8 animate-spin rounded-full border border-border  border-t-[#D4AF37]" />

    <p className="font-serif text-xl text-foreground ">
      Preparing your account
    </p>

    <p className="mt-2 text-xs leading-5 text-[#82776F]">
      Please wait while we retrieve your information.
    </p>
  </div>
) : !session ? (
              <div className="py-10 text-center">
                <UserRound
                  size={30}
                  strokeWidth={1.3}
                  className="mx-auto mb-4 text-[#806317]"
                />

                <h3 className="font-serif text-xl">
                  Sign in to view your profile
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#82776F]">
                  Your account information will appear here after signing in.
                </p>

                <Link
                  href="/login"
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#211D1B] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#806317]"
                >
                  Sign in
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {personalInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className={`min-w-0 border-b border-border  py-5 ${
                      index === personalInfo.length - 1
                        ? "sm:border-b-0"
                        : ""
                    }`}
                  >
                    <p className="mb-2 text-[9px] dark:text-[#8d7c6f]  uppercase tracking-[0.14em] text-[#82776F]">
                      {item.label}
                    </p>

                    <p className="break-words text-sm dark:text-white text-[#302C28]">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
