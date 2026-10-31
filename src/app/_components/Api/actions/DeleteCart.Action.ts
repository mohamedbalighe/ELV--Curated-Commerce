'use server'
import { getTokenFun } from "@/uitilites/getTokenFun";


export async function DeleteCart(){

    // get token , prodId
    const token = await getTokenFun()
    if(!token){
        throw new Error('Unauthorized')
    }

    try {
        const response= await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
            method: 'DELETE',
            headers :{
                token : token ,
                'Content-type':'application/json',
            }
        })

        if(!response.ok) throw new Error('Unauthorized')

        const payload = await response.json()

        console.log("payload(DeleteeCart)....",payload);

        return payload

    } catch (error) {
    console.error("Delete cart error:", error);
    throw error;
  }
}