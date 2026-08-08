# Cleric — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 27 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Cleric](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 27 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-cleric.json` — source `XPHB` (Player's Handbook 2024) — หมายเหตุ: เวอร์ชัน 2024 ตัดหัวข้อ "Ritual Casting" ออกจาก Spellcasting feature เดิม (มีแค่ใน PHB 2014) จึงไม่นับเป็น baseline ในไฟล์นี้

---

## Class Baseline (Cleric, 2024)

Floor 0-10 ต่อ axis ของ **Cleric เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Wis, full caster progression, saving throw proficiency Wis + Cha, armor baseline light/medium/shield (หรือ heavy ถ้าเลือก Protector), weapon baseline simple (หรือ martial ถ้าเลือก Protector), **Divine Order (lv1, เลือก 1 อย่าง)**: Protector (martial weapon + heavy armor prof) หรือ Thaumaturge (cantrip เพิ่ม 1 ตัว + bonus เท่า Wis mod ให้ Int(Arcana/Religion) check), Channel Divinity (2 ใช้/วัน: Divine Spark + Turn Undead), Sear Undead (lv5), Blessed Strikes (lv7, เลือก Divine Strike หรือ Potent Spellcasting), Divine Intervention (lv10), Improved Blessed Strikes (lv14), Greater Divine Intervention (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Full spell slot lv1-9 + cantrip (Sacred Flame เป็น Dex-save damage cantrip) ให้ magnitude ระดับ full caster มาตรฐาน บวก Blessed Strikes (lv7) ถ้าเลือก Divine Strike จะได้ extra 1d8 necrotic/radiant ทุกครั้งที่ตีด้วยอาวุธ (2d8 ที่ lv14) เป็นทางเลือก "นักบวชนักรบ" ที่ไม่ต้องพึ่ง subclass เลย และ Divine Spark (Channel Divinity, 2 ครั้ง/วัน ฟื้น 1/short rest) เลือกยิง necrotic/radiant ดาเมจแทนฮีลได้ (CON save, 1d8+Wis scale ถึง 4d8 ที่ lv18) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Cleric spell list มี control ระดับกลาง-สูง (Bane, Hold Person, Spirit Guardians lv3, Banishment) ไม่กว้างเท่า Wizard/Bard แต่ Turn Undead (Channel Divinity) เป็น hard-CC เฉพาะทาง — ศัตรูประเภท Undead ในระยะ 30ft fail Wis save จะติด Frightened+Incapacitated 1 นาที บังคับให้วิ่งหนีจนกว่าจะโดนดาเมจ ใช้ได้ 2 ครั้ง/วัน ฟื้น 1/short rest แต่ผูกกับชนิดเป้าหมายเฉพาะ (Undead เท่านั้น) [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 8/10 (A) | Divine Spark (Channel Divinity) ให้เลือกฮีล HP เท่า 1d8+Wis (scale ถึง 4d8 ที่ lv18) แทนดาเมจได้ทันทีแบบไม่แตะ spell slot เลย ใช้ได้ 2 ครั้ง/วันตั้งแต่ lv2 ฟื้น 1/short rest บวกกับ full spell list ที่มี healing spell ระดับดีที่สุดในเกม (Cure Wounds, Healing Word, Mass Cure Wounds ฯลฯ) ให้เลือกเตรียม [M:3/4] [R:3/3] [B:2/3] |
| **Survivability** | 7/10 (A) | HD d8 + saving throw proficiency Wis (กันสาย charm/fear/หลายๆ control spell ได้กว้าง) เป็นฐานกลางๆ แต่ Divine Order ให้เลือก Protector ตั้งแต่ lv1 ได้ armor proficiency ระดับ heavy + martial weapon ทันที — เป็น full caster ตัวเดียวในเกมที่ตัว chassis เปิดทาง heavy armor ให้แบบไม่ต้องพึ่ง subclass เลย (AC ที่เป็นไปได้สูงกว่า full caster อื่นชัดเจนถ้าเลือกทางนี้) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Divine Spark/Turn Undead ใช้ Magic action เท่า spell ปกติ (ไม่ฟรี) แต่ Channel Divinity คืนมา 1 ใช้/short rest (2 ใช้/วันตั้งแต่ lv2) ทำให้ sustain ได้ดีกว่า spell slot ล้วนๆ และ Divine Intervention (lv10) cast Cleric spell lv5 ลงมาได้ฟรีไม่เสีย slot เลย 1 ครั้ง/long rest ช่วยยืด resource pool รวมของวันได้อีกชั้น [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | Divine Order แบบ Thaumaturge (ถ้าเลือก) ให้ cantrip เพิ่ม 1 ตัว + bonus เท่า Wis mod (ขั้นต่ำ +1) กับ Int(Arcana/Religion) check เป็น utility เสริมนอกคอมแบตเฉพาะทาง บวก full spell list ที่มี utility spell ระดับดี (Guidance, Augury, Commune ฯลฯ) ให้เลือกเตรียม แต่ breadth แคบกว่า Wizard (ไม่มี Ritual Casting ติด chassis ใน 2024) และแคบกว่า Bard (ไม่มี skill-boost แบบ Jack of All Trades ที่ใช้ได้ทุก skill) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard (ไม่ lock-in) บวก chassis มีจุดเลือก build 2 จุดที่ไม่ผูก subclass เลย — Divine Order lv1 (Protector แนวนักบวชนักรบ vs Thaumaturge แนว utility) และ Blessed Strikes lv7 (Divine Strike แนวตีอาวุธ vs Potent Spellcasting แนวเวทย์) ทำให้ Cleric ตัวเดียวปรับ playstyle ระหว่าง frontline-caster กับ pure-caster ได้จากตัว chassis ล้วนๆ แต่ยังผูกอยู่กับ archetype นักบวช/support เป็นแกนหลักเสมอ [M:3/4] [R:3/3] [B:1/3] |

---

## Subclass Scoring (27)

**Class Baseline อ้างอิง**: Damage 6, Control 5, Support 8, Survivability 7, Action Economy 6, Utility 6, Versatility 7

ไม่มี domain ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุ: domain 2014 หลายตัวมี Divine Strike ของตัวเอง (เปลี่ยนธาตุดาเมจ) ซึ่งเป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ที่ baseline มีอยู่แล้ว **ไม่นับเป็นการเพิ่มคะแนน** เว้นแต่จะมี proc/scaling พิเศษเกินกว่านั้น

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Ambition Domain | C | PSA 🕰️ | 6 (B) | 6 (B) | 8 (A) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Arcana Domain | A | SCAG 🕰️ | 7 (A) | 7 (A) | 8 (A) | 7 (A) | 7 (A) | 8 (A) | 8 (A) |
| Death Domain | C | DMG 🕰️ | 8 (A) | 5 (B) | 8 (A) | 7 (A) | 6 (B) | 6 (B) | 7 (A) |
| Destruction Domain | C | VSS 🕰️ | 8 (A) | 5 (B) | 8 (A) | 7 (A) | 7 (A) | 6 (B) | 7 (A) |
| Eldritch Domain | A | GrimHollowPG24 | 7 (A) | 8 (A) | 8 (A) | 8 (A) | 7 (A) | 6 (B) | 8 (A) |
| Forge Domain | A | XGE 🕰️ | 7 (A) | 5 (B) | 8 (A) | 9 (S) | 6 (B) | 7 (A) | 7 (A) |
| Grave Domain | S | RHW | 8 (A) | 7 (A) | 10 (S) | 8 (A) | 7 (A) | 6 (B) | 8 (A) |
| Inquisition Domain | A | GrimHollowPG24 | 8 (A) | 5 (B) | 9 (S) | 8 (A) | 7 (A) | 6 (B) | 8 (A) |
| Knowledge Domain | S | FRHoF | 6 (B) | 6 (B) | 8 (A) | 7 (A) | 6 (B) | 9 (S) | 9 (S) |
| Life Domain | A | XPHB | 6 (B) | 5 (B) | 10 (S) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Light Domain | A | XPHB | 7 (A) | 5 (B) | 9 (S) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Madness Domain | B | VSS 🕰️ | 6 (B) | 8 (A) | 8 (A) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Nature Domain | C | PHB 🕰️ | 6 (B) | 6 (B) | 8 (A) | 8 (A) | 6 (B) | 6 (B) | 7 (A) |
| Order Domain | A | TCE 🕰️ | 6 (B) | 7 (A) | 9 (S) | 7 (A) | 8 (A) | 6 (B) | 8 (A) |
| Peace Domain | A | TCE 🕰️ | 6 (B) | 5 (B) | 10 (S) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Pestilence Domain | A | ValdaSpire24Extras | 7 (A) | 8 (A) | 8 (A) | 7 (A) | 7 (A) | 7 (A) | 8 (A) |
| Purification Domain | S | GrimHollowPG24 | 8 (A) | 6 (B) | 8 (A) | 8 (A) | 7 (A) | 8 (A) | 8 (A) |
| Rum Domain | B | VSS 🕰️ | 6 (B) | 6 (B) | 8 (A) | 8 (A) | 7 (A) | 6 (B) | 8 (A) |
| Solidarity Domain | B | PSA 🕰️ | 6 (B) | 5 (B) | 10 (S) | 7 (A) | 7 (A) | 6 (B) | 7 (A) |
| Strength Domain | C | PSA 🕰️ | 6 (B) | 5 (B) | 8 (A) | 8 (A) | 6 (B) | 6 (B) | 7 (A) |
| Tempest Domain | B | PHB 🕰️ | 8 (A) | 6 (B) | 8 (A) | 7 (A) | 6 (B) | 7 (A) | 8 (A) |
| Travel Domain | A | VSS 🕰️ | 7 (A) | 5 (B) | 8 (A) | 8 (A) | 7 (A) | 8 (A) | 8 (A) |
| Trickery Domain | S | XPHB | 6 (B) | 5 (B) | 9 (S) | 8 (A) | 7 (A) | 7 (A) | 8 (A) |
| Twilight Domain | S | TCE 🕰️ | 6 (B) | 5 (B) | 9 (S) | 8 (A) | 7 (A) | 7 (A) | 8 (A) |
| War Domain | S | XPHB | 8 (A) | 5 (B) | 9 (S) | 8 (A) | 8 (A) | 6 (B) | 8 (A) |
| Wealth Domain | B | VSS 🕰️ | 6 (B) | 6 (B) | 8 (A) | 7 (A) | 6 (B) | 8 (A) | 8 (A) |
| Zeal Domain | A | PSA 🕰️ | 9 (S) | 6 (B) | 8 (A) | 7 (A) | 8 (A) | 6 (B) | 8 (A) |

---

### Ambition Domain (PSA 🕰️)

**Overall**: C — ขยับแค่ 3 axis เล็กน้อย (Control/Survivability/Versatility) ไม่มี peak ใหม่ แคบที่สุดในกลุ่มร่วมกับ Death/Nature/Strength Domain


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | Warding Flare (reaction, Wis mod ครั้ง/วัน) กด Disadvantage ให้ attack roll ของศัตรูที่โจมตีในระยะ 30ft ได้ทุกกรณี ไม่จำกัดว่าต้องเป็นเป้าตัวเอง — เพิ่ม soft-control เล็กน้อยเหนือ baseline [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Warding Flare ใช้ปกป้อง ally ได้เหมือนกัน แต่ยังไม่มี heal/buff โดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Warding Flare ใช้ป้องกันตัวเองได้ด้วย (reaction, Wis mod ครั้ง/วัน กด Disadvantage การโจมตีใส่ตัวเอง) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Invoke Duplicity/Cloak of Shadows ใช้ Channel Divinity เหมือน baseline ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | Illusion duplicate เป็น combat tool เป็นหลัก ไม่ขยาย utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 8/10 (A) | ภาพลวงตา (Invoke Duplicity → Improved Duplicity 4 ตัวที่ lv17) + Cloak of Shadows (invisible) ให้เล่นบท scout/decoy ได้นอกเหนือจาก caster ปกติ [M:2/4] [R:3/3] [B:3/3] |

### Arcana Domain (SCAG 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน กว้างที่สุดในกลุ่มที่ไม่มี S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Arcane Mastery (lv17) ให้เลือก spell wizard ระดับ 6-9 ติดตัวถาวร 4 ตัว รวม damage spell ระดับสูงสุดในเกมได้ (เช่น Meteor Swarm-tier) — magnitude สูงมากแต่ปลดล็อกช้า [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Arcane Abjuration (CD) เป็น hard-CC เฉพาะทาง (celestial/elemental/fey/fiend) คล้าย Turn Undead ของ baseline แต่ครอบคลุมชนิดเป้าหมายกว้างกว่า และอัปเกรดเป็น Banishment เต็มรูปแบบที่ lv5+ [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Spell Breaker (ยกเลิก 1 spell บนตัวที่รักษาเมื่อ heal ด้วย spell slot) เป็น utility เสริมติดกับการฮีล = ใกล้เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Spell Breaker พ่วงมากับ spell ฮีลที่แคสอยู่แล้วไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Arcane Initiate ให้ cantrip wizard 2 ตัว + Arcana proficiency บวก Arcane Mastery (lv17) เข้าถึง spell wizard ระดับ 6-9 (เช่น Teleportation Circle, True Seeing) — breadth utility กว้างขึ้นมาก [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เข้าถึง spell list ของ Wizard ทั้ง cantrip และระดับสูงสุด ทำให้ Cleric เล่นเป็น hybrid arcane-caster ได้จริง [M:2/4] [R:3/3] [B:3/3] |

### Death Domain (DMG 🕰️)

**Overall**: C — ขยับแค่ Damage +2 แกนเดียว ที่เหลือนิ่งสนิททั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Touch of Death (CD, melee, extra necrotic 5+2×level) เป็นดาเมจก้อนใหญ่ที่ใช้ resource แยกจาก spell slot บวก Reaper/Improved Reaper ให้ cantrip/necromancy spell lv1-5 โดน 2 เป้าพร้อมกัน และ Inescapable Destruction ทำให้ necrotic ทะลุ resistance [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | Touch of Death พ่วงกับการตี melee ปกติไม่เสีย action เพิ่ม แต่ magnitude ไม่พอเพิ่มคะแนนแกนนี้ = เท่า baseline |
| **Utility** | 6/10 (B) | necromancy cantrip เลือกได้จาก list ใดก็ได้เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | ธีมดาเมจ necrotic เดี่ยวๆ ไม่ขยาย role อื่น = เท่า baseline |

### Destruction Domain (VSS 🕰️)

**Overall**: C — ขยับแค่ 2 axis เล็กน้อย (Damage/AE) ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Channel Divinity: Calamity (bonus action, 1 นาที) ให้ damage die ที่ทอยได้เลขสูงสุดของ cleric spell ทุกดวง reroll ต่อได้ (สูงสุด 2 เท่าจำนวน die เดิม) บวก Havoc Spell (lv17, bonus action แลก spell slot) เพิ่มดาเมจ radiant สเกลถึง 5d6 — nova magnitude สูงกว่า baseline ชัดเจน [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Calamity/Havoc Spell ทั้งคู่ใช้ bonus action เปิดใช้บัฟที่คงอยู่ต่อเนื่อง (1 นาที) ไม่เสีย action หลักเพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | Shockwave ทำลายวัตถุ/สิ่งแวดล้อมรอบเป้า เป็น utility เฉพาะทางแคบ (ทลายกำแพง/ประตู) = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | ธีม blaster เดี่ยวๆ ไม่ขยาย role อื่น = เท่า baseline |

### Eldritch Domain (GrimHollowPG24)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sing the Song that Ends the World (lv17) ให้ดาเมจ psychic 10d10 ก้อนเดียวเมื่อเป้าเซฟ Prophecy of Doom พลาด — magnitude สูงมากแต่ผูกเงื่อนไขกับฟีเจอร์ควบคุมและปลดล็อกช้า [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 8/10 (A) | Eldritch Contagion/Prophecy of Doom (ผูกกับ spell ที่แคสอยู่แล้ว หรือ CD แบบ AoE 15ft) บังคับ Wis save หรือติดเอฟเฟกต์สุ่มจาก table 8 แบบ (Frightened, ห้ามพูด, Disadvantage, ล้ม ฯลฯ) นาน 1 นาทีแบบ recurring save — control tool ที่ยืดหยุ่นและครอบคลุมมากกว่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Otherworldly Calm ให้ resistance psychic + Advantage ต้าน charmed/frightened + กัน telepathy แบบสวนกลับดาเมจใส่ผู้บุกรุกจิตใจ [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Eldritch Contagion พ่วงมากับ spell ที่แคสอยู่แล้วไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 8/10 (A) | กลไก roll-table เดียวให้ผลทั้งดาเมจและ control หลายรูปแบบสลับกันได้ [M:2/4] [R:3/3] [B:3/3] |

### Forge Domain (XGE 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ (กระโดด +2) บวก Damage/Utility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Blessing of the Forge ให้ +1 atk/dmg แก่อาวุธ (ตัวเองหรือ ally) ถาวรจนจบ long rest ถัดไป 1 ครั้ง/วัน — เพิ่ม magnitude เล็กน้อยแบบต่อเนื่องทั้งวัน [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Blessing of the Forge ให้กับ ally ได้เหมือนกัน (+1 AC หรือ atk/dmg) แต่ magnitude เล็ก 1 ครั้ง/วัน = ใกล้เท่า baseline |
| **Survivability** | 9/10 (S) | Soul of the Forge (lv6, fire resistance + AC+1 ขณะใส่ heavy armor) บวก Saint of Forge and Fire (lv17, fire immunity + resistance BPS nonmagical ขณะใส่ heavy armor) — ทำให้ Protector-build ของ Forge Domain แข็งกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ (Blessing of Forge ใช้ก่อนต่อสู้) = เท่า baseline |
| **Utility** | 7/10 (A) | Artisan's Blessing (CD, พิธีกรรม 1 ชม. สร้างไอเทมโลหะที่ไม่ใช่เวทมนตร์ มูลค่าไม่เกิน 100gp) บวก smith's tools proficiency เป็น downtime utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | เสริมความแข็งแกร่งของ Protector build เดิม ไม่ได้เปิด role ใหม่ = เท่า baseline |

### Grave Domain (RHW)

**Overall**: S — Support พุ่งเป็น 10/10 (S เต็มสเกล) บวกขยับขึ้นครบ 6 ใน 7 axis กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Pull of Death (extra necrotic 1d4→1d6 ใส่เป้าที่ Bloodied ทุกครั้งที่ตี/แคสโดน) บวก Path to the Grave (CD curse, เพิ่มดาเมจเท่า Cleric level เมื่อ ally จบ curse ด้วยการตี) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Path to the Grave (CD, bonus action) สาปเป้าให้ Disadvantage ทั้ง attack roll และ saving throw จนถึงต้นเทิร์นถัดไป — debuff เดี่ยวที่ทรงพลัง [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 10/10 (S) | Return to Life (Spare the Dying เป็น bonus action + ฮีลแบบ max-value die ให้เป้า 0 HP) บวก Sentinel at Death's Door (reaction ลดดาเมจครึ่งหรือยกเลิกคริติคอลให้ตัวเอง/ally ที่ Bloodied, Wis mod ครั้ง/วัน) บวก Keeper of Souls (lv17, ฮีลเมื่อศัตรูตายใกล้ๆ) — support ซ้อนหลายชั้นรอบธีม "กันตาย" [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Sentinel at Death's Door ใช้ป้องกันตัวเองได้ด้วย (ลดดาเมจครึ่ง/ยกเลิกคริท) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Return to Life ให้แคส Spare the Dying เป็น bonus action แทน action ปกติ [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/support/tank รอบธีม "สถานะ Bloodied และการตาย" ได้กว้าง [M:2/4] [R:3/3] [B:3/3] |

### Inquisition Domain (GrimHollowPG24)

**Overall**: A — Support เป็น S ใหม่ บวก Damage/Survivability/AE ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Witch Hunter's Strike (extra force dmg 1d8→2d8 บนตี, เพิ่มเป็น 2d8→3d8 ถ้าเป้ากำลัง Concentration, Wis mod ครั้ง/วัน) บวก Rebuke Invoker (reaction, force dmg สเกลตาม spell slot level ของศัตรู) — anti-caster damage kit ที่แรงกว่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ (Rebuke Invoker เป็นดาเมจล้วน ไม่ติดเงื่อนไข) = เท่า baseline |
| **Support** | 9/10 (S) | Spell Shield (bonus action CD) ให้ temp HP + Advantage ต้าน spell save + Resistance ดาเมจจาก spell แก่ตัวเองหรือ ally ได้ ขยายเป็นหลายเป้าที่ lv17 (Supernal Safeguard) — ป้องกันทีมจาก caster ศัตรูได้จริง [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Spell Shield ใช้กับตัวเองได้เช่นกัน (temp HP + resistance ดาเมจ spell) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Spell Shield เป็น bonus action, Rebuke Invoker เป็น reaction — ไม่แย่ง action หลัก [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | ดาเมจ+ป้องกัน+ตอบโต้ทั้งหมดโฟกัสรอบธีม anti-magic เฉพาะทาง แต่ยังครอบคลุมหลายบทบาทพร้อมกัน [M:2/4] [R:3/3] [B:3/3] |

### Knowledge Domain (FRHoF)

**Overall**: S — Utility และ Versatility เป็น S ใหม่ทั้งคู่ (Utility กระโดด +3)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | Command เป็น domain spell ที่ติดตัวถาวรตั้งแต่ lv3 เป็น control จริงที่ baseline ไม่รับประกัน [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Unfettered Mind ให้ Int save proficiency เพิ่ม (ถ้ายังไม่มี) เป็น mitigation เล็กน้อย = ใกล้เท่า baseline |
| **Action Economy** | 6/10 (B) | Mind Magic (CD) แคส divination spell ที่เตรียมไว้แบบไม่เสีย slot แต่ยังเสีย action ปกติ = เท่า baseline |
| **Utility** | 9/10 (S) | Unfettered Mind ให้ telepathy 60ft คุยพร้อมกันได้หลายตัว บวก Divine Foreknowledge (lv17, bonus action) ให้ Advantage บน d20 test **ทุกประเภท** นาน 1 ชม. — utility breadth กว้างที่สุดใน domain ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Divine Foreknowledge (Advantage บน d20 test ทุกแบบ 1 ชม.) เป็นบัฟที่ใช้ได้กับทุก build/ทุกสถานการณ์แบบไม่ผูก archetype เลย [M:3/4] [R:3/3] [B:3/3] |

### Life Domain (XPHB)

**Overall**: A — Support พุ่งเป็น 10/10 (S เต็มสเกล) บวก Survivability ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Disciple of Life (ฮีลเพิ่ม 2+ระดับ slot ทุกครั้งที่แคส heal spell) + Preserve Life (CD, ฮีล 5×level แจกจ่ายไม่เสีย slot) + Blessed Healer (ฮีลตัวเองด้วยเมื่อฮีลคนอื่น) + Supreme Healing (lv17, ฮีลทุก die เป็นค่าสูงสุดเสมอ) — ซ้อนกำลังฮีลหลายชั้นจนเป็น healer เฉพาะทางที่แรงที่สุดในเกม [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Blessed Healer คืน HP ให้ตัวเองทุกครั้งที่ฮีลคนอื่นด้วย spell slot [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Disciple of Life ให้ HP โบนัสฟรีทุกครั้งที่แคส heal spell อยู่แล้วไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | ธีมฮีลล้วนๆ ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | โฟกัสบทบาท healer เฉพาะทางสุดขั้ว ไม่ได้ขยาย role อื่น = เท่า baseline |

### Light Domain (XPHB)

**Overall**: A — Support เป็น S ใหม่ บวก Damage/Survivability ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Radiance of the Dawn (CD, AoE 30ft radiant 2d10+level) เป็นดาเมจเป็นวงกว้างที่ baseline (single-target ล้วน) ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature โดยตรงใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Warding Flare ใช้ปกป้องเป้าหมายอื่นที่ถูกโจมตีได้ (ไม่จำกัดแค่ตัวเอง) และ Improved Warding Flare (lv6) มอบ temp HP ให้เป้าที่ถูกโจมตีทุกครั้งที่ใช้ + ฟื้นทุก short rest — ปกป้องทีมได้จริงและถี่ [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Warding Flare ใช้ป้องกันตัวเองได้เช่นกัน และฟื้นทุก short rest ตั้งแต่ lv6 [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่นอกเหนือ CD ปกติ = เท่า baseline |
| **Utility** | 6/10 (B) | Radiance of the Dawn ล้าง magical darkness เป็น utility เฉพาะทางแคบ = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | Warding Flare เลือกใช้ได้ทั้งดาเมจ(อ้อม)/ป้องกัน/support ในกลไกเดียว [M:2/4] [R:3/3] [B:3/3] |

### Madness Domain (VSS 🕰️)

**Overall**: B — Control กระโดด +3 บวก Survivability/Versatility ขยับตาม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรงใหม่ (Frenzy effect ทำให้ศัตรูตีกันเองเป็นดาเมจทางอ้อมเท่านั้น) = เท่า baseline |
| **Control** | 8/10 (A) | Temporary Insanity (action, Wis save) บังคับติดเอฟเฟกต์สุ่มจาก d20 table ที่ทรงพลัง (พูดไม่ได้/50% miss chance/บังคับสุ่มเป้าหมาย/ล้มทุกเทิร์น) บวก Embrace Unreality (lv17, AoE 120ft ปรับกฎ reality ทั้งสนามรบ 1 นาที) — control tool ที่ magnitude/breadth สูงกว่า baseline มาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Fragmented Mind ให้ Advantage ต้าน charmed/frightened/mind-read และแชร์ให้ ally ได้ผ่านพิธีกรรม 10 นาที [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | Lunatic Insight (บวก prof bonus เข้า check ที่ไม่ proficient เมื่อทอยเลขคู่) เป็น utility เล็กน้อยแบบสุ่ม = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | Embrace Unreality เลือกโหมดปรับกฎสนามรบได้หลายแบบ (mobility/adv-disadv สลับ/ห้ามเคลื่อนที่/ปรับขนาด) [M:2/4] [R:3/3] [B:3/3] |

### Nature Domain (PHB 🕰️)

**Overall**: C — ขยับแค่ 2 axis เล็กน้อย (Control/Survivability) ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Divine Strike เป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ของ baseline = เท่า baseline |
| **Control** | 6/10 (B) | Charm Animals and Plants (CD) เป็น hard-CC เฉพาะชนิดเป้าหมาย (beast/plant) คล้ายโครงสร้าง Turn Undead ของ baseline แต่เพิ่มชนิดเป้าหมายที่ครอบคลุมได้อีกกลุ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Dampen Elements (reaction) ให้ resistance ดาเมจ 5 ธาตุแก่ตัวเองหรือ ally ในระยะ 30ft [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | druid cantrip + skill proficiency เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | ธีม charmer/นักธรรมชาติ ไม่ขยาย role อื่นมากนัก = เท่า baseline |

### Order Domain (TCE 🕰️)

**Overall**: A — Support เป็น S ใหม่ บวก Control/AE/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Order's Wrath (lv17) แค่แชร์ดาเมจ Divine Strike ที่มีอยู่แล้วให้ ally ตีซ้ำ ไม่ใช่แหล่งดาเมจใหม่จริงจัง = ใกล้เท่า baseline |
| **Control** | 7/10 (A) | Order's Demand (CD) เป็น AoE 30ft บังคับ Wisdom save หรือ Charmed + ทำอาวุธหลุดมือ — control วงกว้างที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Voice of Authority ให้ ally ที่โดน buff spell จากเราได้ reaction ตีฟรีทันทีทุกครั้งที่แคส spell บัฟระดับ 1+ ใส่เขา — ขยาย action economy ของทั้งทีมผ่านการแคส spell ปกติ [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Voice of Authority ให้ ally ตีฟรีทุกครั้งที่บัฟ บวก Embodiment of the Law (Wis mod ครั้ง/วัน) แคส enchantment spell เป็น bonus action แทน action — ประหยัด economy ทั้งของตัวเองและทีม [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | skill proficiency (Intimidation/Persuasion) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/support รอบธีม "ผู้บัญชาการสนามรบ" ได้กว้าง [M:2/4] [R:3/3] [B:3/3] |

### Peace Domain (TCE 🕰️)

**Overall**: A — Support พุ่งเป็น 10/10 (S เต็มสเกล) บวก Survivability/AE ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Emboldening Bond (action, ผูก ally จำนวน = prof bonus ให้บวก d4 เข้า attack/check/save เมื่ออยู่ใกล้กัน, prof bonus ครั้ง/วัน) + Balm of Peace (CD, เดิน+ฮีล 2d6+Wis ให้ทุกคนที่เดินผ่าน) + Protective Bond (ally สลับที่รับดาเมจแทนกันได้ผ่าน reaction) + Expansive Bond (lv17, ระยะ bond 60ft + resistance ตอนรับดาเมจแทน) — ระบบซัพพอร์ตทีมที่ซับซ้อนและทรงพลังที่สุดใน Cleric [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Emboldening Bond ผูกตัวเองได้ด้วย + Protective Bond อาจมี bondmate สลับมารับดาเมจแทนตัวเองได้ [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Protective Bond เป็น reaction ของ ally ที่ไม่เสีย action ตัวเอง บวก Emboldening Bond ให้ผล d4 ต่อเนื่องโดยไม่ต้องทำอะไรเพิ่มหลัง action แรก [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | โฟกัส support/protector เฉพาะทางสุดขั้ว ไม่ได้ขยาย role อื่น = เท่า baseline |

### Pestilence Domain (ValdaSpire24Extras)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Bloodmore (ตัวเลือกหนึ่งของ Infection) ให้ extra necrotic 1d6 ทุกครั้งที่เป้าโดน BPS damage ตลอด 1 นาที — magnitude เล็กแต่ต่อเนื่อง [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 8/10 (A) | Infection (CD, Con save) ให้เลือกเอฟเฟกต์ persistent 3 แบบ (ลดความเร็ว/Blinded เกิน 5ft/ดาเมจต่อเนื่อง) บวก Fester (บังคับ Disadvantage บน Con save ต้าน spell/feature ของตัวเอง) บวก Epidemic Infection (lv17, แพร่กระจายเป็น AoE + เพิ่ม Disadvantage บน ability check/save) — debuff kit ที่ยืดหยุ่นและกว้างกว่า baseline มาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Inoculate (action) รักษาอาการ Poisoned/contagion ให้ ally พร้อม grant resistance พิษ 1 นาที = ใกล้เท่า baseline |
| **Survivability** | 7/10 (A) | Inoculate ใช้กับตัวเองได้เช่นกัน (กัน poison) = ใกล้เท่า baseline |
| **Action Economy** | 7/10 (A) | Fester ให้ผล Disadvantage แถมกับ spell/feature ที่ใช้อยู่แล้วไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Inoculate เป็นเครื่องมือแก้พิษ/โรคที่ใช้นอกคอมแบตได้จริง [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Infection เลือกเอฟเฟกต์ได้ 3 แบบตามสถานการณ์ (ควบคุม/ดาเมจ/ปิดสายตา) บวกระบบแพร่กระจายเป็นวงกว้างที่ lv17 [M:2/4] [R:3/3] [B:3/3] |

### Purification Domain (GrimHollowPG24)

**Overall**: S — ขยับขึ้น 6 ใน 7 axis พร้อมกัน (มีแค่ Support ที่นิ่ง) กว้างที่สุดในกลุ่มที่ไม่มี S peak เดี่ยว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cleanse with Fire ให้ extra fire dmg 1d8 บน cantrip หรือตีอาวุธ ใช้ได้ Wis mod+prof bonus ครั้ง ฟื้นทุก short/long rest — ความถี่การใช้สูงกว่าตัวเลือก Divine Strike ของ baseline มาก [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Unclean Brand (CD) มาร์กเป้าให้ Disadvantage บน save ต้าน spell ของเรา นาน 1 นาที เป็น soft-control/debuff [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Ward Against Corruption/Sear Imperfections ให้ผลดีแก่ ally ได้ แต่ต้องแลกด้วยดาเมจไฟให้เป้า = ใกล้เท่า baseline (มีข้อแลกเปลี่ยน) |
| **Survivability** | 8/10 (A) | Ward Against Corruption ให้ Advantage ต้านโรค/polymorph แก่ตัวเอง [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Cleanse with Fire พ่วงกับ cantrip/ตีอาวุธที่ทำอยู่แล้วไม่เสีย action เพิ่ม ใช้ได้บ่อยมาก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Sear Imperfections (lv17) แคส Lesser/Greater Restoration ได้ฟรีไม่จำกัดโดยไม่เสีย slot (แลกด้วยดาเมจไฟ) — utility รักษาอาการ/คำสาปที่ทรงพลัง [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/debuff/utility รักษารอบธีมไฟ-การชำระล้าง [M:2/4] [R:3/3] [B:3/3] |

### Rum Domain (VSS 🕰️)

**Overall**: B — ขยับกลางๆ 4 axis เล็กน้อย ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Divine Strike เป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ของ baseline = เท่า baseline |
| **Control** | 6/10 (B) | Intoxicate (reaction ต้าน attacker, Con save) ให้ Poisoned + Disadvantage บนทุก saving throw นาน 1 นาทีแบบ recurring save [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Next Round's On Me (lv17, 1 ครั้ง/วัน) ให้ ally สูงสุด 6 ตัว Advantage บน Int/Wis/Cha save + ลดดาเมจ BPS ด้วย Wis mod นาน 1 นาที = ใกล้เท่า baseline (แรงแต่ปลดล็อกช้า/1 ครั้ง/วัน) |
| **Survivability** | 8/10 (A) | Drunken Sway ให้ AC = 10+Dex+Wis เมื่อไม่ใส่เกราะ/ถือโล่ — ทางเลือก AC ที่สูสีหรือดีกว่าเกราะบางแบบได้จริง [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Rumrunner (reaction) เคลื่อนที่ครึ่งความเร็วฟรีไม่โดน OA เมื่อศัตรูขยับ — เครื่องมือจัดตำแหน่งที่ไม่เสีย action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | ส่วนใหญ่เป็น flavor (ทนเหล้า) = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสม tank(Drunken Sway)/skirmisher(Rumrunner)/control(Intoxicate) ได้หลายบทบาท [M:2/4] [R:3/3] [B:3/3] |

### Solidarity Domain (PSA 🕰️)

**Overall**: B — Support พุ่งเป็น 10/10 (S เต็มสเกล) แต่ breadth แคบมาก มีแค่ AE ที่ขยับตามอีกนิด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Divine Strike เป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ของ baseline = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Preserve Life (CD เหมือนของ Life Domain: ฮีล 5×level แจกจ่าย) + Supreme Healing (lv17, ฮีลทุก die เป็นค่าสูงสุด) + Oketra's Blessing (reaction, CD, +10 บน attack roll ของ ally) — สืบทอดคลัง heal เต็มของ Life Domain บวก buff-attack แบบ War Domain ทับซ้อนกัน [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองโดยตรงใหม่ (ทุกอย่างมุ่งช่วย ally) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Solidarity's Action ให้ตีอาวุธเป็น bonus action ได้ทุกครั้งที่ใช้ Help action (Wis mod ครั้ง/วัน) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | โฟกัสบทบาท healer/buffer เฉพาะทางสุดขั้วเหมือน Life Domain ไม่ขยาย role อื่น = เท่า baseline |

### Strength Domain (PSA 🕰️)

**Overall**: C — ขยับแค่ Survivability +1 แกนเดียว ที่เหลือนิ่งสนิททั้งหมด แคบที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Divine Strike เป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ของ baseline = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Rhonas's Blessing (reaction, CD) ให้ +10 บน Strength-based roll ของ ally — support ที่ทรงพลังแต่จำกัดแค่ check ประเภท Strength = ใกล้เท่า baseline |
| **Survivability** | 8/10 (A) | Avatar of Battle (lv17) ให้ resistance BPS จากอาวุธไม่วิเศษ — mitigation แบบ passive ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Feat of Strength/Rhonas's Blessing ใช้ Channel Divinity เหมือนโครงสร้าง baseline ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | druid cantrip เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | เฉพาะทาง Strength-check ล้วนๆ ไม่ขยาย role อื่น = เท่า baseline |

### Tempest Domain (PHB 🕰️)

**Overall**: B — ขยับกลางๆ 4 axis (Damage/Control/Utility/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Wrath of the Storm (reaction, Wis mod ครั้ง/วัน) 2d8 lightning/thunder ใส่ผู้โจมตีทุกคนที่เข้าประชิด บวก Destructive Wrath (CD) รับประกันดาเมจ lightning/thunder สูงสุดโดยไม่ต้องทอย [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Thunderbolt Strike ผลักเป้า Large หรือเล็กกว่าไป 10ft เมื่อโดน lightning dmg — forced-movement เล็กน้อยที่ baseline ไม่มี [M:1/4] [R:3/3] [B:2/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Wrath of the Storm ยับยั้งศัตรูจากการเข้าประชิดทางอ้อม แต่ไม่ลดดาเมจที่รับโดยตรง = ใกล้เท่า baseline |
| **Action Economy** | 6/10 (B) | Destructive Wrath ใช้ Channel Divinity เหมือนโครงสร้าง baseline ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 7/10 (A) | Stormborn (lv17) ให้บินได้เท่าความเร็วเดินตลอดเวลานอกที่ร่ม/ใต้ดิน — mobility utility ถาวร [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/forced-movement/mobility รอบธีมพายุ [M:2/4] [R:3/3] [B:3/3] |

### Travel Domain (VSS 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Godspeed (lv17) เพิ่ม Divine Strike จาก 2d8 (baseline cap) เป็น 4d8 ถ้าโจมตีจากระยะห่างต้นเทิร์น 30ft+ — magnitude สูงกว่า baseline แบบมีเงื่อนไข [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Divine Transportation (CD) สลับตำแหน่ง willing creature 3 ตัวได้ — ช่วยดึง ally ออกจากอันตรายได้ = ใกล้เท่า baseline |
| **Survivability** | 8/10 (A) | Jaunt (bonus action, Wis mod ครั้ง/วัน) เคลื่อนที่ 10ft ไม่โดน OA เป็นเครื่องมือหนีตัวเองที่ baseline ไม่มี [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Jaunt ให้ระยะเคลื่อนที่พิเศษผ่าน bonus action หลายครั้ง/วัน [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Overland Expedition (เดินทางเร็วพิเศษ ไม่โดน difficult terrain/hazard ระนาบ เดินทัพได้ 12 ชม.ก่อนทอย Con) เป็น exploration utility ที่ตรงธีม domain มาก [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role skirmisher/mobility เพิ่มจาก caster ปกติ ผ่าน Jaunt+Godspeed [M:2/4] [R:3/3] [B:3/3] |

### Trickery Domain (XPHB)

**Overall**: S — Support เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน (Survivability/AE/Utility/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ (ภาพลวงตาเป็นเครื่องมือหลอก/หลบ ไม่ใช่ control โดยตรง) = เท่า baseline |
| **Support** | 9/10 (S) | Improved Duplicity (lv17) ให้ Shared Distraction (ally โจมตีเป้าใกล้ภาพลวงตาได้ Advantage) + Healing Illusion (ฮีลเมื่อภาพลวงตาหมดฤทธิ์) — ขยาย Invoke Duplicity จากเครื่องมือส่วนตัวเป็นเครื่องมือทีม [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Trickster's Transposition (teleport สลับที่กับภาพลวงตาได้ไกลถึง 120ft) เป็นเครื่องมือหนีตัวเองที่ดี [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | แคส spell "จากตำแหน่งภาพลวงตา" ได้โดยไม่เสีย action พิเศษ ทำให้โจมตีจากตำแหน่งปลอดภัยได้ฟรี [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | ภาพลวงตาใช้แทรกซึม/สอดแนม/หลอกล่อได้จริงนอกคอมแบต [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ผสม stealth/illusion/repositioning/combat advantage ในกลไกเดียว — hybrid rogue-caster ชัดเจน [M:2/4] [R:3/3] [B:3/3] |

### Twilight Domain (TCE 🕰️)

**Overall**: S — รูปแบบเดียวกับ Trickery Domain — Support เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Divine Strike เป็นแค่ตัวเลือกเดียวกับ Blessed Strikes ของ baseline = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Twilight Sanctuary (CD, sphere 30ft เคลื่อนตามตัว 1 นาที) ให้เลือก temp HP หรือถอด charmed/frightened แก่ทุกคนที่จบเทิร์นในวงทุกเทิร์น บวก Twilight Shroud (lv17, half cover ให้ทุกคนในวง) — ป้องกันทีมต่อเนื่องแบบไม่ต้องทำอะไรเพิ่มหลัง action แรก [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Twilight Sanctuary ให้ตัวเอง temp HP ได้ทุกเทิร์นเช่นกัน บวก Twilight Shroud ให้ half cover [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Steps of Night (bonus action, prof bonus ครั้ง/วัน) ให้บินได้ในที่มืด — mobility ที่ไม่เสีย action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Eyes of Night (darkvision 300ft แชร์ให้ทีมได้ 1 ชม.) เป็น exploration utility กว้างมาก [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ผสม support/utility/mobility ผ่าน Twilight Sanctuary ที่เลือกผลได้ทุกเทิร์น [M:2/4] [R:3/3] [B:3/3] |

### War Domain (XPHB)

**Overall**: S — Support เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน (Damage/Survivability/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | War Priest (bonus action ตีอาวุธเพิ่ม, Wis mod ครั้ง/วัน ฟื้นทุก short/long rest) เป็นดาเมจ-economy tool ที่แข็งแรงและใช้ได้บ่อย [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Guided Strike (CD) ให้ +10 บน attack roll ของตัวเองหรือ ally ในระยะ 30ft แบบ reaction — เปลี่ยน miss เป็น hit ได้แทบรับประกัน [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Avatar of Battle (lv17) ให้ resistance BPS ถาวร [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | War Priest ให้ตีอาวุธเพิ่มผ่าน bonus action หลายครั้ง/วัน ฟื้นเร็วทุก short rest [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/support/tank แบบ martial-caster hybrid ที่โฟกัสคอมแบตล้วน [M:2/4] [R:3/3] [B:3/3] |

### Wealth Domain (VSS 🕰️)

**Overall**: B — ขยับกลางๆ 3 axis (Control/Utility/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | Bribe (action, Cha save) ทำให้ศัตรูหยุดเป็นศัตรูนาน 24 ชม. — pacify tool ที่ baseline ไม่มี แต่ต้องเสียทองและใช้นอกคอมแบตเป็นหลัก [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรงใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ (Leverage ประหยัดทอง ไม่ใช่ action) = เท่า baseline |
| **Utility** | 8/10 (A) | Appraisal (ประเมินราคา+ใช้ Wis ต่อรอง) + Leverage (ลดต้นทุน material component ครึ่งหนึ่ง) + Tycoon (lv17, เงินที่ได้รับเพิ่มเป็น 2 เท่า) — utility เชิงเศรษฐกิจ/downtime ที่ครบวงจร [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role นักเจรจา/พ่อค้าที่ Cleric ปกติไม่มี ควบคู่กับ pacify tool [M:2/4] [R:3/3] [B:3/3] |

### Zeal Domain (PSA 🕰️)

**Overall**: A — Damage เป็น S ใหม่ บวก Control/AE/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Priest of Zeal (bonus action ตีอาวุธเพิ่ม, Wis mod ครั้ง/วัน) + Consuming Fervor (CD รับประกันดาเมจ fire/thunder สูงสุด) + Blaze of Glory (lv17, reaction ตอน 0 HP เดิน+ตี Advantage โดน 5d10 fire + 5d10 อาวุธ) — ดาเมจสะสมสูงที่สุดใน domain ที่ทำมา [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Resounding Strike ผลักเป้า Large หรือเล็กกว่าไป 10ft เมื่อโดน thunder dmg [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Blaze of Glory ไม่ได้ป้องกันการล้ม เป็นแค่ดาเมจส่งท้ายก่อนสลบ ไม่นับเพิ่ม survivability = เท่า baseline |
| **Action Economy** | 8/10 (A) | Priest of Zeal ให้ตีอาวุธเพิ่มผ่าน bonus action หลายครั้ง/วันทุกครั้งที่ใช้ Attack action [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/forced-movement/economy รอบธีมนักรบผู้คลั่งไคล้ [M:2/4] [R:3/3] [B:3/3] |
