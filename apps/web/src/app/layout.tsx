import type { Metadata } from "next";
import { Providers } from "./providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "HumanHomes — Where Every Home Has a Story",
  description:
    "No agents. No gatekeeping. Just people and homes. Discover neighborhoods through stories, connect directly with sellers, and find a home that feels like yours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-warm-white text-charcoal-800 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
