# Codex Menu

ไฟล์นี้กำหนด**ลำดับหมวด**และ**ลำดับไฟล์ในแต่ละหมวด**ที่แสดงบนหน้าเว็บ Codex — แก้ไฟล์นี้เองได้เลยเวลาอยากจัดเรียงใหม่

**วิธีใช้:**
- `##` = หนึ่งหมวด เขียนเป็น `## ชื่อโฟลเดอร์จริงใน codex/` (ตรงตัว ห้ามพิมพ์ผิด) ถ้าอยากตั้งชื่อหมวดที่โชว์บนเว็บให้ต่างจากชื่อโฟลเดอร์ ใส่ `| ชื่อที่จะโชว์` ต่อท้ายได้ เช่น `## 2024-tier-list | 2024 Tier List`
- บรรทัด `- ชื่อไฟล์` (ไม่ต้องใส่ `.md`) ใต้แต่ละหมวด = ลำดับการแสดงไฟล์นั้นในหมวด เรียงจากบนลงล่าง
- ลำดับหมวด = ลำดับที่ `##` ปรากฏในไฟล์นี้จากบนลงล่าง
- ไฟล์ใหม่ที่เพิ่มเข้า codex/ แล้วยังไม่ได้ list ไว้ที่นี่ จะถูกเติมท้ายหมวดของมันให้อัตโนมัติ (เรียง A-Z) — ไม่หายไปไหน แค่ยังไม่ได้จัดตำแหน่งเอง
- หมวดใหม่ (โฟลเดอร์ใหม่ใน codex/) ที่ยังไม่ได้เพิ่ม `##` ไว้ที่นี่ จะถูกเติมท้ายสุดให้อัตโนมัติเช่นกัน
- **ซ่อนไฟล์ไม่ให้ขึ้นเว็บเลย**: comment บรรทัด `- ชื่อไฟล์` ด้วย HTML comment (เปิด `<!--` ปิด `-->`) — ไฟล์นั้นจะไม่โชว์บนเว็บเลย (ต่างจากแค่ไม่ list ไว้ ซึ่งยังจะถูกเติมท้ายอัตโนมัติอยู่ดี) ทำได้ 2 แบบ: ครอบบรรทัดเดียว หรือครอบทั้งบล็อกหลายบรรทัดพร้อมกัน (เปิดก่อนบรรทัดแรกที่จะซ่อน ปิดหลังบรรทัดสุดท้าย) แบบที่ทำกับ subclass list ทั้งชุดด้านล่างนี้
- **ซ่อนทั้งหมวด**: comment บรรทัด `##` ด้วยวิธีเดียวกัน — ทั้งหมวดจะไม่โชว์บนเว็บเลย
- ⚠️ ตัวสแกน comment เป็น string scan ธรรมดา (หา `<!--`/`-->` ตรงๆ ไม่ใช่ HTML parser เต็มรูป) ห้ามพิมพ์ตัวอย่าง literal `<!--`/`-->` ไว้ในข้อความอธิบายส่วนนี้ เพราะจะโดนอ่านเป็นคำสั่งซ่อนจริงไปด้วย

<!-- ## General
- class-subclass-index -->
<!-- ↑ hidden from Documents: feeds the "Class & Subclass" browser tab
     directly (see mergeCodexClassData.js) instead of being rendered as its
     own doc page. File itself is untouched — other skills (build-character,
     level-up-character, build-class) still read class-subclass-index.md
     directly, and /codex/General/class-subclass-index still resolves if
     something links to it straight.
     (00-sub-class-overview-tier-list-2024.md, the tier half of that merge,
     was deleted along with the 28 per-class tier-list files it rolled up —
     being redone under the new 00-scorecard-methodology.md rules. Until new
     tier-list files exist, CodexClassBrowser has no tier data to merge in.) -->

## Core-Rules | Core Rules
- astral-nexus-lore
- Fatigue-system
- Death-and-Dying-system


## Consults
- witsawa-party-balance-review

## 2024-tier-list | 2024 Tier List
- 00-scorecard-methodology
- 00-scorecard-progress
<!-- The class-level 00-class-overview-tier-list-2024.md, the 28 per-class
     <class>-subclass-tier-list-2024.md files, and the old
     wizard-subclass-scorecard-2024.md pilot were all deleted 2026-08-07 —
     being redone from scratch under the new rules in
     00-scorecard-methodology.md (Class Baseline, M/R/B tags, 2024-only
     scope). Progress tracked in 00-scorecard-progress.md. New per-class
     files will auto-append here (A-Z) as they're written; no need to
     re-list them by hand. -->
