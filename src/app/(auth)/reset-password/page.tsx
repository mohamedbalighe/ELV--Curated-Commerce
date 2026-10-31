"use client";

import { resetPassword } from "@/app/_components/Api/actions/reset-password";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

export interface ResetPasswordFormInputs {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInputs>({
    mode: "onTouched",
  });

  const watchPassword = watch("newPassword");

  async function onSubmit(data: ResetPasswordFormInputs) {
    try{
    const result = await resetPassword({
  email: data.email,
  newPassword: data.newPassword,
});

      if (result.success) {
        toast.success("Password reset successfully!");

        router.push("/Login");
      } else {
        toast.error(
          result.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }


  return (
    <main className="min-h-screen bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[75vh] w-full max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-sm border border-border  bg-white shadow-[0_20px_70px_rgba(33,29,27,0.07)] md:grid-cols-[0.85fr_1.15fr]">
          {/* Editorial panel */}
          <div className="flex flex-col justify-between bg-[#D4AF37] p-8 text-foreground  sm:p-12">
            <Link
              href="/Login"
              className="inline-flex w-fit items-center gap-2 text-sm text-foreground /75 transition hover:text-black"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>

            <div className="my-12">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-foreground /70">
                ELVÉ · Account Security
              </p>

              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-sm border border-[#211D1B]/25">
                <ShieldCheck size={27} strokeWidth={1.4} />
              </div>

              <h1 className="max-w-sm font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
                A fresh start begins here.
              </h1>

              <p className="mt-5 max-w-xs text-sm leading-7 text-foreground /75">
                Create a new password to secure your account and get back to
                discovering ELVÉ.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground /60">
              Considered essentials. Timeless style.
            </p>
          </div>

          {/* Form UI */}
          <div className="flex items-center justify-center px-6 py-12 sm:px-12 sm:py-16">
            <div className="w-full max-w-md">
              <div className="mb-9">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#806317]">
                  Reset password
                </p>

                <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                  Choose a new password
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#82776F]">
                  Use a strong password you have not used before.
                </p>
              </div>

            

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground "
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#82776F]"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-sm border border-border  bg-card  pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A79B91] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                      {...register("email", {
                        required: "Email address is required.",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (<p className="mt-1 text-xs text-red-500">{errors.email.message}</p>)}
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-foreground "
                  >
                    New password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#82776F]"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="h-12 w-full rounded-sm border border-border  bg-card  pl-11 pr-12 text-sm outline-none transition placeholder:text-[#A79B91] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                      {...register("newPassword", {
                        required: "New password is required.",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters.",
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-[#82776F] transition hover:text-[#806317]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.newPassword.message}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-[#82776F]">
                      Use at least 6 characters.
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-foreground "
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#82776F]"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your new password"
                      autoComplete="new-password"
                      className="h-12 w-full rounded-sm border border-border  bg-card  pl-11 pr-12 text-sm outline-none transition placeholder:text-[#A79B91] focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                      {...register("confirmPassword", {
                        required: "Please confirm your password.",
                        validate: (value) =>
                          value === watchPassword || "Passwords do not match.",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-[#82776F] transition hover:text-[#806317]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-5 text-sm font-semibold text-foreground  transition hover:bg-[#B89625] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Resetting...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-border  pt-6 text-center">
                <Link
                  href="/Login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#806317] transition hover:text-[#B89625]"
                >
                  <ArrowLeft size={15} />
                  Return to login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
  }