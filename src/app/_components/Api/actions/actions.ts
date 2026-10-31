'use server'

import { UserData } from "../services/Types/productType";


 export async function userRegister(userData:UserData){
     try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
      method:'POST',
      body: JSON.stringify(userData),
      headers:{
      'Content-Type': 'application/json',
      }
    })
    

    const payload= await response.json()
        console.log(payload);

   return response.ok 
    
  } catch (error) {
    console.log(error);
    
  }
}

