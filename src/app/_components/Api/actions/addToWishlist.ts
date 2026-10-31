'use server'

import { getTokenFun } from "@/uitilites/getTokenFun"



export async function AddToWishlist(prodId: string) {
    // get token , prodId
        const token = await getTokenFun()
        if(!token){
            throw new Error('Unauthorized')
        }
    
try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method:'POST',
        body: JSON.stringify({
           productId: prodId
          }),
        headers:{
            token:token,
            'Content-type':'application/json',
        }
    })
       if(!response.ok){
        throw new Error('wishlist Api responce Faild')
       }
        const payload = await response.json()
        console.log("PayLoad.(WishList)..",payload);
        return payload

} catch (error) {
    console.log(error); 
        throw error;

}
    
}