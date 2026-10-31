
"use server";

import { getTokenFun } from "@/uitilites/getTokenFun";

export async function changeMyPassword(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const token = await getTokenFun();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
      }
    );

    const result = await response.json();
     console.log("Change password API response:", result);

    if (!response.ok) {
  return {
    success: false,
    message: result.errors?.msg || result.message || "Failed to change password",
  };
}
    
 return result
  
  } catch (error) {
    console.log("Change password error:", error);
  }
}
