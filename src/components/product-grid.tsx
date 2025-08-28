import { ProductCard } from "@/components/product-card";
import { sampleProducts } from "@/data/sample-products";

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
