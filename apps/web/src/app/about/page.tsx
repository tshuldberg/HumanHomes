import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
          HumanHomes
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">About HumanHomes</h1>
        <div className="space-y-6 text-charcoal-600 leading-relaxed">
          <p>
            HumanHomes is a mission-driven real estate platform built on one simple belief:
            homes should connect people, not profit middlemen.
          </p>
          <p>
            We&apos;re replacing the traditional real estate system — agents, MLS gatekeeping,
            and opaque processes — with a transparent, human-first platform where buyers and
            sellers connect directly through the stories of their homes and neighborhoods.
          </p>
          <p>
            Every home has a story. Every neighborhood has a character. Every buyer deserves
            to find a place that feels like theirs — not just a property that checks boxes
            on a spreadsheet.
          </p>
          <h2 className="font-serif text-2xl font-semibold text-charcoal-900 pt-4">Our Mission</h2>
          <p>
            To democratize homeownership by giving people the tools, information, and community
            connections that were previously locked behind a 6% commission.
          </p>
        </div>
      </div>
    </main>
  );
}
