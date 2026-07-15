export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div
        className="animate-fade-in relative w-full max-w-md rounded-xl border border-[#e2cfb3] bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด"
            className="absolute right-3 top-3 rounded-lg p-1 text-stone-400 transition-colors hover:bg-[#f5ede0] hover:text-stone-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
        {title && (
          <h2 className="font-cinzel mb-3 pr-6 text-lg font-semibold text-stone-900">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
