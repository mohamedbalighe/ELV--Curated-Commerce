import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
 const Token = await getToken({req:req})
 if(!Token) return NextResponse.json({message: 'unauthorized' , status :401})
    
    const response= await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
            headers :{
                token : Token.token,
                'Content-type':'application/json'
            }
        })

        if(!response.ok) throw new Error('Unauthorized')

        const payload = await response.json()

        console.log("payload....",payload);

        return NextResponse.json(payload)

    }
