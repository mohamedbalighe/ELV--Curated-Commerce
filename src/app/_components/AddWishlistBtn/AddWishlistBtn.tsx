'use client'

import React from 'react'
import { AddToWishlist } from '../Api/actions/addToWishlist'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'

export type AddWishlistBtnProps = {
  prodId: string;
  className?: string;

}

export default function WishListBtn({ prodId, className = "" }: AddWishlistBtnProps) {

  async function handleAddToWishlist() {
      console.log("CLICKED PRODUCT ID:", prodId)

    try {
      const data = await AddToWishlist(prodId)

      if (data?.status === 'success') {
        toast.success('Product added to wishlist successfully')
      } else {
        toast.error('Failed to add product to wishlist')
      }
    } catch (error) {
      toast.error('Please log in first to add items to your Wishlist')
    }
  }

  return (
    <button
      onClick={handleAddToWishlist}
      aria-label="Add to wishlist"
      className={className}
    >
      <Heart className="w-4 h-4" />
    </button>
  )
}
