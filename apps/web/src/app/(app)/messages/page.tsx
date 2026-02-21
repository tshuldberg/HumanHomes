export const dynamic = "force-dynamic";

export default function MessagesPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
          Messages
        </h1>
        <p className="text-charcoal-500 text-lg">
          Your conversations with buyers and sellers.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-terracotta-50 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-terracotta-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="font-serif text-xl font-semibold text-charcoal-800 mb-2">
          No conversations yet
        </h2>
        <p className="text-charcoal-500 max-w-sm leading-relaxed">
          When you reach out to a seller or a buyer contacts you about your home,
          your conversations will appear here. Every first message starts with an
          introduction, not a transaction.
        </p>
      </div>
    </div>
  );
}
