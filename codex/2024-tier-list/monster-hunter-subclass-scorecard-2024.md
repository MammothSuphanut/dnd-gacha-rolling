# Monster Hunter — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 4 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Monster Hunter](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/grim-hollow/Ghostfire Gaming; Grim Hollow - Player's Guide - 2024.json` — source `GrimHollowPG24`

---

## Class Baseline (Monster Hunter, 2024)

Floor 0-10 ต่อ axis ของ **Monster Hunter เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Dex + Int, armor proficiency light/medium/shield (ไม่มี heavy), weapon proficiency simple+martial, Weapon Mastery, Fighting Style, **Monster Grimoire (lv1, เลือก 2→4 ชนิดสัตว์ประหลาดที่ถนัดล่า ขยายได้แต่สลับไม่ได้)**, Studied Response (lv2, reaction ตีก่อนศัตรูโจมตี คืน reaction ถ้าพลาด), Expert Strike (lv5, บวก Int mod เข้า attack+damage roll ของอาวุธ**ทุกชนิด**), Improved Monster Grimoire (lv6/13), Knowledgeable Defense (lv9), Lair Sense (lv14), **Extra Attack (lv11 — ช้ากว่า martial class ส่วนใหญ่ที่ได้ lv5)**, Slayer's Aid (lv17), Grave Strike (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Expert Strike (lv5) บวก Int mod เข้า attack **และ** damage roll ของอาวุธทุกชนิดแบบ universal (ไม่ผูก Grimoire type) บวก Improved Monster Grimoire (lv6, crit 19-20 เฉพาะเป้าที่อยู่ใน Grimoire) และ Grave Strike (lv20, crit ใส่เป้า Grimoire บังคับ CON save DC=ดาเมจที่ตี (สูงสุด 30) ไม่งั้นร่วง 0 HP ทันที) — magnitude สูงมากแต่ Extra Attack มาช้าถึง lv11 ทำให้ early-mid game อ่อนกว่า martial class อื่น [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Studied Response (lv2) เป็น reaction ตีก่อนศัตรูโจมตี ไม่ใช่ hard-CC จริง (ไม่มีเอฟเฟกต์ผูกเงื่อนไข) ไม่มี control feature ที่ยืนยันได้ติด chassis [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 3/10 (C) | Slayer's Aid (lv17) ให้ ally ใช้ Reaction ของตัวเองร่วมโจมตีเมื่อเรา trigger Studied Response ได้ เป็น support ทางอ้อมที่ปลดล็อกช้ามาก [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 4/10 (C) | HD d10 + armor medium/shield เป็นฐานกลางๆ Knowledgeable Defense (lv9, ใช้ Int save แทน save ปกติเมื่อโดน Grimoire type บังคับ) และ Lair Sense (lv14, Advantage+Resistance ต้าน lair/legendary action ของ Grimoire type) ล้วนผูกกับ "ต้องเจอศัตรูที่อยู่ใน Grimoire" เท่านั้น ไม่ใช่การป้องกันทั่วไป [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Studied Response (lv2) เป็น Reaction ตีศัตรูก่อนที่มันจะโจมตี **และคืน Reaction กลับให้ทันทีถ้าพลาด** ทำให้เป็นการโจมตีฟรีที่แทบไม่มีต้นทุนจริง [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 3/10 (C) | เลือก skill proficiency 3 ตัวจาก list กว้าง (ฐานมาตรฐาน) ไม่มี expertise, ritual, หรือ utility feature พิเศษติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 4/10 (C) | Monster Grimoire ให้เลือกชนิดศัตรูที่ถนัดล่าได้ตรงกับภัยคุกคามของแคมเปญ (2→4 ชนิด) แต่เป็นการ**เพิ่มชนิดใหม่เท่านั้น สลับของเดิมไม่ได้** ทำให้ปรับตัวได้ช้ากว่า class อื่นที่ swap ได้ทุก long rest [M:2/4] [R:1/3] [B:1/3] |

---

## Subclass Scoring (4)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Monster Hunter](00-scorecard-progress.md)_
