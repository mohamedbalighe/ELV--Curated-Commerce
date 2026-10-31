
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      token: string;
      email: string;
      address?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    name?: string | null;
    email?: string | null;
  }
}
