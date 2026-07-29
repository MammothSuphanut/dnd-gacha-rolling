export default function WorldEntryCard({ card, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-1 rounded-xl border border-[#e2cfb3] bg-white p-4 text-left shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/40"
    >
      {card.image && (
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="mb-2 h-28 w-full rounded-md object-cover"
        />
      )}
      <h3 className="text-base font-semibold text-stone-900">{card.title}</h3>
      {card.summary && <p className="line-clamp-3 text-sm text-stone-600">{card.summary}</p>}
    </button>
  )
}
