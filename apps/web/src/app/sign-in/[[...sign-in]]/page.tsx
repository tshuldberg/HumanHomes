export const dynamic = "force-dynamic";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 bg-warm-white">
      <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 mb-8 tracking-tight">
        HumanHomes
      </Link>
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "rounded-2xl shadow-soft border border-charcoal-50",
            headerTitle: "font-serif",
            formButtonPrimary:
              "bg-terracotta-500 hover:bg-terracotta-600 rounded-xl",
          },
        }}
      />
    </main>
  );
}
