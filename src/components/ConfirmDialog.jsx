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
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
            danger ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
