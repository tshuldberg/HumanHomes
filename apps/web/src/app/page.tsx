import Link from "next/link";

const stories = [
  {
    quote: "We planted that lemon tree the day we moved in. Twenty years later, the whole block knows it as the lemon house.",
    author: "Maria",
    location: "Oakland, CA",
  },
  {
    quote: "The crows bring us little gifts every morning on this porch. Buttons, bottle caps, once a tiny key. It's our favorite ritual.",
    author: "David",
    location: "Portland, OR",
  },
  {
    quote: "She took her first steps right here in the living room. We still have the little dent in the baseboard from her walker.",
    author: "Anh",
    location: "San Francisco, CA",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover communities and neighborhoods",
    description:
      "You're not searching a database. You're finding your people. Browse neighborhoods through the stories of the families who live there.",
  },
  {
    number: "02",
    title: "Connect with real people",
    description:
      "Message sellers directly. Hear their story. Share yours. Every introduction starts with who you are, not what you can afford.",
  },
  {
    number: "03",
    title: "Buy from humans, not corporations",
    description:
      "No agents taking 6%. No middlemen gatekeeping information. Just neighbors helping neighbors find their next home.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
          HumanHomes
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="px-5 py-2 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-5 py-2.5 text-sm font-semibold bg-terracotta-500 text-white rounded-xl hover:bg-terracotta-600 transition-colors"
          >
            Join
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-24 max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-charcoal-900 leading-tight tracking-tight mb-6">
          Every Home Has
          <br />
          <span className="text-terracotta-500">a Story</span>
        </h1>
        <p className="text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto leading-relaxed mb-10">
          A place where homes find people and people find homes. No agents,
          no gatekeeping — just real stories from real families, and the chance
          to write the next chapter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-terracotta-500 text-white rounded-xl hover:bg-terracotta-600 transition-colors shadow-soft"
          >
            Discover Homes
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-terracotta-400 text-terracotta-600 rounded-xl hover:bg-terracotta-50 transition-colors"
          >
            List Your Home
          </Link>
        </div>
      </section>

      {/* Story Cards */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.author}
              className="bg-white rounded-2xl p-8 shadow-soft border border-terracotta-100/60 hover:shadow-soft-lg transition-shadow"
            >
              <div className="w-10 h-1 bg-terracotta-400 rounded-full mb-6" />
              <p className="font-serif text-lg text-charcoal-800 italic leading-relaxed mb-6">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="text-sm font-medium text-charcoal-600">
                {story.author},{" "}
                <span className="text-charcoal-400">{story.location}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-white/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-charcoal-500 mb-16 max-w-xl mx-auto">
            No search bars. No shrinking inventories. Just stories, communities,
            and real human connections.
          </p>
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 md:gap-8">
                <span className="text-3xl font-serif font-bold text-terracotta-300 shrink-0 pt-1">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-1 bg-sage-400 rounded-full mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
            No agents. No gatekeeping.
            <br />
            Just people and homes.
          </h2>
          <p className="text-lg text-charcoal-600 leading-relaxed mb-10">
            We believe homeownership should be accessible, transparent, and deeply
            personal. HumanHomes puts the power back where it belongs — with the
            people who live in, love, and care for their homes.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-sage-500 text-white rounded-xl hover:bg-sage-600 transition-colors shadow-soft"
          >
            Join the Community
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-charcoal-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-lg font-bold text-charcoal-800">
            HumanHomes
          </div>
          <div className="flex gap-8 text-sm text-charcoal-500">
            <Link href="/about" className="hover:text-charcoal-700 transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="hover:text-charcoal-700 transition-colors">
              How It Works
            </Link>
            <Link href="/privacy" className="hover:text-charcoal-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-charcoal-700 transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-sm text-charcoal-400">
            Where every home has a story.
          </p>
        </div>
      </footer>
    </main>
  );
}
