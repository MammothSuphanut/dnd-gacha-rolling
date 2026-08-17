# Warden — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [warden-level-baseline.md](warden-level-baseline.md) (Class Baseline, ชั้น 1) + [warden-subclass-scorecard-2024.md](warden-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 17 subclass — gate lv3/6/10/17 (ตรงกับ "(Warden Subclass/Subclass feature — ยกเว้น)" ในตาราง Chassis ของ baseline) — 5 ตัวเป็น 2014-only 🕰️ (2 ใน 5 มี reprint คนละชื่อ: Hellkeeper→Diabolist, Iceheart Bastion→Rimekeeper แต่ tracker แยกบรรทัดอิสระ)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะเลเวล/axis ที่เกรดต่างจาก baseline; ไม่ระบุ = เท่า baseline
**หมายเหตุสำคัญ**: **Survivability baseline ชนเพดาน S(9-20) อยู่แล้ว และ old scorecard เองยืนยัน "ทุก subclass = 10/10 เสมอ ไม่ว่าจะมี feature เสริมมากแค่ไหน"** — ไฟล์นี้จึงไม่มี delta ในแกน Survivability เลยแม้แต่ตัวเดียว (0/17) ต่างจากทุกคลาสก่อนหน้าที่มักมี early-pull บ้าง — Warden baseline ออกแบบมาแข็งแกร่งครบเกือบทุกแกนอยู่แล้ว (มีแค่ Utility ที่เป็น floor D จริง)

**Baseline โดยสรุป**: Damage B(1-10)→**A(11-20)** · Control D(1)→**B(2-20)** · Support D(1)→**B(2-20)** · Survivability B(1-8)→**S(9-20)** [ชนเพดาน] · Action Economy C(1-4)→B(5-10)→**A(11-20)** · Utility **D(1-20) flat** · Versatility B(1)→**A(2-20)**

---

## Beastblood Guardian

- **Damage**: B(1-2)→A(3-16)→**S(17-20)** — Wild Pounce (extra dmg+Prone ทุกเทิร์นแรกที่ตีโดน, lv3) ดันไว ซ้อนกับ Aspect of the Beast (lv17, Bleeding stack ทะลุ resist/immune + Advantage เกือบถาวร)
- **Utility**: D(1-2)→**B(3-20)** — Hunting Grounds (Climb+Swim Speed เท่า Speed + ไม่เสีย movement จาก Difficult Terrain)

## Carrion King

- **Control**: [B(2) เท่า baseline]→**S(3-20)** — Swarm Cloud (AoE เลือก Deafen/Difficult Terrain/Heavily Obscured 10 นาที) ซ้อนกับ Plague Vector(lv10)+Blinding Bites(lv17) = "ชุด control ที่กว้างและแรงที่สุดในบรรดา class นี้"
- **Damage**: B(1-2)→**A(3-20)** — Infest (ดาเมจสเกล+debuff ตั้งแต่ lv3)
- **Utility**: D(1-2)→**B(3-20)** — Versatile Vermin (สั่งแมลงหยิบของ/เปิดประตู/เทของเหลวระยะไกลทุกเทิร์นไม่เสีย action)

## Diabolist

- **Control**: B(2-5)→**A(6-20)** — Infernal Command (lv6, free Command spell 2 ครั้ง/รอบ — "reliable และซ้ำได้บ่อย")

## Drake-Blooded

- **Damage**: B(1-2)→A(3-16)→**S(17-20)** — Full Sorcerer spellcasting (lv3) ดันไว ซ้อนกับ Aspect of the Greatwyrm(lv17, AoE breath+elemental fury)+Draconic Vengeance(lv10)
- **Utility**: D(1-2)→**B(3-20)** — เข้าถึง Sorcerer utility spell (Detect Magic ฯลฯ)
- **Versatility**: [A(2) เท่า baseline]→**S(3-20)** — **Full spellcasting hybrid บน chassis นักสู้** (pattern เดียวกับ Divine Soul/Mage Brand) พลิก Primary tier เอง

## Fey Trailblazer 🕰️

*(0 delta ทุกแกน — old scorecard เองระบุ "แค่ Utility ที่ขยับ +1 เล็กน้อย" แต่ไม่พอข้าม floor-lock; ที่เหลือ "เท่า/ใกล้เคียง baseline" ตรงๆ)*

## Godsworn

- **Support**: [B(2) เท่า baseline]→**S(3-20)** — Anointed Block(+1d4 ให้ ally roll)+Benediction(free Lesser Restoration/Sanctuary) = "ชุด support ที่ทรงพลังและ reliable ที่สุดใน class"
- **Utility**: D(1-2)→**B(3-20)** — Religion skill+bonus+free utility spell (Sanctuary/Zone of Truth)

## Grey Watchman

- **Damage**: B(1-2)→**A(3-20)** — 6 maneuver เพิ่ม battle die ใส่ดาเมจตั้งแต่ lv3
- **Control**: B(2-2)→**A(3-20)** — 4 maneuver control ครบครัน (Grapple/Prone-Push/Speed-0/Disadvantage)
- **Support**: B(2-9)→**A(10-20)** — Hold the Line (lv10, AoE Advantage ต่อ Str/Dex/Con save ให้ทีม)
- **Action Economy**: C(1-4)→**A(5-20)** — Rampage (free attack ทันทีหลัง kill/crit ตั้งแต่ lv3-5) พลิก Extra-Action modifier เร็วกว่า baseline's lv11 มาก
- **Versatility**: [A(2) เท่า baseline]→**S(3-20)** — 6 maneuver ที่ต่างกันโดยสิ้นเชิง (grapple/push/slow/stagger/initiative/rampage) = "breadth ที่กว้างที่สุดใน class นี้" — cross-axis density เดียวกับ pattern Necrodancer/Wrath-of-the-Wild

## Hellkeeper 🕰️

- **Damage**: B(1-2)→**A(3-20)** — Hellish Grasp+Spiteful Mark (ดาเมจไฟเสริม Grasp/Mark เดิมตั้งแต่ subclass gate แรก)

## Iceheart Bastion 🕰️

*(0 delta ทุกแกน — North Wind/Form of the Old Hoarfrost ไม่พอข้าม threshold ตามที่ old scorecard ระบุ "ไม่มากพอยกระดับ tier ชัดเจน")*

## Loreseeker 🕰️

- **Damage**: B(1-2)→**A(3-20)** — Full Wizard spellcasting (abjuration/evocation เน้น) ตั้งแต่ lv3
- **Utility**: D(1-2)→**B(3-20)** — เข้าถึง Wizard utility spell (แม้จำกัด school)

## Nightgaunt

- **Damage**: B(1-2)→**A(3-20)** — Death's Gambit (execute เป้าที่ Challenge ไว้ ตั้งแต่ lv3, ทำงานร่วมกับ baseline's Challenge)
- **Utility**: D(1-2)→**B(3-20)** — Speak with Dead free+Gentle Repose+Darkvision 60-120ft

## Rimekeeper

- **Damage**: B(1-2)→**A(3-20)** — Frostbite (ดาเมจสเกล+สลับธาตุ Cold ตั้งแต่ lv3)
- **Control**: B(2-5)→**A(6-20)** — Black Ice (AoE Prone ซ้ำได้ทุกครั้งที่มีคนเข้าพื้นที่)
- **Utility**: D(1-2)→**B(3-20)** — Freeze Shut(ล็อกประตู/หีบ)+Polar Acclimation(cold resist+ธาตุอาวุธ)

## Soulblood Shaman 🕰️

- **Damage**: B(1-2)→**A(3-20)** — Full Druid spellcasting (evocation/transmutation เน้น) ตั้งแต่ lv3

## Stoneheart Defender

- **Support**: B(2-2)→**A(3-20)** — Stonewall (Block ให้ผลลดดาเมจ B/P/S แบบ flat ทั้งตัวเองและ ally เท่า AC bonus ของ Shield — "ทรงพลังเหนือ baseline")
- **Action Economy**: [A(11-20) เท่า baseline] — Stoneforged Champion(lv17) ปลดล็อกช้าเกินไป ไม่ดึงเร็วขึ้นจากเดิม

## Storm Sentinel

- **Damage**: B(1-2)→A(3-16)→**S(17-20)** — Thunderblast (Grasp→AoE ดาเมจตั้งแต่ lv3) ดันไว ซ้อนกับ Stormlord(lv17, Call Lightning ฟรีซ้ำได้ทุกเทิร์น)

## Verdant Protector

- **Damage**: B(1-5)→**A(6-20)** — Spike Growth access (likely lv6) เสริม Armor of Thorns(lv17)
- **Control**: B(2-5)→**A(6-20)** — Grasping Vines (ขยายระยะ Grasp emanation) ซ้อนกับ Entangling Transformation(lv17, AoE Restrained)
- **Support**: B(2-9)→**A(10-20)** — Verdant Resilience (lv10, ใช้ Survive ช่วย ally แทนได้ ally ได้ temp HP=2×level)
- **Utility**: D(1-2)→**B(3-20)** — Speak with Plants+Goodberry(แก้ logistics อาหาร/น้ำ)

## Witchbane Hunter

- **Damage**: B(1-2)→**A(3-20)** — Branding Challenge (extra dmg บนเป้า Challenge ตั้งแต่ lv3)
- **Control**: B(2-16)→**A(17-20)** — Anti-Mage (lv17, free Antimagic Field — "ชุด anti-caster ที่แรงที่สุดในบรรดา class นี้")
- **Utility**: D(1-2)→**A(3-20)** — Cerulean Medallion+Grimoire Monstrum+Otherworldly Eye+Holy Water = delta สูงสุดในแกน Utility ของไฟล์นี้ (+4)

---

## ข้อค้นพบสำคัญ

1. **⚠️ Survivability ไม่มี delta เลยสักตัวเดียวใน 17 subclass — ครั้งแรกในทั้งระบบที่ axis หนึ่งได้ 0 delta 100%** — เพราะ old scorecard เองยืนยันชัดว่า Warden baseline's Survivability ชนเพดานสูงสุด (10/10) อยู่แล้วไม่ว่า subclass จะมี defensive feature เสริมมากแค่ไหน — พิสูจน์ตรงข้ามกับ pattern "ceiling ทะลุได้เสมอ" ที่เจอในหลายคลาสก่อนหน้า (Paladin/Ranger/Rogue/Sorcerer): บาง class-axis-combo ถูกออกแบบให้ชนเพดานจริงๆ ไม่ใช่แค่เพดานของ chassis เปล่า
2. **Grey Watchman เป็น subclass แรกในทั้งไฟล์ที่ขยับ 5/7 axis พร้อมกันรวมถึง Versatility S ผ่าน 6-maneuver cross-axis density** — ยืนยัน pattern Necrodancer/Wrath-of-the-Wild ใช้ได้แม้กับคลาสที่ baseline Versatility สูงอยู่แล้ว (A) ไม่ใช่แค่คลาสที่ baseline ต่ำ
3. **Drake-Blooded เป็น subclass เดียวในคลาสนี้ที่ทะลุ Versatility ผ่าน Primary-elevation จริง (full Sorcerer spellcasting)** — ตัดกับ Loreseeker/Soulblood Shaman ที่มี spellcasting เหมือนกันแต่ถูกจำกัด school (abjuration/evocation-only) จนไม่นับเป็น "full" alt-list — ยืนยันว่า "school restriction" เป็นตัวตัดสินว่า spellcasting-hybrid จะได้ Versatility escalation หรือไม่
4. **Diabolist เป็น subclass เดียวในทั้งระบบที่ old scorecard เขียนไว้ตรงๆ ว่า "axis หนึ่งลดลงจาก baseline"** (Support 7→5) ซึ่งขัดกับกติกาโปรเจกต์เอง ("ทุกแกนต้อง ≥ baseline เสมอ") — ไฟล์นี้แก้ไขให้เป็น 0 delta (เท่า baseline) แทนตามกติกาที่ถูกต้อง ไม่ใช้ตัวเลขจาก old scorecard ตรงๆ
5. **8/17 subclass ขยับ Utility ได้ (47%) แม้จะเป็น floor เดียวที่เหลือของคลาสนี้** — ตั้งแต่ full spellcasting-driven escapes (Drake-Blooded/Loreseeker/Soulblood Shaman) ไปจนถึง non-spell toolkit ที่แน่นพอ (Witchbane Hunter ได้ A แม้ไม่มีสเปลล์เลย ผ่าน detection-item-suite 4 ชิ้น)
6. **Damage escalation กระจุกที่ full-spellcasting และ early-maneuver-reinforcement เกือบทั้งหมด (10/17)** — ทุกตัวที่ขยับ pull A-onset จาก baseline's lv11 มาที่ lv3 เกือบหมด เพราะ maneuver/spell ส่วนใหญ่ในคลาสนี้เป็นฟีเจอร์ subclass-gate-แรก (lv3) ไม่ใช่ปลายเกม
