"use client";
import React from "react";
import { CartProvider } from "../context/CartContext";
import Catalog from "./Catalog";
import CartButton from "./CartButton";
import CartPanel from "./CartPanel";

export default function AppShell() {
  return (
    <CartProvider>
      <header className="sticky top-0 z-40 h-16 mb-6 flex items-center justify-between bg-white/90 backdrop-blur-sm px-6 shadow-sm">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="text-3xl font-bold cursor-pointer"
        >
          Test Shop
        </button>
        <CartButton />
      </header>
      <Catalog />
      <CartPanel />
    </CartProvider>
  );
}
