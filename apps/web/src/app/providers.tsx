"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { TRPCProvider } from "@/lib/trpc";
import { DevAuthProvider } from "@/lib/dev-auth";

function AuthenticatedTRPCProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  return <TRPCProvider getToken={getToken}>{children}</TRPCProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Dev mode: no Clerk keys, use simple dev auth
  if (!publishableKey) {
    return (
      <DevAuthProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </DevAuthProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AuthenticatedTRPCProvider>{children}</AuthenticatedTRPCProvider>
    </ClerkProvider>
  );
}
