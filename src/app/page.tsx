import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-20 flex flex-col items-center justify-center bg-[url('/banner.png')] bg-no-repeat bg-[length:100%_100%]">
        <p className="text-lg text-black text-center max-w-2xl mb-8 mt-12">
          Welcome to Crafting by Moonlight - where creativity meets precision under the gentle glow of the moon. 
          We specialize in creating beautiful, high-quality 3D printed items that bring magic to your everyday life.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">
            Visit Our Shop
          </Link>
        </Button>
      </main>
    </div>
  );
}