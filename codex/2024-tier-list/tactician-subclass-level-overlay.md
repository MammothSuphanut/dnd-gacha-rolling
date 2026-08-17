# Tactician — Subclass Level Overlay (ชั้น 2) 🕰️

**อ้างอิง**: [tactician-level-baseline.md](tactician-level-baseline.md) (Class Baseline, ชั้น 1) + [tactician-subclass-scorecard-2024.md](tactician-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 6 Strategic Focus (Gambler, Grandmaster, Medic, Mentalist, Scholar, War Mind) — gate lv3/6/10/15/18
**รูปแบบ**: full table ต่อแกน (≤10 subclass)
**หมายเหตุความเชื่อมั่น**: สืบทอดจาก baseline — Tactician เป็น 3rd-party class (DMs Guild) ไม่มีไฟล์ chassis ในโปรเจกต์ ข้อมูลมาจาก Roll20 Compendium + screenshot ผู้ใช้ ความเชื่อมั่นต่ำกว่าคลาสที่มีไฟล์ JSON โดยตรง

**Baseline โดยสรุป**: Damage B(1)→C(2-20) · Control D(1-10)→C(11-20) · Support C(1-4)→B(5-12)→A(13-20) · Survivability C(1-6)→A(7-20) · Action Economy D(1)→C(2-20) · Utility D(1)→C(2-20) · Versatility **D(1-20) flat**

---

## Gambler

Toolkit ขยายมูลค่า/ความแน่นอนของ Perfect Plan die เดิม ไม่ใช่กลไกใหม่

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 15-20 | **B** | Weighted Dice (lv15, เลิกทอย PP die รับค่าสูงสุดแทนได้) = พลิก Reliability ของ Combat Analysis damage die ที่มีอยู่แล้ว |
| Utility | 3-20 | **B** | Bonus Proficiencies(lv3, 2 skill+gaming set)+Layered Bluff(lv6, reroll Deception) |
| *(Control/Support/Survivability/AE/Versatility)* | — | เท่า baseline | ไม่มีฟีเจอร์ตั้งชื่อชัดเจนพลิก dimension ใหม่ — Versatility ยังคง floor-lock D (ไม่มี swap mechanism จริง) |

## Grandmaster

Support S เดี่ยว (team-safety-net) บวก Damage ขยับผ่าน reaction-attack ใหม่

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 10-20 | **B** | Counterplay (lv10, reaction ตีอาวุธใส่คนที่ทำดาเมจใส่เรา) = แหล่งดาเมจใหม่ที่ไม่ผูกกับ Combat Analysis เดิม |
| Support | 3-4 | **B** | Moving Pieces (lv3, ally ขยับฟรีไม่โดน OA) ดันไวกว่า baseline's lv5 |
| Support | 15-20 | **S** | Perfectionist (lv15, reroll nat-1 ให้ทั้งทีมไม่เสีย resource) = team-wide safety-net ที่ไม่มีต้นทุน |
| Utility | 3-20 | **B** | Bonus Proficiencies (lv3, 2 skill+gaming set สูงสุด 3 ชนิด) |
| *(Control/Survivability/AE/Versatility)* | — | เท่า baseline | Two Steps Ahead (lv6) แคบเกินไป (เฉพาะเป้า analyzed) ไม่พอขยับ Survivability |

## Medic

Healer ตัวจริงหนึ่งเดียวในคลาสนี้ (baseline ไม่มีฮีลเลยสักจุด)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3-20 | **S** | Treatment Under Trial(lv3, ฮีล+temp HP)+Emergency Aid(lv6, วิ่ง+ฮีลใน bonus action เดียว)+Perfect Medic(lv18, ฮีล 100+ล้าง condition) = "สแต็กฮีลหนาแน่นที่สุดในบรรดา subclass ทั้งหมด" ตั้งแต่ subclass gate แรก |
| Action Economy | 6-20 | **B** | Emergency Aid รวมการเคลื่อนที่+ฮีลใน bonus action เดียว = "ประหยัด action สุดในกลุ่ม" |
| Utility | 3-20 | **B** | Bonus Proficiencies(lv3)+Patch Up(lv3, auto-stabilize+ฟื้น HP นอกคอมแบต) |
| *(Damage/Control/Survivability/Versatility)* | — | เท่า baseline | ทุกฟีเจอร์เล็งไปที่เพื่อน ไม่มีอันไหนช่วยดาเมจ/ป้องกันตัวเอง — "one-trick pony" ตามที่ old scorecard ระบุไว้เอง |

## Mentalist

ตัวคุมเกม+ดาเมจ-แอมป์ครบเครื่อง — Control delta สูงสุดในคลาส

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 10-17 | **A** | Insightful Prediction (lv10, reaction ตีอาวุธทุกครั้งที่เป้าพลาด/fail check) = แหล่งดาเมจใหม่ที่ไม่ผูก Combat Analysis |
| Damage | 18-20 | **S** | Disarming Words (เป้าที่โดน prediction รับดาเมจเพิ่มจาก**ใครก็ได้**ที่ตีมัน) = team-wide damage amplifier |
| Control | 3-20 | **A** | Insightful Prediction (lv3, -1d4→1d6 จากทุก d20 test ของเป้า ต่อเนื่องทุกเทิร์นที่ชนะ contest, ครอบคลุม saving throw ที่ lv15) = debuff กว้างเกิน Tier1-2 cap ของ baseline |
| Utility | 3-17 | **B** | Int-to-Perception passive+Search bonus action+Insight-advantage 24ชม. |
| Utility | 18-20 | **A** | Psychoanalyze (auto-success Insight check ต้านเป้าตลอด duration) |
| *(Support/Survivability/Versatility)* | — | เท่า baseline | Goad เป็น protective-support ที่ซ้อนมิติเดิม (Action-Economy-favorable อยู่แล้ว) |

## Scholar

Overall=A สูงสุดในกลุ่ม — **spellcasting เต็มรูปแบบทับบน chassis เดิม** พลิก floor-lock 2 axis พร้อมกัน

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 3-9 | **A** | Wizard damage spell (2 cantrip+3 first-level, lv3) = Magnitude ใหม่ที่ไม่ผูก Combat Analysis |
| Damage | 10-20 | **S** | Analyze extension (extra die ต่อคาถาที่ตีเป้า analyzed) + free-casting via PP die (lv18) |
| Control | 3-20 | **B** | เข้าถึง Wizard control spell (Sleep ฯลฯ) แม้ known-slot จำกัด (ครึ่งต้องเป็น divination/transmutation) |
| Action Economy | 18-20 | **B** | Free-casting-via-PP-die (lv18, หล่อคาถาที่รู้ไม่เสีย slot) = "เพิ่มความยั่งยืนทั้งวันแบบก้าวกระโดด" |
| Utility | 3-20 | **A** | **Spellcasting ปลดล็อก Primary(Magnitude) โดยตรง** — Wizard utility spell(Comprehend Languages/Identify)+improved Trait Analysis |
| Versatility | 3-20 | **S** | Full spellcasting layered ทับ chassis เดิม = **floor-lock พังตรงๆ** (pattern เดียวกับ Wu Jen/Occultist/Noble Genies) — Versatility สูงสุดในคลาสนี้ |
| *(Support/Survivability)* | — | เท่า baseline | Support reinforcement เดิม (Guiding Guile ขยายไปใช้กับสเปลล์) ไม่พลิก dimension ใหม่ |

## War Mind

Overall=B แต่ Damage สูงสุดทั้งไฟล์ — **subclass เดียวใน 4 ตัวจาก Vol.1 ที่ได้ Extra Attack จริง**

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 6-20 | **S** | **Extra Attack (lv6, real!)** + crit-range-expansion(19-20 vs analyzed) + auto-Combat-Analysis-รวมเข้ากับการตี = "ดาเมจต่อเทิร์นสูงสุดในกลุ่มชัดเจน" — คลาสแรก(ต่อจาก Necromancer's Black Rider/Death Knight)ที่ base-class-ไม่มี-Extra-Attack ได้ปลดล็อกผ่าน subclass
| Survivability | 3-20 | **A** | Medium armor(lv3, ทะลุเพดาน light-only ของ baseline)+Fighting Style(Defense/Protection) พลิก Mitigation ตั้งแต่ lv3 — เร็วกว่า baseline 4 เลเวล |
| Action Economy | 3-5 | **B** | Fighting Style/martial weapon prep |
| Action Economy | 6-20 | **A** | Extra Attack เองยกระดับ Primary(Attack-Action Efficiency) จาก C ตรงเป็น B ขั้นต่ำ ซ้อนกับ modifier เดิมที่เอียงอยู่แล้ว |
| *(Control/Support/Utility/Versatility)* | — | เท่า baseline | "โฟกัส melee-striker หนักมาก...ไม่แตะ control/utility เลย" ตามที่ old scorecard ระบุไว้เอง |

---

## ข้อค้นพบสำคัญ

1. **Medic เป็น subclass แรกในคลาสนี้ที่แก้จุดอ่อน "ไม่มีฮีลเลยสักจุด" ของ baseline ได้เต็มรูปแบบ** — Support พุ่งไป S ตั้งแต่ subclass gate แรก (lv3) ผ่านฮีลจริง (ไม่ใช่แค่ buff/reroll-assist แบบ baseline) — คะแนน Support สูงสุดในทั้งไฟล์ old scorecard (10/10)
2. **War Mind เป็นตัวอย่างที่ 2 ในระบบนี้ของ "full-caster/non-Extra-Attack-base-class ได้ Extra Attack จริงจาก subclass"** (ต่อจาก Necromancer's Black Rider/Death Knight) — ดัน Damage ข้ามจาก C ไป S โดยตรง และยกระดับ Action Economy's Primary เองด้วย (ไม่ใช่แค่ modifier flip)
3. **Scholar เป็น subclass เดียวในคลาสนี้ที่ทะลุ floor-lock ได้ 2 axis พร้อมกัน (Utility+Versatility)** ผ่านการเพิ่ม spellcasting เต็มรูปแบบทับบน chassis เดิม — pattern เดียวกับ Wu Jen(Mystic)/Occultist(Monster Hunter)/Noble Genies(Paladin) — ยืนยันว่า pattern "เพิ่มระบบเวทมนตร์ทับ chassis ที่ไม่มีสเปลล์" ใช้ได้แม้กับคลาส 3rd-party ที่ไม่มีสเปลล์ตั้งแต่ base
4. **Grandmaster's Perfectionist (lv15) เป็นตัวอย่างชัดเจนของ "team-wide zero-cost safety net" ที่ดัน Support ทะลุ ceiling A ของ baseline ไปถึง S** — คล้าย pattern ของ Paladin's Aura-stack แต่ในรูปแบบ reroll-protection แทน buff-stat
5. **Mentalist's Insightful Prediction เป็นกลไก Control ที่ทรงพลังที่สุดในคลาสนี้** — debuff ต่อเนื่องบน**ทุก** d20 test ของเป้า (ไม่ใช่แค่ attack roll) ทะลุเพดาน Tier1-2 ของ baseline (push/prone) ไปเป็น real ongoing-severity ตั้งแต่ subclass gate แรก
6. **Versatility floor-lock (D-flat) ยังคงอยู่ 4/6 subclass (Gambler/Grandmaster/Medic/Mentalist)** — มีแค่ Scholar (ผ่าน spellcasting) ที่ทะลุได้ ยืนยันว่า pattern "fungible resource มากแต่ไม่มี swap mechanism → floor D ตายตัว" ที่ baseline วางไว้ยังคงจริงสำหรับ subclass ส่วนใหญ่ เว้นแต่จะมีการเพิ่มระบบใหม่ทั้งระบบ (สเปลล์) เท่านั้น
