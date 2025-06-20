import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Geometric Vase",
    name: "Geometric Vase",
    description: "A stylish, modern vase perfect for home decor.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Home Decor",
  },
  {
    id: "2",
    title: "Phone Stand",
    name: "Phone Stand",
    description: "Minimalist 3D-printed phone stand for desk use.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: "3",
    title: "Articulated Dragon",
    name: "Articulated Dragon",
    description: "A fully articulated dragon toy with smooth joints.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "Figurines",
  },
];

export function ProductGrid() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
