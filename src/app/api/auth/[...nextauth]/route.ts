import { authOptions } from "@/next-auth/AuthOptions";
import NextAuth from "next-auth";

console.log("🔥 ROUTE LOADED");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };