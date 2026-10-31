
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserData } from "@/app/_components/Api/services/Types/productType";
import { userRegister } from "@/app/_components/Api/actions/actions";
import { useRouter } from "next/navigation";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onBlur",
  });

  async function goToNextStep() {
    console.log(getValues("email"));
console.log(getValues("password"));
    const isValid = await trigger(["name", "email", "phone"]);

    if (isValid) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function submitForm(userData: UserData) {
    try {
      const isRegistered = await userRegister(userData);

      if (isRegistered) {
        toast.success("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-[#E6E1DC] bg-white px-4 py-3.5 text-sm text-[#282321] outline-none transition duration-200 placeholder:text-[#AAA29B] hover:border-[#D4AF37] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20";

  const labelClass =
    "mb-2 block text-[11px] font-semibold tracking-[0.13em] text-[#625750]";

  function ErrorMessage({ message }: { message?: string }) {
    if (!message) return null;

    return (
      <p role="alert" className="mt-2 text-xs text-[#B42332]">
        {message}
      </p>
    );
  }



  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F4EF] text-[#282321]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-[#E8DED5]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full border border-[#E8DED5]"
      />

      <section className="relative  z-10 mx-auto flex min-h-[calc(100vh-68px)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid w-full max-w-5xl overflow-hidden border border-[#E8E1DA] bg-white shadow-[0_24px_80px_rgba(52,39,29,0.07)] md:grid-cols-[0.85fr_1.15fr]">
          {/* Editorial panel */}
          <aside className="relative hidden min-h-[690px] flex-col justify-between overflow-hidden bg-[#171717] p-10 text-white md:flex lg:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-28 top-28 h-80 w-80 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-12 top-44 h-48 w-48 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border border-white/10"
            />

            <Link
              href="/"
              className="relative z-10 inline-flex w-fit items-center gap-2 text-xl font-semibold tracking-[0.18em]"
            >
              ELVÉ
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
            </Link>

            <div className="relative z-10 my-12">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-accent ">
                A MORE PERSONAL EXPERIENCE
              </p>

              <h2 className="font-serif text-5xl leading-[1.12] tracking-[-0.04em] lg:text-6xl">
                The art
                <br />
                of choosing
                <br />
                <span className="italic text-accent ">well.</span>
              </h2>

              <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
                Create your account and keep your favorite discoveries close.
                A considered shopping experience, made personal.
              </p>
            </div>

            <div className="relative z-10 border-t border-white/15 pt-5">
              <p className="text-[10px] tracking-[0.2em] text-white/60">
                DISCOVER · SAVE · MAKE IT YOURS
              </p>
            </div>
          </aside>

          {/* Registration form */}
          <div className="px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div className="mb-8 flex items-center justify-between md:hidden">
              <Link
                href="/"
                className="text-lg font-semibold tracking-[0.18em]"
              >
                ELVÉ
              </Link>
              <span className="text-[10px] tracking-[0.16em] text-[#8B8077]">
                CREATE ACCOUNT
              </span>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#E8D8A5] bg-[#FBF6E7] text-[#9A7815]">
                {step === 1 ? (
                  <UserRound size={20} strokeWidth={1.5} />
                ) : (
                  <LockKeyhole size={20} strokeWidth={1.5} />
                )}
              </div>

              <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#9A7815]">
                {step === 1 ? "YOUR PERSONAL SPACE" : "ACCOUNT SECURITY"}
              </p>

              <h1 className="font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-[43px]">
                {step === 1 ? (
                  <>
                    Good taste
                    <br />
                    starts here.
                  </>
                ) : (
                  <>
                    Make it
                    <br />
                    personal.
                  </>
                )}
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#877C73]">
                {step === 1
                  ? "Create your ELVÉ account and keep the things you love, all in one place."
                  : "Set up your secure credentials to complete your membership."}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.13em] text-[#766C64]">
                  STEP 0{step} <span className="text-[#B4AAA1]">/ 02</span>
                </span>
                <span className="text-[11px] text-[#988B81]">
                  {step === 1 ? "Personal details" : "Account security"}
                </span>
              </div>

              <div
                className="flex gap-2"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={2}
                aria-valuenow={step}
                aria-label="Registration progress"
              >
                <div
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    step >= 1 ? "bg-[#D4AF37]" : "bg-[#EDE7E1]"
                  }`}
                />
                <div
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    step >= 2 ? "bg-[#D4AF37]" : "bg-[#EDE7E1]"
                  }`}
                />
              </div>
            </div>

            <form
              noValidate
              onSubmit={
                step === 1
                  ? (event) => {
                      event.preventDefault();
                      void goToNextStep();
                    }
                  : handleSubmit(submitForm)
              }
            >
              {step === 1 ? (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="register-name" className={labelClass}>
                      FULL NAME
                    </label>
                    <input
                      id="register-name"
                      {...register("name", {
                        required: "Full name is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                        minLength: {
                          value: 10,
                          message: "Name must be at least 10 characters",
                        },
                      })}
                      type="text"
                      autoComplete="name"
                      placeholder="How should we address you?"
                      aria-invalid={!!errors.name}
                      className={inputClass}
                    />
                    <ErrorMessage message={errors.name?.message} />
                  </div>

                  <div>
                    <label htmlFor="register-email" className={labelClass}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="register-email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      type="email"
                      autoComplete="off"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={inputClass}
                    />
                    <ErrorMessage message={errors.email?.message} />
                  </div>

                  <div>
                    <label htmlFor="register-phone" className={labelClass}>
                      PHONE NUMBER
                    </label>
                    <input
                      id="register-phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        maxLength: {
                          value: 11,
                          message: "Phone number must be 11 digits",
                        },
                        pattern: {
                          value: /^01[0125][0-9]{8}$/,
                          message:
                            "Enter a valid Egyptian number starting with 010, 011, 012, or 015",
                        },
                      })}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="01xxxxxxxxx"
                      aria-invalid={!!errors.phone}
                      className={inputClass}
                    />
                    <ErrorMessage message={errors.phone?.message} />
                  </div>

                  <button
                    type="submit"
                    className="group rounded-sm flex h-[54px] w-full items-center justify-between bg-[#D4AF37] px-5 text-xs font-semibold tracking-[0.1em] text-[#171717] transition-colors hover:bg-[#B89625] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
                  >
                    CONTINUE
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="register-password" className={labelClass}>
                      PASSWORD
                    </label>

                    <div className="relative">
                      <input
                        id="register-password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Use 8+ characters with uppercase, lowercase, number and symbol",
                          },
                        })}
                        type={showPassword ? "text" : "password"}
                        // autoComplete="new-password"
                        placeholder="Create a strong password"
                        aria-invalid={!!errors.password}
                        className={`${inputClass} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8077] transition-colors hover:text-[#9A7815]"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage message={errors.password?.message} />
                  </div>

                  <div>
                    <label
                      htmlFor="register-repassword"
                      className={labelClass}
                    >
                      CONFIRM PASSWORD
                    </label>
                    <input
                      id="register-repassword"
                      {...register("rePassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                      type="password"
                      // autoComplete="new-password"
                      placeholder="Enter your password again"
                      aria-invalid={!!errors.rePassword}
                      className={inputClass}
                    />
                    <ErrorMessage message={errors.rePassword?.message} />
                  </div>

                  <div className="flex items-start gap-3 border border-[#EEE5CA] bg-[#FBF8EF] p-4">
                    <LockKeyhole
                      size={17}
                      className="mt-0.5 shrink-0 text-[#9A7815]"
                    />
                    <p className="text-xs leading-5 text-[#81766D]">
                      Use at least 8 characters, including uppercase and
                      lowercase letters, a number, and a symbol.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group rounded-sm flex h-[54px] w-full items-center justify-between bg-[#D4AF37] px-5 text-xs font-semibold tracking-[0.08em] text-[#171717] transition-colors hover:bg-[#B89625] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "CREATING ACCOUNT..."
                      : "CREATE MY ACCOUNT"}
                    <ArrowUpRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setShowPassword(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 py-2 text-xs text-[#81766D] transition-colors hover:text-[#9A7815]"
                  >
                    <ArrowLeft size={14} />
                    Back to personal details
                  </button>
                </div>
              )}
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border border-[#EAE5E0] bg-[#FAF9F7] px-3 py-4 text-sm">
              <span className="text-[#81766D]">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-semibold text-[#9A7815] transition-colors hover:text-[#765B0D]"
              >
                Sign in
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#F0EBE5] pt-5 text-[10px] tracking-[0.12em] text-[#958980]">
              <LockKeyhole size={13} />
              YOUR DETAILS STAY PRIVATE
            </div>

            <p className="mt-6 text-center text-[11px] leading-5 text-[#8B8077]">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-[#9A7815] underline underline-offset-2"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#9A7815] underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-[#E7E0D8] px-5 py-5 text-[9px] tracking-[0.13em] text-[#9A8F85] sm:flex-row sm:px-10 lg:px-16">
        <span>ELVÉ © {new Date().getFullYear()}</span>
        <span>THE ART OF CHOICE</span>
      </footer>
    </main>
  );
}
