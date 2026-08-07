# Warden — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 17 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warden](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Warden, 2024)

Floor 0-10 ต่อ axis ของ **Warden เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery, Fighting Style, Extra Attack (lv5), Sentinel's Stand (lv1, เลือก save prof เพิ่ม/HP เพิ่ม=Con mod+level/AC โบนัสจาก shield +3→+4 สลับได้ทุก level-up), Guardian Tactics (lv2, Bonus Action: Block=แบ่ง AC ให้ ally ข้างๆ, Challenge=ล่อเป้าศัตรูให้ disadvantage ตีคนอื่น), Unyielding Resolve (lv2, resist B/P/S ตอน Bloodied), Interrupt (lv5, reaction ตัด attack ออกจาก multiattack ศัตรู), Mettle (lv7), Survive (lv9), Sentinel's Strike (lv11), Font of Life (lv13), Extended Tactics (lv14), Improved Resolve (lv15, resist เกือบทุกชนิดดาเมจตอน Bloodied), Sentinel's Soul (lv18), Legendary Resistance (lv20, 3 ครั้ง/long rest เปลี่ยน fail save เป็น success)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Extra Attack (lv5) เป็นฐาน magnitude มาตรฐาน บวก Sentinel's Strike (lv11) มีตัวเลือก Shield Slam ให้ extra 1d8+AC bonus ของ shield ดาเมจทุกครั้งที่ตี — Warden ไม่ได้เน้นดาเมจเป็นหลัก ธีมเน้น defense/control มากกว่า [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 6/10 (B) | Guardian Tactics' Challenge (Bonus Action ทุกเทิร์น ฟรี) ล่อศัตรูให้ Disadvantage โจมตีคนอื่นนอกจากเรา บวก Interrupt (lv5, reaction) **ตัด attack หรือ ability ออกจาก multiattack ของศัตรูได้โดยตรง** ก่อนแม้แต่จะทอย d20 เป็น action-denial ที่แรงมาก (3 ครั้ง/วัน ฟื้น 1/short rest) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | Guardian Tactics' Block (Bonus Action ทุกเทิร์น ฟรี) ให้ ally ข้างๆ ใช้ AC ของเราแทนถ้าสูงกว่า เป็นการโอนความทนทานให้ทีมโดยตรง บวก Challenge ที่ดึงเป้าศัตรูออกจาก ally — เป็น toolkit "ผู้พิทักษ์" ที่ออกแบบมาปกป้องทีมชัดเจน ใช้ได้ไม่จำกัดจำนวนครั้ง/วัน [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Sentinel's Stand ให้เลือก HP เพิ่ม/save prof เพิ่ม/AC โบนัส shield +3→+4 ตั้งแต่ lv1 บวก Unyielding Resolve (lv2, resist B/P/S ตอน Bloodied แบบ passive) ขยายเป็น**เกือบทุกชนิดดาเมจ**ที่ lv15 (Improved Resolve) บวก Mettle (lv7, Con-save ครึ่งดาเมจกลายเป็นศูนย์), Survive (lv9, กันตาย+ฮีลก้อนใหญ่), Font of Life (lv13, ล้าง condition ฟรีทุกเทิร์น) และ Legendary Resistance (lv20, เปลี่ยน fail save เป็น success ได้ 3 ครั้ง/long rest) — ชั้นการป้องกันครบทุกมิติมากที่สุดในบรรดา class ที่ทำมาแล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Guardian Tactics ใช้ Bonus Action ฟรีไม่จำกัดจำนวนครั้ง/เทิร์น, Interrupt เป็น Reaction ฟรี, Font of Life เป็น "no action required" — ทุกอย่างประหยัด action แม้จะไม่มี extra-attack หรือ extra-turn โดยตรง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Sentinel's Soul (lv18) มีตัวเลือก All-Seeing ให้ Blindsight 30ft เป็น utility เดียวที่ยืนยันได้ ปลดล็อกช้ามาก ไม่มี skill bonus หรือ ritual casting [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Sentinel's Stand/Strike/Soul เป็นจุดเลือก build 3 จุดกระจายทั้งอาชีพ (lv1/11/18) สลับได้ทุก level-up หรือ long rest ปรับ playstyle การป้องกัน/ล่อเป้าได้หลายแบบ แต่ยังคงเป็น archetype tank/defender ตายตัว ไม่มีทางปรับ role อื่น [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (17)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Warden](00-scorecard-progress.md)_
