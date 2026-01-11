"use client";
import Image from "next/image";
import React from "react";
import type { Product } from "../../lib/products";
import { useCart } from "../context/CartContext";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { add } = useCart();
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {product.image && (
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-md font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</div>
          <button
            onClick={() => add(product)}
            className="rounded bg-black px-3 py-1 text-sm font-semibold text-white hover:opacity-95 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
