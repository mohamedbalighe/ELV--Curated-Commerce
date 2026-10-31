"use client";

import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserData } from "@/app/_components/Api/services/Types/productType";
import { signIn } from "next-auth/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<UserData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function submitForm(userData: UserData) {
    try {
      const isLogin = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      });

      if (isLogin?.ok) {
        toast.success("Logged in successfully! Redirecting...");
        router.push("/");
      } else {
        toast.error("Login failed. Please check your email or password.");
      }
    } catch (error) {
      console.error("SIGNIN ERROR:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "h-[52px] w-full rounded-lg border border-[#E6DED7] bg-card  px-4 text-sm text-foreground  outline-none transition placeholder:text-[#B3A9A1] hover:border-[#D4AF37] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20";

  return (
    <main className="min-h-screen bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <section className="flex flex-1 items-center justify-center py-8 sm:py-12">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border  bg-white shadow-[0_20px_70px_rgba(50,35,25,0.06)] lg:grid-cols-[0.85fr_1.15fr]">

            {/* Editorial Panel */}
            <aside className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden bg-[#171717] p-10 text-white lg:flex xl:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#D4AF37]/20"
              />
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#D4AF37]/15"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border border-white/10"
              />

              <Link
                href="/"
                className="relative z-10 inline-flex w-fit items-center gap-2 text-xl font-semibold tracking-[0.2em]"
              >
                ELVÉ
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              </Link>

              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.24em] text-accent ">
                  THE ART OF EVERYDAY LIVING
                </p>

                <div className="mt-8 h-px w-12 bg-[#D4AF37]" />

                <h1 className="mt-7 font-serif text-5xl leading-[1.12] tracking-[-0.03em] xl:text-6xl">
                  Good things
                  <br />
                  welcome
                  <br />
                  <span className="italic text-accent ">you back.</span>
                </h1>

                <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">
                  Your considered collection of fashion, essentials, and
                  everyday discoveries awaits.
                </p>
              </div>

              <div className="relative z-10 border-t border-white/15 pt-5">
                <p className="text-[10px] tracking-[0.18em] text-white/55">
                  ELVÉ — CURATED COMMERCE
                </p>
              </div>
            </aside>

            {/* Login Form */}
            <div className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16 xl:py-16">
              <div className="mx-auto w-full max-w-md">

                {/* Mobile Brand */}
                <div className="mb-9 flex items-center justify-between lg:hidden">
                  <Link
                    href="/"
                    className="text-lg font-semibold tracking-[0.2em]"
                  >
                    ELVÉ
                  </Link>
                  <span className="text-[10px] tracking-[0.12em] text-[#8B8077]">
                    MEMBER ACCESS
                  </span>
                </div>

                {/* Heading */}
                <div className="mb-9">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E8D8A5] bg-[#FBF7E9] px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#806317]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    MEMBER ACCESS
                  </div>

                  <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-[42px]">
                    Welcome back.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#82776F]">
                    Sign in to access your orders, saved items, and personal
                    collection.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-semibold tracking-[0.1em] text-[#514741]"
                    >
                      EMAIL ADDRESS
                    </label>

                    <div className="relative">
                      <input
                        id="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email address is required",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!!formState.errors.email}
                        className={`${inputClass} pr-11`}
                      />

                      <AtSign
                        size={17}
                        strokeWidth={1.6}
                        aria-hidden="true"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9B8E84]"
                      />
                    </div>

                    {formState.errors.email && (
                      <p role="alert" className="mt-2 text-xs text-red-600">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="password"
                        className="text-[11px] font-semibold tracking-[0.1em] text-[#514741]"
                      >
                        PASSWORD
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-[10px] font-semibold tracking-[0.06em] text-[#806317] underline underline-offset-4 transition hover:text-[#5F490F] sm:text-[11px]"
                      >
                        FORGOT PASSWORD?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                        })}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        aria-invalid={!!formState.errors.password}
                        className={`${inputClass} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1.5 text-[#91847B] transition hover:bg-[#FBF7E9] hover:text-[#806317]"
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={1.6} />
                        ) : (
                          <Eye size={18} strokeWidth={1.6} />
                        )}
                      </button>
                    </div>

                    {formState.errors.password && (
                      <p role="alert" className="mt-2 text-xs text-red-600">
                        {formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Remember */}
                  <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs text-[#746960]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D9CDA8] accent-[#D4AF37]"
                    />
                    Remember this workstation
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#D4AF37] px-5 text-xs font-semibold tracking-[0.12em] text-[#171717] transition hover:bg-[#B89625] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formState.isSubmitting ? "SIGNING IN..." : "SIGN IN TO ELVÉ"}

                    <ArrowRight
                      size={17}
                      strokeWidth={1.7}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>

                  {/* Register Link */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-lg border border-[#EEE7E1] bg-[#FAF8F6] px-3 py-4 text-center text-sm">
                    <span className="text-[#82776F]">
                      Don&apos;t have an account?
                    </span>

                    <Link
                      href="/register"
                      className="font-semibold text-[#806317] underline underline-offset-4 transition hover:text-[#5F490F]"
                    >
                      Create an account
                    </Link>
                  </div>
                </form>

                {/* Security */}
                <div className="mt-7 flex items-center justify-center gap-2 text-center text-[10px] tracking-wide text-[#91847B]">
                  <ShieldCheck size={15} strokeWidth={1.5} />
                  <span>Your account details are handled securely.</span>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex items-center justify-center gap-5 text-[10px] font-medium tracking-[0.08em] text-[#91847B]">
                  <Link
                    href="/privacy"
                    className="transition hover:text-[#806317]"
                  >
                    PRIVACY
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-[#C7B9AF]" />
                  <Link
                    href="/terms"
                    className="transition hover:text-[#806317]"
                  >
                    TERMS
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-[#C7B9AF]" />
                  <Link
                    href="/faq"
                    className="transition hover:text-[#806317]"
                  >
                    CLIENT CARE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#DCD3CA] pt-5 text-center text-[9px] tracking-[0.12em] text-[#91847B] sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} ELVÉ. ALL RIGHTS RESERVED.</span>
          <span>CONSIDERED GOODS. EVERYDAY LIVING.</span>
        </footer>
      </div>
    </main>
  );
}
