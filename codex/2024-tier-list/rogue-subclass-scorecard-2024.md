# Rogue — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Rogue](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 19 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-rogue.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Rogue, 2024)

Floor 0-10 ต่อ axis ของ **Rogue เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Dex + Int, armor proficiency light เท่านั้น, weapon proficiency simple + finesse/light martial, Weapon Mastery (2 ชนิด), Expertise (2 skill lv1 + 2 skill lv6 = 4 รวม), Sneak Attack (1d6 lv1 → 10d6 lv20, ครั้งเดียว/เทิร์น ต้อง Advantage หรือมี ally ประกบเป้า, จำกัดแค่ finesse/ranged weapon), Thieves' Cant, Cunning Action (lv2, Dash/Disengage/Hide เป็น Bonus Action ฟรี), Steady Aim (lv3), Cunning Strike (lv5, แลก dice Sneak Attack เป็น Poison/Trip/Withdraw), Uncanny Dodge (lv5), Evasion (lv7), Reliable Talent (lv7), Improved Cunning Strike (lv11), Devious Strikes (lv14, Daze/Knock Out/Obscure), Slippery Mind (lv15), Elusive (lv18), Stroke of Luck (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sneak Attack สเกลจาก 1d6 (lv1) เป็น 10d6 (lv20) — extra damage dice ก้อนเดียวที่โตที่สุดในเกม แต่ต้องมี Advantage หรือ ally อยู่ประกบเป้าภายใน 5ft ถึงจะ trigger ได้ และใช้ได้แค่ครั้งเดียว/เทิร์นกับอาวุธ finesse/ranged เท่านั้น [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 4/10 (C) | Cunning Strike (lv5) ให้แลก die ของ Sneak Attack เป็น Trip (ล้ม prone) หรือ Withdraw (หนีฟรี) และ Devious Strikes (lv14) เพิ่ม Daze/Knock Out (สลบจริง!)/Obscure (ทำให้ตาบอดชั่วคราว) เป็น control ที่หลากหลายแต่ต้อง**แลกดาเมจ**ทุกครั้ง (opportunity cost ตรงๆ) และปลดล็อกช้า (lv5/lv14) [M:2/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — chassis เน้นตัวเองล้วนๆ |
| **Survivability** | 6/10 (B) | Uncanny Dodge (lv5, reaction ลดดาเมจการโจมตีที่โดนลงครึ่งหนึ่ง ใช้ได้ไม่จำกัดครั้ง/วันตราบเห็นผู้โจมตี) + Evasion (lv7, save AoE ผ่านไม่โดนดาเมจเลย) + Elusive (lv18, ห้ามศัตรูมี Advantage ใส่เราเลยนอกจากเรา Incapacitated) เป็นชุดป้องกันที่ครบแต่ทยอยปลดล็อกช้า (เต็มรูปแบบต้อง lv18) HD d8 กลางๆ ไม่มี armor หนัก [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Cunning Action (lv2) แปลง Dash/Disengage/Hide เป็น Bonus Action **ฟรีไม่จำกัดจำนวนครั้ง/เทิร์น ไม่กิน resource เลย** เป็นเครื่องมือ mobility/stealth ที่ดีที่สุดในเกมสำหรับ non-caster และ Cunning Strike ให้ Sneak Attack แปลงเป็น control/utility ได้โดยไม่ต้องเสีย action เพิ่มเลย (แค่แลก dice) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Expertise รวม 4 skill (2 ที่ lv1 + 2 ที่ lv6) บวก Reliable Talent (lv7) ที่ทำให้ roll d20 ≤9 ในทุก skill/tool check ที่ proficient นับเป็น 10 แทน (ตัดโอกาสพลาดแบบสุ่มทิ้งเกือบหมด) เป็นชุด skill-monkey ที่ reliability สูงมาก แม้จะช่วยได้แค่ skill ที่ proficient อยู่แล้ว (แคบกว่า Jack of All Trades ของ Bard ที่ช่วยได้ทุก skill) [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Cunning Strike ให้เมนูแปลง Sneak Attack dice เป็นเอฟเฟกต์ต่างสาย (Poison/Trip/Withdraw ที่ lv5 → Daze/Knock Out/Obscure ที่ lv14) รวม 6 ตัวเลือกที่ trigger ได้ทุกครั้งที่ Sneak Attack ทำงาน (อย่างน้อย 1 ครั้ง/เทิร์นในไฟต์ส่วนใหญ่) ทำให้ resource เดียวปรับไปทางดาเมจ/control/utility ได้ตามสถานการณ์ บวก Weapon Mastery สลับได้ทุก Long Rest [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (19)

**Class Baseline อ้างอิง**: Damage 7, Control 4, Support 0, Survivability 6, Action Economy 7, Utility 7, Versatility 6

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้นหรือ feature ที่มีแคบเกินกว่าจะขยับคะแนนรวม) หมายเหตุแหล่งที่มา: Arcane Trickster/Assassin/Soulknife/Thief เป็น XPHB 2024 อย่างเป็นทางการ, Scion of the Three (FRHoF) เป็น 2024-compatible, Phantom ใช้เวอร์ชัน RHW (reprint จาก TCE, 2024-compatible), Highway Rider/Misfortune Bringer/Sanguine Thief เป็น GrimHollowPG24 (2024), Arachnoid Stalker ใช้เวอร์ชัน ValdaPlayerPack (`classSource: XPHB` ยืนยัน compatible 2024), ส่วน Inquisitive/Mastermind/Scout/Swashbuckler (XGE) และ Enforcer/Grifter/Shadow Master/Temporal Trickster/Titan Slayer (VSS) เป็น 2014-only orphan 🕰️ (ไม่มี reprint ใน XPHB — ยืนยันแล้วว่าไฟล์ VSS 2024 ไม่มี Rogue subclass เหล่านี้)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Arachnoid Stalker | S | ValdaPlayerPack | 8 (A) | 8 (A) | 0 (D) | 8 (A) | 7 (A) | 9 (S) | 8 (A) |
| Arcane Trickster | A | XPHB | 7 (A) | 6 (B) | 0 (D) | 6 (B) | 7 (A) | 9 (S) | 7 (A) |
| Assassin | B | XPHB | 9 (S) | 4 (C) | 0 (D) | 6 (B) | 7 (A) | 8 (A) | 6 (B) |
| Enforcer | B | VSS 🕰️ | 7 (A) | 6 (B) | 0 (D) | 7 (A) | 7 (A) | 7 (A) | 7 (A) |
| Grifter | C | VSS 🕰️ | 7 (A) | 4 (C) | 0 (D) | 7 (A) | 7 (A) | 7 (A) | 6 (B) |
| Highway Rider | A | GrimHollowPG24 | 8 (A) | 4 (C) | 0 (D) | 8 (A) | 8 (A) | 8 (A) | 6 (B) |
| Inquisitive | B | XGE 🕰️ | 8 (A) | 4 (C) | 0 (D) | 6 (B) | 7 (A) | 9 (S) | 6 (B) |
| Mastermind | A | XGE 🕰️ | 7 (A) | 4 (C) | 6 (B) | 7 (A) | 7 (A) | 8 (A) | 6 (B) |
| Misfortune Bringer | C | GrimHollowPG24 | 7 (A) | 6 (B) | 0 (D) | 6 (B) | 7 (A) | 7 (A) | 7 (A) |
| Phantom | C | RHW | 7 (A) | 4 (C) | 0 (D) | 8 (A) | 7 (A) | 8 (A) | 6 (B) |
| Sanguine Thief | S | GrimHollowPG24 | 8 (A) | 4 (C) | 0 (D) | 8 (A) | 8 (A) | 9 (S) | 8 (A) |
| Scion of the Three | A | FRHoF | 8 (A) | 6 (B) | 0 (D) | 7 (A) | 8 (A) | 7 (A) | 7 (A) |
| Scout | A | XGE 🕰️ | 7 (A) | 4 (C) | 4 (C) | 7 (A) | 8 (A) | 8 (A) | 6 (B) |
| Shadow Master | S | VSS 🕰️ | 8 (A) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 9 (S) | 7 (A) |
| Soulknife | S | XPHB | 8 (A) | 6 (B) | 2 (D) | 7 (A) | 9 (S) | 8 (A) | 8 (A) |
| Swashbuckler | C | XGE 🕰️ | 7 (A) | 6 (B) | 0 (D) | 7 (A) | 7 (A) | 7 (A) | 6 (B) |
| Temporal Trickster | A | VSS 🕰️ | 7 (A) | 6 (B) | 4 (C) | 7 (A) | 8 (A) | 8 (A) | 7 (A) |
| Thief | S | XPHB | 7 (A) | 4 (C) | 0 (D) | 6 (B) | 9 (S) | 9 (S) | 7 (A) |
| Titan Slayer | C | VSS 🕰️ | 7 (A) | 6 (B) | 0 (D) | 7 (A) | 7 (A) | 7 (A) | 6 (B) |

---

### Arachnoid Stalker (ValdaPlayerPack)

**Overall**: S — Utility เป็น S ใหม่ (9/10) บวก Control กระโดด +4 และขยับขึ้นอีก 3 axis พร้อมกัน กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Venomous Strike แปลง Sneak Attack die ทั้งหมดจาก d6 เป็น d8 Poison — เพิ่มดาเมจเฉลี่ยต่อ die แบบตรงไปตรงมาทุกเลเวล [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Webbing ให้ cast {@spell Web} ฟรี 2 ครั้ง/วัน (control AoE เต็มรูปแบบ) บวก Paralytic Venom (lv17, Cunning Strike option เซฟ Con พลาด = Paralyzed) — เป็น hard-CC ที่แรงมาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Spider Sense (lv13) ขยาย Uncanny Dodge ให้ใช้ลดดาเมจครึ่งได้แม้ตอนโดนบังคับเซฟ (ไม่ใช่แค่โดนโจมตี) — ต่อยอด baseline defense ให้ครอบคลุมกว้างขึ้น [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Webbing ใช้ pull ตัวเองแบบ reaction เวลาตกได้ด้วย = utility เคลื่อนที่ฟรีเสริม แต่ยังต้องเสีย bonus action หลัก = ใกล้เคียง baseline |
| **Utility** | 9/10 (S) | Webbing (ดึงตัว/หยิบของ/ทำเชือก/cast Web) + Wall Crawling (lv9, climb speed + ซ่อนบนเพดาน + spider climb มือว่าง) = traversal/utility ครบเครื่องที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/mobility/utility ในธีมแมงมุมเดียว breadth กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### Arcane Trickster (XPHB)

**Overall**: A — Utility เป็น S ใหม่ บวก Control/Versatility ขยับตามเล็กน้อย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Spell list เป็นตัวเลือกผู้เล่นเลือกเอง ไม่มี feature ดาเมจ fixed ใหม่จาก chassis = เท่า baseline |
| **Control** | 6/10 (B) | เข้าถึงสายคาถา Wizard (illusion/enchantment) เต็มรูปแบบ + Magical Ambush (lv9, บังคับ Disadvantage เซฟถ้า cast ตอน Invisible) + Spell Thief (lv17, reaction ขโมย/ยกเลิกคาถาที่โดนใส่) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Mage Hand Legerdemain cast/ควบคุมด้วย bonus action = ใกล้เคียง baseline |
| **Utility** | 9/10 (S) | Spellcasting เต็มรูปแบบ (3 cantrip + prepared list สเกลตามเลเวล ใช้ Int) เข้าถึงสาย Wizard ทั้งหมด — utility นอกคอมแบตกว้างมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสม skulduggery (Mage Hand) + illusion-utility + control spell ทำให้ toolkit กว้างกว่า Rogue ทั่วไปมาก [M:2/4] [R:2/3] [B:3/3] |

### Assassin (XPHB)

**Overall**: B — Damage เป็น S ใหม่ แต่ breadth แคบมาก มีแค่ Utility ที่ขยับตามอีกนิด Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Assassinate (Advantage โจมตีทุกเป้าที่ยังไม่ได้เทิร์นในรอบแรก + extra dmg เท่า Rogue level เมื่อ Sneak Attack โดน) + Death Strike (lv17, เซฟ Con พลาด = ดาเมจ**คูณสอง**) + Envenom Weapons (lv13, extra 2d6 poison ไม่โดน resistance) — nova รอบแรกที่แรงที่สุดในกลุ่ม Rogue [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Roving Aim ทำให้ Steady Aim ไม่ลด speed เหลือ 0 = ใกล้เคียง baseline |
| **Utility** | 8/10 (A) | Disguise Kit + Poisoner's Kit prof + Masterful Mimicry (เลียนเสียง/ลายมือคนอื่น) = social infiltration utility ที่ดี [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีมโฟกัส assassination เป้าเดียวชัดเจน breadth แคบแม้พลังจะสูง = เท่า baseline |

### Enforcer (VSS 🕰️)

**Overall**: B — ขยับแค่ 2 axis เล็กน้อย (Control/Survivability/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Double Attack (lv17, bonus action โจมตีเพิ่มรวม Sneak Attack ได้เมื่อฆ่าเป้าลง 0 HP) = เท่า baseline โดยประมาณ (เงื่อนไข "ต้องฆ่าก่อน" แคบกว่าฟีเจอร์ damage ทั่วไปในกลุ่ม) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Threatening Demeanor (lv13, เซฟ Wis พลาดตอน initiative = Frightened + Advantage โจมตีเป้านั้น) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Bonus Proficiencies ให้ proficiency เกราะกลาง — ทำลายเพดาน AC เดิมของ baseline (เกราะเบาอย่างเดียว) ได้จริง [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Massive Shove (bonus action shove 15ft หรือดึงเข้าหาด้วยอาวุธ reach) = ใกล้เคียง baseline |
| **Utility** | 7/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | Brutal Attack ให้ Sneak Attack ใช้ได้กับอาวุธ simple/martial melee ใดๆ (ไม่จำกัดแค่ finesse) บวกเกราะกลาง — ขยาย build option เกินข้อจำกัดเดิมของ baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |

### Grifter (VSS 🕰️)

**Overall**: C — ขยับแค่ 1 axis (Survivability +1) ที่เหลือเท่า baseline หมด แคบที่สุดในกลุ่มร่วมกับ Misfortune Bringer/Phantom/Swashbuckler/Titan Slayer


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Double Bluff ให้ Sneak Attack ไม่ต้องใช้ Advantage ถ้ายืนประกบระหว่างศัตรู 2 ตัว — เงื่อนไขแคบ ไม่ได้ยกระดับดาเมจโดยรวมพ้น baseline ชัดเจน [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Cut And Run (lv9, Dash ทำให้ opportunity attack ใส่คุณมี Disadvantage) = defensive mobility เล็กน้อยแต่ always-on [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Heist Plan (lv17, ใช้ Ready action ด้วย bonus action แทนการเสีย action หลัก) [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Swindle (gaming set + Cheat cantrip) + Long Con (lv13, ไม่ต้องทอย Deception กับคำโกหกที่ซ้อมไว้) = utility สังคมแคบ = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | ธีมโฟกัสหลอกลวง/สังคมชัดเจน breadth แคบ = เท่า baseline |

### Highway Rider (GrimHollowPG24)

**Overall**: A — ขยับขึ้น 4 axis กลางๆ พร้อมกัน (Damage/Survivability/AE/Utility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Ride Them Down (Sneak Attack ไม่ต้องใช้ Advantage ถ้าตัวเองหรือม้าเคลื่อนที่ 20ft+) + Hair Trigger (reaction โจมตีฟรีตอน initiative ดีไม่มี Disadvantage) + Desperado (lv17, ใช้ Hair Trigger ได้แม้ตอน 0 HP) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Horse Lord ให้ temp HP กับม้า ไม่ใช่พวกพ้องในทีม = เท่า baseline |
| **Survivability** | 8/10 (A) | True Grit (lv13, save prof Con + เซฟผ่าน half-damage effect กลายเป็นไม่โดนดาเมจเลย) + ม้าเป็นเครื่องมือหนีที่ดี [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Hair Trigger เป็น reaction ฟรีตอน initiative ดี (โจมตี/ขยับ/Dodge) + Horse Lord ให้ม้าทำ Dash/Disengage/Dodge ด้วย bonus action [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Trusty Mount ให้ Find Steed ฟรี 1/วัน (พาหนะเดินทาง) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีม mounted combat โฟกัสชัดเจน breadth ปานกลาง = เท่า baseline |

### Inquisitive (XGE 🕰️)

**Overall**: B — Utility เป็น S ใหม่ แต่ breadth แคบ มีแค่ Damage ที่ขยับตามอีกนิด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Insightful Fighting (bonus action ชนะ Insight vs Deception = Sneak Attack ไม่ต้องใช้ Advantage 1 นาที) + Eye for Weakness (lv17, +3d6 SA dmg ต่อเป้านั้น) — ปลด bottleneck ใหญ่สุดของ baseline (ความต้องการ Advantage) ได้เกือบสมบูรณ์ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Eye for Detail (bonus action Perception/Investigation) = ใกล้เคียง baseline |
| **Utility** | 9/10 (S) | Ear for Deceit (Insight floor 8) + Eye for Detail + Unerring Eye (lv13, ตรวจจับภาพลวง/shapechanger ในระยะ 30ft, Wis mod ครั้ง/วัน) = detective kit ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีมนักสืบ/single-target-enabler ชัดเจน breadth ปานกลาง = เท่า baseline |

### Mastermind (XGE 🕰️)

**Overall**: A — Support กระโดดจาก 0 เป็น 6 (D→B) — แก้จุดอ่อนใหญ่สุดของ baseline บวก Survivability/Utility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจใหม่ = เท่า baseline |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่โดยตรง = เท่า baseline |
| **Support** | 6/10 (B) | Master of Tactics ให้ใช้ Help action ด้วย bonus action **และ**ระยะไกลถึง 30ft (ไม่ต้องอยู่ประชิด 5ft) — ให้ Advantage แก่พวกพ้องได้แบบไม่จำกัดครั้ง/เทิร์น เป็น support ที่ reliable ที่สุดในกลุ่ม Rogue [M:2/4] [R:3/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Misdirection (lv13, reaction เบนการโจมตีที่จะโดนไปให้เป้าที่ให้ cover เราแทน) = defensive tech แบบมีเงื่อนไข [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Help เป็น bonus action นับเป็นการประหยัด action สำคัญแต่คุณค่าส่วนใหญ่ถูกนับใน Support แล้ว = ใกล้เคียง baseline |
| **Utility** | 8/10 (A) | Disguise/Forgery kit + gaming set + 2 ภาษา + เลียนสำเนียง + Insightful Manipulator (lv9, รู้ข้อมูลเป้าหมาย) + Soul of Deceit (lv17, กันอ่านใจ) = social utility ครบเครื่อง [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีม support/social ผสมกับ defense เล็กน้อย = เท่า baseline |

### Misfortune Bringer (GrimHollowPG24)

**Overall**: C — ขยับแค่ 2 axis เล็กน้อย (Control/Versatility) Support ยังเป็น 0 เต็ม


> **หมายเหตุข้อมูล**: รายการ "Misfortunes" เต็มรูปแบบ (คล้ายระบบ Eldritch Invocation) ไม่ปรากฏรายละเอียดในไฟล์ข้อมูลที่ดึงมา (มีแค่ชื่อระบบ Jinx Points) จึงให้คะแนน Damage/Control/Versatility แบบระมัดระวังจากฟีเจอร์ที่ยืนยันได้เท่านั้น (Evil Eye, Steal Luck, Curse Caster)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Evil Eye (bonus action มาร์กเป้าในระยะ 60ft, Sneak Attack กับเป้านั้นไม่ต้องใช้ Advantage) = อัพเกรด reliability ที่ชัดเจน [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Steal Luck (reaction ยกเลิก Advantage ของศัตรูที่กำลังจะทอย) + Curse Caster (lv13, cast Bestow Curse ด้วย Jinx Point) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ที่ยืนยันได้ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Evil Eye ยังต้องเสีย bonus action มาร์กตามปกติ = ใกล้เคียง baseline |
| **Utility** | 7/10 (A) | Curse Caster เปิดทาง Bestow Curse เป็น utility แคบ = ใกล้เคียง baseline |
| **Versatility** | 7/10 (A) | ระบบ Misfortune ให้เรียนรู้ตัวเลือกเพิ่มทุกเลเวล 9/13/17 และสลับได้ทุก Long Rest (แม้ไม่รู้รายละเอียดครบ โครงสร้างระบบยืนยันว่ากว้างคล้าย invocation) [M:2/4] [R:2/3] [B:3/3] |

### Phantom (RHW)

**Overall**: C — ขยับแค่ 2 axis (Survivability/Utility) เล็กน้อย ไม่มี peak ใหม่


> **หมายเหตุข้อมูล**: รายละเอียดของ soul trinket ทั้ง 3 แบบ (Death's Knell/Life Essence/Spirit Query) ใน Tokens of the Departed ไม่ปรากฏข้อความเต็มในไฟล์ข้อมูลที่ดึงมา (มีแค่ชื่อหัวข้อ) จึงให้คะแนน Support/Utility แบบระมัดระวังจากฟีเจอร์ที่ยืนยันได้เท่านั้น

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Wails from the Grave (Sneak Attack โดน → เป้าที่สองในระยะ 30ft โดน Necrotic เท่าครึ่งของ SA dice, Dex mod ครั้ง/วัน) + Death's Friend (lv17, โดนดาเมจนี้ทั้งสองเป้าพร้อมกัน) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | Life Essence trinket อาจมีผลเสริมทีมแต่ไม่มีรายละเอียดยืนยันในข้อมูล ให้คะแนนแบบระมัดระวัง = เท่า baseline |
| **Survivability** | 8/10 (A) | Ghost Walk (lv13, bonus action แปลงร่างวิญญาณ 10 นาที: fly speed 10ft + attack roll ใส่คุณมี Disadvantage + เดินทะลุสิ่งกีดขวางได้) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Ghost Walk เป็น bonus action เปิดบัฟยาว 10 นาที = ใกล้เคียง baseline |
| **Utility** | 8/10 (A) | Whispers of the Dead (ยืม proficiency ใดก็ได้ทุกรอบพัก) + Voice of Death (Speak with Dead ฟรี 1/รอบพัก) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีมความตายผสมดาเมจ/utility/mobility เข้าด้วยกัน = เท่า baseline |

### Sanguine Thief (GrimHollowPG24)

**Overall**: S — Utility เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน (Damage/Survivability/AE/Versatility) กว้างมาก


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Bloody Blades (lv9, crit ด้วยกริชที่สร้างไว้ = extra Necrotic dice เท่าจำนวนที่ลงทุน) + Bloodstitch (lv13, AoE 30ft nova 3d8) + Bloody Exit (lv17, reaction โจมตีฟรีเพิ่ม extra 5d8) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Steal Blood ฮีลตัวเองเมื่อ Bloodied จาก Sneak Attack + Bloody Exit (reaction, โจมตีพลาดอัตโนมัติ + เทเลพอร์ตหนี 30ft) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Bloody Exit รวมทั้งป้องกันตัว+เทเลพอร์ต+โจมตีฟรีในการ reaction เดียว [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 9/10 (S) | Spellcasting เต็มรูปแบบ (Wizard + Sangromancy spells, ใช้ Int) เข้าถึงสายเวทกว้าง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ระบบ dice pool คู่ (HD หรือ Sangromancy Dice ใช้แทนกันได้) ป้อนทั้งคาถา/ดาเมจ/ฮีล/หนี — breadth กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### Scion of the Three (FRHoF)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Bloodthirst (reaction เทเลพอร์ตหาเป้า Bloodied ในระยะ 30ft + โจมตีฟรี, Int mod ครั้ง/วัน) + Aura of Malevolence (lv13, AoE dmg เพิ่มตอนเทเลพอร์ต ไม่โดน resistance) + Dread Incarnate (lv17, SA die ที่ทอยได้ 1-2 นับเป็น 3) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Strike Fear (lv9, Cunning Strike option เซฟ Wis พลาด = Frightened + Advantage โจมตี) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Dread Allegiance ให้ resistance ดาเมจ 1 ชนิดตามเทพที่เลือก สลับได้ทุก Long Rest [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Bloodthirst เป็น reaction ฟรีที่ให้ทั้งเทเลพอร์ต+โจมตีเพิ่มทุกครั้งที่เป้าใกล้ตัว Bloodied [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Dread Allegiance แถม cantrip เล็กน้อยตามเทพที่เลือก = ใกล้เคียง baseline |
| **Versatility** | 7/10 (A) | ผสมดาเมจ/control/mobility/resistance รอบ trigger เดียว (Bloodthirst) breadth กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Scout (XGE 🕰️)

**Overall**: A — Support ขยับบางส่วน (0→4) บวก Survivability/AE/Utility ขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sudden Strike (lv17, โจมตีเพิ่มด้วย bonus action หลัง Attack action ใช้ Sneak Attack ได้) = เท่า baseline โดยประมาณ (ปลดล็อกช้ามาก) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) | Ambush Master (lv13, เป้าแรกที่ตีโดนรอบแรกโดน Advantage จาก**ทุกคน**ที่โจมตีมันจนต้นเทิร์นถัดไป) — support ทีมจริงแต่ใช้ได้แค่รอบแรกของไฟต์ [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Skirmisher (reaction ขยับครึ่ง speed ฟรีไม่โดน OA เมื่อศัตรูจบเทิร์นใกล้ตัว ไม่จำกัดครั้ง) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Skirmisher (reaction เคลื่อนที่ฟรีไม่จำกัด) + Sudden Strike (bonus action โจมตีเพิ่ม) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Survivalist (double prof Nature/Survival) + Superior Mobility (lv9, +10ft speed รวม climb/swim) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | ธีม skirmish/scout ผสม support เล็กน้อย = เท่า baseline |

### Shadow Master (VSS 🕰️)

**Overall**: S — Utility เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน (Control/Survivability/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Release Shadow ให้เงาเป็น "ally" สำหรับเงื่อนไข Sneak Attack ได้ตลอด (ไม่ต้องพึ่ง Advantage/ally จริง) + Shadow Puppet (lv13, เงาโจมตีเงาศัตรูได้เอง 2d6 magic dmg) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Shadow Puppet ให้เงา grapple เงาศัตรู หรือแอบเกาะติดเพื่อสลับเป้าโจมตีด้วย reaction [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Gloaming Black (lv9, cast Darkness ฟรี 1/รอบพัก + มองทะลุความมืดของตัวเอง) + Shadowdance (lv17, bonus action สลับที่กับเงา หนี/เข้าประชิดได้) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | เงาขยับ 30ft ได้ฟรีทุกเทิร์นแบบ "no action required" + Shadowdance สลับที่ได้ถึง 2 ครั้ง/เทิร์นโดยครั้งที่สองไม่เสีย bonus action [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 9/10 (S) | Abyssal Eyes (darkvision 60ft/+60ft) + Gloaming Black (Darkness ฟรี) + เงาสอดแนม/ปลอมตัวเป็นเงาคนอื่นได้ = stealth kit ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | เงาทำหน้าที่ทั้งดาเมจ/control/สอดแนม/mobility ในกลไกเดียว breadth กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Soulknife (XPHB)

**Overall**: S — Action Economy เป็น S ใหม่ บวกขยับขึ้นครบ 6 ใน 7 axis กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Psychic Blades ให้โจมตีที่สองด้วย bonus action ฟรีทุกเทิร์น (1d4) โดยไม่ต้องใช้อาวุธคู่จริง และเป็นได้ทั้ง melee/ranged [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Rend Mind (lv17, Sneak Attack + เซฟ Wis พลาด = Stunned 1 นาที) — hard-CC แรงแต่จำกัด 1 ครั้ง/รอบพัก (หรือจ่าย 3 dice ฟื้น) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 2/10 (D) | Psychic Whispers ให้สื่อสารทางจิตกับพวกพ้องได้ (action, Prof bonus จำนวนเป้า) — support แบบสื่อสารล้วนๆ แคบมาก [M:1/4] [R:1/3] [B:0/3] |
| **Survivability** | 7/10 (A) | Psychic Veil (lv13, action, Invisible 1 ชั่วโมงจนกว่าจะทำดาเมจ/บังคับเซฟ) = escape/setup tool ที่ดี [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | โจมตีที่สองฟรีด้วย bonus action ทุกเทิร์น (ไม่ต้องมีทรัพยากรพิเศษ แค่มือว่าง) + Psychic Teleportation (lv9, bonus action เทเลพอร์ตด้วยการขว้างมีด) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Psi-Bolstered Knack (reroll skill/tool check ที่ proficient) + Psychic Whispers (telepathy) — ระบบ die-based ที่ reliable [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Psionic Energy Dice pool เดียวป้อนทั้ง reroll โจมตี/skill check/เทเลพอร์ต/invisibility/stun — breadth กว้างมากจากทรัพยากรเดียว [M:3/4] [R:2/3] [B:3/3] |

### Swashbuckler (XGE 🕰️)

**Overall**: C — ขยับแค่ 2 axis เล็กน้อย (Control/Survivability) ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Rakish Audacity (Sneak Attack ไม่ต้องใช้ Advantage ถ้าตัวต่อตัวไม่มีใครประกบ) + Master Duelist (lv17, ทอยโจมตีที่พลาดใหม่ด้วย Advantage, 1/รอบพัก) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Panache (lv9, action ชนะ Persuasion vs Insight = ศัตรูโจมตี/ทำ OA ใส่คนอื่นไม่ได้ หรือ Charmed ถ้าเป็นมิตร) — เหมือน taunt เต็มรูปแบบ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่โดยตรง (Panache เป็น control ต่อศัตรู) = เท่า baseline |
| **Survivability** | 7/10 (A) | Fancy Footwork (โจมตี melee แล้วเป้านั้นทำ OA ใส่คุณไม่ได้ตลอดเทิร์น, always-on ไม่จำกัดครั้ง) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Elegant Maneuver (lv13, bonus action ให้ Advantage เช็ค Acrobatics/Athletics ครั้งถัดไป) = ใกล้เคียง baseline |
| **Utility** | 7/10 (A) | ไม่มี utility นอกคอมแบตใหม่มาก = เท่า baseline |
| **Versatility** | 6/10 (B) | ธีม duelist โฟกัสดาเมจ/control/mobility เดี่ยวชัดเจน = เท่า baseline |

### Temporal Trickster (VSS 🕰️)

**Overall**: A — Support ขยับบางส่วน (0→4) บวกขยับตามอีก 4 axis พร้อมกัน


> **หมายเหตุข้อมูล**: คาถา chronomancy เฉพาะของ VSS (action, instant replay, delay, recall) และ cantrip moment to think ไม่มีข้อความเต็มปรากฏในไฟล์ข้อมูลที่ดึงมา (มีแค่ชื่อ) จึงให้คะแนนแบบระมัดระวังโดยอ้างอิงเฉพาะฟีเจอร์ที่ยืนยันได้ (Haste/Slow ที่รู้ effect แน่นอน, Time Dilation, Stop the Clock, การเคลื่อนที่จาก Moment to Act)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจโดยตรงที่ยืนยันได้ (Haste เป็นบัฟ ไม่ใช่ดาเมจ) = เท่า baseline |
| **Control** | 6/10 (B) | เข้าถึง {@spell Slow} ผ่าน chronomancy point pool (lv13) — hard-CC ที่ยืนยันได้ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 4/10 (C) | เข้าถึง {@spell Haste} ผ่าน chronomancy point pool (lv13) — บัฟพวกพ้องได้จริงแต่จำกัด point pool [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Time Dilation (lv13, cast chronomancy spell → +2 AC และ +2 save Dex จนต้นเทิร์นถัดไป) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Moment To Act (เคลื่อนที่ 10ft ฟรีไม่โดน OA ตอน cast cantrip) + Stop the Clock (lv17, cast {@spell Time Stop} ฟรี 1/รอบพักยาว) — nova มหาศาลแม้ใช้ได้ครั้งเดียว [M:4/4] [R:1/3] [B:3/3] |
| **Utility** | 8/10 (A) | Impressions of the Future (lv9, bonus action หยั่งอนาคตสั้นๆ, 1/รอบพัก) + คาถา custom (delay/recall) ที่ชื่อบ่งบอกธีม utility ข้ามเวลา [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | Chronomancy point pool ป้อนทั้งบัฟ/control/nova/utility กว้าง แม้รายละเอียดคาถาบางตัวไม่ยืนยันครบ [M:2/4] [R:2/3] [B:3/3] |

### Thief (XPHB)

**Overall**: S — Action Economy และ Utility เป็น S ใหม่ทั้งคู่ บวก Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจโดยตรงใหม่ (Thief's Reflexes ให้เทิร์นเพิ่มซึ่งมีดาเมจแฝงอยู่ แต่คุณค่าหลักคือ Action Economy) = เท่า baseline |
| **Control** | 4/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ (Second-Story Work เป็น mobility ไม่ใช่ defense) = เท่า baseline |
| **Action Economy** | 9/10 (S) | Fast Hands (bonus action Sleight of Hand/Utilize/Magic action) + Thief's Reflexes (lv17, **สองเทิร์น**ในรอบแรกของทุกไฟต์) — เทียบเท่าได้ action เพิ่มทั้งชุดในรอบแรก [M:4/4] [R:2/3] [B:3/3] |
| **Utility** | 9/10 (S) | Second-Story Work (climb speed + jump ด้วย Dex) + Use Magic Device (lv13, attune 4 ชิ้น + 1/6 ใช้ charge ฟรี + ใช้ spell scroll ด้วย Int) — magic item utility ครบเครื่องที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | Use Magic Device เปิดทางให้ใช้ scroll/item เกือบทุกชนิดได้ ขยาย toolkit กว้างมาก [M:2/4] [R:2/3] [B:3/3] |

### Titan Slayer (VSS 🕰️)

**Overall**: C — ขยับแค่ 2 axis เล็กน้อย (Control/Survivability) เหมือน Swashbuckler ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Fell the Giant (lv17, crit range 19-20 ต่อเป้า Large+ และ crit ทำให้ Prone) — magnitude ดีแต่จำกัดแค่เป้าตัวใหญ่ [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Knee Striker (แลกครึ่งหนึ่งของ Sneak Attack dice เพื่อทำเป้า Large+ ที่โดน SA ล้ม Prone) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Underfoot Combat (bonus action เข้าไปอยู่ใต้ตัวเป้า Large+ ได้ cover ครึ่ง/สามส่วนสี่) [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Underfoot Combat เป็น bonus action ปรับตำแหน่งเข้าที่กำบัง = ใกล้เคียง baseline |
| **Utility** | 7/10 (A) | Confound the Big Folk (lv9, Advantage Stealth ต่อเป้าตัวใหญ่ + prof bonus ครึ่งหนึ่งกับเช็คที่เกี่ยวข้อง) = utility แคบเฉพาะเป้าใหญ่ = ใกล้เคียง baseline |
| **Versatility** | 6/10 (B) | ทุกฟีเจอร์โฟกัส "ต่อสู้เป้าตัวใหญ่กว่า" ธีมเดียวชัดเจน breadth แคบ = เท่า baseline |
