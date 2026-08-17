# Sacred Knight — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Sacred Knight + Sacred Throne feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: `codex/homebrew-subclass/Sacred-Knight/Throne-of-*.md` ทั้ง 6 ไฟล์ — homebrew ของโปรเจกต์นี้เอง (source of truth) ไม่มีปัญหา spell-list-gap
**Class Baseline อ้างอิง**: [sacred-knight-level-baseline.md](sacred-knight-level-baseline.md)
**รูปแบบตาราง**: Delta-only
**Subclass gate**: lv3/6/10/14/**17 (capstone)** — เพิ่มแถว lv17 จากที่คลาสอื่นไม่มี เพราะ Sacred Throne ทุกตัวมี "Throne activation" ที่ capstone lv17 เป็น milestone สำคัญ (เทียบเท่า Fervor Overflow ของ baseline เอง)
**สถานะ**: 🚧 first pass

**Class Baseline ที่ lv3/6/10/14/17 (ก่อนใส่ Sacred Throne)**: Damage A/A/A/A/S · Control D/D/D/D/D · Support C/C/C/C/C · Survivability A/A/A/A/A · Action Economy B/B/B/B/B · Utility C/C/C/C/C · Versatility D/D/D/D/D

⚠️ **Control และ Versatility ล็อกที่ D ตลอดทั้ง 6 subclass — ตรวจแล้วยืนยันไม่มี Throne ไหนแก้ 2 จุดนี้เลย**: (1) ไม่มี Sacred Throne ตัวไหนให้ condition แก่ศัตรูเลย (ทุก Throne เน้น damage/heal/mobility/reaction ไม่ใช่ CC) → Control คงที่ D ทั้ง 6 ตัว (2) ไม่มี Sacred Throne ตัวไหนให้ "สลับ technique ที่รู้ได้" เลย (Deepened Wisdom ของ Wisdom and Spirit แค่ **เพิ่ม** technique ไม่ใช่ **สลับ**) → floor rule ล็อก Versatility=D ทั้ง 6 ตัวเช่นกัน — ตารางด้านล่างจึงไม่มีแถว Control/Versatility เลยสักตัว (=baseline เสมอ)

⚠️ **Path-lock correction (พบระหว่างทำไฟล์นี้)**: Sacred Throne 2 ตัว (Doom and Slaughter=ต้อง Retribution, Protection and Mercy=ต้อง Guardian) ล็อก Path ตายตัว — baseline file ให้เครดิต Path-conditional technique (Light Sword/Cross Slash/Rising Dragon Strike=Retribution/Formless, Spirit Ward/Guardian's Blessing/Bulwark Shift=Guardian/Formless) แบบ "2/3 Path เข้าถึงได้เสมอ" ซึ่ง**ใช้ไม่ได้ตรงๆกับ Throne ที่ล็อก Path เดียว** — **Doom and Slaughter (Retribution-locked) ยังคงเครดิตเต็มตามที่ baseline สมมติไว้** (Retribution ได้ทั้ง Light Sword/Cross Slash/Rising Dragon Strike อยู่แล้ว ไม่เสียอะไร) แต่ **Protection and Mercy (Guardian-locked) เสียเครดิต Damage/Action-Economy ที่ baseline สมมติไว้จาก Light Sword/Cross Slash/Rising Dragon Strike ไปเลย** (Guardian ไม่มี technique เหล่านี้) — ต้องคำนวณ "true baseline" ใหม่สำหรับ subclass นี้โดยเฉพาะ ดูรายละเอียดในหัวข้อของมันด้านล่าง — Throne อีก 4 ตัวไม่มี Path prerequisite เลยจึงไม่กระทบ

---

## Throne of Doom and Slaughter — pure offense (ต้อง Retribution)

*Blood for Blood (lv3, ฮีล Fervor+HP เมื่อ Cross Slash ฆ่า) + Sealed Fate (lv6, Cross Slash ถูกลงตลอด) + Unrelenting Carnage (lv10, +5ft speed/attack + ไม่โดน OA ตอนเดิน) + Final Verdict (lv14, Verdict stack → extra attack+dmg เมื่อ Cross Slash ครั้งสุดท้าย, 1/short rest) + Throne activation (lv17, +2 dmg/attack สะสม+speed)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 14 | S | Final Verdict: สะสม Verdict stack ทุก Cross Slash attack ในเทิร์น ปลดปล่อยเป็น extra attack roll + ดาเมจ = เต๋าอาวุธ×จำนวน stack (5 attacks/เทิร์น = **~5d10(~27.5)** เพิ่ม 1 ครั้ง/short rest) ซ้อนบน Sealed Fate(lv6)ที่ทำให้ Cross Slash ถูกลงตลอดอยู่แล้ว = nova ระดับ outlier-comparable → ขยับ A→S |
| Action Economy | 10 | A | Unrelenting Carnage: +5ft speed ทุกครั้งที่ตี + ไม่โดน OA ตอนเดิน ซ้อนบน Sealed Fate(lv6)ที่ทำ Cross Slash ถูกลง = Resource-to-Action Conversion modifier ที่แข็งแรงมาก (attack เพิ่มถูกลง+เคลื่อนที่ฟรี) → ขยับ B→A |

**สรุปเกรด**: Damage: A(2-13)→**S(14-20)** | Control=baseline(D) ตลอด | Support=baseline(C) ตลอด | Survivability=baseline(A) ตลอด (Blood for Blood conditional-on-kill แคบเกินจะขยับ) | Action Economy: B(1-9)→**A(10-20)** | Utility=baseline(C) ตลอด | Versatility=baseline(D) ตลอด

---

## Throne of Eternity and Creation — สาย healer เต็มตัว (ไม่ล็อก Path)

*Everlasting Grace (lv3, Pure White Blade→ฮีลแทนโจมตี 1d4/stack) + Genesis Wave (lv6, +1d4 ทุก 3 Fervor) + Undying Providence (lv10, +temp HP 1d4/3Fervor+WIS+PB) + Absolute Genesis (lv14, ทุกเต๋า 1d4→1d6) + Throne activation (lv17, multi-target WIS-mod เป้าหมาย)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3 | B | Everlasting Grace: ฮีล 1d4/stack สูงสุด WIS+PB stack (~5-6d4≈12.5 ที่ lv3) ด้วย Fervor pool ใหญ่ (ไม่ concentration, ไม่จำกัดครั้ง/วันจริงจัง) — Magnitude≈peer's Cure Wounds + Frequency เหนือ peer ชัดเจน → ขยับ C→B |
| Support | 6 | A | Genesis Wave: +1d4 ซ้อนทุก 3 Fervor ที่จ่าย = Magnitude เกือบเท่าตัวในการ heal ครั้งเดียวกัน → ขยับ B→A |
| Support | 10 | S | Undying Providence: เพิ่ม temp HP อีกชั้น (heal+bonus heal+temp HP พร้อมกันจาก 1 use) = 3 effect-type ซ้อนกันในการกระทำเดียว ระดับที่ไม่มี peer spell เดี่ยวไหนทำได้ → ขยับ A→S |
| Survivability | 3 | S | Everlasting Grace ใช้กับตัวเองได้ (self-heal-in-combat จริงจัง, pool ใหญ่ไม่จำกัดครั้ง) = Death Prevention modifier ตัวแรกที่เป็น universal-to-this-build (ไม่ใช่ conditional แบบ Guardian's Blessing ที่ baseline กันไว้ไม่ให้นับ) — บวกกับ Effective HP(d10)+AC ที่มีอยู่แล้ว → ขยับ A→S |

**สรุปเกรด**: Damage=baseline ตลอด | Control=baseline(D) ตลอด | Support: C(1-2)→**B(3-5)→A(6-9)→S(10-20)** | Survivability: A(1-2)→**S(3-20)** | Action Economy=baseline(B) ตลอด | Utility=baseline(C) ตลอด | Versatility=baseline(D) ตลอด

---

## Throne of Fear and Sorrow — glass-cannon เสี่ยงสูง (ไม่ล็อก Path)

*Sorrow's Toll (lv3, จ่าย HP แลก Fervor 3:1) + Moment of Dread (lv6, auto-crit Faith Halo ถ้า atk≥AC+15+PB, ปลด cap Faith Halo) + Mercy's Embrace (lv10, อัตรา 3:1→2:1) + Wrath of Ruin (lv14, crit Faith Halo=3เท่าแทน 2เท่า) + Throne activation (lv17, บังคับเสียเลือด 20/เทิร์น แลก 10 Fervor+Dash+Disengage ฟรี)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 14 | S | Wrath of Ruin: crit Faith Halo = **3 เท่า**ดาเมจ (แทน 2 เท่าปกติ) ซ้อนบน Moment of Dread(lv6)ที่บังคับ crit ได้ในเงื่อนไข atk-roll สูง + Sorrow's Toll/capstone ที่ปั๊ม Fervor budget มหาศาล (จ่าย HP แลกได้) = combo ระดับ outlier-comparable → ขยับ A→S |

**สรุปเกรด**: Damage: A(2-13)→**S(14-20)** | Control/Support/Utility=baseline ตลอด | Survivability=baseline(A) ตลอด — ⚠️ Throne นี้มีกลไก optional ที่จ่าย HP แลกพลัง (Sorrow's Toll/capstone) แต่**ไม่มีผลบังคับลด Effective HP/Mitigation/Death Prevention เชิงกลไก** (เลือกใช้ได้/ไม่ใช้ได้ ไม่ใช่ debuff ถาวร) จึงไม่ปรับ Survivability ลง แม้ playstyle จะเสี่ยงกว่า | Action Economy=baseline(B) ตลอด | Versatility=baseline(D) ตลอด

---

## Throne of Order and Law — buffer เพื่อนร่วมทีมผ่าน Swift (ไม่ล็อก Path)

*Commander's Cadence (lv3, action ให้ ally Swift + ally ใช้ reaction เดิน+โจมตี/cantrip ฟรี) + Iron Discipline (lv6, ไม่โดน OA ขณะมี Swift) + Absolute Command (lv10, Swift อยู่ถึงต้นเทิร์นถัดไป) + Unyielding Law (lv14, Swift ให้ผล Dodge ด้วย) + Throne activation (lv17, Swift พร้อมกัน WIS-mod เป้าหมาย)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3 | B | Commander's Cadence: มอบ action-economy ให้ ally จริงจัง (เดิน+โจมตี 1 ครั้ง หรือ cast cantrip ฟรีผ่าน reaction ของ ally เอง) — ตรงกับนิยาม Anchor's Support Action-Economy dimension (เทียบเคียง Haste แต่ narrower: ครั้งเดียวไม่ใช่เต็มเทิร์น, แลกกับไม่ concentration+Fervor-repeatable) → ขยับ C→B |
| Support | 10 | A | Absolute Command: ผลของ Swift อยู่ยาวถึงต้นเทิร์นถัดไป (จากที่เคยเป็นแค่ครั้งเดียว) = Magnitude/Duration modifier เพิ่มมาก → ขยับ B→A |
| Support | 17 | S | Throne activation: มอบ Swift พร้อมกัน WIS-mod จำนวน ally = Breadth modifier (multi-target) ซ้อนบน Magnitude ที่ขยับมาแล้ว → ขยับ A→S |

**สรุปเกรด**: Damage=baseline ตลอด | Control=baseline(D) ตลอด | Support: C(1-2)→**B(3-9)→A(10-16)→S(17-20)** | Survivability=baseline(A) ตลอด | Action Economy=baseline(B) ตลอด (ฟีเจอร์เน้นเสริม action economy ให้ ally ไม่ใช่ตัวเอง — นับใน Support ไม่ใช่ Action Economy ของตัวเอง) | Utility=baseline(C) ตลอด | Versatility=baseline(D) ตลอด

---

## Throne of Protection and Mercy — tank เต็มตัว (ต้อง Guardian)

*Compassion's Toll (lv3, เสีย HP/tempHP→Fervor 2:1) + Vanguard's Instinct (lv6, +1 reaction ใช้กับ Fervor Technique เท่านั้น) + Sealed Wrath (lv10, ดาเมจที่ Spirit Ward กันได้สะสม→ปล่อยเป็นดาเมจ radiant โบนัสอัตโนมัติ) + Endless Vigil (lv14, +1 reaction อีกตัว รวมเป็น 3 reaction/เทิร์น) + Throne activation (lv17, resistance ทุกดาเมจ + Bulwark Shift ฟรี + temp HP ท้ายเทิร์น)*

⚠️ **แก้ true-baseline ก่อน**: Guardian-locked ไม่มี Light Sword/Cross Slash/Rising Dragon Strike (Retribution/Formless-only) — **Damage true-baseline = B ตลอด (ไม่ใช่ A)** เพราะไม่มี technique เสริมดาเมจของสาย Guardian เลย, **Action Economy true-baseline = C ที่ lv5-20 (ไม่ใช่ B)** เพราะไม่มี Rising Dragon Strike (Reaction Value modifier ของ baseline หายไป เหลือแค่ Bonus Action Value 1/4 ไม่พอขยับ)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 1 | B | **true-baseline correction**: ไม่มี Light Sword/Cross Slash (Retribution-only) — เหลือแค่อาวุธฐาน 1d10+3≈9 ตรงมาร์เชียล peer เป๊ะ ไม่มี modifier เสริม → B ตลอด (ต่างจากไฟล์ baseline ทั่วไปที่ A) |
| Damage | 10 | A | Sealed Wrath: ดาเมจที่ Spirit Ward กันได้สะสมเป็นดาเมจ radiant โบนัสอัตโนมัติทุกครั้งที่ตีติดครั้งถัดไป = Magnitude modifier ที่ทดแทนช่องว่างจาก Light Sword ที่ไม่มี → ขยับ B(true-baseline)→A |
| Survivability | 14 | S | Endless Vigil: reaction ที่ 3/เทิร์น (ต่อจาก Vanguard's Instinct lv6 ที่ให้ตัวที่ 2) ใช้กับ Fervor Technique ได้ทั้งหมด (Spirit Ward ซ้ำได้หลายครั้ง/เทิร์น) = Mitigation-Frequency modifier ที่ไม่มีคลาส/subclass ไหนในระบบนี้เทียบได้ → ขยับ A→S |
| Action Economy | 1 | B | (baseline ปกติ, ไม่เปลี่ยน) |
| Action Economy | 5 | C | **true-baseline correction**: ไม่มี Rising Dragon Strike (Retribution-only) — Primary ตกเป็น C ตาม peer's Extra Attack ที่ lv5 เหมือน baseline ทั่วไป แต่เหลือ modifier แค่ Bonus Action Value (1/4 ไม่พอขยับกลับ) → **C จริง ต่างจากไฟล์ baseline ทั่วไปที่แสดง B** |
| Action Economy | 6 | B | Vanguard's Instinct: +1 reaction ใช้กับ Fervor Technique = Reaction Value modifier ตัวใหม่ (ทดแทน Rising Dragon Strike ที่หายไป) รวมกับ Bonus Action Value เดิม = 2/4 above → ขยับ C→B |
| Action Economy | 14 | A | Endless Vigil: reaction ที่ 3/เทิร์น รวมกับตัวปกติ = 3 reaction total ในหนึ่งเทิร์น — ไม่มีที่เทียบในระบบนี้ → ขยับ B→A |

**สรุปเกรด**: Damage: **B(1-9, true-baseline)→A(10-20)** | Control=baseline(D) ตลอด | Support=baseline(C) ตลอด | Survivability: A(1-13)→**S(14-20)** | Action Economy: **B(1-4)→C(5, true-baseline)→B(6-13)→A(14-20)** | Utility=baseline(C) ตลอด | Versatility=baseline(D) ตลอด

---

## Throne of Wisdom and Spirit — mentor/redirect ให้ ally (ไม่ล็อก Path)

*Anointed Bond (lv3, redirect ผล Universal technique ไปที่ ally 1 คน) + Deepened Wisdom (lv6, +1 technique รู้ + upgrade ฟรี 1 ตัว) + Shared Fate (lv10, แบ่ง Heroic Inspiration) + Kindred Strength (lv14, redirect ได้ทั้ง Retribution/Guardian technique ด้วย ไม่ใช่แค่ Universal) + Throne activation (lv17, Anointed Ally ได้ Advantage ทุกอย่าง+ศัตรู Disadvantage ใส่)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3 | B | Anointed Bond: redirect ผล Universal technique (Faith Halo/Clarity/Pure White Blade/Swift) ไปที่ ally ได้ = แปลง self-buff เป็น ally-buff ตามต้องการ (Breadth+Adaptability) → ขยับ C→B |
| Support | 14 | A | Kindred Strength: ขยาย redirect ให้ครอบคลุม Retribution/Guardian technique ด้วย (Light Sword/Cross Slash/Spirit Ward/Guardian's Blessing/Bulwark Shift ทั้งหมด) = Breadth+Magnitude modifier ขยายใหญ่มาก (จาก 4 ตัวเลือกเป็น 7-10 ตัวเลือก) → ขยับ B→A |
| Support | 17 | S | Throne activation: Anointed Ally ได้ Advantage ทุก atk/check/save + ศัตรู Disadvantage ใส่ (single-target แต่ magnitude สูงมาก เทียบเท่าหรือเหนือ Holy Aura ต่อ 1 เป้าหมาย) → ขยับ A→S |

**สรุปเกรด**: Damage=baseline ตลอด | Control=baseline(D) ตลอด | Support: C(1-2)→**B(3-13)→A(14-16)→S(17-20)** | Survivability=baseline(A) ตลอด | Action Economy=baseline(B) ตลอด | Utility=baseline(C) ตลอด | Versatility=baseline(D) ตลอด

---

## สรุปรวม 6 subclass (peak grade ต่อ axis)

| Subclass | Damage peak | Control peak | Support peak | Survivability peak | Action Economy peak | Utility peak | Versatility peak |
|---|---|---|---|---|---|---|---|
| Class Baseline | S(17-20) | D | C | A | B | C | D |
| Doom and Slaughter | **S(14-20)** | =baseline | =baseline | =baseline | **A(10-20)** | =baseline | =baseline |
| Eternity and Creation | =baseline | =baseline | **S(10-20)** | **S(3-20)** | =baseline | =baseline | =baseline |
| Fear and Sorrow | **S(14-20)** | =baseline | =baseline | =baseline | =baseline | =baseline | =baseline |
| Order and Law | =baseline | =baseline | **S(17-20)** | =baseline | =baseline | =baseline | =baseline |
| Protection and Mercy | **A(10-20)** ⚠️true-baseline B ไม่ใช่ A | =baseline | =baseline | **S(14-20)** | **A(14-20)** ⚠️true-baseline dip C ที่ lv5 | =baseline | =baseline |
| Wisdom and Spirit | =baseline | =baseline | **S(17-20)** | =baseline | =baseline | =baseline | =baseline |

**ข้อค้นพบเบื้องต้น**:
1. **Control และ Versatility ล็อก D ทั้ง 6/6 subclass แบบไม่มีข้อยกเว้นเลย** — ยืนยันชัดเจนว่า floor rule (Primary=D→เกรดรวม D เสมอ) ไม่ใช่แค่ทฤษฎีในไฟล์ Anchor แต่เป็นจริงตลอดทั้ง subclass tree ของคลาสนี้ ต่างจาก Alchemist/Artificer ที่ subclass feature มักแก้ D ได้อย่างน้อย 1-2 ตัว
2. **Path-lock correction คือ methodology finding ใหม่ที่สำคัญที่สุดของไฟล์นี้** — Sacred Knight เป็นคลาสแรกที่ subclass มี prerequisite ผูก Path มาก่อน (Doom and Slaughter=Retribution, Protection and Mercy=Guardian) ทำให้ baseline's "2/3-path representative credit" ใช้ไม่ได้ตรงๆ กับ subclass ที่ล็อก Path เดียว — ต้องคำนวณ true-baseline ใหม่เฉพาะจุด (Protection and Mercy เสีย credit Damage/Action Economy จาก baseline ไป เพราะไม่มี technique สาย Retribution) — **คำเตือนสำหรับคลาสถัดไปที่มีโครงสร้าง subclass-locks-choice คล้ายกัน**: ต้องเช็ค prerequisite ก่อนเสมอ ไม่ใช่ copy baseline credit มาตรงๆ
3. **Support คือ axis ที่ขยับบ่อยสุด** (4/6 subclass ถึง S) — Sacred Throne ส่วนใหญ่เน้น buff/heal สำหรับ ally มากกว่า damage โดยตรง สอดคล้องกับธีม "Sacred Knight" ที่ออกแบบให้เป็น support-fighter hybrid
4. **"Free-cast peak spell/redirect เพื่อ ally ที่ capstone lv17" คือ pattern ซ้ำที่ดัน Support ไปถึง S** อีกครั้ง (Order and Law's multi-Swift, Wisdom and Spirit's Advantage-aura) — สอดคล้องกับ pattern ที่เจอใน Alchemist/Artificer (revival magic ที่ lv15) แม้กลไกจะต่างกันโดยสิ้นเชิง (ไม่ใช่ revival แต่เป็น multi-target buff)
