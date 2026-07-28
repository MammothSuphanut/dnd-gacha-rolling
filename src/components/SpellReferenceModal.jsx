import Modal from './Modal'
import SpellDetailPanel from './SpellDetailPanel'

// Opened by clicking a {@spell ...} reference inside another item's entry
// text (e.g. a feat's description mentioning a spell it grants). Sits on top
// of whatever's already open — closing it returns to that unchanged, no
// navigation happens. Clicking a further {@spell} reference inside this
// modal's own text just swaps its content (`onSpellClick` re-fires the same
// handler that opened it) rather than stacking a second modal.
export default function SpellReferenceModal({ spell, notFoundName, loading, onClose, onSpellClick }) {
  return (
    <Modal open={!!(spell || notFoundName || loading)} onClose={onClose} size="lg">
      {loading ? (
        <p className="text-sm text-stone-500">กำลังโหลดข้อมูล...</p>
      ) : spell ? (
        <SpellDetailPanel spell={spell} onSpellClick={onSpellClick} />
      ) : (
        notFoundName && (
          <div className="space-y-2">
            <h3 className="font-cinzel text-base font-semibold text-stone-900">{notFoundName}</h3>
            <p className="text-sm text-stone-500">ไม่พบข้อมูลคาถานี้ในฐานข้อมูล</p>
            <a
              href={`https://5e.tools/search.html?q=${encodeURIComponent(notFoundName)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              ค้นหาใน 5e.tools ↗
            </a>
          </div>
        )
      )}
    </Modal>
  )
}
