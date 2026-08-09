# Warlock — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warlock](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 19 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-warlock.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Warlock, 2024)

Floor 0-10 ต่อ axis ของ **Warlock เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Cha, Pact Magic (spell slot น้อย 2→4 ช่อง แต่ **cast ทุกครั้งที่ระดับสูงสุดที่มี** เสมอ, ฟื้นเต็มทุก **Short Rest**), saving throw proficiency Wis + Cha, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Eldritch Invocations (คลัง 28 ตัวเลือก รู้พร้อมกัน 1 lv1 → 10 lv20 สลับได้ทุก level-up), Magical Cunning (lv2, พิธี 1 นาที คืน slot ครึ่งหนึ่ง 1 ครั้ง/long rest), Contact Patron (lv9), Mystic Arcanum (lv11/13/15/17, cast คาถา lv6-9 ฟรีไม่เสีย slot 1 ครั้ง/long rest ต่อระดับ), Eldritch Master (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Pact Magic slot cast ที่ระดับสูงสุดเสมอ (เช่น lv5 Warlock มี slot lv3 ทั้งคู่ แม้จะร่าย spell lv1 ก็ยกเป็น lv3) บวกฟื้นเต็มทุก **Short Rest** (ไม่ใช่แค่ Long Rest) ทำให้ nova ได้บ่อยกว่า full caster ทั่วไป และ Mystic Arcanum (lv11+) ให้ cast คาถา lv6-9 ฟรี 1 ครั้ง/long rest ต่อระดับ — magnitude ต่อครั้งสูงมากแต่จำนวน slot พร้อมกันมีแค่ 2-4 ช่องเท่านั้น [M:3/4] [R:3/3] [B:1/3] |
| **Control** | 5/10 (B) | Warlock spell list มี control ให้เลือกพอสมควร (Hex, Hold Person, Banishment) ไม่ได้เป็นจุดเด่นเท่า Damage และ slot ที่ฟื้นทุก short rest ก็ช่วยให้ใช้ control spell ได้บ่อยกว่า full caster [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — chassis เน้น pact ส่วนตัวล้วนๆ |
| **Survivability** | 3/10 (C) | HD d8 + armor proficiency แค่ light + saving throw proficiency Wis กับ Cha (สองเซฟที่ป้องกัน control ได้กว้างพอควร) ไม่มี resistance/self-heal ติด baseline เลย (Invocation อย่าง Armor of Shadows/Fiendish Vigor เป็นตัวเลือกที่ต้องเลือกเอา ไม่ใช่ของฟรีทุกตัว) [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Pact Magic ฟื้นเต็มทุก Short Rest บวก Magical Cunning (lv2) คืน slot ได้ครึ่งหนึ่งอีกรอบ 1 ครั้ง/long rest ทำให้จำนวนครั้งที่ cast ได้ต่อวันสูงกว่า full caster ที่พึ่ง Long Rest อย่างเดียวมาก แต่ตัวจำนวน slot พร้อมกันยังน้อย (2-4 ช่อง) และไม่มี free-action spell พิเศษติด chassis [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 7/10 (A) | Eldritch Invocation pool มี 28 ตัวเลือกครอบคลุม utility กว้างมาก (Mask of Many Faces=Disguise Self ตลอดเวลา, Misty Visions=Minor Illusion ตลอดเวลา, Witch Sight=มองทะลุ illusion/shapechange, Gift of the Depths=หายใจใต้น้ำ) รู้พร้อมกันสูงสุด 10 ตัวที่ lv20 ส่วนใหญ่ใช้ได้ at-will ไม่เสีย slot เลย [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 5/10 (B) | Invocation สลับได้ 1 ตัว/level-up และ Mystic Arcanum สลับคาถาได้ 1 ตัว/level-up ให้ปรับ build ระยะยาวได้กว้าง (ครอบคลุม combat/exploration/social) แต่ day-to-day/rest-to-rest ปรับได้จำกัดเหมือน known-caster ทั่วไป [M:2/4] [R:1/3] [B:2/3] |

---

## Subclass Scoring (19)

**Class Baseline อ้างอิง**: Damage 7, Control 5, Support 0, Survivability 3, Action Economy 6, Utility 7, Versatility 5

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ **หมายเหตุแหล่งที่มา**: Archfey/Celestial/Fiend/Great Old One มีทั้งเวอร์ชัน 2014 (PHB/XGE) และ 2024 (XPHB) — tracker ใช้ชื่อ 2014 เดิม ("The Archfey" ฯลฯ) แต่ตาม 2024-scope rule ให้คะแนนด้วยกลไก **2024 (XPHB)** เป็นตัวแทน ส่วน **The Undead** (VRGR 2014) กับ **Undead Patron** (RHW 2024 reprint) tracker แยกเป็น 2 บรรทัดอิสระ (รูปแบบเดียวกับ Fighter Banneret/PDK และ Warden Hellkeeper/Diabolist) จึงให้คะแนนแยกกันคนละตัว ส่วน **The Future You** (VSS 2014) มีแค่บรรทัดเดียวในชื่อ "Future You Patron" (ValdaPlayerPack 2024 reprint, ยืนยัน `classSource: XPHB`) — ให้คะแนนเฉพาะเวอร์ชัน 2024 เท่านั้นตาม precedent เดียวกับ Sorcerer's dual-name rule ส่วน Fathomless/Genie/Hexblade/Undying (TCE/TCE/XGE/SCAG) ไม่มี reprint ใน XPHB จึงเป็น 2014-only 🕰️ และ Dead Mists/GM/Legacy/Magician/Symbiont (ทั้งหมดจาก VSS 2014) ก็เป็น 2014-only 🕰️ เช่นกัน (ตรวจสอบแล้วว่าไฟล์ VSS-2024 ไม่มี Warlock subclass เหล่านี้เลย) ส่วน Coven/First Vampire/Parasite (GrimHollowPG24) ยืนยัน `classSource: XPHB` 2024-compatible

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| The Archfey | A | XPHB | 8 (A) | 7 (A) | 3 (C) | 8 (A) | 7 (A) | 7 (A) | 7 (A) |
| The Celestial | B | XPHB | 7 (A) | 5 (B) | 9 (S) | 4 (C) | 6 (B) | 7 (A) | 6 (B) |
| The Coven | B | GrimHollowPG24 | 8 (A) | 9 (S) | 2 (D) | 3 (C) | 6 (B) | 8 (A) | 7 (A) |
| The Dead Mists | C | VSS 🕰️ | 7 (A) | 5 (B) | 0 (D) | 4 (C) | 7 (A) | 7 (A) | 5 (B) |
| The Fathomless | B | TCE 🕰️ | 8 (A) | 8 (A) | 4 (C) | 4 (C) | 7 (A) | 7 (A) | 6 (B) |
| The Fiend | B | XPHB | 9 (S) | 6 (B) | 0 (D) | 6 (B) | 7 (A) | 7 (A) | 5 (B) |
| The First Vampire Patron | B | GrimHollowPG24 | 8 (A) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 8 (A) | 6 (B) |
| The Genie | B | TCE 🕰️ | 8 (A) | 5 (B) | 4 (C) | 5 (B) | 7 (A) | 9 (S) | 8 (A) |
| The GM | B | VSS 🕰️ | 8 (A) | 5 (B) | 5 (B) | 6 (B) | 7 (A) | 7 (A) | 8 (A) |
| The Great Old One | B | XPHB | 8 (A) | 8 (A) | 0 (D) | 4 (C) | 7 (A) | 7 (A) | 7 (A) |
| The Hexblade | B | XGE 🕰️ | 9 (S) | 5 (B) | 0 (D) | 5 (B) | 7 (A) | 7 (A) | 6 (B) |
| The Legacy | A | VSS 🕰️ | 9 (S) | 5 (B) | 7 (A) | 5 (B) | 6 (B) | 7 (A) | 7 (A) |
| The Magician | B | VSS 🕰️ | 7 (A) | 5 (B) | 0 (D) | 4 (C) | 6 (B) | 9 (S) | 9 (S) |
| The Parasite Patron | A | GrimHollowPG24 | 7 (A) | 9 (S) | 0 (D) | 8 (A) | 7 (A) | 8 (A) | 8 (A) |
| The Symbiont | C | VSS 🕰️ | 8 (A) | 5 (B) | 0 (D) | 6 (B) | 6 (B) | 7 (A) | 7 (A) |
| The Undead | C | VRGR 🕰️ | 8 (A) | 6 (B) | 0 (D) | 7 (A) | 6 (B) | 8 (A) | 6 (B) |
| The Undying | C | SCAG 🕰️ | 7 (A) | 5 (B) | 0 (D) | 6 (B) | 6 (B) | 7 (A) | 5 (B) |
| Undead Patron | B | RHW | 9 (S) | 6 (B) | 0 (D) | 8 (A) | 7 (A) | 8 (A) | 7 (A) |
| Future You Patron | A | ValdaPlayerPack | 8 (A) | 7 (A) | 6 (B) | 7 (A) | 7 (A) | 9 (S) | 8 (A) |

---

### The Archfey (XPHB)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ Survivability กระโดด +5 (C→A) และขยับขึ้นอีก 5 axis พร้อมกัน กว้างที่สุดในกลุ่มที่ไม่มี S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Dreadful Step (2d10 Psychic AoE ตอน teleport) บวก Beguiling Defenses (lv10, reaction สะท้อนดาเมจ Psychic เท่ากับดาเมจที่รับ) ต่อยอดจาก Misty Step ที่ cast ฟรีได้บ่อย [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Taunting Step (AoE Disadvantage ต่อการโจมตีเป้าอื่นนอกจากตัวเอง) เป็น soft-control ที่ trigger ได้ทุกครั้งที่ teleport [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | Refreshing Step ให้ temp HP แก่ตัวเองหรือ ally ในระยะ 10ft ได้ทุกครั้งที่ teleport เป็น support ที่ break เหนือ 0-baseline |
| **Survivability** | 8/10 (A) | Beguiling Defenses (Immune Charmed + reaction ลดดาเมจครึ่ง+สะท้อน Psychic) บวก Misty Escape (lv6, reaction Misty Step ตอนโดนดาเมจ) เป็นเลเยอร์หนี/ป้องกันที่ทรงพลัง [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Misty Step cast ฟรีไม่เสีย slot ได้ Cha mod ครั้ง/วัน บวก Bewitching Magic (lv14, cast Misty Step ฟรีในการกระทำเดียวกับคาถา Enchantment/Illusion) เป็นการประหยัด action จริง [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Mobility เพิ่มเติมจาก Misty Step ที่ใช้ซ้ำได้บ่อย ไม่พอยกระดับเหนือ baseline ที่มี Invocation pool อยู่แล้ว = เท่า baseline |
| **Versatility** | 7/10 (A) | แต่ละครั้งที่ teleport เลือกได้ระหว่างโหมด offense (Dreadful/Taunting Step)/defense (Refreshing/Disappearing Step) ตามสถานการณ์ [M:2/4] [R:2/3] [B:3/3] |

### The Celestial (XPHB)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 (D) เป็น 9 (S เต็มสเกล) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในทั้งคลาส


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Radiant Soul (เพิ่ม Cha mod ใส่ดาเมจคาถา Radiant/Fire 1 ครั้ง/เทิร์น) ไม่พอยกระดับเหนือ baseline ที่เน้นสาย heal มากกว่าดาเมจ = ใกล้เคียง baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Healing Light (bonus action ฮีลจาก dice pool ที่ใหญ่ขึ้นตามเลเวล) บวก Celestial Resilience (lv10, temp HP ให้ตัวเอง+ally สูงสุด 5 คนทุกครั้งที่ Magical Cunning หรือ rest) บวก Searing Vengeance (lv14, กันตาย+ฮีลครึ่ง max HP+AoE ดาเมจ+Blind ให้ทั้งทีมตอนมีใครใกล้ตาย) เป็นชุด support/healer ที่ทรงพลังที่สุดในบรรดา class นี้ [M:4/4] [R:2/3] [B:3/3] |
| **Survivability** | 4/10 (C) | Radiant Resistance (lv6) เป็น addition เล็กน้อยเท่านั้น [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Healing Light เป็น bonus action ปกติ, Celestial Resilience เป็น passive trigger ไม่เสีย action เพิ่ม = เท่า baseline |
| **Utility** | 7/10 (A) | ไม่มี utility feature ใหม่นอกเหนือจากคาถาที่ได้ = เท่า baseline |
| **Versatility** | 6/10 (B) | มีทั้งดาเมจ Radiant/Fire เสริมและฮีลเป็นหลัก แต่ยังเป็น healer archetype ที่ค่อนข้างเน้นมิติเดียว [M:2/4] [R:3/3] [B:1/3] |

### The Coven (GrimHollowPG24)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control เป็น S ใหม่ (กระโดด +4) บวก Utility/Versatility ขยับตาม แต่ Support ยังแทบเป็น 0 (2/10)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hag's Visage (lv10, ห่วงโซ่ save-or-die 3 ขั้น Frightened→Paralyzed→0 HP ต่อเป้า Humanoid) เป็น execute ที่ทรงพลังมาก แม้จะต้องตั้งเงื่อนไขก่อน [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 9/10 (S) | Hex+Bestow Curse cast ฟรีไม่เสีย slot (Hag's Eye) บวก Hag's Visage's Frightened→Paralyzed chain เป็นชุด control ที่ยาวและแรงที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 2/10 (D) | Hag's Craft (lv14, ปรุงยา 2-3 โดสให้ทีมได้ต่อวัน) เป็น downtime support เล็กน้อยที่ break เหนือ 0-baseline |
| **Survivability** | 3/10 (C) | ไม่มี survivability feature ใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | Hex/Bestow Curse cast ฟรีประหยัด spell slot ไม่ใช่ action = เท่า baseline |
| **Utility** | 8/10 (A) | Hag's Craft (ปรุงยาวิเศษ Common/Uncommon/Rare + สร้าง Minor Heartstone item ทุก long rest) เป็น downtime utility ที่ทรงคุณค่ามาก [M:3/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | รวม control chain, execute damage, และ item crafting เข้าด้วยกันในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### The Dead Mists (VSS 🕰️)

**Overall**: C — (7 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Survivability/AE) Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่โดยตรง (Master of the Mists เป็น lifesteal ไม่ใช่ดาเมจเพิ่ม) = เท่า baseline |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย ทุกอย่างเป็น self-only |
| **Survivability** | 4/10 (C) | Feed The Soul (ฮีลตัวเองด้วยการเผา slot) + Master of the Mists (lifesteal necrotic) ถูกหักล้างบางส่วนด้วยข้อจำกัดของ subclass เอง ("ฮีลจากคาถาตัวเองไม่ได้เลย") [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Drink The Mists (bonus action แลก HP เพื่อคืน Pact Magic slot ที่ใช้ไปแล้วในเทิร์นถัดไป) เป็นตัวคูณทรัพยากรที่ให้ cast คาถาต่อวันได้มากกว่าปกติ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Fog Form (lv10, แปลงร่างเป็น Gaseous Form ตัวเองฟรี 1/วัน) เป็น escape/infiltration utility เพิ่ม แต่ไม่พอยกระดับเหนือ baseline ที่มี Invocation pool กว้างอยู่แล้ว = เท่า baseline |
| **Versatility** | 5/10 (B) | Toolkit ทั้งหมดผูกกับธีม HP-แลก-พลังเดียว ไม่กว้างมาก = เท่า baseline |

### The Fathomless (TCE 🕰️)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control กระโดด +3 บวก Support ขยับบางส่วน (0→4) และขยับตามอีก 2 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Tentacle of the Deeps (bonus action สร้าง+เคลื่อนที่+โจมตีซ้ำได้ สเกล 1d8→2d8) บวก Grasping Tentacles (lv10, Evard's Black Tentacles ฟรี 1/วัน) เป็น damage kit ที่ยิงได้ทุกเทิร์น [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Evard's Black Tentacles (AoE restrain แรงมาก, cast ฟรี+ Concentration ทำลายไม่ได้) บวก Tentacle's speed reduction ทุกครั้งที่โจมตีโดน [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 4/10 (C) | Guardian Coil (lv6, reaction ลดดาเมจให้ตัวเองหรือ ally ที่อยู่ใกล้ tentacle ได้ 1d8→2d8) เป็น support ปกป้องที่ break เหนือ baseline ชัดเจน |
| **Survivability** | 4/10 (C) | Guardian Coil ใช้ป้องกันตัวเองได้เช่นกัน บวก swim speed 40ft/หายใจใต้น้ำ (niche) [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Tentacle เคลื่อนที่+โจมตีซ้ำได้ด้วย bonus action ทุกเทิร์น + Grasping Tentacles cast ฟรีไม่เสีย slot [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Fathomless Plunge (lv14, teleport ทั้งทีมสูงสุด 6 คนไปยังแหล่งน้ำระยะ 1 ไมล์) เป็น exploration utility ที่มีประโยชน์แต่ไม่พอยกระดับ tier = เท่า baseline |
| **Versatility** | 6/10 (B) | ผสมกลไก pet-tentacle, AoE control spell, และ party-teleport ในตัวเดียว [M:2/4] [R:2/3] [B:2/3] |

### The Fiend (XPHB)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Survivability/Action Economy ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Hurl Through Hell (lv14, 8d10 Psychic + Incapacitated 1 เทิร์น ต่อเป้าเดียว, refill ด้วย spell slot) เป็นดาเมจก้อนเดียวที่สูงที่สุดในบรรดา subclass ของ class นี้ [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Hurl Through Hell มาพร้อม Incapacitated 1 เทิร์นเป็นผลพลอยได้จากดาเมจก้อนใหญ่ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | Dark One's Blessing ให้ temp HP เฉพาะตัวเอง (แม้จะ trigger จาก kill ของ ally ก็ตาม) ไม่มี feature เสริมทีมจริง |
| **Survivability** | 6/10 (B) | Dark One's Blessing (temp HP ทุกครั้งที่ kill ในระยะ 10ft) บวก Fiendish Resilience (lv10, เลือก resistance ชนิดดาเมจทุก rest) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Dark One's Own Luck (เพิ่ม 1d10 ให้ roll ไหนก็ได้หลังเห็นผลแล้ว Cha mod ครั้ง/วัน) ใช้ได้โดยไม่เสีย action [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 5/10 (B) | Toolkit เน้นดาเมจเดี่ยว+luck+resistance เป็นหลัก ค่อนข้างแคบ = เท่า baseline |

### The First Vampire Patron (GrimHollowPG24)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ Survivability กระโดด +4 และขยับขึ้นอีก 4 axis พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Drain Life (bonus action โจมตีซ้ำได้ทุกเทิร์นหลัง Attack/Magic action สเกลดาเมจตาม spell slot ที่แลก) บวก Eternal Night (lv14, extra 1d8 Necrotic ฟรีทุกครั้งที่ใช้ Drain Life) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | Drain Life ฮีลตัวเองเท่ากับดาเมจที่แลก slot ไป บวก Eternal Night (ฮีล 1d6/เทิร์น) บวก Eldritch Appetite (lv10, kill ผ่าน Drain Life คืน spell slot) เป็น sustain loop ที่ครบวงจร [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Drain Life เป็น bonus action หลัง Attack/Magic action = ได้การโจมตีเพิ่มฟรีทุกเทิร์นโดยไม่เสีย action หลัก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Creature of the Night (lv6, Polymorph ตัวเองเป็น Bat/Rat/Wolf ฟรี Cha mod ครั้ง/วัน) เป็นเครื่องมือแปลงร่างสำรวจ/แทรกซึมที่หลากหลาย [M:3/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ผสมดาเมจ+lifesteal+shapeshift utility ในตัวเดียว [M:2/4] [R:2/3] [B:2/3] |

### The Genie (TCE 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility เป็น S ใหม่ บวก Versatility กระโดด +3 และ Support ขยับบางส่วน (0→4) กว้างมาก


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Genie's Wrath (extra ดาเมจ=prof bonus ทุกเทิร์นที่ตีโดน) บวก Limited Wish (lv14, ขอคาถาระดับ 6 หรือต่ำกว่าได้ทุกชนิด 1 ครั้ง/1d4 long rests รวมคาถาดาเมจแรงๆ) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Limited Wish สามารถขอคาถา control ได้เช่นกัน แต่เป็นทรัพยากรหายาก (1/1d4 long rests) ไม่ reliable พอ = เท่า baseline |
| **Support** | 4/10 (C) | Sanctuary Vessel (lv10, พาทีมสูงสุด 5 คนเข้า vessel ได้ short rest ฟรี+ฮีล Hit Dice โบนัส) เป็น support ที่ break เหนือ baseline ชัดเจน |
| **Survivability** | 5/10 (B) | Bottled Respite (หลบเข้า vessel ส่วนตัว) บวก Elemental Gift (lv6, resistance ธาตุตามประเภท genie) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Elemental Gift ให้ fly speed ฟรีด้วย bonus action, Genie's Wrath ไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 9/10 (S) | Bottled Respite (ที่หลบภัยส่วนตัว) + Sanctuary Vessel (ที่หลบภัยทีม+short rest ฟรี) + Limited Wish (ขอผลคาถาใดก็ได้ระดับ 6 หรือต่ำกว่า) เป็นชุด utility ที่ทรงพลังที่สุดในบรรดา class นี้ [M:4/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Limited Wish เพียงตัวเดียวทำให้ subclass นี้ยืดหยุ่นที่สุดในเชิงกลไก (ขอผลคาถาอะไรก็ได้ตามสถานการณ์) [M:3/4] [R:2/3] [B:3/3] |

### The GM (VSS 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดด +5 (0→5, D→B) บวก Survivability/Versatility ขยับตาม ไม่มี axis ไหนถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | OP Class Feature (lv14, bonus action Advantage แบบทอย 3d20 เลือกสูงสุดกับทุก attack roll/check/save เป็นเวลา 1 นาที) เป็น burst window ที่ทรงพลังมาก [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Plot Armor (lv10, temp HP=level+Cha mod ให้ตัวเอง+ally ทุกคนทุกครั้งที่ rest) เป็น support ที่ reliable และซ้ำได้ทุก rest [M:2/4] [R:3/3] [B:0/3] |
| **Survivability** | 6/10 (B) | Plot Armor (temp HP ตัวเองด้วย) บวก Fudge The Roll (lv6, ปรับ/reroll d20 test ไหนก็ได้รวม saving throw) [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Fudge The Roll ไม่เสีย action, OP Class Feature เป็น bonus action ให้ผลต่อเนื่อง 1 นาที [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Player Character (Adv Persuasion/Deception แบบ GM-gated) เป็น utility แคบ ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 8/10 (A) | Fudge The Roll (แก้ roll อะไรก็ได้) + OP Class Feature (Advantage ทุกอย่างชั่วคราว) เป็นเครื่องมือ meta ที่ปรับใช้ได้กับทุกสถานการณ์ [M:3/4] [R:2/3] [B:3/3] |

### The Great Old One (XPHB)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control กระโดด +3 บวกขยับขึ้นอีก 3 axis กลางๆ Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Eldritch Hex (Hex เตรียมไว้ตลอด+เพิ่ม Disadvantage save) บวก Create Thrall (lv14, Summon Aberration ไม่ต้อง Concentration+ดาเมจ Psychic โบนัสจาก Hex) เป็น damage-debuff engine ที่ยั่งยืน [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Clairvoyant Combatant (lv6, บังคับเป้าที่ผูก telepathy มี Disadvantage ตีคนอื่น+ตัวเองมี Advantage) บวก Eldritch Hex (Disadvantage save ต่อเนื่อง) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | Awakened Mind เป็น utility ส่วนตัว ไม่ใช่ support ทีม |
| **Survivability** | 4/10 (C) | Thought Shield (lv10, กัน telepathy+resist Psychic+สะท้อนดาเมจ Psychic) [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Create Thrall ให้ summon ไม่ต้อง Concentration = ปลดล็อก concentration slot ไปใช้คาถาอื่นพร้อมกันได้ [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Awakened Mind (telepathy ระยะไกลตาม Cha mod ไมล์) เป็น utility ที่มีประโยชน์แต่ไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Versatility** | 7/10 (A) | Psychic Spells (สลับดาเมจทุกคาถาเป็น Psychic บายพาส resist ทั่วไป + cast Enchant/Illusion ไม่ใช้ V/S component) เพิ่มความยืดหยุ่นเชิงกลไก [M:2/4] [R:2/3] [B:3/3] |

### The Hexblade (XGE 🕰️)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ แต่ breadth แคบ (แค่ Survivability/AE ขยับตามเล็กน้อย) Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Hexblade's Curse (bonus action ทุกเทิร์น +prof bonus ดาเมจ + crit range 19-20 ต่อเป้าที่สาป) เป็นบัฟดาเมจเดี่ยวที่ทรงพลังต่อเนื่องตลอดการต่อสู้ [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ (Curse เป็นบัฟดาเมจ ไม่ใช่ control) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 5/10 (B) | Armor of Hexes (lv10, reaction 50% โอกาสให้ attack จากเป้าที่สาปพลาดอัตโนมัติ) + ฮีลตัวเองตอนเป้าที่สาปตาย [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Hexblade's Curse เป็น bonus action บวก Accursed Specter (lv6, สร้างนักสู้เพิ่มฟรี 1/วัน) [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Hex Warrior (medium armor/shield/martial weapon prof + Cha สำหรับอาวุธ melee) เป็นการเสริม chassis นักสู้ ไม่ใช่ utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | Hex Warrior เปิดทาง melee-caster hybrid บวก Accursed Specter (นักสู้เสริม) เป็น breadth ปานกลาง [M:2/4] [R:2/3] [B:2/3] |

### The Legacy (VSS 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Support กระโดดจาก 0 เป็น 7 (D→A) — สองจุดแข็งใหญ่พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Battle Dice เพิ่มดาเมจทุกครั้งที่ตีโดน (สเกล 4d10 ที่ lv19) บวก Final Legacy (lv14, ยิงลำแสงสูงสุด 30d10 Force โดยให้ทีมช่วยชาร์จ) เป็น damage kit ที่ magnitude สูงที่สุดในบรรดา class นี้ [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 7/10 (A) | Resolute Legacy (lv6, aura Adv death save+fear save+ฮีล ally ด้วย battle die) บวก Aura of Legend (lv10, resistance ให้ทั้งทีม) บวก Final Legacy (ally ช่วยชาร์จการโจมตีได้) เป็นชุด team-support ที่ผิดปกติสำหรับ Warlock [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 5/10 (B) | Relic of Transformation (AC=10+Dex+Cha มักสูงกว่าปกติ) บวก Resolute Legacy's Adv death saves [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Battle Dice ดาเมจไม่เสีย action เพิ่ม แต่ transform ยังเสีย bonus action ปกติ = เท่า baseline |
| **Utility** | 7/10 (A) | Relic of Transformation ปิดบังตัวตน (ไม่ถูกจำได้ยกเว้น truesight) เป็น utility แคบ ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 7/10 (A) | รวม nova-damage, party-wide support aura, และ resistance เข้าด้วยกันในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### The Magician (VSS 🕰️)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility และ Versatility เป็น S ใหม่ทั้งคู่ (Versatility กระโดด +4) แม้ Support จะยังเป็น 0 เต็มก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Alakazam's Transmute เข้าถึงคาถาดาเมจจาก Wizard list ได้ทุกโรงเรียน แต่ต้องผ่าน Cha check (DC 12+ระดับ) ที่มีโอกาสล้มเหลวทั้งคาถา = ใกล้เคียง baseline |
| **Control** | 5/10 (B) | Transmute เข้าถึงคาถา control จาก Wizard list ได้เช่นกัน แต่ risk เดียวกัน = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 4/10 (C) | Impressive Escape (lv6, bonus action blink-teleport ไปที่ที่ไม่มีใครเห็น 1/rest) เป็นเครื่องมือหนีที่มีประโยชน์ [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action สุทธิ (Alakazam/Abracadabra ใช้ resource แทน action ปกติ) = เท่า baseline |
| **Utility** | 9/10 (S) | Abracadabra (cast cantrip ใดก็ได้จาก Wizard list ผ่าน DC10 check) + Alakazam (Conceal=cast ไม่ใช้ component, Transmute=สลับเป็นคาถา Wizard ใดก็ได้) + Master of Illusions (lv14, Silent Image+Major Image ฟรีตลอดเวลา Concentration 2 คาถาพร้อมกัน) เป็นชุด utility ที่กว้างที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | การเข้าถึง spell list เต็มของ Wizard (ทุกระดับ ทุกโรงเรียน ผ่าน skill check) เป็นกลไกที่ยืดหยุ่นที่สุดในบรรดา subclass ของ class นี้ทั้งหมด [M:3/4] [R:3/3] [B:3/3] |

### The Parasite Patron (GrimHollowPG24)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control เป็น S ใหม่ (กระโดด +4) บวก Survivability กระโดด +5 และขยับขึ้นอีก 3 axis กว้างมาก แม้ Support จะยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Spawn Pawn's backlash (ดาเมจ Psychic เมื่อเป้า save ผ่าน Dominate Person) เป็น damage เสริมเล็กน้อยเท่านั้น = ใกล้เคียง baseline |
| **Control** | 9/10 (S) | Spell Siphon (reaction ขโมย spell จากศัตรู + ห้าม cast อีกครั้งนาน 8 ชั่วโมง) บวก Spawn Pawn (lv10, Dominate Person เตรียมไว้ตลอด+cast ฟรี+Concentration ทำลายไม่ได้) เป็นชุด disruption ที่แรงที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 8/10 (A) | Physical Specimen (บัฟกายภาพเลือกได้ Cha mod อย่าง รวม HP max เพิ่ม) + Symbiotic Sentinel (lv6, กัน surprise+Adv initiative+Adv charm/fear save) + Larval Regeneration (lv14, ล้มแล้วฟื้นเป็นปรสิตควบคุมได้ ถึงขั้นแย่งร่างใหม่ = โกงความตายได้จริง) เป็นชุด survival ที่ครบวงจรที่สุด [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Spell Siphon เป็น reaction ไม่เสีย action, Physical Specimen เป็น bonus action ที่ให้ผลยาวทั้งวัน [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Physical Specimen มีตัวเลือกครอบคลุมหลายสถานการณ์ (climb speed, jump 3x, skill bonus, darkvision) เลือกได้หลายอย่างพร้อมกันตาม Cha mod [M:3/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | เมนูบัฟ 6 แบบ + control ที่แรงที่สุด + survival-cheat เป็น breadth ที่กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### The Symbiont (VSS 🕰️)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 3 axis เล็กน้อย (Survivability/Versatility) Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Extra Attack ด้วยกรงเล็บ (Cha-based, 1d8 slashing x2 ที่ lv5) บวก Traumatic Rend (lv6, โจมตีที่ 3 ฟรีหลังตีโดน 2 ครั้ง) เปลี่ยน Warlock เป็นนักสู้ระยะประชิดเต็มตัว [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Traumatic Rend ให้เป้า Disadvantage ต่อการโจมตีใส่ตัวเอง ไม่พอยกระดับ tier = ใกล้เคียง baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 6/10 (B) | Lifedrain (lv10, ฮีล 1d4 ทุกครั้งที่กรงเล็บตีโดน ซึ่งมีถึง 2-3 ครั้ง/เทิร์น) บวก Violence After Death (lv14, สู้ต่อได้ที่ 0 HP) [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Transform เสีย bonus action แต่ให้ Extra Attack แบบ passive ตลอดไป = เท่า baseline |
| **Utility** | 7/10 (A) | ไม่มี utility feature ใหม่ (ระหว่าง transform cast คาถาไม่ได้เลยด้วยซ้ำ) = เท่า baseline |
| **Versatility** | 7/10 (A) | สลับโหมด caster (ร่ายคาถาปกติ) กับ melee brawler (กรงเล็บ Extra Attack) ได้ด้วย bonus action เดียว เป็น dual-playstyle ที่แท้จริง [M:2/4] [R:2/3] [B:3/3] |

### The Undead (VRGR 🕰️)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ Survivability กระโดด +4 และขยับขึ้นอีก 3 axis พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Grave Touched (lv6, สลับดาเมจเป็น Necrotic+เพิ่ม dice ตอน transform) บวก Necrotic Husk (lv10, ดาเมจ AoE 2d10+level ตอนใกล้ตาย) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Form of Dread's Frighten-on-hit (1 ครั้ง/เทิร์นตอน transform) [M:2/4] [R:3/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | Form of Dread (temp HP+Immune Frightened) บวก Necrotic Husk (resist/immune Necrotic ตอน transform+กันตาย 1 ครั้งด้วย AoE burst, 1/1d4 long rests) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Form of Dread เป็น bonus action, Necrotic Husk เป็น trigger อัตโนมัติไม่เสีย action = เท่า baseline |
| **Utility** | 8/10 (A) | Spirit Projection (lv14, แยกวิญญาณออกจากร่างสำรวจได้ 1 ชั่วโมง ผ่านทะลุสิ่งกีดขวาง+บิน) เป็นเครื่องมือสำรวจ/ลาดตระเวนที่ทรงพลังแม้ปลดล็อกช้า [M:3/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ดาเมจ+control+survival triad ผ่านโหมด transform เดียว + scouting tool ปลายเกม [M:2/4] [R:2/3] [B:2/3] |

### The Undying (SCAG 🕰️)

**Overall**: C — (7 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 1 axis (Survivability +3) ที่เหลือเท่า baseline หมด แคบที่สุดในกลุ่มร่วมกับ The Dead Mists


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 5/10 (B) | Among the Dead บังคับ Undead ต้อง save ก่อนโจมตีตรงเป้า เป็น soft-control ที่แคบเฉพาะ Undead = เท่า baseline |
| **Support** | 0/10 (D) | Defy Death ฮีลเฉพาะตัวเองแม้ trigger จากการ stabilize ผู้อื่น ไม่มี support จริง |
| **Survivability** | 6/10 (B) | Indestructible Life (lv14, bonus action ฮีลตัวเอง 1d8+level ซ้ำได้ 1/rest) บวก Defy Death (ฮีลตอน save ตายผ่าน) บวก Undying Nature (ไม่ต้องกิน/ดื่ม/นอน) [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Indestructible Life เป็น bonus action ปกติ = เท่า baseline |
| **Utility** | 7/10 (A) | Undying Nature (ไม่ต้องกิน/ดื่ม/นอน+แก่ช้าลง) เป็น long-term utility ที่มีประโยชน์แต่ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 5/10 (B) | Toolkit ทั้งหมดเน้น self-sustain เดี่ยว ไม่กว้าง = เท่า baseline |

### Undead Patron (RHW)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Survivability กระโดด +5 และขยับขึ้นอีก 3 axis กว้างมาก แม้ Support จะยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Arcane Necrosis (ดาเมจ Necrotic บายพาส Resistance ทั้งหมด+สลับดาเมจคาถาเป็น Necrotic) บวก Dreaded Necrosis (dice โบนัสตอน transform) เป็น damage kit ที่แรงกว่าเวอร์ชัน 2014 อย่างชัดเจนจากการบายพาส resistance [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Frightful Avatar (Frighten-on-hit ตอน transform) เหมือนเวอร์ชัน 2014 [M:2/4] [R:3/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 8/10 (A) | Necrotic Resilience + Unholy Resuscitation (กันตาย 1/rest แทน 1/1d4 long rests ของเวอร์ชัน 2014 ทำให้ reliable กว่ามาก) + Dread Resistance (lv14, resist B/P/S เพิ่ม) + Fearless Form (ล้าง Frightened เดิมด้วย) [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Form of Dread bonus action, Unholy Resuscitation trigger อัตโนมัติไม่เสีย action [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Ghostly Flight (lv14, บิน+ทะลุสิ่งกีดขวาง) + Profane Casting (ยกเว้น component ทั้งโรงเรียน Conjuration/Necromancy กว้างกว่าเวอร์ชัน 2014) [M:3/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ดาเมจ+control+survival+mobility ครบทุกมิติ เป็นเวอร์ชันที่ปรับปรุงรอบด้านกว่า The Undead 2014 [M:2/4] [R:2/3] [B:3/3] |

### Future You Patron (ValdaPlayerPack)

**Overall**: A — (14 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility เป็น S ใหม่ บวก Support กระโดด +6 (0→6, D→B) และ Survivability/Versatility ขยับตามอีก — ขยับขึ้น 6 ใน 7 axis กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Grandfather Paradox (lv14, 10d6 Psychic + Stunned 1 นาทีถ้า fail save) เป็น nova เดี่ยวที่ทรงพลัง [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Grandfather Paradox's Stun (1 นาที, save ทุกจบเทิร์น) เป็น control ที่แรงมากถ้า land ได้ [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | It Happened Like This ใช้แทนที่ D20 Test ของ **ตัวเองหรือ creature ที่เห็นก็ได้** — เท่ากับมอบ "ผลทอยที่บันทึกไว้" ให้ ally คนไหนก็ได้ในสถานการณ์วิกฤต [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | Expect an Ambush (lv10, Adv initiative + Resistance ดาเมจทุกชนิดในรอบแรกของการต่อสู้) บวก I Could Do With Fewer Scars (reaction +10 AC 2 ครั้ง/วัน) [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | I Could Do With Fewer Scars เป็น reaction ฟรี, It Happened Like This ใช้แทนที่ roll โดยไม่เสีย action เลย [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 9/10 (S) | It Happened Like This เป็นเครื่องมือ reliability สากลที่ใช้แทนที่ D20 Test อะไรก็ได้ (attack/check/save) ของใครก็ได้ที่เห็น เป็น utility ที่กว้างที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | รวม control, damage, defense, และเครื่องมือ reliability สากลเข้าด้วยกัน เป็น breadth ที่กว้างมาก [M:3/4] [R:2/3] [B:3/3] |
