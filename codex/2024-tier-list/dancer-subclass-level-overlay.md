# Dancer — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Dancer + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [dancer-subclass-scorecard-2024.md](dancer-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 14 ตัวจาก `Valda's Spire of Secrets 2024` แล้ว, ไม่มี 🕰️ orphan)
**Class Baseline อ้างอิง**: [dancer-level-baseline.md](dancer-level-baseline.md) — Damage A(1-19)→S(20) · Control **D(1-20) flat** (floor, ไม่มีกลไก) · Support **D(1-20) flat** (floor) · Survivability C(1-6)→A(7-20) · Action Economy C(1-10)→B(11-19)→A(20) · Utility **D(1-20) flat** (floor) · Versatility B(1)→A(2-20)
**รูปแบบตาราง**: Delta-only แบบย่อ (14 subclass)
**Subclass gate**: lv3/6/10/14 (uniform, ทุกตัวมาจากไฟล์ 2024 เดียวกัน)
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**:
1. **Control/Support/Utility ทั้ง 3 axis เป็น floor-lock (ไม่ใช่ modifier-tally)** — subclass ไหนเพิ่มกลไกจริงจะหลุด floor ทันทีแล้วประเมินตาม severity ของ feature เอง (เหมือน Craftsman's Control) — เจอ tier กระจายมาก: C(narrow)/B(modest)/A(strong)/S(multi-mechanism stack)
2. **"Damage=10 ในระบบเดิม" ใช้เป็น shortcut ระบุ early-S-onset**: subclass ที่ old-system ให้ Damage สูงกว่า baseline's เอง (9→10) มักมาจากกลไก nova/extra-combatant/fixed-die-upgrade ที่ผลัก Primary ได้จริงตั้งแต่ gate แรก (lv3) ไม่ต้องรอ baseline's เอง lv20 — พบ 5/14 subclass (Danseur Macabre, Fencer, Fire Dancer, Harlequin, Mime)
3. **Versatility ไม่มี subclass ไหน delta เลยแม้แต่ตัวเดียว** — ต่อเนื่องจาก pattern ที่พบทุกคลาสตั้งแต่ Channeler (Versatility's net-cancellation ceiling ทะลุยากที่สุดในระบบ)

---

## Acrobat — momentum striker

Momentum(lv3)+Deadly Momentum(lv14) reinforce Damage(same-tier,ไม่ข้าม) + Tumbling(lv3)+Evasive Speed(lv3, reinforce Mitigation-มิติเดียวกับที่ above อยู่แล้ว) + Aerial Acrobat(lv3, climb speed+jump+Acrobatics prof)

- **Utility**: D(1-2)→**C(3-20**, Aerial Acrobat หลุด floor — traversal kit แคบ)
- ไม่มี delta อื่น

## Cheerleader — team hype support

Inspiring Chant(lv3, AoE reroll ทีม)+Squad Warmup(lv3, แจก Dance Style)+Spirited Start(lv14, Heroic Inspiration ทีมตอน initiative)

- **Support**: D(1-2)→A(3-13, Inspiring Chant+Squad Warmup 2 มิติทีมพร้อมกันหลุด floor)→**S(14-20**, Spirited Start ซ้อนมิติที่ 3 — เต็ม max เท่า Cleric's Order/Peace pattern)
- ไม่มี delta อื่น (Damage/Control/Survivability/AE/Utility/Versatility ทั้งหมด "= baseline" ในระบบเดิม)

## Contortionist — hyper-flexible evader

Double Joints(lv3, immune Grapple/Restrain)+Backbend(lv3, half cover)+Twisting Redirection(lv3, reaction redirect-miss)+Reactive(lv14, extra reaction/เทิร์น)

- **Survivability**: C(1-2)→**S(3-20**, 3 กลไกป้องกัน/หลบหลีกพร้อมกันตั้งแต่ gate แรก — หนาแน่นที่สุดใน class ตามระบบเดิม)
- Action Economy: ไม่มี delta (Reactive แค่เสริม Reaction-มิติเดียวกับที่ above อยู่แล้วจาก baseline's Graceful Retaliation — same-dimension)

## Courtesan — charm controller

Enthralling Movement(lv3, Dance Style ฟรีทุกเทิร์น, Charmed no-cost)+Beguiling Charm(lv3)+Heartbreaker(lv14)+Honeyed Words(lv3, Deception/Persuasion prof)

- **Control**: D(1-2)→**A(3-20**, Enthralling Movement เป็น hard-CC ฟรีไม่เสีย resource ทุกเทิร์น — หลุด floor ตรงสู่ A)
- **Utility**: D(1-2)→**C(3-20**, Honeyed Words หลุด floor — social-skill kit แคบ)

## Danseur Macabre — undead army commander

Danse Macabre(lv3, เรียก Skeleton หลายตัวโจมตีเองผ่าน 1 bonus action)+Ghoulish Calling(lv3)+Grim Troupe(lv14, free Create Undead)+Dance with the Dead(lv3, free Speak with Dead)

- **Damage**: A(1-2)→**S(3-20**, กองทัพ Skeleton โจมตีคู่ขนานผลัก Primary ก่อน baseline lv20)
- **Action Economy**: C(1-2)→**B(3-19**, สั่งกองทัพผ่าน 1 bonus action flip 2 มิติ(Bonus-Action-Value+Extra-Action-Access) — 2-2 tie กลับสู่ Primary B เร็วกว่า baseline's เอง lv11)→A(20, =baseline)
- **Utility**: D(1-2)→**B(3-20**, Dance with the Dead free-cast Speak with Dead = investigative utility จริง)

## Dramaturge — bard-hybrid performer

Spotlight(lv3, Dance Style แปลง save-ผ่านเป็น fail)+Tragedy/Comedy Mask(lv3)+Encore(lv14, 1/rest)+Bard spellcasting เต็มรูปแบบ(lv3)

- **Control**: D(1-2)→**B(3-20**, Spotlight หลุด floor — เสริม spell-list control ที่มีอยู่)
- **Utility**: D(1-2)→**A(3-20**, full Bard spellcasting = Breadth+Magnitude flip มหาศาล หลุด floor ตรงสู่ tier สูงสุดเท่าที่ floor-escape เคยให้)
- ไม่มี delta อื่น (Encore=1/rest เท่านั้น ไม่พอนับ Action-Economy flip)

## Fencer — dueling swordmaster

Dueling Stance(lv3, Dance Style +dmg มือเดียว)+Superior Flourish(lv14)+Fencing Maneuvers(lv3, En Garde/Disarm/Lunge ทั้งหมด bonus action)+Parry and Riposte(lv3)

- **Damage**: A(1-2)→**S(3-20**, Dueling Stance+Superior Flourish ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**B(3-20**, Fencing Maneuvers' En Garde/Disarm หลุด floor)
- ไม่มี delta อื่น (Fencing Maneuvers ทั้งหมด bonus action = มิติเดียวกับที่ above อยู่แล้ว)

## Fey Ballerina — fey-blessed dancer

Sublime Start(lv3, 2×speed+auto-save รอบ1)+Swan Song(lv3, bonus action self-heal+adv ตอน Bloodied)+Misty Waltz(lv3, free Misty Step)

- **Survivability**: C(1-2)→**S(3-20**, Sublime Start+Swan Song 2 กลไกป้องกัน/ฟื้นตัวพร้อมกันตั้งแต่ gate แรก)
- ไม่มี delta อื่น (Misty Waltz = mobility ไม่ใช่ Action-Economy ตามระบบเดิมเอง)

## Fire Dancer — pyromaniac blaster

Pyrotechnics(lv3, Dance Style exploding-dice)+Fire Breather(lv3, AoE cone)+Inferno Breath(lv14)+Blinding Flare(lv3, recurring Con-save-or-Blinded)

- **Damage**: A(1-2)→**S(3-20**, Pyrotechnics+Fire Breather AoE nova ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**B(3-20**, Blinding Flare หลุด floor — recurring แต่ severity เดี่ยว)

## Harlequin — juggling trickster

Deft Fling(lv3, ยิงฟรีเมื่อพลาดตี)+Jest(lv3, Dance Style bonus-action Disadvantage-debuff)+Vexing Jest(lv10)

- **Damage**: A(1-2)→**S(3-20**, Deft Fling's guaranteed-2nd-shot-on-miss ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**B(3-20**, Jest หลุด floor — recurring bonus-action debuff)
- ไม่มี delta อื่น (Deft Fling ระบบเดิมเองระบุชัดว่าไม่แย่ง action/bonus-action = ไม่นับ Action-Economy)

## Marionettist — puppet-master controller

Puppet Strings(lv3, Dance Style ฟรีทุกเทิร์น บังคับ reaction-โจมตีเป้าอื่น)+Heartstrings(lv10)+Master of Puppets(lv14, free-cast Dominate ไม่มี save)+Familiar Doll(lv3, free ritual Find Familiar)+Manipulator(lv3, free bonus-action Suggestion)

- **Control**: D(1-2)→A(3-13, Puppet Strings+Heartstrings 2 มิติ chain-control หลุด floor)→**S(14-20**, Master of Puppets = free-cast beyond-cap Dominate — **Control สูงสุดในบรรดา Dancer ทุกตัว** และในบรรดา class ที่ทำมาทั้งหมด)
- **Support**: D(1-2)→**C(3-20**, Heartstrings' indirect ally-protection หลุด floor — narrow)
- **Utility**: D(1-2)→**B(3-20**, Familiar Doll+Manipulator 2 กลไก utility พร้อมกัน)
- ⚠️ Overall สูงสุดในกลุ่ม 14 subclass ตามระบบเดิม (13 คะแนน) — ตรงกับที่ระบบใหม่ให้ delta มากที่สุดด้วย (3 axis)

## Mime — force-illusion performer

Mystical Maul(lv3, weapon dmg→2d6 force คงที่)+Unseen Impact(lv3, recurring Prone/push)+Invisible Wall(lv3, free Wall of Force)

- **Damage**: A(1-2)→**S(3-20**, Mystical Maul's fixed-2d6-force upgrade ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**A(3-20**, Unseen Impact[recurring]+Invisible Wall[free-cast] 2 มิติหลุด floor ตรงสู่ A)
- **Utility**: D(1-2)→**C(3-20**, Mimed Communication+Sly หลุด floor — narrow)

## Shadow Dancer — shadow-clone duelist

Shadowdance(lv3, shadow-clone รับดาเมจแทน)+Shrouded Start(lv3, Invisible รอบ1)+Umbral Escape(lv3, reaction teleport)+Darkvision/Stealth-prof(lv3)

- **Survivability**: C(1-2)→**S(3-20**, Shadowdance+Shrouded Start+Umbral Escape 3 กลไกหลบหลีก/พรางตัวพร้อมกัน — หนาแน่นเหมือน Contortionist)
- **Utility**: D(1-2)→**C(3-20**, Darkvision-ขยาย+Stealth-prof หลุด floor — narrow)

## Steelsinger — armored deflection tank

Deflection(lv3, Dance Style ลดดาเมจ B/P/S ทุกครั้งที่โดนตี)+Improved/Prismatic Deflection(lv10, ขยายทุกธาตุ)+Martial Training(lv3)+Armored Redirection(lv3, reaction redirect-atk-to-self)

- **Survivability**: C(1-2)→**S(3-20**, Deflection escalate จาก B/P/S-only เป็นทุกธาตุที่ lv10 — ครอบคลุมกว้างสุดในบรรดา mitigation-package ทั้งหมดในคลาสนี้)
- **Support**: D(1-2)→**A(3-20**, Armored Redirection หลุด floor ตรงสู่ A — protector-reaction เดี่ยวแต่ reliable/reusable เต็มรูปแบบ)

---

## สรุปเกรดที่ Lv20 (baseline + 14 subclass)

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | S | D | D | A | A | D | A |
| Acrobat | S | D | D | A | A | **C** | A |
| Cheerleader | S | D | **S** | A | A | D | A |
| Contortionist | S | D | D | **S** | A | D | A |
| Courtesan | S | **A** | D | A | A | **C** | A |
| Danseur Macabre | S | D | D | A | A | **B** | A |
| Dramaturge | S | **B** | D | A | A | **A** | A |
| Fencer | S | **B** | D | A | A | D | A |
| Fey Ballerina | S | D | D | **S** | A | D | A |
| Fire Dancer | S | **B** | D | A | A | D | A |
| Harlequin | S | **B** | D | A | A | D | A |
| Marionettist | S | **S** | **C** | A | A | **B** | A |
| Mime | S | **A** | D | A | A | **C** | A |
| Shadow Dancer | S | D | D | **S** | A | **C** | A |
| Steelsinger | S | D | **A** | **S** | A | D | A |

---

## ข้อค้นพบเบื้องต้น

1. **Marionettist ให้ delta มากที่สุดในกลุ่ม (3 axis: Control/Support/Utility) ตรงกับที่ระบบเดิมให้ Overall สูงสุดพอดี (13 คะแนน)** — ยืนยันว่าแม้ methodology จะเข้มกว่าระบบเดิมมาก (ต้อง floor-escape/2-flip จริง) แต่ **ranking สัมพัทธ์ระหว่าง subclass ยังคงสอดคล้องกันเป็นส่วนใหญ่** ไม่ใช่คนละทิศทางไปเลย
2. **Control's floor-escape กระจาย 4 tier เต็ม (C ไม่มี/B×4/A×2/S×1)** — Marionettist's Master of Puppets (free-cast Dominate ไม่มี save) เป็น **Control สูงสุดในบรรดา class ทั้งหมดที่ทำมา** เอาชนะแม้แต่ Cleric's Pestilence/Madness ที่เคยครองแชมป์
3. **Damage early-S (lv3) เกิด 5/14 subclass ผ่าน shortcut "old-system Damage=10"** — เร็วกว่าวิธีอ่าน feature-text ทีละมิติเหมือน Cleric/Craftsman แต่ยังคง consistent เพราะทุกเคสมีกลไก nova/extra-combatant/fixed-die-upgrade ที่ยืนยันจริงจากคำอธิบาย feature
4. **Survivability S เกิด 4 ครั้ง** (Contortionist, Fey Ballerina, Shadow Dancer, Steelsinger) — ทั้งหมดผ่าน pattern "stacking 2-3 กลไกป้องกัน/หลบหลีกพร้อมกันตั้งแต่ lv3" ไม่ใช่ single-mechanism-reinforcement (ต่างจาก Cleric/Craftsman's "same-dimension trap" ที่เจอบ่อย — Dancer's defensive subclass ส่วนใหญ่ออกแบบมาเป็น multi-mechanism stack แต่แรกอยู่แล้ว)
5. **Support ยังคง floor-lock เกือบทั้งหมด (11/14 ไม่มี delta)** — มีแค่ 3 ตัวที่หลุด (Cheerleader→S, Marionettist→C, Steelsinger→A) สะท้อนธีมคลาส "striker/soloist" ที่ signature feature ส่วนใหญ่เล็งตัวเองไม่ใช่ทีม ตรงกับ baseline's finding#1 (glass-cannon duelist บริสุทธิ์ที่สุดในระบบ)
6. **Versatility 0 delta ทุก subclass ต่อเนื่อง** — สะสมกับ Cleric(0/27)+Craftsman(0/11) รวม 25 subclass ติดต่อกันที่ไม่มี Versatility delta เลย นับตั้งแต่ Channeler's Dimensional Magi เป็นเคสสุดท้ายที่เคยขยับได้
