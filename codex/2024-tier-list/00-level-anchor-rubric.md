# Level-Indexed Tier System — Anchor Rubric (2024)

**สถานะ**: 🚧 WIP / อยู่ในขั้นออกแบบ methodology — **ยังไม่ได้เริ่มนำไปใช้กับ Class Baseline หรือ Subclass ตัวจริงตัวใดเลย** ระบบ [00-scorecard-methodology.md](00-scorecard-methodology.md) (คะแนนภาพรวมตัวเดียวครอบคลุม 1-20 เลเวล) ยังเป็นระบบที่ใช้งานจริงอยู่ **ไม่ถูกแตะต้อง** — ไฟล์นี้คือ groundwork สำหรับระบบใหม่ที่จะแยกคะแนนตามช่วงเลเวล ทำคู่ขนานไว้ก่อน

**วันที่เริ่มออกแบบ**: 2026-08-14

---

## เป้าหมาย

ระบบเดิมให้คะแนน subclass เป็นภาพรวมตัวเดียวครอบคลุมทั้ง 1-20 เลเวล (ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ซึ่งไม่ตอบโจทย์กรณีอยากรู้ว่า subclass นี้ "แรงแค่ไหน ณ เลเวลที่กำลังเล่นอยู่จริง" — เป้าหมายของระบบใหม่คือให้ผู้ใช้เลือกเลเวล 1-20 แล้วเห็นคะแนนที่ตรงกับจุดนั้นจริง โดยไม่ต้องประเมินทีละเลเวลจริง 20 รอบ (ซึ่งจะซ้ำซ้อนมหาศาลเพราะ feature ส่วนใหญ่เปลี่ยนที่ milestone level เท่านั้น ไม่ใช่ทุกเลเวล)

## หลักการที่ตกลงกันไว้ (จากบทสนทนาออกแบบ)

1. **Milestone-based ไม่ใช่ full-20 authored** — เขียนคะแนนจริงเฉพาะเลเวลที่มีอะไรเปลี่ยนแปลงจริง เลเวลที่เหลือ carry-forward ค่าจากจุดล่าสุด **แต่ทุกเลเวลต้องมีแถวของตัวเองเสมอ** (แม้จะ carry-forward ก็ต้องระบุชัดว่าพิจารณาแล้ว ไม่ใช่ข้ามไปเฉยๆ)
2. **ห้าม sum คะแนนสะสม (base + subclass บวกตรงๆ)** — จะชนเพดาน 10/10 เร็วเกินไปเพราะพลังในเกมเพิ่มขึ้นทุกเลเวลทุกคลาส ทำให้ทุกอย่างกลายเป็น S ตั้งแต่กลางเกม แยกดีแยกแย่ไม่ออก ต้อง**ตัดสินใหม่ทุก checkpoint แบบเทียบกับเพื่อนร่วมเลเวลเดียวกัน** (ไม่ใช่เทียบกับตัวเองในอดีต)
3. **milestone level ต่างกันได้ตาม axis** — Damage เปลี่ยนที่เลเวล ASI/Extra Attack/cantrip-die (4,5,8,11,12,16,17,19,20) ส่วน Control เปลี่ยนที่เลเวล spell-slot (1,3,5,7,9,11,13,15,17) คนละ cadence กัน ไม่บังคับให้ทุก axis ใช้จุดตัดเดียวกัน
4. **ต้องมี Anchor Rubric กลางก่อน** — จุดอ้างอิง "มาตรฐานเพื่อนร่วมเลเวล" ต้องเขียนไว้ล่วงหน้าเป็นลายลักษณ์อักษร (ไฟล์นี้) ไม่ใช่ให้ผู้ประเมินนึกเอาเองทุกครั้ง เพื่อลดความเสี่ยง calibration เพี้ยนข้ามคลาส/ข้าม session (ระบบเดิมเคยเจอปัญหานี้มาแล้วครั้งหนึ่ง — S tier พุ่ง 30% ก่อนแก้ด้วย point-formula ดู [project_overall_tier_point_rework])
5. **แต่ละ axis อาจต้องมีมิติเทียบมากกว่า 1 ตัวเลข** — ตัวเลขเดียว (DC สำหรับ Control, DPR เฉลี่ยสำหรับ Damage) ไม่พอแยกของเก่ง/แย่ ต้องแตกเป็นหลายมิติ (ดูรายละเอียดแต่ละ axis ด้านล่าง)

## Workflow เต็ม (3 ชั้น)

- **ชั้น 0 (ไฟล์นี้)**: Anchor Rubric — จุดอ้างอิงกลางข้ามคลาส ต่อ axis ต่อเลเวล ทำครั้งเดียวใช้ตลอดทั้งระบบ
- **ชั้น 1 (ยังไม่เริ่ม)**: 30 Class Baseline แบบ level-indexed — เทียบกับ Anchor Rubric แต่ละเลเวล
- **ชั้น 2 (ยังไม่เริ่ม)**: 478 Subclass overlay แบบ level-indexed — เทียบกับ Anchor Rubric เหมือนกัน ไม่ใช่เทียบกับ baseline ของคลาสตัวเองอย่างเดียว

## ความคืบหน้า Anchor Rubric (4/7 axis)

- [x] Damage
- [x] Control
- [x] Support
- [x] Survivability
- [ ] Action Economy
- [ ] Utility
- [ ] Versatility

---

## Damage Anchor

**Sustained Magnitude (DPR)** คำนวณจาก: weapon avg ~5.5/hit (1d10-ish), mod progression +3(lv1-3)→+4(lv4-7, ASI แรก)→+5(lv8-18, ASI ที่สอง)→+6(lv19-20, Epic Boon), cantrip avg ~5/die — **เป็น assumption ปรับได้ ไม่ใช่ตัวเลขทางการ**

5 มิติที่ใช้ประเมิน: **Magnitude** (DPR ยั่งยืน) / **Burst-Peak** (ทุ่ม resource จำกัดสูงสุดได้เท่าไหร่) / **Breadth** (เดี่ยว vs AoE) / **Conditionality** (ต้องมีเงื่อนไขก่อนได้ดาเมจเต็มไหม) / **Resistance-proofing** (ชนิดดาเมจโดนต้านง่ายแค่ไหน)

| Lv | Magnitude (DPR) | Burst/Peak | Breadth | Conditionality | Resistance-proofing |
|---|---|---|---|---|---|
| 1-3 | ~8-9 | ~1x — แทบไม่มี resource สำหรับ nova | เดี่ยว | ไม่มีเงื่อนไข (attack/cantrip ปกติ) | อาวุธ nonmagical โดน resist จาก construct/ooze บางตัวได้; ดาเมจธาตุ (fire/cold) โดนต้านบ่อยกว่า |
| 4 | ~9-10 | ~1x เหมือนเดิม | เดี่ยว | ไม่มี | เหมือนเดิม |
| 5-7 | **~15-19** (Extra Attack / cantrip 2 dice) | **~2x** — rider die ก้อนแรกใช้ได้ (sneak attack/smite แรก) หรือ Action Surge (เฉพาะ Fighter) | เดี่ยว (เว้น caster ที่มี Fireball-tier AoE) | **เริ่มมีเงื่อนไข** — sneak attack ต้อง advantage/ally ประชิด, smite ต้องตีติดก่อนถึงจ่ายได้ | อาวุธเริ่มเป็น magical (หลบ nonmagical-resist ส่วนใหญ่) |
| 8-10 | ~16-21 | ~2x คงเดิม (resource pool ใหญ่ขึ้นแต่สัดส่วน burst เท่าเดิม) | ตามคลาส | เงื่อนไขเดิม | เหมือนเดิม |
| 11-16 | ~21-22 (cantrip 3 dice ดันคาสเตอร์ไล่ทันมาร์เชียล) | **~2.5x** — resource pool ใหญ่พอ dump ซ้ำได้หลายรอบ/แรงขึ้น | caster เริ่มมี AoE ระดับ6+ กว้างขึ้น | เงื่อนไขเดิม แต่บาง subclass ทำให้ trigger ง่ายขึ้น | caster เลือกดาเมจ psychic/force ได้แล้ว (หลบ resist แทบทุกกรณี) |
| 17-20 | ~21(มาร์เชียล) / ~27-28(caster) — **caster แซงหน้า** | **~3x+** — nova เต็มรูปแบบ (Action Surge ซ้อน smite, หรือ slot สูงสุด all-in) | caster กว้างสุด (AoE ระดับ9) | เงื่อนไขเดิม | force/psychic แทบไม่มีอะไรต้านได้เลย ณ จุดนี้ |

**ข้อค้นพบ**: จุดเปลี่ยนของ Damage ผูกกับ ASI(4,8,12,16,19) + Extra Attack(5) + cantrip die bump(5,11,17) — คนละ cadence กับ Control — คาสเตอร์ไล่ทันและแซงมาร์เชียลสาย sustained damage ช่วงปลายเกม (ตรงกับเมต้าจริงที่ cantrip build ปลายเกมแรงมาก) ยืนยัน sanity-check ผ่าน

⚠️ **Fighter เป็น outlier**: Extra Attack ×3 (lv11) และ ×4 (lv20) ทำให้ Magnitude/Burst สูงกว่าตารางนี้อีกชั้น — **ไม่นับเป็นมาตรฐานกลาง** แต่เป็นตัวอย่างที่ควรได้คะแนนเหนือมาตรฐาน (A/S)

---

## Control Anchor

**Severity scale** (ไม้บรรทัดกลางของ condition):

| Tier | ตัวอย่าง | ผล |
|---|---|---|
| 4 (สูงสุด) | Stunned, Paralyzed, Incapacitated, Unconscious | ทำอะไรแทบไม่ได้เลย |
| 3 | Restrained, Banished ระยะสั้น, Charmed (จำกัดบริบท) | จำกัดหนักมาก แต่ยังต้านได้บ้าง |
| 2 | Prone, Slowed, Grappled | จำกัดปานกลาง |
| 1 | debuff เล็กๆ | รบกวนเล็กน้อย |

5 มิติที่ใช้ประเมิน: **Severity** / **Breadth** (กี่เป้าหมาย) / **Frequency** (กี่ครั้ง/วัน) / **Stickiness** (หลุดง่ายแค่ไหน — save ทุกเทิร์น / save ครั้งเดียวคงอยู่ / ไม่มี save เลย) / **LR-bypass** (ใช้ mechanism ที่ Legendary Resistance ต้านไม่ได้หรือเปล่า — สำคัญเฉพาะ lv15+ ที่เริ่มเจอบอสมี Legendary Resistance บ่อย)

ตัวเลขทั้งหมดยืนยันจาก spell text จริงในไฟล์ `src/data/5etools/official/spells/spells-xphb.json` (2024/XPHB) ไม่ใช่ความจำ:

| Lv | Spell อ้างอิง (slot) | Severity | Breadth | Frequency | Stickiness | LR-bypass |
|---|---|---|---|---|---|---|
| 1-2 | Sleep (slot1) — 2024 เปลี่ยนมาใช้ WIS save (ต่างจาก 2014 ที่ใช้ HP-pool) | Tier 2 (Incap→Unconscious) | หลายตัวอ่อนๆ ใน 5ft radius | ~3-4/วัน | **ต่ำ** — save รอบถัดไปอีกที + หลุดถ้าโดนดาเมจ | ไม่ (มี save) |
| 3-4 | Hold Person (slot2) | **Tier 4** (Paralyzed) | 1 (humanoid เท่านั้น) | ~3-4/วัน | **ต่ำ** — save ทุกจบเทิร์นเป้าหมาย หลุดเร็ว | ไม่ |
| 5-6 | Hypnotic Pattern (slot3) | Tier 4 (Charmed+Incap+Speed0) | **กว้าง** — ~10 ตัวใน cube 30ft | ~2-3/วัน | **สูง** — ไม่มี repeat save เลย หลุดแค่โดนดาเมจ/ถูกเขย่า | ไม่ (save แยกทีละตัว) |
| 7-8 | Banishment (slot4) | Tier 4 (Incap เต็ม duration) | 1-2 | ~2/วัน | **สูง** — ไม่มี repeat save จนกว่า concentration จะขาด | ไม่ |
| 9-10 | Hold Monster (slot5) | Tier 4 (Paralyzed, ทุกชนิด) | 1 | ~2/วัน | **ต่ำ** — save ทุกเทิร์นเหมือน Hold Person (⚠️ slot สูงขึ้นไม่ได้แปลว่า sticky ขึ้นเสมอ) | ไม่ |
| 11-12 | Mass Suggestion (slot6) | Tier 3 (Charmed) | **กว้างมาก** — สูงสุด 12 ตัว | ~1-2/วัน | **สูง** — หลุดแค่โดนดาเมจเท่านั้น | ไม่ |
| 13-14 | *(ไม่มี condition-lock เด่นที่ slot7 — control เปลี่ยนรูปเป็น battlefield control เช่น Reverse Gravity)* | ผสม | กว้าง (AoE) | ~1/วัน | แล้วแต่ spell | ไม่ |
| 15-16 | **Power Word Stun** (slot8) | Tier 4 (Stunned ถ้า HP≤150) | 1 | ~1/วัน | ต่ำ (หลุดด้วย CON save ทุกเทิร์นหลังติด) | **✅ ใช่ — ไม่มี save ตอนติดเลย** |
| | *(ทางเลือก)* Dominate Monster (slot8) | Tier 3 (Charmed เต็มรูปแบบ) | 1 | ~1/วัน | **สูง** — save แค่ตอนโดนดาเมจเท่านั้น | ไม่ |
| 17-20 | **Power Word Kill** (slot9) | สูงสุด (ตายทันทีถ้า HP≤100) | 1 | ~1/วัน | N/A (จบเกมทันที) | **✅ ใช่ — ไม่มี save เลย** |

**ข้อค้นพบ**:
1. Severity แตะ Tier 4 เร็ว (lv3) แต่ stickiness ไม่ได้ตามมาด้วยเสมอ (Hold Person lv3 และ Hold Monster lv9 ทั้งคู่ save-ทุกเทิร์นเหมือนกัน ห่างกัน 6 เลเวล) — slot level สูงขึ้นไม่การันตี stickiness เพิ่ม
2. lv5 (Hypnotic Pattern) คือจุดที่ severity+breadth+stickiness มาบรรจบกันครั้งแรกจริงๆ ไม่ใช่ lv3
3. lv15 คือจุดที่ LR-bypass เกิดขึ้นครั้งแรก เป็น trade-off ชัดเจนกับ Dominate Monster (sticky-แต่โดน LR ต้าน vs LR-proof-แต่หลุดง่ายกว่า)
4. ⚠️ Control **ไม่มีมาตรฐานกลางที่ยุติธรรมข้ามทุกคลาส** เพราะเกมออกแบบให้ full caster ผูกขาด CC เกือบทั้งหมด — anchor นี้อิง full-caster เป็นหลัก มาร์เชียลล้วนได้คะแนนต่ำกว่าตามจริงโดยไม่ต้องหา "มาตรฐานคู่ขนาน" มาช่วย

---

## Support Anchor

Support มีสองสาย mixed กัน ที่มูลค่าจริงต่างกันมาก: **ฮีล** (แก้หลังเกิดเรื่อง) กับ **บัฟ** (กันก่อนเกิดเรื่อง) — 5 มิติที่ใช้ประเมิน: **Magnitude** (ค่าที่ได้ต่อครั้ง) / **Breadth** (เดี่ยว vs ทั้งปาร์ตี้) / **Action Economy** (bonus action vs full action vs free ผ่าน aura) / **Proactive vs Reactive** (บัฟก่อนเกิดเรื่องมักคุ้มกว่าฮีลหลังเกิดเรื่อง เพราะฮีลแค่ลบล้างดาเมจที่ทำไปแล้ว ไม่เพิ่มมูลค่าใหม่ให้ encounter) / **Frequency/Sustainability** (จำกัดครั้ง/วัน vs aura ต่อเนื่อง vs downtime-only)

ยืนยันจาก spell text จริงในไฟล์ `spells-xphb.json`:

| Lv | Spell อ้างอิง (slot) | Magnitude | Breadth | Action Economy | Proactive/Reactive | Frequency |
|---|---|---|---|---|---|---|
| 1-2 | Bless / Cure Wounds / **Healing Word** (slot1) | ฮีล ~2d8+mod (~13) เดี่ยว หรือ +1d4 atk/save 3 คน | สูงสุด 3 (Bless) / เดี่ยว (ฮีล) | **ผสม** — Healing Word เป็น **bonus action** (ฮีลได้โดยยังโจมตีได้ปกติ) ส่วน Cure Wounds/Bless เป็น full action | ทั้งสองสายมีตั้งแต่ lv1 | ~3-4/วัน |
| 3-4 | Aid (slot2) | +5 max/current HP ×3 คน — อยู่ทั้งวัน ไม่ต้อง cast ซ้ำ | 3 คน | full action แต่ cast ครั้งเดียวคุ้มทั้งวัน | **Proactive** | ~3-4/วัน (ผลอยู่ยาว) |
| 5-8 | Beacon of Hope / Haste / Death Ward / Freedom of Movement (slot3-4) | **สูงมาก** — Haste ให้ action เพิ่มทั้งตัว, Death Ward กัน HP=0 ครั้งนึงฟรี, Freedom of Movement กัน paralyze/restrain ทั้งดื้อ | ผสม (Beacon ไม่จำกัดจำนวน, ที่เหลือเดี่ยว) | full action แต่ผลอยู่ตลอด duration | **Proactive ล้วน** — Magnitude แซงฮีลไปไกล | ~2-3/วัน |
| 9-10 | Mass Cure Wounds / Greater Restoration (slot5) | ~27/คน ×6 คน (~162 รวม) หรือแก้ debuff หนัก (curse/stat drain/exhaustion) | กว้าง (6 คน) | full action | **Reactive** กลับมาโดดเด่นด้วย breadth | ~2/วัน |
| 11-12 | Heal (slot6) | **70 HP คงที่** + แก้ blind/deaf/poison | เดี่ยว | full action | Reactive | ~1-2/วัน |
| 13-14 | Regenerate (slot7) | 4d8+15 + ฟื้น 1HP/เทิร์นต่อเนื่อง | เดี่ยว | **downtime-only** (cast 1 นาที ใช้กลางคอมแบตไม่ได้) | Reactive | ~1/วัน (นอกคอมแบต) |
| 15-16 | **Holy Aura** (slot8) | advantage ทุก save + disadvantage ศัตรูโจมตี + blind fiend/undead ที่ตี | **ทั้งปาร์ตี้** (ไม่จำกัดจำนวน) | full action, ผลอยู่ตลอด duration | **Proactive สูงสุด** | ~1/วัน |
| 17-20 | Mass Heal / Power Word Heal (slot9) | สูงสุด 700 HP แบ่งได้ทุกคน หรือฮีลเต็ม 100% ทันทีแบบไม่มีเงื่อนไข | เลือกได้ (กว้างสุด vs การันตีเดี่ยว) | full action | Reactive | ~1/วัน |

**ข้อค้นพบ**:
1. **รูปแบบ zigzag proactive/reactive**: lv1-4 ผสม → lv5-8 proactive ครองเวที (มูลค่าเกิน slot level ตัวเองมาก) → lv9-14 reactive กลับมา (breadth/magnitude ไล่ทัน) → lv15-16 proactive สูงสุด (Holy Aura) → lv17-20 reactive ปิดท้ายระดับ "แก้ทุกอย่างในคลิกเดียว" — ยืนยันความเชื่อเมต้า 5e ว่า proactive buff ให้มูลค่าเกิน slot level เสมอ ส่วน reactive heal โตแบบเส้นตรงตาม slot level เท่านั้น
2. **Support hard-counter Control ได้โดยตรง** (Freedom of Movement lv7 กัน paralyze/restrain ทั้งหมด, Death Ward กันตายจาก HP=0) — จุดเชื่อมข้าม axis ที่ไม่มีใน Damage/Control เดี่ยวๆ

---

## Survivability Anchor

**ทำไมไม่ใช้ AC เป็นตัวตัดสินหลัก**: AC ส่วนใหญ่มาจาก "เกราะ+DEX" ซึ่งเป็นตัวเลือกอุปกรณ์ที่ผู้เล่นทุกคลาสไล่ตามได้ใกล้เคียงกัน (ไม่ใช่สิ่งที่ class/subclass feature ควบคุมเป็นหลัก) — ใช้เป็นตัวแยกดี/แย่ข้ามคลาสไม่ยุติธรรมเท่า HP pool (ผูกกับ hit die ที่ fix ตาม class จริง) เหมือนที่ Control axis เจอปัญหาเดียวกันกับ DC — เพราะงั้น Anchor นี้ตัด AC ออก ใช้ **HP pool + mitigation ที่มาจาก feature จริง** แทน

5 มิติที่ใช้ประเมิน: **Effective HP** (HP pool จาก hit die, d8 เป็นค่ากลาง — Sorcerer/Wizard d6 และ Fighter/Paladin/Ranger d10 / Barbarian d12 คือ deviation ที่ไปตัดสินระดับ Class Baseline) / **Mitigation** (resistance/immunity ต่อดาเมจ, temp HP, ลดดาเมจที่โดนหลังโดนตีแล้ว) / **Save Reliability** (จำนวน save proficiency + bonus ที่ให้ตัวเอง/ปาร์ตี้ + reroll/auto-fix เมื่อ save พลาด) / **Debuff/Condition Resistance** (ต้าน/หลุด condition ที่ไม่ใช่ดาเมจโดยตรง เช่น Paralyzed, Frightened, Charmed) / **Death Prevention** (self-heal ในคอมแบต, cheat-death, กันตกเลข 0 ซ้ำ)

ยืนยันจาก `classFeature` จริงในไฟล์ `src/data/5etools/official/class/class-*.json` (XPHB):

| Lv | Feature อ้างอิง (คลาส) | Effective HP | Mitigation | Save Reliability | Debuff/Condition Resistance | Death Prevention |
|---|---|---|---|---|---|---|
| 1-4 | Rage (Barbarian, lv1) / Second Wind (Fighter, lv1) | ~10-30 (d8 peer-standard, CON+2) | **ปกติ = 0** ที่ peer-standard — Barbarian Rage (resist B/P/S dmg) เป็น outlier ตั้งแต่ lv1 | คงที่ 2 save prof จาก lv1 (ไม่เปลี่ยนตลอดอาชีพ เว้นมี feature เสริม) | ไม่มีที่ peer-standard | ไม่มีที่ peer-standard — Second Wind (1d10+lv, bonus action) เป็น outlier |
| 5-8 | Uncanny Dodge (Rogue, lv5) / Evasion (Rogue lv7 / Monk lv7) / Aura of Protection (Paladin, lv6) | ~38-60 (CON mod ขยับ +3 หลัง ASI แรก) | **จุดเปลี่ยนแรก** — Uncanny Dodge (reaction ลดดาเมจครึ่งนึง 1 ครั้ง/เทิร์น) กลายเป็นมาตรฐานใหม่ที่พบได้ | ยังคงที่ 2 prof เว้น Paladin (Aura of Protection: +CHA mod ให้ save ทุกตัว ตัวเอง+ปาร์ตี้ในระยะ 10ft) — outlier แรงมาก | Evasion (lv7): DEX-save AoE พลาด=โดนครึ่ง, ผ่าน=ไม่โดนเลย — กันดาเมจได้ไม่ใช่กัน condition ตรงๆ แต่ผลลัพธ์เทียบเท่า | ไม่มีเพิ่มจาก peer-standard |
| 9-12 | Indomitable (Fighter, lv9) / Relentless Rage (Barbarian, lv11) | ~68-90 | Indomitable (reroll save พลาดได้) เริ่มนับเป็น mitigation ทางอ้อม | เหมือนเดิม (2 prof + Paladin aura) | ยังไม่มีเพิ่ม | **จุดเปลี่ยนสำคัญ** — Relentless Rage (lv11, Barbarian): ตก 0 HP ระหว่าง Rage → CON save DC10 ไม่ตาย ฟื้นเป็น 2×level HP แทน (คือ cheat-death จริงจังตัวแรกในตาราง) |
| 13-16 | Disciplined Survivor (Monk, lv14) | ~98-120 | เหมือนเดิม | **จุดเปลี่ยนใหญ่สุดของแกนนี้** — Disciplined Survivor (lv14, Monk): proficiency **ทุก saving throw** + reroll ด้วย Focus Point เมื่อพลาด — ทำให้ save reliability กระโดดจาก 2 prof ไปเป็นครบทุกตัวในก้าวเดียว | — | Indomitable ใช้ได้ 2 ครั้ง (Fighter, lv13) |
| 17-20 | Superior Defense (Monk, lv18) | ~129-155 | **เพดานของแกนนี้** — Superior Defense (lv18, Monk): จ่าย Focus Point resist **ทุกชนิดดาเมจยกเว้น force** นาน 1 นาที | Indomitable ใช้ได้ 3 ครั้ง (Fighter, lv17) | เหมือนเดิม | เหมือนเดิม |

**ข้อค้นพบ**:
1. Survivability **ไม่มีมาตรฐานกลางที่ยุติธรรมข้ามทุกคลาสเหมือนกัน** กับ Control — full caster ส่วนใหญ่ (Wizard, Sorcerer นอกเหนือจากใช้สเปลล์ป้องกันตัวเอง) แทบไม่มี structural mitigation/death-prevention feature จาก base class เลย ฟีเจอร์แกนนี้กระจุกอยู่ที่ Barbarian/Rogue/Monk/Fighter/Paladin เท่านั้น
2. **Save Reliability เป็นเส้นราบยาว ไม่ใช่กราฟไต่ขึ้นแบบ Damage** — ค้าง 2 prof คงที่แทบทั้งอาชีพ มีแค่ 2 จุดกระโดดใหญ่คือ lv6 (Paladin aura) และ lv14 (Monk all-saves) ซึ่งทั้งคู่ผูกกับคลาสเฉพาะ ไม่ใช่ peer-standard สากล
3. lv14 (Disciplined Survivor: prof ทุก save) และ lv18 (Superior Defense: resist ทุกดาเมจยกเว้น force) คือ 2 ฟีเจอร์ defensive ที่แรงที่สุดในเกม ทั้งคู่เป็นของ Monk — ควรถูกนับเป็นตัวอย่างเพดานคะแนน (คล้าย Fighter ใน Damage axis) ไม่ใช่มาตรฐานกลาง
4. Mitigation กับ Death Prevention เชื่อมกับ **resource เฉพาะคลาส** เสมอ (Rage uses, Focus Points, Indomitable uses/Long Rest) — ต่างจาก Support ที่ผูกกับ spell slot สากล ทำให้การเทียบข้ามคลาสต้องดู "ทำได้กี่ครั้ง/วัน" ควบคู่ไปกับ "แรงแค่ไหน" เสมอ

---

## Next Steps

1. ทำ Anchor Rubric ให้ครบ 3 axis ที่เหลือ (Action Economy, Utility, Versatility) — แต่ละ axis ต้องหา "ตัวตัดสิน" ของตัวเอง (เหมือน DPR สำหรับ Damage, severity/stickiness สำหรับ Control, proactive/reactive สำหรับ Support, HP-pool+mitigation สำหรับ Survivability) ไม่ใช่ copy pattern เดิมตรงๆ
2. เริ่มชั้น 1 (30 Class Baseline level-indexed) หลัง Anchor Rubric ครบ 7 axis
3. เริ่มชั้น 2 (478 Subclass overlay level-indexed) หลังชั้น 1 เสร็จ
