# Witch — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 13 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Witch](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Witch, 2024)

Floor 0-10 ต่อ axis ของ **Witch เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Cha, full caster progression, saving throw proficiency Wis + Cha, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Hexes (lv1, cantrip พิเศษสาย curse 2→มากขึ้น แยกจากนับ cantrip ปกติ), Witch's Curse (lv1, เลือก 1 จาก 11 คำสาปประจำตัว), Cackle (lv2, Bonus Action ยืด Hex ออก 1 รอบ), Familiar (lv2, Find Familiar ติดตัวฟรี cast 10 นาทีไม่เสีย slot, form พิเศษ, ลงมือประกบเทิร์นเรา), Insidious Spell (lv5, ผูก Disadvantage save ระหว่าง Hex กับ Witch spell อื่น), Improved Familiar (lv7), Hastened Hex (lv9, cast Hex + cantrip อื่นพร้อมกันใน 1 action), Grand Hex (lv11/13/15/17, รวม 4 ตัว), Vengeful Curse (lv18), Hexmaster (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Full spell slot lv1-9 บวก Hexes ที่เป็น cantrip พิเศษแยกโควตา (นับเพิ่มจาก cantrip ปกติ) และ Hastened Hex (lv9) ให้ cast Hex **พร้อมกับ** cantrip อื่นในการ cast เดียวกัน — เท่ากับยิงได้ 2 คาถาต่อ 1 action ฟรีไม่เสีย resource เพิ่ม เป็น magnitude ที่สูงมากสำหรับ at-will damage [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Hexes เป็น cantrip สาย curse/debuff โดยธีม (Hex: Misfortune, Hex: Ruin) บวก Insidious Spell (lv5) ที่ผูก Disadvantage saving throw ระหว่าง Hex กับ Witch spell อื่นเข้าด้วยกัน (ศัตรู fail Hex → เสีย save คาถาถัดไปง่ายขึ้น และกลับกัน) ยกระดับ reliability ของ control chain โดยตรงแบบไม่ต้องเสีย resource เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลย — chassis เน้นคำสาป/ดาเมจตัวเองล้วนๆ |
| **Survivability** | 3/10 (C) | HD d8 + armor proficiency แค่ light + saving throw proficiency Wis (กันสาย charm/fear/control ได้กว้าง) เป็นฐานกลางๆ Witch's Curse (lv1) เป็นการแลกเปลี่ยนพลัง-จุดอ่อนตามธีม ไม่ใช่ของเสริม survivability โดยตรง [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Hastened Hex (lv9) ให้ cast Hex + Witch cantrip อื่นพร้อมกันในการ cast เดียว **ไม่เสีย action หรือ resource เพิ่มเลย** เท่ากับได้ 2 casts ต่อ 1 action บวก Familiar's Synchronized Turns (ลงมือก่อน/หลังเราทันที เป็นแหล่ง action เสริมย่อยๆ) และ Cackle เป็นแค่ Bonus Action [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Familiar (lv2) ติดตัวฟรีไม่เสีย slot cast 10 นาที เข้าถึง form พิเศษหลากหลาย (Flying Book, Pet Rock, Moon Jelly ฯลฯ) ที่ปรับปรุงเพิ่มที่ lv7 (Force damage option + form โหดขึ้นอย่าง Imp/Quasit) เป็นเครื่องมือสอดแนม/สำรวจที่ฟรีตลอดกาลไม่จำกัดจำนวนครั้ง [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Grand Hex (lv11-17, รวม 4 ตัว สลับได้ทุก level-up) ให้เลือกพลังสาย curse ขั้นสูงตามสถานการณ์ บวก Familiar ที่เปลี่ยน form ได้ (recast ใหม่) ปรับบทบาทสัตว์เลี้ยงให้ตรงงาน — Witch's Curse (lv1) เป็นตัวเลือกที่ตรึงตัวตนของตัวละครไว้ ไม่สลับภายหลัง [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (13)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Witch](00-scorecard-progress.md)_
