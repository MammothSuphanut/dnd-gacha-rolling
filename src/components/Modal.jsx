const SIZE_CLASSES = {
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
}

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div
        className={`animate-fade-in relative flex max-h-[85vh] w-full flex-col rounded-xl border border-[#e2cfb3] bg-white p-5 shadow-2xl ${SIZE_CLASSES[size] || SIZE_CLASSES.md}`}
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
          <h2 className="font-cinzel mb-3 shrink-0 pr-6 text-lg font-semibold text-stone-900">{title}</h2>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
