import Link from "next/link";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:underline font-medium"
        >
          Return to homepage
        </Link>
      </main>
    </>
  );
} 