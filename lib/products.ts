export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Leather Wallet",
    price: 49.0,
    image: "https://picsum.photos/seed/wallet/480/320",
    description: "Timeless full-grain leather wallet with multiple card slots.",
  },
  {
    id: "p2",
    name: "Noise-Cancelling Headphones",
    price: 199.0,
    image: "https://picsum.photos/seed/headphones/480/320",
    description: "Comfortable over-ear headphones with active noise cancellation.",
  },
  {
    id: "p3",
    name: "Stainless Water Bottle",
    price: 24.5,
    image: "https://picsum.photos/seed/bottle/480/320",
    description: "Insulated bottle keeps drinks cold for 24 hours.",
  },
  {
    id: "p4",
    name: "Minimalist Backpack",
    price: 89.99,
    image: "https://picsum.photos/seed/backpack/480/320",
    description: "Lightweight backpack with padded laptop sleeve.",
  },
  {
    id: "p5",
    name: "Ceramic Mug",
    price: 14.0,
    image: "https://picsum.photos/seed/mug/480/320",
    description: "Handmade ceramic mug, dishwasher safe.",
  },
  {
    id: "p6",
    name: "Pocket Notebook",
    price: 9.99,
    image: "https://picsum.photos/seed/notebook/480/320",
    description: "Small notebook for notes and sketches.",
  },
];

export default products;
