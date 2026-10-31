"use client";

import removeWishlistFun from "./removeWishlistFun";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RemoveWishlistBtn({prodId,}:{prodId: string;}) {
  const router = useRouter();
  async function handleRemove() {
    try {
      const data = await removeWishlistFun(prodId);

      console.log("Remove wishlist response:", data);
      toast.success("Item removed successfully");
    
      router.refresh();
    } catch (error) {
      console.error("Remove wishlist error:", error);

      toast.error("Failed to remove item");
    }
  }

  return (
    <button
      onClick={handleRemove}
      type="button"
      aria-label="Remove from wishlist"
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-[#D4AF37] hover:text-white"
    >
      <Heart
        size={16}
        strokeWidth={1.7}
        className="fill-black"
      />
    </button>
  );
}