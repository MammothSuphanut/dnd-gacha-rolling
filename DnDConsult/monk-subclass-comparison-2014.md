# เปรียบเทียบ Monk Subclass ทั้งหมด (Edition 2014)

**วันที่**: 2026-08-03
**ขอบเขต**: Monastic Tradition ทุกสายที่มีในโปรเจกต์ ระดับ 2014 (ไม่รวม 2024/XPHB "Warrior of X")
**แหล่งข้อมูล**: `src/data/5etools/official/class/class-monk.json`, `src/data/5etools/homebrew/valdas-spire/`, `src/data/5etools/homebrew/grim-hollow/`
**เวอร์ชันโต้ตอบได้**: https://claude.ai/code/artifact/92cb0d0a-da39-4414-be97-4aa88d760926 (ค้นหา/กรองตามแหล่งได้)

---

## Legend
- 🔵 Official (WotC) — PHB, SCAG, XGE, TCE, FTD
- 🟢 Valda's Spire of Secrets (VSS'14)
- 🔴 Grim Hollow — Player's Guide (GH:PG'14)

---

## 1. Official — 10 สาย

### Open Hand (PHB'14) 🔵 — All-rounder / control striker
- **จุดเด่น**: Flurry of Blows เลือกล้ม/ผลัก/ปิด reaction ได้ (คุมสนามดีสุดตั้งแต่ lv3); ฮีลตัวเอง 3×level ฟรีทุกวัน (Wholeness of Body, lv6); ไม่ต้องพึ่ง resource พิเศษ เล่นง่ายเสถียรทุกเลเวล
- **จุดด้อย**: ไม่มีทางเลือกระยะไกล; เอฟเฟกต์คุมส่วนใหญ่ต้อง save จากศัตรู ไม่ auto; ค่อนข้าง "ตรงไปตรงมา" ไม่มีกิมมิกเฉพาะตัว
- **วิธีเล่น**: ตีต่อเนื่องด้วย Flurry of Blows แล้วเลือกล้ม/ผลัก/ปิดกั้น reaction ศัตรู เป็นตัวคุมสนามระยะประชิดที่ฮีลตัวเองได้

### Shadow (PHB'14) 🔵 — Stealth skirmisher
- **จุดเด่น**: สเปลฟรีผ่าน ki (darkness, silence, pass without trace); Shadow Step (lv6) เทเลพอร์ต 60ft + advantage นัดแรก; เก่งมากในดันเจี้ยน/ภารกิจกลางคืน
- **จุดด้อย**: ต้องมีที่มืด/dim light ถึงจะใช้ฟีเจอร์หลักได้; ki สำหรับสเปลแย่งกับ ki ของ Stunning Strike; อ่อนแรงในฉากกลางแจ้ง/แสงจ้า
- **วิธีเล่น**: สร้างความมืดด้วย ki แล้วซ่อนตัว โผล่มาจู่โจมแบบ advantage ผ่าน Shadow Step แล้วหลบกลับเข้าเงา

### Four Elements (PHB'14) 🔵 — Pseudo-elementalist caster
- **จุดเด่น**: มี AoE/ระยะไกลผ่าน discipline (fire snake, water whip, gust); ปรับธีมได้อิสระ (ไฟ/น้ำ/ดิน/ลม); ตัวเลือกดาเมจหลากหลายที่สุดในบรรดามนกสายประชิด
- **จุดด้อย**: ใช้ ki เปลืองมาก แย่งกับ Stunning Strike ตลอด; ถือเป็นหนึ่งใน subclass ที่อ่อนที่สุดของคลาสในทางกลไก; ดิสซิพลินแรงๆ ล็อกที่ lv11/17 กว่าจะครบ
- **วิธีเล่น**: ใช้ ki cast elemental discipline (extra discipline ที่ lv6) แทนการชกต่อยตรงๆ เน้นดาเมจ AoE/ระยะไกล แต่ต้องบริหาร ki ให้ดี

### Long Death (SCAG) 🔵 — Tanky duelist
- **จุดเด่น**: ได้ temp HP พิเศษทุกครั้งที่ฆ่าศัตรู (Touch of Death); Mastery of Death (lv11) = เช็คบัตรตายฟรีด้วย 1 ki; Fear AoE 30ft ที่ lv6 (Hour of Reaping) คุมกลุ่มศัตรูได้ทันที
- **จุดด้อย**: Touch of Death อาศัยจังหวะฆ่าปิดจ๊อบ ไม่ reliable กับบอสเดี่ยว; โฟกัสแค่ "อยู่รอด" สเกลความแรงน้อยกว่าสายอื่น; ธีมค่อนข้างแคบ (death/necro)
- **วิธีเล่น**: ลุยเข้าประชิด เก็บ HP พิเศษจากการฆ่า แล้วใช้ fear เคลียร์กลุ่มศัตรูรอบตัว เน้นอึดและอยู่แนวหน้า

### Drunken Master (XGE) 🔵 — Mobile hit-and-run
- **จุดเด่น**: Flurry ฟรี Disengage + เดินเพิ่ม 10ft (Tipsy Sway, lv6) — มือถือดีสุดในบรรดามนก; โดน flank/ล้อมได้ยากมาก; เข้ากับสไตล์ hit-and-run สมบูรณ์แบบ
- **จุดด้อย**: ไม่มีฟีเจอร์เพิ่มดาเมจโดยตรงเลย เน้นมือถืออย่างเดียว; flavor "เมา" ต้องรับได้; ไม่มี defensive reaction แรงๆ นอกจาก redirect attack
- **วิธีเล่น**: บุกเข้าตี ต่อยแล้วถอยแบบไม่โดน AoO ด้วย Flurry ฟรี Disengage เล่นแบบ hit-and-run ไม่ยืนปะทะตรงๆ

### Kensei (XGE) 🔵 — Weapon-focused striker
- **จุดเด่น**: เลือกอาวุธจริง (ดาบ/หอก/ธนู) สเกลด้วย Martial Arts die; Kensei's Shot ทำ Flurry แบบยิงไกลได้; One with the Blade (lv6) + Sharpen the Blade เพิ่ม magic bonus ให้อาวุธเอง
- **จุดด้อย**: ต้องพกอาวุธหลักตลอด เสี่ยงโดน disarm; Deft Strike แย่ง ki กับ Stunning Strike; ฟีลไม่ใช่มนกหมัดล้วนแบบดั้งเดิม
- **วิธีเล่น**: เลือกอาวุธประจำตัวใช้แทนหมัดแต่ยังสเกลด้วย Martial Arts die ผสมยิงไกล-ประชิดได้ยืดหยุ่นกว่ามนกทั่วไป

### Sun Soul (XGE) 🔵 — Ranged blaster
- **จุดเด่น**: Radiant Sun Bolt ยิงไกลฟรีตั้งแต่ lv3 เก็บศัตรูบินได้; Searing Arc Strike (lv6) = AoE nova (burning hands); ดาเมจ radiant แทบไม่มีใครต้าน
- **จุดด้อย**: ดาเมจ melee โดยรวมต่ำกว่า Open Hand/Kensei; nova ที่ lv6 กิน ki เยอะ (2+) แย่งกับ Stunning Strike; โบลต์ระยะไกลไม่สเกลแรงเท่าฟีเจอร์ประชิดสายอื่น
- **วิธีเล่น**: ยิง Radiant Sun Bolt ระยะไกลแทนเข้าประชิด แล้วเก็บ ki ไว้ปล่อย Searing Arc Strike เป็น AoE nova ตอนจังหวะสำคัญ

### Mercy (TCE) 🔵 — Melee healer/support
- **จุดเด่น**: subclass เดียวที่ฮีลได้จริง แถมล้าง condition/โรคได้ที่ lv6 (Physician's Touch); Hand of Harm เพิ่ม necrotic dmg + poison ได้; สลับลุย/ซัพพอร์ตได้ในตัวเดียว
- **จุดด้อย**: ki หมดเร็วเพราะแบ่งใช้ทั้งฮีลและ Stunning Strike; ฮีลเป็นค่าคงที่ ไม่สเกลแบบสเปลฮีล; ต้องเข้าประชิดเพื่อสัมผัสรักษา วางตำแหน่งยากกว่า
- **วิธีเล่น**: สลับใช้ Hand of Harm ใส่ศัตรู กับ Hand of Healing รักษาพวกพ้องผ่านการสัมผัสในระยะประชิด

### Astral Self (TCE) 🔵 — Stat-flexible gish
- **จุดเด่น**: ใช้ Wisdom แทน Str/Dex ตี+ป้องกันได้ ดัมพ์สเตตอื่นได้เต็มที่; หมัดผีระยะ 10ft; Visage of the Astral Self (lv6) เพิ่ม darkvision 120ft + social utility
- **จุดด้อย**: ต้องเปิดฟีเจอร์ก่อนใช้งาน (bonus action + ki) ไม่ใช่ always-on; พลังเต็มจริงๆ มาที่ lv11 (Body of the Astral Self); ธีมภาพลักษณ์เฉพาะตัวมาก
- **วิธีเล่น**: เปิดร่าง Astral Self ด้วย ki ก่อนเข้าซัด ใช้ Wisdom แทน Str/Dex ตีระยะ 10ft เหมาะสายอยากดัมพ์ Str/Dex ทิ้ง

### Ascendant Dragon (FTD) 🔵 — Elemental blaster + flight
- **จุดเด่น**: Breath weapon เลือกธาตุได้ เสริม AoE นอกเหนือหมัด; Wings Unfurled (lv6) บินได้ผ่าน Step of the Wind; เลเวลสูงได้ resistance aura + frightful presence เพิ่ม
- **จุดด้อย**: breath ใช้ short/long rest recharge ไม่ใช่ ki จำกัดการใช้ซ้ำ; บินได้จำกัดจำนวนครั้ง ไม่ถาวร; subclass ใหม่ บางโต๊ะอาจไม่คุ้นกฎ
- **วิธีเล่น**: เปิดฉากด้วย Breath of the Dragon ใส่กลุ่มศัตรู แล้วใช้ Step of the Wind ควบคู่ปีกมังกรบินเข้าออกสนามรบ

---

## 2. Valda's Spire of Secrets (VSS'14) — 6 สาย

### Bow 🟢 — Ranged archer-monk
- **จุดเด่น**: ธนูนับเป็นอาวุธมนก +2 to-hit จาก Archery style; Flurry of Arrows / Soul Arrow ให้ burst ระยะไกลเทียบเท่า melee; Intercepting Shot (lv6) reaction ป้องกันตัวที่แรงมาก
- **จุดด้อย**: แทบไม่เหลือความสามารถประชิดตัว; ต้องจัดการลูกธนู/ammo เพิ่ม; homebrew — ผ่านการเทสน้อยกว่า official
- **วิธีเล่น**: ยืนระยะไกลยิงธนูแทนการชกต่อย ใช้ ki ผ่าน Flurry of Arrows/Soul Arrow เพิ่มดาเมจ

### Flagellant 🟢 — Self-harm high-risk striker
- **จุดเด่น**: Penitent Lash แลก advantage แบบไม่ต้อง save ทันที; ตัวเลือก lv6 (Art of Punishment: brand/shock/bleed) เพิ่มดาเมจได้หลายทาง; หมัดเป็น slashing ช่วยเจาะศัตรูต้าน bludgeoning
- **จุดด้อย**: ทำดาเมจตัวเองทุกครั้งที่ใช้ เสี่ยงกับ HP pool มนกที่บางอยู่แล้ว; ไม่มีระบบชดเชย HP ในตัวแบบ Open Hand; ธีม self-harm อาจไม่เหมาะกับทุกโต๊ะ
- **วิธีเล่น**: หวดตัวเองด้วย ki เพื่อแลก advantage แน่นอนก่อนตี สายเสี่ยงสูง-ได้สูง ต้องบริหาร HP ตัวเองดีๆ

### Four Fists 🟢 — Acrobatic mobility
- **จุดเด่น**: climbing speed ถาวร + กระโดดไกลขึ้น 2 เท่า + alpha strike ตอน initiative (Simian Swift); Nimbus (lv6) เพิ่มการบิน; เก่งสุดในแคมเปญที่เน้นเคลื่อนที่แนวตั้ง/สำรวจ
- **จุดด้อย**: บินต้องเสีย ki ทุกเทิร์นเพื่อคงสถานะ แพงมาก; ฟีเจอร์ส่วนใหญ่คือมือถือ ไม่ใช่ดาเมจ/คุมสนาม; ธีม "กลายเป็นลิง" เฉพาะตัวมาก
- **วิธีเล่น**: ใช้ Simian Swift เปิดฉากตั้งแต่ initiative แล้วไต่ปีนกระโดดควบคุมพื้นที่การต่อสู้แนวตั้ง

### Mask 🟢 — Charisma grappler
- **จุดเด่น**: ใช้ Charisma แทน Wisdom ทั้ง AC และ ki DC; คว้าจับ (grapple) ได้ทุกไซส์ แม้แต่ยักษ์/มังกร; Choked Out (lv17) ทำให้ศัตรูตัวใหญ่สลบได้
- **จุดด้อย**: อ่อนกับศัตรูหลายตัวพร้อมกัน/ที่ grapple ไม่ได้ (ooze, incorporeal); ยังต้องใช้ Strength เช็ค grapple อยู่ดี = MAD เล็กน้อย; ธีมนักมวยปล้ำเฉพาะทางมาก
- **วิธีเล่น**: คว้าจับศัตรูตัวใหญ่แค่ไหนก็ได้แล้วกดทุ่ม/รัดคอ (Signature Move ที่ lv6) ใช้ Charisma แทน Wisdom เป็นสถิติหลักได้

### Rose 🟢 — Fey debuff/support
- **จุดเด่น**: Blossom Burst ทำตาบอดทันทีเมื่อโดน ไม่ต้อง save; Colors of Love (lv11) บัฟทีมได้ทั้งฮีล/ดาเมจ/ช่วยเหลือ; เทเลพอร์ต 10ft ผ่าน Falling Petal Flurry (lv6) เพิ่มความคล่องตัว
- **จุดด้อย**: ตาบอดหลุดง่ายถ้าศัตรู dash หรือเดินเกิน 40ft; ออร่าบัฟรัศมีแค่ 5ft ต้องยืนชิดทีมมาก; ดาเมจส่วนตัวต่ำกว่าสาย striker
- **วิธีเล่น**: ทำให้ศัตรูตาบอดด้วยเกสรดอกไม้ แล้วใช้ออร่ากุหลาบบัฟทีมในระยะประชิด

### Street Fighting 🟢 — Single-target burst
- **จุดเด่น**: Combo สะสม +2 ต่อฮิตติดต่อกัน (สูงสุด +6) — แม่นสุดใส่บอส AC สูง; Special Moves (lv11) มีท่าไม้ตายหลายแบบ (ki blast, uppercut, whirlwind)
- **จุดด้อย**: โบนัสรีเซ็ตทันทีถ้าโดนตีแม้แต่ครั้งเดียวในเทิร์นนั้น; ฟีเจอร์ lv6 (Iron Fist) แทบไม่มีผลในคอมแบต (แค่ทุบวัตถุ); อ่อนกับศัตรูหลายตัวเพราะโบนัสผูกกับเป้าเดียว
- **วิธีเล่น**: โฟกัสตีเป้าหมายเดียวต่อเนื่องให้โบนัสสะสม เหมาะบอสฝ่ายเดี่ยว แต่ต้องระวังไม่โดนตีสวนจนโบนัสรีเซ็ต

---

## 3. Grim Hollow — Player's Guide (GH:PG'14) — 2 สาย

### Leaden Crown 🔴 — Telekinetic caster-striker
- **จุดเด่น**: หมัดระยะ 10ft เป็น force damage ทะลุ resistance ส่วนใหญ่ (Subtle Hand); cast สเปลจริงผ่าน ki (hold person, levitate, shatter); Unsubtle Strike (lv6) ผลัก/ดึงศัตรูควบคุมพื้นที่ได้
- **จุดด้อย**: สเปลกิน ki เยอะ แย่งกับ Stunning Strike ตลอด; ธีม anti-outsider/การเมืองเฉพาะทาง ไม่เข้ากับทุกแคมเปญ; เครื่องมือกระจายเยอะ ไม่มีจุดแข็งเดียวที่โดดเด่นสุด
- **วิธีเล่น**: ยืนตีจากระยะ 10ft ด้วยหมัดพลังจิต แล้วใช้ ki cast สเปล psionic เสริมคุมสนาม

### Pride 🔴 — Bloodied berserker
- **จุดเด่น**: ยิ่ง HP ต่ำ ยิ่งแรง (Assertive Attacker: Martial Arts die โต); Bruised Ego แปลง ki ทุกแต้มที่ใช้เป็น temp HP; Irrational Retaliation (lv6) ลงโทษใครก็ตามที่ตีโดนเราด้วย advantage + Redoubled Efforts (lv6) เพิ่ม crit dice ตอนเลือด<ครึ่ง
- **จุดด้อย**: จุดพีคของพลังต้องแลกกับ HP ≤ ครึ่งนึง เสี่ยงถ้าคุมไม่ดี; temp HP จาก Bruised Ego น้อยตอนเลเวลต้น; อ่อนแรงที่สุดตอน HP เต็ม ซึ่งคือตอนปลอดภัยที่สุด
- **วิธีเล่น**: ปล่อยให้ HP เหลือครึ่งนึงแล้วยิ่งแรงขึ้น ยิ่งโดนตียิ่งอึดขึ้นจาก temp HP เหมาะสาย "ยิ่งเจ็บยิ่งเก่ง"

---

## สรุปเร็วตามบทบาท

| บทบาท | สายที่เด่นสุด |
|---|---|
| Nova damage / AoE | Sun Soul, Flagellant, Leaden Crown, Street Fighting |
| Mobility / flight | Ascendant Dragon, Four Fists, Shadow, Rose |
| Grapple / control ใกล้ตัว | Mask, Leaden Crown, Long Death (fear) |
| Survivability / sustain | Open Hand, Pride |
| Support สายรักษา | Mercy |
| Ranged | Bow, Sun Soul, Kensei (บางส่วน) |
| Utility / social (อ่อนใน combat) | Astral Self, Street Fighting (Iron Fist) |

**จุดสังเกต**: Pride ได้ 2 ฟีเจอร์พร้อมกันตอน lv6 (มากกว่าสายอื่นที่ได้ 1); Street Fighting's Iron Fist เป็นฟีเจอร์ lv6 ที่อ่อนที่สุดในบรรดา 18 สาย (ประโยชน์แค่ทุบของ ไม่ช่วยต่อสู้เลย)
