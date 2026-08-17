# Necromancer — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [necromancer-level-baseline.md](necromancer-level-baseline.md) (Class Baseline, ชั้น 1) + [necromancer-subclass-scorecard-2024.md](necromancer-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 14 subclass — gate lv3/6/10 (ตรงกับ "(Necromancer Subclass/Subclass feature — ยกเว้น)" ในตาราง Chassis ของ baseline) + Lichdom lv20 (universal, ฝังอยู่ใน baseline แล้ว)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะเลเวล/axis ที่เกรดต่างจาก baseline; ไม่ระบุ = เท่า baseline
**หมายเหตุ**: Thralls/Slaymates เป็น "unmodeled parallel actor" ตามที่ baseline วางไว้ — ฟีเจอร์ที่บัฟกองทัพ thrall (ไม่ใช่ Necromancer เอง) นับเข้า **Damage** ต่อ (สอดคล้องกับที่ baseline เองนับ Thralls เข้า Damage axis) แต่ไม่นับเข้า Support เว้นแต่ระบุ ally ที่มีชีวิตชัดเจน

**Baseline โดยสรุป**: Damage B(1-4)→A(5-20) · Control **B(1-20) flat** · Support **C(1-20) flat** · Survivability **D(1-19)→B(20)** · Action Economy D(1-17)→C(18-20) · Utility **B(1-20) flat** · Versatility C(1-2)→B(3-20)

---

## Black Rider

- **Damage**: A(5)→**S(6-20)** — Extra Attack (lv6) เปิดช่องดาเมจอาวุธเต็มรูปแบบที่ baseline ไม่มีเลย ซ้อนกับ Charnel Touch ผ่าน bonus action
- **Survivability**: D(1-2)→**A(3-20)** — Charnel Shield(reaction ลดดาเมจ)+Corpse Cavalry(armor+shield+Int-AC) พลิก 2 modifier พร้อมกันตั้งแต่ lv3
- **Action Economy**: D(1-2)→C(3-5)→**S(6-20)** — Charnel Strike(bonus action, lv3)+ม้าตีเองผ่าน reaction(lv6) = 3 modifier favorable
- **Versatility**: C(1-2)→B(3-5)→**A(6-20)** — Extra Attack(lv6) พลิก Target-Type Coverage (เมลี vs spell-only baseline)

## Blood Ascendant

- **Control**: B(1-2)→**A(3-20)** — Blood Ascendant Spells (Sleep/Hypnotic Pattern/Dominate Person รับประกัน) พลิก Severity เกินสมมติฐาน generic
- **Survivability**: D(1-2)→C(3-5)→**A(6-20)** — Charnel Drain(self-heal, lv3)+Vampiric Transformation(resist B/P/S+adv save, lv6)
- **Utility**: B(1-5)→**A(6-20)** — Vampiric Transformation (mist ทะลุช่องแคบ+บิน)
- **Versatility**: C(1-2)→B(3-5)→**A(6-20)** — shapeshift พลิก Adaptability

## Corpse Florist

- **Damage**: A(5)→**S(6-20)** — Rotten Seed (lv6, DoT necrotic recurring) = sustained-magnitude source ใหม่
- **Control**: B(1-2)→**A(3-20)** — Charnel Entangle (Restrained เมื่อ Charnel Touch dmg≥5)
- **Survivability**: D(1-5)→**C(6-20)** — Rotten Seed ให้ temp HP ตัวเองทุกเทิร์น
- **Action Economy**: D(1-5)→**C(6-20)** — Rotten Seed ให้ value ต่อเนื่องจาก bonus action เดียว = พลิก Resource-Conversion

## Crone

- **Control**: B(1-2)→**A(3-20)** — Charnel Curse (-1d6 ทุก d20 test ของเป้า, recurring save)
- **Support**: C(1-5)→**B(6-20)** — Witch's Cauldron (lv6, ปรุงยาแจก ally ได้จริง)
- **Utility**: B(1-5)→**A(6-20)** — Witch's Cauldron (ยาหลากชนิด) + Flying Broom (lv20)
- **Versatility**: C(1-2)→B(3-5)→**A(6-20)** — เลือกยาตามสถานการณ์ = พลิก Adaptability

## Dead Mist Acolyte

- **Survivability**: D(1-2)→C(3-5)→**A(6-20)** — Mistborne Regeneration(self-heal, lv3)+Gaseous Escape(reaction ลดดาเมจ, lv6)
- **Utility**: B(1-2)→**A(3-20)** — Fog Cloud/Misty Step/Gaseous Form รับประกันตั้งแต่ lv3

## Death Knight

รูปแบบเดียวกับ Black Rider เป๊ะ (Extra Attack lv6) แต่ AE-driver ต่างกัน (Overcharged Thralls แทนม้า-reaction)

- **Damage**: A(5)→**S(6-20)** — Extra Attack (lv6)
- **Survivability**: D(1-2)→**A(3-20)** — Charnel Resilience(temp HP)+Combat Research(armor+Int-AC) ตั้งแต่ lv3
- **Action Economy**: D(1-2)→C(3-9)→**S(10-20)** — Charnel Strike(lv3)+Overcharged Thralls(คืน Charnel point เมื่อ thrall ตาย, lv10) = 3 modifier favorable
- **Versatility**: C(1-2)→B(3-5)→**A(6-20)** — Extra Attack พลิก Target-Type Coverage

## Necrodancer

**Overall=S ในระบบเดิม — subclass เดียวที่ขยับ 6/7 axis (ยกเว้น Utility)**

- **Damage**: A(5)→**S(6-20)** — Backup Dancers table (+dmg passive ตามจำนวน thrall กำลัง Dance)
- **Control**: B(1-2)→**A(3-20)** — Charnel Groove (บังคับเป้าเต้นแทนทำอย่างอื่น = lockdown เต็มรูปแบบ)
- **Support**: C(1-5)→**B(6-20)** — Graveyard Tango (lv6, แบ่งบัฟ Backup Dancers ให้ ally 1 คน — ally ที่มีชีวิตจริง)
- **Survivability**: D(1-2)→B(3-5)→**S(6-20)** — Backup Dancers table พลิก AC+Evasion+Disadvantage-การโจมตีเข้าใส่พร้อมกัน (3 modifier) เมื่อ thrall count เพิ่มขึ้น
- **Action Economy**: D(1-2)→C(3-5)→B(6-9)→**S(10-20)** — free Disengage/Dash/Strike + **bonus action 2 ครั้ง/เทิร์น** ที่ 4+ thrall (~lv10-11 ตามตาราง thrall ของ baseline) = economy multiplier แรงสุดในกลุ่ม
- **Versatility**: C(1-2)→**A(3-20)** — ตาราง scaling เดียวให้ผลครบ 4 axis พร้อมกัน (Damage/Control/Survivability/AE) = ความหนาแน่น cross-axis ที่ไม่มี subclass อื่นในคลาสนี้เทียบได้

## Overlord

- **Damage**: B(1-2)→A(3-4)→**S(5-20)** — Charnel Aura (lv3, bonus action บัฟ dmg/AC/d20 ให้ undead ที่คุมทั้งหมดในรัศมี ทำงานทุกเทิร์น)
- **Control**: B(1-2)→**A(3-20)** — Overlord Spells (Command/Hold Person/Dominate Person/Geas รับประกัน)
- **Survivability**: D(1-9)→**C(10-20)** — Sacrificial Thralls (lv10, reaction redirect เป้าโจมตีไปโดน thrall แทน)
- **Action Economy**: D(1-2)→**C(3-20)** — Charnel Aura ให้ value ต่อเนื่องจาก bonus action เดียวทุกเทิร์น = พลิก Resource-Conversion

## Pale Master

- **Damage**: B(1-2)→A(3-4)→**S(5-20)** — Charnel Empower (lv3, ดาเมจเสริม necrotic scale ตาม level+Int mod สูงสุดในกลุ่ม)
- **Control**: B(1-5)→**A(6-20)** — Frightening Gaze (lv6, recurring-save Frighten)
- **Survivability**: D(1-19)→**A(20)** — Magic Resistance (lv20, adv save vs spell) พลิก dimension สุดท้ายที่เหลือ ต่อยอดจาก Lichdom's 3/4 → 4/4
- **Action Economy**: D(1-9)→**C(10-20)** — Thrall Rush (lv10, thrall ขยับฟรีตอน initiative)

## Pharaoh

**Overall=A ในระบบเดิม — Support เดียวที่แตะ S ในทั้งคลาส**

- **Damage**: B(1-2)→A(3-4)→**S(5-20)** — Ankh of Radiance (lv3, retaliation dmg 1d6→4d6 ใส่ผู้โจมตี ally ที่ blessed) = แหล่งดาเมจแบบ reactive ใหม่
- **Support**: C(1-2)→**S(3-20)** — Ankh of Radiance's ally-buff + Pharaoh Spells (Revivify/Death Ward/Greater Restoration รับประกัน) + Scarab of Judgment (lv10) = **Necromancer เพียงตัวเดียวในคลาสที่เป็น dedicated healer/support เต็มรูปแบบ** พุ่ง S ตั้งแต่ subclass gate แรก
- **Utility**: B(1-2)→**A(3-20)** — Divination รับประกัน
- **Versatility**: C(1-2)→**A(3-20)** — role-shift จาก caster-ทั่วไปเป็น healer/support เต็มตัว = พลิก Target-Type-Coverage ทางความหมาย (บทบาททั้งหมดเปลี่ยนเป้าจากศัตรูเป็น ally)

## Plague Lord

- **Damage**: A(5-9)→**S(10-20)** — Bloated Thralls (lv10, thrall ระเบิด AoE 4d6 poison ทุกครั้งที่ตาย/ถูกปล่อย ไม่จำกัดจำนวนครั้ง)
- **Control**: B(1-2)→**A(3-20)** — Charnel Toxin(Poisoned on dmg≥5)+Vile Congregation(aura -1d4 d20 test ของศัตรูใกล้ตัว)
- **Action Economy**: D(1-9)→**C(10-20)** — Bloated Thralls ทำงานอัตโนมัติไม่เสีย action = พลิก Resource-Conversion

## Reanimator

- **Damage**: B(1-2)→A(3-4)→**S(5-20)** — Charnel Voltage (lv3, Charnel Touch แตกไปเป้าที่สอง) = AoE/multi-target magnitude ใหม่
- **Control**: B(1-2)→**A(3-20)** — Charnel Voltage ล็อก Opportunity Attack ของเป้าที่สอง
- **Support**: C(1-5)→**B(6-20)** — Lazarus Bolt (lv6, ชุบชีวิต ally ที่เพิ่งตายด้วย 1 HP+temp HP)
- **Survivability**: D(1-19)→**A(20)** — Self-Stitches (lv20, ใช้ Spell-Stitches กับตัวเองได้) พลิก dimension สุดท้าย ต่อยอดจาก Lichdom
- **Utility**: B(1-5)→**A(6-20)** — Medicine proficiency + Lazarus Bolt (Solve-Problem-adjacent)
- **Versatility**: C(1-2)→**A(3-20)** — Spell-Stitching 5 แบบเลือกปรับ thrall ตามสถานการณ์ = พลิก Adaptability

## Reaper

- **Damage**: A(5)→**S(6-20)** — Charnel Veil (lv3, Invisible on dmg≥5) เปิด Advantage โจมตีถัดไป
- **Survivability**: D(1-2)→C(3-5)→**A(6-20)** — Charnel Veil(invisible)+Umbral Form(lv6, immune grapple/prone+Disadvantage โจมตีเข้าใส่)
- **Utility**: B(1-5)→**A(6-20)** — Umbral Form (2x speed+full climb+invisible ในที่มืด)

## Toymaker

- **Damage**: A(3-4)→**S(5-20)** — Charnel Puppet (lv3, Slaymates นับ 2 ตัว/1 thrall quota) = กองทัพขยายเป็นเท่าตัว
- **Control**: B(1-5)→**A(6-20)** — Soul Doll (lv6, reaction ดักวิญญาณกันฟื้นคืนชีพศัตรู)
- **Action Economy**: D(1-2)→C(3-4)→**S(5-20)** — Slaymates 2-ต่อ-1 quota = พลิก Resource-Conversion ระดับทวีคูณ

---

## ข้อค้นพบสำคัญ

1. **Black Rider/Death Knight เป็น subclass คู่แรกในระบบนี้ที่ full caster ได้ Extra Attack จริงจาก subclass** — Damage กระโดด A→S ที่ lv6 ผ่านการเปิดเส้นทางอาวุธเมลีเต็มรูปแบบที่ base-class ไม่มีเลย พร้อมพลิก Versatility's Target-Type Coverage ไปด้วย (spell-only→hybrid) — pattern คู่ขนานที่ไม่เคยเจอในคลาส caster อื่นมาก่อน (Cleric/Bard/Druid/Mystic ไม่มีตัวไหนได้ Extra Attack จาก subclass)
2. **Necrodancer's Backup Dancers table เป็นตัวอย่างที่ชัดที่สุดของ "single mechanism, extreme cross-axis density"** — ตารางเดียวพลิก 4 axis พร้อมกัน (Damage/Control/Survivability/AE) แรงพอที่จะข้าม "same-dimension trap" ปกติของ Versatility ไปสู่ A ได้ (ต่างจาก Overlord/Corpse Florist ที่มีฟีเจอร์แยกกันหลายตัวแต่ไม่นับ Versatility เพิ่มเพราะเป็นแค่ breadth ธรรมดา) — Necrodancer's AE ยังเป็น S สูงสุดในทั้งคลาส (bonus action 2 ครั้ง/เทิร์น)
3. **Pharaoh คือ subclass เดียวในทั้งคลาสที่ Support แตะ S** — พลิกธีม Necromancer ที่ปกติ self/thrall-focus (baseline Support=C แบนราบทั้งคลาส) ให้กลายเป็น dedicated healer เต็มรูปแบบตั้งแต่ subclass gate แรก (lv3) ไม่ใช่แค่ปลดล็อกช้าแบบ Necrodancer/Reanimator — ยืนยันว่า baseline's "self-focus" framing เป็นแค่ค่าเริ่มต้น ไม่ใช่ข้อจำกัดถาวรของคลาส
4. **"Specialist framing" (explicit narrow-focus text ใน old scorecard) ถูกใช้เป็นเกณฑ์ 0-delta Versatility อย่างสม่ำเสมอ** — Corpse Florist/Dead Mist Acolyte/Overlord/Pale Master/Plague Lord/Reaper/Toymaker (7/14) ไม่ได้ Versatility delta เลย แม้ old score หลายตัวจะ 7-8(A) เพราะไม่มี Target-Type/Adaptability/Fungibility flip ที่ยืนยันได้จริง เทียบกับอีก 7/14 ที่ได้ A ผ่าน mechanism ชัดเจน (hybrid-weapon/shapeshift/potion-choice/role-shift/spell-stitching-choice) — 50/50 split พอดี
5. **Pale Master + Reanimator เป็น 2 subclass แรกในทั้งคลาสที่ Survivability แตะ A ที่ lv20 ผ่านการพลิก "dimension สุดท้าย" ต่อยอดจาก Lichdom's 3/4-above** (Magic Resistance / Self-Stitches ตามลำดับ) — ยืนยันว่า baseline's Lichdom capstone (3/4 above → B) เปิดช่องให้ subclass feature ตัวเดียวที่ lv20 ดันไปถึง A ได้ถ้าตรงกับ dimension ที่เหลือพอดี
6. **Resource-Conversion flip ผ่าน "passive value ต่อเนื่องจาก action ครั้งเดียว" เป็น pattern ที่เกิดซ้ำ 5 ครั้งในคลาสนี้** (Corpse Florist's Rotten Seed, Overlord's Charnel Aura, Plague Lord's Bloated Thralls, Toymaker's Slaymates, Death Knight's Overcharged Thralls) — มากที่สุดในบรรดา pattern เดี่ยวที่เจอในคลาสเดียวจนถึงตอนนี้ สะท้อนว่าธีม pet/thrall-based ของคลาสนี้เอื้อต่อ "แปลง action ครั้งเดียวเป็นมูลค่าต่อเนื่อง" มากกว่าคลาสอื่น
