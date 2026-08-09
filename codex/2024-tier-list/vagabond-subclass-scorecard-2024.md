# Vagabond — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 18 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Vagabond](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 18 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24Extras` — **หมายเหตุ**: Vagabond เป็น class ใหม่ที่เพิ่มเข้ามาในเวอร์ชัน 2024 ของ Valda's Spire (ไม่มีเวอร์ชัน 2014 ให้เทียบ)

---

## Class Baseline (Vagabond, 2024)

Floor 0-10 ต่อ axis ของ **Vagabond เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery, Extra Attack (lv5), Battle Tactics (lv1, Battle Dice 2d6→scale ขับ 3 maneuver ที่รู้), Secret (lv1, เลือก background flavor), Breather (lv2, action ฮีลตัวเองด้วย Hit Dice), **Desperate Attack (lv2, Advantage โจมตีตอน Bloodied)**, Overexertion (lv3), Mettle (lv7), Last Stand (lv9), Desperate Fury (lv11, +1d8 ดาเมจตอน Bloodied), Tenacity (lv13), Desperate Survival (lv15, Critical Hit ที่โดนตอน Bloodied กลายเป็น hit ธรรมดา), Deft Maneuver (lv17), **Wayworn (lv18, นับเป็น Bloodied ตลอดเวลา)**, Martial Recovery (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Extra Attack (lv5) บวก Desperate Attack (lv2, Advantage บนทุก attack roll ตอน Bloodied) และ Desperate Fury (lv11, +1d8 ดาเมจตอน Bloodied) เป็น buff คู่ที่แรงมากแต่ผูกเงื่อนไข "ต้องเลือดน้อยกว่าครึ่ง" จนกว่าจะถึง Wayworn (lv18) ที่ทำให้นับเป็น Bloodied ตลอดเวลา (buff ทั้งหมดกลายเป็น unconditional) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย (เนื้อหา maneuver เช่น Battle Edge/Rampage ไม่มีรายละเอียดในไฟล์ data ที่ตรวจสอบได้) [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — ทุกอย่างเป็น self-focused underdog archetype |
| **Survivability** | 7/10 (A) | HD d10 + armor ครบทุกชนิดรวม heavy+shield บวก Breather (lv2, action ฮีลตัวเองด้วย Hit Dice) + Mettle (lv7, Con-save ครึ่งดาเมจกลายเป็นศูนย์) + Last Stand (lv9, กันตาย+ฮีลก้อนใหญ่ 1 ครั้ง/long rest) + **Desperate Survival (lv15, Critical Hit ที่โดนตอน Bloodied กลายเป็น hit ธรรมดา)** — ออกแบบมาให้ "ยิ่งเลือดน้อยยิ่งรอด" ตรงข้ามกับ class ทั่วไป [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Deft Maneuver (lv17) ให้ Bonus Action พิเศษเพิ่มสำหรับใช้ maneuver โดยเฉพาะ และ Martial Recovery (lv20) คืน Battle Dice เต็มด้วย Bonus Action — Breather ต้องใช้ Action เต็มๆ ไม่ประหยัด และ feature ส่วนใหญ่ผูกกับระบบ Battle Dice เดียว [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | Secret (lv1) เป็นตัวเลือก background flavor ไม่มีผลเชิงกลไกที่ยืนยันได้ ไม่มี skill bonus หรือ ritual casting เลย [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Battle Dice ขับ 3 maneuver ที่เลือกได้ตามสถานการณ์ ฟื้นบ่อย (ทอย initiative + ทุก short/long rest) บวก Overexertion ให้ใช้ maneuver ต่อได้แม้ Battle Dice หมดแล้ว (แลกด้วย HP) แต่ยังคงเป็น archetype นักสู้ berserker-underdog เดียวตายตัว [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (18)

**Class Baseline อ้างอิง**: Damage 7, Control 3, Support 0, Survivability 7, Action Economy 5, Utility 3, Versatility 5

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) **หมายเหตุแหล่งที่มา**: Vagabond เป็น class ใหม่เฉพาะ 2024 ไม่มีเวอร์ชัน 2014 ให้เทียบ ดังนั้นไม่มี subclass ตัวไหนติดแท็ก 🕰️ เลย — แต่ 7 ตัว (Daggermark, Dragon Banner, Eagle Banner, Jolly Roger, Siegeball Jersey, Tower Banner, Yellow Sign) เป็น **"Cross-Compatible Subclass"** ที่มีต้นกำเนิดจริงจาก class **Captain** (ติดแท็ก 🔀) — เนื้อหา level 3 (flavor + proficiency/skill features) มักมีเวอร์ชันเขียนใหม่เฉพาะสำหรับ Vagabond (บางตัวมี "Cross-Compatibility Modifications" ปรับกลไกที่ผูกกับ Cohort ของ Captain ให้ใช้กับ "ally" ทั่วไปแทน เนื่องจาก Vagabond ไม่มี Cohort) ส่วน feature level 6/10/14 ใช้ข้อความชุดเดียวกับต้นฉบับ Captain ตรงๆ ถ้าไม่มีการ override ไว้เฉพาะ

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Adrenaline Junkie | D | ValdaSpire24Extras | 7 (A) | 3 (C) | 0 (D) | 8 (A) | 6 (B) | 3 (C) | 6 (B) |
| Brigand | C | ValdaSpire24Extras | 8 (A) | 6 (B) | 0 (D) | 8 (A) | 6 (B) | 3 (C) | 6 (B) |
| Daggermark | B | ValdaSpire24 🔀 | 8 (A) | 3 (C) | 4 (C) | 9 (S) | 7 (A) | 5 (B) | 5 (B) |
| Dragon Banner | C | ValdaSpire24 🔀 | 9 (S) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 3 (C) | 6 (B) |
| Eagle Banner | C | ValdaSpire24 🔀 | 8 (A) | 4 (C) | 3 (C) | 7 (A) | 6 (B) | 4 (C) | 6 (B) |
| Feylost | B | ValdaSpire24Extras 🔀 | 7 (A) | 8 (A) | 3 (C) | 9 (S) | 6 (B) | 4 (C) | 7 (A) |
| Gourmand | B | ValdaSpire24Extras 🔀 | 8 (A) | 3 (C) | 9 (S) | 8 (A) | 7 (A) | 4 (C) | 7 (A) |
| Houndmaster | C | ValdaSpire24Extras 🔀 | 8 (A) | 4 (C) | 0 (D) | 7 (A) | 7 (A) | 6 (B) | 5 (B) |
| Jolly Roger | B | ValdaSpire24 🔀 | 8 (A) | 6 (B) | 6 (B) | 8 (A) | 7 (A) | 4 (C) | 6 (B) |
| Knight Errant | B | ValdaSpire24Extras 🔀 | 8 (A) | 7 (A) | 6 (B) | 9 (S) | 6 (B) | 5 (B) | 6 (B) |
| Mage Brand | B | ValdaSpire24Extras | 8 (A) | 6 (B) | 1 (D) | 8 (A) | 6 (B) | 7 (A) | 8 (A) |
| Plague Doctor | B | ValdaSpire24Extras 🔀 | 8 (A) | 5 (B) | 7 (A) | 7 (A) | 6 (B) | 6 (B) | 6 (B) |
| Pugilist | C | ValdaSpire24Extras 🔀 | 8 (A) | 6 (B) | 0 (D) | 9 (S) | 6 (B) | 3 (C) | 6 (B) |
| Rōnin | C | ValdaSpire24Extras 🔀 | 9 (S) | 3 (C) | 0 (D) | 9 (S) | 8 (A) | 4 (C) | 5 (B) |
| Siegeball Jersey | B | ValdaSpire24Extras 🔀 | 7 (A) | 4 (C) | 7 (A) | 9 (S) | 6 (B) | 4 (C) | 7 (A) |
| Tower Banner | C | ValdaSpire24 🔀 | 8 (A) | 5 (B) | 4 (C) | 9 (S) | 6 (B) | 4 (C) | 5 (B) |
| Troubadour | B | ValdaSpire24Extras 🔀 | 8 (A) | 5 (B) | 7 (A) | 7 (A) | 6 (B) | 6 (B) | 6 (B) |
| Yellow Sign | B | ValdaSpire24Extras 🔀 | 8 (A) | 9 (S) | 4 (C) | 7 (A) | 6 (B) | 5 (B) | 6 (B) |

---

### Adrenaline Junkie (ValdaSpire24Extras)

**Overall**: D — (5 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Action Economy/Versatility) Support ยังเป็น 0 เต็ม ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Stim Potion's Hyper Focus ให้ Advantage ต่อ attack roll ถัดไปได้ทุกเทิร์นตราบใดที่ยังคงยา แต่ต้องแลกด้วย Necrotic dmg ตัวเองทุกเทิร์น (ไม่โดน resist/immune, ทะลุ temp HP) และซ้อนทับกับ Desperate Attack ของ baseline ที่ให้ Advantage ตอน Bloodied อยู่แล้ว = ใกล้เคียง baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย ทุกอย่างเป็น self-only ตามธีม underdog เดี่ยว |
| **Survivability** | 8/10 (A) | Stim Potion's Bullet Time (Disadvantage ต่อการโจมตีที่เข้าใส่ตัวเอง) + Daredevil (lv10, reaction รับ temp HP ตอนโดน miss ขณะ Bloodied) + Tuck and Roll (ไม่โดนดาเมจตกจากที่สูง ≤60ft) เป็นเลเยอร์ป้องกันเพิ่มแม้จะแลกด้วย HP self-damage จาก Stim [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Stim Potion's Rush ให้ Dash/Disengage ฟรีไม่เสีย action ทุกเทิร์นที่ยา active [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 3/10 (C) | Insane Stunt (Heroic Inspiration จาก risky Str/Dex/Con check ที่มี Disadvantage) เป็น utility แคบมาก ไม่พอยกระดับ tier = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | Stim Potion มี 3 โหมดเลือกได้ตามสถานการณ์ (offense/defense/mobility) ทุกเทิร์นที่ยา active แม้จะยังอยู่ในกรอบ berserker-underdog เดิม [M:2/4] [R:3/3] [B:1/3] |

### Brigand (ValdaSpire24Extras)

**Overall**: C — (6 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับขึ้น 5 ใน 7 axis กลางๆ (Damage/Control/Survivability/AE/Versatility) กว้างแต่ไม่มี axis ไหนถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cutthroat (lv14, exploding damage die สูงสุด 4 รอบทุกครั้งที่ทอยได้เลขสูงสุด) บวก Ambush maneuver (โจมตีฟรีทันทีตอนทอย Initiative) เป็น damage engine ที่ magnitude สูงและ trigger ได้บ่อย [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Take Hostage (lv6, จับ target ที่เลือดต่ำเป็นตัวประกัน — Grappled+Incapacitated, บังคับ attack ที่พลาดไปโดนตัวประกันแทน) บวก Underhanded Blow (lv10, ให้ target ที่โดนตี มี Disadvantage ต่อ attack จนถึงเทิร์นถัดไป) เป็น control สองชั้นที่ค่อนข้างแรง [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 8/10 (A) | Craven (reaction เคลื่อนที่ 5ft ไม่โดน AOO ตอนโดน melee miss) + Take Hostage ให้ Three-Quarters Cover ระหว่างจับตัวประกัน เป็นเลเยอร์หลบหลีก/บังตัวเพิ่มจาก baseline [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Ambush ใช้ battle die แลกโจมตีฟรีตอน Initiative ไม่เสีย action หลัก, Take Hostage/Underhanded Blow ใช้ bonus action หรือฟรีเป็นส่วนหนึ่งของการตี [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 3/10 (C) | Take Hostage ให้ Advantage เฉพาะ Intimidation check ต่อพวกของตัวประกัน เป็น utility แคบมาก = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | มีเครื่องมือครบทั้งโจมตี (Cutthroat), ควบคุม (Take Hostage/Underhanded Blow), และหนี (Craven) ในตัวเดียว [M:2/4] [R:3/3] [B:1/3] |

### Daggermark (ValdaSpire24 🔀)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability เป็น S บวก Support ขยับบางส่วน (0→4) และอีก 3 axis ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Preemptive Strike (lv14, reaction โจมตีก่อนที่ attack ที่เข้าใส่ตัวเองจะ resolve, refill ด้วย battle die) บวก Flanking Strike (lv6, ให้ ally คนต่อไปที่ตี target เดียวกันมี Advantage) เป็น tempo/damage engine ที่ต่อเนื่อง [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) | Flanking Strike ให้ Advantage แก่ ally คนถัดไปที่โจมตี target เดียวกัน เป็น support จริงที่ break 0-baseline ของ class [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Evasion (lv10, save ผ่าน=ไม่โดนดาเมจเลย, save พลาด=โดนครึ่ง) ซ้อนทับกับ Mettle ของ baseline (Con-save ครึ่ง→ศูนย์) ทำให้กัน AoE ได้แทบสมบูรณ์ บวก Effortless Dodge (bonus action Disengage/Dodge ด้วย battle die แม้จะใช้ไม่ได้ตอนใส่เกราะ Medium/Heavy) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Effortless Dodge + Quick Hide (Hide เป็น bonus action) ให้เครื่องมือประหยัด action หลากหลาย [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 5/10 (B) | Sleight of Hand + Stealth proficiency, Charismatic Initiative (bonus ต่อ Initiative), Quick Hide เป็น utility ชุดโจร ที่ยกระดับเหนือ baseline ชัดเจน [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | โฟกัสธีมโจร-นักแอบซ่อนชัดเจน ไม่มีจุดสลับ build แบบ binary เท่า baseline |

### Dragon Banner (ValdaSpire24 🔀)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S แต่ Support ยังเป็น 0 เต็ม breadth แคบ (แค่ 3 axis ขยับ)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Critical Focus (ช่วง crit ขยายไปถึง 16-20 หลังชนะ/critical ติดกัน 3 ครั้งในรอบเดียวกัน) บวก Rampage maneuver (โจมตีฟรี+เคลื่อนที่ทันทีหลัง reduce ศัตรูเหลือ 0 HP หรือ crit) และ Coup de Grâce (lv14, โจมตีประหารเพิ่มดาเมจก้อนใหญ่) รวมเป็น damage-nova engine ที่ snowball ได้แรงมาก [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Bloody Spectacle (lv10, AoE Frightened กว้าง 30ft หลัง kill/crit) เป็น control burst ที่มีเงื่อนไข trigger [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Rampage ให้โจมตี+เคลื่อนที่ฟรีไม่เสีย action ทุกครั้งที่ kill/crit บวก Coup de Grâce (bonus action) และ Martial Recovery (bonus action คืน battle dice, cross-compat ปรับเป็น 3 ลูกสำหรับ Vagabond) [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | แม้จะเป็น nova-executioner archetype เดี่ยว แต่มีทั้งโหมด AoE fear และโหมดโจมตีเดี่ยวสลับใช้ตามสถานการณ์ [M:2/4] [R:3/3] [B:1/3] |

### Eagle Banner (ValdaSpire24 🔀)

**Overall**: C — (6 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับขึ้น 5 axis กลางๆ พร้อมกัน (Damage/Control/Support/AE/Utility/Versatility) ไม่มี peak ถึง S แต่กว้าง


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hundred-Arrow Volley (lv14, แทนที่การโจมตี 1 ครั้งด้วย AoE ยิงกระสุนหลายลูกแยกทอยต่อเป้า) บวก Eagle Eye maneuver (เติม battle die ให้ attack roll ที่พลาด) เป็นชุด damage ที่ครอบคลุมทั้งเป้าเดี่ยวและ AoE [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | Counter-Shot maneuver (reaction ลดโอกาส ranged attack ที่จะโดน ally) เป็น soft-control แคบๆ [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 3/10 (C) | Counter-Shot ปกป้อง ally จาก ranged attack เป็น support ที่ break baseline แม้จะแคบ |
| **Survivability** | 7/10 (A) | Close-Quarters Shooting เอา Disadvantage ระยะประชิดออกเท่านั้น ไม่ได้เพิ่ม survivability ใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | Eagle Eye ไม่เสีย action เพิ่ม (ส่วนหนึ่งของการตี) และ Counter-Shot เป็น reaction [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 4/10 (C) | Vantage Point (Climb Speed เท่า Speed) เป็น traversal utility แคบๆ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ยังเป็นนักธนูเดี่ยวเป็นหลัก แต่ Hundred-Arrow Volley ให้เลือกโหมด AoE ได้ 2 แบบ (cone/cylinder) เพิ่มความยืดหยุ่น [M:2/4] [R:3/3] [B:1/3] |

### Feylost (ValdaSpire24Extras 🔀)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control กระโดด +5 (C→A) บวก Survivability เป็น S และขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Fey Mood "Spiteful" ให้ดาเมจ Force เพิ่มเล็กน้อยแบบมีเงื่อนไข ไม่พอยกระดับด้าน damage โดยรวม = ใกล้เคียง baseline |
| **Control** | 8/10 (A) | Frenzied Strike maneuver (บังคับเป้าหมายโจมตีสุ่มใส่ทุกฝ่ายรวมพวกเดียวกันเอง + ต้อง Opportunity Attack) เป็น control ที่แรงมาก บวก Irresistible Mood (lv10, Charm/Frighten reaction ตอนกลายเป็น Bloodied) และ Fey Mood "Arrogant" (ศัตรูรอบข้างมี Disadvantage ต่อเป้าอื่นที่ไม่ใช่ตัวเอง) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | Fey Mood "Forlorn" (redirect attack จาก ally มาที่ตัวเอง) เป็น support ปกป้องเพียงหนึ่งใน 8 mood แบบสุ่ม ไม่ reliable |
| **Survivability** | 9/10 (S) | Fey Mood table มีถึง 4-5 mood ที่เสริม survivability (Elated=temp HP ทุกเทิร์น, Fearful=AOO Disadvantage ใส่ตัวเอง, Paranoid=Adv Dex save, Serene=Adv Int/Wis/Cha save) บวก Misty Pathways (lv6, Misty Step ฟรี 1/rest, refill ด้วย battle die) เป็น escape tool [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Misty Step ฟรีไม่เสีย action หลัก (bonus action ของ spell เอง) และ Mercurial (lv14, bonus action เลือก mood เองได้) [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 4/10 (C) | Mood table บาง mood ไม่ใช่ combat (เช่น Manic=nat 20 บน d20 test ใดๆ) แต่โดยรวมยังเน้น combat มากกว่า out-of-combat utility จริงจัง [M:1/4] [R:1/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Fey Mood table ครอบคลุม 8 effect ที่ต่างกันมาก (control/support/survival/damage) แม้จะสุ่มจนถึง lv14 ที่เลือกเองได้ ถือเป็นความกว้างของ toolkit ที่สูงมาก [M:3/4] [R:2/3] [B:2/3] |

### Gourmand (ValdaSpire24Extras 🔀)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 (D) เป็น 9 (S เต็มสเกล) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในกลุ่ม บวกขยับตามอีก 4 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Carve maneuver (lv6, เพิ่ม battle dice 2 ลูกใส่ดาเมจการตี + ปลดล็อกบัฟ Monster Meal ถ้าตรง creature type) เป็น damage add ที่มาพร้อม utility เสริม [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Monster Meal ให้ temp HP + บัฟติดตัว (AC+2, speed+10, resistance, adv save ฯลฯ) แก่พรรคพวกได้สูงสุด 3 ประเภทซ้อนกันต่อมื้อ ก่อนออกเดินทาง 1 วันเต็ม บวก Gourmet Ingredients (lv14) เพิ่มตัวเลือก Heroic Inspiration / +2 ability score / free casting คาถา lv5 ฟรี ให้แต่ละคนที่กินมื้ออาหาร — เป็นชุด support ที่ magnitude สูงที่สุดใน class นี้ [M:4/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Quick Snack (lv10, ใช้ Breather ได้โดยไม่เสีย action, 1/rest หรือ refill ด้วย battle die) เพิ่มความถี่ในการเข้าถึงฮีลตัวเองของ baseline [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Quick Snack ตัดการเสีย action เต็มของ Breather ออกไปเลย เป็นการประหยัด action ที่ทรงพลังมาก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Cook's Utensils proficiency + Gentle Repose แบบ ritual เป็น utility เฉพาะทางแคบๆ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Monster Meal table ครอบคลุม 10 creature type ที่ให้บัฟต่างกัน บวกตัวเลือก lv14 อีก 3 แบบ = breadth สูงมาก แม้จะต้องพึ่งวัตถุดิบจากศัตรูที่ล่ามา [M:2/4] [R:2/3] [B:3/3] |

### Houndmaster (ValdaSpire24Extras 🔀)

**Overall**: C — (7 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 3 axis เล็กน้อย (Damage/Control/AE/Utility) Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Faithful Hound เป็นนักสู้เพิ่มที่โจมตีเองได้ทุกเทิร์นผ่าน Sick 'Em! maneuver (bonus action สั่งกัด+เคลื่อนที่ ไม่โดน AOO) บวก Desperate Companion (หมามี Advantage ตอนตัวเอง Bloodied) และ Old Dog New Tricks (lv14, หมาได้ maneuver ของตัวเอง 2 อัน) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | Old Dog New Tricks (lv14) ให้หมาเรียนรู้ maneuver 2 อันที่ไม่มี prerequisite ซึ่งอาจเลือกสาย control ได้ แต่ไม่ fixed = การันตีไม่แรงเท่าตัวเลือกอื่น [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ทุก feature เน้นตัวเอง+หมาเท่านั้น ไม่มี benefit ให้ ally อื่นเลย |
| **Survivability** | 7/10 (A) | Loyal Redirection (สลับเป้า attack ระหว่างตัวเอง/หมาได้) เป็นเครื่องมือ 2 ทาง ไม่ได้เพิ่ม survivability ของตัวเองแบบ net-positive ชัดเจน = เท่า baseline |
| **Action Economy** | 7/10 (A) | สั่งหมาโจมตี/ทำ maneuver ได้ด้วย bonus action ทุกเทิร์น = เท่ากับได้นักสู้เพิ่มอีกตัวโดยไม่เสีย action หลัก (เทียบเคียง precedent ของ Beast Master ที่ Ranger) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Hound's Instincts (lv6, Blindsight 30ft + ตรวจจับการปลอมตัว/สิง/แปลงร่าง) เป็นเครื่องมือ detection ที่มีประโยชน์นอกคอมแบตจริง [M:2/4] [R:3/3] [B:1/3] |
| **Versatility** | 5/10 (B) | โฟกัส pet-fighter เดี่ยวชัดเจน แม้ lv14 จะเลือก maneuver ให้หมาได้ 2 อัน = เท่า baseline |

### Jolly Roger (ValdaSpire24 🔀)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support ขยับ +6 (0→6, B) บวกขยับขึ้นอีก 5 axis กลางๆ กว้างแต่ไม่มี S ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Skirmish maneuver (bonus action โจมตีเพิ่มอีกครั้ง ผสม melee+ranged ได้) เป็น damage add ที่ทำได้ทุกเทิร์น [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Dirty Tactics (lv10, ทางเลือก Pocket Sand=Disadvantage หรือ Trip=Prone ต่อเป้า) บวก Fancy Footwork (lv6, บังคับย้ายที่เป้าที่โดนตี) เป็น control สองชั้น [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | Dirty Tactics ทางเลือก Flank (ให้ ally มี Advantage ต่อการโจมตีถัดไปใส่เป้าเดียวกัน — cross-compat ปรับให้ใช้กับ ally ทั่วไปแทน Cohort) บวก All Hands on Deck (lv14, bonus action ให้ Advantage แก่ ally หลายคนพร้อมกัน, Cha mod ครั้ง/long rest) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 8/10 (A) | Fancy Footwork ให้เคลื่อนที่ฟรี 5ft ทุกครั้งที่ตีโดน (ช่วยจัดตำแหน่งหนี AoE/reposition) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Skirmish (bonus action) + All Hands on Deck (bonus action บัฟทีมพร้อมกัน) เป็นเครื่องมือประหยัด action ที่มีประโยชน์สูง [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | Scallywag (Swim Speed เท่า Speed) เป็น terrain utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Dirty Tactics ให้เลือกได้ 3 โหมดทุกครั้งที่ตีโดน (offense/support/control) เป็น breadth ที่ดี [M:2/4] [R:3/3] [B:1/3] |

### Knight Errant (ValdaSpire24Extras 🔀)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability เป็น S บวก Support ขยับ +6 (0→6, B) และขยับขึ้นครบเกือบทุก axis (6 ใน 7) กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Knight's Challenge maneuver (เวอร์ชัน sustain 1 นาที เพิ่ม battle die ใส่ดาเมจการตีครั้งแรก + คงเอฟเฟกต์ persistent) เป็น damage engine ต่อเนื่องเมื่อล็อกเป้าเดียว [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Knight's Challenge เวอร์ชัน sustain ให้เป้าหมายมี Disadvantage ต่อการโจมตีใส่คนอื่นตราบใดที่อยู่ใกล้ — lockdown ตัวประกันที่ทรงพลัง [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | Inspiring Battlecry (lv6, แจก Heroic Inspiration ให้ตัวเอง+ally ในระยะ 30ft ตอนกลายเป็น Bloodied, 1/long rest) บวก Redirection (lv10, reaction ปกป้อง ally จาก attack + Resistance ต่อดาเมจ physical) เป็นชุด support ที่ชัดเจน [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Surge of Valor (lv14, Unbreakable=ลดดาเมจด้วย battle die ทุกครั้งที่โดนตี) บวก Chivalrous Oath (temp HP=level ตอน Initiative + Adv save ต่อ Charmed/Frightened) เป็นเลเยอร์ป้องกันซ้อนหลายชั้น [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Inspiring Battlecry ไม่เสีย action, Surge of Valor เป็น bonus action ที่ให้ผลต่อเนื่องหลายเทิร์น [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 5/10 (B) | Chivalrous Oath ให้เลือก skill proficiency 2 จาก 4 (Animal Handling/History/Insight/Persuasion) เป็น utility เสริมที่ยกระดับเหนือ baseline [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Surge of Valor มี 2 โหมด (ลดดาเมจ/reroll test ที่พลาด) ให้เลือกใช้ตามสถานการณ์ [M:2/4] [R:3/3] [B:1/3] |

### Mage Brand (ValdaSpire24Extras)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility กระโดด +4 (C→A) และ Versatility +3 (B→A) บวกขยับตามอีก 4 axis กว้างมากแม้ Support จะยังแทบเป็น 0 อยู่ (1/10)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Spellbrand Spellcasting เปิดทางเข้าถึง spell list เต็มของ Sorcerer ผ่านการแปลง battle dice เป็น spell slot บวก cantrip attack (Fire Bolt) และ Arcane Strike (lv6, แทนที่การโจมตีด้วยคาถา cantrip ไม่เสีย action เพิ่ม) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | เข้าถึงคาถา control จาก Sorcerer spell list ได้ (เช่น Command, Sleep) ผ่านระบบ prepared spell ที่ขยายตามเลเวล แม้จะจำกัดด้วยจำนวน battle dice ที่มี [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 1/10 (D) | Sorcerer spell list มีคาถาเสริมทีม/ฮีลน้อยมาก (ส่วนใหญ่ self-buff) จึงแทบไม่มี support ให้ทีมจริงจัง = ใกล้เคียง baseline |
| **Survivability** | 8/10 (A) | Desperate Ward (lv10, Adv ต่อ saving throw ต่อคาถา/เอฟเฟกต์เวทมนตร์ตอน Bloodied) บวกโอกาสเตรียมคาถาป้องกัน (Shield, Mirror Image) จาก spell list [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Arcane Strike แทนที่การโจมตีด้วย cantrip ไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 7/10 (A) | เข้าถึงคาถา utility เต็มจาก Sorcerer list (Detect Magic, Alarm, Comprehend Languages ฯลฯ) บวก Arcane Synesthesia (ตรวจจับผู้ร่ายคาถาล่าสุด/item วิเศษ) [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | เป็น archetype เดียวของ Vagabond ที่มี full spellcasting hybrid บน chassis นักสู้ — สลับ prepared spell ได้ทุกเลเวลอัพ + Imprinted Spellscar (lv14, ขโมย/imprint คาถาที่โดนใส่มาใช้เองได้) ยกระดับความยืดหยุ่นสูงสุดใน class [M:3/4] [R:2/3] [B:3/3] |

### Plague Doctor (ValdaSpire24Extras 🔀)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 เป็น 7 (A) บวกขยับตามอีก 4 axis กว้างพอสมควรแต่ไม่มี axis ไหนถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Imbalance Humors ทางเลือก "Sanguine" (ดาเมจ Necrotic เพิ่มตอนโดนตีครั้งถัดไป) บวก Bloodletting (lv14, Wounding Strike maneuver ให้บาดแผลเลือดไหลสะสม) เป็น damage add ที่มาพร้อมระบบ debuff [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Imbalance Humors "Melancholic" (Disadvantage ต่อ test ถัดไป) และ "Phlegmatic" (เป้าทำ AOO ไม่ได้) เป็น debuff เมนูที่เลือกได้ [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Remedy maneuver (bonus action ฮีล ally 2 ทอย battle die + Con mod พร้อมแก้ 1 condition จาก 4 แบบ) เป็นฮีลที่ reliable ที่สุดใน class บวก Analgesic Remedy (lv10, เพิ่ม temp HP=level ให้ด้วย) [M:3/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง (Diagnosis เป็น utility ไม่ใช่ survivability) = เท่า baseline |
| **Action Economy** | 6/10 (B) | Remedy เป็น bonus action, Imbalance Humors ไม่เสีย action เพิ่ม (ส่วนหนึ่งของการตี) refill ได้ด้วย battle die [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 6/10 (B) | Physician (Medicine expertise + Diagnosis ใช้ Search action ตรวจ Poisoned/Bloodied/magical contagion) เป็น utility นอกคอมแบตที่มีประโยชน์จริง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | มีครบทั้งดาเมจ (Sanguine/Bloodletting), control (Melancholic/Phlegmatic), และ support (Remedy) ในตัวเดียว [M:2/4] [R:2/3] [B:2/3] |

### Pugilist (ValdaSpire24Extras 🔀)

**Overall**: C — (7 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability เป็น S บวก Control/Damage/Action Economy ขยับตาม แต่ Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hand-to-Hand (unarmed die ไต่ระดับ d6→d12 + Brute Force เพิ่มดาเมจครั้งแรกที่ตีโดนทุกเทิร์น) บวก Knockout maneuver (lv14, 3 battle dice ใส่ดาเมจก้อนใหญ่ + โอกาส KO) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Intimidating Blow (lv6, Horrific Strike AoE Frightened 10ft) บวก Knockout (lv14, Unconscious condition ถ้า HP เป้าต่ำพอ) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 9/10 (S) | Unarmored Defense (AC=10+Dex+Con มักสูงกว่าเกราะทั่วไป และยังถือ Shield ได้) + Shrug Off (reaction ลดดาเมจด้วย battle die) + Desperate Endurance (lv10, แปลง saving throw ที่พลาดเป็นสำเร็จตอน Bloodied 1/long rest) เป็นเลเยอร์ป้องกันซ้อนสามชั้น [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Brute Force เป็น passive ไม่เสีย action, Shrug Off เป็น reaction [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | มีตัวเลือกดาเมจ Force (บายพาส resistance ทั่วไป) + AoE fear + KO mechanic ให้ปรับใช้ตามสถานการณ์ [M:2/4] [R:3/3] [B:1/3] |

### Rōnin (ValdaSpire24Extras 🔀)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Survivability เป็น S ทั้งคู่ บวก Action Economy ขยับ +3 แต่ Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Swordmaster (lv14, โจมตีซ้ำฟรีทุกครั้งที่พลาด ไม่จำกัดจำนวนครั้ง/เทิร์น) ยกระดับ DPR floor ขึ้นอย่างมหาศาล บวก Grudge (battle die เฉพาะสำหรับ maneuver ใส่เป้าที่ตั้งเป้าไว้) และ Killing Stroke (lv10, reaction โจมตีก่อน melee attack ที่เข้าใส่ตัวเอง) [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย ธีมนักดาบเดี่ยว solo-duelist ล้วน |
| **Survivability** | 9/10 (S) | Lone Wolf (Stand Alone: ไม่มีใครได้ Advantage ต่อการโจมตีใส่ตัวเองตราบใดที่ไม่มี ally อยู่ใกล้ — ป้องกันการโดนรุมได้อย่างมีประสิทธิภาพสูง) บวก Killing Stroke (reaction โจมตีสวนก่อน melee attack resolve, refill ด้วย battle die) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Swordmaster ให้โจมตีซ้ำฟรีไม่เสีย action ทุกครั้งที่พลาด (ครั้งเดียว/เทิร์น) บวก Killing Stroke (reaction) และ Grudge (bonus action) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Infamy (Expertise Deception/Intimidation 1 อย่าง) เป็น social utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | โฟกัส solo-duelist archetype ชัดเจนตัวเดียวตายตัว = เท่า baseline |

### Siegeball Jersey (ValdaSpire24Extras 🔀)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability เป็น S บวก Support กระโดดจาก 0 เป็น 7 (A) และขยับตามอีก 3 axis รวมกันแล้วกว้างและแรงพร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Defensive Tackle (Game Plan ทางเลือกหนึ่ง สั่ง ally Grapple/Shove) เป็น control-ผ่าน-ally มากกว่า damage โดยตรง = ใกล้เคียง baseline |
| **Control** | 4/10 (C) | Defensive Tackle (สั่ง ally Grapple/Shove เป้าหมาย) เป็น soft-control ที่ต้องพึ่ง ally ร่วมมือ [M:1/4] [R:1/3] [B:2/3] |
| **Support** | 7/10 (A) | Team Inspiration maneuver (แจก battle die ให้ ally แปลงการทดสอบที่พลาดเป็นสำเร็จ คล้าย Bardic Inspiration) บวก Game Plan (lv6, สั่ง ally ทำ Reaction เลือกได้ 3 แบบ: Grapple/Shove, เคลื่อนที่ 2 เท่า, หรือ Hide+Advantage) เป็นชุด support ที่หลากหลายและ reliable [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Athletic Constitution (lv10, แปลง Str/Dex save ที่พลาดเป็น Con save ที่มี Advantage แทน) บวก Game-Winning Play (lv14, reaction ตอนเหลือ 0 HP — เลื่อน Unconscious ออกไป เคลื่อนที่ 2 เท่า+action+bonus action ได้อีกเทิร์น) เป็นเลเยอร์ป้องกัน/หนีตายที่ทรงพลังมาก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Team Inspiration เป็น bonus action, Game Plan ใช้แทนที่การโจมตี 1 ครั้ง (cross-compat เฉพาะ Vagabond) [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 4/10 (C) | Sports Fanatic (Athletics proficiency + bonus, Adv ต่อ check เกี่ยวกับกีฬา) เป็น utility เฉพาะทางแคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Game Plan ให้เลือกได้ 3 โหมดต่างกันทุกครั้งที่ใช้ บวก Team Inspiration และ Athletic Constitution เป็น toolkit ที่กว้างมาก [M:2/4] [R:2/3] [B:3/3] |

### Tower Banner (ValdaSpire24 🔀)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability เป็น S บวก Support ขยับบางส่วน (0→4) และอีก 3 axis ขยับตามเล็กน้อย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Iron Retribution (lv14, ทุกครั้งที่ศัตรูใกล้ตัวพลาดการโจมตี ตอบโต้ด้วย Shield ทันที 3d6 Bludgeoning ไม่เสีย action) เป็น damage engine passive ที่ trigger บ่อย [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Siege Defense ให้สลับ weapon mastery property เป็น Push หรือ Slow ได้ตอนตี Melee weapon [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 4/10 (C) | Armored Redirection (lv6, reaction รับ attack ที่มุ่งใส่ ally แทน) เป็น support-tank tool [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Adv ต่อ Constitution saving throw (cross-compat แทนที่ Mettle ซ้ำซ้อนกับ baseline) ซ้อนทับกับ Mettle ของ baseline ที่ลดดาเมจครึ่ง→ศูนย์อยู่แล้ว บวก Iron Wall maneuver (bonus action เติม battle die ใส่ AC ต่อการโจมตีครั้งถัดไป, ต้องใส่เกราะ Heavy) และ Armored Redirection [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Iron Wall เป็น bonus action, Armored Redirection เป็น reaction (refill ด้วย battle die), Iron Retribution ไม่เสีย action เลย [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 4/10 (C) | Shooting from Cover (+2 ranged attack ตอนอยู่ Cover) เป็น utility แคบเฉพาะสถานการณ์ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | โฟกัส tank/defender archetype เดี่ยวตายตัวชัดเจน = เท่า baseline |

### Troubadour (ValdaSpire24Extras 🔀)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 เป็น 7 (A) บวกขยับตามอีก 4 axis กว้างแต่ไม่มี S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Scathing Retort (lv10, reaction ดาเมจ Psychic 1d10+ครึ่งเลเวล ทุกครั้งที่ศัตรูพลาดตีตัวเองหรือตัวเอง save ผ่าน) เป็น damage passive ที่ trigger บ่อยมาก [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Fast Friends (lv6, Influence action ทำให้เป้าหมาย Charmed เป็นมิตร) เป็น social-control ที่มีประโยชน์แม้จะสถานการณ์เฉพาะ [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Inspiring Tune maneuver (แจก battle die ให้ ally แปลงการทดสอบที่พลาดเป็นสำเร็จ) ขยายเป็นหลายเป้าหมายพร้อมกันที่ lv14 (Marvelous Troupe, จำนวนเท่า Cha mod) เป็น support ที่ scale ดีและ uptime สูง (ระยะ 60ft) [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ (Scathing Retort เป็นฝั่งรุกไม่ใช่รับ) = เท่า baseline |
| **Action Economy** | 6/10 (B) | Inspiring Tune เป็น bonus action, Scathing Retort เป็น reaction ไม่เสีย action หลัก [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 6/10 (B) | Performance Expertise + Musical Instrument proficiency 2 ชิ้น + Pantomime (สื่อสารข้ามภาษาพื้นฐานได้) เป็น utility นอกคอมแบตที่มีประโยชน์จริง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | มีครบทั้ง damage (Scathing Retort), control (Fast Friends), และ support (Inspiring Tune) ในตัวเดียวแบบธีม bard-lite [M:2/4] [R:2/3] [B:2/3] |

### Yellow Sign (ValdaSpire24Extras 🔀)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control กระโดด +6 (3→9, C→S) บวก Support ขยับบางส่วน (0→4) และขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Nightmarish Glow (lv14, ตัวเอง+ally ในระยะ Pallid Aura ได้ดาเมจ Psychic เพิ่ม 1d6 ทุกครั้งที่ตีโดนด้วยอาวุธ/Unarmed Strike) เป็น party-wide damage buff ที่กว้างมาก [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 9/10 (S) | Frenzied Strike maneuver (บังคับเป้าหมายโจมตีสุ่มใส่ทุกฝ่ายรวมพวกเดียวกันเอง + ต้อง Opportunity Attack) เป็น control ที่แรงที่สุดใน class บวก Pallid Aura (lv6, ลบ d6 จาก d20 test ของศัตรูในระยะ AoE ทุกเทิร์น) [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 4/10 (C) | Frenzied Ally (สิ่งมีชีวิตที่ Frenzied มองตัวเอง+ally เป็นมิตร) บวก Nightmarish Glow ที่บัฟดาเมจให้ ally ด้วยเช่นกัน [M:2/4] [R:2/3] [B:0/3] |
| **Survivability** | 7/10 (A) | Enthralled (Adv save ต่อ Charmed/Frightened) เป็น addition เล็กน้อยเท่านั้น = เท่า baseline |
| **Action Economy** | 6/10 (B) | Frenzied Strike ไม่เสีย action เพิ่ม (bonus action ส่วนหนึ่งของการตี), Pallid Aura เป็น bonus action เปิดแล้ว passive ทำงานเองทุกเทิร์น [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 5/10 (B) | Outer Knowledge (ได้ Expertise skill ที่ GM เลือกให้ฟรีทุก long rest, เปลี่ยนได้เรื่อยๆ) เป็น utility ที่ยืดหยุ่นแต่ GM-controlled [M:2/4] [R:1/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ชุด control (Frenzied Strike/Pallid Aura) + damage buff (Nightmarish Glow) + minor support (Frenzied Ally) ครอบคลุมหลายแกนแม้ธีมจะแคบ (frenzy/aura) [M:2/4] [R:2/3] [B:2/3] |
