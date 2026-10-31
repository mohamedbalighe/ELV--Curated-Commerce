import { Category } from "../services/Types/productType";

export async function getShopCategories():Promise<Category[]>{

try {
    const response= await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
if (!response.ok) {
  console.error(
    "Categories API error:",
    response.status,
    response.url
  );

  throw new Error(`Categories API error: ${response.status}`);
}    
const payload = await response.json()

    console.log(payload);
    return payload.data

} catch (error) {

    throw new Error('API Error')
}

}

// export async function getSpecificCategory(id: string) {
//   try {
//     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`
//     );

//     if (!response.ok) throw new Error("API Error");

//     const payload = await response.json();

//     console.log(payload);

//     return payload.data;
//   }catch (error) {
//   console.error("getSpecificCategory failed:", error);
//   throw error;
// }
// }

export async function getSpecificCategory(id: string) {
  const url = `https://ecommerce.routemisr.com/api/v1/categories/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Category API failed:", {
      id,
      status: response.status,
      url,
      body: errorBody,
    });

    throw new Error(`Category API failed: ${response.status}`);
  }

  const payload = await response.json();
  return payload.data;
}