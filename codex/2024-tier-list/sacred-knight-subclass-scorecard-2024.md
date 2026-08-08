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

**อัปเดต 2026-08-08**: แก้ไฟล์ class ล่าสุดตัด equipment-gate ของ Fervor Technique ออก — เดิม Retribution technique ต้อง dual-wield อยู่ถึงใช้ได้ และ Guardian technique ต้องถือ shield อยู่ถึงใช้ได้ ตอนนี้ **แค่เรียนรู้ไว้ก็ใช้ได้ตลอดเวลาไม่ว่าจะถืออะไรอยู่** (equipment ยังคุมแค่ stance feature/AC bonus ของ Path เท่านั้น ไม่คุม technique อีกต่อไป) กระทบ Reliability (R) ของ Damage/Support/Survivability/Versatility โดยตรง ดูรายละเอียดในแต่ละแถว

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี Extra Attack ทำให้ magnitude ฐานต่ำกว่า martial class ทั่วไปชัดเจน ชดเชยด้วย Faith Halo (Universal, บวก attack roll ได้สูงสุด Wis mod+Prof stack ต่อการตี — เพิ่ม accuracy ไม่ใช่ raw damage) และถ้าเลือก Retribution/Formless Path จะเข้าถึง Light Sword (extra 1d4→1d6 ต่อ stack) กับ Cross Slash (ซื้อการตีเพิ่มด้วย Fervor) ได้ — **ตอนนี้ใช้ได้ตลอดเวลาแม้ไม่ได้ dual-wield อยู่จริง** (ตัด equipment-gate ออกแล้ว มีแค่ Path เป็นตัวคุมว่าเรียนได้ไหม) เพิ่ม reliability ให้ technique สายดาเมจใช้ได้แน่นอนขึ้นไม่ผูกกับ loadout ปัจจุบัน บวก Fervor pool ขนาดเท่า full caster's spell slot table ทำให้ resource ไม่ขาดแคลน [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี Fervor Technique สาย control ใน Universal list เลย (Pure White Blade=ระยะ, Swift=ความเร็ว, Faith Halo=accuracy, Clarity=check) และ Retribution/Guardian list ที่เห็นก็เป็นสายดาเมจ/ป้องกันล้วนๆ ไม่มี hard-CC [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 4/10 (C) | Bulwark Shift (Guardian-only Technique) สลับตำแหน่งกับ ally ในระยะที่จ่าย Fervor ไหวได้แบบไม่โดน opportunity attack เป็น support ทางยุทธวิธีที่ดี แต่ผูกกับการเลือก Guardian Path เท่านั้น (2 ใน 3 Path ไม่ได้อะไรด้านนี้เลย) — **ใช้ได้แม้ไม่ได้ถือ shield อยู่แล้ว** (equipment-gate ถูกตัดออก) ทำให้ Guardian เข้าถึง tool นี้ได้แน่นอนขึ้นไม่ว่าจะสลับอาวุธไปมายังไง [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 8/10 (A) | HD d10 บวก **ทุก Path ล้วนให้ +1 AC ภายใต้เงื่อนไขของตัวเอง** (Retribution/Formless: dual-wield, Guardian: ถือ shield) เป็นฐานที่รับประกันไม่ว่าจะเลือกทางไหน ถ้าเลือก Guardian Path จะเข้าถึง Spirit Ward (Fervor ลดดาเมจอัตรา 1:2 → 1:3) และ Guardian's Blessing (Fervor เปลี่ยน failed save เป็น success) ซึ่งแรงมากแต่ผูก Path — **ตอนนี้ทั้งสอง technique ใช้ได้ตลอดเวลาแม้ไม่ได้ถือ shield อยู่จริง** (equipment คุมแค่ AC bonus ของ Bulwark Stance ไม่คุม technique อีกต่อไป) ทำให้ defensive toolkit เชื่อถือได้แน่นอนขึ้นไม่ผูกกับว่าถืออะไรอยู่ตอนนั้น [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Fervor แปลงด้วย **Bonus Action เท่านั้น ไม่แตะ action หลักเลย** (ออกแบบมาให้ action เหลือไว้โจมตี/ใช้ Technique เสมอ) บวก Rising Dragon Strike (Retribution, ตอบโต้เมื่อโดนตี "ไม่เสีย reaction") และ Fervor Surge ให้แปลง 2 slot ในการ bonus action เดียว 1-2 ครั้ง/short rest [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Clarity (Universal Technique) บวก Fervor เข้า ability check ใดๆ ก่อนทอย (อัตราเดียวกับ Faith Halo) เป็นเครื่องมือ non-combat ที่แท้จริงเพียงตัวเดียวที่ทุก Path เรียนได้ บวก Swift ช่วยเรื่อง pace การเดินทางทางอ้อม ไม่มี skill bonus หรือ ritual casting [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | Fervor เป็น resource pool **ก้อนเดียวที่จ่ายได้ทั้งดาเมจ/ป้องกัน/ความเร็ว/check** แล้วแต่ Technique ที่เลือกใช้ในแต่ละเทิร์น (ไม่ผูก role ตายตัวเหมือน resource แยกของ class อื่น) บวก Formless Path ที่ออกแบบมาให้เรียนได้ทั้ง 3 ลิสต์พร้อมกันโดยเฉพาะ แลกกับไม่ถึงจุดสูงสุดของสาย damage/defense เดี่ยวๆ — **การตัด equipment-gate ออก (technique ที่เรียนแล้วใช้ได้ตลอดเวลาไม่ว่าจะถืออะไรอยู่ ไม่ใช่แค่ Path ที่คุมแล้ว)** ลบ "build lock-in" ที่เคยมีออกไปโดยตรง ก่อนหน้านี้ต้องสลับ loadout ให้ตรงเงื่อนไข (dual-wield/ถือ shield) ถึงจะใช้ technique ของตัวเองได้ครบ ตอนนี้ Retribution/Guardian ก็ยืดหยุ่นสลับอาวุธได้อิสระโดยไม่เสีย technique access เหมือน Formless มากขึ้น [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass (Sacred Throne) Scoring (6)

**ที่มาข้อมูล**: [Throne-of-Doom-and-Slaughter.md](../homebrew-subclass/Sacred-Knight/Throne-of-Doom-and-Slaughter.md), [Throne-of-Eternity-and-Creation.md](../homebrew-subclass/Sacred-Knight/Throne-of-Eternity-and-Creation.md), [Throne-of-Fear-and-Sorrow.md](../homebrew-subclass/Sacred-Knight/Throne-of-Fear-and-Sorrow.md), [Throne-of-Order-and-Law.md](../homebrew-subclass/Sacred-Knight/Throne-of-Order-and-Law.md), [Throne-of-Protection-and-Mercy.md](../homebrew-subclass/Sacred-Knight/Throne-of-Protection-and-Mercy.md), [Throne-of-Wisdom-and-Spirit.md](../homebrew-subclass/Sacred-Knight/Throne-of-Wisdom-and-Spirit.md)

**⚠️ กติกาพิเศษของ 2 Throne ที่มี Path prerequisite**: Throne of Doom and Slaughter บังคับ Retribution Path และ Throne of Protection and Mercy บังคับ Guardian Path — Path prerequisite เป็นกลไกที่ตัดทอนบางส่วนของ Class Baseline ออกจริง (baseline เครดิต "ถ้าเลือก Guardian Path จะเข้าถึง Spirit Ward/Guardian's Blessing" และ "ถ้าเลือก Retribution/Formless Path จะเข้าถึง Light Sword/Cross Slash" แบบมีเงื่อนไข) ดังนั้น 2 Throne นี้จึงมีบาง axis ต่ำกว่า baseline ได้ตามกติกา "subclass ตัดทอนความสามารถออกไปจริง" — **Throne อีก 4 ตัวไม่มี prerequisite เลือก Path ไหนก็ได้** จึงห้ามให้คะแนนต่ำกว่า baseline ในทุก axis (คะแนน = baseline พอดีถ้าไม่ได้เสริมอะไรเพิ่ม)

| Throne | Damage | Control | Support | Survivability | Action Economy | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Class Baseline** | 7 (A) | 3 (C) | 4 (C) | 8 (A) | 7 (A) | 5 (B) | 8 (A) |
| Doom and Slaughter 🗡️ | 9 (S) | 3 (C) | 0 (D) ↓ | 4 (C) ↓ | 8 (A) | 5 (B) | 6 (B) ↓ |
| Eternity and Creation | 8 (A) | 3 (C) | 8 (A) | 9 (S) | 7 (A) | 5 (B) | 9 (S) |
| Fear and Sorrow | 9 (S) | 3 (C) | 4 (C) | 8 (A) | 7 (A) | 5 (B) | 8 (A) |
| Order and Law | 7 (A) | 3 (C) | 9 (S) | 8 (A) | 8 (A) | 5 (B) | 9 (S) |
| Protection and Mercy 🛡️ | 5 (B) ↓ | 3 (C) | 8 (A) | 9 (S) | 8 (A) | 5 (B) | 5 (B) ↓ |
| Wisdom and Spirit | 7 (A) | 3 (C) | 8 (A) | 8 (A) | 8 (A) | 5 (B) | 9 (S) |

🗡️ = ต้องเลือก Retribution Path เท่านั้น · 🛡️ = ต้องเลือก Guardian Path เท่านั้น · ↓ = ต่ำกว่า baseline โดยมีกลไกตัดทอนชัดเจน (ระบุในเหตุผล)

---

### Throne of Doom and Slaughter 🗡️

*ปรับ Cross Slash (Retribution) ให้เป็นเครื่องยนต์ดาเมจล้วนๆ — Blood for Blood/Sealed Fate/Final Verdict/capstone*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 9/10 (S) | Blood for Blood (lv3) ให้ทุก 2 การตีด้วย Cross Slash แถมการตีฟรีอีก 1 ครั้งไม่เสีย Fervor เพิ่ม บวก Unrelenting Carnage (lv10) ที่ทำให้ Cross Slash ทะลุ resistance/immunity ดาเมจกายภาพทั้งหมด และ Sealed Fate/Final Verdict (lv6/14) คืน Fervor ทุกครั้งที่ฆ่าเป้าได้ (ไม่จำกัดจำนวนเป้า/เทิร์นที่ lv14) เป็น snowball loop ที่แรงที่สุดในบรรดา Throne ทั้งหมด [M:4/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่มจาก Throne นี้ = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 0/10 (D) ↓ | **Prerequisite: Retribution Path ตัด Guardian Path ออกถาวร** ทำให้ไม่มีทางเข้าถึง Bulwark Shift ได้เลยตลอดทั้งตัวละคร (baseline 4/10 มาจากการเครดิต Bulwark Shift แบบมีเงื่อนไขว่า "ถ้าเลือก Guardian" ซึ่งเป็นไปไม่ได้แล้วสำหรับ Throne นี้) และตัว Throne เองก็ไม่มี support feature ใดๆ เลย |
| Survivability | 4/10 (C) ↓ | เหตุผลเดียวกับ Support — **Retribution-lock ตัด Spirit Ward/Guardian's Blessing ออกถาวร** ซึ่งเป็นส่วนใหญ่ของ baseline 8/10 เหลือแค่ HD d10 + Twin Blade Stance's +1 AC (รับประกันเพราะ Retribution ล็อกไว้แน่นอน) ไม่มี active mitigation ใดๆ เลย [M:2/4] [R:1/3] [B:1/3] |
| Action Economy | 8/10 (A) | Blood for Blood ให้การตีฟรีแบบไม่เสีย action/Fervor เพิ่มเลยทุก 2 ครั้งที่ใช้ Cross Slash บวก Sealed Fate/Final Verdict ที่ทำให้ resource หมุนกลับมาไวขึ้นเรื่อยๆ ยิ่งฆ่าเยอะยิ่งได้ action คุ้มขึ้น [M:3/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) ↓ | **Retribution-lock ถาวร** ตัดโอกาส "เลือก Formless เพื่อเรียนได้ทั้ง 3 ลิสต์" ที่ baseline เคยเครดิตไว้ออกไป และทุก feature ของ Throne นี้ทุ่มไปที่ Cross Slash ล้วนๆ ไม่มี defense/heal/utility ให้สลับ role เลย [M:2/4] [R:3/3] [B:1/3] |

### Throne of Eternity and Creation

*แปลง Pure White Blade (Universal) ให้เป็น AoE + เพิ่ม Everlasting Grace เป็นฮีล/temp-HP เต็มรูปแบบ — hybrid damage/support ที่กว้างที่สุดในบรรดา Throne*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 8/10 (A) | Genesis Wave (lv6) แปลง Pure White Blade เป็น AoE 5-10ft square ได้ (จ่าย Fervor เพิ่ม) และ capstone (lv17) ยิงได้หลายเป้าพร้อมกัน (เท่า Wis mod) บวก Absolute Genesis (lv14) ที่ทำให้ทะลุ resistance ดาเมจกายภาพ — ขยาย breadth การส่งดาเมจจากเดี่ยวเป็นกลุ่มได้จริง [M:2/4] [R:3/3] [B:3/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 8/10 (A) | Everlasting Grace (lv3, Action) ฮีล 1d4→1d6 ต่อ Fervor ที่จ่าย **ไม่มี stack cap** ให้ตัวเองหรือ ally ในระยะ 30ft บวก Undying Providence (lv10, temp HP อัตราเดียวกัน) และ capstone ที่ยิงได้หลายเป้าพร้อมกัน — magnitude/breadth เทียบเท่าหรือดีกว่า Divine Spark ของ Cleric [M:3/4] [R:2/3] [B:3/3] |
| Survivability | 9/10 (S) | Baseline's Guardian-conditional defense (ถ้าเลือกได้) ยังอยู่ครบเพราะ Throne นี้ไม่มี prerequisite บวก Absolute Genesis (lv14, resistance ดาเมจกายภาพให้ตัวเอง 1 นาที) และ Everlasting Grace/Undying Providence ใช้ฮีล/temp-HP ตัวเองได้เต็มที่เช่นกัน [M:3/4] [R:3/3] [B:3/3] |
| Action Economy | 7/10 (A) | Everlasting Grace/Undying Providence กิน Action เต็มๆ (ไม่ใช่ bonus action) จึงไม่ได้เพิ่ม economy เหนือ baseline ที่มีอยู่แล้ว = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Fervor pool เดียวจ่ายได้ทั้งดาเมจเดี่ยว/ดาเมจกลุ่ม/ฮีล/temp-HP/resistance จากฟีเจอร์เดียวกัน (Pure White Blade + Everlasting Grace) ไม่ผูก Path เลย เป็น Throne ที่ role กว้างที่สุดในบรรดา 6 ตัว [M:3/4] [R:3/3] [B:3/3] |

### Throne of Fear and Sorrow

*จ่าย HP แลก Fervor เพิ่ม + Faith Halo คูณเป็น auto-crit สามเท่า — glass cannon ดาเมจสูงสุดที่ไม่ผูก Path*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 9/10 (S) | Moment of Dread (lv6) ให้ Faith Halo attack ที่ถึง threshold AC+15+PB นับเป็น critical hit อัตโนมัติ 1 ครั้ง/เทิร์น และ Wrath of Ruin (lv14) เปลี่ยน crit จาก Faith Halo ให้เป็น **ดาเมจ 3 เท่าแทน 2 เท่า** บวก Sorrow's Toll/Mercy's Embrace ที่จ่าย HP แลก Fervor เพิ่มได้ (Prof Bonus ครั้ง/long rest) เป็น magnitude spike สูงสุดในบรรดา Throne ทั้งหมด [M:4/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | ไม่มี support feature เพิ่ม = baseline พอดี (Bulwark Shift ยังเข้าถึงได้แบบมีเงื่อนไขเหมือน baseline เพราะไม่มี prerequisite) [M:1/4] [R:2/3] [B:1/3] |
| Survivability | 8/10 (A) | ไม่มี prerequisite จึงยังเข้าถึง Guardian's defensive kit ได้เต็มเหมือน baseline — Sorrow's Toll/capstone จ่าย HP เป็นต้นทุนก็จริง แต่เป็นตัวเลือกที่ผู้เล่นสั่งเอง (จำกัดจำนวนครั้ง/long rest และ capstone หยุดเองได้ตลอดเวลา) ไม่ได้ตัดทอนความสามารถ defense พื้นฐานใดๆ ออกไปจริง = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 7/10 (A) | Sorrow's Toll ใช้ควบกับ bonus action แปลง Fervor เดิมไม่เสีย action เพิ่ม และ capstone ให้ Dash+Disengage ฟรีทุกเทิร์นระหว่าง active แต่ไม่ได้เพิ่มเหนือ baseline ชัดเจนพอจะขยับคะแนน = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 8/10 (A) | Sorrow's Toll เพิ่มช่องทางสร้าง Fervor แบบใหม่ (จ่าย HP แทน spell slot) แต่ Throne นี้ทุ่มไปทาง damage-build เกือบทั้งหมด ไม่ได้ขยาย role ใหม่ชัดเจนพอจะเกิน baseline = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |

### Throne of Order and Law

*แปลง Swift (Universal) ให้เป็นเครื่องมือขับเคลื่อน+เสริมพลังทั้งทีม — support กระจายหลาย ally พร้อมกัน*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | ไม่มี feature เพิ่มดาเมจของตัวเอง (ฟีเจอร์ทั้งหมดเล็ง ally) = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 9/10 (S) | Commander's Cadence (lv3) ให้ใช้ Swift เคลื่อน ally แทนตัวเอง **พร้อมให้ ally โจมตี/ร่าย cantrip ฟรีด้วย reaction ของตัวเอง** บวก Absolute Command (lv10, ally ได้ speed bonus ซ้ำอีกตอนเทิร์นตัวเอง), Unyielding Law (lv14, ally ได้ผล Dodge action ฟรี) และ capstone (lv17, ใช้ Swift พร้อมกันได้หลาย ally เท่า Wis mod) — ครอบคลุมทั้ง mobility/offense-enabling/defense ให้ทั้งทีมพร้อมกัน [M:3/4] [R:3/3] [B:3/3] |
| Survivability | 8/10 (A) | Iron Discipline (lv6, ไม่โดน opportunity attack ระหว่าง Swift) ยังใช้กับตัวเองได้ถ้าไม่ redirect ไปที่ ally แต่ไม่ได้เพิ่มเกิน baseline ชัดเจน = baseline พอดี [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 8/10 (A) | Commander's Cadence มอบ reaction attack/cantrip ฟรีให้ ally ทุกครั้งที่ใช้ Swift (Fervor ถูก 1/stack) เป็นตัวสร้าง action ให้ทีมโดยตรง [M:3/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Commander's Cadence เพิ่มตัวเลือก "ใช้ Swift กับตัวเองหรือ ally" ให้ technique เดียวครอบคลุม 2 role (mobility ส่วนตัว vs ทีม) ได้จริง ไม่ผูก Path เลย [M:3/4] [R:3/3] [B:3/3] |

### Throne of Protection and Mercy 🛡️

*Sealed Wrath แปลงดาเมจที่ทนไว้เป็นดาเมจตอบโต้ + Compassion's Toll แปลง HP เป็น Fervor — ป้อมปราการตัวจริงของ 6 Throne*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 5/10 (B) ↓ | **Prerequisite: Guardian Path ตัด Retribution Path ออกถาวร** ทำให้ไม่มีทางเข้าถึง Light Sword/Cross Slash เลย (baseline 7/10 ส่วนหนึ่งมาจากเครดิตแบบมีเงื่อนไขของ Retribution) ชดเชยด้วย Sealed Wrath (lv3) ที่แปลงดาเมจที่ Spirit Ward ทนไว้ (2:1 → 1:1 ที่ lv10) เป็นดาเมจ radiant สะสมปล่อยอัตโนมัติตอนตีติดครั้งถัดไป ไม่มี cap แต่ต้องโดนตีก่อนถึงจะมี ammo ให้ยิง [M:2/4] [R:2/3] [B:1/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 8/10 (A) | Guardian Path การันตี Bulwark Shift แน่นอน 100% (ไม่ใช่แค่มีโอกาสแบบ baseline) บวก Vanguard's Instinct (lv14) ให้ reaction พิเศษแยกต่างหากใช้ Bulwark Shift โดยเฉพาะ และ capstone (lv17) ทำให้ Bulwark Shift ไม่เสีย reaction เลยระหว่าง active [M:3/4] [R:3/3] [B:2/3] |
| Survivability | 9/10 (S) | Guardian Path การันตี Spirit Ward/Guardian's Blessing แน่นอน บวก Compassion's Toll (lv6, ทุก 2 HP ที่เสียแปลงเป็น 1 Fervor ไม่จำกัด/เทิร์น) สร้าง feedback loop "ยิ่งโดนตียิ่งมี resource ป้องกันตัวเองมากขึ้น" และ capstone ให้ resistance ดาเมจ**ทุกชนิด** 1 นาที — ป้องกันครบสุดในบรรดา Throne ทั้งหมด [M:4/4] [R:3/3] [B:2/3] |
| Action Economy | 8/10 (A) | Vanguard's Instinct ให้ reaction เพิ่มอีก 1 อันแยกจาก reaction ปกติสำหรับ Bulwark Shift โดยเฉพาะ และ capstone ทำให้ Bulwark Shift spam ได้ไม่จำกัดจำนวนครั้ง จำกัดแค่ Fervor เท่านั้น [M:3/4] [R:3/3] [B:2/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 5/10 (B) ↓ | **Guardian-lock ถาวร** ตัดโอกาส "เลือก Formless/Retribution" ที่ baseline เคยเครดิตไว้ออกไป และทุก feature ของ Throne นี้ทุ่มไปที่ tanking/support ล้วนๆ ไม่มี damage-role ให้สลับเลย [M:2/4] [R:2/3] [B:1/3] |

### Throne of Wisdom and Spirit

*แปลง Clarity (Universal) ให้เป็นบัฟเดี่ยวทรงพลังสำหรับ ally 1 คน — concentrated support ที่แรงกว่า Order and Law ต่อเป้าเดียวแต่แคบกว่า*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Governing Rule ระบุชัดว่าทุกโบนัสของ Throne นี้ใช้กับ ally เท่านั้น ตัวเองยังใช้ Clarity แบบพื้นฐาน (check อย่างเดียว ไม่มี reroll/advantage/crit) ไม่มีผลต่อดาเมจตัวเองเลย = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 8/10 (A) | Second Sight (lv6) ขยาย Clarity ให้ใช้กับ attack roll ของ ally ได้ด้วย (ไม่ใช่แค่ check) + reroll ถ้าจ่าย 5+ Fervor, Perfect Clarity (lv10) ให้ Advantage บน roll ที่ ally ได้รับ Clarity, Transcendent Mind (lv14) ลด threshold reroll เหลือ 3 Fervor + auto-crit ถ้าจ่าย 10+ Fervor ถึง threshold — stacking บัฟเดี่ยวที่แรงที่สุดในบรรดา Throne ทั้งหมด แต่จำกัดแค่ 1 ally/ครั้ง [M:4/4] [R:2/3] [B:2/3] |
| Survivability | 8/10 (A) | Governing Rule ตัดสิทธิ์ตัวเองจากโบนัสของ Throne ทั้งหมด ไม่มีผลต่อ survivability ตัวเองเลย = baseline พอดี (baseline's Guardian-conditional defense ยังอยู่ครบเพราะไม่มี prerequisite) [M:3/4] [R:3/3] [B:2/3] |
| Action Economy | 8/10 (A) | Capstone (lv17) ให้ ally ที่เลือกได้ผล Dash+Dodge+Disengage พร้อมกันทุกเทิร์นโดยไม่เสีย action ของตัวเองเลย เป็นการมอบ action economy เต็มเทิร์นให้ ally 1 คนตลอด 1 นาที [M:2/4] [R:3/3] [B:3/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 9/10 (S) | Sage's Guidance (lv3) ปลดล็อกให้ Clarity ใช้กับ ally ได้ (เดิม baseline ใช้ได้แค่ตัวเอง) ขยาย technique เดียวให้ครอบคลุม 2 เป้าหมาย (ตัวเอง/ally) x 2 ประเภท roll (check/attack ที่ lv6+) ไม่ผูก Path เลย [M:3/4] [R:3/3] [B:3/3] |
