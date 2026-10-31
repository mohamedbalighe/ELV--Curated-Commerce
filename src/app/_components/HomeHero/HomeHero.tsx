"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  category: string;
}

interface HomeHeroProps {
  PageList: string[];
  categories: {
    id: string;
    name: string;
  }[];
}

const DURATION = 6000;
const FADE_CONFIG = { crossFade: true };

const slideContent = [
  {
    eyebrow: "A new perspective",
    title: "Beyond the Ordinary.",
    description:
      "A considered collection of contemporary essentials for modern living.",
    cta: "Explore the collection",
    category: "New arrivals",
  },
  {
    eyebrow: "The art of simplicity",
    title: "Less. But better.",
    description:
      "Timeless pieces, thoughtful details, and a more considered approach to style.",
    cta: "Discover the edit",
    category: "Essentials",
  },
  {
    eyebrow: "Made for your everyday",
    title: "Define your own.",
    description:
      "Discover distinctive pieces that make everyday choices feel exceptional.",
    cta: "Shop the selection",
    category: "Curated picks",
  },
];

function getSlides(
  images: string[],
  categories: { id: string; name: string }[]
): HeroSlide[] {
  const targetCategories = [
    "Men's Fashion",
    "Women's Fashion",
    "Electronics",
  ];

  return images
    .filter(
      (image) =>
        typeof image === "string" && image.trim() !== ""
    )
    .slice(0, slideContent.length)
    .map((image, index) => {
      const categoryName = targetCategories[index];

      const category = categories.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          categoryName.toLowerCase()
      );

      return {
        ...slideContent[index],
        image,
        category: category?.name ?? slideContent[index].category,
        href: category
          ? `/shop?categoryId=${encodeURIComponent(category.id)}`
          : "/shop",
      };
    });
}

export default function HomeHero({
  PageList,
  categories,
}: HomeHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = getSlides(
    Array.isArray(PageList) ? PageList : [],
    Array.isArray(categories) ? categories : []
  );

  const slidesCount = slides.length;

  useEffect(() => {
    if (slidesCount < 2) return;

    const timer = setTimeout(() => {
      const instance = swiperRef.current;

      if (!instance || instance.destroyed) return;

      instance.slideTo((instance.activeIndex + 1) % slidesCount);
    }, DURATION);

    return () => clearTimeout(timer);
  }, [activeIndex, slidesCount]);

  if (!slidesCount) return null;

  const goToSlide = (index: number) => {
    const instance = swiperRef.current;

    if (!instance || instance.destroyed || slidesCount < 2) return;

    instance.slideTo(index);
  };

  const goPrev = () => {
    const instance = swiperRef.current;

    if (!instance || instance.destroyed || slidesCount < 2) return;

    instance.slidePrev();
  };

  const goNext = () => {
    const instance = swiperRef.current;

    if (!instance || instance.destroyed || slidesCount < 2) return;

    instance.slideNext();
  };

  return (
    <section
      aria-label="Featured collection"
      className="campaign-hero w-full overflow-hidden bg-background px-3 py-3 text-[#1C1917] sm:px-5 sm:py-5 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={FADE_CONFIG}
          rewind={slidesCount > 1}
          allowTouchMove={true}
          speed={850}
          onSwiper={(instance) => {
            swiperRef.current = instance;
            setActiveIndex(instance.activeIndex);
          }}
          onSlideChange={(instance) =>
            setActiveIndex(instance.activeIndex)
          }
          className="campaign-swiper"
        >
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <SwiperSlide key={`${slide.image}-${index}`}>
                <div className="relative isolate min-h-[460px] overflow-hidden bg-[#D8D0C4] [@media(min-width:381px)]:min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) calc(100vw - 24px), (max-width: 1024px) calc(100vw - 40px), calc(100vw - 64px)"
                    className="object-cover object-center"
                  />

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20 sm:from-black/65 sm:via-black/10 sm:to-black/20" />

                  {/* Slide content */}
                  <div className="campaign-reveal absolute inset-x-4 bottom-6 z-10 sm:inset-x-8 sm:bottom-10 lg:inset-x-16 lg:bottom-16">
                    <p className="mb-3 text-[10px] font-medium uppercase dark:text-[#f5c116] tracking-[0.16em] text-white/90 min-[400px]:text-[11px] sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
                      {slide.eyebrow}
                    </p>

                    <Heading className="max-w-[820px] dark:text-amber-800 font-serif text-[clamp(2.2rem,9vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.04em] text-white sm:text-[clamp(3.5rem,7vw,5rem)] sm:leading-[0.92] lg:text-[7rem]">
                      {slide.title}
                    </Heading>

                    <p className="mt-4 max-w-md text-[13px] leading-6 text-white/90 sm:mt-5 sm:text-base sm:leading-7 dark:text-[#f5c116]">
                      {slide.description}
                    </p>

                    <Link
                      href={slide.href}
                      className="group relative z-20 mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-sm bg-white px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-[#1C1917] transition-colors dark:bg-black  dark:text-white hover:bg-[#D4AF37] min-[400px]:gap-3 min-[400px]:px-5 sm:mt-7 sm:px-7 sm:py-4 sm:text-xs sm:tracking-[0.14em]"
                    >
                      <span>{slide.cta}</span>

                      <ArrowUpRight
                        size={16}
                        className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation bar */}
        <div className="relative bg-[#1C1917] text-white">
          {/* Progress indicator */}
          <div
            className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-white/15"
            aria-hidden="true"
          >
            <div
              key={activeIndex}
              className={`campaign-progress h-full bg-[#D4AF37] ${
                slidesCount > 1
                  ? "campaign-progress-active"
                  : "w-full"
              }`}
            />
          </div>

          <div className="flex flex-col gap-4 px-4 py-4 min-[400px]:px-5 sm:px-8 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-12">
            {/* Categories */}
            <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-3 sm:gap-x-5">
              {slides.map((item, itemIndex) => (
                <button
                  key={`${item.category}-${itemIndex}`}
                  type="button"
                  onClick={() => goToSlide(itemIndex)}
                  disabled={slidesCount < 2}
                  aria-label={`Show ${item.category}`}
                  aria-current={
                    activeIndex === itemIndex ? "true" : undefined
                  }
                  className={`border-b pb-1 text-[9px] uppercase tracking-[0.07em] transition-colors disabled:cursor-default min-[400px]:text-[10px] sm:text-xs sm:tracking-[0.14em] ${
                    activeIndex === itemIndex
                      ? "border-[#D4AF37] text-white"
                      : "border-transparent text-white/55 hover:text-white"
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>

            {/* Counter and arrows */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 lg:shrink-0 lg:justify-end lg:border-0 lg:pt-0">
              <div
                className="flex shrink-0 items-center gap-2 tabular-nums"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="font-serif text-lg">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span className="text-xs text-white/40">/</span>

                <span className="text-xs text-white/55">
                  {String(slidesCount).padStart(2, "0")}
                </span>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={slidesCount < 2}
                  aria-label="Previous collection"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/30 transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1917] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={slidesCount < 2}
                  aria-label="Next collection"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/30 transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1917] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .campaign-swiper .swiper-slide {
          overflow: hidden;
        }

        .campaign-swiper .swiper-slide-active .campaign-reveal {
          animation: campaignReveal 800ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .campaign-progress {
          width: 0;
        }

        .campaign-progress-active {
          animation: campaignProgress ${DURATION}ms linear forwards;
        }

        @keyframes campaignReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes campaignProgress {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .campaign-swiper .campaign-reveal,
          .campaign-progress-active {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
