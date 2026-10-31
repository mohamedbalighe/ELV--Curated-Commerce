'use server'
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getTokenFun(){
  const cookie= await cookies()
  const nextAuthToken = cookie.get('next-auth.session-token')?.value
 const accessToken = await decode({
  secret : process.env.NEXTAUTH_SECRET! ,
  token: nextAuthToken
})
console.log('SECRET.............', process.env.NEXTAUTH_SECRET)

console.log(accessToken); // ← شوف في Terminal ماذا يحتوي
return accessToken?.token

}