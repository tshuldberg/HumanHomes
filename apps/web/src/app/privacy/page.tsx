import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
          HumanHomes
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">Privacy Policy</h1>
        <p className="text-charcoal-500 mb-8">Last updated: February 2026</p>
        <div className="space-y-6 text-charcoal-600 leading-relaxed">
          <p>
            Your privacy matters to us. HumanHomes is built on the principle that your personal
            information — especially your home preferences and community connections — should
            be protected.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal-900 pt-2">What We Collect</h2>
          <p>
            We collect the information you provide when creating your profile, listing a home,
            or communicating with other users. Community preference data is stored privately
            and never shared publicly.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal-900 pt-2">How We Use It</h2>
          <p>
            Your data is used to connect you with homes and people that match your preferences.
            We never sell your data to third parties.
          </p>
          <p className="text-sm text-charcoal-400 pt-6">
            Full privacy policy coming soon. This is a placeholder for development purposes.
          </p>
        </div>
      </div>
    </main>
  );
}
