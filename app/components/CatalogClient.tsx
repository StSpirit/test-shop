"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Product } from "../../lib/products";
import ProductCard from "./ProductCard";

type PageResp = { items: Product[]; total: number; page: number; pageSize: number };

export default function CatalogClient() {
  const pageSize = 24;
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = async (p: number, append = true) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products?page=${p}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data: PageResp = await res.json();
      setTotal(data.total);
      setPage(data.page);
      setItems((prev) => (append ? [...prev, ...data.items] : data.items));
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            const totalPages = Math.ceil(total / pageSize) || 0;
            if (page < totalPages) fetchPage(page + 1, true);
          }
        });
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, total, loading]);

  const totalPages = Math.ceil(total / pageSize) || 0;

  const jumpToPage = async (p: number) => {
    if (p < 1 || p > totalPages) return;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    await fetchPage(p, false);
    // restore previous scroll to prevent page jump when replacing content
    if (typeof window !== "undefined") window.scrollTo({ top: scrollY, behavior: "auto" });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {items.length} / {total} products</div>
        {totalPages > 0 && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {/* <button onClick={() => jumpToPage(1)} disabled={page <= 1} className="px-2 py-1 rounded border cursor-pointer disabled:cursor-not-allowed">
              First
            </button> */}
            <button
              onClick={() => jumpToPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
              className="px-2 py-1 rounded border cursor-pointer disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm">Page {page} / {totalPages}</span>
            <button
              onClick={() => jumpToPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
              className="px-2 py-1 rounded border cursor-pointer disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-8" />

      <div className="mt-6 flex items-center justify-center">
        {loading && <div className="text-sm text-gray-600">Loading...</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button onClick={() => fetchPage(1, false)} className="px-3 py-1 rounded border cursor-pointer">First</button>
        <button onClick={() => fetchPage(page, false)} className="px-3 py-1 rounded border cursor-pointer">Reload</button>
      </div>
    </div>
  );
}
