# Gunslinger — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 34 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Gunslinger](00-scorecard-progress.md)) — มาก subclass ที่สุดในบรรดา class ทั้งหมดในโปรเจกต์
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 34 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Gunslinger.json` — source `ValdaGunslinger` (หนังสือ Gunslinger แยกเล่มของ Mage Hand Press ต่างจากไฟล์ Valda's Spire หลัก)

---

## Class Baseline (Gunslinger, 2024)

Floor 0-10 ต่อ axis ของ **Gunslinger เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Dex + Cha, armor proficiency light เท่านั้น, weapon proficiency simple + ranged martial ทุกชนิด, Weapon Mastery, Fighting Style, Extra Attack (lv5), Quick Draw (lv1, Advantage initiative + double draw/stow), **Critical Shot (lv2, crit ranged weapon ที่ 19-20 → 18-20 lv9 → 17-20 lv17)**, Risk (lv2, Risk Dice d8×4→scale ขับ maneuver ฟื้นทุก short **และ** long rest), Gut Shot (lv5), Evasion (lv7), Overkill (lv11), Cheat Death (lv13, ฟื้น 1/short rest), Dire Gambit (lv15), Deft Maneuver (lv18), Headshot (lv20, instakill <100HP หรือ +10d10)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Critical Shot ขยายช่วง crit ของอาวุธ ranged จาก 19-20 (lv2) เป็น 17-20 (lv17) — **crit ได้ 20% ของการโจมตีทุกครั้ง** ซึ่งไปทวีคูณกับ Gut Shot (debuff เมื่อ crit), Overkill (lv11, บวก ability mod เข้าดาเมจอาวุธปืนเสมอ+extra 1d8), และ Headshot (lv20, crit = **ตายทันที**ถ้า HP<100 หรือ +10d10 ดาเมจ) บวก Extra Attack (lv5) เป็นฐาน — magnitude สูงที่สุดในบรรดา class ที่ทำมาแล้วเพราะกลไก crit ซ้อนทับกันหลายชั้น [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Gut Shot (lv5, trigger เมื่อ crit ranged ใส่เป้า Large หรือเล็กกว่า) ให้เป้าลด Speed ครึ่งหนึ่ง + Disadvantage โจมตี 1 นาที เป็น soft-CC ที่ผูกกับการ crit (ซึ่งเกิดถี่ขึ้นเรื่อยๆ ตามเลเวลจาก Critical Shot) [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 5/10 (B) | HD d8 + armor proficiency แค่ light เป็นฐานอ่อน แต่ Cheat Death (lv13) ให้ตกลง 1 HP แทน 0 พร้อมฮีลเท่า level **ฟื้นได้ทุก Short Rest** (ดีกว่า "กันตาย" ของ class ส่วนใหญ่ที่ฟื้นแค่ Long Rest) บวก Evasion (lv7) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Quick Draw (lv1) ให้ Advantage บน initiative roll (ลงมือก่อนบ่อยกว่า = ได้เปรียบ economy ทั้งไฟต์) บวก Deft Maneuver (lv18) ให้ Bonus Action พิเศษสำหรับใช้ maneuver โดยเฉพาะ และ Risk Dice ฟื้นทั้ง short และ long rest ทำให้ใช้ maneuver ได้บ่อย [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Quick Draw's double draw/stow เป็น combat utility แคบๆ ไม่มี skill bonus, ritual, หรือ exploration tool อื่นติด chassis [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Risk Dice ขับ maneuver ที่เลือกได้ตามสถานการณ์ (โครงสร้างเดียวกับ Battle Dice ของ Captain/Vagabond) ฟื้นบ่อยมาก (ทุก short+long rest) แต่ยังคงเป็น archetype นักแม่นปืน crit-focused เดียวตายตัว [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (34)

**Class Baseline อ้างอิง**: Damage 9, Control 5, Support 0, Survivability 5, Action Economy 6, Utility 3, Versatility 5

**โครงสร้างที่มาข้อมูล** (ใหญ่ที่สุดในโปรเจกต์ แบ่งเป็น 4 กลุ่ม):
- **กลุ่ม A — Native จากหนังสือ Gunslinger แยกเล่ม** (`ValdaGunslinger`, 2024-compatible, 6 ตัว): Deadeye, High Roller, Secret Agent, Spellslinger, Trick Shot, White Hat
- **กลุ่ม B — Native ใน Valda's Spire 2024 หลัก** (`ValdaSpire24`/`Extras`, 6 ตัว): Big Game Hunter, Grenadier, Gun Tank, Gun-Ko Master, Musketeer, Pistolero
- **กลุ่ม C — Cross-Compatible Subclass** (ยืมมาจาก class อื่นตามกลไก "Cross-Compatible Subclass" เดียวกับที่ใช้ใน Captain, 16 ตัว): 10 ตัวยืมจาก **Vagabond** (Adrenaline Junkie, Brigand, Feylost, Gourmand, Houndmaster, Knight Errant, Plague Doctor, Pugilist, Rōnin, Troubadour) และ 6 ตัวยืมจาก **Captain** (Daggermark, Dragon Banner, Eagle Banner, Jolly Roger, Siegeball Jersey, Yellow Sign — feature text เดียวกับที่ให้คะแนนไว้แล้วใน [captain-subclass-scorecard-2024.md](captain-subclass-scorecard-2024.md) แต่คะแนนที่นี่**ต่างจากของ Captain**เพราะเทียบกับ Gunslinger baseline คนละชุด)
- **กลุ่ม D — 2014-only orphan** (🕰️ ไม่มี reprint 2024, native Gunslinger, 6 ตัว): Covert Operative, Gundead, Janissary, Sharpshooter, Storm Gunner, Twice-Damned

ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น)

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Adrenaline Junkie | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 3 (C) | 5 (B) |
| Big Game Hunter | ValdaSpire24Extras | 10 (S) | 5 (B) | 0 (D) | 5 (B) | 8 (A) | 5 (B) | 7 (A) |
| Brigand | ValdaSpire24Extras (ยืมจาก Vagabond) | 10 (S) | 8 (A) | 0 (D) | 7 (A) | 8 (A) | 3 (C) | 7 (A) |
| Covert Operative | ValdaSpireExtras 🕰️ | 9 (S) | 5 (B) | 0 (D) | 6 (B) | 8 (A) | 6 (B) | 6 (B) |
| Daggermark | ValdaSpire24 (ยืมจาก Captain) | 9 (S) | 5 (B) | 6 (B) | 7 (A) | 8 (A) | 5 (B) | 6 (B) |
| Deadeye | ValdaGunslinger | 10 (S) | 5 (B) | 0 (D) | 7 (A) | 7 (A) | 5 (B) | 6 (B) |
| Dragon Banner | ValdaSpire24 (ยืมจาก Captain) | 10 (S) | 7 (A) | 0 (D) | 5 (B) | 9 (S) | 3 (C) | 5 (B) |
| Eagle Banner | ValdaSpire24 (ยืมจาก Captain) | 10 (S) | 5 (B) | 6 (B) | 7 (A) | 6 (B) | 4 (C) | 7 (A) |
| Feylost | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 8 (A) | 3 (C) | 8 (A) | 7 (A) | 3 (C) | 7 (A) |
| Gourmand | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 5 (B) | 9 (S) | 7 (A) | 7 (A) | 4 (C) | 8 (A) |
| Grenadier | ValdaSpire24Extras | 10 (S) | 7 (A) | 5 (B) | 5 (B) | 7 (A) | 4 (C) | 7 (A) |
| Gun Tank | ValdaSpire24 | 10 (S) | 5 (B) | 0 (D) | 9 (S) | 6 (B) | 3 (C) | 7 (A) |
| Gun-Ko Master | ValdaSpire24 | 10 (S) | 7 (A) | 0 (D) | 7 (A) | 9 (S) | 5 (B) | 8 (A) |
| Gundead | ValdaSpireExtras 🕰️ | 9 (S) | 5 (B) | 0 (D) | 5 (B) | 8 (A) | 5 (B) | 7 (A) |
| High Roller | ValdaGunslinger | 9 (S) | 5 (B) | 0 (D) | 5 (B) | 8 (A) | 4 (C) | 5 (B) |
| Houndmaster | ValdaSpire24Extras (ยืมจาก Vagabond) | 10 (S) | 5 (B) | 0 (D) | 6 (B) | 9 (S) | 5 (B) | 7 (A) |
| Janissary | ValdaSpireExtras 🕰️ | 9 (S) | 5 (B) | 0 (D) | 6 (B) | 6 (B) | 5 (B) | 6 (B) |
| Jolly Roger | ValdaSpire24 (ยืมจาก Captain) | 10 (S) | 7 (A) | 9 (S) | 5 (B) | 8 (A) | 4 (C) | 8 (A) |
| Knight Errant | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 7 (A) | 8 (A) | 8 (A) | 7 (A) | 4 (C) | 8 (A) |
| Musketeer | ValdaSpire24 | 10 (S) | 5 (B) | 8 (A) | 6 (B) | 8 (A) | 3 (C) | 8 (A) |
| Pistolero | ValdaSpire24 | 10 (S) | 6 (B) | 0 (D) | 5 (B) | 9 (S) | 3 (C) | 5 (B) |
| Plague Doctor | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 7 (A) | 8 (A) | 5 (B) | 7 (A) | 5 (B) | 7 (A) |
| Pugilist | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 7 (A) | 0 (D) | 8 (A) | 7 (A) | 3 (C) | 7 (A) |
| Rōnin | ValdaSpire24Extras (ยืมจาก Vagabond) | 10 (S) | 5 (B) | 0 (D) | 8 (A) | 8 (A) | 4 (C) | 5 (B) |
| Secret Agent | ValdaGunslinger | 10 (S) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 7 (A) | 7 (A) |
| Sharpshooter | VSS 🕰️ | 10 (S) | 5 (B) | 0 (D) | 6 (B) | 6 (B) | 6 (B) | 6 (B) |
| Siegeball Jersey | ValdaSpire24Extras (ยืมจาก Captain) | 9 (S) | 6 (B) | 8 (A) | 8 (A) | 8 (A) | 3 (C) | 7 (A) |
| Spellslinger | ValdaGunslinger | 10 (S) | 7 (A) | 0 (D) | 5 (B) | 8 (A) | 6 (B) | 8 (A) |
| Storm Gunner | ValdaSpireExtras 🕰️ | 10 (S) | 5 (B) | 0 (D) | 5 (B) | 7 (A) | 4 (C) | 6 (B) |
| Trick Shot | ValdaGunslinger | 10 (S) | 5 (B) | 5 (B) | 5 (B) | 8 (A) | 4 (C) | 7 (A) |
| Troubadour | ValdaSpire24Extras (ยืมจาก Vagabond) | 9 (S) | 6 (B) | 8 (A) | 5 (B) | 7 (A) | 5 (B) | 7 (A) |
| Twice-Damned | ValdaSpireExtras 🕰️ | 10 (S) | 6 (B) | 0 (D) | 6 (B) | 8 (A) | 4 (C) | 5 (B) |
| White Hat | ValdaGunslinger | 9 (S) | 8 (A) | 7 (A) | 6 (B) | 7 (A) | 3 (C) | 7 (A) |
| Yellow Sign | ValdaSpire24Extras (ยืมจาก Captain) | 9 (S) | 9 (S) | 4 (C) | 6 (B) | 6 (B) | 5 (B) | 7 (A) |

---

### Adrenaline Junkie (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Hyper Focus (Advantage การโจมตีถัดไป ผ่าน Stim Potion) เป็นแค่ reliability boost เล็กน้อยแลกด้วยดาเมจตัวเอง ไม่พอข้าม tier = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ทุก feature เน้นตัวเองล้วน (Adrenaline/Stim Potion) = เท่า baseline |
| **Survivability** | 7/10 (A) | Bullet Time (Disadvantage ใส่ผู้โจมตีตัวเอง) + Tuck and Roll (กัน fall dmg ≤60ft) + Daredevil (lv10, temp HP ตอนโดนพลาดขณะเลือดต่ำ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Rush (Dash/Disengage ฟรีไม่เสีย action) + ผล Stim Potion ทำงานทุกเทิร์นแบบ "no action required" [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 5/10 (B) | ธีม risk/reward ตอนเลือดต่ำเฉพาะทาง ไม่ขยาย role อื่นมาก = เท่า baseline |

### Big Game Hunter (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Elephant Gun (ดาเมจก้อนเดียวสูงสุด 6d10 ที่ lv17) บวก Exotic Caliber (lv14, เลือก AoE cone/explosion/piercing line ด้วยดาเมจระดับเดียวกัน) — magnitude สูงที่สุดในกลุ่ม native Gunslinger [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ (Exotic Caliber เป็นดาเมจ ไม่ใช่ debuff) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Legendary Shot (lv10, reaction โจมตีศัตรูที่ใช้ Legendary Action เพื่อยกเลิก action นั้นถ้าโดน) — คุณค่าสูงมากเวลาเจอบอส [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 5/10 (B) | Tracker (ระบุชนิด/เวลา/ขนาดสัตว์จากรอยเท้าฟรี + Survival expertise) เป็น exploration utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญล่าบอส/สัตว์ใหญ่ที่มีทั้งดาเมจก้อนเดียวและ AoE ให้เลือกใช้ [M:2/4] [R:2/3] [B:3/3] |

### Brigand (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Cutthroat (lv14, ทอยดาเมจซ้ำได้สูงสุด 4 ครั้งเมื่อทอยได้เลขสูงสุด) เป็น damage-reliability multiplier ที่แรง [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Take Hostage (bonus action, Grappled+Incapacitated เป้า HP ต่ำ) + Underhanded Blow (Disadvantage การโจมตีของเป้าหลังโดนตี) — control kit ที่ครบเครื่อง [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ทุก feature เน้นใช้กับศัตรู ไม่ใช่ ally-support = เท่า baseline |
| **Survivability** | 7/10 (A) | Take Hostage ให้ Three-Quarters Cover ผ่านการจับตัวประกัน + Craven (reaction ขยับฟรีเมื่อพลาด) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Ambush (การโจมตีฟรีตอน initiative) + Craven (reaction ขยับฟรี) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสมดาเมจ/control/จับตัวประกันในธีมโจรปล้น [M:2/4] [R:2/3] [B:3/3] |

### Covert Operative (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | License to Kill (บวก risk die เข้าดาเมจทุกครั้งที่ยิงโดน) เป็นโบนัสเล็กน้อย ไม่พอข้าม tier = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Fieldcraft (ไม่โดน Surprised ตลอดเวลาที่มีสติ) กัน surprise round ได้จริง [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Sneaky Shot (bonus action ยิงเมื่อ Dash/Disengage) + Risky Mission (lv10, ทำ deed 2 อย่างในเทิร์นเดียวโดยจ่าย 2 risk dice) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | tool/skill proficiency คู่ (double prof bonus) + Concealed Gear (ซ่อนอุปกรณ์จากการค้นตัว) — spy utility ครบเครื่อง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญสายลับที่ผสม stealth/social/combat opener [M:2/4] [R:2/3] [B:2/3] |

### Daggermark (ValdaSpire24 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 6/10 (B) | Flanking Strike ให้ ally ใดก็ได้ Advantage บนการโจมตีถัดไปใส่เป้าที่คุณเพิ่งตี — support ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | Evasion (lv10, แปลง half-damage save เป็น no-damage) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Effortless Dodge (Disengage/Dodge ฟรีเป็น bonus action) + Preemptive Strike (lv14, reaction โจมตีก่อนศัตรูตีโดน) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Covert Tactics (Stealth+Sleight of Hand proficiency + bonus action Hide) — utility แทรกซึมที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เสริมธีม stealth/rogue ให้ gunslinger แต่ไม่ได้ขยาย breadth มาก = เท่า baseline |

### Deadeye (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Focused Shot (lv14, ยิงนัดเดียวได้ Advantage + คริติคอลอัตโนมัติ) บวก Eagle Eye (แปลงพลาดเป็นโดนด้วย Risk Die) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Concealed Position (ซ่อนตัวได้แม้ไม่มี cover ถ้า Prone + ไม่เผยตำแหน่งตอนพลาด) + Reposition (reaction ลุก+ขยับเมื่อศัตรูพลาด) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Sharpshooter's Stance (ลุกจาก prone ด้วย 5ft แทนครึ่งความเร็ว) + Reposition (reaction ฟรี) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Concealed Position ให้ Hide ได้แม้ไม่มี cover (แค่ต้อง Prone) เป็น stealth utility ที่กว้างกว่า baseline [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญสไนเปอร์แบบ Prone เฉพาะทาง ไม่ขยาย role อื่นมาก [M:2/4] [R:2/3] [B:2/3] |

### Dragon Banner (ValdaSpire24 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Critical Focus (ขยาย crit range ยิ่งครี/ฆ่ายิ่งกว้าง) + Rampage (ตี-ย้ายฟรีทุกครั้งที่ครี/ฆ่า) + Coup de Grâce (lv14) — ระบบดาเมจแบบ snowball ที่ต่อยอดบน Critical Shot ของ baseline ที่กว้างอยู่แล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Bloody Spectacle (lv10, AoE Frightened รัศมี 30ft ทุกครั้งที่ครี/ฆ่า) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ทุก feature เน้นตัวเองล้วน = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 9/10 (S) | Martial Recovery (bonus action คืน Risk Dice) + Rampage (ย้าย+ตีฟรีไม่เสีย action ทุกครั้งที่ครี/ฆ่า) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 5/10 (B) | เน้นดาเมจ/crit-snowball ธีมเดียวหนักมาก ไม่ขยาย role อื่น = เท่า baseline |

### Eagle Banner (ValdaSpire24 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Hundred-Arrow Volley (lv14, AoE cone/cylinder หลายเป้า) บวก Eagle Eye (แปลงพลาดเป็นโดน) — เพิ่มทั้ง magnitude แบบ AoE และ reliability ให้ baseline ที่เดิมเป็น single-target ล้วน [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ (Counter-Shot เป็น defense) = เท่า baseline |
| **Support** | 6/10 (B) | Counter-Shot (lv10, reaction หัก die จาก ranged attack ที่จะโดนใครก็ได้ในทีม) — support เชิงป้องกันที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | Counter-Shot ใช้ป้องกันตัวเองจากการยิงระยะไกลได้เช่นกัน [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Eagle Eye/Counter-Shot ไม่แย่ง action หลัก แต่ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | Vantage Point (Climb Speed เต็ม) เป็น traversal utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เปิด role sniper/counter-sniper ที่ป้องกันทีมได้ด้วย [M:2/4] [R:2/3] [B:3/3] |

### Feylost (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Spiteful mood ให้ดาเมจเสริม 1d8 force เมื่อตอบโต้ แต่เป็นแค่ 1 ใน 8 mood สุ่ม ไม่พอข้าม tier = เท่า baseline |
| **Control** | 8/10 (A) | Frenzied Strike (บังคับเป้าโจมตีสุ่มรวมพวกเดียวกัน) + Irresistible Mood (lv10, Charmed/Frightened เมื่อเลือดตก) — control-disruption ที่แรง [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | mood "Forlorn" (ดึงการโจมตีจาก ally มาโดนตัวเองแทน) เป็น support แบบสุ่ม 1 ใน 8 เท่านั้น [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 8/10 (A) | Fey Moods ให้บัฟป้องกันสุ่มหลายแบบ (temp HP/no-adv-OA/adv-save) + Misty Pathways (teleport หนีฟรี) + Mercurial (lv14, เลือก mood ได้เองแล้ว) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Misty Pathways (teleport ฟรีไม่เสีย slot) + Mercurial (bonus action เปิดใช้ mood) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Misty Pathways เป็น combat mobility เป็นหลัก = เท่า baseline |
| **Versatility** | 7/10 (A) | ระบบ mood สุ่ม 8 แบบ + Mercurial เลือกได้เองที่ lv14 ให้ toolkit กว้างมาก [M:2/4] [R:2/3] [B:3/3] |

### Gourmand (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Carve (bonus action ดาเมจเสริมจาก Risk Dice) เป็นโบนัสเล็กน้อยที่แลกด้วย bonus action = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Monster Meal (มื้ออาหารให้ temp HP + บัฟตาม creature type สูงสุด 3 แบบ แก่หลายคนพร้อมกัน) + Gourmet Ingredients (lv14, Heroic Inspiration/ability score +2/free spell ให้คนที่กิน) — ระบบบัฟทีมที่หนาแน่นที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Quick Snack (bonus action ฮีลตัวเองด้วย Hit Die) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Quick Snack ไม่เสีย action + Carve เป็น bonus action [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Cook's Utensils + ritual Gentle Repose เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | เปิด role "เชฟ-บัฟเฟอร์" ที่ต่างจาก striker ทั่วไปของคลาสโดยสิ้นเชิง [M:2/4] [R:3/3] [B:3/3] |

### Grenadier (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Clusterbomb (lv14, AoE 20ft 10d6 fire ทะลุ resistance) + Heavy Ordnance (ขยายรัศมีระเบิด+เพิ่มดาเมจ) — AoE nova ที่แรงที่สุดในกลุ่ม native [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Clusterbomb ทำให้เป้าที่โดนล้ม Prone เป็นวงกว้าง [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 5/10 (B) | Take Cover (lv10, ขยาย Evasion ให้ ally ที่อยู่ใกล้) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 5/10 (B) | ไม่มี mitigation ใหม่สำหรับตัวเอง (Take Cover ให้ผลกับคนอื่น) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Heavy Ordnance เป็น bonus action เสริมการระเบิดที่เกิดขึ้นอยู่แล้ว [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Configurable Blast (ทำลายวัตถุ/จุดไฟเชื้อเพลิง) เป็น utility เชิงทำลายล้างเล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสม AoE-blaster + protector (Take Cover) [M:2/4] [R:2/3] [B:3/3] |

### Gun Tank (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Walking Turret (dmg die อาวุธเพิ่มขึ้นทีละขั้นถ้าติดตั้งแบบ Mounted) + Gatling Shot (lv14, ตีซ้ำเป้าเดิมได้สูงสุด 5 ครั้งแม้ Disadvantage) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Heavy Gunner (armor proficiency medium+heavy จาก light-only ของ baseline) + Thick-Skulled (Advantage ต้าน charmed/frightened/stunned) + Bulletproof (resistance B/P/S) — ยกระดับความอึดข้ามขั้นจาก glass-cannon baseline [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | เปิด role "แทงค์-ปืนใหญ่" ที่ต่างจาก glass-cannon ของ baseline โดยสิ้นเชิง [M:2/4] [R:2/3] [B:3/3] |

### Gun-Ko Master (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Gun-Ko's Bonus Action Strike (ตีเมลีเพิ่มด้วย bonus action ทุกครั้งที่ยิงโดนเป้าประชิด) + Flash Assault (lv14, ยิง+ตีพร้อมกันเป็น bonus action เดียว) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Lightning Disarm (ปลดอาวุธเป้า) + Flash Assault (Prone ถ้าโดนทั้งสองที) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Predictive Dodge (bonus action, Dodge เฉพาะต่อเป้าที่เลือก) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Gun-Ko ให้ตีเมลีเพิ่มฟรีทุกครั้งที่ยิงโดนประชิด + Wall Dash (Dash+climb speed เป็น bonus action) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Wall Dash ให้ Climb Speed ปีนกำแพงได้ เป็น traversal utility [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | Hybrid เมลี-ระยะไกลเต็มรูปแบบ ผสมดาเมจ/control/mobility [M:2/4] [R:3/3] [B:3/3] |

### Gundead (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Gun Soul (bonus action ดาเมจ necrotic เท่า prof bonus ทุกครั้งที่ยิงโดน) เป็นโบนัสเล็กน้อยที่ไม่พอข้าม tier = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Dead Shot สร้าง zombie/ghoul ที่สู้เพื่อตัวเอง ไม่ใช่ ally-support = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Dead Shot (reaction ชุบศพเป็น zombie/ghoul ตอนฆ่า) — ได้นักสู้เพิ่มฟรีจากการฆ่าปกติ [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 5/10 (B) | Grave Whisperer (คุยกับอันเดดได้ + Advantage Cha check) + Sleep of the Dead (ปลอมเป็นศพ) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Hybrid necromancer-gunslinger ที่มีทั้งดาเมจ/pet/utility เฉพาะทางอันเดด [M:2/4] [R:2/3] [B:3/3] |

### High Roller (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Liar's Dice/Double or Nothing เพิ่ม magnitude ได้สูงมาก (ดาเมจ 2 เท่าหรือทอย crit dice 4 รอบ) แต่มี downside เสี่ยงลดดาเมจครึ่ง/กลายเป็น hit ธรรมดา ทำให้ variance สูงไม่ใช่ magnitude ที่รับประกัน = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Risk Taker (lv10, ใช้ maneuver บางตัวได้โดยไม่เสีย Risk Die จริง ทอย d6 แทน) — resource multiplier [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Poker Face (gaming set proficiency ครบทุกชนิด + skill) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | ธีมพนัน/variance เฉพาะทาง ไม่ขยาย role อื่นมาก = เท่า baseline |

### Houndmaster (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | สุนัขคู่ใจโจมตีเองได้ทุกเทิร์นผ่าน bonus action สั่งงาน (Sick 'Em!) — เท่ากับได้นักสู้เพิ่มอีกตัวที่โจมตีคู่ขนานกับตัวเอง [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Loyal Redirection ป้องกันแค่ตัวเอง/สุนัข ไม่ใช่ ally-support วงกว้าง = เท่า baseline |
| **Survivability** | 6/10 (B) | Loyal Redirection ให้สุนัขรับดาเมจแทนตัวเองได้ (reaction) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 9/10 (S) | สั่งสุนัขโจมตีผ่าน bonus action เดียว เท่ากับได้ "เทิร์นเพิ่ม" จากนักสู้อีกตัวแทบฟรี [M:4/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Hound's Instincts (Blindsight 30ft + ตรวจจับการแปลงร่าง/ปลอมตัว) เป็น detection utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เปิด role "ผู้ควบคุมสัตว์เลี้ยง" ที่ต่างจาก solo striker ของคลาส [M:2/4] [R:2/3] [B:3/3] |

### Janissary (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Coordinated Volley (Advantage เมื่อตามยิงเป้าที่ ally เพิ่งยิงโดน) เป็น reliability boost ที่ต้องอาศัยทีมเวิร์ก ไม่พอข้าม tier = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Coordinated Volley รับผลจากการกระทำของ ally ไม่ใช่ให้ผลกับ ally = เท่า baseline |
| **Survivability** | 6/10 (B) | Defensive Formation (lv14, half/three-quarters cover จากระยะไกลเมื่ออยู่ใกล้ ally) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 5/10 (B) | Steel Discipline (Advantage ต้าน illusion school) + Influence (เสริม Charisma check ด้วย risk die) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญทีมเวิร์กระยะไกล + social/defense เสริม [M:2/4] [R:2/3] [B:2/3] |

### Jolly Roger (ValdaSpire24 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Skirmish (bonus action ตีเพิ่มผสมเมลี+ระยะไกล) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Dirty Tactics (lv10, เลือก Trip/Prone หรือ Disadvantage ทุกเทิร์นที่ตีเมลีโดน) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | All Hands on Deck (lv14, bonus action เดียวแจก Advantage บน d20 test ครั้งถัดไปให้ทั้งทีม, Cha mod ครั้ง/วัน) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Skirmish เป็น bonus action extra attack + Fancy Footwork ย้ายตำแหน่งฟรี [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Swim speed เป็น utility เฉพาะทางน้ำ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | ผสมเมลี+ระยะไกล (Skirmish) + soft-control (Dirty Tactics) + team buff (All Hands) ครบเครื่อง [M:2/4] [R:3/3] [B:3/3] |

### Knight Errant (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม protector/tank ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | Knight's Challenge (ขยายเวลา taunt ของ Challenge maneuver จนจบ 1 นาทีแทนแค่จบเทิร์นถัดไป) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Inspiring Battlecry (แจก Heroic Inspiration ให้ตัวเอง+ทีมฟรีเมื่อเลือดตก) + Redirection (lv10, reaction รับดาเมจแทน ally + resistance) [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Chivalrous Oath (temp HP ตอน initiative + Advantage ต้าน charm/frightened) + Redirection (resistance ตอนรับแทน) + Surge of Valor (lv14, ลดดาเมจ+reroll failed test) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Surge of Valor เป็น bonus action ให้ผล 2 ชั้นต่อเนื่อง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Chivalrous Oath (skill proficiency 2 ตัว) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | เปิด role "protector/tank" เต็มรูปแบบที่ต่างจาก striker ของคลาสโดยสิ้นเชิง [M:2/4] [R:3/3] [B:3/3] |

### Musketeer (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Skirmish (bonus action ตีเพิ่มผสมเมลี+ระยะไกล, expend Risk Die) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Morale Boost (Bite the Bullet → temp HP ให้ ally สูงสุด 5 คน) + All for One (lv14, reaction ยิงตอบโต้ทุกครั้งที่ ally ใกล้ตัวโดนตี) — protector/support kit ที่ครบเครื่อง [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Mobile Tactics (lv10, เป้าที่โดนตีทำ OA ใส่ไม่ได้จนจบเทิร์นถัดไป) ช่วยขยับตัวได้ปลอดภัยขึ้น [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Skirmish เป็น bonus action extra attack [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | Bayonet/martial weapon access เป็น combat flavor ไม่ใช่ utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 8/10 (A) | Hybrid เมลี-ระยะไกล + team-fighter (support) เต็มรูปแบบ [M:2/4] [R:3/3] [B:3/3] |

### Pistolero (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Fan the Hammer (bonus action ตีเพิ่มอีก 2 ครั้งแม้ Disadvantage) + Bullet Time (lv14, Advantage การยิง 1 ครั้ง/เทิร์นฟรี) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Showdown (lv10, ตอน initiative ยิงเป้าให้ Disadvantage โจมตีคนอื่นในรอบแรก) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 9/10 (S) | Fan the Hammer (bonus action ตี 2 ครั้งเพิ่ม) + Showdown (ชักปืน+ยิงฟรีตอน initiative) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 5/10 (B) | ผู้เชี่ยวชาญยิงรัวเดี่ยวๆ ธีมเดียว ไม่ขยาย role อื่น = เท่า baseline |

### Plague Doctor (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Sanguine humor (extra necrotic ทอย 1 die) เป็นตัวเลือกเดียวจาก 4 แบบ ไม่พอข้าม tier = เท่า baseline |
| **Control** | 7/10 (A) | Imbalance Humors (เลือก 1 ใน 4 debuff ทุกครั้งที่ตีโดน: adv-ทั้งสองทาง/disadvantage/กัน-OA/bleed) — debuff toolkit ที่ยืดหยุ่น [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Remedy (bonus action ฮีล ally 2 ทอย Battle Die + ปลด condition) + Analgesic Remedy (lv10, temp HP เพิ่ม) — healer feature ตัวจริง [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองโดยตรง (ทุกอย่างมุ่งช่วยคนอื่น) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Remedy เป็น bonus action ให้ผลฮีล+ปลด condition พร้อมกัน [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 5/10 (B) | Physician's Diagnosis (ตรวจ Poisoned/Bloodied/contagion ฟรี) + Medicine expertise [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Hybrid healer-debuffer ที่ต่างจาก striker ของคลาส [M:2/4] [R:2/3] [B:3/3] |

### Pugilist (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Brute Force (extra ดาเมจทอยจากอาวุธชกทุกเทิร์น) เป็นแหล่งดาเมจแนวเมลีที่ตั้งฉากกับ chassis ปืนของ baseline ไม่พอข้าม tier = เท่า baseline |
| **Control** | 7/10 (A) | Intimidating Blow (Horrific Strike แบบ AoE 10ft, Frightened ตราบใดที่เซฟไม่ผ่าน) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Unarmored Defense (10+Dex+Con) + Shrug Off (reaction ลดดาเมจด้วย Battle Die) + Desperate Endurance (lv10, เปลี่ยน failed save เป็น success ตอนเลือดตก) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Knockout (lv14, bonus action มีโอกาส KO เป้า) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | พลิก gunslinger เป็นนักชกเมลีเต็มตัว — สไตล์การต่อสู้ต่างไปจาก chassis เดิมอย่างสิ้นเชิง [M:2/4] [R:2/3] [B:3/3] |

### Rōnin (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Swordmaster (lv14, ตีซ้ำฟรีทุกครั้งที่พลาด 1 ครั้ง/เทิร์น) เป็น reliability multiplier ที่แรงมาก [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Lone Wolf อาศัยการอยู่คนเดียวโดยเจตนา ไม่ใช่ ally-support = เท่า baseline |
| **Survivability** | 8/10 (A) | Lone Wolf (ศัตรูไม่ได้ Advantage ใส่เราตอนไม่มี ally ใกล้) + Killing Stroke (lv10, reaction ฆ่าผู้โจมตีก่อนที่การโจมตีจะลง ทำให้พลาดอัตโนมัติถ้าโดน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Killing Stroke (reaction attack) + Swordmaster (ตีซ้ำฟรีเมื่อพลาด) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Infamy (Deception/Intimidation expertise) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | ผู้เชี่ยวชาญดวลเดี่ยวธีมเดียวหนักมาก ไม่ขยาย role อื่น = เท่า baseline |

### Secret Agent (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | License to Kill (lv14, บวก Risk Dice ที่ทอยได้เลขสูงสุด reroll ต่อได้เรื่อยๆ สูงสุดเท่า prof bonus) — exploding-dice ที่ magnitude สูงมาก [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Exit Strategy (reaction Invisible+ขยับ 10ft ทุกครั้งที่โดนดาเมจ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Parting Shot (bonus action ยิงเมื่อ Dash/Disengage/Dodge) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Concealed Shot cantrip + Disguise Kit/Thieves' Tools + 2 skill proficiency + Quick Change — spy toolkit ครบเครื่อง [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | Hybrid สายลับ-นักฆ่าที่ผสม stealth/utility/damage [M:2/4] [R:2/3] [B:3/3] |

### Sharpshooter (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Focused Shot (lv14, ยิงนัดเดียวได้ Advantage+คริติคอลอัตโนมัติ) + Eagle Eye (แปลงพลาดเป็นโดน) — เวอร์ชัน 2014 ของ Deadeye [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Camouflage (ซ่อนตัวต่อได้แม้ยิงพลาด) เป็นการหลบหลีกไม่ใช่ mitigation โดยตรง [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Sniper's Stance (ลุกจาก prone ด้วย 5ft) ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Camouflage (Advantage Stealth+ซ่อนแหล่งที่มาการยิง) + Eye For Movement (lv10, darkvision+see invisibility) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญสไนเปอร์แบบ Prone เหมือน Deadeye แต่มี utility เสริมมากกว่าเล็กน้อย [M:2/4] [R:2/3] [B:2/3] |

### Siegeball Jersey (ValdaSpire24Extras 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | Game Plan สั่ง ally ทำ Grapple/Shove แทนการโจมตีปกติ (control ทางอ้อมผ่าน ally) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Team Inspiration (bonus action มอบ Battle Die ให้ ally พลิกความล้มเหลว) + Game Plan (สั่ง ally ทำ action แทน) [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Athletic Constitution (สลับ Str/Con save เป็น Dex save แบบ Advantage) + Game-Winning Play (lv14, ยืดความตายตอน 0 HP พร้อม action เต็ม) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Game-Winning Play ให้ action+bonus action เต็มตอนใกล้ตาย — คุณค่าสูงมากในสถานการณ์ฉุกเฉิน [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 3/10 (C) | Sports Fanatic flavor เป็น utility เล็กน้อย = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม control(ผ่าน ally)+support+personal emergency-survival [M:2/4] [R:2/3] [B:3/3] |

### Spellslinger (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | เข้าถึง spell list ของ Wizard (รวม blast spell) + Arcane Shot ให้ดาเมจเสริมกับ Finger Guns — ช่องทางดาเมจเพิ่มบน baseline ที่แรงอยู่แล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | เข้าถึง control spell ของ Wizard (Web, Hold Person ฯลฯ) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมติด chassis โดยตรง = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี defense feature ติด chassis โดยตรง (ขึ้นกับ spell ที่เลือกเอง) = เท่า baseline |
| **Action Economy** | 8/10 (A) | Spellshot (แทนที่การโจมตีด้วย cantrip) + Magic Bullet (lv14, แทนที่ spell attack ด้วยการยิงอาวุธ) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | เข้าถึง cantrip/spell ของ Wizard เต็มชุด เป็น utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Hybrid gish เต็มรูปแบบ (ปืน+เวทมนตร์) [M:2/4] [R:3/3] [B:3/3] |

### Storm Gunner (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Bullet Hell (โจมตีหลายเป้าพร้อมกันด้วยอาวุธ Automatic) + Riddle with Holes (lv14, ลบ Disadvantage ออกจากการยิงอัตโนมัติทั้งหมด) — เปลี่ยนดาเมจ single-target ให้เป็น AoE เต็มความแม่นยำ [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Riddle with Holes แค่กันไม่ให้ ally โดนหางเลข ไม่ใช่ buff โดยตรง = เท่า baseline |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Ammunition Belt (lv7, อาวุธ Automatic ไม่ต้อง reload) — ลดภาระ logistics [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Running Riot (lv10, +10ft speed) เป็น mobility utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญ AoE-อัตโนมัติเฉพาะทาง แต่เลือก exclude ally ได้ทำให้ยืดหยุ่นขึ้น [M:2/4] [R:2/3] [B:2/3] |

### Trick Shot (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Pinball Shot (lv14, สะท้อนการโจมตีไปเป้าอื่นได้สูงสุด 5 เป้าจากการตีโดนครั้งเดียว) — AoE-เทียมที่ magnitude สูงมาก [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Deft Deflection (lv10, reaction ป้องกัน ally จากการโจมตีที่กำลังจะโดน) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 5/10 (B) | ไม่มี feature ป้องกันตัวเองโดยตรงใหม่ (Ricochet แก้พลาด ไม่ใช่ mitigation) = เท่า baseline |
| **Action Economy** | 8/10 (A) | Ricochet (bonus action reroll พลาด) + free reload จาก Speed Loader [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Fancy Gunplay (บวก Risk Die เข้า Performance/Sleight of Hand check) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสม AoE-เทียม(Pinball) + protector(Deft Deflection) [M:2/4] [R:2/3] [B:3/3] |

### Troubadour (ValdaSpire24Extras 🔁 ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Scathing Retort (ดาเมจ psychic ตอบโต้ตอนศัตรูพลาด/เซฟผ่าน) เป็นแหล่งดาเมจรองเล็กน้อย ไม่พอข้าม tier = เท่า baseline |
| **Control** | 6/10 (B) | Fast Friends (Charm เป้าผ่าน Influence action) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Inspiring Tune (bonus action มอบ Battle Die ให้ ally พลิกความล้มเหลว) + Marvelous Troupe (lv14, ขยายเป็นหลาย ally พร้อมกัน = Cha mod) [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Scathing Retort เป็นการตอบโต้ ไม่ใช่ mitigation โดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Inspiring Tune เป็น bonus action ให้ resource แก่ ally [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 5/10 (B) | Folk Musician (Performance expertise + instrument proficiency คู่ + สื่อสารพื้นฐานข้ามภาษา) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เปิด role "นักดนตรี-บัฟเฟอร์" ที่ต่างจาก striker ของคลาส [M:2/4] [R:2/3] [B:3/3] |

### Twice-Damned (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Hateful Vengeance (Advantage + **ดาเมจสูงสุด** ทุกครั้งที่ยิงเป้าที่เลือกไว้) — รับประกัน max damage ต่อเป้าเดียวตลอดแคมเปญ [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Black Bullet (ลด HP max ของเป้าชั่วคราว) เป็น soft-debuff [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Grim Determination (Advantage ต้าน Frightened) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Marked for Death (lv14, ฆ่าเป้าที่มาร์กใน 1 นาที → ได้ action เพิ่ม) [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | Shotgun Interrogation (Advantage Intimidation + ปัดผลต่ำเป็น 10) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | ธีมล้างแค้นเป้าเดียวเฉพาะทางมาก ไม่ขยาย role อื่น = เท่า baseline |

### White Hat (ValdaGunslinger)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม control/protector ล้วน) = เท่า baseline |
| **Control** | 8/10 (A) | Reach for the Skies (คริติคอล → Frightened+Incapacitated แทนดาเมจ) + Long Arm of the Law (lv10, hobble ความเร็วเป้า) + Stunned upgrade (lv14) — control kit ที่ทรงพลัง [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 7/10 (A) | Lay Down the Law (bonus action, temp HP ให้ ally + reaction ยิงตอบโต้ผู้โจมตี ally) + Steely-Eyed Aura (Advantage ต้าน Frightened ให้ทีม) [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Steely-Eyed Aura ป้องกันตัวเองจาก Frightened ได้เช่นกัน [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Lay Down the Law เป็น bonus action ให้ผล temp HP + reaction attack พ่วง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | เปิด role "ตำรวจ/protector" ที่ผสม control+support [M:2/4] [R:2/3] [B:3/3] |

### Yellow Sign (ValdaSpire24Extras 🔁 ยืมจาก Captain)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Nightmarish Glow (lv14, extra 1d6 psychic ทุกครั้งที่ตีโดนในออร่า) เป็นโบนัสเล็กน้อย = เท่า baseline |
| **Control** | 9/10 (S) | Frenzied Strike (บังคับเป้าโจมตีสุ่มรวมพวกเดียวกัน) + Maniacal Influence (lv10, สั่ง Advantage/Disadvantage ให้เป้าที่ Frenzied ได้) — ควบคุมศัตรูให้หันไปตีกันเองได้จริง [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 4/10 (C) | Nightmarish Glow ให้ผลดาเมจเสริมกับ ally ในออร่าด้วย แต่เป็นแค่โบนัสรอง [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 6/10 (B) | Eldritch Herald (Advantage ต้าน charm/frightened) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Frenzied Strike เป็น bonus action ผลกว้าง ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Outer Knowledge (expertise skill ที่หมุนเวียนได้ทุก long rest ตาม GM เลือก) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Eldritch cultist ธีม control/debuff เฉพาะทาง บวก utility skill หมุนเวียน [M:2/4] [R:2/3] [B:3/3] |
