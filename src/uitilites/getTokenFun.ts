"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun(): Promise<string | null> {
  const cookieStore = await cookies();

  const nextAuthToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!nextAuthToken) {
    console.log("NextAuth session cookie not found");
    return null;
  }

  const accessToken = await decode({
    
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken,
  });
  console.log("Cookie exists:", !!nextAuthToken);
console.log("Decoded successfully:", !!accessToken);
console.log("API token exists:", typeof accessToken?.token === "string");

  return typeof accessToken?.token === "string"
    ? accessToken.token
    : null;
}