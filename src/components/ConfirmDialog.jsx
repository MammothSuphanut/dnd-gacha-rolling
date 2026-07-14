import Modal from './Modal'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'ยืนยัน',
  onConfirm,
  onCancel,
  danger = false,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      {danger && (
        <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <p className="text-xs text-red-700">การกระทำนี้ไม่สามารถยกเลิกได้</p>
        </div>
      )}
      <p className="mb-4 text-sm text-stone-600">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors ${
            danger ? 'bg-red-700 hover:bg-red-800' : 'bg-violet-700 hover:bg-violet-800'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
