# Cleric — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 27 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Cleric](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

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

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Cleric](00-scorecard-progress.md)_
