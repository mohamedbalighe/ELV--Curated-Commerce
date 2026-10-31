import { getTokenFun } from "@/uitilites/getTokenFun";

export async function getcart(){

    // get token , prodId
    const token = await getTokenFun()
    if(!token){
        throw new Error('Unauthorized')
    }

    try {
        const response= await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
            method: 'GET' ,
            headers :{
                token : token ,
                'Content-type':'application/json'
            }
        })

        if(!response.ok) throw new Error('Unauthorized')

        const payload = await response.json()

        console.log("payload..........",payload);

        return payload

    } catch (error) {

        throw new Error('Unauthorized')

    }
}