import Link from "next/link";
import { Header } from "@/components/header";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. As a consolation, here&apos;s a picture of the Moonlight mascot :)
        </p>
        <Image src={`/404_${Math.floor(Math.random() * 3)}.jpeg`} alt="404" width={300} height={300} />
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