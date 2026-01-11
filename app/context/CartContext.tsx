"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../../lib/products";

type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  discountRate: number;
  discountAmount: number;
  discountedTotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  updateQty: (id: string, qty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      console.log("Loaded cart from localStorage:", raw);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const add = (p: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...p, quantity: 1 }];
    });
    //setOpen(true);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  // Discount: 10% applied only to items of the same product when that product's quantity >= 5
  const discountRate = 0.1;
  // Sum discount only for line items that meet the threshold
  const discountAmount = parseFloat(
    items
      .filter((it) => it.quantity >= 5)
      .reduce((s, it) => s + it.quantity * it.price * discountRate, 0)
      .toFixed(2)
  );
  const discountedTotal = parseFloat((totalPrice - discountAmount).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        clear,
        totalItems,
        totalPrice,
        discountRate,
        discountAmount,
        discountedTotal,
        open,
        setOpen,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
