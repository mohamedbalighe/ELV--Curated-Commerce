'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

interface CarouselProps {
  spaceBetween: number;
  slidesPerView: number;
  PageList: string[];
  height?: string;
}

function Arrow({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <path
          d="m15 18-6-6 6-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9 18 6-6-6-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function Slider({
  spaceBetween,
  slidesPerView,
  PageList,
  height = 'h-45',
}: CarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!PageList?.length) return null;

  return (
    <div className="relative w-full px-7">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        className="w-full"
      >
        {PageList.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <div
              className={`${height} w-full overflow-hidden border border-[#E7E7EB] bg-[#F0F1F5]`}
            >
              <img
                src={src}
                alt={`Product image ${index + 1}`}
                className="h-full w-full cursor-pointer object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {PageList.length > slidesPerView && (
        <>
          <button
            type="button"
            aria-label="Previous images"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-[#E7E7EB] bg-white text-[#171717] transition hover:bg-[#F0F1F5]"
          >
            <Arrow direction="left" />
          </button>

          <button
            type="button"
            aria-label="Next images"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-[#E7E7EB] bg-white text-[#171717] transition hover:bg-[#F0F1F5]"
          >
            <Arrow direction="right" />
          </button>
        </>
      )}
    </div>
  );
}
