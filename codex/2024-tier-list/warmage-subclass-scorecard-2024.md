# Warmage — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 11 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warmage](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 11 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24` — **หมายเหตุกลไก**: Warmage ไม่มี spell slot ระดับ 1+ มาตรฐานเลย (ไม่มี `casterProgression` ในไฟล์ data) เป็น class ที่เล่นรอบ **cantrip ล้วนๆ** ที่ถูกเสริมพลังหนักผ่าน class feature แทน — คนละดีไซน์กับ full/half caster ทั่วไป

---

## Class Baseline (Warmage, 2024)

Floor 0-10 ต่อ axis ของ **Warmage เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, cantrip known **มากที่สุดในบรรดา class ที่ทำมาแล้ว** (4 lv1 → 10 lv20), saving throw proficiency Con + Int, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Arcane Initiation (lv1, เลือก background trait), Warmage Edge (lv1, บวก Int mod + extra dice เข้าดาเมจ cantrip 1 ครั้ง/เทิร์น), Reliable Cantrip (lv2, cantrip ดาเมจขั้นต่ำเสมอแม้พลาด/ศัตรู save ผ่าน), Warmage Tricks (lv2, รู้ 2+ ตัว สลับได้ทุก level-up), Arcane Surge (lv5, ดับเบิล/ทริปเปิลดาเมจ dice ของ cantrip 2-3 ครั้ง/วัน), Tactical Insight (lv6), Arcane Surge Improvement (lv11), Strategic Deflection (lv14), Master Warmage (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cantrip known มากที่สุดในเกม (4→10) บวก Warmage Edge (บวก Int mod + extra dice ทุกเทิร์น) + Reliable Cantrip (การันตีดาเมจขั้นต่ำแม้พลาด/ศัตรู save ผ่าน — cantrip แทบไม่มีทาง "ยิงเปล่า" เลย) + Arcane Surge (lv5) ที่ **ดับเบิลดาเมจ dice ของ cantrip เหมือน crit ได้ 2-3 ครั้ง/วัน** (ทริปเปิลถ้าคาถานั้น crit อยู่แล้ว) — เป็นชุด cantrip-optimization ที่แน่นที่สุดในบรรดา class ที่ทำมา แลกด้วยการที่ **ไม่มี spell slot ระดับ 1+ เลย** จึงพึ่งพา cantrip อย่างเดียวตลอดเกม [M:4/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย cantrip แนะนำ (Force Dart, Quickstep, Shocking Grasp) เอียงไปทาง damage/mobility ไม่ใช่ control [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 4/10 (C) | HD d8 + armor proficiency แค่ light เป็นฐานอ่อน แต่ Tactical Insight (lv6) บวก Int mod เข้า saving throw ต้านคาถา/magical effect ทุกอัน (ยกเว้น Int save เอง) และ Strategic Deflection (lv14, reaction) ให้สะท้อนคาถาที่บังคับ save กลับไปหาเป้าอื่นได้ถ้า save ผ่าน แต่ทั้งสองอย่างจำกัดแค่ภัยคุกคามจาก "เวทย์" เท่านั้น ไม่ครอบคลุมดาเมจกายภาพ [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Warmage Edge/Reliable Cantrip/Arcane Surge เป็น rider บน cantrip ที่ cast อยู่แล้วไม่กิน action เพิ่ม แต่ไม่มี bonus-action spellcasting หรือ extra-turn feature ติด chassis เลย [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | Arcane Initiation (lv1) เป็นตัวเลือก background-flavor แคบๆ ไม่มี skill bonus หรือ ritual casting ที่ยืนยันได้ Warmage Tricks อาจมี utility trick แต่เนื้อหาไม่มีในไฟล์ data ที่ตรวจสอบได้ [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Warmage Tricks (2+ ตัว สลับได้ทุก level-up) ปรับลูกเล่นการต่อสู้/เคลื่อนที่/cast ได้ตามสถานการณ์ บวก cantrip list สลับได้ทุก level-up เช่นกัน แต่ทุกอย่างยังคงวนอยู่รอบกลไก cantrip อย่างเดียว ไม่มี spell slot ให้ปรับ role กว้างแบบ caster อื่น [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (11)

**Class Baseline อ้างอิง**: Damage 8, Control 3, Support 0, Survivability 4, Action Economy 4, Utility 3, Versatility 5

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ **หมายเหตุแหล่งที่มา**: 10 ตัว (Bishops, Cards, Darts, Dice, Go, Kings, Knights, Pawns, Rooks, Roulette) เป็น ValdaSpire24/24Extras 2024-native ส่วน **House of Lancers** พบเฉพาะในไฟล์ VSS 2014 (ไม่มี `reprintedAs`) จึงเป็น 2014-only 🕰️ — ให้คะแนนด้วยกลไก 2014 ดั้งเดิม (Warden's ธีม monk-caster hybrid)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| House of Bishops | A | ValdaSpire24 | 9 (S) | 6 (B) | 2 (D) | 4 (C) | 4 (C) | 7 (A) | 8 (A) |
| House of Cards | B | ValdaSpire24 | 8 (A) | 3 (C) | 0 (D) | 6 (B) | 5 (B) | 4 (C) | 7 (A) |
| House of Darts | A | ValdaSpire24 | 9 (S) | 3 (C) | 3 (C) | 5 (B) | 6 (B) | 4 (C) | 7 (A) |
| House of Dice | B | ValdaSpire24 | 8 (A) | 4 (C) | 0 (D) | 6 (B) | 5 (B) | 3 (C) | 8 (A) |
| House of Go | S | ValdaSpire24Extras | 8 (A) | 3 (C) | 9 (S) | 6 (B) | 6 (B) | 4 (C) | 7 (A) |
| House of Kings | S | ValdaSpire24 | 8 (A) | 7 (A) | 9 (S) | 5 (B) | 7 (A) | 4 (C) | 8 (A) |
| House of Knights | B | ValdaSpire24 | 9 (S) | 3 (C) | 0 (D) | 7 (A) | 5 (B) | 3 (C) | 6 (B) |
| House of Lancers | A | VSS 🕰️ | 9 (S) | 3 (C) | 0 (D) | 7 (A) | 7 (A) | 5 (B) | 6 (B) |
| House of Pawns | A | ValdaSpire24 | 9 (S) | 3 (C) | 3 (C) | 6 (B) | 5 (B) | 3 (C) | 7 (A) |
| House of Rooks | A | ValdaSpire24 | 8 (A) | 4 (C) | 0 (D) | 6 (B) | 5 (B) | 8 (A) | 6 (B) |
| House of Roulette | C | ValdaSpire24Extras | 7 (A) | 3 (C) | 0 (D) | 6 (B) | 4 (C) | 3 (C) | 6 (B) |

---

### House of Bishops (ValdaSpire24)

**Overall**: A — Damage S บวก Utility/Versatility กระโดดขึ้นเป็น A ทั้งคู่ (+4/+3) และ Control ขยับเป็น B แต่ Support ยังแทบเป็น 0 (2/10, ยังเกรด D)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ปลดล็อก spell slot ระดับ 1+ เต็มรูปแบบจาก Wizard spell list + Warmage Edge ใช้กับคาถาระดับ 1+ ได้ด้วย (ปกติใช้ได้แค่ cantrip) — เปลี่ยนจาก cantrip-specialist เป็นนักบอมบ์เต็มตัวที่มีทั้ง cantrip แน่นๆ และคาถาระดับสูง [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | เข้าถึงคาถา control เต็มจาก Wizard spell list ได้ (Hold Person, Polymorph ฯลฯ) ผ่าน prepared spell ที่ขยายตามเลเวล [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 2/10 (D) | Spell Sculpting (lv15, เลือก ally จำนวน Int mod ให้ auto-succeed save + ไม่โดนดาเมจจากคาถา AoE ของตัวเอง) เป็น support ป้องกันข้าง friendly-fire ที่ break เหนือ 0-baseline เล็กน้อย |
| **Survivability** | 4/10 (C) | ไม่มี survivability feature ใหม่โดยตรง (แม้จะเข้าถึงคาถาป้องกันอย่าง Shield ได้ผ่าน spell slot) = เท่า baseline |
| **Action Economy** | 4/10 (C) | คาถาระดับ 1+ ยังเสีย action ปกติในการ cast = เท่า baseline |
| **Utility** | 7/10 (A) | Mystical Companion (Find Familiar เตรียมไว้ตลอด รวมฟอร์มพิเศษ Imp/Pseudodragon/Quasit/Sprite) + Arcane Study (skill prof 2 อัน) + คาถา utility เต็มจาก Wizard list [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | การปลดล็อก spell slot ระดับ 1+ เต็มรูปแบบเป็นการเปลี่ยนโครงสร้างทั้งหมดของ class ให้กว้างขึ้นมาก (damage/control/utility ผ่านคาถาระดับสูง) เป็น subclass ที่ยืดหยุ่นที่สุดในบรรดา Warmage ทั้งหมด [M:3/4] [R:2/3] [B:3/3] |

### House of Cards (ValdaSpire24)

**Overall**: B — ไม่มี axis ไหนขยับเกิน +2 เลย เป็นการเสริมกลางๆ ทั่วทั้ง 4 axis (Survivability/AE/Utility/Versatility) โดยไม่มี peak


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Deck of Fate's Straight/Flush/Three of a Kind/Pair ให้ดาเมจเสริมสูงสุด +12 ทุกครั้งที่ตีโดน แต่ขึ้นกับไพ่ในมือที่สุ่มได้ [M:4/4] [R:1/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 6/10 (B) | Dealer's Choice (lv10, GM เลือกให้ Resistance ทุกชนิดดาเมจ/teleport/หลบเข้า demiplane) บวก Hearts/Diamonds ให้ temp HP/AC [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Card Reading (lv15, ทายไพ่ถูกแล้วได้ Dash/Disengage/Utilize ฟรีในการกระทำเดียวกับ bonus action ที่ใช้อยู่แล้ว) [M:2/4] [R:1/3] [B:2/3] |
| **Utility** | 4/10 (C) | Spades/Clubs ให้ speed/save bonus เล็กน้อย เป็น utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Hands table มี 8 ผลลัพธ์ต่างกันครอบคลุมดาเมจ/ป้องกัน/utility เป็น breadth ที่กว้าง [M:2/4] [R:2/3] [B:3/3] |

### House of Darts (ValdaSpire24)

**Overall**: A — Damage S บวกขยับขึ้น 5 axis พร้อมกันแบบกลางๆ (Support D→C, Survivability/AE/Utility/Versatility ล้วนบวก) กว้างกว่า Bishops แต่ magnitude ต่อแกนน้อยกว่า


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Bullseye's Extra Damage (+1d10 Force ทุกครั้งที่ทอยเลขซ้ำที่บันทึกไว้) บวก Dart Burst (lv18, AoE cone 60ft ดาเมจ 1d8 ต่อเลขที่บันทึกไว้ สูงสุด 10+ เลข = ดาเมจก้อนมหาศาล) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | Intercepting Shot (lv10, reaction ยิงสวนลดโอกาส attack ที่เข้าใส่ ally ในระยะ 30ft) เป็น support ป้องกันที่ break เหนือ 0-baseline |
| **Survivability** | 5/10 (B) | Trick Shot (ปรับ attack roll ±d4) เน้นความแม่นยำเป็นหลัก บวก Intercepting Shot ป้องกันตัวเองได้เช่นกัน [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Trick Shot ใช้ได้หลังทอย ไม่เสีย action, Bullseye เป็น passive ทั้งหมด [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Dagger Climb (lv7, climb speed 10 นาที) เป็น traversal utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Bullseye 3 โหมด (dmg/recovery/reroll) + Trick Shot (ปรับความแม่นยำ) + Intercepting Shot (ป้องกัน) + Dart Burst (AoE) เป็น breadth ที่กว้างมาก [M:2/4] [R:2/3] [B:3/3] |

### House of Dice (ValdaSpire24)

**Overall**: B — ขยับกลางๆ 4 axis ไม่มี peak เด่น Versatility ขึ้นมากสุดแค่ +3


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Chaos Roll table มีผลลัพธ์ Fireball ฟรี/Lightning Bolt+dice ฟรี เป็นดาเมจก้อนใหญ่ที่สุ่มได้ แต่มีทั้งผลบวก/ลบปนกันในตาราง [M:4/4] [R:1/3] [B:3/3] |
| **Control** | 4/10 (C) | Chaos Roll table มีผล Prone/babbling-field/heavily obscured แต่เป็นแค่บางผลใน 12 ช่องที่สุ่มได้ ไม่ reliable [M:1/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 6/10 (B) | Dice of Fate ใช้แก้ failed save ได้ บวก Chaos Roll's temp HP/invisibility บวก Twisted Fate (lv10, แก้ Disadvantage ด้วยการทอย Dice of Fate) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Dice of Fate ใช้แก้ roll ได้โดยไม่เสีย action, Loaded Dice (lv7, โกงผลทอย d6) ก็ฟรีเช่นกัน [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่นอกคอมแบต = เท่า baseline |
| **Versatility** | 8/10 (A) | Chaos Roll table มี 12 ผลลัพธ์ครอบคลุมดาเมจ/ควบคุม/ป้องกัน/utility/downside เป็นตารางสุ่มที่กว้างที่สุดในบรรดา class นี้ [M:3/4] [R:2/3] [B:3/3] |

### House of Go (ValdaSpire24Extras)

**Overall**: S — Support กระโดดจาก 0 (D) เป็น 9 (S) — swing แรงที่สุดในกลุ่ม จากไม่มี support เลยกลายเป็นดีที่สุดในคลาส บวก Survivability/Action Economy/Utility/Versatility ขยับตามอีก 4 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | End Game (lv18, kill ด้วย cantrip → cast cantrip ที่สองฟรีด้วย bonus action พร้อม apply Warmage Edge ซ้ำได้) เป็น damage-chain ที่ snowball ได้ [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Flank formation ให้ Advantage ในการโจมตี ไม่ใช่ control โดยตรง = เท่า baseline |
| **Support** | 9/10 (S) | Formations ครบ 3 โหมด (Flank=Adv ให้ตัวเอง+ally, Wall=+2 AC ทีมสูงสุด 7 คน) + Opening Strategy (lv7, Advantage ให้ ally สูงสุด 6 คน) + Hardened Formations (lv10, ยกเลิก Critical Hit ทั้งทีมในฟอร์เมชัน) + Chain of Liberties (lv15, ally เคลื่อนที่ไปพร้อมกันฟรี) เป็นชุด team-support ที่กว้างและ reliable ที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Wall formation (+2 AC ตัวเองด้วย) + Hardened Formations (ยกเลิก Critical Hit ที่โดนตัวเองด้วย) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Formations เป็น bonus action เปิดแล้ว passive, End Game ให้ cast คาถาที่สองฟรี [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Opening Strategy (วางแผน 10 นาทีก่อนเข้าฉาก) เป็น utility นอกคอมแบตเฉพาะสถานการณ์ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | 3 โหมด Formation ที่ต่างกันโดยสิ้นเชิง + kill-chain + crit-negation ทีม เป็น breadth ที่กว้าง [M:2/4] [R:2/3] [B:3/3] |

### House of Kings (ValdaSpire24)

**Overall**: S — Support กระโดด 0→9 (S) เหมือน House of Go แต่กว้างกว่า: Control ก็กระโดด 3→7 (A) และ Action Economy ขึ้นเป็น A ด้วย เหลือแค่ Damage แกนเดียวที่นิ่งที่ baseline


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Maneuver ส่วนใหญ่ (Check/Gambit/Stalemate) เพิ่ม battle die ใส่ดาเมจการตี แต่ magnitude โดยรวมยังไม่เกิน baseline ที่แน่นอยู่แล้วมาก = ใกล้เคียง baseline |
| **Control** | 7/10 (A) | Check (Frightened) + Stalemate (Speed=0) เป็นเมนู control ที่มาพร้อมดาเมจในตัวเดียวกัน [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Blitz (ally เคลื่อนที่ฟรี) + Gambit (ally ถัดไปได้โบนัส attack ต่อเป้าเดียวกัน) + Morale Boost (reaction แก้ save ที่ ally พลาด) + Tactical Master (lv10, ally ในระยะ 10ft บวก Int mod เข้า magic save) + Checkmate (lv15, ally โจมตี/cast cantrip ฟรีผ่าน reaction) + Grandmaster (lv18, แจก battle die แก้ roll พลาดแบบ Bardic Inspiration) เป็นชุด team-support ที่ครบและแรงที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Martial Training (medium armor+shield) ยกระดับจาก light-only baseline ที่อ่อนแอ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Maneuver เป็น bonus action ตามปกติ แต่ Blitz/Checkmate ให้ ally ทำ action เพิ่มผ่าน Reaction ฟรี = ได้ action สุทธิเพิ่มทั้งทีม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | Flash of Brilliance (แก้ Int/Wis check ที่พลาด) เป็น utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | 6 maneuver ที่ต่างกันโดยสิ้นเชิง (movement/fear/check-fix/attack-bonus/save-fix/slow) ครอบคลุมทุกมิติ [M:3/4] [R:2/3] [B:3/3] |

### House of Knights (ValdaSpire24)

**Overall**: B — Damage S บวก Survivability A แต่ Support ยังเป็น 0 เต็ม (ไม่เคยแก้เลย) ต่างจาก House of Go/Kings ที่ปลดล็อกแกนนี้ไปแล้ว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Field of Blades (lv18, melee spell attack แยกทอยต่อเป้าสูงสุด 5 เป้า 2d10+Int ต่อเป้า) บวก Manifest Weapon (อาวุธ melee Int-based เสริมจาก cantrip) เป็น damage kit ที่ผสม AoE กับ single-target ได้ครบ [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | Martial Training (medium+**heavy armor**+shield โดยไม่ต้องมี Str ขั้นต่ำ) เป็นการยกระดับ chassis จาก light-only ขึ้นสูงสุด บวก Knight's Ward (lv10, bonus action temp HP=2x level) [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Manifest Weapon ให้ตัวเลือกโจมตี melee เสริมจาก cantrip โดยไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | Fighting Style feat เป็น combat utility เฉพาะทาง ไม่ใช่ utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | Melee-caster hybrid (Gish) archetype ที่ค่อนข้างโฟกัสบทบาทเดียว [M:2/4] [R:2/3] [B:2/3] |

### House of Lancers (VSS 🕰️)

**Overall**: A — Damage S บวก Survivability/Action Economy ขึ้นเป็น A ทั้งคู่ (+3 ทั้งคู่) และ Utility ขยับ B แต่ Support ยังเป็น 0 เต็มเหมือน House of Knights


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Hand-to-Hand Arcana (bonus action unarmed strike ฟรีทุกครั้งที่ใช้ Attack action) บวก Flurry of Spells (lv18, ใช้ Arcane Surge cast cantrip 3 อันพร้อมกันในการกระทำเดียว) เป็น damage output ที่สูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | Intercept Technique (ใช้ Int แทน Dex เข้า AC แบบ Unarmored Defense) บวก Deflect Energy (lv10, reaction ลดดาเมจ ranged elemental attack ด้วย 1d10+Int+ครึ่ง level) เป็นเลเยอร์ป้องกันที่แข็งแรงกว่า light-armor baseline มาก [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Hand-to-Hand Arcana ให้โจมตีฟรีด้วย bonus action ทุกเทิร์น บวก Shock Trooper (เคลื่อนที่ lunge 15-30ft ฟรีไม่เสีย action ก่อนโจมตี) [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 5/10 (B) | Mystical Physicality (lv7, ใช้ Int แทน Str/Dex/Con check ทุกอัน + ไม่เสีย movement จาก Difficult Terrain) เป็น utility กว้างข้ามหลายสถานการณ์ [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ผสม monk-style unarmed combat กับ caster เต็มตัวในธีมเดียว เป็น hybrid ที่มีเอกลักษณ์ [M:2/4] [R:2/3] [B:2/3] |

### House of Pawns (ValdaSpire24)

**Overall**: A — Damage S บวกขยับขึ้น 4 axis กลางๆ (Support D→C, Survivability/AE/Versatility) กว้างพอสมควรไม่มี peak อื่น


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Fundamental Mastery (lv18, เลือก damage die 1 ลูกของ cantrip ให้เป็นค่าสูงสุดเสมอทุกเทิร์น) ซ้อนทับกับ Reliable Cantrip+Arcane Surge ของ baseline ทำให้ดาเมจขั้นต่ำต่อเทิร์นสูงมาก [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | Pawn Wall (lv15, ตัวเอง+ally 2 คนได้ Resistance ต่อชนิดดาเมจของ cantrip ที่เพิ่งตีโดน) เป็น support ที่ break เหนือ 0-baseline |
| **Survivability** | 6/10 (B) | Multidiscipline (lv10, บวกครึ่ง prof bonus เข้า saving throw ทุกชนิดที่ไม่มี proficiency อยู่แล้ว) เป็นการยกระดับ save กว้างทุกประเภท [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Pawn Storm (lv7, เคลื่อนที่ฟรีทันทีตอนทอย Initiative ไม่เสีย action) [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | Adaptive Magic (trick+cantrip เพิ่ม) เป็นตัวเลือกที่เพิ่มความยืดหยุ่นมากกว่า utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | Promotion สลับโหมดได้ทุก long rest (caster-optimize ↔ martial-train) บวกบัฟกว้างหลายแกน เป็นธีม "ปรับตัวได้ทุกอย่าง" ที่แท้จริง [M:2/4] [R:2/3] [B:3/3] |

### House of Rooks (ValdaSpire24)

**Overall**: A — Utility กระโดดจาก C เป็น A (3→8) บวก Survivability/Action Economy/Control ขยับตาม แต่ Damage ไม่ขยับเลย (เท่า baseline)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Rook Strike's Disadvantage-on-save option ช่วยให้คาถา save-based landing ง่ายขึ้น ไม่ใช่ดาเมจเพิ่มโดยตรง = ใกล้เคียง baseline |
| **Control** | 4/10 (C) | Rook Strike (bonus action บังคับ Disadvantage บน saving throw ของเป้าต่อคาถาที่ตัวเองร่าย Int mod ครั้ง/วัน) เป็น control-reliability tool ที่ break เหนือ baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย (เป็น self-focused stealth kit ล้วนๆ) |
| **Survivability** | 6/10 (B) | Fleeting Decoy (lv10, reaction ให้ทุก attack ที่เข้าใส่ตัวเองมี Disadvantage จนถึงเทิร์นถัดไป) + Elusive Step (lv15, เคลื่อนที่ไม่โดน AOO หลัง 5ft แรก) เป็นเลเยอร์หลบหลีกที่แข็งแรง [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Rook Strike เป็น bonus action, Elusive Step ไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 8/10 (A) | Covert Magic (lv7, cast ฟรี 5 คาถา infiltration: Invisibility/Knock/Silence/Spider Climb/Feather Fall โดยไม่เสีย slot) เป็นชุด utility ที่กว้างและทรงพลังมาก [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 6/10 (B) | โฟกัส stealth/infiltration specialist ชัดเจน แม้จะมี utility spell หลากหลาย [M:2/4] [R:2/3] [B:2/3] |

### House of Roulette (ValdaSpire24Extras)

**Overall**: C — มีแค่ Survivability/Versatility ที่ขยับเล็กน้อย (+1 ถึง +2) ที่เหลือนิ่งสนิทรวมถึง Damage ที่ตัวเลขต่ำกว่า sibling ทุกตัวในกลุ่ม — เพิ่มน้อยที่สุดในคลาส


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Tens bet (+10 ดาเมจ cantrip แบบ flat) และ Single bet (treat d20 เป็น 20 เสมอ) เป็นดาเมจเสริมที่ทรงพลังแต่ผูกกับความน่าจะเป็นของ d100 = ใกล้เคียง baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 6/10 (B) | Spinning Shield (lv10, reaction ประลอง d100 เพื่อยกเลิก attack ทั้งหมด) + Single bet (Resistance ทุกชนิดดาเมจ+treat d20 เป็น 20 บน save) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 4/10 (C) | Spin the Wheel/Cash Out เป็น bonus action ปกติ ไม่ประหยัด action สุทธิ = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | 5 ประเภทเดิมพัน (AC/attack/advantage/dmg/all-around) ให้เลือกพร้อมกันได้หลายแบบผ่าน Chips of Fate [M:2/4] [R:1/3] [B:3/3] |
