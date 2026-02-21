"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/lib/trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // During build (SSG) without Clerk keys, render children without Clerk
  if (!publishableKey) {
    return <TRPCProvider>{children}</TRPCProvider>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <TRPCProvider>{children}</TRPCProvider>
    </ClerkProvider>
  );
}
