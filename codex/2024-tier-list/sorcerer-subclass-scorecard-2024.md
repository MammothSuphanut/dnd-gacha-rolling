# Sorcerer — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 20 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Sorcerer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 20 ตัว (รวม "The Ruined Flame" homebrew ของโปรเจกต์)

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-sorcerer.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Sorcerer, 2024)

Floor 0-10 ต่อ axis ของ **Sorcerer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d6, spellcasting ability Cha, full caster progression, cantrip เริ่มต้นมากที่สุดในบรรดา full caster (4→5→6), saving throw proficiency Con + Cha, ไม่มี armor proficiency, weapon proficiency simple เท่านั้น, prepared spell สลับได้แค่ 1 คาถา/level-up (จำกัดแบบ known-caster), Innate Sorcery (bonus action, 1 นาที: +1 spell save DC + Advantage บน spell attack roll, 2 ครั้ง/long rest), Font of Magic (Sorcery Points แปลงกับ spell slot ได้ 2 ทาง), Metamagic (2 ตัวเลือก lv2 → 4 lv10 → 6 lv17 จาก 10 options), Sorcerous Restoration (lv5), Sorcery Incarnate (lv7), Arcane Apotheosis (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Innate Sorcery ให้ Advantage บน spell attack roll ทุกครั้ง + spell save DC +1 นาน 1 นาที (2 ครั้ง/long rest, re-trigger ได้อีกด้วย 2 Sorcery Point จาก lv7) ยกระดับ accuracy/crit ของทุกคาถาที่ยิงในหน้าต่างนั้น บวก Metamagic option อย่าง Empowered Spell (reroll damage dice) หรือ Twinned Spell (ยิงซ้ำเป้าที่ 2) แปลงดาเมจฐานให้แรงขึ้นได้ตามต้องการ [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Sorcerer spell list มี control พอสมควร (Hold Person, Sleep) แต่แคบกว่า Wizard เพราะ known-list เล็กกว่า — จุดเด่นจริงๆ คือ Metamagic ตัวเลือก Heightened Spell ที่ให้เป้าหมาย **Disadvantage** บน saving throw ต้านคาถาที่เลือก ยกระดับ reliability ของ control spell ที่มีอยู่โดยตรง (แลกด้วย Sorcery Point) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี heal/buff dedicated ติด chassis เลย แต่ Metamagic ตัวเลือก Twinned Spell ให้ยิงคาถา single-target buff/utility ซ้ำใส่เป้าที่ 2 พร้อมกันได้ (เช่น cast Haste ครั้งเดียวได้ผล 2 คน) เป็น support enabler เดียวที่มี แลกด้วย Sorcery Point ทุกครั้ง [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 3/10 (C) | HD d6 (ต่ำสุดเท่า Wizard) ไม่มี armor proficiency ติดตัว saving throw proficiency Con (ป้องกัน concentration break ได้ดีกว่า Wizard) กับ Cha ไม่มี resistance/mitigation tool อื่นเลย [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Font of Magic แปลง spell slot → Sorcery Point แบบไม่เสีย action เลย และแปลงกลับเป็น slot ได้ด้วย Bonus Action ทำให้จัดสรร resource รายวันได้อิสระ บวก Metamagic ตัวเลือก Quickened Spell เปลี่ยนคาถาที่ปกติใช้ action ให้เป็น **Bonus Action** ได้ (แลก Sorcery Point) เป็นเครื่องมือ action-economy ที่ยืดหยุ่นที่สุดในบรรดา full caster [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี skill bonus, expertise, หรือ ritual casting ติด chassis เลย มีแค่ Metamagic บางตัวที่เอียง utility ทางอ้อม (Subtle Spell ตัดคอมโพเนนต์ verbal/somatic ทำให้ cast แบบไม่มีใครสังเกต, Distant/Extended Spell ขยาย range/duration) แต่ทั้งหมดต้องแลก Sorcery Point [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Metamagic ให้ปรับ "วิธี cast" ของแทบทุกคาถาที่รู้ได้ตามสถานการณ์ (เงียบ/ไกล/เร็ว/ซ้ำเป้า/บังคับ save) จาก 10 ตัวเลือก คูณกับ Font of Magic ที่แปลง spell slot ↔ Sorcery Point ได้อิสระทั้งสองทาง ทำให้จัดสรร resource รายวันได้ยืดหยุ่นเฉพาะตัวไม่มี full caster ตัวอื่นทำได้ แม้ known-spell list จะเล็กกว่า Wizard/Cleric/Druid ก็ตาม [M:3/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (20)

**Class Baseline อ้างอิง**: Damage 7, Control 6, Support 3, Survivability 3, Action Economy 7, Utility 3, Versatility 7

ไม่มี origin ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้นหรือ feature ที่แคบเกินกว่าจะขยับคะแนนรวม) หมายเหตุแหล่งที่มา: รายการที่ tracker เขียนแบบ "ชื่อ 2014 / ชื่อ 2024" (Aberrant Mind/Aberrant Sorcery, Clockwork Soul/Clockwork Sorcery, Draconic Bloodline/Draconic Sorcery, Shadow Magic/Shadow Sorcery, Wild Magic/Wild Magic Sorcery) ให้คะแนนโดยใช้เวอร์ชัน **2024 (XPHB/RHW) เป็นหลัก** ตาม 2024-scope rule เพียงเวอร์ชันเดียว (ไม่ใช่ dual-score แบบ Fighter's Banneret) เพราะกลไกแทบไม่ต่างกันและ tracker รวมเป็นบรรทัดเดียว — Pyromancer(PSK)/Divine Soul(XGE)/Storm Sorcery(XGE) ไม่มี reprint จึงเป็น 2014-only 🕰️, Lunar Sorcery(DSotDQ)/Spellfire Sorcery(FRHoF) เป็น 2024-compatible, Apocalypse/Haunted/Wretched Bloodline เป็น GrimHollowPG24 (2024), Emotion Lord/Mirrorkin/Oozemaster/Reincarnated Hero/Spiritborn/Toon Magic เป็น VSS 2014-only 🕰️ (ยืนยันแล้วว่าไฟล์ VSS 2024 ไม่มี Sorcerer subclass เหล่านี้), The Ruined Flame เป็น homebrew ของโปรเจกต์เอง (ผ่านการรีวิว balance แล้ว ดู [[project_ruined_flame_balance]])

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Aberrant Sorcery | B | XPHB | 7 (A) | 7 (A) | 3 (C) | 6 (B) | 7 (A) | 6 (B) | 7 (A) |
| Apocalypse Sorcery | A | GrimHollowPG24 | 9 (S) | 7 (A) | 5 (B) | 5 (B) | 7 (A) | 7 (A) | 8 (A) |
| Clockwork Sorcery | A | XPHB | 7 (A) | 8 (A) | 8 (A) | 7 (A) | 7 (A) | 6 (B) | 7 (A) |
| Divine Soul | A | XGE 🕰️ | 7 (A) | 7 (A) | 7 (A) | 6 (B) | 7 (A) | 4 (C) | 9 (S) |
| Draconic Sorcery | B | XPHB | 8 (A) | 7 (A) | 3 (C) | 6 (B) | 7 (A) | 6 (B) | 7 (A) |
| Emotion Lord | A | VSS 🕰️ | 7 (A) | 8 (A) | 5 (B) | 6 (B) | 7 (A) | 5 (B) | 9 (S) |
| Haunted Sorcery | B | GrimHollowPG24 | 8 (A) | 7 (A) | 4 (C) | 6 (B) | 8 (A) | 7 (A) | 8 (A) |
| Lunar Sorcery | B | DSotDQ | 7 (A) | 7 (A) | 4 (C) | 6 (B) | 7 (A) | 6 (B) | 8 (A) |
| Mirrorkin | B | VSS 🕰️ | 7 (A) | 7 (A) | 3 (C) | 6 (B) | 7 (A) | 8 (A) | 8 (A) |
| Oozemaster | B | VSS 🕰️ | 7 (A) | 6 (B) | 3 (C) | 7 (A) | 7 (A) | 6 (B) | 7 (A) |
| Pyromancer | C | PSK 🕰️ | 8 (A) | 6 (B) | 3 (C) | 5 (B) | 7 (A) | 3 (C) | 7 (A) |
| Reincarnated Hero | B | VSS 🕰️ | 8 (A) | 6 (B) | 3 (C) | 9 (S) | 8 (A) | 5 (B) | 8 (A) |
| Shadow Sorcery | B | RHW | 7 (A) | 8 (A) | 3 (C) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Spellfire Sorcery | B | FRHoF | 7 (A) | 7 (A) | 7 (A) | 6 (B) | 7 (A) | 4 (C) | 8 (A) |
| Spiritborn | A | VSS 🕰️ | 9 (S) | 7 (A) | 3 (C) | 7 (A) | 8 (A) | 7 (A) | 8 (A) |
| Storm Sorcery | B | XGE 🕰️ | 8 (A) | 7 (A) | 4 (C) | 5 (B) | 8 (A) | 5 (B) | 7 (A) |
| The Ruined Flame | B | Homebrew | 9 (S) | 6 (B) | 3 (C) | 8 (A) | 7 (A) | 3 (C) | 7 (A) |
| Toon Magic | B | VSS 🕰️ | 7 (A) | 6 (B) | 3 (C) | 8 (A) | 8 (A) | 7 (A) | 7 (A) |
| Wild Magic Sorcery | B | XPHB | 7 (A) | 7 (A) | 4 (C) | 3 (C) | 7 (A) | 5 (B) | 8 (A) |
| Wretched Bloodline Sorcery | B | GrimHollowPG24 | 7 (A) | 8 (A) | 3 (C) | 7 (A) | 7 (A) | 5 (B) | 8 (A) |

---

### Aberrant Sorcery (XPHB)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับกลางๆ 3 axis (Control/Survivability/Utility) ไม่มี peak ถึง S เลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Warping Implosion (lv18, ทำดาเมจ AoE 3d10 Force ตอนเทเลพอร์ตหนี) เป็นฟีเจอร์ดาเมจเดียวและมาช้า = ใกล้เคียง baseline |
| **Control** | 7/10 (A) | Psionic Spells ผูก Evard's Black Tentacles/Dissonant Whispers ติดตัวถาวร + Telekinesis (lv9) — control spell ที่ยืนยันแน่นอน [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Psychic Defenses (lv6, resistance Psychic + Advantage เซฟ Charmed/Frightened) ยกระดับจาก baseline ที่แทบไม่มีอะไรเลย [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Psionic Sorcery ตัด V/S component เวลา cast ด้วย Sorcery Point (stealth cast) ไม่ใช่ AE โดยตรง = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | Revelation in Flesh (lv14, bonus action หลายโหมด: swim/fly/see invisible/บีบตัวลอดช่อง) + Telepathic Speech (bonus action telepathy) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Spell list fixed + Revelation in Flesh หลายโหมด = ใกล้เคียง baseline |

### Apocalypse Sorcery (GrimHollowPG24)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Utility กระโดด +4 และขยับขึ้นอีก 3 axis กว้างมาก


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Forbidden Magic ตัวเลือก Pyrrhic (cast attack spell ใดๆ **auto-crit** แลกด้วย HP max ลด) + The End is Nigh (lv18, AoE 6d6 Psychic + 6d6 Force = 12d6 รวมถึง**ห้ามฟื้นคืนชีพยกเว้น True Resurrection/Wish**) — nova ที่โหดที่สุดตัวหนึ่งในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Apocalyptic Spells ผูก Bestow Curse/Banishment/Contagion ติดตัวถาวร + The End is Nigh ติด Frightened = ใกล้เคียง baseline โดยประมาณ |
| **Support** | 5/10 (B) | Revivify ผูกติดตัวถาวรฟรี (ฟื้นคืนชีพพวกพ้อง) + Arcane Apocrypha (lv6, scroll ฟรีทุกรอบพักยาวอาจเป็นสายซัพพอร์ตได้) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 5/10 (B) | Bear Witness (ระหว่าง Innate Sorcery: resistance Force + immune Frightened) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Bear Witness ให้ใช้ scroll ที่ปกติเสีย Action ด้วย bonus action ได้ 1 ครั้ง/Innate Sorcery = ใกล้เคียง baseline |
| **Utility** | 7/10 (A) | Unhinged Asservations (ทำ scroll ครึ่งราคา/เวลา + ใส่ Metamagic ลง scroll ให้คนอื่นใช้ได้) + Arcane Apocrypha (scroll ฟรีทุกรอบพักยาว) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ระบบ scroll economy + Forbidden Magic 3 โหมดเสี่ยง-ได้ (Excessive/Inexorable/Pyrrhic) + spell list ผสมดาเมจ/control/support (Revivify) [M:3/4] [R:2/3] [B:3/3] |

### Clockwork Sorcery (XPHB)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดด +5 (C→A) และ Survivability กระโดด +4 (C→A) พร้อมกัน — แก้จุดอ่อนสองแกนของ baseline ได้ในตัวเดียว บวก Control/Utility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจใหม่ (spell list เอียง support/utility ทั้งหมด) = เท่า baseline |
| **Control** | 8/10 (A) | Restore Balance (reaction ยกเลิก Advantage/Disadvantage ของการทอย d20 ในระยะ 60ft, Cha mod ครั้ง/วัน) + Wall of Force ผูกติดตัวถาวร (lv9) [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | Bastion of Law (action, 1-5 SP สร้างเกราะลดดาเมจ d8 ให้ตัวเองหรือพวกพ้อง) + Clockwork Cavalcade (lv18, AoE ฟื้น HP รวม 100 แบ่งให้ใครก็ได้ + ซ่อมของ + dispel magic) — support kit ที่แรงที่สุดในกลุ่ม Sorcerer [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Bastion of Law ใช้ ward ตัวเองได้เช่นกัน + Trance of Order (lv14, bonus action 1 นาที: กันโดน Advantage ใส่ + d20 ต่ำกว่า 10 นับเป็น 10) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ไม่มีฟีเจอร์ประหยัด action พิเศษเพิ่มจาก baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Clockwork Spells (Alarm/Freedom of Movement/Greater Restoration) + Clockwork Cavalcade (ซ่อมของ+dispel) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เน้น support/control/defense หนัก ดาเมจแทบไม่มี = ใกล้เคียง baseline |

### Divine Soul (XGE 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวก Support กระโดด +4 (C→A) และ Survivability/Control ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจโดยตรงใหม่ (Divine Magic เป็นแค่ทางเลือกสเปลล์) = เท่า baseline |
| **Control** | 7/10 (A) | เข้าถึง spell list ของ Cleric ทั้งหมดเป็นทางเลือก (Hold Person, Bane ฯลฯ) = ใกล้เคียง baseline |
| **Support** | 7/10 (A) | Divine Magic เปิดทาง spell list ของ Cleric ทั้งหมด (Cure Wounds/Healing Word/Bless) — Sorcerer ที่ปกติไม่มีฮีลเลยกลายเป็นฮีลเลอร์ได้จริง + Empowered Healing (lv6, 1 SP ทอยฮีลใหม่ให้ตัวเองหรือพวกพ้อง) [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Favored by the Gods (แปลง save/attack ที่พลาดให้สำเร็จด้วย +2d4, 1/รอบพัก) + Unearthly Recovery (lv18, bonus action ฟื้นครึ่ง HP max, 1/long rest) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Otherworldly Wings (lv14, bonus action บิน) = ใกล้เคียง baseline |
| **Utility** | 4/10 (C) | Otherworldly Wings ให้บินได้ (เดินทาง) เพียงอย่างเดียว [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 9/10 (S) | Divine Magic เปิดทาง spell list ของ Cleric **ทั้งหมด**เป็นทางเลือกแทน/เสริม Sorcerer list — ขยาย breadth มหาศาลครอบคลุมฮีล/บัฟ/control/ดาเมจทุกด้าน [M:4/4] [R:2/3] [B:3/3] |

### Draconic Sorcery (XPHB)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 4 axis กลางๆ พร้อมกัน (Damage/Control/Survivability/Utility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Elemental Affinity (lv6, +Cha mod ดาเมจต่อการทอยดาเมจ 1 ลูกทุกครั้งที่ cast สเปลล์ธาตุที่เลือก ไม่จำกัดจำนวนครั้ง) + Draconic Spells (Chromatic Orb/Dragon's Breath) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Draconic Spells มี Command/Charm Monster/Fear ติดตัวถาวร = ใกล้เคียง baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Draconic Resilience (HP max +3 บวก +1/level + AC = 10+Dex+Cha ตอนไม่สวมเกราะ) ยกระดับ AC/HP อย่างเป็นรูปธรรมตลอดเวลา [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Dragon Wings (lv14, bonus action บิน 1 ชม.) = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | Dragon Wings (บิน) + Dragon Companion (lv18, Summon Dragon ฟรี 1/วัน) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ดาเมจ/control/defense/mobility กระจายพอประมาณ = ใกล้เคียง baseline |

### Emotion Lord (VSS 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวก Control/Survivability/Utility ขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Burning Rage (Mood Swing option, AoE dmg aura 1 นาที, 1 SP) + Anger-track spell (Scorching Ray/Lightning Bolt) แบบมีเงื่อนไขอารมณ์ = ใกล้เคียง baseline |
| **Control** | 8/10 (A) | Shift Temperament (lv14, action เซฟ Cha แล้วเลือก Charmed/**Frenzied**(สับสนบังคับตีมั่ว)/Frightened/Indifferent) — control suite ที่หลากหลายมาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 5/10 (B) | Joy-track spell (Heroism/Fly/Freedom of Movement/Greater Restoration) เป็นทางเลือกตามอารมณ์ปัจจุบัน [M:2/4] [R:1/3] [B:2/3] |
| **Survivability** | 6/10 (B) | Crestfallen (Mood Swing, Disadvantage การโจมตีใส่ตัวเอง 1 นาที) + Heartsick (ยกเลิก Charmed/Frightened ตัวเอง) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Mood Swing ทั้งชุดใช้ bonus action (รวม Flight of Terror = Disengage ฟรี) = ใกล้เคียง baseline |
| **Utility** | 5/10 (B) | Empathy (action อ่านอารมณ์+Bond เป้าหมาย) + Moment of Bliss (บินชั่วคราว) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 9/10 (S) | ระบบ 5 อารมณ์ (Anger/Fear/Joy/Love/Sorrow) ครอบคลุมทุกแกนตามสถานการณ์ + Vibrant Soul (lv18, รู้สเปลล์ครบทั้ง 5 สายพร้อมกันตลอดเวลา ตัดข้อจำกัดสถานการณ์ทิ้ง) [M:3/4] [R:3/3] [B:3/3] |

### Haunted Sorcery (GrimHollowPG24)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 6 ใน 7 axis พร้อมกัน กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Phantom Companion ให้ familiar (Specter reskin) ใช้ Life Drain ผ่าน Reaction ได้ (สละการโจมตีตัวเอง 1 ครั้ง) + Strength of Spirit (lv6) ให้สั่ง Life Drain ด้วย bonus action **ทุกครั้งที่ cast สเปลล์** โดยไม่ต้องสละอะไร — นักสู้เพิ่มอีกตัวแบบฟรีๆ + Deathly Pallor แปลงดาเมจเป็น Necrotic เลี่ยง resistance ได้ [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Phantom Possession (lv14, action บังคับ possess ร่างเป้าหมาย, เซฟ Cha พลาด = ยึดร่างควบคุมได้เต็มรูปแบบ) — hard-CC ระดับสูงมาก แม้จำกัด 1 ครั้ง/รอบพักสั้น-ยาว [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 4/10 (C) | Haunted Spells ผูก Death Ward ติดตัวถาวร — support สเปลล์เดียวแคบ [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 6/10 (B) | Deathly Pallor (resistance Necrotic) + Become Death (lv18, ตกลง 0 HP → ดรอปเหลือ 1 HP + temp HP ครึ่งของ max + resistance ดาเมจทั้งหมดชั่วคราว) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Strength of Spirit ให้สั่ง familiar โจมตีด้วย bonus action ทุกครั้งที่ cast สเปลล์ด้วย action หลัก — เท่ากับได้โจมตีฟรีทุกเทิร์นที่ cast สเปลล์ [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Phantom Companion ล่องหนได้ (สอดแนม) + Strength of Spirit ให้ cast สเปลล์ราวกับยืนอยู่ตำแหน่ง familiar (ส่ง touch spell ระยะไกลได้) + Sixth Sense (+Cha initiative) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสมดาเมจ(familiar)/control(possession)/utility(cast ระยะไกล)/survivability(spectral form) ครบทุกด้าน [M:3/4] [R:2/3] [B:3/3] |

### Lunar Sorcery (DSotDQ)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับขึ้น 4 axis กลางๆ (Control/Support/Survivability/Utility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Moon Fire ให้ Sacred Flame โดนได้ 2 เป้าถ้ายืนติดกัน (เล็กน้อย) + Lunar Phenomenon New Moon (lv18, AoE 3d10 Necrotic) มาช้า = ใกล้เคียง baseline |
| **Control** | 7/10 (A) | Lunar Phenomenon New Moon (speed 0) + สเปลล์ฟรีตามเฟส (Hold Monster/Confusion) = ใกล้เคียง baseline |
| **Support** | 4/10 (C) | Lunar Phenomenon Full Moon (lv18, ฟื้น HP 3d8 ให้เป้า 1 ตัว) + Crescent Moon (พาพวกพ้องเทเลพอร์ตไปด้วย + resistance ดาเมจทั้งหมด) — support แคบและมาช้า [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 6/10 (B) | Lunar Empowerment (lv14, ตามเฟส: New Moon=attack ใส่มี Disadvantage ในที่มืด, Crescent=resistance Necrotic/Radiant) + Lunar Phenomenon Crescent (resistance ดาเมจทั้งหมดชั่วคราว) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Waxing and Waning (bonus action สลับเฟส + ปลดล็อกสเปลล์ฟรีของทุกเฟส) = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | สเปลล์ฟรี 1 ลูก/เฟส/รอบพัก (Shield/Color Spray/Ray of Sickness ฯลฯ) + Lunar Empowerment Full Moon (แสง+Advantage Investigation/Perception) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ระบบ 3 เฟส (Full/New/Crescent) สลับได้ทุกวัน/ทุก long rest ครอบคลุมดาเมจ/control/support/defense/utility ตามเฟสที่เลือก [M:3/4] [R:2/3] [B:3/3] |

### Mirrorkin (VSS 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility กระโดด +5 (C→A) บวก Control/Survivability ขยับตาม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจ fixed ใหม่ (Copycat/Mirror Magic ขึ้นกับสถานการณ์รอบตัวทั้งหมด) = เท่า baseline |
| **Control** | 7/10 (A) | Reflect Magic (lv6, reaction สะท้อนสเปลล์ที่บังคับเซฟกลับไปหาผู้ร่าย ถ้าเซฟผ่าน) — control ย้อนกลับที่ทรงพลังแต่ต้องมีคนร่ายใส่ก่อน [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Reflect Magic ใช้ป้องกันตัวเองจากสเปลล์บังคับเซฟได้เช่นกัน = ใกล้เคียง baseline |
| **Action Economy** | 7/10 (A) | ไม่มีฟีเจอร์ประหยัด action พิเศษเพิ่มจาก baseline = เท่า baseline |
| **Utility** | 8/10 (A) | Mimic Trait (action คัดลอก sense/speed/skill/resistance จากใครก็ได้ที่เห็น) + Mirror Magic (เรียนสเปลล์เพิ่มได้สูงสุด 10 ลูกจากสเปลล์ที่โดนใส่) + Copycat (lv14, ลอกความสามารถของใครก็ได้ที่เห็นในนาทีที่ผ่านมา) — utility toolkit ที่กว้างที่สุดในกลุ่ม [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ธีม "กลายเป็นใครก็ได้ที่อยู่ใกล้" ให้ breadth สูงมาก แม้ reliability จะขึ้นกับสถานการณ์รอบตัว [M:3/4] [R:2/3] [B:3/3] |

### Oozemaster (VSS 🕰️)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis (Survivability/Utility) เล็กน้อย ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Gelatinous Ally (lv18, summon cube พร้อม Engulf) เป็นฟีเจอร์ดาเมจตัวเดียวและมาช้ามาก = ใกล้เคียง baseline |
| **Control** | 6/10 (B) | Gelatinous Cube's Engulf (ดักเป้าหมาย) เป็น control แคบและมาช้า (lv18) = ใกล้เคียง baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Reform (reaction ฟื้น 1d4→4d4 HP ทุกครั้งที่โดนดาเมจ B/P/S จากอาวุธไม่วิเศษ) + Bouncy Body (lv14, reaction สะท้อนการโจมตี melee ที่พลาดกลับไปหาผู้โจมตี) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Reform/Bouncy Body เป็น reaction ทั้งคู่ไม่กิน action หลัก = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | Slime Magic (Freedom of Movement/Stoneskin/Disguise Self) + Goopy Clone (lv6, ตัวปลอมอยู่ได้ 24 ชม. ปลอมเป็นใครก็ได้) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Reform(สะสม)/Goopy Clone(สอดแนม)/Bouncy Body(สวนกลับ)/Gelatinous Ally(summon) กระจายหลายบทบาท = ใกล้เคียง baseline |

### Pyromancer (PSK 🕰️)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Damage/Survivability) Utility (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Heart of Fire (AoE dmg ฟรีเท่าครึ่ง sorcerer level ทุกครั้งที่ cast สเปลล์ไฟ lv1+ ไม่มีค่าใช้จ่าย) + Fire in the Veins/Fiery Soul (สเปลล์ไฟเลี่ยง resistance/immunity ได้ทั้งหมด) + Pyromancer's Fury (reaction dmg ใส่ผู้โจมตี melee) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Fire in the Veins (resistance Fire, lv6) → Fiery Soul (immunity Fire, lv18) — ป้องกันแคบเฉพาะดาเมจไฟ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Pyromancer's Fury เป็น reaction ไม่กิน action หลัก = ใกล้เคียง baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ธีมโฟกัสดาเมจไฟล้วนๆ breadth แคบ = เท่า baseline |

### Reincarnated Hero (VSS 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +6 (3→9, C→S) — swing ใหญ่ที่สุดในกลุ่ม บวก Damage/Action Economy/Utility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Mystical Maneuvers (lv6, 1 SP bonus action: Aegis Stance/Overhead Throw/Parting Flourish ใช้อาวุธ melee โจมตีเสริม) ผสานกับ weapon proficiency จาก Armored Sorcery กลายเป็น melee-caster hybrid เต็มรูปแบบ [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Armored Sorcery ให้ proficiency เกราะกลาง+โล่+อาวุธ martial 4 ชนิด — ทำลายข้อจำกัด "ไม่มี armor" ของ baseline ทั้งหมด บวก Heroic Legacy (lv18, reaction จำกัดดาเมจที่โดนไม่เกิน 20 + Advantage ทุกอย่างจนเทิร์นถัดไป) + สเปลล์ list (Shield/Death Ward/Stoneskin) — survivability jump ที่สูงที่สุดในกลุ่ม Sorcerer [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Mystical Maneuvers ทุกโหมดใช้ bonus action ฟรี (Overhead Throw ทำให้อาวุธ melee โจมตีระยะไกลได้ไม่ต้องเปลี่ยนอาวุธ) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Heroic Magic ผูก Legend Lore ติดตัวถาวร (utility ความรู้) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | ผสมเกราะ+อาวุธ martial+maneuver+สเปลล์เข้าด้วยกัน เปลี่ยน playstyle Sorcerer ทั้งหมด [M:3/4] [R:2/3] [B:3/3] |

### Shadow Sorcery (RHW)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +5 (C→A) บวก Control/Utility ขยับตาม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Shadow Spells ผูก Inflict Wounds/Phantasmal Killer ติดตัวถาวร = ใกล้เคียง baseline |
| **Control** | 8/10 (A) | Beasts of Ill Omen (lv6, 3 SP summon Beast ฟรีด้วย bonus action ไม่เสีย slot/เตรียม/material, ศัตรูใกล้มัน Disadvantage เซฟต้านสเปลล์เรา) + spell list มี Phantasmal Killer/Hunger of Hadar/Contagion [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Strength of the Grave (เซฟ Cha ตอนจะดรอป 0 HP → เหลือ HP=Cha mod+level แทน, 1/long rest) + Umbral Form (lv18, ระหว่าง Innate Sorcery: resistance ดาเมจเกือบทุกชนิด + เดินทะลุสิ่งกีดขวาง) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Beasts of Ill Omen (bonus action summon ฟรี) + Shadow Walk (lv14, bonus action เทเลพอร์ต 120ft ในที่มืด) = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | Eyes of the Dark (Darkvision 120ft + Blindsight 10ft + มองทะลุความมืดของตัวเอง) + Shadow Walk [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสม control/defense/utility ในธีมเงาชัดเจน = ใกล้เคียง baseline |

### Spellfire Sorcery (FRHoF)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดด +4 (C→A) บวก Control/Survivability/Utility ขยับตาม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Radiant Fire (Spellfire Burst ตัวเลือก, 1d4→1d8 dmg ให้เป้า 1 ตัว, 1 SP, 1/เทิร์น) + spell list (Scorching Ray/Flame Strike) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Absorb Spells ผูก Counterspell ติดตัวถาวร + ได้คืน 1d4 SP เมื่อ Counterspell สำเร็จ (resource-positive) [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 7/10 (A) | Bolstering Flames (Spellfire Burst ตัวเลือก, temp HP ให้ตัวเองหรือพวกพ้อง 1d4+Cha, 1 SP, 1/เทิร์น) + spell list มี Cure Wounds/Aura of Vitality/Greater Restoration [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 6/10 (B) | Crown of Spellfire (lv18, ระหว่าง Innate Sorcery เลือก: ลดดาเมจด้วย HD / บิน / เซฟผ่านไม่โดนดาเมจเลย) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Spellfire Burst ทำงานร่วมกับ Magic action หรือ bonus action ได้ ไม่ต้องเสีย action แยก = ใกล้เคียง baseline |
| **Utility** | 4/10 (C) | Dispel Magic/Greater Restoration เอียงไปทาง support/combat มากกว่า utility นอกคอมแบตจริงจัง [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | Spellfire Burst เลือกได้ 2 โหมด (ดาเมจ/temp HP) ทุกเทิร์น + spell list ผสมฮีล/ดาเมจ/control กว้าง [M:2/4] [R:3/3] [B:3/3] |

### Spiritborn (VSS 🕰️)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Survivability/Utility กระโดด +4 ทั้งคู่ และ Control/AE ขยับตาม กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Spirit Animal เป็น familiar ที่**โจมตีได้จริง**ด้วย spell attack bonus ของตัวเอง + Prof bonus บวก AC/save/dmg + HP 2×level และแปลงร่างเป็นสัตว์ใหญ่ขึ้นตามเลเวล (Tiger/Polar Bear ที่ lv14) — เท่ากับมีนักสู้เต็มตัวอีกคนที่แม่นมาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Natural Magic เปิดทาง spell list ของ Druid (Entangle/Spike Growth/Dominate Beast) = ใกล้เคียง baseline |
| **Support** | 3/10 (C) | เครื่องมือฮีล/บัฟทั้งหมดพุ่งเป้าไปที่ Spirit Animal ไม่ใช่พวกพ้อง = เท่า baseline |
| **Survivability** | 7/10 (A) | Spirit Guardian (lv18, reaction ให้ familiar รับดาเมจครึ่งหนึ่งแทนเรา) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Powerful Bond (bonus action บัฟ familiar) + familiar โจมตีได้เองในเทิร์นเรา = เท่ากับได้นักสู้เพิ่มโดยไม่เสีย action หลัก [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Natural Magic เปิดทาง spell list ของ Druid ทั้งหมด + familiar ใช้สอดแนม/Speak with Animals/Commune with Nature ได้ [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ระบบ pet ครอบคลุมดาเมจ/control(Druid list)/defense/utility ในตัวเดียว [M:3/4] [R:2/3] [B:3/3] |

### Storm Sorcery (XGE 🕰️)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 5 axis กลางๆ พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Heart of the Storm (AoE dmg ฟรีเท่าครึ่ง sorcerer level ทุกครั้งที่ cast สเปลล์ฟ้าผ่า/ฟ้าร้อง lv1+ ไม่มีค่าใช้จ่าย) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Storm's Fury (lv14, reaction dmg + บังคับเซฟ Str ผลักศัตรู 20ft) = ใกล้เคียง baseline |
| **Support** | 4/10 (C) | Wind Soul (lv18, action แจก flying speed ให้พวกพ้องสูงสุด 3+Cha mod คน นาน 1 ชม.) — support แรงแต่มาช้ามาก [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 5/10 (B) | Heart of the Storm (resistance ฟ้าผ่า/ฟ้าร้อง, lv6) → Wind Soul (immunity, lv18) — ป้องกันแคบเฉพาะดาเมจสองชนิด [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Tempestuous Magic (bonus action บิน 10ft ไม่โดน OA ทุกครั้งที่ cast สเปลล์ lv1+ ไม่จำกัดจำนวนครั้ง) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Wind Speaker (ภาษา Primordial) + Storm Guide (คุมสภาพอากาศ) + บิน 60ft ถาวร (lv18) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ดาเมจ/control/defense/mobility/support กระจายตามเลเวล = ใกล้เคียง baseline |

### The Ruined Flame (Homebrew)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ แต่ breadth แคบมาก (แค่ Survivability ขยับตามอีกนิด) Support/Utility ยังนิ่งที่ baseline C ทั้งคู่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Shattered Flame (2 SP เพิ่ม pool ดาเมจไฟเท่า Prof Bonus เป็น d6 บวก 1d6/ระดับ slot ที่เกิน 3rd แบ่งให้ทุกเป้าที่โดน Fireball) + Walking Calamity's Ruined Target (Disadvantage เซฟ + เลี่ยง fire resistance + speed 0) — ทำให้ Fireball สเกลใส่เป้าเดียวได้จริงตามที่ออกแบบไว้ [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Walking Calamity's Ruined Target ให้ speed 0 เมื่อเป้าเซฟพลาด — control แถมแคบ ผูกกับ Fireball โหมดเดียว = ใกล้เคียง baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Heart of Ash (ระหว่าง Innate Sorcery: เลือกตัวเองเป็นจุดกำเนิด Fireball ได้ + auto-succeed เซฟตัวเอง + คืน 2 SP เมื่อโดนดาเมจไฟตัวเอง) + Walking Calamity's Calamity's Heart (resistance ดาเมจทั้งหมด + temp HP pool) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | First Ember แปลง SP เป็น slot เฉพาะ Fireball ด้วย bonus action (lv5+ รวมเข้ากับ action cast เลย) = ใกล้เคียง baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | แม้ทั้ง subclass โฟกัสสเปลล์เดียว (Fireball) แต่มีโหมดเลือกได้ 2 แบบ (จุดกำเนิดตัวเอง=tank/จุดกำเนิดศัตรู=blast) ที่พลิกบทบาทได้ = ใกล้เคียง baseline |

### Toon Magic (VSS 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +5 (C→A) บวก Utility กระโดด +4 และ AE ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจ fixed ใหม่ (Vicious Mockery เป็น cantrip เล็กน้อย) = เท่า baseline |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่โดยตรง (Comic Timing เน้นป้องกันตัวเองเป็นหลัก) = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Comic Timing (reaction, 1 SP: บังคับ Disadvantage การโจมตีที่เข้าใส่ / หรือถ้าโดนตี = resistance ดาเมจนั้น+ผู้โจมตี Prone / หรือถ้าพลาด = ผู้โจมตี Prone — 3-in-1 defense) + Two-Dimensional (lv18, ranged attack ใส่มี Disadvantage + Advantage เซฟ Dex + ไม่โดนดาเมจตก) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Comic Timing เป็น reaction ฟรี + Off-Screen Teleportation (lv14, bonus action เทเลพอร์ต 120ft ตอนซ่อนตัว) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Off-Screen Teleportation (เทเลพอร์ตไกลตอนไม่มีใครเห็น) + Two-Dimensional (ลอดช่องแคบ 1/2 นิ้ว + ปรับขนาดตัวเองได้) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | สเปลล์สุ่มให้ breadth กว้างแต่ reliability ต่ำ + Comic Timing 3 โหมด + Two-Dimensional หลายผล = ใกล้เคียง baseline |

### Wild Magic Sorcery (XPHB)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 3 axis เล็กน้อย (Control/Support/Utility) Survivability (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Wild Magic Surge table มีแถวดาเมจ (เช่น 4d10 Lightning) แต่สุ่มล้วนๆ ไม่ reliable = เท่า baseline |
| **Control** | 7/10 (A) | Bend Luck (reaction, 1 SP, ±1d4 การทอย d20 ของใครก็ได้ที่เห็น — พลิกผลสำเร็จ/ล้มเหลวได้) = ใกล้เคียง baseline |
| **Support** | 4/10 (C) | Bend Luck ใช้บวกให้พวกพ้องได้เช่นกัน + Surge table บางแถวฟื้น HP ให้พวกพ้อง (สุ่ม) [M:1/4] [R:1/3] [B:2/3] |
| **Survivability** | 3/10 (C) | Surge table มีแถว resistance/heal แต่สุ่มล้วนๆ ไม่มี feature ป้องกันที่ยืนยันได้แน่นอน = เท่า baseline |
| **Action Economy** | 7/10 (A) | Surge table มีแถว "extra action" แต่สุ่มล้วนๆ ไม่ reliable = เท่า baseline |
| **Utility** | 5/10 (B) | Tides of Chaos ให้ Advantage การทอยที่เลือกได้แน่นอน 1 ครั้ง/รอบพักหรือจนกว่าจะ cast สเปลล์ด้วย slot [M:1/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ธีม random surge ครอบคลุมทุกแกนที่เป็นไปได้ (ดาเมจ/ฮีล/บัฟ/debuff/เทเลพอร์ต) + Tamed Surge (lv18, เลือกผลลัพธ์เองได้แทนสุ่ม 1/รอบพัก) [M:2/4] [R:3/3] [B:3/3] |

### Wretched Bloodline Sorcery (GrimHollowPG24)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +4 (C→A) บวก Control/Utility ขยับตาม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature ดาเมจโดยตรงใหม่ (เน้น control/defense/summon) = เท่า baseline |
| **Control** | 8/10 (A) | Bad Luck Charm (bonus action, Disadvantage การทอย d20 ครั้งถัดไปของเป้า) + Share the Burden (lv6, Bestow Curse ฟรีไม่เสีย concentration ด้วย 3 SP ระยะ 60ft) + Terrifying Visage (lv14, AoE Frightened) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Wretched Curse (เลือก 1 ใน 3: +HP สะสม / darkvision กว้าง / immune Poisoned+resist Necrotic) + Blood Ties (สิ่งมีชีวิตประเภทที่เลือก Disadvantage โจมตีเรา + กัน possess/charm/frighten จากพวกมัน) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Bad Luck Charm เป็น bonus action มาตรฐาน = ใกล้เคียง baseline |
| **Utility** | 5/10 (B) | Blood Ties (Detect Evil and Good ฟรี) + Wretched Curse's Nocturnal (มองในที่มืด 120ft) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | คำสาป 3 แบบ × ประเภทศัตรู 3 แบบใน Blood Ties ให้ทางเลือก build หลากหลาย บวก summon ally แรงๆ ที่ lv18 [M:3/4] [R:2/3] [B:3/3] |
