import { useMemo, useState } from 'react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import { calculateHierarchicalPercentages, getEffectiveTotalWeight } from '../utils/weightedRandom'
import { getBoxTypeBadgeClass, getBoxTypeLabel } from '../utils/boxTypes'

const NO_CATEGORY = 'ไม่มีหมวดหมู่'

function BoxFormModal({ open, onClose, box, categories, onSubmit }) {
  const [form, setForm] = useState({
    name: box?.name ?? '',
    category: box?.category ?? '',
    defaultNoDuplicateMode: box?.settings?.defaultNoDuplicateMode ?? 'reroll',
    defaultCount: box?.settings?.defaultCount ?? 1,
  })

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
  }

  return (
    <Modal open={open} onClose={onClose} title={box ? 'แก้ไขตู้สุ่ม' : 'เพิ่มตู้สุ่ม'}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-stone-700">ชื่อตู้สุ่ม</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            autoFocus
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">หมวดหมู่ (Tag)</label>
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            list="category-options"
            placeholder="เช่น อาวุธ, ตัวละคร (เว้นว่างได้)"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">โหมดกันซ้ำเริ่มต้น</label>
          <select
            value={form.defaultNoDuplicateMode}
            onChange={(e) => setForm((f) => ({ ...f, defaultNoDuplicateMode: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="reroll">Reroll ถ้าซ้ำ</option>
            <option value="pool-shrink">ตัดพูลจริง</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">จำนวนสุ่มเริ่มต้น</label>
          <input
            type="number"
            min="1"
            value={form.defaultCount}
            onChange={(e) => setForm((f) => ({ ...f, defaultCount: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="rounded-md bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  )
}

function ImageEditModal({ open, item, onClose, onSave }) {
  const [image, setImage] = useState(item?.image ?? '')

  if (!open) return null

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <Modal open={open} onClose={onClose} title={`รูปภาพ: ${item?.name ?? ''}`}>
      <div className="space-y-3">
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
        {image && <img src={image} alt="" className="h-16 w-16 rounded object-cover" />}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={() => onSave(image)}
            className="rounded-md bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            บันทึก
          </button>
        </div>
      </div>
    </Modal>
  )
}

function GroupsEditor({ groups, items, totalWeight, onUpdate, onAdd, onRemove }) {
  return (
    <div className="mb-3 rounded-md border border-[#e2cfb3] p-3">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-stone-700">หมวดย่อย (ถ่วงน้ำหนักเป็นกลุ่ม)</h4>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-medium text-violet-700 hover:underline"
        >
          + เพิ่มหมวดย่อย
        </button>
      </div>
      {groups.length === 0 ? (
        <p className="text-xs text-stone-400">
          ไม่มีหมวดย่อย — ทุกรายการจะถ่วงน้ำหนักแบบเดี่ยวตาม weight ของตัวเอง
        </p>
      ) : (
        <div className="space-y-2">
          {groups.map((group, index) => {
            const itemCount = items.filter((it) => it.group?.trim() === group.name).length
            const groupPercent = totalWeight > 0 ? (Math.max(Number(group.weight) || 0, 0) / totalWeight) * 100 : 0
            return (
              <div key={index} className="flex flex-wrap items-center gap-2 text-sm">
                <input
                  value={group.name}
                  onChange={(e) => onUpdate(index, { name: e.target.value })}
                  className="w-32 rounded-md border border-gray-300 px-2 py-1"
                  placeholder="ชื่อหมวดย่อย"
                />
                <input
                  type="number"
                  min="0"
                  value={group.weight}
                  onChange={(e) => onUpdate(index, { weight: e.target.value })}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1"
                />
                <span className="text-xs text-stone-500">
                  {itemCount} รายการ · รวม {groupPercent.toFixed(1)}%
                  {itemCount > 0 && ` (~${(groupPercent / itemCount).toFixed(2)}%/รายการ)`}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-xs text-red-600 hover:underline"
                >
                  ลบหมวดย่อย
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function BoxCard({ box, expanded, onToggleExpand, onEdit, onDelete, dispatch, showToast }) {
  const [draftItems, setDraftItems] = useState(() => box.items.map((item) => ({ ...item })))
  const [draftGroups, setDraftGroups] = useState(() => (box.groups ?? []).map((g) => ({ ...g })))
  const [dirty, setDirty] = useState(false)
  const [imageEditItemId, setImageEditItemId] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  const totalWeight = getEffectiveTotalWeight(draftItems, draftGroups)
  const withPercent = calculateHierarchicalPercentages(draftItems, draftGroups)

  function updateDraftItem(id, patch) {
    setDraftItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
    setDirty(true)
  }

  function addDraftItem() {
    setDraftItems((prev) => [
      ...prev,
      { id: createId('item'), name: '', weight: 1, tag: '', image: '', note: '', group: '', link: '' },
    ])
    setDirty(true)
  }

  function removeDraftItemNow(id) {
    setDraftItems((prev) => prev.filter((item) => item.id !== id))
    setDirty(true)
  }

  function updateDraftGroup(index, patch) {
    setDraftGroups((prev) => prev.map((g, i) => (i === index ? { ...g, ...patch } : g)))
    setDirty(true)
  }

  function addDraftGroup() {
    setDraftGroups((prev) => [...prev, { name: `หมวด ${prev.length + 1}`, weight: 1 }])
    setDirty(true)
  }

  function removeDraftGroup(index) {
    setDraftGroups((prev) => prev.filter((_, i) => i !== index))
    setDirty(true)
  }

  function handleSave() {
    dispatch({
      type: 'UPDATE_BOX',
      payload: { id: box.id, patch: { items: draftItems, groups: draftGroups } },
    })
    setDirty(false)
    showToast('บันทึกการเปลี่ยนแปลงสำเร็จ', 'success')
  }

  function handleCancel() {
    setDraftItems(box.items.map((item) => ({ ...item })))
    setDraftGroups((box.groups ?? []).map((g) => ({ ...g })))
    setDirty(false)
  }

  return (
    <div className="rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 p-4">
        <button onClick={onToggleExpand} className="flex flex-1 items-center gap-2 text-left">
          <span className="text-stone-400">{expanded ? '▾' : '▸'}</span>
          <span className="font-semibold text-stone-900">{box.name}</span>
          {box.category && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getBoxTypeBadgeClass(box.category)}`}
            >
              {getBoxTypeLabel(box.category)}
            </span>
          )}
          <span className="text-xs text-stone-400">({box.items.length} รายการ)</span>
        </button>
        <div className="flex items-center gap-2">
          {totalWeight === 0 && (
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              weight รวมเป็น 0 ยังสุ่มไม่ได้
            </span>
          )}
          <button
            onClick={onEdit}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-stone-700 hover:bg-[#f5ede0]"
          >
            แก้ไขตู้
          </button>
          <button
            onClick={onDelete}
            className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            ลบตู้
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[#e2cfb3] p-4">
          <div className="mb-3 text-sm text-stone-600">
            โหมดกันซ้ำเริ่มต้น:{' '}
            <span className="font-semibold text-stone-900">
              {box.settings?.defaultNoDuplicateMode === 'pool-shrink' ? 'ตัดพูลจริง' : 'Reroll ถ้าซ้ำ'}
            </span>
            {' · '}
            จำนวนสุ่มเริ่มต้น:{' '}
            <span className="font-semibold text-stone-900">{box.settings?.defaultCount ?? 1}</span>
          </div>

          <GroupsEditor
            groups={draftGroups}
            items={draftItems}
            totalWeight={totalWeight}
            onUpdate={updateDraftGroup}
            onAdd={addDraftGroup}
            onRemove={removeDraftGroup}
          />

          {draftItems.length === 0 ? (
            <p className="text-sm text-stone-400">ยังไม่มีรายการในตู้นี้</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#e2cfb3] text-left text-xs text-stone-500">
                    <th className="py-2 pr-2">ชื่อ</th>
                    <th className="py-2 pr-2">หมวดย่อย</th>
                    <th className="py-2 pr-2">Weight</th>
                    <th className="py-2 pr-2">Tag</th>
                    <th className="py-2 pr-2">Note</th>
                    <th className="py-2 pr-2">Link</th>
                    <th className="py-2 pr-2 text-right">%</th>
                    <th className="py-2 pl-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {withPercent.map((item) => {
                    const isGrouped = !!item.group && draftGroups.some((g) => g.name === item.group)
                    return (
                      <tr key={item.id} className="border-b border-[#e2cfb3]">
                        <td className="py-1.5 pr-2">
                          <input
                            value={item.name}
                            onChange={(e) => updateDraftItem(item.id, { name: e.target.value })}
                            className="w-full min-w-[140px] rounded-md border border-gray-300 px-2 py-1"
                          />
                        </td>
                        <td className="py-1.5 pr-2">
                          <select
                            value={item.group ?? ''}
                            onChange={(e) => updateDraftItem(item.id, { group: e.target.value })}
                            className="w-28 rounded-md border border-gray-300 px-2 py-1"
                          >
                            <option value="">ไม่มี</option>
                            {draftGroups.map((g) => (
                              <option key={g.name} value={g.name}>
                                {g.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-1.5 pr-2">
                          <input
                            type="number"
                            min="0"
                            disabled={isGrouped}
                            value={item.weight}
                            onChange={(e) => updateDraftItem(item.id, { weight: e.target.value })}
                            className="w-20 rounded-md border border-gray-300 px-2 py-1 disabled:bg-[#f5ede0] disabled:text-stone-400"
                          />
                        </td>
                        <td className="py-1.5 pr-2">
                          <input
                            value={item.tag ?? ''}
                            onChange={(e) => updateDraftItem(item.id, { tag: e.target.value })}
                            className="w-24 rounded-md border border-gray-300 px-2 py-1"
                          />
                        </td>
                        <td className="py-1.5 pr-2">
                          <input
                            value={item.note ?? ''}
                            onChange={(e) => updateDraftItem(item.id, { note: e.target.value })}
                            className="w-full min-w-[120px] rounded-md border border-gray-300 px-2 py-1"
                          />
                        </td>
                        <td className="py-1.5 pr-2">
                          <input
                            value={item.link ?? ''}
                            onChange={(e) => updateDraftItem(item.id, { link: e.target.value })}
                            placeholder="https://..."
                            className="w-full min-w-[120px] rounded-md border border-gray-300 px-2 py-1"
                          />
                        </td>
                        <td className="py-1.5 pr-2 text-right font-semibold text-violet-700">
                          {item.percent.toFixed(2)}%
                        </td>
                        <td className="py-1.5 pl-2 whitespace-nowrap text-right">
                          <button
                            type="button"
                            onClick={() => setImageEditItemId(item.id)}
                            className="mr-1 text-xs text-stone-500 hover:underline"
                          >
                            รูป
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteItem(item)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={addDraftItem}
              className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-800"
            >
              + เพิ่มรายการ
            </button>
            {dirty && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md px-3 py-1.5 text-sm text-stone-600 hover:bg-[#f5ede0]"
                >
                  ยกเลิกการแก้ไข
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ImageEditModal
        key={imageEditItemId ?? 'closed'}
        open={!!imageEditItemId}
        item={draftItems.find((item) => item.id === imageEditItemId)}
        onClose={() => setImageEditItemId(null)}
        onSave={(image) => {
          updateDraftItem(imageEditItemId, { image })
          setImageEditItemId(null)
        }}
      />

      <ConfirmDialog
        open={!!deleteItem}
        title="ลบรายการ"
        message={`ต้องการลบ "${deleteItem?.name}" ออกจากตู้นี้หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteItem(null)}
        onConfirm={() => {
          removeDraftItemNow(deleteItem.id)
          setDeleteItem(null)
        }}
      />
    </div>
  )
}

export default function BoxManagerPage() {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [boxForm, setBoxForm] = useState(null)
  const [deleteBox, setDeleteBox] = useState(null)
  const [collapsedCategories, setCollapsedCategories] = useState(() => new Set())

  const categories = useMemo(
    () => Array.from(new Set(state.boxes.map((b) => b.category).filter(Boolean))),
    [state.boxes],
  )

  const grouped = useMemo(() => {
    const map = new Map()
    for (const box of state.boxes) {
      const cat = box.category?.trim() || NO_CATEGORY
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat).push(box)
    }
    const entries = Array.from(map.entries())
    const getPriority = (cat) => {
      const norm = cat.toLowerCase()
      if (norm.includes('class')) return 1
      if (norm.includes('species')) return 2
      if (norm.includes('background')) return 3
      return 4
    }
    return entries.sort((a, b) => {
      const pA = getPriority(a[0])
      const pB = getPriority(b[0])
      if (pA !== pB) return pA - pB
      return a[0].localeCompare(b[0], 'th')
    })
  }, [state.boxes])

  function toggleExpand(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleCategory(cat) {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  function handleBoxSubmit(form) {
    if (boxForm.mode === 'create') {
      dispatch({
        type: 'ADD_BOX',
        payload: {
          id: createId('box'),
          name: form.name,
          category: form.category,
          items: [],
          groups: [],
          settings: {
            defaultNoDuplicateMode: form.defaultNoDuplicateMode,
            defaultCount: Math.max(1, Number(form.defaultCount) || 1),
          },
        },
      })
      showToast('เพิ่มตู้สุ่มสำเร็จ', 'success')
    } else {
      dispatch({
        type: 'UPDATE_BOX',
        payload: {
          id: boxForm.box.id,
          patch: {
            name: form.name,
            category: form.category,
            settings: {
              defaultNoDuplicateMode: form.defaultNoDuplicateMode,
              defaultCount: Math.max(1, Number(form.defaultCount) || 1),
            },
          },
        },
      })
      showToast('บันทึกการแก้ไขสำเร็จ', 'success')
    }
    setBoxForm(null)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-stone-900">จัดการตู้สุ่ม</h1>
        <button
          onClick={() => setBoxForm({ mode: 'create' })}
          className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800"
        >
          + เพิ่มตู้สุ่ม
        </button>
      </div>

      {state.boxes.length === 0 ? (
        <p className="text-sm text-stone-400">ยังไม่มีตู้สุ่ม กด "+ เพิ่มตู้สุ่ม" เพื่อเริ่มต้น</p>
      ) : (
        <div className="space-y-6">
          {grouped.map(([category, boxes]) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-500"
              >
                <span>{collapsedCategories.has(category) ? '▸' : '▾'}</span>
                {category} ({boxes.length})
              </button>
              {!collapsedCategories.has(category) && (
                <div className="space-y-3">
                  {boxes.map((box) => (
                    <BoxCard
                      key={box.id}
                      box={box}
                      expanded={expandedIds.has(box.id)}
                      onToggleExpand={() => toggleExpand(box.id)}
                      onEdit={() => setBoxForm({ mode: 'edit', box })}
                      onDelete={() => setDeleteBox(box)}
                      dispatch={dispatch}
                      showToast={showToast}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <BoxFormModal
        key={boxForm ? (boxForm.mode === 'edit' ? boxForm.box.id : 'create') : 'closed'}
        open={!!boxForm}
        onClose={() => setBoxForm(null)}
        box={boxForm?.mode === 'edit' ? boxForm.box : null}
        categories={categories}
        onSubmit={handleBoxSubmit}
      />

      <ConfirmDialog
        open={!!deleteBox}
        title="ลบตู้สุ่ม"
        message={`ต้องการลบตู้สุ่ม "${deleteBox?.name}" หรือไม่? รายการทั้งหมดในตู้จะถูกลบไปด้วย`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteBox(null)}
        onConfirm={() => {
          dispatch({ type: 'DELETE_BOX', payload: { id: deleteBox.id } })
          setDeleteBox(null)
          showToast('ลบตู้สุ่มแล้ว', 'success')
        }}
      />
    </div>
  )
}
