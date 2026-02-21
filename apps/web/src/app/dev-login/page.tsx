"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDevAuth } from "@/lib/dev-auth";

export default function DevLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useDevAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (signIn(username, password)) {
      router.push("/discover");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 bg-warm-white">
      <Link
        href="/"
        className="font-serif text-2xl font-bold text-charcoal-900 mb-2 tracking-tight"
      >
        HumanHomes
      </Link>
      <p className="text-sm text-charcoal-400 mb-8">Development Login</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-charcoal-200 bg-warm-white px-4 py-3 text-charcoal-800 placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-400"
            placeholder="admin"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-charcoal-200 bg-warm-white px-4 py-3 text-charcoal-800 placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-400"
            placeholder="admin"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 text-sm font-semibold bg-terracotta-500 text-white rounded-xl hover:bg-terracotta-600 transition-colors"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
