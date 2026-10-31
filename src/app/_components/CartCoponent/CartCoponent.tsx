
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { CardResponseType } from '../Api/services/Types/CardType';
import Link from 'next/link';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { DeleteCartFun } from '../Api/actions/DeletCartFun';
import { toast } from 'react-toastify';
import { UpdateCartFun } from '../Api/actions/UpdateCartFun';
import { DeleteCart } from '../Api/actions/DeleteCart.Action';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function CartComponent() {
  const query = useQueryClient();

  const { data, isLoading, error } = useQuery<CardResponseType>({
    queryKey: ['getcart'],
    queryFn: async () => {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
  });

  const { mutate: DeLeteCartfunction, isPending: isDeletingItem } =
    useMutation({
      mutationFn: DeleteCartFun,
      onSuccess: () => {
        toast.success('Product deleted successfully');
        query.invalidateQueries({ queryKey: ['getcart'] });
      },
      onError: () => {
        toast.error('Failed to delete product');
      },
    });

  const { mutate: UpdateCartfunction, isPending: isUpdatingItem } =
    useMutation({
      mutationFn: UpdateCartFun,
      onSuccess: () => {
        toast.success('Product updated successfully');
        query.invalidateQueries({ queryKey: ['getcart'] });
      },
      onError: () => {
        toast.error('Failed to update product');
      },
    });

  const { mutate: DeLeteCart, isPending: isClearingCart } = useMutation({
    mutationFn: DeleteCart,
    onSuccess: () => {
      toast.success('Cart deleted successfully');
      query.invalidateQueries({ queryKey: ['getcart'] });
    },
    onError: () => {
      toast.error('Failed to clear cart');
    },
  });

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <BeatLoader size={8} color="#D4AF37" />
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">
            Preparing your selection
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-5 py-16 text-foreground">
        <div className="w-full max-w-md border-y border-border py-12 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-border text-accent ">
            <AlertCircle size={24} strokeWidth={1.4} />
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-accent ">
            Cart unavailable
          </p>

          <h2 className="font-serif text-2xl font-normal">
            We couldn’t load your cart.
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-foreground">
            Please try again. Your cart items may still be available.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-background px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D4AF37]"
          >
            <RotateCcw size={15} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  const products = data?.data?.products ?? [];
  const totalPrice = data?.data?.totalCartPrice ?? 0;
  const itemCount = data?.numOfCartItems ?? 0;
  const hasItems = products.length > 0;

  if (!hasItems) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-background px-5 py-20 text-foreground sm:px-8">
        <section className="w-full max-w-3xl border-y border-border py-12 sm:py-16">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="mb-7 rounded-sm flex h-16 w-16 items-center justify-center border border-[#D8C8B0] bg-[#F5F3EF] text-accent ">
              <ShoppingBag size={27} strokeWidth={1.3} />
            </div>

            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[#8d6e43]">
              
ELVÉ / Your selection
            </p>

            <h1 className="font-serif text-3xl font-normal tracking-[-0.035em] sm:text-4xl">
              Your bag is waiting
              <span className="mt-1 block italic text-accent ">
                for something special.
              </span>
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-7 text-foreground">
              You haven’t added anything yet. Explore our collection and
              discover pieces worth bringing home.
            </p>

            <Link
              href="/shop"
              className="group mt-8 rounded-sm inline-flex min-h-12 items-center gap-5 bg-background px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D4AF37]"
            >
              Explore the collection
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1600px]">
         <div className="mb-7 sm:mb-8">
          <Breadcrumbs items={[{ label: "Shopping bag" }]} />
        </div>
        {/* Page Header */}
        <header className="mb-9 flex flex-col gap-5 border-b border-border pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          
          <div>
            
           <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent ">
              Your selection
            </p>


            <h1 className="text-3xl font-medium tracking-tight font-serif  sm:text-4xl">
              Shopping bag<span className="text-accent ">.</span>
            </h1>
             

            <p className="mt-3 text-sm text-gray-500">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>

          <button
            type="button"
            onClick={() => DeLeteCart()}
            disabled={isClearingCart}
            className="inline-flex min-h-10 rounded-sm w-fit items-center gap-2 border border-border px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} />
            {isClearingCart ? 'Clearing cart...' : 'Empty bag'}
          </button>
        </header>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
          {/* Cart Items */}
          <section className="min-w-0">
            <div className="mb-4 hidden grid-cols-[minmax(0,1fr)_110px_100px] gap-4 border-b border-border pb-3 text-[9px] font-medium uppercase tracking-[0.2em] text-foreground sm:grid">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
            </div>

            <div className="divide-y divide-[#E8E2D9] border-y border-border">
              {products.map((item) => (
                <article
                  key={item._id}
                  className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_110px_100px] sm:items-center sm:gap-4 sm:py-6"
                >
                  {/* Product Details */}
                  <div className="flex min-w-0 gap-4 sm:gap-5">
                    <Link
                      href={`/productDetails/${item.product._id}`}
                      aria-label={`View ${item.product.title}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#F5F3EF] sm:h-32 sm:w-28"
                    >
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        unoptimized
                        sizes="(max-width: 639px) 96px, 112px"
                        className="object-contain p-1 transition-transform duration-500 hover:scale-105 sm:p-2"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col py-1">
                      <div className="flex items-start justify-between gap-3 sm:block">
                        <div className="min-w-0">
                          <p className="mb-2 truncate text-[9px] font-medium uppercase tracking-[0.16em] text-accent ">
                            {item.product.brand?.name ?? 'ELVÉ EDIT'}
                          </p>

                          <Link
                            href={`/productDetails/${item.product._id}`}
                            className="line-clamp-2 text-sm font-medium leading-6 transition-colors hover:text-accent  sm:text-base"
                          >
                            {item.product.title}
                          </Link>

                          <p className="mt-1 line-clamp-1 text-xs text-foreground">
                            {item.product.category?.name ?? 'Collection'}
                          </p>

                          <p className="mt-2 flex items-center gap-1 text-[11px] text-foreground">
                            <span className="text-accent ">★</span>
                            {item.product.ratingsAverage ?? '—'}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.product.title}`}
                          disabled={isDeletingItem}
                          onClick={() => DeLeteCartfunction(item.product._id)}
                          className="shrink-0 p-2 text-[#A7A19A] transition-colors hover:text-red-600 disabled:opacity-50 sm:hidden"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={isDeletingItem}
                        onClick={() => DeLeteCartfunction(item.product._id)}
                        className="mt-auto hidden w-fit items-center gap-1.5 pt-3 text-[9px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-red-600 disabled:opacity-50 sm:inline-flex"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between sm:justify-center">
                    <span className="text-xs text-foreground sm:hidden">
                      Quantity
                    </span>

                    <div className="flex h-9 items-center border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={isUpdatingItem || item.count <= 1}
                        onClick={() =>
                          UpdateCartfunction({
                            prodId: item.product._id,
                            count: item.count - 1,
                          })
                        }
                        className="flex h-9 w-8 items-center justify-center text-foreground transition-colors hover:bg-[#F5F3EF] hover:text-accent  disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus size={12} />
                      </button>

                      <span className="flex h-9 min-w-9 items-center justify-center border-x border-border px-2 text-xs font-medium tabular-nums">
                        {item.count}
                      </span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={isUpdatingItem}
                        onClick={() =>
                          UpdateCartfunction({
                            prodId: item.product._id,
                            count: item.count + 1,
                          })
                        }
                        className="flex h-9 w-8 items-center justify-center text-foreground transition-colors hover:bg-[#F5F3EF] hover:text-accent  disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between border-t border-border pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
                    <span className="text-xs text-foreground sm:hidden">
                      Item price
                    </span>

                    <span className="text-sm font-medium tabular-nums sm:text-base">
                      {item.price} EGP
                    </span>

                    <button
                      type="button"
                      aria-label={`Remove ${item.product.title}`}
                      disabled={isDeletingItem}
                      onClick={() => DeLeteCartfunction(item.product._id)}
                      className="hidden text-[#A7A19A] transition-colors hover:text-red-600 disabled:opacity-50 sm:ml-auto sm:mt-3 sm:block"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/shop"
              className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent "
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              Continue shopping
            </Link>
          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-8">
            <div className="border border-border bg-background p-5 sm:p-6">
              <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.22em] text-accent ">
                ELVÉ / Checkout
              </p>

              <h2 className="font-serif text-2xl font-normal">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-border pb-6 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-foreground">
                    Items ({itemCount})
                  </span>
                  <span className="font-medium tabular-nums">
                    {totalPrice} EGP
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-foreground">Shipping</span>
                  <span className="max-w-[150px] text-right text-xs leading-5 text-foreground">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 py-6">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-xl font-medium tracking-[-0.03em] tabular-nums sm:text-2xl">
                  {totalPrice}{' '}
                  <span className="text-xs font-normal">EGP</span>
                </span>
              </div>

              <Link
  href={`/checkout/${data?.cartId}`}
  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-sm border border-border dark:border-white bg-background px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-[#D4AF37] hover:text-black"
>
  Proceed to checkout
  <ArrowRight size={16} strokeWidth={1.5} />
</Link>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="flex items-center gap-3 text-xs text-foreground">
                  <ShieldCheck
                    size={16}
                    strokeWidth={1.4}
                    className="shrink-0 text-accent "
                  />
                  Secure checkout
                </div>

                <div className="flex items-center gap-3 text-xs text-foreground">
                  <Truck
                    size={16}
                    strokeWidth={1.4}
                    className="shrink-0 text-accent "
                  />
                  Shipping calculated at checkout
                </div>
              </div>

              <p className="mt-5 text-[10px] leading-5 text-foreground">
                Shipping fees and any additional charges are calculated
                during checkout.
              </p>
            </div>
          </aside>
        </div>

        {/* Brand Signature */}
        <footer className="mt-14 border-t border-border pt-7 sm:mt-20 sm:pt-9">
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-accent ">
            The ELVÉ philosophy
          </p>
          <p className="mt-3 font-serif text-xl sm:text-2xl">
            Distinctive by nature. Timeless by design.
          </p>
        </footer>
      </div>
    </main>
  );
}
