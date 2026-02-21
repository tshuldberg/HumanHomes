"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/discover", label: "Discover", icon: CompassIcon },
  { href: "/messages", label: "Messages", icon: ChatIcon },
  { href: "/profile", label: "Profile", icon: PersonIcon },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Desktop sidebar + Mobile top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="font-serif text-xl font-bold text-charcoal-900 tracking-tight">
            HumanHomes
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-terracotta-50 text-terracotta-600"
                      : "text-charcoal-600 hover:text-charcoal-800 hover:bg-charcoal-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/sell"
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold bg-terracotta-500 text-white rounded-xl hover:bg-terracotta-600 transition-colors"
            >
              Sell Your Home
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-charcoal-100 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  active
                    ? "text-terracotta-600"
                    : "text-charcoal-400 hover:text-charcoal-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* Minimal inline SVG icons to avoid external dependencies */

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity={0.15} stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
