import { SignupForm } from "@/components/signup-form";
import { Header } from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Crafting by Moonlight account to start shopping for beautiful 3D printed items.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 sm:px-6 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create an Account</h1>
        <SignupForm />
      </main>
    </div>
  );
}
