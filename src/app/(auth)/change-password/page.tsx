"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { changeMyPassword } from "@/app/_components/Api/actions/change-password";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
};

export default function ChangePassword() {
  const router =useRouter()
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


async function onSubmit(data: ChangePasswordFormValues) {
  try {
    const result = await changeMyPassword(
      data.currentPassword,
      data.newPassword,
      data.rePassword
    );

    console.log("Change password result:", result);

    if (result.message === 'success') {
      toast.success("Password changed successfully");
      router.push("/login");
    } else {
      toast.error("Failed to change password");
    }
  } catch (error) {
    console.error("Change password client error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
}



  const passwordFields = [
    {
      name: "currentPassword" as const,
      label: "Current password",
      placeholder: "Enter your current password",
      key: "current" as const,
      autoComplete: "current-password",
      validation: {
        required: "Current password is required",
      },
    },
    {
      name: "newPassword" as const,
      label: "New password",
      placeholder: "Create a strong password",
      key: "new" as const,
      autoComplete: "new-password",
      validation: {
        required: "New password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
         pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Use at least 8 characters, including uppercase, lowercase, a number, and a special character (@$!%*?&)",
  },
      },
      
    },
    {
      name: "rePassword" as const,
      label: "Confirm new password",
      placeholder: "Re-enter your new password",
      key: "confirm" as const,
      autoComplete: "new-password",
      validation: {
        required: "Please confirm your new password",
        validate: (value: string) =>
          value === newPassword || "Passwords do not match",
      },
    },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-background  px-4 py-8 text-foreground  sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-7">
          <Breadcrumbs
            items={[
              { label: "Profile", href: "/Profile" },
              { label: "Change password" },
            ]}
          />
        </div>

        {/* Header */}
        <header className="mb-8 border-b border-border  pb-6 sm:mb-10 sm:pb-8">
          <p className="mb-4 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-accent  sm:text-[10px]">
            <span className="h-px w-8 bg-[#D4AF37]" />
            ELVÉ / Account security
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-[-0.045em] sm:text-5xl">
                Change password
                <span className="block italic text-accent ">
                  Keep your account secure.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[13px] leading-6 text-[#82776F]">
                Update your password to keep your personal information
                protected.
              </p>
            </div>

            <Link
              href="/Profile"
              className="inline-flex min-h-10 w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#82776F] transition-colors hover:text-accent "
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
              Back to profile
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          {/* Password form */}
          <section className="min-w-0 rounded-sm border border-border  bg-card  p-5 sm:p-8">
            <div className="mb-7 flex items-start gap-4 border-b border-border  pb-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border  bg-background ">
                <LockKeyhole
                  size={20}
                  strokeWidth={1.4}
                  className="text-accent "
                />
              </div>

              <div>
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.2em] text-accent ">
                  Security settings
                </p>

                <h2 className="font-serif text-2xl tracking-[-0.025em]">
                  Password details
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#82776F]">
                  Enter your current password, then choose a new one.
                </p>
              </div>
            </div>

           
<form
  onSubmit={handleSubmit(onSubmit)}
  noValidate
  className="space-y-6"
>
  {passwordFields.map((field) => {
    const error = errors[field.name];

    return (
      <div key={field.name}>
        <label
          htmlFor={field.name}
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#514840]"
        >
          {field.label}
        </label>

        <div className="relative">
          <input
            id={field.name}
            type={showPasswords[field.key] ? "text" : "password"}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            {...register(field.name, field.validation)}
            className={`min-h-12 w-full rounded-sm border bg-white px-4 py-3 pr-12 text-sm text-foreground  outline-none transition-colors placeholder:text-[#A49A91] focus:border-[#806317] ${
              error ? "border-red-500" : "border-border "
            }`}
          />

          <button
            type="button"
            onClick={() => togglePassword(field.key)}
            aria-label={
              showPasswords[field.key]
                ? `Hide ${field.label.toLowerCase()}`
                : `Show ${field.label.toLowerCase()}`
            }
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#82776F] transition-colors hover:text-[#806317]"
          >
            {showPasswords[field.key] ? (
              <EyeOff size={17} strokeWidth={1.5} />
            ) : (
              <Eye size={17} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {error && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="mt-2 text-xs text-red-600"
          >
            {error.message}
          </p>
        )}

        {field.name === "newPassword" && !error && (
          <p className="mt-2 text-[11px] leading-5 text-[#82776F]">
            Use at least 8 characters and avoid reusing an existing password.
          </p>
        )}
      </div>
    );
  })}

  <div className="border-t border-border  pt-6">
    <button
      type="submit"
      disabled={isSubmitting}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#211D1B] px-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#806317] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      <LockKeyhole size={15} strokeWidth={1.5} />

      {isSubmitting ? "Updating password..." : "Update password"}
    </button>

    <p className="mt-4 text-[11px] leading-5 text-[#82776F]">
      Your new password must match the confirmation field.
    </p>
  </div>
</form>

          </section>

          {/* Security information */}
          <aside className="rounded-sm border border-border  bg-card  p-5 sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-sm bg-[#FBF7E9] text-accent ">
              <ShieldCheck size={22} strokeWidth={1.4} />
            </div>

            <h2 className="font-serif text-xl">
              Password security
            </h2>

            <p className="mt-3 text-xs leading-6 text-[#82776F]">
              Follow these guidelines to help keep your account safe.
            </p>

            <ul className="mt-6 space-y-4">
              {[
                "Use a long, unique password.",
                "Avoid personal information.",
                "Never share your password with anyone.",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 text-xs leading-5 text-[#514840]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-border  pt-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-accent ">
                Need help?
              </p>

              <Link
                href="/forgot-password"
                className="mt-2 inline-flex items-center text-xs text-[#514840] underline decoration-[#D4AF37] underline-offset-4 transition-colors hover:text-accent "
              >
                Reset a forgotten password
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
