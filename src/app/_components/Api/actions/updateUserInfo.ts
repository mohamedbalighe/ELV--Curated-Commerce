
"use server";

import { getTokenFun } from "@/uitilites/getTokenFun";

export async function updateUserInfo_Fun(userName:string , userEmail:string) {
  try {
    const token = await getTokenFun();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
          body: JSON.stringify({
  name: userName,
  email: userEmail,
}),
      }
    );

    const result = await response.json();
     console.log("Changeing User ifon API response:", result);

   if (!response.ok) {
  return {
    success: false,
    message:
      result.errors?.msg ||
      result.message ||
      "Failed to update user information",
  };
}

return {
  success: true,
  message: result.message,
  data: result,
}

  } catch (error) {
    console.error("Update user info API error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}