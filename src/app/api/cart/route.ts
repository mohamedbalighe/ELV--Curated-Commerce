import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Token = await getToken({
  req,
  secret: process.env.NEXTAUTH_SECRET,
  cookieName: "__Secure-next-auth.session-token",
});

  console.log("Session token exists:", !!Token);
  console.log("API access token exists:", typeof Token?.token === "string");

  if (!Token) {
    return NextResponse.json(
      { step: "NEXTAUTH_TOKEN_NOT_FOUND" },
      { status: 401 }
    );
  }

  if (typeof Token.token !== "string") {
    return NextResponse.json(
      { step: "API_ACCESS_TOKEN_NOT_FOUND" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      headers: {
        token: Token.token,
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  return NextResponse.json(payload, {
    status: response.status,
  });
}