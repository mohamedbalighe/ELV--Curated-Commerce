"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../productCarde/productCarde";
import { ProductType } from "../Api/services/Types/productType";


export default function ProductSearch({
  products,
}: {
  products: ProductType[];
}) {

    const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);


  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "Product" : "Products"}
        </p>

        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-full text-foreground border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition dark:focus:border-white focus:border-black"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
<div className="flex flex-col items-center justify-center px-6 py-20 text-center">
  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background">
    <Search size={25} strokeWidth={1.3} className="text-foreground" />
  </div>

  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground">
    Search Results
  </p>

  <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
    No products found
  </h2>

  <p className="mt-3 max-w-sm text-sm leading-6 text-foreground">
    We couldn't find any products matching your search.
    Try a different keyword or explore our collection.
  </p>

  <button
    type="button"
    onClick={() => setSearchTerm("")}
    className="mt-7 inline-flex items-center justify-center border border-border bg-background px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition hover:bg-white hover:text-black"
  >
    Clear Search
  </button>
</div>

      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
