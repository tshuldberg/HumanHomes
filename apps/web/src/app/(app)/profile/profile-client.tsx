"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ProfileClient() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
          Your Profile
        </h1>
        <p className="text-charcoal-500 text-lg">
          This is how buyers and sellers will see you.
        </p>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-100 flex items-center justify-center shrink-0">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <span className="text-2xl font-serif font-bold text-terracotta-600">
                {user?.firstName?.[0] ?? "?"}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-xl font-semibold text-charcoal-900">
              {user?.fullName ?? "Your Name"}
            </h2>
            <p className="text-sm text-charcoal-400 mt-0.5">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            {/* Trust tier */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-xs font-semibold">Unverified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role toggle */}
      <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50 mb-6">
        <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-4">
          I am a...
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setRole("buyer")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
              role === "buyer"
                ? "bg-terracotta-500 text-white"
                : "bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100"
            }`}
          >
            Looking to Buy
          </button>
          <button
            onClick={() => setRole("seller")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
              role === "seller"
                ? "bg-sage-500 text-white"
                : "bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100"
            }`}
          >
            Selling My Home
          </button>
        </div>
      </div>

      {/* Bio / Story */}
      <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50">
        <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
          Your Story
        </h3>
        <p className="text-sm text-charcoal-500 mb-4">
          Tell people a little about yourself and what you&apos;re looking for. This
          is shared when you introduce yourself to a seller.
        </p>
        <textarea
          className="w-full rounded-xl border border-charcoal-200 bg-warm-white px-4 py-3 text-charcoal-800 placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-colors resize-none"
          rows={4}
          placeholder={
            role === "buyer"
              ? "I'm a teacher and parent of two, looking for a home with a yard where the kids can play..."
              : "We've lived here for 20 years and raised our family in this home. We hope the next family loves it as much as we did..."
          }
        />
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2.5 text-sm font-semibold bg-terracotta-500 text-white rounded-xl hover:bg-terracotta-600 transition-colors">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
