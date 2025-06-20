import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

type ProductCardProps = Product;

export function ProductCard({ title, description, imageUrl, price, category }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow hover:shadow-md transition">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{category}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xl font-semibold text-gray-900">${price.toFixed(2)}</span>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
