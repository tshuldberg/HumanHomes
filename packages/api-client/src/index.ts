import { createTRPCReact, httpBatchLink, type CreateTRPCReact } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "@humanhomes/trpc";

/**
 * tRPC React hooks — use throughout web and mobile apps.
 */
export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

/**
 * Create a shared QueryClient instance with sensible defaults.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        retry: 1,
      },
    },
  });
}

/**
 * Create tRPC client links for a given API URL.
 */
export function createTRPCLinks(apiUrl: string, getToken?: () => Promise<string | null>) {
  return [
    httpBatchLink({
      url: `${apiUrl}/trpc`,
      async headers() {
        const token = await getToken?.();
        return token ? { authorization: `Bearer ${token}` } : {};
      },
    }),
  ];
}

export type { AppRouter } from "@humanhomes/trpc";
