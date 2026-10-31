import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Token = await getToken({ req });

  if (!Token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const accessToken = Token.token;

  if (typeof accessToken !== "string") {
    return NextResponse.json(
      { message: "Invalid access token" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      headers: {
        token: accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json(payload, {
      status: response.status,
    });
  }

  return NextResponse.json(payload);
}