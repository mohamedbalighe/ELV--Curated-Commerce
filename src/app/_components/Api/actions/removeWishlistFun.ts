'use server'

import { getTokenFun } from "@/uitilites/getTokenFun"

export default async function removeWishlistFun(prodId:string){
    const token = await getTokenFun()
    if(!token){
        throw new Error('Unauthorized')
    }
    
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,{
            method:'DELETE',
            headers:{
                token:token,
                'Content-type':'application/json',
            },
        })
        
        if(!response.ok){
            throw new Error('Failed to fetch wishlist')
        }
        
        const payload = await response.json()
        console.log("PayLoad.(RemoveWishList)..",payload);
        return payload

    } catch (error) {
        console.log(error); 
        throw error;
    }
}
