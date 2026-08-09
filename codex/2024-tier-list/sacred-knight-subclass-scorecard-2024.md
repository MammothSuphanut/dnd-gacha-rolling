# Sacred Knight — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass — **Sacred Throne** ทั้ง 6 (ดูรายชื่อใน [00-scorecard-progress.md § Sacred Knight](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ประเมินใหม่ทั้งไฟล์รอบที่ 2 (2026-08-09) — Class Baseline + Subclass Scoring ครบทั้ง 6 Sacred Throne

**ที่มาข้อมูล chassis**: [Sacred-Knight.md](../homebrew-subclass/Sacred-Knight/Sacred-Knight.md) — homebrew class ของโปรเจกต์นี้เอง (ไม่ใช่เนื้อหาทางการ) — **ไฟล์นี้คือ source of truth** (ไฟล์ `Sacred-Knight-concept.md` ในโฟลเดอร์เดียวกันเป็นดราฟต์ภาษาไทยรุ่นเก่าที่ยังบรรยาย equipment-gate ของ Fervor Technique ที่ถูกตัดออกไปแล้ว ห้ามใช้เป็นแหล่งอ้างอิงกลไก)

**⚠️ โครงสร้างเฉพาะของ class นี้**: "subclass" ที่ประเมินในไฟล์นี้คือ **Sacred Throne** (เลือก lv3) — แยกจาก **Path** (Retribution/Guardian/Formless, เลือก lv1) ที่กำหนดว่าเรียน Fervor Technique จากลิสต์ไหนได้ Path ไม่ใช่ subclass ในระบบนี้ แต่เป็นทางเลือกระดับ chassis เหมือน Cleric's Divine Order — คะแนน baseline ด้านล่างเครดิตแค่สิ่งที่ **ทุก Path เข้าถึงได้อย่างน้อย 1 ทาง** (Universal technique list) หรือระบุชัดว่าอิงจากการเลือก Path

**อัปเดต 2026-08-09 (รอบประเมินใหม่ทั้งไฟล์)**: ตรวจสอบเหตุผลรายแกนของทั้ง 6 Throne กับไฟล์ Throne ต้นฉบับใหม่ทีละบรรทัด พบ **4 จุดที่เหตุผลเดิมอธิบายกลไกผิดจากสิ่งที่ไฟล์จริงเขียนไว้** และแก้ไขแล้ว:
1. **Doom and Slaughter — Unrelenting Carnage (lv10)**: ของจริงคือ "Cross Slash แต่ละครั้งที่ตี ได้ Speed +5 ft" (ฟีเจอร์ mobility) **ไม่ใช่** "ทะลุ resistance/immunity ดาเมจกายภาพ" ตามที่เขียนไว้เดิม — แก้เหตุผล Damage แล้ว (คะแนนรวมยังคง 9/10 เพราะ Blood for Blood + Sealed Fate/Final Verdict ยังหนักแน่นพอ)
2. **Eternity and Creation — Genesis Wave (lv6) / Absolute Genesis (lv14)**: ของจริงคือฟีเจอร์ทั้งคู่เพิ่ม **เฉพาะฮีล/temp-HP ของ Everlasting Grace** เท่านั้น (Genesis Wave = ฮีลเสริม 1d4 ต่อทุก 3 Fervor, Absolute Genesis = อัพเกรดไดซ์ 1d4→1d6) **ไม่มี AoE และไม่มี resistance ดาเมจกายภาพ** ตามที่เขียนไว้เดิมเลย ผลคือ **Damage ของ Throne นี้ต้องกลับไปเท่า baseline พอดี** (ไม่ใช่ A ที่เสริมจาก AoE ปลอม) แต่ Survivability ขยับเป็น S ได้จริงจากการฮีล/temp-HP ตัวเอง — Overall ยังคง S เพราะยังไม่มี Path lock และ Support/Survivability/Versatility ยกระดับจริงทั้ง 3 แกน
3. **Fear and Sorrow — Sorrow's Toll (lv3)**: ของจริง**ไม่มี**เพดาน "Prof Bonus ครั้ง/long rest" ตามที่เขียนไว้เดิม — ใช้ได้ทุกครั้งที่ทำ Bonus Action แปลง Fervor ปกติ (แทบทุกเทิร์น) จำกัดแค่ WIS mod Fervor เสริม/ครั้ง และ HP ตัวเองเป็นเพดานธรรมชาติเท่านั้น แก้เหตุผล Damage/Survivability แล้ว
4. **Order and Law — Commander's Cadence (lv3)**: ของจริงคือ ally ที่ได้รับผล **ใช้ reaction ของ ally เอง** ไม่ใช่ reaction ของ Sacred Knight (และตัว Commander's Cadence เองก็เสีย **Action** เต็มของ Sacred Knight ไม่ใช่ฟรี) — แก้เหตุผล Support/Action Economy แล้ว (AE ปรับจาก A ที่เสริมเหนือ baseline กลับมาเท่า baseline พอดี เพื่อไม่ให้นับซ้ำกับประโยชน์ที่ให้ทีมซึ่งถูกนับใน Support ไปแล้ว) และ Unyielding Law (lv14) ข้อความจริงเขียนว่า "Swift grants **you** the benefit of the Dodge action" ไม่ได้ยืนยันชัดว่าครอบคลุม ally เหมือน Iron Discipline ที่พูดถึง ally แยกไว้ต่างหาก — ตีความอนุรักษ์นิยมว่าใช้กับตัว Sacred Knight เป็นหลัก

Protection and Mercy และ Wisdom and Spirit ตรวจสอบแล้วตรงกับไฟล์ต้นฉบับทุกจุด ไม่มีการแก้ไข

**อัปเดต 2026-08-09 (รอบที่ 3 — Doom and Slaughter เปลี่ยนกลไกจริง ไม่ใช่แค่แก้เหตุผล)**: ผู้ใช้แก้ไขไฟล์ [Throne-of-Doom-and-Slaughter.md](../homebrew-subclass/Sacred-Knight/Throne-of-Doom-and-Slaughter.md) สลับ/เปลี่ยนกลไกของ lv3 กับ lv6 ทั้งคู่:
- **Blood for Blood (ย้ายมา lv3 จากเดิม lv6)**: เดิมคืนแค่ Fervor = Wis mod ตอน Cross Slash ฆ่าเป้า ตอนนี้คืน **ทั้ง Fervor และ HP** = Wis mod
- **Sealed Fate (ย้ายมา lv6 จากเดิม lv3, เปลี่ยนกลไกทั้งหมด)**: เดิมคือ "ทุก 2 การโจมตีด้วย Cross Slash แถมตีฟรีอีก 1 ครั้ง" (กลไก snowball ที่ไม่มีเพดานตามธรรมชาติ ใกล้เคียงปัญหาที่ Designer's Note บ่นถึง) ตอนนี้เปลี่ยนเป็น **ลดต้นทุน Fervor ของ Cross Slash** — คำนวณราวกับได้ Improve Fervor Technique (N+1) มาฟรีตั้งแต่ lv6 โดยไม่ต้องเสีย choice ของ Improve Fervor Technique (lv7/15) เอง และถ้าเลือกปรับปรุง Cross Slash เองซ้ำอีกทีจะลดเหลืออัตรา N (ถูกที่สุดเท่าที่มีในเกม)

ผลคือกลไก "ตีฟรีไม่จำกัด" หายไปทั้งหมด แทนที่ด้วย "ตีถูกลงมาก + สะสม HP/Fervor ตอนฆ่า" ที่ bounded ด้วย Fervor budget เสมอ (ไม่ compounding เอง) — คะแนน Damage/Survivability/Action Economy ของ Throne นี้ปรับใหม่ทั้งหมดด้านล่างตามกลไกจริง

**อัปเดต 2026-08-09 (รอบที่ 4 — แก้ไฟล์ class แม่ [Sacred-Knight.md](../homebrew-subclass/Sacred-Knight/Sacred-Knight.md))**: ตัดข้อความอธิบายซ้ำ "(further limited by the Fervor you have available)" ออกจาก Pure White Blade/Swift/Clarity/Light Sword/Spirit Ward/Guardian's Blessing ทั้งหมด — เป็นแค่ wording cleanup ไม่กระทบกลไกหรือคะแนน (เพดาน Wis mod+Prof stack ของแต่ละ technique ยังเท่าเดิมทุกตัว) แต่มี **2 จุดที่เปลี่ยนกลไกจริง**:
1. **Faith Halo เพิ่มเพดาน Wis mod+Prof stack/ครั้ง** ที่ไม่เคยมีมาก่อน (เดิมจำกัดแค่ Fervor ที่มีเท่านั้น) — ตรงกับที่ baseline Damage ด้านล่างเขียนไว้อยู่แล้วว่า "บวก attack roll ได้สูงสุด Wis mod+Prof stack" (สมมติฐานเดิมตอนนี้กลายเป็นกลไกจริงในไฟล์ class แล้ว) ไม่กระทบคะแนน
2. **Cross Slash ตัดเพดาน "Wis mod+Prof Bonus additional attacks/เทิร์น" ออกทั้งประโยค** (เดิมมีไว้เป็น safety net ที่ตัว baseline เองก็บอกว่า "ส่วนใหญ่ Fervor หมดก่อนถึง cap อยู่แล้ว") ตอนนี้ Cross Slash **ไม่มีเพดานจำนวนครั้ง/เทิร์นอีกต่อไป จำกัดแค่ Fervor budget ล้วนๆ** — ไม่กระทบคะแนน baseline (ยังกิน Fervor เท่าเดิม Fervor budget ยังเป็นตัวจำกัดหลักที่ investment ระดับ baseline) แต่มีผลกับ **Throne of Doom and Slaughter** โดยตรง (ดูหมายเหตุในแถว Damage ของ Throne นั้น) เพราะ Sealed Fate ลดต้นทุน Cross Slash ลงไปอีก ยิ่งทำให้จำนวนครั้ง/เทิร์นที่ทำได้จริงเข้าใกล้จุดที่เพดานเดิมเคยกันไว้

ไฟล์ [Throne-of-Fear-and-Sorrow.md](../homebrew-subclass/Sacred-Knight/Throne-of-Fear-and-Sorrow.md) ก็แก้พร้อมกัน เพิ่มบรรทัด "Faith Halo now can stack exceed the cap in single use" ใต้ Moment of Dread (lv6) — เป็นข้อยกเว้นเพดานใหม่ของ Faith Halo เฉพาะ Throne นี้ เพื่อให้ยังกดกอง stack ถึง threshold AC+15+PB ได้เหมือนเดิม ไม่กระทบคะแนน (คะแนน Damage 9/10 (S) เดิมสมมติไว้แล้วว่า threshold นี้ทำได้เสมอ ตอนนี้แค่ยืนยันด้วยกลไกที่เขียนไว้ชัดเจนขึ้น)

---

## Class Baseline (Sacred Knight, 2024)

Floor 0-10 ต่อ axis ของ **Sacred Knight เปล่าๆ ไม่นับ Sacred Throne feature ใดๆ เลย** — HD d10, saving throw proficiency Str + Wis, armor light/medium (+heavy ถ้าเลือก Guardian Path), weapon simple + versatile martial, **ไม่มี Extra Attack ตลอดทั้ง class โดยตั้งใจ** (เป็น trade-off หลักของดีไซน์), **Fervor**: ตาราง spell slot เท่า full caster แต่แปลงเป็น Fervor เท่านั้น (ห้าม cast spell) แปลงด้วย Bonus Action ได้ slot level+Wis mod ต่อ slot, Fervor Surge (lv2, แปลง 2 slot/bonus action 1 ครั้ง/short rest → 2 ครั้งที่ lv11), Fervor Mastery (เรียน Technique รวม 5 ตัวตลอด class: lv1/2/5/9/13), Improve Fervor Technique (lv7, lv15), Fervor Overflow (lv18, แปลง 2 slot อัตโนมัติทุกเทิร์น), Transcendent Fervor (lv20)

**เรื่อง equipment-gate (สำคัญ)**: ไฟล์ class ล่าสุดตัด equipment-gate ของ Fervor Technique ออกแล้ว — เดิม Retribution technique ต้อง dual-wield อยู่ถึงใช้ได้ และ Guardian technique ต้องถือ shield อยู่ถึงใช้ได้ ตอนนี้ **แค่เรียนรู้ไว้ก็ใช้ได้ตลอดเวลาไม่ว่าจะถืออะไรอยู่** (equipment ยังคุมแค่ stance feature/AC bonus ของ Path เท่านั้น ไม่คุม technique อีกต่อไป) กระทบ Reliability (R) ของ Damage/Support/Survivability/Versatility โดยตรง ดูรายละเอียดในแต่ละแถว

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี Extra Attack ทำให้ magnitude ฐานต่ำกว่า martial class ทั่วไปชัดเจน ชดเชยด้วย Faith Halo (Universal, บวก attack roll ได้สูงสุด Wis mod+Prof stack ต่อการตี — เพิ่ม accuracy ไม่ใช่ raw damage) และถ้าเลือก Retribution/Formless Path จะเข้าถึง Light Sword (extra 1d4→1d6 ต่อ stack) กับ Cross Slash (ซื้อการตีเพิ่มด้วย Fervor **ไม่มีเพดานจำนวนครั้ง/เทิร์นแล้ว จำกัดแค่ Fervor budget**) ได้ — ใช้ได้ตลอดเวลาแม้ไม่ได้ dual-wield อยู่จริง (equipment ไม่ gate technique อีกแล้ว) บวก Fervor pool ขนาดเท่า full caster's spell slot table ทำให้ resource ไม่ขาดแคลน — ที่ investment ระดับ baseline (ไม่มี Sealed Fate ช่วยลดต้นทุน) Fervor budget ยังเป็นตัวจำกัดหลักเหมือนเดิม การตัดเพดานจึงยังไม่ดันคะแนนขึ้น [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี Fervor Technique สาย control ใน Universal list เลย (Pure White Blade=ระยะ, Swift=ความเร็ว, Faith Halo=accuracy, Clarity=check) และ Retribution/Guardian list ที่เห็นก็เป็นสายดาเมจ/ป้องกันล้วนๆ ไม่มี hard-CC [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 4/10 (C) | Bulwark Shift (Guardian-only Technique) สลับตำแหน่งกับเป้าหมายใดก็ได้ (ally หรือ enemy) ในระยะที่จ่าย Fervor ไหวได้แบบไม่โดน opportunity attack เป็น support ทางยุทธวิธีที่ดี แต่ผูกกับการเลือก Guardian Path เท่านั้น (2 ใน 3 Path ไม่ได้อะไรด้านนี้เลย) — ใช้ได้แม้ไม่ได้ถือ shield อยู่แล้ว ทำให้ Guardian เข้าถึง tool นี้ได้แน่นอนขึ้นไม่ว่าจะสลับอาวุธไปมายังไง [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 8/10 (A) | HD d10 บวก **ทุก Path ล้วนให้ +1 AC ภายใต้เงื่อนไขของตัวเอง** (Retribution/Formless: dual-wield, Guardian: ถือ shield) เป็นฐานที่รับประกันไม่ว่าจะเลือกทางไหน ถ้าเลือก Guardian Path จะเข้าถึง Spirit Ward (Fervor ลดดาเมจอัตรา 1:2 → 1:3) และ Guardian's Blessing (Fervor เปลี่ยน failed save เป็น success) ซึ่งแรงมากแต่ผูก Path — ใช้ได้ตลอดเวลาแม้ไม่ได้ถือ shield อยู่จริง ทำให้ defensive toolkit เชื่อถือได้แน่นอนขึ้น [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Fervor แปลงด้วย **Bonus Action เท่านั้น ไม่แตะ action หลักเลย** (ออกแบบมาให้ action เหลือไว้โจมตี/ใช้ Technique เสมอ) บวก Rising Dragon Strike (Retribution, ตอบโต้เมื่อโดนตี "ไม่เสีย reaction") และ Fervor Surge ให้แปลง 2 slot ในการ bonus action เดียว 1-2 ครั้ง/short rest [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Clarity (Universal Technique) บวก Fervor เข้า ability check ใดๆ ก่อนทอย (อัตราเดียวกับ Faith Halo) เป็นเครื่องมือ non-combat ที่แท้จริงเพียงตัวเดียวที่ทุก Path เรียนได้ บวก Swift ช่วยเรื่อง pace การเดินทางทางอ้อม ไม่มี skill bonus หรือ ritual casting [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | Fervor เป็น resource pool **ก้อนเดียวที่จ่ายได้ทั้งดาเมจ/ป้องกัน/ความเร็ว/check** แล้วแต่ Technique ที่เลือกใช้ในแต่ละเทิร์น (ไม่ผูก role ตายตัวเหมือน resource แยกของ class อื่น) บวก Formless Path ที่ออกแบบมาให้เรียนได้ทั้ง 3 ลิสต์พร้อมกันโดยเฉพาะ แลกกับไม่ถึงจุดสูงสุดของสาย damage/defense เดี่ยวๆ — เพราะ technique ที่เรียนแล้วใช้ได้ตลอดเวลาไม่ว่าจะถืออะไรอยู่ ไม่ผูก build lock-in เหมือนเดิมที่ต้องสลับ loadout ให้ตรงเงื่อนไข [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass (Sacred Throne) Scoring (6)

**ที่มาข้อมูล**: [Throne-of-Doom-and-Slaughter.md](../homebrew-subclass/Sacred-Knight/Throne-of-Doom-and-Slaughter.md), [Throne-of-Eternity-and-Creation.md](../homebrew-subclass/Sacred-Knight/Throne-of-Eternity-and-Creation.md), [Throne-of-Fear-and-Sorrow.md](../homebrew-subclass/Sacred-Knight/Throne-of-Fear-and-Sorrow.md), [Throne-of-Order-and-Law.md](../homebrew-subclass/Sacred-Knight/Throne-of-Order-and-Law.md), [Throne-of-Protection-and-Mercy.md](../homebrew-subclass/Sacred-Knight/Throne-of-Protection-and-Mercy.md), [Throne-of-Wisdom-and-Spirit.md](../homebrew-subclass/Sacred-Knight/Throne-of-Wisdom-and-Spirit.md)

**⚠️ กติกาพิเศษของ 2 Throne ที่มี Path prerequisite**: Throne of Doom and Slaughter บังคับ Retribution Path และ Throne of Protection and Mercy บังคับ Guardian Path — Path prerequisite เป็นกลไกที่ตัดทอนบางส่วนของ Class Baseline ออกจริง (baseline เครดิต "ถ้าเลือก Guardian Path จะเข้าถึง Spirit Ward/Guardian's Blessing" และ "ถ้าเลือก Retribution/Formless Path จะเข้าถึง Light Sword/Cross Slash" แบบมีเงื่อนไข) ดังนั้น 2 Throne นี้จึงมีบาง axis ต่ำกว่า baseline ได้ตามกติกา "subclass ตัดทอนความสามารถออกไปจริง" — **Throne อีก 4 ตัวไม่มี prerequisite เลือก Path ไหนก็ได้** จึงห้ามให้คะแนนต่ำกว่า baseline ในทุก axis (คะแนน = baseline พอดีถ้าไม่ได้เสริมอะไรเพิ่ม)

| Throne | Overall | Damage | Control | Support | Survivability | Action Economy | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| **Class Baseline** | — | 7 (A) | 3 (C) | 4 (C) | 8 (A) | 7 (A) | 5 (B) | 8 (A) |
| Doom and Slaughter 🗡️ | C | 9 (S) | 3 (C) | 0 (D) ↓ | 5 (B) ↓ | 7 (A) | 5 (B) | 6 (B) ↓ |
| Eternity and Creation | S | 7 (A) | 3 (C) | 8 (A) ↑ | 9 (S) ↑ | 7 (A) | 5 (B) | 9 (S) ↑ |
| Fear and Sorrow | B | 9 (S) | 3 (C) | 4 (C) | 8 (A) | 7 (A) | 5 (B) | 8 (A) |
| Order and Law | A | 7 (A) | 3 (C) | 8 (A) ↑ | 8 (A) | 7 (A) | 5 (B) | 9 (S) ↑ |
| Protection and Mercy 🛡️ | B | 5 (B) ↓ | 3 (C) | 9 (S) ↑ | 9 (S) | 9 (S) ↑ | 5 (B) | 5 (B) ↓ |
| Wisdom and Spirit | A | 7 (A) | 3 (C) | 9 (S) ↑ | 8 (A) | 7 (A) | 5 (B) | 9 (S) ↑ |

🗡️ = ต้องเลือก Retribution Path เท่านั้น · 🛡️ = ต้องเลือก Guardian Path เท่านั้น · ↑ = สูงกว่า baseline จาก feature ที่ Throne เสริมจริง · ↓ = ต่ำกว่า baseline โดยมีกลไกตัดทอนชัดเจน (ระบุในเหตุผล)

---

### Throne of Doom and Slaughter 🗡️

*ปรับ Cross Slash (Retribution) ให้เป็นเครื่องยนต์ดาเมจล้วนๆ — Blood for Blood/Sealed Fate/Final Verdict/capstone*

**Overall**: C — Damage ยังคงพุ่งเป็น S (9/10) สูงสุดในกลุ่มร่วมกับ Fear and Sorrow แม้กลไกจะเปลี่ยนจาก "ตีฟรีไม่จำกัด" (เวอร์ชันเดิม) เป็น "Cross Slash ถูกลงมาก + สะสม HP/Fervor ตอนฆ่า" ที่ bounded ด้วย Fervor budget เสมอ แต่ Retribution-lock ยังตัด **3 axis ให้ต่ำกว่า baseline จริง** (Support 0, Survivability 5, Versatility 6) ไม่ใช่แค่คงที่เฉยๆ — Action Economy กลับมาเท่า baseline พอดีแล้ว (ไม่มีการตีฟรีอีกต่อไป) glass cannon ที่จ่ายราคาแพงกว่า Throne อื่นทุกตัวเพื่อแลกดาเมจสูงสุด (+1 axis ยกระดับ vs -3 axis ตัดทอน)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 9/10 (S) | Blood for Blood (lv3, ย้ายจาก lv6 เดิม) คืนทั้ง Fervor และ HP = Wis mod ทุกครั้งที่ Cross Slash ฆ่าเป้า (เดิมคืนแค่ Fervor) บวก Sealed Fate (lv6, ย้ายจาก lv3 เดิม, **เปลี่ยนกลไกทั้งหมด**) ที่ตอนนี้คำนวณต้นทุน Cross Slash ราวกับได้ Improve Fervor Technique (N+1) มาฟรีตั้งแต่ lv6 — โดยไม่ต้องเสีย choice ของ Improve Fervor Technique (lv7/15) ไปกับ Cross Slash เลย และถ้าเลือกปรับปรุง Cross Slash เองซ้ำอีกทีจะลดต้นทุนต่อไปถึงอัตรา N (ถูกที่สุดเท่าที่ Cross Slash จะเป็นได้ในทั้งเกม ไม่มีตัวละครอื่นเข้าถึงอัตรานี้ได้) บวก Final Verdict (lv14, คืน Fervor = Prof Bonus ต่อเป้าที่ฆ่าได้ ไม่จำกัดจำนวนเป้า/เทิร์น) และ capstone (lv17, +2 ดาเมจสะสมทุกครั้งที่โจมตีบวก Speed) — เปลี่ยนจาก "ตีฟรีไม่จำกัด" (กลไกเดิมที่ compounding เองไม่มีเพดาน) เป็น "ตีถูกลงมากแต่ยังผูกกับ Fervor budget เสมอ" ตามที่ Designer's Note ตั้งใจไว้ ยังคงเป็น damage engine ที่แรงที่สุดในกลุ่มร่วมกับ Fear and Sorrow เพราะแกนหลัก (Sealed Fate ลดต้นทุน) ทำงานตลอดเวลาไม่ต้องพึ่ง proc — ข้อจำกัด: ส่วนเสริม Blood for Blood/Final Verdict ทั้งคู่ trigger เฉพาะตอน "ฆ่า" เป้าเท่านั้น ไฟต์บอสเดี่ยว HP สูงจะไม่ได้ผล sustain ส่วนนี้เลยจนกว่าจะฆ่าได้จริง (มักจบไฟต์พอดี) ทำให้ reliability ของภาพรวมทั้งแพ็กเกจไม่เต็ม (**อัปเดต**: ไฟล์ class แม่ตัดเพดาน "Wis mod+Prof Bonus additional attacks/เทิร์น" ของ Cross Slash ออกแล้ว — Throne นี้คือตัวที่ได้ผลมากสุดจากการตัดเพดานนี้ เพราะ Sealed Fate ลดต้นทุนต่อการตีลงไปอีกพร้อมกัน ทำให้จำนวนครั้ง/เทิร์นที่ทำได้จริง (ถ้าตุน Fervor ไว้มากพอ ซึ่ง Fervor อยู่ได้ 10 รอบก่อนหมดอายุ) ไม่มีเพดานตายตัวอีกต่อไป จำกัดแค่ Fervor budget ล้วนๆ — ยังไม่ปรับคะแนนขึ้นเพราะ M อยู่ที่ 4/4 เต็มอยู่แล้ว แต่เป็นความเสี่ยง balance ที่ควร playtest เพิ่มถ้าจะปล่อยแบบนี้ต่อ) [M:4/4] [R:2/3] [B:3/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่มจาก Throne นี้ = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 0/10 (D) ↓ | **Prerequisite: Retribution Path ตัด Guardian Path ออกถาวร** ทำให้ไม่มีทางเข้าถึง Bulwark Shift ได้เลยตลอดทั้งตัวละคร (baseline 4/10 มาจากการเครดิต Bulwark Shift แบบมีเงื่อนไขว่า "ถ้าเลือก Guardian" ซึ่งเป็นไปไม่ได้แล้วสำหรับ Throne นี้) และตัว Throne เองก็ไม่มี support feature ใดๆ เลย |
| Survivability | 5/10 (B) ↓ | เหตุผลหลักเดียวกับ Support — **Retribution-lock ตัด Spirit Ward/Guardian's Blessing ออกถาวร** ซึ่งเป็นส่วนใหญ่ของ baseline 8/10 แต่ Blood for Blood (lv3, ย้ายมาจาก lv6 และเพิ่ม HP เข้ามาแล้ว) เป็น active mitigation ตัวแรกที่ Throne นี้มีจริง (เดิมไม่มีเลย) — คืน HP = Wis mod ทุกครั้งที่ Cross Slash ฆ่าเป้า แต่ magnitude เล็ก (Wis mod เดียว) และ reliability ต่ำเพราะ trigger เฉพาะตอนฆ่าเท่านั้น: ไฟต์บอสเดี่ยว HP สูงแทบไม่ได้ผลนี้เลยจนกว่าจะจบไฟต์ มีประโยชน์จริงเฉพาะไฟต์ที่มีเป้าหลายตัว/มอบเล็กให้ฆ่าต่อเนื่อง ยังไม่พอชดเชยการเสีย Spirit Ward/Guardian's Blessing เต็มรูปแบบ [M:2/4] [R:1/3] [B:2/3] |
| Action Economy | 7/10 (A) | **แก้ไข**: Blood for Blood/Sealed Fate เวอร์ชันใหม่ไม่มีการตีฟรีแบบไม่เสีย Fervor อีกต่อไป (ต่างจากเวอร์ชันเดิมที่เคยให้ตีฟรีทุก 2 ครั้ง) — Sealed Fate ลดต้นทุน Fervor ของ Cross Slash แต่ยังต้องจ่าย Fervor ทุกครั้งเหมือนเดิม (แค่จ่ายน้อยลง) เป็นการปรับปรุง resource-efficiency ที่นับใน Damage ไปแล้ว ไม่ใช่ Action Economy โดยตรง = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) ↓ | **Retribution-lock ถาวร** ตัดโอกาส "เลือก Formless เพื่อเรียนได้ทั้ง 3 ลิสต์" ที่ baseline เคยเครดิตไว้ออกไป และทุก feature ของ Throne นี้ทุ่มไปที่ Cross Slash ล้วนๆ (Blood for Blood คืน HP ได้ด้วยตอนนี้ก็จริง แต่เป็นผลพลอยได้จากการฆ่าด้วย Cross Slash ไม่ใช่ role การรักษา/utility แยกต่างหาก) ไม่มี defense-role/heal-role/utility แยกให้สลับจริงเลย [M:2/4] [R:3/3] [B:1/3] |

### Throne of Eternity and Creation

*แปลง Pure White Blade (Universal) ให้ Everlasting Grace ฮีล/temp-HP scaling เต็มรูปแบบ — hybrid damage-chassis/heal-support ที่กว้างที่สุดในบรรดา Throne*

**Overall**: S — ไม่มี Path prerequisite เลยจึงไม่มีทางเสียแต้มเลยสักแกน แถมยกระดับ 3 ใน 7 axis พร้อมกัน (Support A, Survivability S, Versatility S) เป็น healer/generalist ที่กว้างที่สุดในบรรดา Throne ทั้งหมด แม้ Damage จะไม่ขยับจาก baseline เลยเพราะทุก feature ของ Throne นี้ผูกกับสาขาฮีล (Everlasting Grace) เท่านั้น ไม่แตะสาขาโจมตีของ Pure White Blade

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | **แก้ไขจากคะแนนเดิม**: Genesis Wave (lv6), Undying Providence (lv10), และ Absolute Genesis (lv14) ทุกตัวระบุชัดว่าเสริมเฉพาะตอน "ใช้ Pure White Blade — making Everlasting Grace to heal" เท่านั้น — ไม่มีฟีเจอร์ใดของ Throne นี้เสริมดาเมจของการโจมตีจริงเลยสักตัว (ไม่มี AoE ไม่มี extra damage dice) เท่ากับ baseline พอดี capstone (lv17) เปิดให้ยิง Pure White Blade แบบโจมตีใส่หลายเป้าพร้อมกันได้ (WIS mod เป้า) ระหว่าง activate แต่เป็นแค่ breadth เพิ่มจำนวนเป้า ไม่มี magnitude ต่อเป้าเพิ่มเลย และต้นทุนกิจกรรม (10 combined spell level) แพงมาก ไม่พอขยับ tier [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 8/10 (A) | Everlasting Grace (lv3, Action, redirect Pure White Blade ไปฮีล ally แทนโจมตี) ให้ 1d4 (→1d6 ที่ lv14 จาก Absolute Genesis) ต่อ Fervor ที่จ่าย สูงสุด Wis mod+Prof Bonus stack/ครั้ง บวก Genesis Wave (lv6, ทุก 3 Fervor ที่จ่ายได้ฮีลเสริมอีก 1d4) และ capstone (lv17) ที่ยิงฮีลใส่หลายเป้าพร้อมกันได้ — magnitude ดีและ target ได้ทั้ง self/ally แต่กิน Action เต็มทุกครั้ง (แข่งกับการโจมตี เพราะไม่มี Extra Attack ให้แบ่ง) [M:3/4] [R:2/3] [B:3/3] |
| Survivability | 9/10 (S) | Baseline's Guardian-conditional defense (ถ้าเลือกได้) ยังอยู่ครบเพราะ Throne นี้ไม่มี prerequisite บวก Everlasting Grace/Undying Providence ใช้กับตัวเองได้เต็มที่เช่นกัน (ฮีล 1d4→1d6/stack + temp HP อัตราเดียวกัน+Wis mod+Prof Bonus แบบ flat) ไม่มี cooldown หรือเพดานครั้ง/วัน จำกัดแค่ Fervor ที่มี ทำให้เป็นเครื่องมือเอาตัวรอดที่เรียกใช้ได้ทุกเมื่อที่ต้องการ [M:3/4] [R:3/3] [B:3/3] |
| Action Economy | 7/10 (A) | Everlasting Grace/Undying Providence กิน Action เต็มๆ (ไม่ใช่ bonus action) จึงไม่ได้เพิ่ม economy เหนือ baseline ที่มีอยู่แล้ว = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Fervor pool เดียวจ่ายได้ทั้งดาเมจฐาน (baseline) / ฮีล / temp-HP จากฟีเจอร์เดียวกัน (Pure White Blade + Everlasting Grace) เลือก self หรือ ally ได้อิสระทุกครั้งที่ใช้ ไม่ผูก Path เลย เพิ่ม role "healer" เต็มรูปแบบทับบน combat kit เดิมทั้งหมด เป็น Throne ที่ role กว้างที่สุดในบรรดา 6 ตัว [M:3/4] [R:3/3] [B:3/3] |

### Throne of Fear and Sorrow

*จ่าย HP แลก Fervor เพิ่ม + Faith Halo คูณเป็น auto-crit สามเท่า — glass cannon ดาเมจสูงสุดที่ไม่ผูก Path*

**Overall**: B — Damage S (9/10) เท่า Doom and Slaughter แต่ไม่มี Path prerequisite เลยจึงไม่เสียแต้มแกนไหนเลย — แลกกับไม่มี axis อื่นขยับขึ้นจาก baseline สักตัว (Control/Support/Survivability/AE/Utility/Versatility เท่า baseline หมด) เป็น one-note damage specialist ที่ไม่มีจุดอ่อนแต่ก็ไม่มี breadth เพิ่มเลย

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 9/10 (S) | Moment of Dread (lv6) ให้ Faith Halo attack ที่ถึง threshold AC+15+PB นับเป็น critical hit อัตโนมัติ 1 ครั้ง/เทิร์น และ Wrath of Ruin (lv14) เปลี่ยน crit จาก Faith Halo ให้เป็น **ดาเมจ 3 เท่าแทน 2 เท่า** บวก Sorrow's Toll (lv3, **แก้ไข**: ใช้ได้ทุกครั้งที่ทำ Bonus Action แปลง Fervor ปกติ ไม่มีเพดานครั้ง/วัน อัตรา 3 HP:1 Fervor เสริม ปรับเป็น 2 HP:1 Fervor ที่ lv10 Mercy's Embrace สูงสุด Wis mod Fervor เสริม/ครั้ง มีแค่ HP ตัวเองเป็นเพดานธรรมชาติ) เป็น magnitude spike สูงสุดในบรรดา Throne ทั้งหมด (**อัปเดต**: ไฟล์ class แม่เพิ่มเพดาน Wis mod+Prof stack ให้ Faith Halo แล้ว แต่ Moment of Dread เขียนข้อยกเว้นกำกับไว้ชัดเจนว่า "Faith Halo now can stack exceed the cap in single use" สำหรับ Throne นี้โดยเฉพาะ — threshold AC+15+PB จึงยังกดกอง stack ได้ไม่มีเพดานเหมือนเดิม ไม่กระทบ R tag) [M:4/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | ไม่มี support feature เพิ่ม = baseline พอดี (Bulwark Shift ยังเข้าถึงได้แบบมีเงื่อนไขเหมือน baseline เพราะไม่มี prerequisite) [M:1/4] [R:2/3] [B:1/3] |
| Survivability | 8/10 (A) | ไม่มี prerequisite จึงยังเข้าถึง Guardian's defensive kit ได้เต็มเหมือน baseline — Sorrow's Toll จ่าย HP เป็นต้นทุนก็จริง (ทุกเทิร์นที่เลือกใช้) แต่เป็นตัวเลือกที่ผู้เล่นสั่งเองไม่ใช่บังคับ (ไม่ใช้ก็ได้ทุกเทิร์น) และ capstone หยุดเองได้ตลอดเวลา ไม่ได้ตัดทอนความสามารถ defense พื้นฐานใดๆ ออกไปจริง = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 7/10 (A) | Sorrow's Toll ใช้ควบกับ bonus action แปลง Fervor เดิมไม่เสีย action เพิ่ม และ capstone ให้ Dash+Disengage ฟรีทุกเทิร์นระหว่าง active แต่ไม่ได้เพิ่มเหนือ baseline ชัดเจนพอจะขยับคะแนน = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 8/10 (A) | Sorrow's Toll เพิ่มช่องทางสร้าง Fervor แบบใหม่ (จ่าย HP แทน spell slot) แต่ Throne นี้ทุ่มไปทาง damage-build เกือบทั้งหมด ไม่ได้ขยาย role ใหม่ชัดเจนพอจะเกิน baseline = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |

### Throne of Order and Law

*แปลง Swift (Universal) ให้เป็นเครื่องมือขับเคลื่อน+เสริมพลังทั้งทีม — support กระจายหลาย ally พร้อมกัน*

**Overall**: A — ไม่มี Path prerequisite เลยจึงไม่เสียแต้มแกนไหนเลย ยกระดับ 2 axis (Support A, Versatility S) เป็น support specialist ที่กว้างรองจาก Eternity and Creation แต่ Damage/Control/Survivability/Action Economy/Utility ไม่ขยับเลยสักตัว

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | ไม่มี feature เพิ่มดาเมจของตัวเอง (ฟีเจอร์ทั้งหมดเล็ง ally) = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 8/10 (A) | Commander's Cadence (lv3, **แก้ไข**: เสีย Action เต็มของตัวเอง) ให้ใช้ Swift เคลื่อน ally แทนตัวเองได้ แล้ว ally ที่ยินยอมสามารถใช้ **reaction ของ ally เอง** เพื่อขยับ+โจมตี 1 ครั้งหรือร่าย cantrip ฟรี (ต้องมี reaction ว่างอยู่จริงถึงจะได้ผลส่วนนี้) บวก Iron Discipline (lv6, ตัวเองและ ally ที่ได้ผล Swift ไม่โดน opportunity attack), Absolute Command (lv10, ผลของ Swift ยืดไปถึงต้นเทิร์นถัดไปของตัวเอง แปลว่า ally ใช้ Speed bonus ได้ตลอดเทิร์นของ ally เองด้วย) และ capstone (lv17, ใช้ Swift พร้อมกันได้หลาย ally เท่า Wis mod ระหว่าง activate) — ครอบคลุม mobility/offense-enabling ให้ทีมได้กว้าง แม้ reliability จะขึ้นกับว่า ally มี reaction ว่างจริงหรือไม่ [M:3/4] [R:2/3] [B:3/3] |
| Survivability | 8/10 (A) | Iron Discipline (lv6, ไม่โดน opportunity attack ระหว่าง Swift) ยังใช้กับตัวเองได้ถ้าไม่ redirect ไปที่ ally แต่ไม่ได้เพิ่มเกิน baseline ชัดเจน = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 7/10 (A) | **แก้ไข**: Commander's Cadence เสีย Action เต็มของตัว Sacred Knight เองเพื่อให้ ally ได้ใช้ **reaction ของ ally เอง** (ไม่ใช่ reaction ของ Sacred Knight ที่ให้ฟรี) — ไม่ได้เพิ่ม action economy ของตัว Sacred Knight เองเลย ประโยชน์เชิง action ที่ทีมได้ถูกนับใน Support แล้ว จึงไม่นับซ้ำที่นี่ = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Commander's Cadence เพิ่มตัวเลือก "ใช้ Swift กับตัวเองหรือ ally" ให้ technique เดียวครอบคลุม 2 role (mobility ส่วนตัว vs ทีม) ได้จริง ไม่ผูก Path เลย [M:3/4] [R:3/3] [B:3/3] |

### Throne of Protection and Mercy 🛡️

*Sealed Wrath แปลงดาเมจที่ทนไว้เป็นดาเมจตอบโต้ + Compassion's Toll แปลง HP เป็น Fervor — ป้อมปราการตัวจริงของ 6 Throne*

**Overall**: B — Guardian-lock ตัด **2 axis ให้ต่ำกว่า baseline จริง** (Damage 5, Versatility 5) แต่แลกมาด้วย 3 axis ที่ขยับขึ้น (Support S, Survivability S, Action Economy S) เป็นการเทรดที่ได้มากกว่าเสีย (+3/-2) ต่างจาก Doom and Slaughter (+1/-3) ชัดเจน — แท็งค์/ซัพพอร์ตเฉพาะทางที่ยังมีจุดอ่อนจริงด้าน offense/breadth

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 5/10 (B) ↓ | **Prerequisite: Guardian Path ตัด Retribution Path ออกถาวร** ทำให้ไม่มีทางเข้าถึง Light Sword/Cross Slash เลย (baseline 7/10 ส่วนหนึ่งมาจากเครดิตแบบมีเงื่อนไขของ Retribution) ชดเชยด้วย Sealed Wrath (lv10) ที่แปลงดาเมจที่ Spirit Ward ทนไว้ (เฉพาะตอนใช้กับตัวเอง) เป็น Sealed Wrath อัตรา 1:1 ตรงๆ สะสมไม่มี cap ปล่อยอัตโนมัติเป็นดาเมจ radiant ตอนตีติดครั้งถัดไป (พลาดไม่เสีย pool แค่รอครั้งถัดไป) [M:2/4] [R:2/3] [B:1/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 9/10 (S) ↑ | Guardian Path การันตี Bulwark Shift แน่นอน 100% (ไม่ใช่แค่มีโอกาสแบบ baseline) บวก **Vanguard's Instinct (lv6)** และ **Endless Vigil (lv14)** ให้ reaction พิเศษรวม 2 อันแยกจาก reaction ปกติ ใช้ได้กับ Fervor Technique ใดก็ได้ (รวม Bulwark Shift) ทำให้สลับตำแหน่งช่วย ally ได้บ่อยขึ้นโดยไม่แย่ง reaction หลักของตัวเอง และ capstone (lv17) ทำให้ Bulwark Shift ไม่เสีย reaction เลยระหว่าง active [M:4/4] [R:3/3] [B:2/3] |
| Survivability | 9/10 (S) | Guardian Path การันตี Spirit Ward/Guardian's Blessing แน่นอน บวก Compassion's Toll (lv3, ทุก 2 HP/temp-HP ที่เสียแปลงเป็น 1 Fervor cap/เทิร์น = Wis mod + Prof Bonus) สร้าง feedback loop "ยิ่งโดนตียิ่งมี resource ป้องกันตัวเองมากขึ้น" ตั้งแต่เลเวลต้นๆ และ capstone ให้ resistance ดาเมจ**ทุกชนิด** 1 นาที บวก temp HP ท้ายเทิร์นเท่า level+Wis mod — ป้องกันครบสุดในบรรดา Throne ทั้งหมด [M:4/4] [R:3/3] [B:2/3] |
| Action Economy | 9/10 (S) ↑ | Vanguard's Instinct (lv6) และ Endless Vigil (lv14) ให้ reaction เพิ่มรวม 2 อัน แยกจาก reaction ปกติ ใช้ได้กับ Fervor Technique ใดก็ได้ (ไม่ล็อกเฉพาะ Bulwark Shift) และ capstone ทำให้ Bulwark Shift spam ได้ไม่จำกัดจำนวนครั้ง จำกัดแค่ Fervor เท่านั้น [M:4/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 5/10 (B) ↓ | **Guardian-lock ถาวร** ตัดโอกาส "เลือก Formless/Retribution" ที่ baseline เคยเครดิตไว้ออกไป และทุก feature ของ Throne นี้ทุ่มไปที่ tanking/support ล้วนๆ ไม่มี damage-role ให้สลับเลย [M:2/4] [R:2/3] [B:1/3] |

### Throne of Wisdom and Spirit

*Anointed Bond โยกทั้ง Fervor Technique toolkit ของตัวเองไปให้ ally 1 คนได้ — proxy เต็มรูปแบบให้เพื่อนร่วมทีม 1 คน*

**Overall**: A — ไม่มี Path prerequisite เลยจึงไม่เสียแต้มแกนไหนเลย ยกระดับ 2 axis ถึงระดับ S (Support, Versatility) จาก Anointed Bond ที่โยกทั้ง toolkit ไปให้ ally ได้ แลกกับ Damage/Survivability/Action Economy/Control/Utility ไม่ขยับเลยสักตัว

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Anointed Bond และ Kindred Strength ให้ redirect technique ไปที่ ally เท่านั้น (หรือเลือกเก็บไว้ใช้กับตัวเองแบบปกติก็ได้ แต่ไม่ได้เพิ่มอะไรเกินเดิม) Universal list เองก็ไม่มี technique เพิ่มดาเมจตรงๆ อยู่แล้ว (Faith Halo เพิ่ม accuracy ไม่ใช่ raw damage) = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 9/10 (S) ↑ | Anointed Bond (lv3, Bonus Action, ระยะ 120ft, Prof Bonus ครั้ง/long rest) redirect **ทั้ง 4 Universal technique** (Pure White Blade/Swift/Faith Halo/Clarity) ไปให้ ally ได้ อยู่ได้ครั้งละ 1 นาที และ Kindred Strength (lv14) ขยายให้ครอบคลุม Retribution/Guardian technique ทั้งหมดที่รู้ด้วย — กว้างกว่า Clarity-only เดิมมาก แต่ยังจำกัดแค่ 1 ally/ครั้งเหมือนเดิม [M:4/4] [R:2/3] [B:3/3] |
| Survivability | 8/10 (A) | Anointed Bond เองไม่ได้ตัดสิทธิ์ตัวเองออก (เลือก redirect ไปที่ตัวเองก็ได้เหมือนเดิม) แต่ก็ไม่ได้เพิ่มอะไรเกิน baseline โดยตรง มีแค่ Shared Fate (lv10) ที่แถม Heroic Inspiration ให้ตัวเองด้วยทุกครั้งที่ designate ally เป็น safety net เล็กๆ ไม่ถึงขั้นเปลี่ยน tier [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 7/10 (A) | ไม่มีฟีเจอร์เสริม action economy โดยตรง — redirect technique ไปหา ally ใช้ action cost เท่าเดิมของ technique นั้นๆ ไม่มีส่วนเพิ่ม, การให้ Heroic Inspiration (lv10) เป็น free action แต่ magnitude เล็กเกินจะขยับ tier = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Anointed Bond ไม่ผูกกับ technique เดียวอีกต่อไป — เลือก redirect ได้ทั้ง 4 Universal technique (บัฟ check/attack/speed/range) ไปตัวเองหรือ ally คนใดก็ได้ทุกครั้งที่ใช้ บวก Deepened Wisdom (lv6) ให้เรียน technique ที่ 6 นอกเหนือโควตาปกติ และ Kindred Strength (lv14) ขยายไปถึง Retribution/Guardian ด้วย ไม่ผูก Path เลย [M:3/4] [R:3/3] [B:3/3] |
