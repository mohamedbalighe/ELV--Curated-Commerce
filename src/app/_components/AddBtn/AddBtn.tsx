'use client'
import { getTokenFun } from '@/uitilites/getTokenFun'
import { ReactNode } from 'react'
import { addToCart } from '../Api/actions/addToCart/addToCart'
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export default function AddBtn({cls, child,prodId}:{cls:string,child:ReactNode,prodId:string}) {
const query= useQueryClient()
    async function handleAddToCart() {
  try {
    const data = await addToCart(prodId);

    if (data?.message === 'Product added successfully to your cart') {
      toast.success(data.message);
          query.invalidateQueries({queryKey:['getcart']})

    } else {
      toast.error(data?.message || 'Failed to add product to cart');
    }
  } catch (error: any) {
    // Check if the error is due to missing authentication
    if (error?.message === 'Unauthorized') {
      toast.error('Please log in first to add items to your cart');
    } else {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  }
}

  return (
    <>
    <button  onClick={handleAddToCart}
            aria-label="Add to cart"
            className={cls}
            // className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-none hover:bg-slate-800 transition-colors active:scale-95"
          >
            {/* <Plus className={cls2 }/> */}
            {child}
          </button>

         

    </>
  )
}
