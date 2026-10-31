
import { ProductType } from '../services/Types/productType'

export default async function getAllCards(brandId?: string): Promise<ProductType[]> {
  try {
    const url = brandId
    ? `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    : "https://ecommerce.routemisr.com/api/v1/products";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
    const result = await response.json();
    return result.data;


  } catch (error) {
 console.error("Error fetching products:", error);
    throw error;
    }
  
}



export  async function getProductDetails(prodId: string) :Promise<ProductType> {
    try {
     const  response= await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
     if (!response.ok) throw new Error('Api ProductDetails Error')
    const data= await response.json()
    return data.data
    
    } catch (error) {
        throw new Error('Api ProductDetails Error')
    }
 
}

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductType[]> {
  try {
    console.log("Fetching products for:", categoryId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${encodeURIComponent(categoryId)}`
    );

    const result = await response.json();

    console.log("CATEGORY ID:", categoryId);
    console.log("CATEGORY STATUS:", response.status);
    console.log("CATEGORY DATA:", result);

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch category products"
      );
    }

    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
}
