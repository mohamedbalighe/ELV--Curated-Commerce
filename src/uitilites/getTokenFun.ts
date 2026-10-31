"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun(): Promise<string | null> {
  const cookie = await cookies();

  const nextAuthToken = cookie.get("next-auth.session-token")?.value;

  if (!nextAuthToken) return null;

  const accessToken = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken,
  });

  return typeof accessToken?.token === "string"
    ? accessToken.token
    : null;
}