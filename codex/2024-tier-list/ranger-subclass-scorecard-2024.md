# Ranger — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Ranger](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 19 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-ranger.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Ranger, 2024)

Floor 0-10 ต่อ axis ของ **Ranger เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, spellcasting ability Wis, half-caster, saving throw proficiency Str + Dex, armor proficiency light/medium/shield, weapon proficiency simple+martial, Weapon Mastery (2 ชนิด), Favored Enemy (Hunter's Mark ติดตัวฟรี cast ไม่เสีย slot 2 ครั้ง/long rest scale ตามเลเวล), Deft Explorer (lv2, Expertise 1 skill + 2 ภาษา), Fighting Style, Extra Attack (lv5), Roving (lv6, +10ft speed + climb/swim speed เท่า speed ปกติ), Expertise (lv9, อีก 2 skill), Tireless (lv10), Relentless Hunter (lv13), Nature's Veil (lv14), Precise Hunter (lv17), Feral Senses (lv18), Foe Slayer (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Extra Attack (lv5) บวก Hunter's Mark ที่ติดตัวฟรี cast ได้ 2 ครั้ง/long rest (เพิ่มขึ้นตามเลเวล) ให้ extra 1d6 ดาเมจทุกครั้งที่ตีเป้าที่ mark ไว้ (d10 ที่ lv20 จาก Foe Slayer) บวก Precise Hunter (lv17) ให้ Advantage โจมตีเป้าที่ mark — magnitude กลางๆ ไม่ถึงระดับ nova ของ Paladin/Fighter [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis เลย ต้องพึ่ง spell ที่เลือกเตรียมเอง (เช่น Ensnaring Strike) เหมือน caster ทั่วไป ไม่มีอะไรพิเศษเหนือกว่านั้น [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — Tireless (lv10) ให้ temp HP ได้แค่ตัวเอง ("give yourself") ไม่ใช่ ally |
| **Survivability** | 6/10 (B) | HD d10 + saving throw proficiency Dex (หลบ AoE ได้บ่อย) เป็นฐานกลางๆ เสริมด้วย Tireless (lv10, Magic action ให้ temp HP ตัวเอง 1d8+Wis mod ครั้งเท่า Wis mod/วัน ฟื้น long rest + ลด Exhaustion 1 ระดับทุก short rest) และ Nature's Veil (lv14, bonus action Invisible ถึงจบเทิร์นถัดไป Wis mod ครั้ง/วัน) เป็นเครื่องมือหนี/บัฟเฟอร์ HP ที่ปลดล็อกช้า (lv10+) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 4/10 (C) | Hunter's Mark cast ด้วย Bonus Action และฟรี 2 ครั้ง/long rest แรก แต่นอกจากนั้น Ranger ไม่มีฟีเจอร์ประหยัด action พิเศษติด chassis เลย (ไม่มี extra attack ผ่าน bonus action, ไม่มี free action แบบ class อื่น) [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 7/10 (A) | Deft Explorer (lv2) + Expertise (lv9) รวมเป็น Expertise 3 skill (เทียบเท่า skill-monkey ของ Rogue) บวก 2 ภาษาฟรี, Roving (lv6) ให้ climb speed + swim speed เท่ากับ speed ปกติแบบ passive ตลอดเวลา (เดินบนกำแพง/ว่ายน้ำได้เต็มความเร็ว) และ Feral Senses (lv18) ให้ Blindsight 30ft — เป็น "นักสำรวจ" ตัวจริงตามธีม class [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 3/10 (C) | Weapon Mastery สลับได้ทุก Long Rest แต่ prepared spell list สลับได้แค่ 1 คาถา/Long Rest (จำกัดเหมือน Bard/Paladin) ไม่มีจุดเลือก build แบบ binary choice เหมือน Cleric/Druid ยังคงเป็น archetype hunter/skirmisher แบบ Dex-based เดียวตายตัว [M:1/4] [R:1/3] [B:1/3] |

---

## Subclass Scoring (19)

**Class Baseline อ้างอิง**: Damage 6, Control 3, Support 0, Survivability 6, Action Economy 4, Utility 7, Versatility 3

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุแหล่งที่มา: Beast Master/Fey Wanderer/Gloom Stalker/Hunter เป็น XPHB 2024 อย่างเป็นทางการ, Green Reaper/Primordial Archer/Vermin Lord เป็น GrimHollowPG24 (`classSource: XPHB` ยืนยัน compatible 2024), Hollow Warden (RHW) และ Winter Walker (FRHoF) เป็น 2024-compatible เช่นกัน (อ้างอิง XPHB chassis), ส่วน Beastborne/Drakewarden/Freerunner/Highwayman/Horizon Walker/Monster Slayer/Spellbreaker/Swarmkeeper/Trophy Hunter/Vigilante เป็น 2014-only orphan 🕰️ (ไม่มี reprint ใน XPHB)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Beast Master | B | XPHB | 8 (A) | 3 (C) | 0 (D) | 6 (B) | 7 (A) | 7 (A) | 5 (B) |
| Beastborne | A | VSS 🕰️ | 9 (S) | 3 (C) | 0 (D) | 7 (A) | 6 (B) | 7 (A) | 6 (B) |
| Drakewarden | A | FTD 🕰️ | 9 (S) | 3 (C) | 0 (D) | 7 (A) | 7 (A) | 8 (A) | 6 (B) |
| Fey Wanderer | A | XPHB | 7 (A) | 6 (B) | 2 (D) | 7 (A) | 4 (C) | 9 (S) | 6 (B) |
| Freerunner | B | VSS 🕰️ | 7 (A) | 3 (C) | 0 (D) | 7 (A) | 6 (B) | 8 (A) | 5 (B) |
| Gloom Stalker | A | XPHB | 8 (A) | 5 (B) | 0 (D) | 8 (A) | 5 (B) | 8 (A) | 6 (B) |
| Green Reaper | S | GrimHollowPG24 | 9 (S) | 8 (A) | 0 (D) | 8 (A) | 5 (B) | 7 (A) | 8 (A) |
| Highwayman | B | VSS 🕰️ | 6 (B) | 3 (C) | 2 (D) | 7 (A) | 8 (A) | 7 (A) | 5 (B) |
| Hollow Warden | S | RHW | 8 (A) | 7 (A) | 0 (D) | 9 (S) | 6 (B) | 7 (A) | 8 (A) |
| Horizon Walker | A | XGE 🕰️ | 8 (A) | 5 (B) | 0 (D) | 8 (A) | 6 (B) | 9 (S) | 6 (B) |
| Hunter | B | XPHB | 8 (A) | 3 (C) | 0 (D) | 8 (A) | 6 (B) | 7 (A) | 6 (B) |
| Monster Slayer | A | XGE 🕰️ | 7 (A) | 7 (A) | 0 (D) | 7 (A) | 5 (B) | 8 (A) | 5 (B) |
| Primordial Archer | A | GrimHollowPG24 | 8 (A) | 6 (B) | 3 (C) | 7 (A) | 5 (B) | 8 (A) | 7 (A) |
| Spellbreaker | A | VSS 🕰️ | 7 (A) | 8 (A) | 0 (D) | 7 (A) | 4 (C) | 9 (S) | 6 (B) |
| Swarmkeeper | A | TCE 🕰️ | 7 (A) | 6 (B) | 0 (D) | 7 (A) | 5 (B) | 8 (A) | 6 (B) |
| Trophy Hunter | B | VSS 🕰️ | 7 (A) | 3 (C) | 0 (D) | 7 (A) | 6 (B) | 7 (A) | 5 (B) |
| Vermin Lord | A | GrimHollowPG24 | 8 (A) | 4 (C) | 0 (D) | 8 (A) | 8 (A) | 7 (A) | 6 (B) |
| Vigilante | A | VSS 🕰️ | 7 (A) | 5 (B) | 0 (D) | 8 (A) | 5 (B) | 9 (S) | 7 (A) |
| Winter Walker | S | FRHoF | 8 (A) | 7 (A) | 6 (B) | 8 (A) | 4 (C) | 7 (A) | 8 (A) |

---

### Beast Master (XPHB)

**Overall**: B — ขยับ 3 axis กลางๆ (Damage/Action Economy/Versatility) Support/Control/Survivability นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Primal Companion เป็นสัตว์ที่โจมตีเองได้ผ่าน Beast's Strike (สั่งด้วย bonus action) + Exceptional Training ให้ dmg เป็น Force เลือกได้ + Bestial Fury (lv11) ให้สัตว์ใช้ Beast's Strike ได้ 2 ครั้ง และตีโดนเป้าที่ mark ไว้จะได้ extra force dmg เท่ากับโบนัสของ Hunter's Mark — เท่ากับมีนักสู้เพิ่มอีกตัวเต็มๆ [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ (สัตว์คืนชีพได้ด้วย Magic action แต่ไม่ได้เพิ่ม survivability ของ Ranger เอง) = เท่า baseline |
| **Action Economy** | 7/10 (A) | สั่งสัตว์โจมตี/Dash/Disengage/Dodge/Help ได้ด้วย bonus action ทุกเทิร์น = เท่ากับได้ action เพิ่มจากนักสู้อีกตัวโดยไม่เสีย action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Share Spells (lv15) ขยาย buff ให้สัตว์แต่ไม่ใช่ utility นอกคอมแบตใหม่จริงจัง = เท่า baseline |
| **Versatility** | 5/10 (B) | เลือก stat block ได้ 3 แบบ (บก/น้ำ/ฟ้า) แต่ละแบบมี locomotion ต่างกัน ปรับ playstyle ได้บ้าง [M:2/4] [R:1/3] [B:2/3] |

### Beastborne (VSS 🕰️)

**Overall**: A — Damage เป็น S ใหม่ บวก Survivability/Action Economy/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Bestial Aspect เป็นระบบ damage pool ที่สะสมจากการตี/โดนตี แล้วปลดล็อกโบนัสดาเมจสะสม (+2 ถึง +3 ต่อ threshold, สูงสุดรวมมหาศาลที่ pool 100) บวกกรงเล็บ 1d6+Str slashing แถม extra 1d6 ที่ pool 100 — magnitude สูงมากแต่ต้องไต่ pool ก่อน [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Resistance ต่อ B/P/S แบบไม่วิเศษ (pool 20) + Relentless Bloodlust (lv15, กันตายแทนหมด HP 1/long rest) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Howling Carnage (lv11) ให้ตีด้วยกรงเล็บ 3 ครั้งแทน 2 เมื่อ pool>50 โดยไม่เสีย action เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Darkvision +30/60ft + climb speed (pool 50) ซ้ำกับ Roving baseline (lv6) เป็นส่วนใหญ่ = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | Pool system เดียวครอบคลุมทั้งดาเมจ/ต้านทาน/ความเร็ว ปรับตามสถานการณ์การต่อสู้ [M:2/4] [R:2/3] [B:2/3] |

### Drakewarden (FTD 🕰️)

**Overall**: A — Damage เป็น S ใหม่ บวกขยับขึ้นอีก 3 axis กลางๆ (Survivability/AE/Utility/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Drake Companion เป็นนักสู้เพิ่มอีกตัว (สั่งด้วย bonus action) + Drake's Breath (lv11) เป็น AoE cone 8d6→10d6 nova ที่แรงมาก (1/long rest หรือใช้ spell slot lv3+) [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Drake Mount ใช้ขี่ได้แค่ตัวเอง ไม่ใช่ feature เสริมทีม = เท่า baseline |
| **Survivability** | 7/10 (A) | Resistance ต่อ damage type ของ Draconic Essence (lv7) + Reflexive Resistance (lv15, reaction resistance ให้ตัวเองหรือ drake, Prof bonus ครั้ง/วัน) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | สั่ง drake โจมตี/ขี่เป็นพาหนะบิน ด้วย bonus action = ได้นักสู้/การเดินทางเพิ่มโดยไม่เสีย action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Thaumaturgy cantrip + Tongue of Dragons (สื่อสารกับมังกร) + drake บินเป็นพาหนะ (lv7+) = utility การเดินทาง/สื่อสารดี [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | สลับใช้ drake เป็นนักสู้/พาหนะ/AoE blaster ได้ตามสถานการณ์ [M:2/4] [R:2/3] [B:2/3] |

### Fey Wanderer (XPHB)

**Overall**: A — Utility เป็น S ใหม่ บวก Control กระโดด +3 และขยับตามอีก 2 axis แต่ Support แทบไม่ขยับ (0→2)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Dreadful Strikes ให้ extra 1d4→1d6 Psychic dmg ทุกครั้งที่ตีโดน "once per turn" แบบไม่จำกัดจำนวนครั้ง/วัน — magnitude กลางแต่ reliability สูงมาก [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Beguiling Twist (lv7) ให้ reaction บังคับเป้าในระยะ 120ft เซฟ Wis หรือโดน Charmed/Frightened 1 นาที เมื่อตัวเองหรือพวกพ้องเซฟผ่านสำเร็จ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 2/10 (D) | Misty Wanderer (lv15) พาพวกพ้อง 1 ตัวเทเลพอร์ตไปด้วยตอน cast Misty Step — support แบบแคบมาก [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Beguiling Twist ให้ Advantage เซฟกัน/หลุด Charmed/Frightened แบบถาวร — defensive tech แคบแต่ใช้ได้จริง [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | ไม่มีฟีเจอร์ประหยัด action พิเศษเพิ่มจาก baseline = เท่า baseline |
| **Utility** | 9/10 (S) | Fey Wanderer Spells ผูก Charm Person/Misty Step/Summon Fey/Dimension Door/Mislead ติดตัวถาวร บวก Fey Reinforcements (Summon Fey ฟรี 1/วัน ไม่เสีย concentration ได้) และ Misty Wanderer (Misty Step ฟรีหลายครั้ง/วัน พาเพื่อนไปด้วย) [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ผสมดาเมจ/control/mobility/summon กระจายทั่วทุกแกน [M:2/4] [R:2/3] [B:2/3] |

### Freerunner (VSS 🕰️)

**Overall**: B — ขยับ 4 axis เล็กน้อย ไม่มี peak ถึง S เลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Momentum ให้ extra 1d6→2d6 dmg บนการโจมตีถัดไปหลังเคลื่อนที่ผ่านเงื่อนไข (ทะลุช่อง/ออกจาก reach/เดิน 15ft+) ไม่จำกัดจำนวนครั้ง/วัน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Evasive Fighter (+2 AC ชั่วคราวเมื่อใช้ technique) + Nimble Dodge (lv15, reaction ขยับครึ่ง speed หนี AoE save) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Slide/Tumble/Wall Run เป็น bonus action เคลื่อนที่ฟรีไม่กินระยะเดินปกติ (Dex mod ครั้ง/วัน ไม่จำกัดใน favored terrain) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Advantage Acrobatics + ใช้ Dex แทน Str กับ Athletics ปีน/กระโดด/โหน + Wall Run (climb speed ชั่วคราว) — traversal utility ครบเครื่อง [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 5/10 (B) | โฟกัสธีมความคล่องตัว/การเคลื่อนที่เป็นหลัก breadth แคบกว่ากลุ่มผสมหลายแกน [M:2/4] [R:1/3] [B:2/3] |

### Gloom Stalker (XPHB)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis พร้อมกันแบบกลางๆ กว้างที่สุดในกลุ่มที่ไม่มี S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Dread Ambusher ให้ extra 2d6→2d8 Psychic dmg (Wis mod ครั้ง/long rest) บวก Stalker's Flurry (lv11) เพิ่มโอกาสเลือก Sudden Strike ให้ตีเป้าที่สองเพิ่ม [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Mass Fear (ตัวเลือกของ Stalker's Flurry, lv11) เป็น AoE เซฟ Wis หรือ Frightened จนต้นเทิร์นถัดไป — จำกัดจำนวนครั้งเท่า Dreadful Strike [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Iron Mind ให้ save proficiency เพิ่ม (Int/Cha เพราะมี Wis อยู่แล้ว) + Shadowy Dodge (lv15, reaction บังคับ Disadvantage การโจมตีที่เข้าใส่ + เทเลพอร์ตหนี 30ft) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Ambusher's Leap ให้ +10ft speed ฟรีเทิร์นแรกของการต่อสู้ + Shadowy Dodge เทเลพอร์ตหนีผ่าน reaction (ไม่กิน action หลัก) [M:1/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Umbral Sight ให้ Darkvision 60ft (หรือ +60ft ถ้ามีอยู่แล้ว) และ Invisible ต่อสิ่งที่มองด้วย Darkvision ขณะอยู่ในความมืดสนิท — stealth utility ที่แข็งแรงมาก [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | Stalker's Flurry เลือกได้ระหว่าง Sudden Strike (ดาเมจ) กับ Mass Fear (control) ทุกครั้งที่ trigger [M:2/4] [R:2/3] [B:2/3] |

### Green Reaper (GrimHollowPG24)

**Overall**: S — Damage เป็น S ใหม่ บวก Control และ Versatility กระโดด +5 ทั้งคู่ — สอง swing ใหญ่ที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Envenomed Attack (extra 1d4→2d4 poison, Wis mod ครั้ง/วัน) + Toxic Tradecraft (expend spell slot เพิ่ม extra 1d6 poison ทุกครั้งที่ตีโดน ไม่จำกัดครั้ง) + Stinging Application (level 5 slot) ให้ extra 5d6 dmg เพิ่มอีกชั้น — burst potential สูงมาก [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | ระบบ Toxin Effect ของ Toxic Tradecraft ให้เลือก debuff ได้หลายแบบตามระดับ spell slot ที่ใช้ (Uncoordinated=ห้าม reaction/disengage/dodge, Paraplegia=speed 0+dis Dex save, Insensate=blind+deaf, Debilitate=ห้ามฟื้น HP) — debuff-rider ที่ทรงพลังและหลากหลายที่สุดในกลุ่ม Ranger [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Poison Control ให้ resistance poison + advantage เซฟ poisoned + Protection from Poison ฟรี บวก Pain Tolerance (lv15, reaction ได้ temp HP เท่าดาเมจที่กำลังจะโดน — แทบยกเลิกการโดนตีได้) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Toxic Tradecraft trigger แบบ "no action required" ต่อยอดจากการตีปกติ = ประหยัด action ได้ดี ขณะที่ Envenomed Attack ยังต้องเสีย bonus action ทาพิษ [M:1/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Poisoner's Kit + expertise + Detect Poison and Disease ติดตัว — utility นอกคอมแบตแคบ = ใกล้เคียง baseline |
| **Versatility** | 8/10 (A) | Toxin Effect list มีตัวเลือกมากถึง 11 แบบ (5 ระดับ spell slot) ครอบคลุมทั้ง control/damage/debuff — ปรับตามสถานการณ์ได้กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### Highwayman (VSS 🕰️)

**Overall**: B — ขยับ 3 axis (Survivability/AE/Versatility) Action Economy กระโดด +4 แต่ไม่มี S และ Support/Control นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Opportunity attack ผ่าน Nobody Move! (reaction เมื่อพวกพ้อง trigger OA) และ No Seriously, Don't Move! (lv11, ตีได้ 2 ครั้งตอนทำ OA) เป็นดาเมจแบบมีเงื่อนไข ต้องพึ่งพวกพ้อง provoke ก่อน [M:2/4] [R:1/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่โดยตรง (Get Out of Dodge มี shove เป็นแค่ตัวเลือกย่อย) = เท่า baseline |
| **Support** | 2/10 (D) | Merry Confederates ให้ advantage Stealth แก่ทุกคนที่ซุ่มด้วยกัน 3+ คน — support แคบ ต้องมีเงื่อนไขจำนวนคน [M:1/4] [R:1/3] [B:0/3] |
| **Survivability** | 7/10 (A) | Get Out of Dodge (lv15) ให้เลือก 2 ผลจาก Disengage ที่อัพเกรดแล้ว (Dash ฟรี, ใช้ของ, โจมตี, shove, ครึ่งดาเมจตกและกระโดดคู่) — เครื่องมือหนีที่ยืดหยุ่นมาก [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Nobody Move! ให้ reaction โจมตีฟรีก่อนเป้าหมายขยับ + No Seriously ตี 2 ครั้งบน 1 reaction + Get Out of Dodge รวม 2 เอฟเฟกต์ฟรีเข้ากับ Disengage เดียว — ได้ action พิเศษเยอะมาก [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Vantage Point ให้ปีนโดยไม่เสียระยะเดินและปีนพื้นผิวยากได้โดยไม่ต้องทอย — traversal utility แคบ = ใกล้เคียง baseline |
| **Versatility** | 5/10 (B) | ธีมพึ่งพาทีมชัดเจน (reaction ผูกกับการกระทำของพวกพ้อง) breadth แคบกว่ากลุ่มที่ครอบคลุมหลายแกนเอง [M:2/4] [R:1/3] [B:2/3] |

### Hollow Warden (RHW)

**Overall**: S — Survivability พุ่งเป็น 9 (S) บวก Control กระโดด +4 และ Versatility กระโดด +5 — กว้างและแรงพร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Steel Wind Strike (ผูกติดตัว lv17) เป็นสเปลล์เทเลพอร์ตตีหลายเป้า + Ominous Strikes (lv15, extra dmg เท่า Wis mod ต่อเป้า Frightened) + Prowling Retribution (opportunity attack ฟรีเมื่อศัตรูใกล้ตัวทำดาเมจ) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Unnerving Aura (AoE เซฟ Wis หรือ Frightened ทุกเทิร์นขณะแปลงร่าง) + Menacing Aura (lv11, เป้าที่เซฟพลาดห้ามฟื้น HP/ใช้ reaction) + Dominate Beast ผูกติดตัวถาวร (lv13) [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | บัฟทั้งหมดของ Wrath of the Wild เป็นแบบ self-only ไม่มี feature เสริมทีม = เท่า baseline |
| **Survivability** | 9/10 (S) | Ancient Armor (+1→+2 AC ขณะแปลงร่าง) + Hungering Might (bonus Con save + ฟื้น HP เมื่อ Bloodied ขณะแปลงร่าง) + Persistent Wrath (lv15, กันตายที่ 0 HP กลายเป็น 2×level HP แทน) + Timeless (immune Exhaustion) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Prowling Retribution ให้ opportunity attack ฟรีทุกครั้งที่ศัตรูใกล้ตัวทำดาเมจใคร โดยไม่กิน action/reaction ปกติของ OA [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Alter Self + Phantom Steed เป็น utility นอกคอมแบตพอประมาณ แต่ฟีเจอร์หลักเน้นคอมแบตล้วน = ใกล้เคียง baseline |
| **Versatility** | 8/10 (A) | Wrath of the Wild แปลงร่างเดียวครอบคลุมทั้งดาเมจ/control/survivability/tank พร้อมกัน = breadth กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### Horizon Walker (XGE 🕰️)

**Overall**: A — Utility เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis กลางๆ (Damage/Control/Survivability/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Planar Warrior (bonus action mark, extra 1d8→2d8 Force dmg ตีครั้งถัดไป ไม่จำกัดครั้ง/วัน) + Distant Strike (lv11, ตีเป้าที่ 3 เพิ่มถ้าโจมตี 2 เป้าต่างกัน) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Horizon Walker Magic ผูก Banishment ติดตัวถาวร (lv13) — hard-CC สเปลล์ระดับสูงแต่ใช้ได้ครั้งเดียวต่อ slot [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Spectral Defense (lv15, reaction resistance ต่อดาเมจทั้งหมดจากการโจมตีนั้น ไม่จำกัดจำนวนครั้ง/วัน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Distant Strike เทเลพอร์ต 10ft ก่อนแต่ละครั้งที่โจมตี (ระหว่าง Attack action เดิม) + Ethereal Step (bonus action cast Etherealness ฟรี 1/rest) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Detect Portal + สเปลล์ list แข็งแรงมาก (Misty Step/Haste/Teleportation Circle) + Ethereal Step (escape/scout ข้ามมิติ) [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ผสมดาเมจ/control/mobility ข้ามระนาบในธีมเดียว [M:2/4] [R:2/3] [B:2/3] |

### Hunter (XPHB)

**Overall**: B — ขยับ 3 axis กลางๆ (Damage/Survivability/AE/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hunter's Prey เลือก Colossus Slayer (extra 1d8 ต่อเป้าที่เสีย HP) หรือ Horde Breaker (ตีเป้าที่สองฟรี) แบบไม่จำกัดครั้ง สลับได้ทุก short/long rest บวก Superior Hunter's Prey (lv11) ให้ Hunter's Mark โดนเป้าที่สองด้วย [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Defensive Tactics เลือก Escape the Horde/Multiattack Defense แบบ always-on ไม่จำกัดครั้ง + Superior Hunter's Defense (lv15, reaction resistance ดาเมจประเภทที่โดน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Horde Breaker ให้ตีเป้าที่สองฟรีในการ Attack action เดิม โดยไม่เสีย bonus action หรือทรัพยากรใดๆ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Hunter's Lore ให้รู้ immunity/resistance/vulnerability ของเป้าที่ mark — utility นอกคอมแบตแคบ = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | Hunter's Prey/Defensive Tactics สลับตัวเลือกได้ทุกรอบพัก ปรับ build ตามสถานการณ์ [M:2/4] [R:2/3] [B:2/3] |

### Monster Slayer (XGE 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ Control กระโดด +4 และขยับขึ้นอีก 4 axis พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Slayer's Prey (bonus action mark, extra 1d6 dmg ครั้งแรกที่ตีโดนแต่ละเทิร์น จนกว่าจะพัก) เป็น magnitude กลางแต่ reliable ตลอดการต่อสู้ [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Magic-User's Nemesis (lv11, reaction ยับยั้งสเปลล์/เทเลพอร์ตของศัตรูในระยะ 60ft, เซฟ Wis) + สเปลล์ list ที่มี Banishment และ Hold Monster ติดตัวถาวร [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Supernatural Defense (+1d6 เซฟ/หลุด grapple เมื่อโดน prey บังคับ) + Slayer's Counter (lv15, reaction ตีโต้กลับก่อนเซฟ ถ้าตีโดน เซฟสำเร็จอัตโนมัติ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Slayer's Counter ให้โจมตีผ่าน reaction เมื่อถูกบังคับเซฟ — action พิเศษที่มีเงื่อนไข [M:2/4] [R:1/3] [B:2/3] |
| **Utility** | 8/10 (A) | Hunter's Sense (รู้ resistance/immunity, Wis mod ครั้ง/วัน) + สเปลล์ list (Zone of Truth/Magic Circle/Banishment/Hold Monster) ครอบคลุมทั้งข้อมูลและ utility คอมแบต [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 5/10 (B) | ผสม control/damage/defense รอบธีม "prey" เป้าเดียว breadth ปานกลาง [M:2/4] [R:1/3] [B:2/3] |

### Primordial Archer (GrimHollowPG24)

**Overall**: A — ขยับขึ้น 6 ใน 7 axis พร้อมกัน (Control/Support/Survivability/AE/Utility/Versatility) กว้างที่สุดในกลุ่มที่ไม่มี S peak


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Elemental Arrows (extra 1d6 dmg, Wis mod ครั้ง/วัน) + Witching Arrows (lv11, ดาเมจสเกลตาม spell slot ที่ใช้) + Primordial Magic (lv15, bonus action ดาเมจเดี่ยว 6d6, Wis mod ครั้ง/วัน) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Witching Arrows ให้เลือก Entangling Shot (Restrained) หรือ Hexing Shot (Charmed/Frightened) โดยแลกกับ spell slot [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | Herbal Lore ใช้ stabilize/ฟื้น 1 HP ให้พวกพ้องที่หมดสติได้ 1/rest — support จริงแต่แคบ [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Weave the Elements ให้ resistance ธาตุที่เลือก (1/long rest) + Primordial Magic ทำให้ดาเมจไม่ทำลาย Concentration ของสเปลล์ Ranger [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Witching Arrows trigger แบบ "no action required" ต่อยอดจากการยิงปกติ [M:1/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Herbalism Kit + สเปลล์ list ที่มี Polymorph และ Wall of Stone ติดตัวถาวร — utility/control นอกคอมแบตแข็งแรง [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | เลือกธาตุได้ 5 แบบ + Witching Arrows 4 เอฟเฟกต์ต่างกัน ปรับตามสถานการณ์ได้กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Spellbreaker (VSS 🕰️)

**Overall**: A — Utility เป็น S ใหม่ บวก Control กระโดด +5 และขยับตามอีก 2 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Antimagic Strike (bonus action once/turn, extra 1d6→2d6 Force dmg เพิ่มเป็น 2d6 ถ้าเป้ากำลัง Concentration) + Arcane Burst (lv11, AoE nova จาก spell slot) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Antimagic Strike กด suppress สเปลล์/ไอเทมเวทของเป้าระหว่างโจมตี + Counterspell ติดตัวถาวร + Antimagic Curse (lv15, antimagic field เคลื่อนที่ตามเป้าได้ 1 นาที) — anti-caster toolkit ที่แข็งแกร่งที่สุดในกลุ่ม [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Spell Resistance (lv7, Advantage เซฟต้านสเปลล์ทุกชนิด แบบ always-on) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | ไม่มีฟีเจอร์ประหยัด action พิเศษเพิ่มจาก baseline = เท่า baseline |
| **Utility** | 9/10 (S) | Detect Magic + See Invisibility + Scrying ติดตัวถาวร — utility ตรวจจับ/สอดแนมครบวงจร [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีมโฟกัส anti-magic ชัดเจน breadth แคบกว่าแม้แต่ละเครื่องมือจะแรง [M:2/4] [R:2/3] [B:2/3] |

### Swarmkeeper (TCE 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis พร้อมกันแบบกลางๆ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Gathered Swarm ให้เลือก extra 1d6→1d8 piercing dmg ทุกครั้งที่ตีโดน (once/turn ไม่จำกัดครั้ง/วัน) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Gathered Swarm เลือกดันเป้า 15ft (เซฟ Str) แทนดาเมจได้ บวก Mighty Swarm (lv11) เพิ่ม Prone ให้เป้าที่เซฟพลาด + สเปลล์ list มี Web/Insect Plague [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | Gathered Swarm ทุกทางเลือกกระทบแค่ตัวเองหรือศัตรู ไม่มีที่เสริมพวกพ้อง = เท่า baseline |
| **Survivability** | 7/10 (A) | Writhing Tide (bonus action บินได้ 10ft, Prof bonus ครั้ง/วัน) + Swarming Dispersal (lv15, reaction resistance + เทเลพอร์ตหนี 30ft, Prof bonus ครั้ง/วัน) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Gathered Swarm trigger อัตโนมัติหลังตีโดนไม่เสีย action เพิ่ม แต่ Writhing Tide ยังต้องเสีย bonus action [M:1/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Mage Hand cantrip + สเปลล์ list (Faerie Fire/Gaseous Form/Arcane Eye/Insect Plague) ครอบคลุมทั้งสอดแนมและ utility คอมแบต [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | Gathered Swarm เลือกได้ 3 ทาง (ดาเมจ/ดันเป้า/ดันตัวเอง) ทุกครั้งที่ตีโดน [M:2/4] [R:2/3] [B:2/3] |

### Trophy Hunter (VSS 🕰️)

**Overall**: B — ขยับ 3 axis กลางๆ (Damage/Survivability/AE/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Trophy ให้ +2 dmg ต่อเป้าประเภทตรง (แคบ) + Visceral Attack (1/rest, ดาเมจ dice สูงสุดทันที) + Fell The Leviathan (lv11, ตีเพิ่มต่อเป้า Large+) — magnitude ดีแต่มีเงื่อนไขหลายชั้น [M:3/4] [R:1/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Trophy ให้ +2 AC/save ต่อเป้าประเภทตรง (แคบ) + Clever Wrestler (หลุด grapple ฟรีด้วย bonus action) + Masterful Sidestep (lv15, reaction หนีครึ่ง speed เมื่อโดนตี) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Clever Wrestler หลุด grapple + ขยับ 5ft ฟรีด้วย bonus action ไม่ยั่วยุ OA + Masterful Sidestep ขยับฟรีผ่าน reaction [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | ไม่มี utility นอกคอมแบตใหม่ (ทุกฟีเจอร์เน้นคอมแบตล้วน) = เท่า baseline |
| **Versatility** | 5/10 (B) | ธีม "ล่าเป้าเดี่ยวตัวใหญ่" ชัดเจน breadth แคบกว่ากลุ่มผสมหลายแกน [M:2/4] [R:1/3] [B:2/3] |

### Vermin Lord (GrimHollowPG24)

**Overall**: A — Action Economy กระโดด +4 บวกขยับขึ้นอีก 3 axis กลางๆ (Damage/Survivability/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Verminkin summon swarm หลายตัวตามระดับ spell slot ที่ใช้ (สั่งด้วย bonus action) + Swarming Strikes (ให้ swarm ทั้งหมดโจมตีพร้อมกันหรือ swarm เดียวตี 2 ครั้ง) — ดาเมจสเกลตามการลงทุน slot [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | Infectious Spread (lv11) ติด Poisoned ให้เป้าที่โดน swarm ตีในวงกว้าง — control แบบเบา [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Filth and Fortitude (immune Poisoned + Con save proficiency) + Strength of the Swarm (lv15, reaction เบนดาเมจไปให้ swarm ที่ควบคุมแทน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Swarming Strikes สั่ง swarm หลายตัวโจมตีพร้อมกันด้วย bonus action เดียว — ยิ่งลงทุน slot สูงยิ่งได้ action คุ้มค่ามาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Verminkin สื่อสารกับ Tiny Beast ได้ + สเปลล์ list มี Freedom of Movement — utility นอกคอมแบตพอประมาณ = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | จำนวน swarm สเกลตาม spell slot level (1-9 ตัว) ปรับการลงทุนตามสถานการณ์ได้ [M:2/4] [R:2/3] [B:2/3] |

### Vigilante (VSS 🕰️)

**Overall**: A — Utility เป็น S ใหม่ บวก Versatility กระโดด +4 และขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Hand-To-Hand ให้หมัดสเกลดาเมจ (1d6→1d12) + extra die ด้วย bonus action + Biff! Bam! Pow! (lv11, ตี 2 ครั้งแทน 1 ด้วย disadvantage) + Catchphrase (+Wis mod ดาเมจชั่วคราว) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Flashbang (lv7, bonus action AoE 5ft ห้ามศัตรูใกล้ตัวใช้ reaction จนเทิร์นถัดไป) — ปิดกั้น OA/reaction ของศัตรูรอบตัว [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Masked Persona (AC = 10+Wis+Dex ตอนไม่สวมเกราะ) + Catchphrase! (lv15, resistance ดาเมจทั้งหมดชั่วคราว trigger ง่ายจากการตีโดน/ชนะ check/เซฟผ่าน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) | Hand-To-Hand เพิ่ม die ดาเมจด้วย bonus action + Flashbang เป็น bonus action AoE control [M:1/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Heroic Magic ผูก Fly และ Passwall ติดตัวถาวร (lv9, lv17) บวก Private Sanctum — utility mobility/exploration ระดับสูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสม brawler/control/defense/mobility ในตัวเดียว breadth กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Winter Walker (FRHoF)

**Overall**: S — Support กระโดดจาก 0 เป็น 6 (D→B) — แก้จุดอ่อนใหญ่สุดของ baseline บวก Control กระโดด +4 และ Versatility กระโดด +5 กว้างและแรงพร้อมกันที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Frigid Explorer ให้ extra 1d4→1d6 Cold dmg ไม่จำกัดครั้ง/วัน (ไม่โดน resistance) + Frozen Haunt (lv15, AoE emanation 2d4 Cold ทุกเทิร์นขณะ Hunter's Mark ติด) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Hunter's Rime ห้ามเป้าที่ mark ใช้ Disengage + สเปลล์ list เน้น control (Hold Person/Ice Storm/Cone of Cold) ติดตัวถาวร [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | Fortifying Soul (lv7, action ฟื้น HP 1d10+level + Advantage เซฟ Frightened ให้พวกพ้อง Wis mod คน, 1/long rest) — ฮีล/บัฟทีมจริงจัง [M:3/4] [R:1/3] [B:2/3] |
| **Survivability** | 8/10 (A) | Resistance Cold + Hunter's Rime ให้ temp HP 1d10+level ทุกครั้งที่ cast Hunter's Mark + Frozen Haunt (immune Cold + immune Grappled/Prone/Restrained ชั่วคราว) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | ไม่มีฟีเจอร์ประหยัด action พิเศษเพิ่มจาก baseline = เท่า baseline |
| **Utility** | 7/10 (A) | Remove Curse ติดตัวถาวรเป็น utility แคบ ฟีเจอร์ส่วนใหญ่เน้นคอมแบต = ใกล้เคียง baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/support/survivability ครบทุกแกนในธีมความหนาวเดียว — breadth กว้างที่สุดในกลุ่ม Ranger [M:3/4] [R:2/3] [B:3/3] |
