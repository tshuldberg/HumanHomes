import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@humanhomes/shared",
    "@humanhomes/trpc",
    "@humanhomes/api-client",
    "@humanhomes/ui",
  ],
};

export default nextConfig;
