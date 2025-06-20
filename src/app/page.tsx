import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-20">
        <ProductGrid />
        <div className="mt-10 text-center">
          <p className="text-gray-600">New here? Create an account or log in to shop:</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}