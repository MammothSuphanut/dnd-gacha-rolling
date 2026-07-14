export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in w-full max-w-md rounded-xl border border-[#e2cfb3] bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="font-cinzel mb-3 text-lg font-semibold text-stone-900">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
