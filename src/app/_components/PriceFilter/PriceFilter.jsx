
'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const maxPriceFromUrl = searchParams.get('maxPrice');

  const [price, setPrice] = useState(
    Number(maxPriceFromUrl) || 25000
  );

  useEffect(() => {
    setPrice(Number(maxPriceFromUrl) || 25000);
  }, [maxPriceFromUrl]);

  function applyFilter() {
    const params = new URLSearchParams(searchParams.toString());

    params.set('maxPrice', String(price));

    router.push(`/shop?${params.toString()}`);
  }

  function resetFilter() {
    setPrice(25000);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('maxPrice');

    router.push(params.size ? `/shop?${params.toString()}` : '/shop');
  }

  return (
    <div className="mb-10">
      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-foreground">
        Price
      </p>

      <input
        type="range"
        min="100"
        max="50000"
        step="100"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full accent-black"
      />

      <div className="mt-3 flex justify-between text-[11px] text-foreground">
        <span>EGP 100</span>
        <span className="font-medium text-foreground">
          EGP {price.toLocaleString('en-US')}
        </span>
      </div>

      <button
        onClick={applyFilter}
        className="mt-4 w-full rounded-sm bg-background border border-border  px-4 py-3 text-xs text-foreground hover:bg-neutral-800"
      >
        Apply Filters
      </button>

      <button
        onClick={resetFilter}
        className="mt-4 text-[10px] uppercase tracking-[0.18em] text-foreground underline underline-offset-4 hover:text-black"
      >
        Reset Filters
      </button>
    </div>
  );
}
