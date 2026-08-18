# Warmage — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [warmage-level-baseline.md](warmage-level-baseline.md) (Class Baseline, ชั้น 1) + [warmage-subclass-scorecard-2024.md](warmage-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 11 subclass — gate lv3/7/10/15/18 (มาตรฐาน Warmage)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะ axis/เลเวลที่เกรดเปลี่ยนจาก baseline เท่านั้น ไม่ระบุ = เท่า baseline
**หมายเหตุแหล่งที่มา**: 10 ตัว (Bishops/Cards/Darts/Dice/Go/Kings/Knights/Pawns/Rooks/Roulette) เป็น ValdaSpire24/24Extras 2024-native ส่วน **House of Lancers** พบเฉพาะในไฟล์ VSS 2014 (ไม่มี `reprintedAs`) จึงเป็น 2014-only 🕰️ ให้คะแนนด้วยกลไก 2014 ดั้งเดิม

**Baseline โดยสรุป**: Damage A(1-4)→S(5-20) · Control D(1)→C(2-20) · Support D(1-20) flat · Survivability C(1-20) flat · Action Economy D(1-4)→C(5-13)→B(14-20) (**tie-break 2-2 ที่ lv5-13** — Bonus Action+Arcane Surge=เหนือ vs Reaction+Extra Action=ต่ำ, ยังไม่พลิกจนกว่าจะมี Reaction feature ใหม่) · Utility C(1-20) flat · Versatility C(1-20) flat

---

## House of Bishops (ValdaSpire24)

- Control: **A(3-20)** — ปลดล็อก spell slot ระดับ 1+ เต็มจาก Wizard list → เข้าถึงคาถา control จริง (Hold Person/Polymorph)
- Utility: **A(3-20)** — Mystical Companion(Find Familiar เตรียมตลอด)+Arcane Study(2 skill prof)+คาถา utility เต็มจาก Wizard list
- Versatility: **S(3-20)** — ปลดล็อก spell slot เต็มรูปแบบ = เปลี่ยนโครงสร้างทั้งคลาสให้กว้างขึ้น (damage/control/utility ผ่านคาถาระดับสูง) — floor-break pattern เดียวกับ Wu Jen/Occultist/Magician

## House of Cards (ValdaSpire24)

- Survivability: **B(3-20)** — Dealer's Choice(lv10, resistance ทุกชนิด+teleport หลบเข้า demiplane)+Hearts/Diamonds temp HP/AC
- Versatility: **B(3-20)** — Hands table 8 ผลลัพธ์ครอบคลุมดาเมจ/ป้องกัน/utility

## House of Darts (ValdaSpire24)

- Support: **C(10-20)** — Intercepting Shot(lv10, reaction ยิงสวนลดโอกาส attack ที่เข้าใส่ ally ในระยะ 30ft) = floor-break D→C ตัวแรกในไฟล์
- Action Economy: **B(5-20)** — Trick Shot (ปรับ attack roll หลังทอย ไม่เสีย action) เป็น**กลไก Reaction ใหม่จริง**ตั้งแต่ lv3 พลิก tie-break 2-2 ที่ baseline ตั้งไว้ (lv5-13) ให้เป็น 3-1 ทันที ดัน B onset เร็วขึ้นจาก lv14 มาเป็น lv5
- Versatility: **B(3-20)** — Bullseye 3 โหมด+Trick Shot+Intercepting Shot+Dart Burst breadth กว้าง

## House of Dice (ValdaSpire24)

- Survivability: **B(3-20)** — Dice of Fate(แก้ failed save)+Chaos Roll temp HP/invisibility+Twisted Fate(lv10, แก้ Disadvantage)
- Action Economy: **B(5-20)** — Dice of Fate เป็นกลไกแก้ roll แบบ Reaction ใหม่ (ไม่เสีย action) เหมือน Darts's Trick Shot — พลิก tie-break เดียวกัน
- Versatility: **A(3-20)** — Chaos Roll table 12 ผลลัพธ์ครอบคลุมดาเมจ/ควบคุม/ป้องกัน/utility/downside = ตารางสุ่มกว้างสุดในคลาส

## House of Go (ValdaSpire24Extras)

- Support: **S(3-20)** — Formations ครบ 3 โหมด(Flank/Wall)+Opening Strategy(lv7)+Hardened Formations(lv10, ยกเลิก crit ทั้งทีม)+Chain of Liberties(lv15) = ชุด team-support กว้าง+reliable สุดในคลาส (ก่อน Kings จะแซง)
- Survivability: **B(3-20)** — Wall formation(+2 AC ตัวเองด้วย)+Hardened Formations ยกเลิก crit ที่โดนตัวเองด้วย
- Versatility: **A(3-20)** — 3 โหมด Formation ต่างกันสิ้นเชิง+kill-chain+crit-negation ทีม

## House of Kings (ValdaSpire24)

- Control: **A(3-20)** — Check(Frightened)+Stalemate(Speed=0) ติดมากับ maneuver ดาเมจโดยตรง
- Support: **S(3-20)** — Blitz+Gambit+Morale Boost+Tactical Master(lv10)+Checkmate(lv15, ally โจมตี/cast cantrip ฟรีผ่าน reaction)+Grandmaster(lv18) = ชุด team-support ครบและแรงสุดในคลาสทั้งหมด (เหนือ Go)
- Survivability: **B(3-20)** — Martial Training (medium armor+shield ยกจาก light-only)
- Action Economy: **B(5-13) → A(15-20)** — Morale Boost เป็น Reaction ใหม่ตั้งแต่ maneuver ต้นๆ พลิก tie-break lv5-13 ก่อน→Checkmate(lv15, ally ทำ action เพิ่มผ่าน reaction ฟรี) ดันสุทธิ action ทั้งทีมเพิ่มขึ้นจริง
- Versatility: **A(3-20)** — 6 maneuver ต่างกันสิ้นเชิง (movement/fear/check-fix/attack-bonus/save-fix/slow) ครอบคลุมทุกมิติ

## House of Knights (ValdaSpire24)

- Survivability: **B(3-9) → A(10-20)** — Martial Training(medium+**heavy** armor+shield ไม่ต้องมี Str ขั้นต่ำ)→Knight's Ward(lv10, bonus action temp HP=2×level)

## House of Lancers (VSS) 🕰️

- Survivability: **B(3-9) → A(10-20)** — Intercept Technique(Int-to-AC)→Deflect Energy(lv10, reaction ลดดาเมจ ranged elemental)
- Action Economy: **B(3-9) → A(10-20)** — Hand-to-Hand Arcana(bonus action unarmed strike ฟรีทุก Attack action)→Deflect Energy(lv10, Reaction ใหม่)+Shock Trooper(lunge เคลื่อนที่ฟรี)
- Utility: **B(7-20)** — Mystical Physicality(lv7, Int แทน Str/Dex/Con check ทุกอัน+ไม่เสีย movement จาก difficult terrain)
- Versatility: **B(3-20)** — ผสม monk-style unarmed combat กับ caster เต็มตัวในธีมเดียว

## House of Pawns (ValdaSpire24)

- Support: **C(15-20)** — Pawn Wall(lv15, ตัวเอง+ally 2 คน resistance ต่อชนิดดาเมจของ cantrip ที่เพิ่งตีโดน) = floor-break D→C
- Survivability: **B(10-20)** — Multidiscipline(lv10, ครึ่ง prof bonus เข้า saving throw ทุกชนิดที่ไม่มี proficiency)
- Versatility: **A(3-20)** — Promotion สลับโหมด caster-optimize↔martial-train ได้ทุก long rest = "ปรับตัวได้ทุกอย่างที่แท้จริง" ตามที่ old scorecard ระบุ

## House of Rooks (ValdaSpire24)

- Survivability: **B(10-20)** — Fleeting Decoy(lv10, reaction Disadvantage ต่อทุก attack ที่เข้าใส่ตัวเอง)+Elusive Step(lv15, ไม่โดน AOO)
- Action Economy: **B(10-20)** — Fleeting Decoy เป็น Reaction ใหม่ตั้งแต่ lv10 พลิก tie-break ดัน B onset เร็วขึ้นจาก lv14
- Utility: **A(7-20)** — Covert Magic(lv7, cast ฟรี 5 คาถา infiltration: Invisibility/Knock/Silence/Spider Climb/Feather Fall ไม่เสีย slot)

## House of Roulette (ValdaSpire24Extras)

- Survivability: **B(10-20)** — Spinning Shield(lv10, reaction d100 ยกเลิก attack ทั้งหมด — cancel-the-hit-adjacent instance ที่ 5)+Single bet(resistance ทุกชนิดดาเมจ+treat d20 เป็น 20 บน save)
- Action Economy: **B(10-20)** — Spinning Shield เป็น Reaction ใหม่ตั้งแต่ lv10 พลิก tie-break
- Versatility: **B(3-20)** — 5 ประเภทเดิมพัน (AC/attack/advantage/dmg/all-around) เลือกพร้อมกันได้หลายแบบผ่าน Chips of Fate

---

## ข้อค้นพบสำคัญ

1. **⚠️ Damage ขยับ 0/11 (0%) — ครั้งแรกในระบบที่ axis หนึ่งไม่ขยับเลยแม้แต่ตัวเดียว** (สลับตำแหน่งกับ Warden's Survivability 0%) — เพราะ baseline ตั้ง S ไว้ตั้งแต่ lv5 อยู่แล้ว (เร็วสุดในบรรดา full-caster ทั้งหมด) ทำให้แม้ subclass ทุกตัวจะมี damage feature แรงๆ (ส่วนใหญ่ปลดล็อกที่ lv18) ก็ตกอยู่ในช่วง S ที่มีอยู่แล้วเสมอ ไม่มีที่ว่างให้ไต่ขึ้นต่อ
2. **Survivability กับ Versatility ขยับเท่ากันที่ 9/11 (82%) — กว้างที่สุดในไฟล์** ทั้งคู่สวนทางกับ Damage อย่างสิ้นเชิง เพราะ baseline ทั้งสอง axis เป็น C-flat ธรรมดา (ไม่มีจุดกู้) เปิดช่องให้ subclass เติมกลไกจริงได้ง่าย
3. **"Trick Shot-style post-roll Reaction fix" เป็นกลไกที่พลิก AE tie-break 2-2 (lv5-13) ได้ซ้ำถึง 6/11 ครั้ง** (Darts/Dice/Kings/Lancers/Rooks/Roulette) — ยืนยันว่า baseline's tie-break ไม่ใช่ ceiling ตายตัว แค่ต้องมีกลไก Reaction ใหม่จริง (แยกจาก Bonus Action ที่นับไปแล้ว) ถึงจะพลิกได้ — Warmage เป็นคลาสที่ 2 ที่พบ pattern การพลิก tie-break ผ่าน single-mechanism-addition แบบนี้ชัดเจนขนาดนี้
4. **House of Bishops ทะลุ floor-lock 2 axis พร้อมกัน (Utility A + Versatility S)** ผ่านการปลดล็อก spell slot ระดับ 1+ เต็มรูปแบบ — เปลี่ยน Warmage จาก "cantrip specialist" เป็น full spellcaster ทันที นับเป็นการ floor-break ที่รุนแรงที่สุดในคลาสนี้ (เทียบเท่า Magician ที่ Warlock)
5. **House of Kings แซง House of Go ขึ้นเป็น Support ที่สมบูรณ์ที่สุดในคลาส** (S ทั้งคู่ตั้งแต่ lv3 แต่ Kings มี 6 feature vs Go's 5) — ทั้งสองตัวพิสูจน์ว่า Support D-flat baseline (ซึ่งเป็นจุดอ่อนสุดของ chassis) แก้ได้เต็มรูปแบบผ่าน "team formation/maneuver" theme แม้จะเป็นคลาส cantrip-only ก็ตาม
6. **Spinning Shield (House of Roulette) เป็น cancel-the-hit-adjacent instance ที่ 5 ในระบบ** (ต่อจาก Gunslinger/Ranger/Rogue/Warlock) — ต่างตรงที่เป็นการประลอง d100 contest แทนที่จะเป็น auto-miss ตรงๆ หรือ %-based แบบ Hexblade
