"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, createQueryClient, createTRPCLinks } from "@humanhomes/api-client";

const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

interface TRPCProviderProps {
  children: React.ReactNode;
  getToken?: () => Promise<string | null>;
}

export function TRPCProvider({ children, getToken }: TRPCProviderProps) {
  const [queryClient] = useState(() => createQueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: createTRPCLinks(apiUrl, getToken),
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export { trpc };
