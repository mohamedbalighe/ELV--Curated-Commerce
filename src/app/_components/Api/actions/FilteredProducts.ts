'use server'

import { ProductType } from "../services/Types/productType";

export type ProductFilters = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  brandId?: string;
  sort?: string;
  keyword?: string;
  limit?: number;
};

export async function getFilteredProducts(filters: ProductFilters): Promise<ProductType[]> {
  try {
    const params = new URLSearchParams();

    if (filters.categoryId) {
      params.set("category[in]", filters.categoryId);
    }

    if (filters.minPrice !== undefined) {
      params.set("price[gte]", String(filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      params.set("price[lte]", String(filters.maxPrice));
    }

    if (filters.brandId) {
      params.set("brand", filters.brandId);
    }

    if (filters.sort) {
      params.set("sort", filters.sort);
    }

    if (filters.keyword) {
      params.set("keyword", filters.keyword);
    }



    if (filters.limit) {
      params.set("limit", String(filters.limit));
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to filter products");
    }

    const result = await response.json();
    return Array.isArray(result.data) ? result.data : [];

  } catch (error) {
    console.error("Filtering products error:", error);
    throw error;
  }
}
