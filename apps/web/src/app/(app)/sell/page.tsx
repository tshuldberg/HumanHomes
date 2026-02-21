export const dynamic = "force-dynamic";

export default function SellPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
          Sell Your Home
        </h1>
        <p className="text-charcoal-500 text-lg">
          Share your home&apos;s story and connect directly with buyers who care.
        </p>
      </div>

      {/* Getting started card */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal-50 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-sage-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-sage-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal-900">
                Create Your Listing
              </h2>
              <p className="text-sm text-charcoal-400">
                It starts with your home&apos;s story
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { step: "1", title: "Tell your home's story", desc: "What makes it special? The memories, the neighborhood, the little things." },
              { step: "2", title: "Add photos and details", desc: "Beds, baths, square footage — plus the details that don't fit in a spreadsheet." },
              { step: "3", title: "Set your terms", desc: "Price, timeline, what matters to you in a buyer." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-lg font-serif font-bold text-terracotta-300 shrink-0 w-6">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal-800">{item.title}</h3>
                  <p className="text-sm text-charcoal-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3.5 text-sm font-semibold bg-sage-500 text-white rounded-xl hover:bg-sage-600 transition-colors">
            Start Your Listing
          </button>
          <p className="text-xs text-charcoal-400 text-center mt-3">
            Listing creation will be available in Phase 2
          </p>
        </div>
      </div>
    </div>
  );
}
