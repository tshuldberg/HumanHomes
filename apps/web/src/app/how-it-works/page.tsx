import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
          HumanHomes
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">How It Works</h1>
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">1. Discover Neighborhoods</h2>
            <p className="text-charcoal-600 leading-relaxed">
              Browse neighborhoods through stories from the people who live there. No search bars —
              just communities, character, and the feel of a place.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">2. Connect Directly</h2>
            <p className="text-charcoal-600 leading-relaxed">
              When you find a home that resonates, introduce yourself directly to the seller.
              Every first message includes your story — not just your offer.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">3. Build Trust</h2>
            <p className="text-charcoal-600 leading-relaxed">
              Our community verification system lets neighbors vouch for each other.
              The more your community trusts you, the stronger your profile.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">4. Close Together</h2>
            <p className="text-charcoal-600 leading-relaxed">
              Use our guided tools for offers, disclosures, and closing coordination.
              Find independent inspectors, attorneys, and title companies — all without an agent.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
