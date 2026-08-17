# Channeler — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Planar Order subclass ที่ lv1/7/10/15 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled 5etools data, `public/data/5etools/class.json`) entry `name: "Channeler", source: "ValdaSpireExtras"` — homebrew จาก *Valda's Spire of Secrets* (ภาคเสริม) — ยืนยัน `classFeaturesFull` ครบ 21 รายการ + **`classSpells` array (57 สเปลล์) ที่ผูกกับคลาสนี้โดยตรงในไฟล์เอง** (ต่างจาก Bard/Sorcerer ที่ต้องใช้ความรู้ทั่วไปแทน — Channeler ไม่มีปัญหา spell-list-gap เลยเพราะไฟล์ระบุ list ตรงๆ)
**สถานะ**: คลาสที่ 7 ของชั้น 1 — **gish ตัวแรกในระบบนี้** (มี Extra Attack เต็มรูปแบบ **และ** สเปลล์คาสติ้งพร้อมกัน ต่างจาก Artificer/Sacred Knight ที่เป็น half-caster แบบไม่มี Extra Attack)

⚠️ **หมายเหตุสำคัญก่อนอ่านตาราง**:

1. **Channeler เพดานสเปลล์อยู่ที่ระดับ 5 ตลอดชาติ** (`classTableGroups`'s "Max Spell Level" ยืนยันจากไฟล์จริง: 1st@lv2 → 2nd@lv5 → 3rd@lv9 → 4th@lv13 → 5th@lv17 → **ไม่มี 6th-9th เลย**) — cadence นี้ตรงกับ **half-caster (Paladin/Ranger) เป๊ะทุกจุด** ไม่ใช่ full-caster แม้จะมี "Spells Known" นับแบบ full-caster (4→13 ตัว) และใช้ระบบ point-pool ("Arcana Points") แทน slot ตรงๆ ก็ตาม — ผลคือ Control/Support axis ที่พึ่งสเปลล์ระดับสูงจะ**ตกขบวนถาวรตั้งแต่กลางเกม** (pattern เดียวกับที่ Artificer เจอกับ slot cap ระดับ5)
2. **Damage เป็นระบบผสม 2 ทาง**: weapon attack (Extra Attack ตรงตาม peer เป๊ะที่ lv5) + สเปลล์โจมตี (cantrip/leveled spell ผ่าน Arcana Points) — ใช้ weapon track เป็น Primary Magnitude หลัก (สาย "sustained" จริง) ส่วนสเปลล์ leveled (Fireball ฯลฯ) นับเป็น **Burst/Peak modifier** เพราะเป็น resource-limited ไม่ใช่ at-will
3. **Loadout Flexibility**: ยืนยันจาก text จริง "when you gain a level in this class, you can choose one of the channeler spells you know and replace it" — ตรงกับ tier "ต่ำ" (Sorcerer/Bard/Warlock-style) เป๊ะ — ไม่มี Weapon Mastery ในไฟล์นี้เลย (ต่างจาก Barbarian/Captain) ไม่มี floor-escape ให้ใช้

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary ของ Survivability เริ่มที่ A โดยตรงตามธรรมเนียม Sacred Knight) · **Save prof**: CON/INT · **Spellcasting**: INT-based, เริ่ม lv2, point-pool ("Arcana Points": 1st=2pt/2nd=3pt/3rd=5pt/4th=6pt/5th=7pt) รีฟิลเต็มทุก Long Rest

| Lv | Arcana Pts | Spells Known (lv1+) | Cantrips | Max Spell Lv | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|---|---|
| 1 | — | 0 | — | — | Arcane Reverberation (detect-magic-ish), *(Planar Order — ยกเว้น)* | 13 |
| 2 | 4 | 4 | 3 | 1st | Fighting Style (feat), Spell Channeling, **Spellcasting เริ่ม** | 22 |
| 3 | 6 | 5 | 3 | 1st | **Planar Focus** (4 ธาตุ: Air/Earth/Fire/Water, สลับได้ 1 ครั้ง/เทิร์น bonus action) | 31 |
| 4 | 6 | 5 | 3 | 1st | ASI | 40 |
| 5 | 14 | 6 | 3 | 2nd | **Extra Attack**, **Combat Channeling** (bonus action: spell-attack→2 weapon attack คนละเป้า) | 49 |
| 6 | 14 | 6 | 3 | 2nd | **Null Arcane** (reaction counterspell vs สเปลล์ระดับ5-, จ่าย Arcana Point เท่าราคาสเปลล์) | 58 |
| 7 | 17 | 7 | 3 | 2nd | *(Planar Order Feature — ยกเว้น)* | 67 |
| 8 | 17 | 7 | 4 | 2nd | ASI | 76 |
| 9 | 27 | 8 | 4 | 3rd | — | 85 |
| 10 | 27 | 8 | 4 | 3rd | *(Planar Order Feature — ยกเว้น)* | 94 |
| 11 | 32 | 9 | 4 | 3rd | Combat Channeling Improvement (2 attack เป้าเดียวกันได้) | 103 |
| 12 | 32 | 9 | 4 | 3rd | ASI | 112 |
| 13 | 38 | 10 | 4 | 4th | — | 121 |
| 14 | 38 | 10 | 4 | 4th | Greater Focus (+3 focus ใหม่: Limbo/Paradise/Underworld) | 130 |
| 15 | 44 | 11 | 4 | 4th | *(Planar Order Feature — ยกเว้น)* | 139 |
| 16 | 44 | 11 | 4 | 4th | ASI | 148 |
| 17 | 57 | 12 | 4 | 5th | — (Max Spell Level แตะเพดาน 5th ถาวร) | 157 |
| 18 | 57 | 12 | 4 | 5th | Planeshifter (Plane Shift ฟรี 1/long rest) | 166 |
| 19 | 64 | 13 | 4 | 5th | ASI | 175 |
| 20 | 64 | 13 | 4 | 5th | Nexus Arcane (Arcana Points เต็ม 10 ถ้าหมดตอนทอย Initiative) | 184 |

---

## Damage Axis

**Primary = Magnitude** (ใช้ weapon track เป็นหลัก — ตรงกับ peer มาร์เชียลเป๊ะเพราะ Extra Attack มาตรงเวลา lv5)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | 1 attack (~9) ตรง peer lv1-4 (ยังไม่มีสเปลล์) — modifier ทั้ง 4 ตรง peer → **B** |
| 2-4 | = lv1 | สเปลล์เริ่มมีแล้ว (cantrip/1st-tier) แต่ยังไม่มี AoE จริง (Fireball-tier รอถึง lv9) → Breadth ยังต่ำกว่า peer 1/4 ไม่พอขยับ |
| 5 | **C** | **Extra Attack ปลดล็อกตรงเวลา** — Magnitude 2 attack(~17) ตรง peer เป๊ะ = **B** แต่ modifier เปลี่ยน: **Burst=เหนือกว่า**(Combat Channeling ผสาน spell-attack+weapon attack พร้อมกัน), **Breadth=ต่ำกว่า**(ยังไม่มี AoE จนกว่าจะถึง lv9), **Conditionality=ต่ำกว่า**(Combat Channeling ให้ผลสเปลล์แค่ตอนโดนตีครั้งแรกเท่านั้น), Resistance=ตรง → **2/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก B เป็น C** (pattern เดียวกับ Captain's Coordinated Strike — ตัวเลขตรง peer แต่โดน modifier ฉุด) |
| 6-8 | = lv5 | ไม่มีจุดเปลี่ยน |
| 9 | **B** | **Fireball-tier (3rd-level) ปลดล็อก** — Breadth ขยับเป็นเหนือ/ตรง peer (มี AoE จริงแล้ว) → tally เหลือ 1/4 ต่ำกว่า(Conditionality อย่างเดียว) ไม่ถึงเกณฑ์ → **กลับไป Primary(B) เต็มตัว** |
| 10-20 | = lv9 | ไม่มีจุดเปลี่ยนต่อ (Combat Channeling Improvement lv11 ทำให้ 2 attack ลงเป้าเดียวกันได้ ไม่กระทบ tally เพิ่ม) |

**สรุปเกรด**: B(1-4) → C(5-8) → B(9-20) — dip ช่วงสั้นจาก Combat Channeling's conditionality ก่อนที่ Fireball-tier จะกู้กลับมา

---

## Control Axis

**Primary = Severity**. Channeler's spell list (ยืนยันจากไฟล์) **ไม่มี** Sleep/Hold Person/Hypnotic Pattern/Hold Monster/Mass Suggestion/Power Word Stun-Kill เลยสักตัว — ได้ **Command** (1st, ~Tier2 จาก effect เช่น Grovel/Halt) เร็วสุด แล้วต้องรอถึง lv13 (4th-tier) ถึงจะได้ **Banishment/Evard's Black Tentacles/Otiluke's Resilient Sphere** (Tier3-4 จริง)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ยังไม่มีสเปลล์เลย (Spellcasting เริ่ม lv2) = ไม่มีกลไก = **D** |
| 2-12 | **C** | Command (lv2+) = Tier2 (ต่ำกว่า peer's Tier4 Sleep มาก) = Primary **C** — modifier: Breadth=ต่ำกว่า(เดี่ยว), Frequency=ตรง, Stickiness=ต่ำกว่า(ไม่มี repeat save แต่ duration สั้นมาก), LR-bypass=ตรง, Concentration Risk=**เหนือกว่า**(Command เป็น instant ไม่ผูก concentration) → 1 เหนือ/2 ต่ำ ไม่ถึงเกณฑ์ทั้งคู่ → คง **C** |
| 13 | **B** | **Banishment/Evard's Black Tentacles ปลดล็อก (4th-tier, ช้ากว่า peer's lv7 benchmark 6 เลเวล แต่ตัวเลขจริงตรงกัน)** — Severity = Tier4 ตรง peer = Primary **B** — modifier: Breadth=เหนือกว่า(Evard's เป็น AoE), Frequency/Stickiness/LR-bypass=ตรง, Concentration Risk=ตรง(ต้อง concentration เหมือน peer ปกติ) → 1/5 เหนือ ไม่ถึงเกณฑ์ ≥3/5 → คง **B** ตาม Primary เพียวๆ |
| 14-20 | = lv13 | ไม่มีจุดเปลี่ยน (เพดาน 5th-level ไม่ปลดล็อก CC ใหม่ที่ lv17 — สเปลล์ 5th-tier ที่ได้ล้วนเป็น Utility/Control-เบา ไม่ใช่ hard-CC) |

**สรุปเกรด**: D(1) → C(2-12) → B(13-20) — มาช้ากว่า peer 6 เลเวลแต่สุดท้ายตัวเลขตรงกันจริง

---

## Support Axis

**Primary = Magnitude**. Channeler **ไม่มีสเปลล์ฮีลเลยสักตัวในทั้งลิสต์** (ยืนยันจาก `classSpells` — ไม่มี Cure Wounds/Healing Word/Mass Cure Wounds/Heal ที่ไหนเลย) เป็นสาย **buff-only ล้วน** — buff แรกที่เล็ง ally ได้จริงคือ **Magic Weapon** (2nd-tier, lv5+)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | D | ไม่มีกลไก Support เลย (สเปลล์ยังไม่มา หรือมีแค่ cantrip/1st-tier ที่ไม่เล็ง ally โดยตรง) = **D** |
| 5-20 | **C** | Magic Weapon(lv5)→Haste(lv9)→Death Ward/Freedom of Movement(lv13) ไล่ระดับความแรงขึ้นเรื่อยๆ ตามจริง **แต่เทียบกับ peer benchmark ณ เลเวลเดียวกันแล้วยังต่ำกว่าตลอด** (Magic Weapon เทียบ peer's lv5 Beacon/Haste — อ่อนกว่ามาก; Haste ของตัวเองที่ lv9 เทียบ peer's lv9 Mass Cure Wounds~156 — อ่อนกว่ามาก; Death Ward/FoM ที่ lv13 แม้แรงจริงแต่เทียบ peer's lv13 benchmark ที่ปรับสูงขึ้นเรื่อยๆ ก็ยังตามไม่ทัน) — **pattern เดียวกับที่ Artificer เจอกับ slot cap**: กลไกจริงมีและแรงขึ้นตามเลเวลจริง แต่ peer benchmark วิ่งเร็วกว่าตลอด ไม่มีจุดไหนไล่ทันเลย = **C ค้างยาว** |

**สรุปเกรด**: D(1-4) → **C(5-20) flat** — สายบัฟล้วนไม่มีฮีล ตกขบวน peer ถาวรจากเพดานสเปลล์ระดับ5

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรงตั้งแต่ lv1** — เหมือน Sacred Knight

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | **B** | Primary=A(d10) — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D) → **3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก A เป็น B** |
| 3-20 | = lv1-2 | **Planar Focus ปลดล็อก (lv3)**: Elemental Water(halve elemental dmg ต่อ reaction)=Mitigation จริงแต่ยังนับ "ต่ำกว่า"(C-เทียบเท่า ตามนิยาม), Elemental Air(หนี prone/ลด OA)=Debuff Resistance จริงแต่ยังนับต่ำกว่าเช่นกัน — **tally ยังคง 3/4 ต่ำกว่า** (กลไกดีขึ้นจริงแต่ยัง "ต่ำกว่า peer" อยู่ดี ไม่ข้ามเป็น "ตรง/เหนือ") → เกรดคงที่ **B** ตลอดที่เหลือ |

**สรุปเกรด**: **B(1-20) flat** — ตัดกับ Sacred Knight (d10 เหมือนกันแต่จบที่ A) เพราะ Sacred Knight มี modifier จริงจังกว่า ชี้ให้เห็นว่า d10 อย่างเดียวไม่พอการันตี A

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack มาตรงเวลา lv5 เป๊ะ (ไม่ต้องใช้ carve-out C แบบ Captain/Alchemist) → **matches peer = B ตลอดเกม**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | **C** | Primary=B (1 attack ตรง peer pre-Extra-Attack) — modifier: Bonus Action=ไม่มีกลไก(D), Reaction=ไม่มีกลไก(D), Extra Action=ไม่มีกลไก(D), Resource-Conversion=ไม่มีกลไก(D, ยังไม่มีสเปลล์) → **4/4 ต่ำกว่า เกินเกณฑ์มาก แต่ cap สูงสุด 1 ขั้น → ขยับลงแค่ 1 ขั้นจาก B เป็น C** |
| 3-4 | = lv1-2 | Planar Focus(lv3) ให้ bonus-action จริงแต่แคบ = ยังนับ "ต่ำกว่า" อยู่ (ไม่ข้ามเป็นตรง/เหนือ) → tally เท่าเดิม คง **C** |
| 5 | = lv1-2 | **Combat Channeling ปลดล็อก** — Bonus Action=เหนือกว่า, Resource-Conversion=เหนือกว่า(สเปลล์+weapon attack ในเทิร์นเดียว), Reaction=ยังต่ำกว่า(แค่ Water focus แคบๆ), Extra Action=ไม่มีกลไก(D) → **2 เหนือ/2 ต่ำ — เสมอกันพอดี (ครั้งที่ 4 ในระบบนี้)** ⚠️ ใช้การตัดสินใจเดิม (net cancellation → กลับ Primary) = **B** |
| 6-20 | **A** | **Null Arcane ปลดล็อก (lv6, reaction counterspell base-kit จริง เหนือกว่า Riposte ที่เป็น subclass-lock ของ Fighter)** — Reaction ขยับเป็นเหนือกว่า → tally ใหม่: **3 เหนือ(Bonus Action, Reaction, Resource-Conversion)/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ ≥2/4 → **ขยับขึ้น 1 ขั้นจาก B เป็น A** — **คลาสแรกในระบบนี้ที่แตะ A ใน Action Economy** |

**สรุปเกรด**: C(1-4) → B(5) → **A(6-20)** — ไต่ระดับต่อเนื่องชัดเจนที่สุดเท่าที่เจอมา

---

## Utility Axis

**Primary = Magnitude**. Arcane Reverberation (lv1!) เป็นกลไก Utility ตั้งแต่ก่อนมีสเปลล์เลย — **คลาสแรกในระบบนี้ที่มีกลไก Utility จริงตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-16 | **C** | Primary: Arcane Reverberation ให้ข้อมูลเริ่มต้น (โรงเรียนเวทมนตร์/ปลายทาง portal) ตรงกับ peer's lv1 Detect-Magic-tier = **B** — modifier: Breadth=ตรง(แคบเหมือนกัน), **Reliability=ต่ำกว่า**(ต้องทอย INT check ไม่ auto-success เหมือน peer's ritual), **Access Cost=เหนือกว่า**(action เดียวไม่จำกัดครั้ง/วัน ดีกว่า peer's ritual 10 นาที), Skill-Check Layer=ไม่มีกลไก(D) → **2/4 ต่ำกว่า(Reliability+Skill-Check) ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก B เป็น C** — คงที่ยาวจนกว่าจะมีสเปลล์ Utility tier สูงจริง |
| 17-20 | **B** | **Commune/Contact Other Plane/Teleportation Circle/Passwall ปลดล็อก (5th-tier เพดานสุดท้าย)** — Breadth ขยับเป็นเหนือกว่า(ครอบคลุมข้อมูล+เดินทาง+สื่อสารพร้อมกัน คล้าย peer's lv9 Legend-Lore-tier แม้มาช้ากว่า 8 เลเวล) คู่กับ Access Cost ที่ยังเหนืออยู่ → **2 เหนือ/2 ต่ำ — เสมอกันอีกครั้ง (ครั้งที่ 5!)** ⚠️ net cancellation → กลับ Primary ซึ่งตอนนี้ตัวเลขจริง (Commune-tier) ขยับเป็น **B (ตรง peer)** แล้ว |

**สรุปเกรด**: C(1-16) → B(17-20) — คลาสแรกที่ไม่เคย D เลยตลอดทั้ง 20 เลเวล (Arcane Reverberation กันไว้ตั้งแต่ lv1)

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text "replace it with another spell...when you gain a level" = tier **"ต่ำ"** ตรงตัว (ไม่มี Weapon Mastery ให้หลุด floor เหมือน Barbarian/Captain)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ยังไม่มีสเปลล์เลย (Spellcasting เริ่ม lv2) → floor rule ล็อก **D** |
| 2 | **C** | Primary=C (ต่ำ tier, ปลดล็อกพร้อม Spellcasting) — modifier: Resource Fungibility=เหนือกว่า(Arcana Points ซื้อสเปลล์ระดับไหนก็ได้จาก pool เดียว), Cross-Axis Coverage=ตรง(แค่ 1-2 axis ตอนนี้), Target-Type=ต่ำกว่า(เดี่ยวล้วน), Adaptability=ตรง(เลือกสเปลล์ต่อเทิร์นได้เหมือน peer baseline) → 1 เหนือ/1 ต่ำ ไม่ถึงเกณฑ์ → คง **C** |
| 3-4 | **B** | **Planar Focus ปลดล็อก** — Adaptability ขยับเป็นเหนือกว่า(สลับ focus กลางคอมแบตได้ทุกเทิร์น) → tally: 2 เหนือ(Fungibility, Adaptability)/1 ต่ำ(Target-Type) → ถึงเกณฑ์ ≥2/4 → **ขยับขึ้น 1 ขั้นจาก C เป็น B** |
| 5-8 | = lv3-4 | Extra Attack+Combat Channeling เพิ่ม Cross-Axis Coverage เป็นเหนือกว่าด้วย (แตะ Damage/Control/Utility/Action-Economy/Survivability) แต่โดน cap +1 ขั้นอยู่แล้ว → คง **B** |
| 9-20 | = lv3-4 | **Fireball-tier ปลดล็อก (lv9)** — Target-Type ขยับเป็นเหนือกว่าด้วย → **ครบ 4/4 modifier เหนือกว่าทั้งหมด** แต่ยังคง cap +1 ขั้นสูงสุดตามกฎ → คง **B** ไม่ใช่ S (ไม่ใช่ตัวอย่างเพดานที่ Anchor ระบุชื่อไว้ชัดเจน) |

**สรุปเกรด**: D(1) → C(2) → **B(3-20)** — ตัวอย่างที่ชัดที่สุดของ max-1-step-cap: modifier ครบ 4/4 เหนือกว่าตั้งแต่ lv9 แต่เกรดยังค้างที่ B ไม่ขยับต่อ

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-4) → C(5-8) → B(9-20) |
| Control | D(1) → C(2-12) → B(13-20) |
| Support | D(1-4) → **C(5-20) flat** |
| Survivability | **B(1-20) flat** |
| Action Economy | C(1-4) → B(5) → **A(6-20)** |
| Utility | **C(1-16)** → B(17-20) |
| Versatility | D(1) → C(2) → **B(3-20)** |

---

## ข้อค้นพบสำคัญ

1. **Channeler เป็น gish ตัวแรกในระบบนี้** — มี Extra Attack เต็มรูปแบบตรงเวลา lv5 **พร้อมกับ** สเปลล์คาสติ้งจริง (ต่างจาก Artificer/Sacred Knight ที่เป็น half-caster ไม่มี Extra Attack เลย) — Action Economy Primary จึงตรง peer เต็มตัว (B) ตลอดเกม ไม่ต้องใช้ carve-out C เหมือนคลาสไม่มี Extra Attack ก่อนหน้า
2. **เพดานสเปลล์ระดับ 5 ถาวร ใช้ cadence ของ half-caster (Paladin/Ranger) เป๊ะ** — ทำให้ Control/Support ตกขบวน peer benchmark ถาวรตั้งแต่กลางเกม (pattern เดียวกับที่ Artificer เจอกับ slot cap ระดับ5) แม้ตัวเลขจริง (Banishment ที่ lv13) จะแรงเท่า peer's lv7 benchmark ก็ตาม แค่มาช้ากว่า 6 เลเวล
3. **⚠️ tie-break 2-2 เกิดซ้ำถึง 2 ครั้งในไฟล์เดียว** (Action Economy lv5, Utility lv17) — รวมเป็นครั้งที่ 4 และ 5 ของทั้งระบบ (ก่อนหน้า: Barbarian's Survivability lv2, Captain's Action Economy lv1) ยิ่งเพิ่มน้ำหนักว่าควรฟอร์มัลไลซ์กฎเสมอกันเข้า Anchor Rubric จริงจัง — ยังไม่แก้ รอ user คอนเฟิร์ม
4. **Utility เป็นคลาสแรกที่ไม่เคย D เลยตลอด 20 เลเวล** — Arcane Reverberation (lv1, ก่อนมีสเปลล์ด้วยซ้ำ) เป็นกลไกจริงตั้งแต่ต้น ต่างจาก Barbarian/Captain (D-flat เต็มรูปแบบ) และ Bard/Artificer/Alchemist (ต้องรอสเปลล์ก่อน)
5. **Versatility เป็นตัวอย่างชัดที่สุดของ max-1-step-cap** — modifier ครบ 4/4 เหนือกว่า peer ตั้งแต่ lv9 (Resource Fungibility+Cross-Axis Coverage+Target-Type+Adaptability ทั้งหมด) แต่เกรดยังค้างที่ B ไม่ขยับเป็น S เพราะกฎจำกัดขยับได้แค่ 1 ขั้น/ครั้ง
6. **Survivability ตัดกับ Sacred Knight ทั้งที่ d10 เหมือนกัน** — Sacred Knight จบที่ A (มี modifier จริงจังหนุน) แต่ Channeler จบแค่ B (modifier ยังต่ำกว่า peer อยู่ดีแม้ Planar Focus จะให้กลไกจริง) — ชี้ว่า hit die สูงอย่างเดียวไม่การันตี A เกรดสุดท้ายขึ้นกับ modifier จริงเสมอ
7. **spell-list-gap ไม่มีปัญหาเลยสำหรับคลาสนี้** — `classSpells` array ในไฟล์ระบุลิสต์ 57 สเปลล์ตรงๆ (รวมสเปลล์ homebrew อย่าง "cerebral ray"/"hardlight blaster"/"dazzling ray"/"hardlight gauntlet"/"ray of warping") ต่างจาก Bard/Sorcerer ที่ต้องพึ่งความรู้ทั่วไปแทน — ข้อดีของ homebrew classes ที่ยังไม่พ้น scope นี้
