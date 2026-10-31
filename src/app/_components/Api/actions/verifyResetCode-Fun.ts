"use server";


export async function verifyResetCode_Fun(resetCode:string) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
            resetCode: resetCode,
         }),
      }
    );

    const payload = await response.json();
    console.log("verify-reset-code Api:", payload);

    if (!response.ok) {
      throw new Error(payload.message || "verify-reset-code Api failed");
    }

    return payload;
  } catch (error) {
    console.error("verify-reset-code Api error:", error);
    throw error;
  }
}