# Bard — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Bard](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 19 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-bard.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Bard, 2024)

Floor 0-10 ต่อ axis ของ **Bard เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Cha, full caster progression (**ไม่มี** Ritual Casting ติด chassis ต่างจาก Wizard/Cleric/Druid), saving throw proficiency Dex + Cha, armor proficiency light เท่านั้น (ไม่มี shield), weapon proficiency simple เท่านั้น, Bardic Inspiration (d6→d12 scale ตามเลเวล), Expertise (2 skill lv2 + 2 skill lv9), Jack of All Trades, Font of Inspiration (lv5), Countercharm (lv7), Magical Secrets (lv10, ยืม spell จาก Bard/Cleric/Druid/Wizard list), Superior Inspiration (lv18), Words of Creation (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Full spell slot lv1-9 เหมือน full caster ทั่วไป แต่ cantrip เริ่มต้นของ Bard list เอียงไปทาง debuff (Vicious Mockery 1d4 psychic + disadvantage โจมตีครั้งถัดไป ไม่ใช่สาย blast เหมือน Fire Bolt) ทำให้ raw damage cantrip อ่อนกว่า Wizard/Sorcerer ชัดเจน — Magical Secrets (lv10) เปิดให้ยืม blast spell แรงๆ จาก Wizard list มาเตรียมได้ก็จริง แต่ต้องแลกกับ slot ที่มีจำกัดเหมือนกัน [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 7/10 (A) | Bard spell list แข็งไม่แพ้ Wizard ในสาย control (Charm Person lv1, Command lv1, Faerie Fire lv1, Hold Person lv2, Hypnotic Pattern lv3, Dominate Person lv5) และ Vicious Mockery ที่ระดับ cantrip ก็มีผล debuff ติดตัว (disadvantage การโจมตีครั้งถัดไปของเป้า) ใช้ได้ไม่จำกัดครั้ง/วัน [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 8/10 (A) | Bardic Inspiration ให้ die (d6 lv1 → d8 lv5 → d10 lv10 → d12 lv15) แก่ ally ในระยะ 60ft ด้วย Bonus Action จำนวนครั้ง/วัน = Cha mod (ฟื้นทุก Short Rest ตั้งแต่ lv5) เอาไปบวกทบ d20 test ที่ fail ได้ (attack/save/check ก็ได้ ใช้ได้กว้างมาก) บวก Font of Inspiration (lv5) ให้แลก spell slot คืน 1 use แบบไม่เสีย action เลย และ Countercharm (lv7) เป็น reaction ให้ reroll save ต้าน charm/frightened แบบ Advantage ให้ตัวเองหรือคนในระยะ 30ft [M:3/4] [R:3/3] [B:2/3] |
| **Survivability** | 4/10 (C) | HD d8 (กลางๆ) armor prof แค่ light ไม่มี shield saving throw proficiency Dex (ช่วยหลบ AoE ได้บ่อย) + Cha (กัน banish/possession แต่หายาก) ไม่มี resistance/mitigation tool ติด baseline เลย ต้องพึ่ง spell ที่เลือกเอง (เช่น Mage Armor ถ้าเลือกเตรียม) [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Bardic Inspiration ใช้แค่ Bonus Action ไม่แตะ action หลัก, Font of Inspiration (lv5) แลก spell slot คืน 1 use ของ Bardic Inspiration แบบ "no action required" เลย (ฟรีสุดๆ), cantrip ยิงได้ทุกเทิร์นไม่จำกัดจำนวน/วัน, Jack of All Trades ให้โบนัส passive ตลอดเวลาไม่ต้องทำอะไรเพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Jack of All Trades (lv2) บวกครึ่ง proficiency bonus (ปัดลง) ให้ทุก ability check ที่ยังไม่ proficient แบบ passive ตลอดเวลา ครอบคลุมทุก skill ที่ไม่ถนัด, Expertise รวม 4 skill (2 ที่ lv2 + 2 ที่ lv9) คูณ proficiency 2 เท่า, และ Magical Secrets (lv10) ให้เลือก prepared spell จาก 4 spell list (Bard/Cleric/Druid/Wizard) รวมกัน — breadth utility toolkit กว้างที่สุดในเกมของ full caster [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 6/10 (B) | Magical Secrets (lv10) เข้าถึง spell pool จาก 4 class list รวมกัน + Jack of All Trades ใช้ได้ทุก skill check ทุกสถานการณ์แบบ passive ทำให้ toolkit กว้างมาก แต่การ "reprepare" รายวันอ่อนกว่า full caster อื่น — Bard สลับ prepared spell ได้แค่ **1 คาถา/ครั้งที่ Bard level ขึ้น** เท่านั้น (ไม่ใช่ reset เต็มทุก Long Rest แบบ Wizard/Cleric/Druid) ทำให้ปรับตัวรายวัน/รายencounter ได้จำกัดกว่าที่ breadth ของ list จะบอก [M:2/4] [R:1/3] [B:3/3] |

---

## Subclass Scoring (19)

**Class Baseline อ้างอิง**: Damage 5, Control 7, Support 8, Survivability 4, Action Economy 6, Utility 8, Versatility 6

ไม่มี subclass ตัวไหนมี prerequisite/กลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น)

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| College of Adventurers | GrimHollowPG24 | 7 (A) | 7 (A) | 9 (S) | 6 (B) | 8 (A) | 9 (S) | 10 (S) |
| College of Cantors | VSS 🕰️ | 6 (B) | 7 (A) | 9 (S) | 4 (C) | 7 (A) | 8 (A) | 6 (B) |
| College of Creation | TCE 🕰️ | 7 (A) | 7 (A) | 9 (S) | 4 (C) | 7 (A) | 10 (S) | 8 (A) |
| College of Dance | XPHB | 8 (A) | 7 (A) | 8 (A) | 8 (A) | 8 (A) | 8 (A) | 7 (A) |
| College of Eloquence | TCE 🕰️ | 5 (B) | 8 (A) | 10 (S) | 4 (C) | 7 (A) | 9 (S) | 6 (B) |
| College of Fools | GrimHollowPG24 | 8 (A) | 8 (A) | 8 (A) | 9 (S) | 8 (A) | 8 (A) | 7 (A) |
| College of Glamour | XPHB | 5 (B) | 9 (S) | 8 (A) | 8 (A) | 8 (A) | 8 (A) | 8 (A) |
| College of Graffiti | VSS 🕰️ | 7 (A) | 8 (A) | 8 (A) | 4 (C) | 6 (B) | 8 (A) | 7 (A) |
| College of Jesters | VSS 🕰️ | 8 (A) | 7 (A) | 8 (A) | 5 (B) | 8 (A) | 8 (A) | 7 (A) |
| College of Lore | XPHB | 5 (B) | 8 (A) | 8 (A) | 4 (C) | 7 (A) | 9 (S) | 8 (A) |
| College of Masks | VSS 🕰️ | 9 (S) | 8 (A) | 9 (S) | 5 (B) | 7 (A) | 9 (S) | 9 (S) |
| College of Requiems | GrimHollowPG24 | 9 (S) | 7 (A) | 9 (S) | 4 (C) | 8 (A) | 8 (A) | 7 (A) |
| College of Romance | VSS 🕰️ | 6 (B) | 9 (S) | 8 (A) | 4 (C) | 6 (B) | 9 (S) | 6 (B) |
| College of Spirits | RHW | 9 (S) | 8 (A) | 9 (S) | 6 (B) | 7 (A) | 8 (A) | 9 (S) |
| College of Swords | XGE 🕰️ | 9 (S) | 7 (A) | 8 (A) | 6 (B) | 8 (A) | 8 (A) | 7 (A) |
| College of the Mad God | VSS 🕰️ | 10 (S) | 9 (S) | 8 (A) | 4 (C) | 7 (A) | 8 (A) | 6 (B) |
| College of the Moon | FRHoF 🕰️ | 6 (B) | 7 (A) | 9 (S) | 8 (A) | 7 (A) | 8 (A) | 7 (A) |
| College of Valor | XPHB | 9 (S) | 7 (A) | 9 (S) | 5 (B) | 9 (S) | 8 (A) | 7 (A) |
| College of Whispers | XGE 🕰️ | 9 (S) | 8 (A) | 8 (A) | 4 (C) | 6 (B) | 9 (S) | 7 (A) |

---

### College of Adventurers (GrimHollowPG24)

> **หมายเหตุ**: subclass นี้ให้เลือก "Adventurer's Talent" 3→5 อย่างจาก 11 ตัวเลือก (Barbarian/Cleric/Druid/Fighter/Monk/Paladin/Ranger/Rogue/Sorcerer/Warlock/Wizard) — คะแนนประเมินจากภาพรวม pool ทั้งหมด เพราะแต่ละ talent มาจากอีก class หนึ่งโดยตรง breadth จึงกว้างเป็นพิเศษ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Paladin talent ให้ smite ผ่าน spell slot (1d6/ระดับ + โบนัสใส่ fiend/undead) เมื่อตีโดนด้วยอาวุธ — เพิ่มดาเมจ nova ให้ build caster [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | talent ส่วนใหญ่เป็นบัฟ/utility ไม่ใช่ control โดยตรง แม้ Wizard talent จะเลือกยืม control spell ได้ก็ตาม = เท่า baseline |
| **Support** | 9/10 (S) | Party Planner ให้ ally ที่ถือ BI die ใช้ Help action ด้วย bonus action ได้ฟรีทุกครั้ง + Cleric talent ให้ temp HP+radiant proc แก่เพื่อน — support ซ้อนสองชั้น [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Barbarian talent (resistance BPS 1 นาที ผ่าน bonus action) + Monk talent (Unarmored Defense Dex+Cha) เป็นตัวเลือกป้องกันตัวเองที่แท้จริง [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | เกือบทุก talent เป็น bonus action (Rogue Dash/Disengage/Hide, Barbarian rampage, Monk extra unarmed strike) — คลัง action-economy กว้างมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Ranger talent (free Hunter's Mark) + Wizard talent (2 spell เตรียมฟรีจาก Wizard list สลับได้ทุกเลเวล) + Well-Rounded (tool+skill+language) — breadth utility กว้างที่สุดในกลุ่ม Bard ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 10/10 (S) | เลือก talent ได้จาก 11 class ที่ต่างกันโดยสิ้นเชิง (tank/healer/blaster/striker/scout/warlock) สลับได้ที่ lv14 — เป็น subclass ที่ "ขโมย" อัตลักษณ์ของทุก class ในเกมมารวมกัน [M:4/4] [R:3/3] [B:3/3] |

### College of Cantors (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Angelic Chorus (lv6) ward ให้เพื่อนสะท้อนดาเมจ radiant เท่าครึ่งเลเวลใส่ผู้โจมตี — ดาเมจทางอ้อมที่ magnitude ต่ำ [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Healing Hymn บวก BI die + ครึ่งเลเวลเข้า**ทุกครั้ง**ที่ spell ฮีลของตัวเองทำงาน (Song of Divines lv14 ทำให้ใช้ฟรีไม่เสีย BI) — ขยายกำลังฮีลของ Bard ได้มหาศาลแบบไม่มีข้อจำกัดจากเลเวล 14 เป็นต้นไป [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Angelic Chorus ให้ Help action ผูกกับการ cast thaumaturgy ในโอกาสเดียว (ระยะขยายเป็น 30ft) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | thaumaturgy cantrip เพิ่มเข้ามาเป็น utility เล็กน้อย ไม่ได้ขยาย breadth เกิน baseline อย่างมีนัยสำคัญ = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | เป็น dedicated healer-support ธีมเดียวตลอด ไม่ขยาย role อื่น = เท่า baseline |

### College of Creation (TCE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Mote of Potential เพิ่ม thunder damage เท่า BI die ให้เป้าและคนรอบข้างทุกครั้งที่ ally ใช้ BI die กับ attack roll — ดาเมจแถมที่ผูกกับ Support baseline อยู่แล้ว [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Mote เพิ่มเอฟเฟกต์ให้ **ทุกการใช้ BI die** (temp HP บน save, reroll บน check, dmg บน attack) โดยอัตโนมัติ + Animating Performance (lv6) ให้ item ที่มีสแตทบล็อกเป็นตัวช่วยรบฟรีอีกตัว [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Animating Performance สั่งการผ่าน bonus action เดียวกับ Bardic Inspiration ได้เลย [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 10/10 (S) | Performance of Creation สร้างไอเทมไม่มีเวทย์อะไรก็ได้ (มูลค่าถึง 20gp×เลเวล ขนาดสูงสุด Huge ที่ lv14 และไม่จำกัด gp ที่ Creative Crescendo) — หนึ่งใน utility feature ที่ทรงพลังที่สุดในเกม (เชือก บันได เรือ เครื่องมือช่าง ฯลฯ ตามใจ) [M:4/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ครอบคลุมทั้งการสร้างไอเทมนอกคอมแบต (exploration/social) และ animate item เป็นตัวช่วยรบ (combat) [M:3/4] [R:2/3] [B:3/3] |

### College of Dance (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Bardic Damage ให้ unarmed strike ดาเมจ = BI die + Dex mod **โดยไม่เสีย die** ทุกครั้ง บวก Agile Strikes แถม unarmed strike ฟรีทุกครั้งที่เสีย BI die กับ action/bonus action/reaction ใดๆ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Inspiring Movement (lv6) ให้ ally เคลื่อนที่ฟรีครึ่ง speed ไม่โดน opportunity attack ผ่าน reaction เดียวกัน + Tandem Footwork ให้ initiative bonus ทั้งทีม (BI die) ตอนเริ่มไฟต์ [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Unarmored Defense (Dex+Cha AC) ดีกว่า light armor ปกติ + Leading Evasion (lv14) แปลง half-damage save เป็น no-damage บน success (Evasion เต็มรูปแบบ) พร้อมแชร์ให้เพื่อนข้างตัวได้ [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Agile Strikes แปะ unarmed strike ฟรีเข้ากับ**ทุก**การเสีย BI die (action/bonus/reaction ใดก็ได้) — action-economy multiplier ที่กว้างมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Dance Virtuoso เป็น flavor check เท่านั้น ไม่ขยาย breadth utility เกิน baseline = เท่า baseline |
| **Versatility** | 7/10 (A) | เปลี่ยน Bard จาก caster ล้วนเป็น melee-striker/evasion-tank ผสม พร้อม initiative-buffer ให้ทีม — playstyle ต่างจาก baseline ชัดเจน [M:2/4] [R:3/3] [B:2/3] |

### College of Eloquence (TCE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจ = เท่า baseline |
| **Control** | 8/10 (A) | Unsettling Words หัก BI die ออกจาก saving throw ครั้งถัดไปของเป้า**ก่อน**ที่มันจะ roll — ตั้งเงื่อนไขให้ control spell ของทีมสำเร็จง่ายขึ้นมาก [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 10/10 (S) | Unfailing Inspiration ทำให้ BI die ไม่มีวันเสียเปล่า (ได้คืนถ้า roll ที่ใช้ล้มเหลว) + Infectious Inspiration (lv14) แจก BI die ฟรีให้อีกคนทุกครั้งที่มีคน roll สำเร็จ (Cha mod ครั้ง/วัน) — ทำให้ core Bardic Inspiration ของ baseline แทบไม่มีข้อจำกัดด้านปริมาณอีกต่อไป [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Infectious Inspiration เป็น reaction แจก BI die ฟรีไม่เสีย use ตัวเอง [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Silver Tongue การันตี Persuasion/Deception ไม่พลาดง่ายๆ (treat 9 ลงเป็น 10) + Universal Speech (lv6) ทำให้ทุกคนเข้าใจภาษาที่พูดได้ 1 ชม. — social utility ที่แข็งแรงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | เน้นสาย social/support หนักมาก ไม่ได้ขยาย combat breadth = เท่า baseline |

### College of Fools (GrimHollowPG24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cruel Jest (reaction, BI die+Cha psychic dmg ทุกครั้งที่มีคน**ล้มเหลว**การ roll ในระยะ 30ft) + Last Laugh (lv14, สะท้อน psychic dmg สูงสุด 3×BI die ใส่ผู้โจมตี) — คลังดาเมจปฏิกิริยาที่ trigger บ่อย [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Antagonistic Antics แถม Vicious Mockery ฟรีผูกกับ Dash/Disengage/Influence + Cruel Jest ให้ disadvantage การ roll ครั้งถัดไปของเป้า + Gallows Humor (lv6) บังคับ prone+speed 0 เมื่อมีคนตายใกล้ตัว [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 9/10 (S) | Last Laugh (lv14) ให้ **resistance ทุกชนิดดาเมจ 1 นาที** เมื่อเลือดต่ำ (trigger ฟรีด้วย reaction) — panic button ระดับสูง [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Antagonistic Antics แปะ cast Vicious Mockery ฟรีเข้ากับ action อื่นที่ทำอยู่แล้ว + Cruel Jest/Gallows Humor/Last Laugh ล้วนเป็น reaction [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | คลังปฏิกิริยา (damage+control+defense) ที่ trigger จากสถานการณ์ต่างกัน ทำให้ตอบสนองได้หลายแบบในไฟต์เดียว [M:2/4] [R:3/3] [B:2/3] |

### College of Glamour (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจ = เท่า baseline |
| **Control** | 9/10 (S) | Beguiling Magic บังคับ charm/frighten ฟรีหลัง cast Enchantment/Illusion (คืนใช้ได้ด้วย BI die) + Mantle of Majesty (lv6) free-cast Command ด้วย bonus action **ซ้ำได้ทุกเทิร์นนาน 1 นาที** และเป้าที่ถูก charm ไว้ fail การ save อัตโนมัติ — control kit ที่แข็งแรงที่สุดในกลุ่ม Bard ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | Mantle of Inspiration ให้ temp HP (2×BI die) แก่เพื่อนหลายคน (Cha mod คน) พร้อม reaction เคลื่อนที่หนีไม่โดน opportunity attack — AoE support ผ่าน bonus action เดียว = เท่า baseline (ครอบคลุมเทียบเท่า) |
| **Survivability** | 8/10 (A) | Unbreakable Majesty (lv14) บังคับ Charisma save ไม่งั้นการโจมตีที่โดนตัวเองพลาดไปเลย 1 นาที — กันโดนตีได้เกือบสมบูรณ์ในช่วงเวลานั้น [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | ทั้ง Mantle of Inspiration และ Mantle of Majesty ทำงานผ่าน bonus action ที่ให้ผลกว้างมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 8/10 (A) | ครบทั้ง control ระดับสูง + support ทีม + self-defense ในตัวเดียว [M:3/4] [R:2/3] [B:3/3] |

### College of Graffiti (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Signature Mark เพิ่ม 1d8 ทุกเทิร์นที่ตีเป้าที่ mark ไว้ + Kaleidoscopic Spray (lv14) เป็น AoE cone ที่ mark ทุกตัวในพื้นที่ [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Kaleidoscopic Spray (lv14) บังคับ Dex save ไม่งั้น blind จนจบเทิร์นถัดไป เป็น AoE hard-CC ที่ baseline ไม่มี [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Street Art ให้บัฟ +1→+3 (ability check/attack/save) แก่ทั้งทีมในระยะ 30ft นาน 1 นาที + Signature Mark ให้ ally advantage โจมตีเป้าที่ mark ผ่าน reaction — support สองชั้น [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 6/10 (B) | Signature Mark เป็น bonus action แต่ Street Art ยังเสีย action ปกติ = ใกล้เท่า baseline |
| **Utility** | 8/10 (A) | tag cantrip เน้น marking/flavor ไม่ได้ขยาย breadth utility เกิน baseline = เท่า baseline |
| **Versatility** | 7/10 (A) | ทำหน้าที่ได้ทั้ง party-buffer (Street Art) และ damage-amplifier/target-marker (Signature Mark) [M:2/4] [R:3/3] [B:2/3] |

### College of Jesters (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Raconteur เพิ่มดาเมจ BI die+Cha ให้ Vicious Mockery ที่พลาด save + Juggling (lv6) แถมโจมตีระยะไกลฟรีทุกเทิร์นที่ผูกกับ Attack/disengage/Vicious Mockery + Grand Finale (lv14) ให้ action เต็มเพิ่มอีกหนึ่งครั้งต่อไฟต์ [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Raconteur ให้ disadvantage การ save ครั้งถัดไปถ้าพลาด Vicious Mockery เกิน 5 — เป็น soft-control ที่แคบกว่าคลัง control spell ของ baseline อยู่แล้ว = เท่า baseline |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 5/10 (B) | Advanced Tumbling ให้เดินทะลุตัวศัตรูได้และเป้าที่โดนทะลุมี disadvantage opportunity attack ใส่คุณ — mobility-based defense เล็กน้อย [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Grand Finale คือ action เต็มเพิ่มอีกหนึ่งครั้งฟรี (1/ไฟต์) + Juggling แถมโจมตีระยะไกลฟรีทุกเทิร์น [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | เพิ่ม breadth ด้าน mobility-melee + ranged-juggling ให้ build caster เดิม [M:2/4] [R:3/3] [B:2/3] |

### College of Lore (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรง = เท่า baseline |
| **Control** | 8/10 (A) | Cutting Words (reaction, หัก BI die จาก damage/check/attack roll ของศัตรู) เปลี่ยนการโจมตีที่โดนให้พลาด/ความสำเร็จให้ล้มเหลวได้ + Magical Discoveries (lv6) เข้าถึง control spell จาก Cleric/Druid/Wizard list แบบเตรียมถาวรไม่แย่ง slot ปกติ [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | Cutting Words/Peerless Skill เป็น self/enemy-targeted ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Cutting Words/Peerless Skill เป็น reaction/free-die-add ไม่เสีย action เพิ่ม = เท่า baseline |
| **Utility** | 9/10 (S) | Bonus Proficiencies (3 skill) + Magical Discoveries ให้ 2 spell เตรียมถาวรจาก Cleric/Druid/Wizard list **สลับได้ทุกเลเวล** — ยืดหยุ่นกว่าการยืม spell แบบปกติของ baseline มาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Magical Discoveries ทำลายข้อจำกัด "สลับ prepared spell 1 คาถา/level-up" ของ baseline สำหรับ 2 ช่องนี้ (สลับได้ทุกเลเวล) และครอบคลุมถึง 3 spell list [M:3/4] [R:2/3] [B:3/3] |

### College of Masks (VSS 🕰️)

> **หมายเหตุ**: Persona Masks มีตัวเลือก 9 แบบ (Angel/Archmage/Devil/Dragon/Faceless/Fool/Gladiator/High Priest/Lord/Spirit) รู้ 2→4 อันพร้อมกัน สลับได้ทุกเลเวล — คะแนนประเมินจากภาพรวม pool

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Dragon mask (3×BI die fire cone AoE) + Devil mask (2×BI die fire reaction) + Angel mask (radiant on hit) + Archmage/High Priest มาพร้อม spell list ของ Wizard/Cleric เพิ่มตัวเลือกดาเมจอีกชั้น [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Archmage/High Priest เปิดให้เตรียม control spell จาก Wizard/Cleric list ได้จริง แม้ mask ส่วนใหญ่จะเน้นดาเมจ/utility มากกว่า [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Lord mask ให้เพื่อนที่ถือ BI die reroll เลข 1 (หรือ 1-2 ที่ lv6) ได้ — เพิ่ม reliability ของ Bardic Inspiration ให้ทั้งทีม [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Spirit mask ให้ invisibility ระยะยาวเป็นการป้องกัน/หนีที่ทรงพลัง + Faceless mask ให้ disguise self ฟรี [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | สลับ mask ด้วย bonus action + Fool mask แถม Disengage/Dash เป็น bonus action [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Faceless (disguise self ฟรี) + Archmage/High Priest (spell list เพิ่ม) + Spirit (stealth ระยะยาว) — breadth utility กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | 9 mask ครอบคลุมเกือบทุก role (blaster/tank/scout/support/caster-hybrid) สลับได้ทุกเลเวล และสวมพร้อมกัน 2 อันที่ lv14 [M:3/4] [R:3/3] [B:3/3] |

### College of Requiems (GrimHollowPG24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Pluck the Heartstrings (BI die necrotic dmg บวกเข้าการโจมตี) + Stir the Bones (lv6, แจก BI die ให้ undead minion ที่ควบคุมอยู่ทุกตัว ไม่นับ limit ปกติ) + Dual Death (lv14, necromancy spell เดี่ยวโจมตีได้ 2 เป้า) — ดาเมจทวีคูณผ่านกองทัพ undead [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ตรงติด chassis (ต้องพึ่ง stat block ของ undead ที่ summon เอง) = เท่า baseline |
| **Support** | 9/10 (S) | Pluck the Heartstrings โหมด defense ให้เพื่อนที่ลง 0 HP รอด (stabilize ที่ HP = BI die แทนตาย) — เป็น safety-net ที่ baseline ไม่มีเลย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | แจก BI die ให้ minion หลายตัวพร้อมกันด้วยการเสีย use เดียว — คุณค่าต่อ action สูงมากเมื่อมี undead หลายตัว [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Animate Dead access สร้างกองกำลัง/แรงงาน undead ถาวรได้ แต่ breadth โดยรวมไม่ได้กว้างกว่า baseline อย่างชัดเจน = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม necromancer-summoner เข้ากับ support kit ของ Bard — เปลี่ยน playstyle จาก baseline ชัดเจน [M:2/4] [R:3/3] [B:2/3] |

### College of Romance (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Enemy of My Enemy (lv6) สั่งเป้าที่ถูก charm ให้โจมตีเป้าอื่นด้วย reaction — ดาเมจทางอ้อมที่ต้อง charm สำเร็จก่อน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 9/10 (S) | Cupid's Arrow (charm ทันที) + Likeable (เป้าที่ charm mมี disadvantage โจมตี+หนีไม่ได้) + Infatuate (lv14, charm ถาวรจนกว่าจะโดน remove curse) — full domination kit [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 6/10 (B) | Likeable/Enemy of My Enemy เป็น bonus action = เท่า baseline |
| **Utility** | 9/10 (S) | Infatuate เปลี่ยน NPC ให้เป็นพันธมิตรถาวร (จนกว่าจะโดน remove curse) — utility เชิงสืบสวน/แทรกซึม/การเมืองที่ทรงพลังกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | เน้น charm/domination ธีมเดียวหนักมาก ไม่ขยาย combat breadth อื่น = เท่า baseline |

### College of Spirits (RHW)

> **หมายเหตุ**: Spirits from Beyond table มี 12 ผลลัพธ์ (heal/dmg 4 ธาตุ/control/mobility/buff) — Controlled Channeling ให้เลือกผลที่ต้องการได้ตรงๆ (ไม่ต้องสุ่ม) ตราบเท่าที่เลขไม่เกินขนาด BI die

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ตารางมีผล Arsonist (4×BI die fire AoE save-for-half), Shade (2×BI die necrotic burst), Brute (3×BI die thunder AoE+prone), Trickster (2×BI die psychic+charm), Sharpshooter/Avenger (force dmg) — breadth และ magnitude สูงมาก โดยเฉพาะเมื่อเลือกได้ตรงผ่าน Controlled Channeling [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Coward (AoE fear+speed halved+action lock), Brute (AoE prone), Trickster (charm) ล้วนเลือกได้แน่นอนผ่าน Controlled Channeling [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Beloved (heal) + Priest (heal 2×BI die + ปลด condition หนักอย่าง Stunned/Paralyzed/Blinded) + Wayfarer (temp HP+speed) + Fortune Teller (advantage ทุก d20 test) — support toolkit ที่ครบเครื่องมาก [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Empowered Channeling (lv6) free-cast Spirit Guardians พร้อม half cover ให้ตัวเองและเพื่อนในออร่า [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | channel เป็น bonus action เหมือน BI ปกติ แต่ unleash ต้องเสีย Magic action แยกต่างหาก — มีต้นทุนเพิ่มขึ้นบ้างเทียบกับ BI baseline [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Guidance cantrip ระยะไกลขึ้น (60ft) + gaming set proficiency ไม่ได้ขยาย breadth utility เกิน baseline มากนัก = ใกล้เท่า baseline |
| **Versatility** | 9/10 (S) | ตาราง 12 ผลครอบคลุมเกือบทุก axis (ดาเมจ 4 ธาตุ/heal/control/mobility/buff) พร้อม Controlled Channeling ให้เลือกตรงได้ตามสถานการณ์ [M:3/4] [R:3/3] [B:3/3] |

### College of Swords (XGE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Blade Flourish (BI die extra dmg ทุกแบบ) + Extra Attack (lv6) + Master's Flourish (lv14, roll d6 แทนการเสีย BI die ทำให้ flourish ใช้ได้แทบไม่จำกัด) — ดาเมจมาร์เชียลที่ reliable สูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Mobile Flourish ผลักเป้าออกไปเล็กน้อย ไม่ใช่ hard-CC = เท่า baseline |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 6/10 (B) | Defensive Flourish บวก BI die เข้า AC ชั่วคราว + medium armor proficiency (ดีกว่า light-only ของ baseline) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Extra Attack (lv6) เพิ่มจำนวนครั้งโจมตีต่อ action หลัก และ Blade Flourish ผูกกับ Attack action ที่ทำอยู่แล้วไม่เสีย action เพิ่ม [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ยกระดับ Bard ให้เป็น melee-striker เต็มรูปแบบควบคู่กับ full spellcasting — dual-role ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:2/3] |

### College of the Mad God (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Mad Melody (lv14) ทำดาเมจ psychic 4d8→7d8→4d8→7d8 ต่อเนื่องสูงสุด 4 เทิร์น (เลือกเป้าได้หลายตัว) บวก Cacophony (BI die psychic dmg ทุกครั้งที่มีคนพลาด save ใส่ spell/feature ของตัวเอง) — magnitude สูงสุดในกลุ่ม Bard subclass ที่ทำมาทั้งหมด [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 9/10 (S) | Frenzied Strings (lv6) บังคับเป้าโจมตีสุ่มทุกตัวที่เห็นรวมถึงพวกพ้องตัวเอง — เทียบเท่า Confusion spell + Cacophony/Mad Melody เพิ่ม deafen/silence/charm stacking [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Cacophony trigger ฟรีจาก spell/feature ที่ cast อยู่แล้ว แต่ Mad Melody ต้องเสีย action เต็มทุกเทิร์นที่ sustain = ใกล้เท่า baseline |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | เป็น damage/control specialist ธีมเดียวหนักมาก ไม่มี support/survivability/utility เพิ่มเลย = เท่า baseline |

### College of the Moon (FRHoF 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Blessing of Moonlight (lv6) ให้ Moonbeam เตรียมถาวร เป็น spell radiant มาตรฐาน ไม่ได้ขยาย magnitude เกิน spell list ปกติมากนัก [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ (invisibility/teleport เป็น mobility ไม่ใช่ control) = เท่า baseline |
| **Support** | 9/10 (S) | Lunar Vitality บวก BI die เข้าทุกครั้งที่ spell ฮีลทำงาน + เพิ่ม speed 10ft ให้เป้า + Blessing of Moonlight ให้ Moonbeam ฮีลเพื่อนทุกครั้งที่ศัตรู fail save — healer-amplifier ที่ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Inspired Eclipse ให้ invisibility+teleport 30ft ฟรีผูกกับ bonus action ปกติของ Bardic Inspiration **ทุกครั้ง** — escape tool ที่ reliable สูงมาก [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Inspired Eclipse ไม่เสีย action แยกเลย (ผูกกับ BI bonus action ที่ทำอยู่แล้ว) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Primal Lore (druidic+cantrip+skill) เป็นการเพิ่มเล็กน้อย ไม่ขยาย breadth เกิน baseline มาก = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | healer-amplifier + self-stealth/mobility ผสมกัน เพิ่ม breadth จาก baseline [M:2/4] [R:3/3] [B:2/3] |

### College of Valor (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Combat Inspiration โหมด offense (BI die dmg) + Extra Attack (lv6) + Battle Magic (lv14, bonus action weapon attack หลัง cast spell action) — สาม stack ดาเมจที่ผสาน spell กับอาวุธได้ลงตัว [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Combat Inspiration โหมด defense ให้ ally ใช้ reaction บวก BI die เข้า AC เพื่อเปลี่ยนโดนตีเป็นพลาดได้จริง — support เชิงป้องกันที่ reliable และตรงเป้าหมาย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Martial Training ให้ medium armor + shield proficiency (AC ดีกว่า light-only ของ baseline) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 9/10 (S) | Extra Attack ให้ cast cantrip แทนการโจมตีหนึ่งครั้งได้ + Battle Magic แถม bonus action weapon attack หลัง cast spell — สาน spellcasting กับการโจมตีได้แน่นที่สุดในกลุ่มที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสาน caster + weapon-striker + shield-tank ได้ในตัวเดียว [M:2/4] [R:3/3] [B:2/3] |

### College of Whispers (XGE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Psychic Blades สเกล 2d6→8d6 (lv15) บวกเข้าการโจมตีอาวุธทุกเทิร์นด้วยการเสีย BI die — magnitude สูงและ reliable เพราะผูกกับการตีอาวุธปกติ [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Words of Terror (Frightened 1 ชม.) + Shadow Lore (lv14, charm/blackmail ระยะยาว 8 ชม.) — control เชิง social ที่ทรงพลังแม้ตั้งเงื่อนไขใช้เวลา [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 6/10 (B) | Psychic Blades แถมดาเมจเข้าการโจมตีที่ทำอยู่แล้ว ไม่เสีย action เพิ่ม = เท่า baseline |
| **Utility** | 9/10 (S) | Mantle of Whispers (lv6) ขโมยตัวตนคนตายมาสวมปลอมตัว 1 ชม. พร้อมเข้าถึงข้อมูลพื้นหลังของเป้า — utility เชิงแทรกซึม/สืบสวนที่ทรงพลังกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสาน assassin/infiltrator (ดาเมจ+ปลอมตัว+blackmail) เข้ากับ caster kit เดิม [M:2/4] [R:3/3] [B:2/3] |
