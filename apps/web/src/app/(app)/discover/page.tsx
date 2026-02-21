export const dynamic = "force-dynamic";

const neighborhoods = [
  {
    name: "Temescal",
    city: "Oakland, CA",
    story:
      "We wave at each other on morning walks. The farmers market on Sundays is where we all catch up. Kids ride bikes until the streetlights come on.",
    storyCount: 8,
    tags: ["Walkable", "Community gardens", "Family-friendly"],
  },
  {
    name: "Sellwood",
    city: "Portland, OR",
    story:
      "Every block has a little free library. The antique shops have been here longer than most of us. You can walk to the river in ten minutes.",
    storyCount: 12,
    tags: ["Yard-friendly", "Walkable", "Local shops"],
  },
  {
    name: "Bernal Heights",
    city: "San Francisco, CA",
    story:
      "The hill is our living room. On clear days you can see both bridges. Neighbors leave lemons on each other's stoops. It's a village inside a city.",
    storyCount: 15,
    tags: ["Quiet streets", "Close to nature", "Diverse community"],
  },
  {
    name: "Montrose",
    city: "Houston, TX",
    story:
      "This is where Houston gets weird — in the best way. Murals everywhere, front-yard art installations, and a coffee shop on every corner.",
    storyCount: 6,
    tags: ["Arts & culture", "Diverse community", "Walkable"],
  },
];

export default function DiscoverPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
          Discover
        </h1>
        <p className="text-charcoal-500 text-lg">
          Explore neighborhoods through the stories of the people who live there.
        </p>
      </div>

      {/* Preference chips */}
      <div className="mb-10">
        <p className="text-sm font-medium text-charcoal-600 mb-3">
          What draws you to a neighborhood?
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Walkable streets",
            "Yard space",
            "Quiet streets",
            "Community gardens",
            "Close to nature",
            "Family-friendly",
            "Arts & culture",
            "Local shops",
            "Diverse community",
          ].map((pref) => (
            <button
              key={pref}
              className="px-4 py-2 text-sm rounded-xl border border-charcoal-200 text-charcoal-600 hover:border-terracotta-400 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {neighborhoods.map((n) => (
          <div
            key={n.name}
            className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50 hover:shadow-soft-lg transition-shadow group cursor-pointer"
          >
            {/* Warm accent bar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-terracotta-100 flex items-center justify-center">
                <span className="text-terracotta-600 text-sm font-bold">
                  {n.name[0]}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-charcoal-900 group-hover:text-terracotta-600 transition-colors">
                  {n.name}
                </h3>
                <p className="text-sm text-charcoal-400">{n.city}</p>
              </div>
            </div>

            <p className="font-serif text-charcoal-700 italic leading-relaxed mb-5">
              &ldquo;{n.story}&rdquo;
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {n.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-sage-50 text-sage-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal-400">
                {n.storyCount} resident stories
              </span>
              <span className="text-sm font-medium text-terracotta-500 group-hover:underline">
                Explore neighborhood
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
