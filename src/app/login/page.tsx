import { LoginForm } from "@/components/login-form";
import { Header } from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Crafting by Moonlight account to access your orders and saved items.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 sm:px-6 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
        <LoginForm />
      </main>
    </div>
  );
} 