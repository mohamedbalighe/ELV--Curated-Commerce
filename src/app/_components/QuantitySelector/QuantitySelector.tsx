"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className="flex items-center border border-neutral-300 rounded-sm">
      <button
        type="button"
        onClick={decreaseQuantity}
        className="px-3 py-2 text-xs text-neutral-500 hover:text-black"
      >
        -
      </button>

      <span className="px-3 py-2 text-xs font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={increaseQuantity}
        className="px-3 py-2 text-xs text-neutral-500 hover:text-black"
      >
        +
      </button>
    </div>
  );
}