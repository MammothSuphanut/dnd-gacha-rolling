# 🎲 Astral Nexus: Echoes of Eternity — Full UI/UX Redesign Plan

> **คำสั่งสำหรับ AI**: อ่านไฟล์นี้ทั้งหมดก่อนทำงาน แล้วทำ task ที่ยังเป็น `[ ]` ตามลำดับ เมื่อทำเสร็จแต่ละ task ให้ mark เป็น `[x]`

---

## 📋 Context / ภาพรวม

โปรเจคนี้คือเครื่องมือสำหรับเล่นและจดบันทึก **D&D (Dungeons & Dragons)** มีฟีเจอร์:

- **Roll** — สุ่มตู้ gacha (คลาส/สปีชีส์/ฯลฯ)
- **Shop** — ร้านค้าไอเทม D&D
- **Campaign** — บันทึก log แคมเปญ
- **Character** — จัดการตัวละคร

**Stack**: React + Vite + Tailwind CSS v4  
**Project path**: `/Users/mammoth/Documents/do4fun/GachaRolling`

**เป้าหมาย**: Redesign UI/UX ทั้งแอปให้:

- ธีม **Light Parchment** (classic D&D handbook feel)
- ชื่อแอปใหม่: **Astral Nexus: Echoes of Eternity** (เดิม: Gacha Rolling)
- Font: `Cinzel` (heading) + `Inter` (body) จาก Google Fonts
- ดูเป็นมืออาชีพ สวยงาม ใช้งานง่าย
- **ห้ามแตะ logic/state/data** — แก้เฉพาะ visual layer เท่านั้น

---

## 🎨 Design Tokens (ใช้อ้างอิงตลอด)

```
สีหลัก — Parchment Theme
--bg:            #fdf8f0   พื้นหลังหน้าเว็บ
--bg-alt:        #f5ede0   table header, section bg, hover
--surface:       #ffffff   card, modal background
--border:        #e2cfb3   ขอบทั่วไป
--border-strong: #c9a87c   ขอบเน้น, divider

ตัวอักษร
--ink:           #1c1410   ข้อความหลัก
--ink-muted:     #6b5344   ข้อความรอง
--ink-faint:     #a89070   placeholder, disabled

Primary — Purple
--primary:       #6d28d9   ปุ่มหลัก
--primary-hover: #5b21b6   hover
--primary-light: #ede9fe   bg light
--primary-text:  #4c1d95   text on light bg

Gold Accent
--gold:          #b45309   accent, badge
--gold-light:    #fef3c7   gold bg

Semantic
--danger:        #991b1b
--danger-light:  #fee2e2
--success:       #166534
--success-light: #dcfce7
```

### Tailwind Quick Reference

- bg parchment: `bg-[#fdf8f0]`
- bg alt: `bg-[#f5ede0]`
- border: `border-[#e2cfb3]`
- text primary: `text-violet-700`
- bg primary: `bg-violet-700`
- text muted: `text-stone-500`
- text ink: `text-stone-900`

---

## ✅ Task Checklist

### Phase 1 — Foundation

- [x] **1.1** `index.html` — เปลี่ยน title + เพิ่ม Google Fonts link (Cinzel + Inter)
- [x] **1.2** `src/index.css` — เพิ่ม global styles + animations (fadeInUp, rollSpin, scrollbar)
- [x] **1.3** `src/App.jsx` — เปลี่ยน `bg-gray-50` → `bg-[#fdf8f0]`

### Phase 2 — Shared Components

- [x] **2.1** `src/components/Navbar.jsx` — logo ใหม่ "Astral Nexus: Echoes of Eternity", icons ทุก nav link, parchment bg
- [x] **2.2** `src/components/Modal.jsx` — backdrop blur, border สวย, rounded-xl
- [x] **2.3** `src/components/ConfirmDialog.jsx` — icon เตือน, styling ใหม่

### Phase 3 — Pages (ตาม priority)

- [x] **3.1** `src/pages/RollPage.jsx` — box selector cards, roll button ใหญ่ขึ้น, result animation
- [x] **3.2** `src/pages/StatRollPage.jsx` — match theme ใหม่
- [x] **3.3** `src/pages/ShopPage.jsx` — parchment table, filter pills, cart UI
- [x] **3.4** `src/pages/BoxManagerPage.jsx` — match theme ใหม่
- [x] **3.5** `src/pages/CampaignPage.jsx` — pill status filters, parchment table, better badges
- [x] **3.6** `src/pages/CharacterPage.jsx` — portrait cards, better modal, stat modifiers display

---

## 📐 Per-File Design Spec

### 1.1 — `index.html`

เพิ่มใน `<head>`:

```html
<title>Astral Nexus: Echoes of Eternity</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 1.2 — `src/index.css`

```css
@import "tailwindcss";

body {
  font-family: "Inter", system-ui, sans-serif;
  background-color: #fdf8f0;
  color: #1c1410;
}

.font-cinzel {
  font-family: "Cinzel", serif;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f5ede0;
}
::-webkit-scrollbar-thumb {
  background: #c9a87c;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes rollSpin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease forwards;
}
```

### 2.1 — `src/components/Navbar.jsx`

- bg: `bg-[#fdf8f0] border-b border-[#e2cfb3] shadow-sm`
- Logo: emoji 🎲 + text "Astral Nexus: Echoes of Eternity" ใช้ `font-cinzel font-bold text-violet-700`
- Nav links ใหม่ (เพิ่ม icon emoji):
  - 🎲 สุ่ม → `/roll`
  - 🛒 ร้านค้า → `/shop`
  - 📜 แคมเปญ → `/campaigns`
  - 🧝 ตัวละคร → `/characters`
- active: `text-violet-700 border-b-2 border-violet-700 font-medium`
- inactive: `text-stone-600 hover:text-stone-900 hover:bg-[#f5ede0] rounded-md`
- "จัดการข้อมูล" button: `border border-[#e2cfb3] bg-white text-stone-700 hover:bg-[#f5ede0]`

### 2.2 — `src/components/Modal.jsx`

```jsx
// backdrop
className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
// modal box
className="w-full max-w-md rounded-xl bg-white border border-[#e2cfb3] p-5 shadow-2xl"
// title
<h2 className="mb-3 font-cinzel text-lg font-semibold text-stone-900">{title}</h2>
```

### 3.1 — `src/pages/RollPage.jsx`

**Box selector panel** — เปลี่ยน radio buttons เป็น pill tabs:

```jsx
// container
className = "rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm";
// box tab (active)
className =
  "rounded-full bg-violet-700 px-4 py-1.5 text-sm font-medium text-white";
// box tab (inactive)
className =
  "rounded-full border border-[#e2cfb3] px-4 py-1.5 text-sm text-stone-600 hover:bg-[#f5ede0]";
```

**Roll card** (กล่องสุ่มแต่ละอัน):

```jsx
className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm"
// category label
<p className="font-cinzel text-[10px] uppercase tracking-widest text-amber-700 mb-1">{category}</p>
// box name
<h2 className="text-lg font-semibold text-stone-900">{box.name}</h2>
```

**ปุ่มสุ่ม**:

```jsx
className="rounded-xl bg-violet-700 px-8 py-3 text-lg font-bold text-white shadow-md
           hover:bg-violet-800 hover:shadow-lg transition-all duration-200
           disabled:opacity-50 disabled:cursor-not-allowed"
```

**Result items** (เพิ่ม stagger animation):

```jsx
// wrapper
<div className="animate-fade-in-up rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"
     style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}>
// group badge
<span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">{item.group}</span>
// percent badge
<span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">{pct}%</span>
```

### 3.5 — `src/pages/CampaignPage.jsx`

**h1**: เพิ่ม `font-cinzel`  
**Status filter**: เปลี่ยน `<select>` เป็น pill buttons inline:

```jsx
<div className="flex flex-wrap gap-1.5">
  <button
    onClick={() => setFilterStatus("")}
    className={
      !filterStatus
        ? "bg-violet-700 text-white rounded-full px-3 py-1 text-xs font-medium"
        : "bg-white border border-[#e2cfb3] text-stone-600 rounded-full px-3 py-1 text-xs hover:bg-[#f5ede0]"
    }
  >
    ทั้งหมด
  </button>
  {STATUS_OPTIONS.filter((s) => s !== "-").map((s) => (
    <button
      key={s}
      onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
      className={
        filterStatus === s
          ? "bg-violet-700 text-white rounded-full px-3 py-1 text-xs font-medium"
          : "bg-white border border-[#e2cfb3] text-stone-600 rounded-full px-3 py-1 text-xs hover:bg-[#f5ede0]"
      }
    >
      {s}
    </button>
  ))}
</div>
```

**Table container**: `rounded-xl border border-[#e2cfb3] bg-white shadow-sm overflow-hidden`  
**thead**: `bg-[#f5ede0] text-stone-500 text-xs uppercase tracking-wide`  
**tbody row hover**: `hover:bg-amber-50`  
**tbody border**: `border-[#e2cfb3]`

### 3.6 — `src/pages/CharacterPage.jsx`

**Page h1**: เพิ่ม `font-cinzel`

**Tab pills** (เปลี่ยนจาก border-bottom):

```jsx
// active
className =
  "rounded-full bg-violet-700 px-4 py-1.5 text-sm font-medium text-white";
// inactive
className =
  "rounded-full text-stone-600 hover:bg-[#f5ede0] px-4 py-1.5 text-sm";
```

**Character Card** — เปลี่ยน layout เป็น portrait:

```jsx
<button className="flex flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white
                   shadow-sm hover:shadow-md transition-all duration-200 text-left group">
  {/* Image — portrait ratio */}
  <div className="relative w-full aspect-[3/4] bg-[#f5ede0] overflow-hidden">
    <CharacterImage ... className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
    <span className="absolute bottom-2 right-2 rounded-full bg-violet-700 px-2 py-0.5 text-[10px] font-bold text-white">
      Lv.{totalLevel(character)}
    </span>
  </div>
  {/* Info */}
  <div className="p-3">
    <div className="font-semibold text-stone-900 truncate">{character.name}</div>
    {summary && <div className="text-xs text-stone-500 truncate mt-0.5">{summary}</div>}
    {/* Party color dots */}
    {parties.length > 0 && (
      <div className="mt-1.5 flex items-center gap-1">
        {parties.slice(0, 4).map(p => (
          <span key={p.id} className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
        ))}
      </div>
    )}
  </div>
</button>
```

**Grid**: เปลี่ยนจาก `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` → `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`

**FormSection** ใน modal:

- `rounded-xl border border-[#e2cfb3] bg-white p-4`
- title: เพิ่ม `font-cinzel`

**Stat inputs** — เพิ่ม modifier display ใต้แต่ละ input:

```jsx
// ใน STAT_KEYS.map loop เพิ่ม modifier
const rawVal = Number(form.stats[s.key]) || 0
const mod = Math.floor((rawVal - 10) / 2)
const modStr = mod >= 0 ? `+${mod}` : `${mod}`
// แสดง modifier
<p className="mt-0.5 text-center text-[11px] text-stone-400">{modStr}</p>
```

---

## 🔁 สำหรับ AI ตัวถัดไป (ถ้า context หมด)

1. อ่านไฟล์ `REDESIGN.md` นี้ทั้งหมด
2. ดู **Task Checklist** — หา task ที่เป็น `[ ]`
3. ทำ task นั้นตาม spec ใน "Per-File Design Spec"
4. `npm run dev` เพื่อตรวจผล
5. อัพเดท checklist: `[ ]` → `[x]`

**กฎสำคัญ**:

- ห้ามแตะ logic, state, dispatch, store, data
- แก้ได้เฉพาะ className, style, text labels, HTML structure ของ UI
- ใช้ Tailwind utility + arbitrary values เช่น `bg-[#fdf8f0]`
