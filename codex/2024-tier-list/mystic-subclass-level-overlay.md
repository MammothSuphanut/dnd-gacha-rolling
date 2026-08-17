# Mystic — Subclass Level Overlay (ชั้น 2) 🕰️

**อ้างอิง**: [mystic-level-baseline.md](mystic-level-baseline.md) (Class Baseline, ชั้น 1) + [mystic-subclass-scorecard-2024.md](mystic-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 6 Mystic Order — gate lv1/3/6/14 (ตรงกับ "(Order feature — ยกเว้น)" ในตาราง Chassis ของ baseline)
**รูปแบบ**: full table ต่อแกน (≤10 subclass) — ระบุเฉพาะช่วงเลเวลที่เกรด**ต่างจาก baseline**; ช่วงที่ไม่ระบุ = เท่า baseline

⚠️ **ข้อจำกัดข้อมูลสืบทอดจาก baseline**: ไม่มีไฟล์ psionics data ยืนยัน Bonus Disciplines ของแต่ละ Order ได้ (มีแค่หัวข้อ "เลือก 2 discipline เพิ่มจากลิสต์เฉพาะ Order") — ให้เกรดจากฟีเจอร์**ตั้งชื่อชัดเจน**ที่ยืนยันได้เท่านั้น (เหมือนที่ old scorecard ทำ) ไม่แตะ Bonus Disciplines ที่ไม่มีเนื้อหา
**หมายเหตุสำคัญ**: baseline Support/Control/Utility/Versatility ของคลาสนี้ตั้งเป็น **B(1-20) flat โดยสมมติฐาน "generic caster track"** (ไม่ใช่ floor-D แบบระมัดระวังของ old scorecard) — ดังนั้น Order ที่ไม่มีฟีเจอร์ตั้งชื่อชัดเจนเล็งแกนนั้น (ซึ่ง old scorecard ให้ "= baseline" หลายจุด) จะ**เท่า baseline (B) ไม่ใช่ตกไป D** ต่างจากที่คุ้นตาจาก old-system's Support=0 ทุกตัว

**Baseline โดยสรุป**: Damage B(1-7)→A(8-20) · Control **B(1-20) flat** ⚠️(สมมติฐาน) · Support **B(1-20) flat** ⚠️(สมมติฐาน) · Survivability C(1-3)→B(4-19)→A(20) · Action Economy D(1-9)→C(10-20) · Utility **B(1-20) flat** · Versatility **B(1-20) flat**

---

## Order of the Avatar

ออร่าบัฟทีมสามชั้น (initiative/heal/speed) — old Overall=B แต่ Support old-score=9(S) สูงสุดในกลุ่มร่วมกับ Wu Jen's Versatility

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3-5 | **A** | Avatar of Battle (lv3, aura +2 initiative ให้ ally ทุกคนในระยะ 30ft ตลอดเวลา ไม่เสีย resource) = เกินสมมติฐาน generic-caster-track ของ baseline อย่างชัดเจน |
| Support | 6-20 | **S** | Avatar of Healing (lv6, aura +Int mod เข้าการฮีลของ ally จาก discipline) ซ้อนกับ Avatar of Battle = 2 กลไก always-on พร้อมกัน — exceptional stack; Avatar of Speed (lv14, aura Dash ฟรี) เสริมมิติเดิมต่อ (same-dimension) |
| Survivability | 1-19 | **A** | Armor Training (medium armor+shield, ตั้งแต่ lv1) = พลิก Mitigation modifier ทั่วไป → tally เหลือ 2 below (ต่ำกว่าเกณฑ์ downgrade 3-below) → กลับ Primary(A) ตั้งแต่ lv1 แทนที่จะรอ lv4 |
| Versatility | — | B(1-20) | เท่า baseline — ออร่า 3 แบบเสริมแค่ Cross-Axis Coverage ที่ favorable อยู่แล้ว (same-dimension) ไม่พลิก modifier ใหม่ |
| *(Damage/Control/Action Economy/Utility)* | — | เท่า baseline | ไม่มีฟีเจอร์ตั้งชื่อชัดเจนเล็งแกนนี้ |

---

## Order of the Awakened

Investigator-tank ผสม spectral defense — Survivability old-score=9(S)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Control | 6-20 | **A** | Psionic Surge (lv6, บังคับ Disadvantage บน save ของเป้าต้าน discipline/talent ที่ใช้ แลกด้วยการเสีย psychic focus) = พลิก Severity เกินสมมติฐาน generic |
| Survivability | 14-20 | **S** | Spectral Form (lv14, action, resistance **ทุกชนิดดาเมจ** นาน 10 นาที + ทะลุสิ่งกีดขวาง) = Mitigation spike ระดับ near-invulnerable แม้ใช้ได้แค่ 1/long rest — magnitude สูงพอข้าม A ไป S โดยตรง |
| Utility | 3-20 | **A** | Psionic Investigation (lv3, อ่านความทรงจำ/ติดตามวัตถุนาน 24 ชม.) = พลิก Reveal-Info เกินสมมติฐาน generic |
| *(Damage/Support/Action Economy/Versatility)* | — | เท่า baseline | ไม่มีฟีเจอร์ตั้งชื่อชัดเจนเล็งแกนนี้เพิ่มเติม |

---

## Order of the Immortal

แทงค์ตัวจริง — Survivability old-score=10/10 สูงสุดทั้งไฟล์ old scorecard

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Survivability | 1-5 | **A** | Immortal Durability (lv1, +1 max HP/level ถาวร + Unarmored Defense 10+Dex+Con) = พลิก Mitigation ทั่วไปทันที ตั้งแต่ lv1 |
| Survivability | 6-20 | **S** | Psionic Resilience (lv3, temp HP=Int mod ทุกต้นเทิร์น) + Surge of Health (lv6, reaction ลดดาเมจครึ่งหนึ่ง) ซ้อนกัน 3+ กลไก(Durability/Resilience/Surge) พร้อม Immortal Will (lv14, ฟื้นคืนชีพตัวเองที่ 0 HP) = exceptional multi-mechanism stack ระดับหนาแน่นที่สุดในกลุ่ม → ข้าม A ไป S |
| Action Economy | 6-20 | **C** | Surge of Health (lv6) ใช้ **Reaction** = พลิก Reaction modifier ให้ favorable ร่วมกับ Bonus Action เดิม → tally 2 favorable/2 below (เสมอ, ครั้งที่ 19!) → กลับ Primary(C) เร็วกว่า baseline 4 เลเวล |
| *(Damage/Control/Support/Utility/Versatility)* | — | เท่า baseline | old scorecard ยืนยันเองว่า "โฟกัส tank เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น" |

---

## Order of the Nomad

ผู้เชี่ยวชาญเทเลพอร์ต/mobility — กระจาย breadth กว้างสุดรองจาก Wu Jen (3 axis ขยับ)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Survivability | 3-20 | **A** | Memory of a Thousand Steps (lv3, reaction เทเลพอร์ตหนีทำให้การโจมตีพลาดอัตโนมัติ) = **"cancel-the-hit" mechanism** (แบบเดียวกับ Gunslinger's Rōnin's Killing Stroke) — full-avoidance แรงพอข้าม C-dip ตรงไป A ทันที |
| Action Economy | 14-20 | **B** | Effortless Journey (lv14, แปลงระยะเดิน 30ft เป็นเทเลพอร์ตฟรีไม่เสีย action เพิ่ม) = พลิก Extra-Action-Access modifier ใหม่ → tally 3 favorable/1 below → หลุด 2-2 tie เดิม ดันเกิน Primary |
| Utility | 1-20 | **A** | Breadth of Knowledge (lv1, 2 proficiency ใดก็ได้ สลับได้ทุก Long Rest) = พลิก Skill-Check-Layer modifier ที่ baseline ระบุไว้ว่า "1/4 ไม่พอ" ให้ครบ 2/4 ตั้งแต่ lv1 |
| Versatility | 1-20 | **A** | Breadth of Knowledge's LR-swap = พลิก Adaptability modifier เพิ่ม → 3/4 favorable (จาก 2/4 เดิม) → ดันจาก Primary(C) ขึ้น A ตั้งแต่ lv1 |
| *(Damage/Control/Support)* | — | เท่า baseline | ไม่มีฟีเจอร์ตั้งชื่อชัดเจนเล็งแกนนี้ |

---

## Order of the Soul Knife

Weapon-striker เฉพาะทาง — Damage old-score=8(A) เท่า Wu Jen

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 3-13 | **A** | Hone the Blade (lv3, จ่าย psi ได้ atk/dmg bonus สูงสุด +4 นาน 10 นาที) = Magnitude เพิ่มเร็วกว่า baseline's Potent Psionics (lv8) ถึง 5 เลเวล |
| Damage | 14-20 | **S** | Phantom Knife (lv14, ตีเป้าเสมือนมี AC 10) = แม่นยำระดับ near-guaranteed-hit เปลี่ยน effective-magnitude สูงพอข้าม A ไป S |
| Survivability | 1-19 | **A** | Soul Knife's parry (bonus action +2 AC, lv1) + Martial Training (medium armor, lv1) = พลิก Mitigation ทั่วไปทันที ตั้งแต่ lv1 → tally เหลือ 2 below (ต่ำกว่าเกณฑ์ downgrade) → กลับ Primary(A) เร็วกว่า baseline 3 เลเวล |
| Action Economy | 6-20 | **C** | Consumptive Knife (lv6, ฟื้น 2 psi point ทุกครั้งที่ฆ่าศัตรูด้วย soul knife) = พลิก Resource-Conversion modifier → tally 2 favorable/2 below (เสมอ, ครั้งที่ 20!) → กลับ Primary(C) เร็วกว่า baseline 4 เลเวล |
| *(Control/Support/Utility/Versatility)* | — | เท่า baseline | old scorecard ยืนยันเอง: "เน้นคอมแบตล้วน" / "โฟกัส weapon-striker เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น" |

---

## Order of the Wu Jen

Hybrid psionics-wizard เต็มระบบ — Versatility old-score=9(S) สูงสุดทั้งไฟล์, ขยับ 5/7 axis กว้างที่สุดในกลุ่ม

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 6-20 | **A** | Arcane Dabbler (lv6, เข้าถึง spell ดาเมจของ Wizard lv1-3 ผ่าน spell slot ที่สร้างจาก psi point) = Magnitude ใหม่ที่ไม่ผูก Extra Attack เร็วกว่า baseline's Potent Psionics (lv8) 2 เลเวล |
| Control | 6-20 | **A** | Arcane Dabbler เลือกเป็น control spell ของ Wizard ได้เช่นกัน (เช่น Hold Person) = พลิก Severity เกินสมมติฐาน generic ของ baseline |
| Survivability | 14-20 | **A** | Elemental Mastery (lv14, reaction, immunity เต็มต่อดาเมจธาตุที่มี resistance อยู่แล้ว) = พลิก Mitigation modifier ที่ baseline ระบุไว้ว่ายังต่ำกว่าในช่วง 4-19 (tally 2-2 tie) → หลุดเสมอ ดันเกิน Primary เร็วกว่า baseline 6 เลเวล |
| Utility | 6-20 | **A** | Arcane Dabbler (spell utility ของ Wizard เช่น Comprehend Languages/Fly) ผนวก Hermit's Study (2 skill proficiency, lv1) = พลิก Skill-Check-Layer ครบ 2/4 modifier (เหมือน Nomad's Breadth of Knowledge แต่มาช้ากว่าเพราะต้องรอ Arcane Dabbler ด้วย) |
| Versatility | 6-20 | **S** | Arcane Dabbler = **full alt-spell-system access** (Wizard spell list เต็มผ่าน psi-fueled slot) พลิก Target-Type Coverage **และ** Adaptability พร้อมกัน → 4/4 favorable — hybrid 2 ระบบเวทมนตร์พร้อมกัน (psionics+wizardry) ไม่เหมือน pattern อื่นในคลาสนี้เลย |
| *(Support)* | — | เท่า baseline | old scorecard ยืนยันเอง "= เท่า baseline" |

---

## ข้อค้นพบสำคัญ

1. **⚠️ Baseline's "generic caster track" สมมติฐานเปลี่ยนความหมายของ "= baseline" ไปจาก old scorecard โดยสิ้นเชิง** — Support/Control/Utility/Versatility ของ new-system baseline ตั้งไว้ที่ B(flat) ไม่ใช่ floor-D แบบระมัดระวังของ old scorecard ทำให้ 5/6 Order ที่ old scorecard ให้ Support=0(D) เพราะ "ไม่มีฟีเจอร์ยืนยันได้" กลับ**เท่า baseline (B) ไม่ใช่ตกไป D** ในระบบใหม่ — สำคัญมากที่ต้องแยกสองระบบออกจากกันตอนอ่าน delta
2. **Order of the Avatar เป็น subclass แรกในทั้งระบบที่ Support ทะยานจาก B ไป S ผ่าน exceptional aura-stack ล้วน** (ไม่มีสเปลล์คาสติ้งเลย) — Avatar of Battle+Healing+Speed 3 ออร่า always-on พร้อมกันเทียบเท่าความหนาแน่นของ multi-mechanism-stack ที่เจอใน Survivability ของคลาสอื่น แต่ครั้งนี้เกิดกับ Support แทน
3. **Order of the Immortal คือ Survivability old-score สูงสุดทั้งไฟล์ (10/10)** และเป็นตัวอย่างที่ 2 (ต่อจาก Gunslinger/Monk) ของ "exceptional multi-mechanism stack เกิน tally เดิม" — 4 กลไกป้องกันซ้อนกัน (permanent HP, per-turn temp HP, reaction dmg-halving, self-revive) ดัน S ตั้งแต่ lv6 ยาวถึง lv20
4. **Nomad's Memory of a Thousand Steps เป็น "cancel-the-hit" ตัวที่ 2 ในระบบนี้** (ต่อจาก Gunslinger's Rōnin's Killing Stroke) — เทเลพอร์ตหนีทำให้การโจมตีพลาดอัตโนมัติ ต่างจาก Mitigation ทั่วไปที่แค่ลดดาเมจ
5. **Order of the Wu Jen เป็น subclass ที่ 2 ในระบบนี้ที่ Versatility ทะยานถึง S ผ่าน full alt-spell-list** (ต่อจาก... ไม่มีคลาสไหนก่อนหน้าที่ได้ S ตรงๆ มีแต่ A — Wu Jen จึงเป็น**ตัวแรกที่ Versatility แตะ S เต็ม**) เพราะเป็น hybrid 2 ระบบเวทมนตร์พร้อมกัน (psionics+wizardry) ซึ่งแรงกว่า "แค่เข้าถึง spell list เดียว" ที่เคยเห็นใน Eldritch Knight/Spellslinger/Investigator's Occultist/Monster Hunter's Occultist
6. **Tie-break 2-2 เกิดซ้ำ 2 ครั้งในไฟล์เดียว (Immortal's AE lv6, Soul Knife's AE lv6) รวมเป็นครั้งที่ 19-20 ของทั้งระบบ** — ทั้งคู่มาจาก reaction/resource-regen ที่พลิก modifier ตัวที่ 2 ในช่วง D-dip เดิม (lv1-9) ให้กลับมาเป็น C เร็วกว่า baseline
