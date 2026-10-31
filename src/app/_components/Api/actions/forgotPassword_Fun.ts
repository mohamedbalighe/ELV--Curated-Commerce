"use server";

import { ForgotPasswordData } from "@/app/(auth)/forgot-password/page";

export async function forgotPassword_Fun(email: string) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const payload = await response.json();
    console.log("forgot Password Api:", payload);

    if (!response.ok) {
      throw new Error(payload.message || "Forgot password failed");
    }
    console.log("Status:", response.status);

    return payload;
  } catch (error) {
    console.error("Forgot password Api error:", error);
    throw error;
  }
}