'use server'

import { BrandType } from './../services/Types/productType';

export  async function getAllBrands():Promise<BrandType[]>{
try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
    
    // التصحيح هنا: استخدام response.ok
    if(!response.ok) {
        throw new Error(`Error at All Brand Api>>> Status: ${response.status}`)
    }
    
    const Payload = await response.json()
    console.log("ALL Brands Data>>>", Payload)

 return Payload.data;
} catch (error) {
    console.log("Error at All Brand Api", error)
    throw error
}
}


export async function getSpecificBrand(id:string){

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    
    // التصحيح هنا: استخدام response.ok
    if(!response.ok) {
        throw new Error(`Error at Specific Brand Api>>> Status: ${response.status}`)
    }
    
    const Payload = await response.json()
    console.log("ALL Brands Data>>>", Payload)

 return Payload.data
} catch (error) {
    console.log("Error at All Brand Api", error)
    throw error
}
}