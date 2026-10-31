
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Mail,
  LockKeyhole,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { verifyResetCode_Fun } from "@/app/_components/Api/actions/verifyResetCode-Fun";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { forgotPassword_Fun } from "@/app/_components/Api/actions/forgotPassword_Fun";

export type ResetCodeType = {
  resetCode: string;
};

export default function VerifyResetCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting },
  } = useForm<ResetCodeType>({
    defaultValues: {
      resetCode: "",
    },
    mode: "onChange",
  });

  const code = watch("resetCode");

  async function ResetCodeData(data: ResetCodeType) {
    try {
      const response = await verifyResetCode_Fun(data.resetCode);

      if (response.statusMsg === "success") {
        toast.success("Your verification code has been confirmed successfully.");
        router.push("/reset-password");
      } else if(response.statusMsg === "fail"){
        toast.error("The verification code is invalid or has expired.");
      }
    } catch {
      toast.error("Unable to verify your code. Please try again later.");
    }
  }

  async function resendCode() {
    if (!email) {
      toast.error("Email address is missing. Please try again.");
      return;
    }

    try {
      const response = await forgotPassword_Fun(email);

      if (response.statusMsg === "success") {
        toast.success("A new reset code has been requested. Check your email.");
      } else {
        toast.error(response.message || "Unable to resend the code.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="min-h-screen bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-border  pb-5">
          <Link
            href="/forgot-password"
            className="flex items-center gap-2 text-[10px] font-medium tracking-[0.14em] text-[#82776F] transition hover:text-[#806317] sm:text-xs"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">BACK</span>
          </Link>

          <Link
            href="/Shop"
            className="font-serif text-2xl font-medium tracking-[0.16em] sm:text-3xl"
          >
            ELVÉ
          </Link>

          <div className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] text-[#82776F] sm:text-[10px]">
            <LockKeyhole size={13} />
            <span>SECURE ACCESS</span>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-12 sm:py-16">
          <div className="w-full max-w-[480px]">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#D4AF37] text-foreground ">
                <Mail size={14} />
              </div>

              <div className="h-px w-10 bg-[#D4AF37]" />

              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#D4AF37] text-xs font-semibold text-foreground ">
                2
              </div>

              <div className="h-px w-10 bg-[#E4DCD3]" />

              <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-border  bg-white text-xs text-[#82776F]">
                3
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-border  bg-white shadow-[0_20px_70px_rgba(50,35,25,0.06)]">
              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="px-6 py-9 sm:px-10 sm:py-11">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-sm border border-border  bg-[#FBF7E9] text-[#806317]">
                  <Mail size={25} strokeWidth={1.5} />
                </div>

                <div className="mb-8">
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#806317]">
                    ACCOUNT RECOVERY · STEP 02
                  </p>

                  <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                    Verify your email.
                  </h1>

                  <p className="mt-4 text-sm leading-6 text-[#82776F]">
                    Enter the six-digit verification code sent to your email
                    address to continue resetting your password.
                  </p>

                  {email && (
                    <div className="mt-4 flex items-center gap-2 rounded-sm border border-border  bg-card  px-3 py-3">
                      <Mail size={15} className="shrink-0 text-[#806317]" />
                      <p className="min-w-0 break-all text-xs text-[#514741]">
                        {email}
                      </p>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit(ResetCodeData)}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="reset-code"
                      className="mb-3 block text-[11px] font-semibold tracking-[0.1em] text-[#514741]"
                    >
                      VERIFICATION CODE
                    </label>

                    <input
                      id="reset-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="000000"
                      aria-invalid={!!errors.resetCode}
                      {...register("resetCode", {
                        required: "Verification code is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Code must contain exactly 6 digits",
                        },
                      })}
                      className="h-16 w-full rounded-sm border border-border  bg-card  px-4 text-center text-2xl font-semibold tracking-[0.45em] text-[#806317] outline-none transition placeholder:text-[#D4C9C0] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                    />

                    {errors.resetCode && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.resetCode.message}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-[#82776F]">
                      Enter all 6 digits from your email.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={code?.length !== 6 || isSubmitting}
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-[#D4AF37] px-5 text-xs font-semibold tracking-[0.12em] text-foreground  transition hover:bg-[#B89625] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "VERIFYING CODE..." : "VERIFY CODE"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-7 border-t border-border  pt-6 text-center">
                  <p className="text-sm text-[#82776F]">
                    Didn&apos;t receive the code?
                  </p>

                  <button
                    onClick={resendCode}
                    type="button"
                    className="mt-2 text-sm font-semibold text-[#806317] underline underline-offset-4 transition hover:text-[#B89625]"
                  >
                    Resend verification code
                  </button>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-sm border border-border  bg-[#FBF7E9] p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#806317]"
                    strokeWidth={1.5}
                  />

                  <div>
                    <p className="text-xs font-semibold text-[#514741]">
                      Keep your code private
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#82776F]">
                      Never share your verification code with anyone.
                    </p>
                  </div>
                </div>

                <div className="mt-7 text-center">
                  <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#806317] transition hover:text-[#B89625]"
                  >
                    <ArrowLeft size={16} />
                    Use a different email
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] tracking-[0.08em] text-[#82776F]">
              ELVÉ · CONSIDERED GOODS. EVERYDAY LIVING.
            </p>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-border  pt-5 text-center text-[9px] tracking-[0.12em] text-[#82776F] sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} ELVÉ. ALL RIGHTS RESERVED.</span>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-[#806317]">
              PRIVACY
            </Link>

            <Link href="/terms" className="transition hover:text-[#806317]">
              TERMS
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
