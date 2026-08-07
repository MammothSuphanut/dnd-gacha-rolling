# Bard — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Bard](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

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

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Bard](00-scorecard-progress.md)_
