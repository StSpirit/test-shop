"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Product } from "../../lib/products";
import ProductCard from "./ProductCard";

type Props = { products: Product[] };

export default function ProductCarousel({ products }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w < 768) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // clamp index when itemsPerView or products change
  useEffect(() => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setIndex((i) => Math.max(0, Math.min(maxIndex, i)));
  }, [itemsPerView, products.length]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(products.length - itemsPerView, i + 1));

  const itemWidth = 100 / itemsPerView;

  return (
    <div className="relative mb-6">
      <div className="overflow-hidden">
        <div
          ref={ref}
          role="list"
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * itemWidth}%)` }}
        >
          {products.map((p, i) => (
            <div
              key={p.id}
              role="listitem"
              className="flex-shrink-0 px-2"
              style={{ width: `${itemWidth}%` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        disabled={index <= 0}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        ‹
      </button>

      <button
        onClick={next}
        disabled={index >= Math.max(0, products.length - itemsPerView)}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        ›
      </button>

      <div className="mt-3 flex items-center justify-center gap-2">
        {Array.from({ length: Math.max(1, products.length - itemsPerView + 1) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? "bg-black" : "bg-gray-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
