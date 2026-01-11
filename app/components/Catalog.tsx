import ProductCarousel from "./ProductCarousel";
import { products } from "../../lib/products";
import dynamic from "next/dynamic";

const CatalogClient = dynamic(() => import("./CatalogClient"), { ssr: false });

export default function Catalog() {
  return (
    <section className="w-full pt-10 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shop Catalog</h2>
        </header>

        <ProductCarousel products={products.slice(0, 5)} />

        <CatalogClient />
      </div>
    </section>
  );
}
