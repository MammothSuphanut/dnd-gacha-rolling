# Class: Novice

> ทุกตำนานเริ่มต้นจากศูนย์ — นักผจญภัยมือใหม่ที่ยังไม่มีสายอาชีพ ค่อยๆ ไต่บันไดเลื่อนขั้น "เปลี่ยนอาชีพ" (Job Change) ไปเรื่อยๆ ตามเส้นทางที่เลือก จนกลายเป็นยอดฝีมือระดับตำนานในสายของตน

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นฉบับร่างจากการสัมภาษณ์เบื้องต้น ยังไม่ผ่าน balance check เต็มรูปแบบ (checklist + validation ตาม `subclass-creation-rules.md`) และตัวเลขหลายจุดยังเป็นค่าประมาณรอ feedback จากผู้ใช้ก่อนสรุปจริง เนื้อหา Job Paths ทั้งหมด (Swordsman/Mage/Archer/Thief/Acolyte/Merchant/Super Novice) ถูกลบออกไปแล้วเพื่อออกแบบใหม่ตามจังหวะเลเวลล่าสุด — เหลือแค่ chassis + progression skeleton + ตารางอ้างอิง

## Designer's Note

แรงบันดาลใจจากระบบเลื่อนขั้นอาชีพของ Ragnarok Online / ROX: Novice → First Class → Second Class → Transcendent Second Class → Third Class → Fourth Class ปัญหาที่ต้องแก้คือ D&D 2024 ปกติให้เลือก subclass "ครั้งเดียวจบ" ตอนต้นเกม แต่ RO ให้ความรู้สึก "อัพคลาส" ซ้ำหลายรอบตลอดเกม — ดังนั้น class นี้จึงออกแบบให้ subclass (Job) มี milestone ใหญ่ 4 จุด (เลเวล 3/7/11/15) โดย**ข้าม First Class (Swordsman/Mage/Archer/Thief/Acolyte/Merchant เอง) ไปเลย** เลเวล 3 เลือกตรงเป็น Second Class ทันที แมปตรงกับ 4 tier ที่เหลือของ RO (Second Class → Transcendent Second Class → Third Class → Fourth Class) แทนที่จะได้ features มาเรื่อยๆ แบบ subclass ปกติ โดยแต่ละจุดคือ "เลื่อนขั้น" จริงที่เปลี่ยนตัวตนการเล่นอย่างชัดเจน ไม่ใช่แค่บวกเลข — จังหวะนี้เลือกเพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย

รวมทั้ง **6 สายอาชีพหลักของ RO + Super Novice** — วัตถุดิบ skill reference ของแต่ละสาย (6 สายหลัก) แยกออกเป็นไฟล์ต่อสายแล้วตาม convention ปกติของโปรเจกต์ (ดูลิงก์ในหัวข้อ "ROX Skill Reference" ด้านล่าง) แต่ละสายอ้างอิง job tree + skill จริงจาก ROX (Ragnarok X: Next Generation) และตารางอ้างอิงทางการที่ผู้ใช้ให้มา (ดูหัวข้อ "ROX Job Tree Reference" ด้านล่าง)

**6 สายหลัก** (ต่อยอดจาก Swordsman/Mage/Archer/Thief/Acolyte/Merchant): เลือกได้ตอนเลเวล 3 เหมือนกันหมด **ข้าม First Class ไปเลย** ชื่อ tier ทุกสายอ้างอิงตามตารางทางการ 4 tier ที่เหลือ (Second Class เลเวล 3 → Transcendent Second Class เลเวล 7 → Third Class เลเวล 11 → Fourth Class เลเวล 15)

**Super Novice** เป็นสายพิเศษที่ 7 — ไม่ผ่าน job-change tree ปกติ (ในเกมจริง Super Novice คือทางเลือกทดแทน 1st job ที่ยึดติดกับความเป็น "Novice" ตลอดไป ไม่มี 2nd/3rd job ต่อ) จึงต้องออกแบบให้เป็น "jack of all trades" ที่หยิบยืม feature จากสายอื่นแทนการมี fork ของตัวเอง

**ไม่รวม**: Gunslinger, Ninja, Taekwon, Summoner (Doram) — ตัดออกตามคำขอให้เก็บเฉพาะ 6 สายหลัก (+ Super Novice)

- [ROX Job Guide (Bluestacks)](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-job-guide-en.html)
- [ROX Official Class List](https://www.ragnarokx.com/main/class_list?job=1_3)
- [ROXPEDIA Job Database](https://roxpedia.com/job-database)
- [Lord Knight Guide](http://ragnamobileguide.com/lord-knight-guide-agi-crit-bash-pierce-build/)
- [Ragnarok Mobile Mage/Wizard/High Wizard Guide](https://99porings.com/mobile.php?guide=ragnarok-mobile-mage-wizard-high-wizard-guide)
- [ROX Archer/Sniper Build Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-archer-sniper-build-guide-en.html)
- [ROX Assassin Class Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-assassin-class-guide-en.html)
- [RO Mobile Acolyte/Priest/High Priest Guide](https://tatarom.home.blog/2020/08/06/ro-mobile-acolyte-priest-high-priest/)
- [RO Mobile Merchant/Blacksmith/Whitesmith/Mechanic Guide](https://tatarom.home.blog/2020/03/21/ro-mobile-merchant-blacksmith-whitesmith-mechanic/)
- [ROX Alchemist Class Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-alchemist-guide-en.html)
- [Super Novice Guide (StrategyWiki)](https://strategywiki.org/wiki/Ragnarok_Online/Supernovice), [Super Novice (iRO Wiki via RagnaPlace)](https://ragnaplace.com/en/wiki/irowiki/Super_Novice)
- ตารางอ้างอิง First/Second/Transcendent Second/Third/Fourth Class — ให้โดยผู้ใช้โดยตรง (ภาพตารางทางการ ไม่ใช่จากเว็บค้นหา)

## Chassis

| หัวข้อ | ค่า |
|---|---|
| Hit Die | d8 |
| Saving Throws | Dexterity, Constitution |
| Armor/Weapon Proficiency | เกราะเบา, อาวุธประเภท Simple (จะได้เพิ่มเติมตาม Job ที่เลือกตอนเลเวล 3 — ดู Job Paths) |
| Skill Proficiency | เลือก 2 จาก: Acrobatics, Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Persuasion, Stealth, Survival |
| Tool Proficiency | เลือก 1 จาก artisan's tools หรือ gaming set ใดก็ได้ |
| Primary Ability | กำหนดโดย Job (subclass) ที่เลือกตอนเลเวล 3 |

**อุปกรณ์เริ่มต้น**: อาวุธ simple 1 ชิ้น, เกราะหนัง, explorer's pack, และเงินเริ่มต้นตามมาตรฐาน (5e 2024)

**กติกากลางเรื่อง Save DC**: ทุกความสามารถในเอกสารนี้ที่ต้องใช้ saving throw DC ใช้สูตรเดียวกันเสมอ (เว้นแต่ระบุไว้เป็นอย่างอื่น): **DC = 8 + Proficiency Bonus + primary ability modifier ของ Job ที่เลือก**

## Level Progression

| เลเวล | Proficiency Bonus | Mana | Feature |
|---|---|---|---|
| 1 | +2 | 2 | เลือก Track ใหม่ (Novice-Base) |
| 2 | +2 | 4 | เลือก Track ใหม่ (Novice-Base) |
| 3 | +2 | 6 | **Job Change: Second Class** + เลือก Track ใหม่ (Job Path) |
| 4 | +2 | 8 | Ability Score Improvement |
| 5 | +3 | 10 | อัพเกรด Track |
| 6 | +3 | 12 | อัพเกรด Track |
| 7 | +3 | 14 | **Job Change: Transcendent Second Class** + เลือก Track ใหม่ (Job Path) |
| 8 | +3 | 16 | Ability Score Improvement |
| 9 | +4 | 18 | อัพเกรด Track |
| 10 | +4 | 20 | อัพเกรด Track |
| 11 | +4 | 22 | **Job Change: Third Class** + เลือก Track ใหม่ (Job Path) |
| 12 | +4 | 24 | Ability Score Improvement |
| 13 | +5 | 26 | อัพเกรด Track |
| 14 | +5 | 28 | อัพเกรด Track |
| 15 | +5 | 30 | **Job Change: Fourth Class** + เลือก Track ใหม่ (Job Path) |
| 16 | +5 | 32 | Ability Score Improvement |
| 17 | +6 | 34 | อัพเกรด Track |
| 18 | +6 | 36 | อัพเกรด Track |
| 19 | +6 | 38 | Ability Score Improvement |
| 20 | +6 | 40 | - |

> ดูรายละเอียดเต็มของ "เลือก Track ใหม่" / "อัพเกรด Track" ที่หัวข้อ [ระบบการเลือก/อัพเกรด Track](#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) ด้านล่าง — สรุปสั้นๆ: เลือก Track ใหม่ (Rank 1) ที่ level 1/2 (จาก Novice-Base) และ 3/7/11/15 (จาก Job Path ที่เลือก), อัพเกรด Track ที่ถืออยู่ (+1 Rank ไม่เกิน Rank 4) ที่ level 5/6/9/10/13/14/17/18 — **ไม่มี Respec**

**หมายเหตุ Mana** 🚧 (ยังไม่ final): pool = **เลเวล × 2** (universal ทุก Job, ไม่มี HP-swap) — เปลี่ยนจากสูตรเดิม (สะสม Proficiency Bonus) เป็นสูตรเชิงเส้นตรงไปตรงมา เข้าใจง่าย ไล่จาก 2 (lv 1) ถึง 40 (lv 20) ใช้จ่ายกับ Active Mastery Branch ที่ scale ได้ (เช่น Fire Bolt) — รายละเอียดเต็มเรื่อง cost/recovery ดูหัวข้อ [กฎการใช้ Mana](#กฎการใช้-mana-mana-usage-rules) ด้านล่าง (ล็อกไว้แล้วจากการทดลองกับ Swordsman/Knight tier — ใช้อ้างอิงได้เลยไม่ต้องคำนวณใหม่ทุกสาย)

### กฎการใช้ Mana (Mana Usage Rules)

> กฎกลางที่ใช้ได้กับทุกสาย/ทุก tier — ล็อกไว้แล้วหลังทดลองตั้งราคาจริงกับ Swordsman/Knight tier (ดู [Knight.md](Knight.md#dd-feature-draft--swordsman-1st-class)) ครั้งต่อไปที่แปลงสกิลสายอื่น ให้ใช้ cost band + sanity check ด้านล่างนี้แทนการคำนวณ balance ใหม่ตั้งแต่ต้น

**Pool & Recovery**
- Pool = เลเวล × 2 (universal ทุก Job)
- Long Rest: คืนเต็ม pool เสมอ
- Short Rest: คืน mana เท่ากับ **Proficiency Bonus ปัจจุบัน** (flat formula เดียว ไม่ต้องออกแบบค่าคืนแยกรายสกิล)
- ห้ามออกแบบสกิลที่คืน mana เต็มตอน Short Rest — จะกลายเป็น pattern แบบ Warlock ขัดกับ identity แบบ Long Rest ที่ตั้งใจไว้ (เทียบ Wizard) — อนุญาตให้มี feature เฉพาะจุดที่คืน mana เพิ่มได้เป็นชั้นเสริม (เช่น Fatal Blow คืน 1 mana ตอน proc) แต่ต้องผูกกับเงื่อนไขในเกม (โจมตีสำเร็จ/ฆ่า) ไม่ใช่ auto ทุก short rest

**Cost Bands ตามประเภทท่า** (baseline — ปรับได้ตามความแรงจริงของแต่ละท่า ไม่ใช่กฎตายตัว 100%)

| ประเภทท่า | Cost แนะนำ | เหตุผล |
|---|---|---|
| ท่าโจมตีหลัก/สัญลักษณ์ประจำ Job (แทน auto-attack) | **0** | ต้องมีอย่างน้อย 1 ท่าแบบนี้เสมอต่อ Job — กันไม่ให้ตัวละครทำอะไรไม่ได้เลยเมื่อ mana หมด (ไม่ควรอ่อนแอกว่า Fighter เปล่าๆ) |
| Bonus Action / Reaction ระยะสั้น (จบเทิร์นนี้-เทิร์นหน้า) หรือ rider เสริมท่าฟรีด้านบน | **1** (floor ต่ำสุดตามกติกา "ทุกท่าที่ใช้ต้องจ่ายอย่างน้อย 1 mana") | บัฟตัวเอง/ดีบัฟเดี่ยว/ดีเฟนส์ชั่วคราว/เอฟเฟกต์เสริม เช่น สตันต่อ Bash |
| Action หลักที่เป็น AoE หรือเอฟเฟกต์ที่อยู่ยาว 1 นาทีขึ้นไป | **2** | แรงกว่าปกติทั้งดาเมจกว้างขึ้นและ/หรือระยะเวลานานขึ้น |
| Capstone/signature ของ tier สูง (Transcendent ขึ้นไป) | **3+** | สงวนไว้ ยังไม่เคยใช้จริงในทัวร์ Swordsman/Knight |
| Passive (trigger อัตโนมัติ ไม่ใช่ตัวเลือกที่กดใช้กลางคัน) | **0 เสมอ ไม่มีข้อยกเว้น** | ทริกเกอร์จากจบ short rest/โจมตีสำเร็จ ไม่ใช่ action economy ของผู้เล่น — เก็บ mana ซ้ำจะเหมือนหักภาษีซ้อนสอง |

**Upcast Cap**: ท่าที่ให้ upcast ได้ (จ่าย mana เพิ่มระหว่างใช้เพื่อเพิ่มดาเมจ/เอฟเฟกต์ เช่น Magnum Break จ่ายเพิ่ม 1 mana ต่อ +1d6) จำนวนครั้งที่ upcast ได้ต่อการใช้ 1 ครั้ง **cap ไว้ที่ Proficiency Bonus ปัจจุบัน** (เช่น level 3 Prof +2 → upcast ได้สูงสุด 2 ครั้ง, level 7 Prof +3 → สูงสุด 3 ครั้ง) — กันไม่ให้ mana pool ที่โตเร็วกว่าดาเมจ base (pool เพิ่มเชิงเส้นตามเลเวล แต่ damage cap ควรโตช้ากว่า) ถูกอัดลงท่าเดียวจนดาเมจพุ่งเกินตัว

**Day Math Sanity Check** (เช็คทุกครั้งก่อนล็อกราคาใหม่ของสายอื่น)

Total mana ต่อวัน ≈ pool (Long Rest) + 2 × Proficiency Bonus (สมมติ short rest มาตรฐาน 2 ครั้ง/วันตาม 5e) หารด้วย avg cost ของท่า active ที่ตั้งใจไว้ ควรได้ **6-10 ครั้ง/วัน** (ใกล้เคียงจำนวน encounter ที่ 5e คาดหวังต่อวัน) — ต่ำกว่านี้มาก = แพงไป, สูงกว่า ~15 = ถูกไปจนไม่รู้สึกเป็น resource

ตาราง reference สำเร็จรูปต่อช่วงเลเวล (คำนวณไว้แล้ว ใช้แทนได้เลย):

| เลเวล | Pool | Prof Bonus | Total Mana/วัน (pool + 2×PB) | avg cost เป้าหมาย (ที่ 6-10 ครั้ง/วัน) |
|---|---|---|---|---|
| 1-2 | 2-4 | +2 | 6-8 | ~1 |
| 3-4 | 6-8 | +2 | 10-12 | 1-2 |
| 5-8 | 10-16 | +3 | 16-22 | 2-3 |
| 9-12 | 18-24 | +4 | 26-32 | 3-5 |
| 13-16 | 26-32 | +5 | 36-42 | 4-6 |
| 17-20 | 34-40 | +6 | 46-52 | 5-8 |

Swordsman/Knight tier ปัจจุบัน (level 3) ใช้ avg cost ~1.2-1.5 ตรงตามช่วงเป้าหมายพอดี ไม่ต้องปรับเพิ่ม — tier ที่แปลงต่อไปในเลเวลสูงขึ้น (Transcendent 7, Third 11, Fourth 15) ให้ตั้ง cost แพงขึ้นตามตารางนี้ได้เลยตามธรรมชาติ ไม่ต้องมาถกใหม่ทุกครั้ง

**หมายเหตุจังหวะ**: เลเวล 3/7/11/15 คือ "Job Change" milestone ใหญ่ 4 จุด **ข้าม First Class เป็น mechanical step ไปเลย** แมปตรงกับ 4 tier ที่เหลือของ RO (Second Class → Transcendent Second Class → Third Class → Fourth Class — ดูตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านล่าง) เลือกจังหวะนี้เพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย — เลเวลที่เหลือ (1/2/5/6/9/10/13/14/17/18) ตอนนี้มีหน้าที่ครบแล้วทั้งหมดในฐานะจุด **เลือก/อัพเกรด Track** (ดูหัวข้อ [ระบบการเลือก/อัพเกรด Track](#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) ด้านล่าง) เหลือแค่ level 20 ที่ยังไม่มี feature ("-")

> 🚧 ระบบ Mastery Branch (เดิมอยู่ที่ Mastery-Branches.md) ถูกลบไปแล้ว รอออกแบบใหม่ทั้งจังหวะ Mastery Point และเนื้อหา pool ให้ตรงกับตารางเลเวลนี้ก่อนใช้งานจริง

## ระบบการเลือก/อัพเกรด Track (Pick & Upgrade Schedule)

> 🔄 **2026-08-22**: กฎกลางนี้ใช้กับ**ทุก Job Path เหมือนกันหมด** (ทดลองออกแบบกับ Knight ก่อนแล้วยกมาเป็นกฎกลางของทั้ง class) แทนที่ระบบ "Pick Budget ต่อ Job Change + auto-upgrade" แบบเดิมที่เคยทดลองใน [Knight.md](Knight.md) รอบ 12 — **Respec ถูกตัดออกทั้งหมด**: Track ที่เลือกหรืออัพไปแล้ว **เปลี่ยนใจทีหลังไม่ได้อีกต่อไป** ทุกจุดเป็นการตัดสินใจถาวร

**จุดเลือก Track ใหม่ (6 จุด)**: level **1, 2, 3, 7, 11, 15** — แต่ละจุดเลือก Track ที่ยังไม่เคยมีมาก่อน 1 อัน เริ่มที่ **Rank 1** เสมอ
- Level 1, 2: เลือกจาก **Track ของ Novice-Base เอง** (ดู [Novice-Base.md](Novice-Base.md)) — ยังไม่มี Job Path ให้เลือกจนกว่าจะถึง level 3 ดังนั้น 2 จุดนี้ดึงจาก pool เดียวกัน (เลือกได้ 2 จาก Track ทั้งหมดของ Base — ที่เหลือไม่เคยหยิบจะไม่มีทางได้อีกเลยเพราะไม่มี Respec)
- Level 3, 7, 11, 15: เลือกจาก **Track ของ Job Path ที่เลือกไว้ตอน level 3** (ดูไฟล์ fork ของแต่ละสาย เช่น [Knight.md](Knight.md))

**จุดอัพเกรด Track เดิม (8 จุด)**: level **5, 6, 9, 10, 13, 14, 17, 18** — แต่ละจุดเลือก Track ที่ถืออยู่แล้ว 1 อัน (Track ไหนก็ได้ ไม่จำกัดว่าต้องเป็น Base หรือ Job Path) อัป Rank ขึ้น 1 ขั้น — Rank สูงสุด 4 เสมอ (ถ้า Track ที่ถืออยู่ทุกอันเป็น Rank 4 หมดแล้ว จุดนั้นไม่มีผล ถือว่าพลาดแต้มไป)

**ผลรวมทั้งสาย**: ตลอด 20 เลเวล ได้ Track ใหม่รวม **6 อัน** (2 จาก Novice-Base + 4 จาก Job Path) และมีแต้มอัพเกรดให้กระจาย **8 แต้ม** ลงกี่ Track ก็ได้ตามใจ (ไม่บังคับ 1 Track ต่อ 1 แต้ม) — Track นึงจะขึ้นถึง Rank 4 ได้ต้องใช้แต้มอัพเกรด 3 แต้ม (Rank 1→2→3→4) เช่น ถ้าอยากได้ 2 Track ที่ Rank 4 พอดี (ใช้ 6 แต้ม) จะเหลืออีก 2 แต้มกระจายอัป Track อื่นเป็น Rank 2 ได้ 2 อัน (หรือ Rank 3 ได้ 1 อัน) — เป็น trade-off เชิงกลยุทธ์แบบเดียวกับที่ [Knight.md](Knight.md) เคยมีก่อนรอบ 12 แต่กระจายจุดตัดสินใจให้ละเอียดขึ้น (ตัดสินใจอย่างมากสุด 1 อย่างต่อเลเวลที่มีจุดหยิบ/อัพ แทนที่จะยัดหลายอย่างไว้ที่ level 3 จุดเดียวเหมือนที่เคยทำ)

## Job Paths

Novice เลือก Job (subclass) ตอนเลเวล 3 จากทั้งหมด 7 สาย (6 สายหลัก + Super Novice) — **ข้าม First Class ไปเลย** แต่ละสายมี milestone ใหญ่ที่เลเวล 3/7/11/15 ตรงกับ Second/Transcendent Second/Third/Fourth Class ตามตาราง Level Progression ด้านบน (เนื้อหารายละเอียดของแต่ละสายยังไม่ได้เขียน รอออกแบบใหม่)

**เพิ่มเติม**: นอกจาก feature ตายตัวของแต่ละ Job แล้ว เดิมมีระบบ Mastery Branches — pool เทคนิคเสริมที่ล็อกด้วยเงื่อนไข Job+Level (เช่น "Knight 7+") ให้เลือกเก็บสะสมได้ตลอดทาง ทำหน้าที่แทน spell list ของ full caster — **ระบบนี้ถูกลบไปแล้วรอออกแบบใหม่** ให้ตรงกับแนวทาง "ข้าม First Class เป็น mechanical step" ที่ตกลงล่าสุด (First Class เดิมของแต่ละสายจะเข้าถึงได้ผ่าน Mastery Branch แทน ไม่ใช่ subclass feature ตายตัว)

### ROX Job Tree Reference (ทางการ)

ตารางอ้างอิงที่ผู้ใช้ให้มา — ใช้เป็นแหล่งความจริงหลักสำหรับชื่อ tier ของ 6 สายหลัก:

| Novice | First Class | Second Class | Transcendent Second Class | Third Class | Fourth Class |
|---|---|---|---|---|---|
| Novice | Swordsman | Knight | Lord Knight | Rune Knight | Dragon Knight |
| | | Crusader | Paladin | Royal Guard | Imperial Guard |
| | Mage | Wizard | High Wizard | Warlock | Arch Mage |
| | | Sage | Scholar | Sorcerer | Elemental Master |
| | Merchant | Blacksmith | Mastersmith | Mechanic | Meister |
| | | Alchemist | Biochemist | Geneticist | Biolo |
| | Acolyte | Priest | High Priest | Arch Bishop | Cardinal |
| | | Monk | Champion | Sura | Inquisitor |
| | Thief | Assassin | Assassin Cross | Guillotine Cross | Shadow Cross |
| | | Rogue | Stalker | Shadow Chaser | Abyss Chaser |
| | Archer | Hunter | Sniper | Ranger | Windhawk |
| | | Bard/Dancer* | Minstrel/Gypsy* | Maestro/Wanderer* | Troubadour/Trouvere* |
| | **Super Novice** (ไม่ผ่าน tree ปกติ) | — | — | — | — |

*ในเกมจริงชื่อฝั่ง Bard เพศชาย/Dancer เพศหญิงต่างกัน — เอกสารนี้ใช้เป็นตัวเลือก playstyle อิสระ ไม่ผูกกับเพศตัวละคร

**Fourth Class อยู่ในสโคปแล้ว**: milestone ทั้ง 4 จุด (3/7/11/15) ของ class นี้แมปตรงกับ 4 คอลัมน์ที่เหลือในตารางหลังข้าม First Class (Second Class → Transcendent Second Class → Third Class → **Fourth Class**) พอดี — Fourth Class คือ "Job Change: Fourth Class" ที่เลเวล 15 (capstone ของแต่ละสาย) ไม่ใช่แค่ชื่อสำรองอีกต่อไป

### ROX Skill Reference (แต่ละ Job มี skill อะไรบ้าง)

รวบรวม skill จริงต่อ Job tier ไว้เป็นวัตถุดิบสำหรับออกแบบ feature ของแต่ละ Job Path ทีหลัง — **ยึดตาม ROX เป็นหลัก** ตามที่ระบุ แต่ ROX สืบทอด skill ส่วนใหญ่มาจาก RO classic (skill ชื่อเดียวกันในหลายเวอร์ชัน) จึงอ้างอิง RO classic database (ratemyserver, iRO Wiki, Divine Pride, Ragnarok Fandom Wiki, renewal.playragnarok.com) เสริมในจุดที่หาข้อมูล ROX โดยตรงไม่ได้ — **ครบทั้ง 12 สายย่อย ทุก tier รวม Fourth Class แล้ว** (อัปเดตล่าสุด: ปิดช่องว่างเดิมของ Shadow Cross, Abyss Chaser, Biolo, Scholar, Elemental Master ครบแล้ว) **และเพิ่ม 1st Class (Swordsman/Mage/Acolyte/Thief/Archer/Merchant เอง ก่อนเปลี่ยนอาชีพ) ที่เคยขาดไปครบทั้ง 6 สายแล้วเช่นกัน**

> **แยกเป็นไฟล์ต่อ fork** (12 ไฟล์ — 1 ไฟล์ต่อ 1 Second Class ขึ้นไป) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ — ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว (เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) จึงแตกจาก 6 ไฟล์รวมเดิมเป็น 12 ไฟล์นี้ แต่ละคู่ fork ยังเก็บตาราง First Class เดิมไว้ซ้ำกันทั้งสองไฟล์เป็นวัตถุดิบ Mastery Branch — คำอธิบายเป็นการสรุปคร่าวๆจากชื่อ/ข้อมูลที่ค้นเจอ ไม่ใช่ตัวเลขบาลานซ์จริง ดูหมายเหตุการแก้ไขชื่ออาชีพที่คลาดเคลื่อนจากตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านบนในแต่ละไฟล์ที่เกี่ยวข้อง (Sage.md, Monk.md, Bard.md, Blacksmith.md, Alchemist.md)

- Swordsman → [Knight.md](Knight.md) (Knight → Lord Knight → Rune Knight → Dragon Knight) / [Crusader.md](Crusader.md) (Crusader → Paladin → Royal Guard → Imperial Guard)
- Mage → [Wizard.md](Wizard.md) (Wizard → High Wizard → Warlock → Arch Mage) / [Sage.md](Sage.md) (Sage → Professor → Sorcerer → Elemental Master)
- Acolyte → [Priest.md](Priest.md) (Priest → High Priest → Archbishop → Cardinal) / [Monk.md](Monk.md) (Monk → Champion → Shura → Inquisitor)
- Thief → [Assassin.md](Assassin.md) (Assassin → Assassin Cross → Guillotine Cross → Shadow Cross) / [Rogue.md](Rogue.md) (Rogue → Stalker → Shadow Chaser → Abyss Chaser)
- Archer → [Hunter.md](Hunter.md) (Hunter → Sniper → Ranger → Wind Hawk) / [Bard.md](Bard.md) (Bard → Clown → Minstrel → Troubadour)
- Merchant → [Blacksmith.md](Blacksmith.md) (Blacksmith → Whitesmith → Mechanic → Meister) / [Alchemist.md](Alchemist.md) (Alchemist → Creator → Genetic → Biolo)

### สาขาย่อยในแต่ละสาย (สรุปรวมทั้ง 12 สาย)

ไล่ดู skill data จริงในแต่ละไฟล์ fork แล้วพบว่าเกือบทุกสายซ่อนสาขาย่อยไว้ 2-4 ทาง (แยกตามอาวุธ/สไตล์ที่ skill require หรือแยกตามธาตุ) — เก็บสรุปไว้เป็นวัตถุดิบสำหรับตอน curate Mastery Branch pool จริง รายละเอียดเต็มอยู่ในหัวข้อ "สาขาย่อยในสายนี้" ของแต่ละไฟล์

| Job Path | สาขาย่อย | จุดเด่น |
|---|---|---|
| [Knight.md](Knight.md) | ดาบสองมือ | Crit/burst หนัก (Aura Blade, Bowling Bash AoE, Storm Slash) |
| | หอก + ขี่ม้า/มังกร (Cavalry) | โจมตีเดี่ยวระยะไกล + mobility (Brandish Spear, Spiral Pierce, Dragon Breath ตอน 4th) |
| | ดาบ/หอก + โล่ | สายตอบโต้/แทงค์ (Auto Counter, Weapon Blocking, Rune Shield) |
| [Crusader.md](Crusader.md) | ดาบสองมือ | ดูดเลือดตัวเอง/บั่นทอนแลกดาเมจ (Sacrifice, Cyclone Strike, Fearless Charge) |
| | หอกสองมือ (Holy) | AoE ศักดิ์สิทธิ์ เล่นคล้ายนักบวชสายรบ (Holy Cross, Grand Cross, Moon Slasher) |
| | โล่ | แทงค์/ซัพพอร์ตปาร์ตี้ (Shield Charge, Guard, Devotion, Ultimate Sacrifice) |
| [Wizard.md](Wizard.md) | ไฟ | เบิร์น/DoT สะสม (Fire Ball, Kindle, All Bloom, Conflagration) |
| | น้ำ | คุมฝูง/แช่แข็ง (Storm Gust, Frost Nova, Diamond Dust) |
| | ลม | Chain/knockback เป็นกลุ่ม (Jupitel Thunder, Lord of Vermilion, Chain Lightning) |
| | ดิน | หมุดเดี่ยวกลายหิน (Heaven's Drive, Earth Spike, Earth Strain) |
| | Ghost/Neutral | ดาเมจเดี่ยวใส่อันเดตโดยเฉพาะ (Soul Strike, Soul Expansion, Napalm Vulcan) |
| [Sage.md](Sage.md) | Battle Mage (Book melee) | ตีประชิดด้วยเวทมนตร์ (Advanced Book, Spell Fist, Striking) |
| | Field Control | คุมพื้นที่ต่อเนื่องด้วยสนามธาตุ (Elemental Field, Elemental Mark, Element Bonus) |
| | Spirit Summoner | เรียกวิญญาณธาตุมาเป็นโล่/ตัวช่วยดาเมจ (Summon Spirit, Spirit Possession, Elemental Action) |
| [Priest.md](Priest.md) | Healer/Support บริสุทธิ์ | รักษา/บัฟปาร์ตี้ (Heal, Sanctuary, Coluceo Heal, Resurrection) |
| | Holy Nuker | ดาเมจศักดิ์สิทธิ์ต้านอันเดต/ปีศาจ (Judex, Magnus Exorcismus, Adoramus) |
| | Mace Melee | ตีประชิดเสริมพลังศักดิ์สิทธิ์ (Holy Strike, Expiatio, Sacred Hammer) |
| [Monk.md](Monk.md) | Heavy Knuckle Combo | คอมโบต่อเนื่องแล้วปิดจ๊อบด้วย Asura Strike (Triple Attack → Raging Quadruple Blow → Combo Finish) |
| | Light Knuckle Spirit Spam | ยิง Spirit Sphere ระยะไกลต่อเนื่อง (Finger Offensive, Blade Stop, Tiger Cannon) |
| [Assassin.md](Assassin.md) | Dual Dagger Poison | DoT พิษสะสม + ลอบโจมตีจาก Hiding (Enchant Poison, Venom Spreader, Assassination mark) |
| | Katar | Crit burst ตรงไปตรงมา (Sonic Blow, Soul Destroyer, Advanced Katar Mastery) |
| [Rogue.md](Rogue.md) | Dagger Melee | โจมตีประชิด/ขโมยค่าสเตตัส (Back Stab, Raid, Snatcher) |
| | Bow Ranged | ยิงธนูผสมพิษระยะไกล (Assault, Double Strafe, Ranged Toxic Attack) |
| | Utility/Debuff | Strip อุปกรณ์ศัตรู, ขโมยสกิล, กับดักมิติ (Strip Weapon/Armor, Plagiarism, Dimension Door) |
| [Hunter.md](Hunter.md) | Trapper | คุมพื้นที่ด้วยกับดักธาตุต่างๆ (Ankle Snare, Freezing Trap, Claymore Trap, Land Mine) |
| | Falcon Pet | เหยี่ยวโจมตีเสริมดาเมจ (Blitz Beat, Falcon Assault, Steel Crow) |
| | Direct-Shot Burst | ยิงนัดเดียวแรง (Focused Shot, Sharp Shooting, Aimed Bolt) |
| | Warg Mount (Ranger) | ขี่หมาป่าลุยประชิด-ไกลผสม (Warg Strike, Warg Bite, Prowling Wolf) |
| [Bard.md](Bard.md) | Solo Buffer | บัฟปาร์ตี้คนเดียว (The Apple of Idun, Assassin Cross of Sunset, A Poem of Bragi) |
| | Ensemble | บัฟ/ดีบัฟแรงขึ้นเมื่อจับคู่กับนักดนตรีอีกคน (Lullaby, March of Prontera, Eternal Chaos) |
| | Instrument Damage | โจมตีด้วยเครื่องดนตรี (Musical Strike, Arrow Vulcan, Rose Blossom) |
| [Blacksmith.md](Blacksmith.md) | Cart Melee | ตีด้วยรถเข็น (Cart Revolution, Cart Blitz, Cart Termination) |
| | Zeny Nuker | จ่ายเงินแลกดาเมจ (Mammonite, Hurl Zeny, Zeny Storm) |
| | Mado Gear Pilot | ขับหุ่นยนต์ยิงโดรน/ABR (Mechanic/Meister: Vulcan Arm, ABR - Battle Warrior/Dual Cannon) |
| [Alchemist.md](Alchemist.md) | Homunculus Summoner | เลี้ยงเพ็ท 4 แบบ (Lif/Amistr/Vanilmirth/Filir), Homunculus Upgrade, Life Fusion |
| | Bomb Thrower | ปาระเบิด/กรด AoE DoT (Demonstration, Acid Terror, Acid Demonstration, Spore Explosion) |
| | Cart Cannon Artillery | ปืนใหญ่ระยะไกล (Genetic tier: Cart Cannon, Heavy Cannon) |

**สรุปภาพรวม**: เฉลี่ย ≈ 2.75 สาขาย่อยต่อสาย (Wizard เยอะสุด 5 สาขาเพราะแยกตามธาตุ, ส่วนใหญ่สายอื่น 2-3 สาขาแยกตามอาวุธ/สไตล์) — แต่ละสาขาย่อยอาจกลายเป็น "ชุด Mastery" ที่เลือกเน้นได้ตอน curate จริง ไม่บังคับต้องเลือกสาขาเดียวตายตัว
