"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserRound, Mail, Save, X } from "lucide-react";
import { updateUserInfo_Fun } from "@/app/_components/Api/actions/updateUserInfo";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export type ProfileFormValues = {
  name: string;
  email: string;
};

export default function UpdateProfileForm() {
 const router =useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

async function submitForm(data: ProfileFormValues) {
  try {
    const result = await updateUserInfo_Fun(data.name, data.email);

    console.log("New User Data:", result);

    if (!result?.success) {
      toast.error("Failed to update profile");
      return;
    }

    toast.success("Profile updated successfully");
    router.push('/login')
  } catch {
    toast.error("Something went wrong. Please try again.");
  }
}

return (
  <main className="min-h-screen w-full bg-gray-50 px-3 py-6 sm:px-6 sm:py-10 lg:px-10">
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          Account settings
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your personal information and account details.
        </p>
      </header>

      <section className="w-full min-w-0 rounded-sm border border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
        <div className="mb-6 border-b border-gray-100 pb-5 sm:mb-8">
          <h2 className="text-lg font-semibold tracking-tight text-black sm:text-xl">
            Edit personal details
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Update your name and email address associated with your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full space-y-5 sm:space-y-6"
        >
          <div className="w-full min-w-0">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Full name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name cannot exceed 30 characters",
                  },
                })}
                className="block w-full min-w-0 rounded-sm border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-amber-600"
                aria-invalid={!!errors.name}
              />
            </div>

            {errors.name && (
              <p className="mt-2 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="w-full min-w-0">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="block w-full min-w-0 rounded-sm border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-amber-600"
                aria-invalid={!!errors.email}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end sm:pt-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => window.history.back()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={16} />
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
);
}
