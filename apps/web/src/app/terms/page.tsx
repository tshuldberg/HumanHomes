import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
          HumanHomes
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">Terms of Service</h1>
        <p className="text-charcoal-500 mb-8">Last updated: February 2026</p>
        <div className="space-y-6 text-charcoal-600 leading-relaxed">
          <p>
            By using HumanHomes, you agree to these terms. HumanHomes is a platform that
            connects buyers and sellers directly — we are not a real estate brokerage and
            do not provide real estate advice.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal-900 pt-2">Platform Role</h2>
          <p>
            HumanHomes provides tools for communication, document preparation, and market
            information. All transactions are between buyers and sellers directly. We recommend
            consulting with qualified professionals (attorneys, inspectors) for all transactions.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal-900 pt-2">Community Standards</h2>
          <p>
            Users must comply with the Fair Housing Act. Discriminatory behavior, fraudulent
            listings, or abuse of the verification system will result in account termination.
          </p>
          <p className="text-sm text-charcoal-400 pt-6">
            Full terms of service coming soon. This is a placeholder for development purposes.
          </p>
        </div>
      </div>
    </main>
  );
}
