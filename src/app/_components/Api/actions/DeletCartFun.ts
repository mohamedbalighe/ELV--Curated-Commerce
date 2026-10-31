'use server'
import { getTokenFun } from "@/uitilites/getTokenFun";


export async function DeleteCartFun(prodId : string){

    // get token , prodId
    const token = await getTokenFun()
    if(!token){
        throw new Error('Unauthorized')
    }

    try {
        const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` , {
            method: 'DELETE' ,
            headers :{
                token : token ,
                'Content-type':'application/json'
            }
        })

        if(!response.ok) throw new Error('Unauthorized')

        const payload = await response.json()

        console.log("payload(DeletCartFun)....",payload);

        return payload

    }catch (error) {
    console.log("Delete cart error:", error);
    throw error;
}
}