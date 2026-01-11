"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartPanel() {
  const { items, open, setOpen, remove, totalPrice, updateQty, clear, discountAmount, discountedTotal, discountRate } = useCart();
  if (!open) return null;

  return (
    <aside className="fixed right-4 top-16 z-50 w-80 max-w-full rounded bg-white p-4 shadow-lg max-h-[calc(100vh-96px)] overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <button onClick={() => setOpen(false)} aria-label="Close cart" title="Close" className="text-sm text-gray-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Cart is empty.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              {item.image && (
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                </div>
              )}
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-600">${item.price.toFixed(2)}</div>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 rounded border cursor-pointer">
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 rounded border cursor-pointer">
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-sm text-red-600 cursor-pointer"
                aria-label={`Remove ${item.name} from cart`}
                title="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">Subtotal</div>
        <div className="text-sm font-semibold">${totalPrice.toFixed(2)}</div>
      </div>

      {discountAmount > 0 && (
        <div className="mt-2 flex items-center justify-between text-sm text-green-700">
          <div>Discount (10% on items with 5+ qty)</div>
          <div>- ${discountAmount.toFixed(2)}</div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-medium">Total</div>
        <div className="text-sm font-semibold">${discountedTotal.toFixed(2)}</div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded bg-black px-3 py-2 text-sm font-semibold text-white cursor-pointer">Checkout</button>
        <button onClick={() => clear()} className="rounded border px-3 py-2 text-sm cursor-pointer">
          Clear
        </button>
      </div>
    </aside>
  );
}
