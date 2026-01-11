import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const pageSize = Math.max(1, parseInt(url.searchParams.get("pageSize") || "24", 10));

  const total = 1000;
  const start = (page - 1) * pageSize;
  const end = Math.min(total, start + pageSize);

  const items = [] as Array<Record<string, any>>;
  const adjectives = [
    "Classic",
    "Modern",
    "Vintage",
    "Sleek",
    "Compact",
    "Premium",
    "Eco",
    "Traveler",
    "Studio",
    "Urban",
    "Luxury",
    "Essential",
  ];
  const materials = ["Leather", "Steel", "Ceramic", "Canvas", "Bamboo", "Carbon", "Glass", "Wool"];
  const types = [
    "Wallet",
    "Headphones",
    "Water Bottle",
    "Backpack",
    "Mug",
    "Notebook",
    "Sunglasses",
    "Sneakers",
    "Lamp",
    "Speaker",
  ];

  const highlights = [
    "durable construction",
    "lightweight design",
    "long battery life",
    "insulated walls",
    "handmade finish",
    "water-resistant coating",
    "padded protection",
    "minimalist profile",
    "ergonomic fit",
    "fast charging",
  ];

  function generateName(index: number) {
    const a = adjectives[index % adjectives.length];
    const m = materials[(index + 3) % materials.length];
    const t = types[(index + 7) % types.length];
    return `${a} ${m} ${t}`;
  }

  function generateDescription(index: number) {
    const h1 = highlights[index % highlights.length];
    const h2 = highlights[(index + 4) % highlights.length];
    return `A ${adjectives[index % adjectives.length].toLowerCase()} ${types[(index + 7) % types.length].toLowerCase()} featuring ${h1} and ${h2}. Perfect for everyday use and gifting.`;
  }

  for (let i = start; i < end; i++) {
    // Prefix API-generated ids to avoid colliding with the static `lib/products` ids
    const id = `api-p${i + 1}`;
    const name = generateName(i);
    items.push({
      id,
      name,
      price: parseFloat((10 + ((i + 1) % 200) * 0.5).toFixed(2)),
      image: `https://picsum.photos/seed/product${i + 1}/480/320`,
      description: generateDescription(i),
    });
  }

  const body = {
    items,
    total,
    page,
    pageSize,
  };

  return NextResponse.json(body);
}
