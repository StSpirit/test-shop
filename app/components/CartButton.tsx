"use client";
import React from "react";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { totalItems, setOpen, open } = useCart();
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-sm font-semibold text-white cursor-pointer"
    >
      Cart
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}
