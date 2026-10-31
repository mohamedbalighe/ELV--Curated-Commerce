'use server'
import { getTokenFun } from "@/uitilites/getTokenFun";
import { CheckoutFormData } from '../../../../checkout/checkoutForm';


export async function PayCash(cartId : string , shippingAddress: CheckoutFormData){

    // get token 
    const token = await getTokenFun()
    if(!token){
        throw new Error('Unauthorized')
    }
console.log("CASH CART ID >>>", cartId);
console.log("CASH TOKEN >>>", token);
    try {
        const response= await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
            method: 'POST' ,
            body : JSON.stringify({
                shippingAddress:shippingAddress,
            }) ,
            headers :{
                token : token ,
                'Content-type':'application/json'
            }
        })

        console.log("STATUS >>>", response.status);

const payload = await response.json();

console.log("PAYCASH RESPONSE >>>", payload);

if (!response.ok) {
  throw new Error(payload?.message || `Request failed: ${response.status}`);
}
 return payload
        

    } catch (error) {
     console.log('Unauthorized',error)
      throw error
    }
}