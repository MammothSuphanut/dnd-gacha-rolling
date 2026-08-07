# Sacred Knight — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass — **Sacred Throne** ทั้ง 6 (ดูรายชื่อใน [00-scorecard-progress.md § Sacred Knight](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน Sacred Throne ตัวไหนเลย

**ที่มาข้อมูล chassis**: [Sacred-Knight.md](../homebrew-subclass/Sacred-Knight/Sacred-Knight.md) — homebrew class ของโปรเจกต์นี้เอง (ไม่ใช่เนื้อหาทางการ)

**⚠️ โครงสร้างเฉพาะของ class นี้**: "subclass" ที่ประเมินในไฟล์นี้คือ **Sacred Throne** (เลือก lv3) — แยกจาก **Path** (Retribution/Guardian/Formless, เลือก lv1) ที่กำหนดว่าเรียน Fervor Technique จากลิสต์ไหนได้ Path ไม่ใช่ subclass ในระบบนี้ แต่เป็นทางเลือกระดับ chassis เหมือน Cleric's Divine Order — คะแนน baseline ด้านล่างเครดิตแค่สิ่งที่ **ทุก Path เข้าถึงได้อย่างน้อย 1 ทาง** (Universal technique list) หรือระบุชัดว่าอิงจากการเลือก Path

---

## Class Baseline (Sacred Knight, 2024)

Floor 0-10 ต่อ axis ของ **Sacred Knight เปล่าๆ ไม่นับ Sacred Throne feature ใดๆ เลย** — HD d10, saving throw proficiency Str + Wis, armor light/medium (+heavy ถ้าเลือก Guardian Path), weapon simple + versatile martial, **ไม่มี Extra Attack ตลอดทั้ง class โดยตั้งใจ** (เป็น trade-off หลักของดีไซน์), **Fervor**: ตาราง spell slot เท่า full caster แต่แปลงเป็น Fervor เท่านั้น (ห้าม cast spell) แปลงด้วย Bonus Action ได้ slot level+Wis mod ต่อ slot, Fervor Surge (lv2, แปลง 2 slot/bonus action 1 ครั้ง/short rest → 2 ครั้งที่ lv11), Fervor Mastery (เรียน Technique รวม 5 ตัวตลอด class: lv1/2/5/9/13), Improve Fervor Technique (lv7, lv15), Fervor Overflow (lv18, แปลง 2 slot อัตโนมัติทุกเทิร์น), Transcendent Fervor (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี Extra Attack ทำให้ magnitude ฐานต่ำกว่า martial class ทั่วไปชัดเจน ชดเชยด้วย Faith Halo (Universal, บวก attack roll ได้สูงสุด Wis mod+Prof stack ต่อการตี — เพิ่ม accuracy ไม่ใช่ raw damage) และถ้าเลือก Retribution/Formless Path จะเข้าถึง Light Sword (extra 1d4→1d6 ต่อ stack) กับ Cross Slash (ซื้อการตีเพิ่มด้วย Fervor) ได้ — Fervor pool มีขนาดเท่า full caster's spell slot table ทำให้ resource ไม่ขาดแคลน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี Fervor Technique สาย control ใน Universal list เลย (Pure White Blade=ระยะ, Swift=ความเร็ว, Faith Halo=accuracy, Clarity=check) และ Retribution/Guardian list ที่เห็นก็เป็นสายดาเมจ/ป้องกันล้วนๆ ไม่มี hard-CC [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 3/10 (C) | Bulwark Shift (Guardian-only Technique) สลับตำแหน่งกับ ally ในระยะที่จ่าย Fervor ไหวได้แบบไม่โดน opportunity attack เป็น support ทางยุทธวิธีที่ดี แต่ผูกกับการเลือก Guardian Path เท่านั้น (2 ใน 3 Path ไม่ได้อะไรด้านนี้เลย) [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | HD d10 บวก **ทุก Path ล้วนให้ +1 AC ภายใต้เงื่อนไขของตัวเอง** (Retribution/Formless: dual-wield, Guardian: ถือ shield) เป็นฐานที่รับประกันไม่ว่าจะเลือกทางไหน ถ้าเลือก Guardian Path จะเข้าถึง Spirit Ward (Fervor ลดดาเมจอัตรา 1:2 → 1:3) และ Guardian's Blessing (Fervor เปลี่ยน failed save เป็น success) ซึ่งแรงมากแต่ผูก Path [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Fervor แปลงด้วย **Bonus Action เท่านั้น ไม่แตะ action หลักเลย** (ออกแบบมาให้ action เหลือไว้โจมตี/ใช้ Technique เสมอ) บวก Rising Dragon Strike (Retribution, ตอบโต้เมื่อโดนตี "ไม่เสีย reaction") และ Fervor Surge ให้แปลง 2 slot ในการ bonus action เดียว 1-2 ครั้ง/short rest [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Clarity (Universal Technique) บวก Fervor เข้า ability check ใดๆ ก่อนทอย (อัตราเดียวกับ Faith Halo) เป็นเครื่องมือ non-combat ที่แท้จริงเพียงตัวเดียวที่ทุก Path เรียนได้ บวก Swift ช่วยเรื่อง pace การเดินทางทางอ้อม ไม่มี skill bonus หรือ ritual casting [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Fervor เป็น resource pool **ก้อนเดียวที่จ่ายได้ทั้งดาเมจ/ป้องกัน/ความเร็ว/check** แล้วแต่ Technique ที่เลือกใช้ในแต่ละเทิร์น (ไม่ผูก role ตายตัวเหมือน resource แยกของ class อื่น) บวก Formless Path ที่ออกแบบมาให้เรียนได้ทั้ง 3 ลิสต์พร้อมกันโดยเฉพาะ แลกกับไม่ถึงจุดสูงสุดของสาย damage/defense เดี่ยวๆ [M:3/4] [R:2/3] [B:2/3] |

---

## Subclass (Sacred Throne) Scoring (6)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Sacred Knight](00-scorecard-progress.md)_
