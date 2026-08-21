# Novice Job Line: Knight (Swordsman → Knight → Lord Knight → Rune Knight → Dragon Knight)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Crusader.md](Crusader.md) (ไฟล์นี้แทนที่ Swordsman.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Swordsman (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Crusader.md](Crusader.md) เพราะทั้งคู่สืบทอดมาจาก Swordsman เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)

## สาขาย่อยในสายนี้ (สรุปจากข้อมูล skill ด้านล่าง — ไว้ใช้ตอน curate Mastery Branch)

| สาขาย่อย | จุดเด่น |
|---|---|
| ดาบสองมือ | Crit/burst หนัก (Aura Blade, Bowling Bash AoE, Storm Slash) |
| หอก + ขี่ม้า/มังกร (Cavalry) | โจมตีเดี่ยวระยะไกล + mobility (Brandish Spear, Spiral Pierce, Dragon Breath ตอน 4th) |
| ดาบ/หอก + โล่ | สายตอบโต้/แทงค์ (Auto Counter, Weapon Blocking, Rune Shield) |

## ตารางรวม — Knight เต็มสาย (Swordsman → Dragon Knight)

> 🔗 ตารางนี้ดึงทุก feature จากทุก tier ด้านล่างมารวมเป็นตารางเดียวตามลำดับเลเวลที่ได้รับจริง (ใช้เนื้อหา revision ล่าสุดของแต่ละ tier ณ ตอนนี้ — Swordsman rev. 2, Knight rev. 3, Lord Knight rev. 2, Rune Knight rev. 2, Dragon Knight rev. 1 หลังตัด Dragonic Ride) สำหรับเปิดดูภาพรวมทั้งสายโดยไม่ต้องไล่ scroll ทีละ tier — ส่วนด้านล่างที่เหลือเก็บไว้เฉพาะ header/หมายเหตุการออกแบบของแต่ละ tier (ตัดตารางแยกออกแล้วเพื่อไม่ให้ซ้ำ) — ถ้ามีการแก้ revision ของ tier ไหนต่อไป ต้องอัปเดตแถวที่ตรงกันในตารางนี้ด้วย

| Level | สาย | Feature | Action | Mana | ผลลัพธ์ |
|---|---|---|---|---|---|
| 3 | Swordsman | **Provoke** | Bonus Action | 2 | เลือกศัตรู 1 ตัวในระยะ 60 ft ที่มองเห็น ให้ทอย WIS Save (DC สูตรกลาง) ถ้า fail: เป็นเวลา 1 นาที — เมื่อมันโจมตีเป้าหมายอื่นที่ไม่ใช่ Knight จะมี Disadvantage, เมื่อมันโจมตี Knight จะมี Advantage |
| 3 | Swordsman | **Endure** | Reaction | 1 | Trigger: ถูกโจมตี/กำลังจะถูกโจมตี — ได้ +3 AC ย้อนหลัง (อาจทำให้ hit กลายเป็น miss) + immune ต่อ prone/ผลักดัน จนกว่าจะเริ่มเทิร์นถัดไปของตัวเอง |
| 3 | Swordsman | **Battle Will** | Bonus Action | 1 | ได้ Advantage กับการโจมตีด้วยอาวุธทุกครั้ง จนจบเทิร์นนี้ |
| 3 | Swordsman | **Bash** | Action | 1 | จ่าย 1 mana เมื่อโจมตีโดนเพื่อบังคับ CON Save (DC สูตรกลาง): fail = Stunned จนจบเทิร์นถัดไปของเป้าหมาย |
| 3 | Swordsman | **Magnum Break** | Action | 2 | ทุกตัวในระยะ 10 ft รอบตัว ทอย DEX Save: fail = 2d6 Fire dmg, save = ครึ่งเดียว |
| 3 | Swordsman | **Increase HP Recovery** | Passive | 0 | จบ Short Rest แล้ว ฟื้น HP เพิ่มเท่ากับ 1d8 + Novice level |
| 3 | Swordsman | **Fatal Blow** | Passive | 0 | เมื่อ Bash ทำให้เป้าหมายเหลือ 0 HP หรือสตันเป้าหมายสำเร็จ → ฟื้น HP เท่ากับ Novice level และคืน mana ที่จ่ายไปกับ Bash ครั้งนั้น 1 หน่วย |
| 3 | Knight | **Steel Heart** | Reaction | 1 | Trigger: ถูกโจมตี — ได้ Resistance ต่อดาเมจทุกชนิด และ immune ต่อ prone/ผลักดัน จนกว่าจะเริ่มเทิร์นถัดไปของตัวเอง |
| 3 | Knight | **Charge Attack** | Action | 2 | พุ่งเป็นเส้นตรง 15 ft เข้าหาศัตรูที่มองเห็น โดยไม่โดน Opportunity Attack จากเป้าหมายนั้น แล้วทำ Attack Action ปกติ |
| 3 | Knight | **Weapon Speed Boost** | Free (trigger: กำลังโจมตี) | 2 | ใช้ได้เทิร์นละ 1 ครั้ง: เมื่อโจมตีด้วยอาวุธ (ไม่ว่าโดนหรือไม่) จ่าย mana เพื่อโจมตีด้วยอาวุธเพิ่มอีก 1 ครั้งทันที |
| 3 | Knight | **Auto Counter** | Reaction | 2 | Trigger: ถูกโจมตีระยะประชิด — Temp HP เท่ากับ Prof Bonus + CON mod แล้วโจมตีตอบกลับทันที 1 ครั้งด้วย Advantage |
| 3 | Knight | **Aura Blade** | Bonus Action | 1 | เป็นเวลา 1 นาที: Critical Hit ที่เลข 19-20 — crit สำเร็จต่ออายุกลับเต็ม 1 นาที |
| 3 | Knight | **Bowling Bash** | Action | 2 | ศัตรูทุกตัวในระยะ 10 ft รอบตัว ทอย STR Save แยกกัน: fail = ดึงเข้ามาประชิด + ดาเมจอาวุธ, save = ไม่โดน — ตัวที่ fail STR ต้องทอย CON Save เพิ่ม: fail = Stunned จนจบเทิร์นถัดไปของคุณ |
| 3 | Knight | **Cavalry Combat** | Passive | 0 | proficiency ขี่สัตว์พาหนะ ไม่มี disadvantage จากการต่อสู้ขณะขี่ ควบคุมพาหนะด้วย Bonus Action แทน action เต็ม |
| 7 | Lord Knight | **Weapon Blocking** | Reaction | 1 | Trigger: ถูกโจมตี — ลดดาเมจ 1d8 + Prof Bonus แล้วคงสถานะ "Blocking" ถึงต้นเทิร์นถัดไป (ลดดาเมจซ้ำได้โดยไม่ต้องจ่าย mana เพิ่ม) |
| 7 | Lord Knight | **Head Crush** | Bonus Action | 1 | เป็นเวลา 1 นาที: การโจมตีด้วยอาวุธเพิ่มดาเมจ +1d6 ทุกครั้งที่โดน |
| 7 | Lord Knight | **Concentration** | Action | 2 | Mark ศัตรู 1 ตัว 60 ft นาน 1 นาที — ตัวคุณ+พวกพ้องในระยะ 30 ft (สูงสุด 5) ได้ immune prone/ผลักดัน และดาเมจ +1d6 ใส่เป้าหมายที่ mark |
| 7 | Lord Knight | **Joint Beat** | Action | 1 | โจมตีด้วยอาวุธ 1 ครั้ง ถ้าโดน — จ่าย mana ให้เป้าหมาย Prone ทันที ไม่ต้องทอย save |
| 7 | Lord Knight | **Self-Ignite** | Action | 3 | เปิดใช้งาน — จบเทิร์นแต่ละครั้งระหว่างเปิด: รับดาเมจ 1d6 เอง + ศัตรูในระยะ 5 ft รอบตัวรับเท่ากัน ไม่ต้อง save — ปิดได้ทุกเมื่อด้วย Free Action |
| 7 | Lord Knight | **Lord's Aura** | Action | 2 | เป็นเวลา 1 นาที: ตัวคุณ (รวมตัวเอง) + พวกพ้องในระยะ 30 ft ได้ดาเมจอาวุธ +1d6 ทุกครั้งที่โดน |
| 7 | Lord Knight | **Berserk** | Bonus Action | 3 | ฟื้น HP เต็มทันที แล้ว 1 นาที: Advantage + ดาเมจอาวุธ +1d6 ทุกครั้ง แลกผู้โจมตีคุณได้ Advantage กลับ — ต้องโจมตีทุกเทิร์นเพื่อคง Berserk ฟรี ไม่งั้นจ่าย Bonus Action คงสถานะแทน ไม่งั้นจบทันที |
| 11 | Rune Knight | **Death Bound** | Action | 3 | Mark ศัตรู 1 ตัว 60 ft นาน 1 นาที หรือจนห่างเกิน 60 ft — การโจมตีของคุณที่เล็งเป้าหมายนี้มี Advantage |
| 11 | Rune Knight | **Impact Blade** | Action | 3 | พุ่ง 25 ft ไม่โดน OA แล้วฟาดลงจุดหมาย — AoE 10 ft รอบจุด ทอย DEX Save: fail = 3d10, save = ครึ่งเดียว |
| 11 | Rune Knight | **Rune Shield** | Passive | 0 | ถูกโจมตีโดน ได้ +1 AC นาน 1 นาที สะสมสูงสุด 3 ชั้น (รวม +3 AC) |
| 11 | Rune Knight | **Wind Cutter** | Passive | 0 | Critical Hit → โจมตีด้วยอาวุธเพิ่มอีก 1 ครั้งทันที (ไม่เกิน 1 ครั้ง/เทิร์น) |
| 11 | Rune Knight | **Dark Flame Sword** | Action | 1 | เปิดใช้งานนาน 1 นาที: การโจมตีด้วยอาวุธเพิ่มดาเมจ +1d4 ทุกครั้งที่โดน |
| 11 | Rune Knight | **Ignition Break** | Action | 4 | ฟาดพื้น AoE 10 ft รอบตัว ทอย DEX Save: fail = Fire 4d6 + Slowed จนจบเทิร์นถัดไปของเป้าหมาย, save = ครึ่งเดียว ไม่ติด Slow |
| 15 | Dragon Knight | **Servant Weapon** | Passive | 0 | ขณะ Dark Flame Sword เปิดอยู่: ต้นเทิร์นได้ 1 ประจุ Energy Sword (สูงสุด 6) — ตีโดนจ่าย 1 ประจุแลก AoE 10 ft รอบเป้าหมาย เท่าดาเมจที่ทำได้ |
| 15 | Dragon Knight | **Servant Weapon - Phantom** | Bonus Action | 4 | จ่ายประจุทั้งหมด — กระพริบเข้าเป้าหมาย 60 ft แล้วโจมตี: เป้าหมาย+รอบข้าง 6 ft รับ 1d8/ประจุ, CON Save fail = Blinded ถึงจบเทิร์นถัดไป |
| 15 | Dragon Knight | **Servant Weapon - Demolition** | Action | 4 | จ่ายประจุทั้งหมด — วงแหวนพลังงานอยู่เท่าจำนวนประจุ (เทิร์น) จบเทิร์นแต่ละครั้ง: ศัตรู 10 ft รอบตัวรับ 2d6, crit คืนประจุ 1 |
| 15 | Dragon Knight | **Storm Slash** | Passive | 0 | ตีโดนสะสม Storm Force (สูงสุด 8 ชั้น, 1 นาที) — ครบ 8 ชั้น การโจมตีครั้งถัดไปตีเพิ่มอีก 4 ครั้งทันที แล้วรีเซ็ต |
| 15 | Dragon Knight | **Dragonic Aura** | Action | 6 | เรียกมังกรพ่นไฟเส้นตรง 60x5 ft ทอย DEX Save: fail = Fire 8d6, save = ครึ่งเดียว |
| 15 | Dragon Knight | **Vigor** | Bonus Action | 2 | จ่าย HP ตัวเอง 20 ทิ้ง Vigor ไว้ 1 นาที — พวกพ้องที่เก็บได้ +2d6 ดาเมจ 1 นาที, ไม่มีคนเก็บคืน HP 10 |
| 15 | Dragon Knight | **Two Handed Defense** | Action | 5 | ตั้งรับ Resistance ทุกชนิด สูงสุด 1 นาที (ยกเลิกได้ฟรีทุกเมื่อ) — จบท่าปล่อย AoE 10 ft เท่าจำนวนเทิร์นที่ตั้งรับ × 1d6 (สูงสุด 10d6) |

## D&D Feature Draft — Swordsman (1st Class)

> 🚧 **ฉบับร่างแรก (rev. 2)** ของการแปลง skill ROX Swordsman (1st Class) เป็น D&D feature จริง — ยังไม่ final ปรับได้หมด บันทึกไว้เป็นจุดเริ่มต้นก่อนแปลงสาย/tier อื่นต่อ อ้างอิง Mana pool = เลเวล×2 (level 3 = 6 mana) และ Save DC = 8 + Proficiency Bonus + primary ability modifier ตาม [Novice-Concept.md](Novice-Concept.md#level-progression) — **Short Rest คืน mana เท่ากับ Proficiency Bonus** (level 3 = +2) ส่วน Long Rest คืนเต็ม pool — rev. 2 ลด cost ทุกตัวลงเพราะ rev. 1 แพงเกินไปเทียบกับ pool 6 ที่ level 3 (ดูเหตุผลเต็มในแชท) — ตารางเต็มดูได้จากตารางรวมด้านบน

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Provoke: เปลี่ยนจาก "บังคับตีแต่ Knight" (RO ต้นฉบับ) → เป็น Advantage/Disadvantage แทน เพราะ D&D ไม่ค่อยมีกลไก "บังคับเป้าหมาย" ตรงๆ (ปัญหาเรื่อง immune to charm/mind-affecting) — ใช้ soft-compulsion แทน ให้ DM ตัดสินใจเองแต่มี incentive ทางกลไกชัดเจน คงราคาไว้ที่ 2 mana เพราะเอฟเฟกต์อยู่ยาว 1 นาที แรงกว่าตัวอื่นในตารางนี้
- Endure: ใส่ AC เป็น +3 (เทียบเคียง Shield spell ที่ +5 แต่ Shield คือ spell ระดับ 1 เต็มๆ อันนี้เป็นแค่ subclass feature เลยลดลง)
- Bash: **rev. 2 ตัดโบนัสดาเมจ +1d6 ออก** เหลือแค่โจมตีปกติฟรี (0 mana) + จ่าย 1 mana เฉพาะตอนอยากได้สตัน — ให้ Bash เป็น "ท่าตีหลักที่ใช้ได้ไม่จำกัด" เหมือน weapon attack ปกติของ Fighter จริงๆ ไม่ใช่ resource ที่ต้องแบ่งจ่ายทุกครั้งที่ตี
- Magnum Break: ลดจาก 3 → 2 mana ตามการปรับ cost รวมทั้งตาราง
- Fatal Blow: ตีความจาก "ฆ่าได้/บัพ/ฟื้น" เป็น proc เดียวจบ (heal + refund mana) แทนที่จะแยกเป็น 3 effect
- **Sword Mastery ตัดออก**: เป็นแค่ flat stat bonus ที่ D&D จัดการผ่าน proficiency/ASI อยู่แล้ว — จุดเชื่อมที่น่าสนใจคือ D&D 2024 มีระบบ **Weapon Mastery properties** (Cleave, Graze, Sap, Topple, Vex ฯลฯ) อยู่แล้ว อาจใช้เป็นช่องทางปลดล็อก mastery property ของดาบเร็วกว่าปกติแทน ไม่ต้องมี feature เดี่ยว
- **เหตุผลรวมของการลด cost รอบนี้**: pool 6 mana/long rest ตอน level 3 ถ้าใช้ราคา rev. 1 จะหมดตั้งแต่ fight แรก (Bash+stun 2 + Battle Will 2 = 4) ทำให้เหลือทั้งวันแค่ตีเปล่าไม่มี feature — ปรับให้ Bash ฟรี + ท่า BA/Reaction เหลือ 1 + Short Rest คืน = Prof Bonus ทำให้ทั้งวันใช้ได้จริง ~10 mana (6 + 2 + 2 จาก short rest 2 ครั้ง) ≈ 8 ครั้งทั้งวัน กระจายได้ทั่วถึงหลาย encounter โดยยังคง pool เป็นทรัพยากรแบบ Long Rest (ไม่ใช่คืนเต็มทุก short rest แบบ Warlock)

## D&D Feature Draft — Knight (2nd Class)

> 🚧 **ฉบับร่างแรก (rev. 3)** ของการแปลง skill ROX Knight (2nd Class) เป็น D&D feature — ใช้ [กฎการใช้ Mana](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) กลางแล้ว ไม่ต้องคำนวณ balance ใหม่ตั้งแต่ต้น
>
> **จังหวะเลเวล (rev. 2 แก้)**: มอบพร้อมกับ Swordsman (1st Class) ทั้งชุดที่ **level 3** ("Job Change: Second Class") — เพราะระบบเลเวลถูกขยับให้ข้าม First Class เป็น mechanical step แล้ว การเลือก Job Path ตอนเลเวล 3 คือการได้ทั้ง Swordsman + Knight พร้อมกันในทีเดียว (ไม่ใช่แยกมอบทีหลังที่ level 6 แบบ rev. 1) — level 4/5/6 เว้นว่างไว้ตามตาราง [Level Progression](Novice-Concept.md#level-progression) เดิม (level 4 มี ASI อยู่แล้ว)
>
> **เกณฑ์คัดเลือก (rev. 2 ขยายเพิ่ม)**: rev. 1 คัดมาแค่ 3 ท่าที่ไม่ผูกอาวุธ/สาขาย่อยเลย ซึ่งบางไปเทียบกับความหนาแน่นของ Swordsman (7 ท่า) — รอบนี้ดึงกลับมาเพิ่มอีก 4 ท่าโดย **generalize ให้ไม่ผูกอาวุธเฉพาะ** (ตัดคำว่า "ต้องถือดาบ/หอก" ออก เก็บแก่นของท่าไว้) แทนที่จะเลื่อนไปรอ Mastery Branch ทั้งหมด — เหลือเลื่อนเฉพาะท่าที่ genuinely ผูกกับสาขาย่อยจริงๆ (ต้องขี่มังกร/ม้า หรือถือหอกเท่านั้นถึงจะสมเหตุผล) — ตารางเต็มดูได้จากตารางรวมด้านบน

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Steel Heart (rev. 3): เปลี่ยนจาก Bonus Action/1 นาทีมีเงื่อนไขตัดจบ → **Reaction/duration สั้นลงเหลือ "จนกว่าจะเริ่มเทิร์นถัดไป"** ตามที่ปรับ — เอฟเฟกต์แรง (Resistance เต็ม) แต่อยู่สั้นแค่รอบเดียว เลยลดราคาจาก 2 → **1 mana** ให้ตรงกับ band ของ Reaction/short duration (เทียบเท่า Endure เดิม แต่ผลแรงกว่า)
- Charge Attack (rev. 3): เปลี่ยนระยะจาก "speed" เป็น **fixed 15 ft** และเปลี่ยนจาก "โจมตี 1 ครั้ง" เป็น **"ทำ Attack Action เต็ม"** (ได้ทุกครั้งโจมตีถ้ามี Extra Attack ทีหลัง) — **ตัดสตัน/CON Save ออก** ตามที่ระบุ (ไม่พูดถึงในดราฟต์ใหม่) ให้เหลือแค่กลไก gap-closer + attack action ล้วนๆ ราคาคงที่ 2 mana เพราะยังประหยัด action economy ได้เยอะ (ไม่ต้องเสีย movement แยกจาก action)
- Weapon Speed Boost (rev. 3): เปลี่ยนจาก "Bonus Action ตั้ง buff ไว้ก่อนแล้วรอโจมตีโดน" → **ไม่ใช้ action ของตัวเอง จ่าย mana ตอนกำลังโจมตีได้เลย ครั้งเดียวต่อเทิร์น** ตัดเงื่อนไข "ต้องโจมตีโดนก่อน" ออกด้วย (จ่ายได้ทันทีไม่ต้องรอผลตี) ราคาคงที่ 2 mana เพราะยังคือได้โจมตีฟรีเพิ่ม 1 ครั้ง (ของแรงเท่าเดิม แค่ใช้งานคล่องขึ้น)
- Auto Counter: ไม่มีการเปลี่ยนแปลงจาก rev. 2 — ยังคงตัดเงื่อนไข "ต้องถือโล่" (ต้นฉบับ RO ผูกกับ shield stance) ราคา 2 mana เพราะได้ทั้ง temp HP และโจมตีตอบกลับ
- Aura Blade: ไม่มีการเปลี่ยนแปลงจาก rev. 2 — Crit 19-20 นาน 1 นาที ต่ออายุเมื่อ crit ราคา 1 mana เพราะเป็นบัฟสถิติล้วน
- Bowling Bash (rev. 3): แยกเป็น **2 save ต่อกัน** ตามที่ระบุ — STR Save ก่อนเพื่อตัดสินการดึงเข้าตัว+ดาเมจ (fail เท่านั้นถึงโดนดึง+โดนดาเมจ, save = รอดครบทั้งดึงและดาเมจ), จากนั้นเฉพาะตัวที่ fail STR ต้องทอย CON Save แยกอีกทีเพื่อตัดสินสตัน — ราคาคงที่ 2 mana (Action AoE band) เพราะยังเป็น AoE control ระดับเดียวกับ Magnum Break แค่แยกเงื่อนไขให้ชัดเจนขึ้น
- Cavalry Combat: ไม่มีการเปลี่ยนแปลงจาก rev. 2 — proficiency เปล่าๆ ก่อน ยังไม่ให้พาหนะจริงจนกว่าจะถึง tier ที่มีธีมมังกรชัดเจน
- **Spear Mastery ตัดออกถาวร**: เหตุผลเดียวกับ Sword Mastery ใน Swordsman tier — เป็น flat stat bonus ที่ D&D จัดการผ่าน proficiency/Weapon Mastery property อยู่แล้ว
- **ยังเลื่อนไปเป็นวัตถุดิบ Mastery Branch (ไม่ใช่ตัดทิ้ง)**: Pierce, Spear Stab, Cavalry Mastery, Spear Boomerang, Double Blow — เหลือเฉพาะท่าที่ genuinely ผูกกับสาขาย่อยจนอธิบายแบบ generic ไม่ได้จริงๆ (ต้องถือหอกเท่านั้น เช่น Pierce/Spear Stab/Spear Boomerang ที่เนื้อหาซ้ำกันเองด้วย, หรือต้องขี่พาหนะเท่านั้นอย่าง Cavalry Mastery) กับ Double Blow ที่เป็นกลไก %-chance ซ้ำกับ Weapon Mastery property ของ D&D อยู่แล้ว (คล้าย Sword Mastery)
- **เช็ค Day Math ที่ level 3 (หลัง rev. 3)**: pool 6 + short rest 2 ครั้ง×2 = 10 mana/วัน รวมกับของ Swordsman (7 ท่า) ในพูลเดียวกัน — avg cost ของ Knight tier นี้ตอนนี้ (1+2+2+2+1+2+0)/7 ≈ 1.4 ยังอยู่ในกรอบ 1-2 ของ level 3-4 band ปกติ ไม่ต้องปรับเพิ่ม

## D&D Feature Draft — Lord Knight (Transcendent Second Class)

> 🚧 **ฉบับร่างแรก (rev. 2)** ของการแปลง skill ROX Lord Knight (Transcendent Second Class) เป็น D&D feature — มอบที่ **level 7** ("Job Change: Transcendent Second Class") ใช้ [กฎการใช้ Mana](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) กลาง — ที่ level 7: pool 14, Prof Bonus +3, avg cost เป้าหมายตามตาราง reference คือ **2-3** (ขยับขึ้นจาก 1-2 ของ level 3-4 ตามธรรมชาติ ไม่ต้องคำนวณ balance ใหม่)
>
> **เกณฑ์คัดเลือก**: ใช้หลัก "generalize ก่อนเลื่อน" แบบเดียวกับ Knight (2nd) — จาก 10 ท่าใน tier นี้ เก็บ 7 ท่าที่ generalize ได้ (ไม่ผูกอาวุธ/สาขาย่อยในคำอธิบายต้นฉบับ), ตัดถาวร 1 ท่า (Call of Justice — flat stat conversion แบบเดียวกับ Sword/Spear Mastery), เลื่อนไป Mastery Branch 2 ท่าที่ genuinely ผูกกับหอก+ขี่มังกร/ม้า (Brandish Spear, Spiral Pierce)
>
> **rev. 2**: ปรับ 6 ท่าตามคำสั่งตรง — Weapon Blocking เปลี่ยนจาก stance/นับครั้งเป็น Reaction ลดดาเมจแบบ Steel Heart, Head Crush ตัด Bleed rider เหลือบัฟดาเมจล้วน, Joint Beat เปลี่ยนจาก save-based debuff table เป็น prone ตรงไม่ต้องทอย, Self-Ignite ย้าย trigger จากต้นเทิร์นเป็นจบเทิร์น+ลดระยะเหลือ 5 ft+ปิดด้วย Free Action, Lord's Aura ขยับจาก 1d4 เป็น 1d6 และยืนยันว่าตัวเองได้รับผลด้วย, Berserk เปลี่ยนข้อจำกัดจาก "ทำได้แค่ Attack/Dash/Disengage" เป็นเงื่อนไข maintenance (ต้องโจมตีทุกเทิร์น ไม่งั้นต้องจ่าย Bonus Action คงสถานะ) — Concentration ไม่มีการเปลี่ยนแปลง — ตารางเต็มดูได้จากตารางรวมด้านบน

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Weapon Blocking (rev. 2): เปลี่ยนจาก stance/นับจำนวนครั้ง+ตีสวน → **Reaction ลดดาเมจแบบ Steel Heart** (trigger ถูกโจมตี ลดดาเมจ + คงผลถึงต้นเทิร์นถัดไป) ตัดกลไกตีสวนออกเพราะไม่ถูกพูดถึงในคำสั่งใหม่ (ตามหลัก "ไม่พูดถึง = ตัด" ที่ใช้กับ Charge Attack ก่อนหน้า) ราคาลดจาก 2 → **1 mana** ให้ตรง band ของ Reaction/short duration (เจตนาให้เป็นทางเลือกที่ reliable กว่า Steel Heart แต่ผลอ่อนกว่า เพราะลดดาเมจแบบ flat ไม่ใช่ resistance เต็ม)
- Head Crush (rev. 2): **ตัด Bleed/Critical rider ออก** เหลือแค่บัฟดาเมจอาวุธ +1d6 ล้วนๆ นาน 1 นาที — โครงสร้างเดียวกับ Aura Blade (บัฟสถิติล้วน) ราคาลดจาก 2 → **1 mana** ตามเหตุผลเดียวกับ Aura Blade
- Concentration: ไม่มีการเปลี่ยนแปลงจาก rev. 1
- Joint Beat (rev. 2): เปลี่ยนจาก save-based debuff table (4 แบบ) → **Prone ทันทีไม่ต้องทอย save** ตามที่ระบุ ("ตีโดนให้ prone ได้เลย") ราคาคงที่ 1 mana เพราะยังเป็น attack + rider เดี่ยวเหมือนเดิม แค่ทำให้ effect แน่นอนแทนการสุ่ม/ทอย
- Self-Ignite (rev. 2): ย้าย trigger จาก **ต้นเทิร์น** เป็น **จบเทิร์น**, ลดรัศมี AoE จาก 10 ft → **5 ft**, และเปลี่ยนวิธีปิดจาก "เมื่อไหร่ก็ได้แบบไม่เสีย action" ให้ระบุชัดเป็น **Free Action** ตามที่สั่ง — ตัด duration ตายตัว 3 เทิร์นออกเพราะตอนนี้ปิดเองได้เมื่อไหร่ก็ได้อยู่แล้ว (ไม่จำเป็นต้องมี cap แยก) ราคาคงที่ 3 mana (capstone band) เพราะยังเป็น AoE ต่อเนื่องไม่จำกัดเทิร์นแลกเลือดตัวเอง
- Lord's Aura (rev. 2): ขยับดาเมจจาก **+1d4 → +1d6** และยืนยันชัดเจนว่า **ตัวเองก็ได้รับผลด้วย** (ไม่ใช่แค่พวกพ้อง) ตามที่ระบุ ราคาคงที่ 2 mana เพราะยังเป็น AoE party buff 1 นาทีเหมือนเดิม แค่แรงขึ้นเล็กน้อย
- Berserk (rev. 2): เปลี่ยนข้อจำกัดจาก **"ทำได้แค่ Attack/Dash/Disengage"** → **เงื่อนไข maintenance**: ต้องโจมตีด้วยอาวุธทุกเทิร์นเพื่อให้ Berserk ทำงานต่อฟรี ถ้าไม่โจมตีเทิร์นนั้นต้องจ่าย Bonus Action แทนไม่งั้นจบทันที — ให้ความรู้สึก "โหมดดุดัน" ตรงกับต้นฉบับมากขึ้น (บังคับให้เล่นเชิงรุกต่อเนื่อง) โดยไม่ต้องล็อก action option ทั้งหมดแบบเดิม ราคาคงที่ 3 mana (capstone-tier เท่า Self-Ignite)
- **Call of Justice ตัดออกถาวร**: เหตุผลเดียวกับ Sword Mastery/Spear Mastery — เป็น flat stat conversion (VIT→ATK) ที่ D&D จัดการผ่าน ability score/ASI อยู่แล้ว
- **ยังเลื่อนไปเป็นวัตถุดิบ Mastery Branch**: Brandish Spear (ต้องขี่ Cavalry Combat + สเกลกับหอกโดยเฉพาะ), Spiral Pierce (ต้องถือหอกเท่านั้นตามคำอธิบายต้นฉบับ) — ทั้งคู่ genuinely ผูกกับสาขาย่อยหอก+ขี่ม้า/มังกร ที่ยังไม่มี feature รองรับพาหนะจริงจนกว่าจะถึง Dragon Knight (4th)
- **เช็ค Day Math ที่ level 7 (หลัง rev. 2)**: pool 14 + short rest 2 ครั้ง×3 = 20 mana/วัน — avg cost ของ Lord Knight tier นี้ตอนนี้ (1+1+2+1+3+2+3)/7 ≈ **1.86** ต่ำกว่ากรอบ 2-3 ของ level 5-8 band เล็กน้อย (≈11 ครั้ง/วัน แทนที่จะเป็น 6-10) — เกิดจาก Weapon Blocking/Head Crush ถูกลดความซับซ้อนลงเป็นเอฟเฟกต์เบาลงตามคำสั่งตรง ยังไม่ปรับราคาเพิ่มเพราะเป็นการลดพลังจริง ไม่ใช่แค่ reframe เฉยๆ — ถ้าจะดึง avg กลับเข้ากรอบพอดีทีหลังค่อยพิจารณาขยับ Weapon Blocking หรือ Head Crush ขึ้นเป็น 2 ได้

## D&D Feature Draft — Rune Knight (3rd Class)

> 🚧 **ฉบับร่างแรก (rev. 2)** ของการแปลง skill ROX Rune Knight (3rd Class) เป็น D&D feature — มอบที่ **level 11** ("Job Change: Third Class") ใช้ [กฎการใช้ Mana](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) กลาง — ที่ level 11: pool 22, Prof Bonus +4, avg cost เป้าหมายตามตาราง reference คือ **3-5** (ขยับขึ้นจาก 2-3 ของ level 5-8 ตามธรรมชาติ)
>
> **เกณฑ์คัดเลือก**: จาก 13 ท่าใน tier นี้ — เก็บ 6 ท่าที่ generalize ได้จริง, ตัดถาวร 1 ท่า (Enchant Blade — flat elemental dmg conversion แบบเดียวกับ Sword/Spear Mastery), เลื่อนไป Mastery Branch 6 ท่า: **4 ท่าผูกกับการขี่มังกรจริง** (Dragon Training, Dragon Breath - Fire, Dragon Breath - Water, Inverse Scale — สอดคล้องกับที่ Cavalry Combat บอกไว้ตั้งแต่ Knight 2nd ว่า "รอ tier สูงกว่าที่ผูกกับมังกรโดยเฉพาะ" ซึ่งก็คือ Dragon Knight 4th ที่กำลังจะถึง) และ **2 ท่าผูกกับหอก/หลาวเท่านั้น** (Phantom Strike, Hundred Spears — genuinely spear/lance-locked ตามคำอธิบายต้นฉบับ เหมือน Pierce/Spear Stab ใน Knight 2nd)
>
> **หมายเหตุเรื่อง Toggle type**: ท่า Toggle ในตารางนี้ (Rune Shield, Wind Cutter) ถูกแปลงเป็น **Passive 0 mana** ตรงตามกฎกลาง (Toggle = trigger อัตโนมัติ ไม่ใช่การกดใช้ท่าโดยผู้เล่น) — สอดคล้องกับที่ Cavalry Combat เคยถูกแปลงแบบเดียวกันใน Knight 2nd
>
> **rev. 2**: ปรับ 4 ท่าตามคำสั่งตรง — Death Bound เปลี่ยนจากกลไกแปลงดาเมจที่เสียเป็นดาเมจใส่เป้าหมาย → **การโจมตีเป้าหมายที่ mark ไว้มี Advantage ตลอด 1 นาที**, Rune Shield เปลี่ยนจากสะสม Unbreakable+ระเบิดเป็นเกราะ → **+1 AC ต่อครั้งที่โดนตี นาน 1 นาที สะสมสูงสุด 3 ชั้น**, Wind Cutter เปลี่ยนจากสะสมสถานะ crit-damage → **crit แล้วโจมตีเพิ่มได้ทันที 1 ครั้ง**, Dark Flame Sword เปลี่ยนจากบัฟ party stacking attack-roll → **ดาเมจตัวเองเพิ่ม +1d4 ตลอด 1 นาที** — Impact Blade และ Ignition Break ไม่มีการเปลี่ยนแปลง — ตารางเต็มดูได้จากตารางรวมด้านบน

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Death Bound (rev. 2): เปลี่ยนจากกลไก "แปลงดาเมจที่ตัวเองเสียเป็นดาเมจใส่เป้าหมาย" → **การโจมตีเป้าหมายที่ mark มี Advantage ตลอด 1 นาที** ตามที่ระบุ — ตัดกลไกแปลงดาเมจเดิมออกทั้งหมด (ไม่ถูกพูดถึงในคำสั่งใหม่) ราคาขยับจาก 2 → **3 mana** เพราะ Advantage ทุกครั้งที่โจมตีเป้าหมายเดิมตลอด 1 นาที (10 เทิร์น) เป็นเอฟเฟกต์ที่แรงกว่าเดิม ไม่ใช่แค่ reframe
- Impact Blade: ไม่มีการเปลี่ยนแปลงจาก rev. 1
- Rune Shield (rev. 2): เปลี่ยนจากสะสม "Unbreakable" 5 ชั้น+ระเบิดเป็นเกราะ Temp HP → **+1 AC ต่อครั้งที่โดนตี นาน 1 นาที สะสมสูงสุด 3 ชั้น** ตามที่ระบุ ตัดกลไกระเบิดเป็นเกราะออก (ไม่ถูกพูดถึง) ยังคงเป็น Passive 0 mana เพราะยัง trigger อัตโนมัติจากการโดนตี ไม่ใช่ท่าที่กดใช้เอง
- Wind Cutter (rev. 2): เปลี่ยนจากสะสมสถานะเพิ่มดาเมจ crit → **crit แล้วโจมตีด้วยอาวุธเพิ่มได้ทันที 1 ครั้ง** ตามที่ระบุ ("ตีเพิ่มได้ 1 ครั้ง") — เพิ่มเงื่อนไขนิรภัย "ไม่เกิน 1 ครั้งต่อเทิร์น" กันไม่ให้เกิดลูปโจมตีเพิ่มไม่จำกัด (crit ซ้อน crit) ยังคง Passive 0 mana เพราะเป็น trigger อัตโนมัติจากการ crit
- Dark Flame Sword (rev. 2): เปลี่ยนจากบัฟ party stacking attack-roll → **ดาเมจอาวุธตัวเองเพิ่ม +1d4 ตลอด 1 นาที** ตามที่ระบุ (ไม่พูดถึงพวกพ้องแล้ว จึงตัดผลต่อ party ออก เหลือเฉพาะตัวเอง) โครงสร้างใกล้เคียง Head Crush (+1d6 self, 1 mana) แต่ die เล็กกว่า ราคาลดจาก 3 → **1 mana** ตามกำลังที่ลดลงจริง — **ยังคงสถานะ "เปิดใช้งาน 1 นาที" ไว้** (ไม่ตัดกลไก toggle) เพราะ Dragon Knight (4th) ยังต้องอ้างอิงสถานะ "Dark Flame Sword เปิดอยู่หรือไม่" สำหรับ Servant Weapon ต่อไป
- Ignition Break: ไม่มีการเปลี่ยนแปลงจาก rev. 1
- **Enchant Blade ตัดออกถาวร**: เหตุผลเดียวกับ Sword/Spear Mastery — เป็น flat elemental dmg conversion ที่ D&D จัดการผ่าน magic weapon/Weapon Mastery property อยู่แล้ว
- **ยังเลื่อนไปเป็นวัตถุดิบ Mastery Branch**: Dragon Training, Dragon Breath - Fire, Dragon Breath - Water, Inverse Scale (ทั้งหมดต้องขี่มังกรจริงตามคำอธิบายต้นฉบับ — ยังไม่มี feature มังกรจริงจนกว่าจะถึง Dragon Knight 4th), Phantom Strike, Hundred Spears (ต้องถือหอก/หลาวเท่านั้นตามคำอธิบายต้นฉบับ)
- **เช็ค Day Math ที่ level 11 (หลัง rev. 2)**: pool 22 + short rest 2 ครั้ง×4 = 30 mana/วัน — นับ avg cost เฉพาะ **ท่าที่เสีย mana จริง** (4 ท่า active: Death Bound, Impact Blade, Dark Flame Sword, Ignition Break) ไม่รวม 2 ท่า Passive — avg cost = (3+3+1+4)/4 = **2.75** ต่ำกว่ากรอบ 3-5 ของ level 9-12 band เล็กน้อย (≈11 ครั้ง/วัน แทนที่จะเป็น 6-10) — เกิดจาก Dark Flame Sword ถูกลดพลังลงมากตามคำสั่งตรง (party buff → self-only) ยังไม่ปรับราคาตัวอื่นเพิ่มเพราะ Death Bound ก็ขยับขึ้นแล้วสวนทางกัน ถือว่าหักลบกันในภาพรวม ถ้าต้องการดึง avg กลับเข้ากรอบพอดีทีหลังค่อยพิจารณาขยับ Impact Blade เป็น 4 หรือ Dark Flame Sword เป็น 2 ได้

## D&D Feature Draft — Dragon Knight (4th Class)

> 🚧 **ฉบับร่างแรก (rev. 1)** ของการแปลง skill ROX Dragon Knight (4th Class) เป็น D&D feature — มอบที่ **level 15** ("Job Change: Fourth Class") ใช้ [กฎการใช้ Mana](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) กลาง — ที่ level 15: pool 30, Prof Bonus +5, avg cost เป้าหมายตามตาราง reference คือ **4-6** (ขยับขึ้นจาก 3-5 ของ level 9-12 ตามธรรมชาติ) — นี่คือ tier สุดท้าย/capstone ของสาย Knight ทั้งหมด
>
> **เกณฑ์คัดเลือก**: จาก 12 ท่าใน tier นี้ — เก็บ 7 ท่า (รวม Servant Weapon - Sign เข้ากับ Servant Weapon หลักแทนที่จะแยกเป็น feature ต่างหาก เพราะเนื้อหาเป็นกลไก mark/extend-range ของระบบเดียวกัน ไม่ใช่ท่าที่ยืนด้วยตัวเองได้), ตัดถาวร 2 ท่า (Hack and Slasher — ซ้ำกับกลไก "AoE โจมตีรอบตัว" ที่มีอยู่แล้วหลายตัวในสายนี้ เช่น Magnum Break, Bowling Bash, Impact Blade; Dragonic Ride — ตัดออกตามคำสั่งผู้ใช้), เลื่อนไป Mastery Branch 2 ท่าที่ genuinely ผูกกับหอกเท่านั้น (Charging Pierce — ผูกกับ combo ท่าหอกที่ถูกเลื่อนไปแล้วทั้งหมด, Madness Crusher — "hurls your spear" ตามคำอธิบายต้นฉบับ)
>
> **จุดสำคัญ**: **Servant Weapon** ยังผูกกับสถานะ "Dark Flame Sword" ที่ Rune Knight เปิดไว้ตามที่วางแผนไว้ตั้งแต่ tier ก่อน — 4 ท่าที่เลื่อนไว้ตอน Rune Knight ผูกกับมังกร (Dragon Training, Dragon Breath - Fire/Water, Inverse Scale) ยังคงค้างอยู่ในวัตถุดิบ Mastery Branch โดยไม่มี payoff การขี่มังกรจริงใน tier นี้แล้ว (Dragonic Ride ถูกตัดออก) — รอการออกแบบระบบ Mastery Branch ในอนาคตว่าจะจัดการท่ากลุ่มนี้อย่างไรต่อไป — ตารางเต็มดูได้จากตารางรวมด้านบน

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Servant Weapon: รวม Servant Weapon - Sign เข้าไว้ในกลไกเดียวกัน (ตัดระบบ mark-สะสม 20% chance ต่อผู้โจมตี + drop "Ultimate Servant Weapon" ที่ซับซ้อนเกินไปสำหรับโต๊ะจริง) เหลือแก่นคือ "สะสมประจุ → จ่ายประจุแลกดาเมจ AoE เพิ่ม" เป็น Passive 0 mana เพราะเป็นกลไกทรัพยากรที่ผูกกับ trigger อัตโนมัติ (ต้นเทิร์น + ตีโดน) ไม่ใช่การกดใช้ mana
- Servant Weapon - Phantom: ตัด detail % chance Blind ออกเป็น save ตรงไปตรงมา ใช้ดาเมจสเกลตามประจุที่จ่าย (1d8/ประจุ) แทน %ATK ราคา 4 mana เพราะเป็น burst single-target + AoE รอบเป้าหมายพร้อมกัน
- Servant Weapon - Demolition: ตัดกลไก "ทุกวินาที" ที่ไม่แม่นในรอบเทิร์นออก เปลี่ยนเป็น "จบเทิร์นของคุณ" ตามธรรมเนียมไฟล์นี้ (เหมือน Self-Ignite) ราคา 4 mana เพราะยังเป็น AoE ต่อเนื่องแลกทรัพยากรประจุ
- Storm Slash: ตัดรายละเอียด %-chance ต่อชนิดอาวุธ + โบนัสสเกลตาม VIT/STR/crit เฉพาะชนิดอาวุธออกทั้งหมด (generalize ไม่ผูกอาวุธ) เหลือกลไกสะสม-ปล่อยแบบง่าย เป็น Passive 0 mana เพราะ trigger อัตโนมัติจากการตีโดน ไม่ใช่การกดใช้ mana — ต่างจาก Wind Cutter (Rune Knight) ตรงที่ trigger จาก "ตีโดนทุกครั้ง" ไม่ใช่เฉพาะ crit และผลลัพธ์แรงกว่ามาก (payoff เป็น capstone)
- Dragonic Aura: generalize ตัดข้อจำกัดเรื่องการขี่มังกรออก (ต้นฉบับไม่ได้ระบุว่าต้องขี่จริงๆ แค่ "เรียกมังกรจากฟ้า") ราคา 6 mana เป็นท่าแพงที่สุดในสายทั้งหมด (nuke เส้นตรงระดับ capstone ปิดท้ายสาย)
- Vigor: ตัดกลไก "boost ท่า skill ตามจำนวนเท่า" ที่ซับซ้อนออก เหลือ "+ดาเมจคงที่" ธรรมดา ให้จ่าย HP จริงแทนที่จะเป็นแค่ mana (ตรงตามธีม "สละเลือดเนื้อเพื่อพวกพ้อง" ของต้นฉบับ) ราคา mana ต่ำ (2) เพราะมี cost เพิ่มเป็น HP จริงอยู่แล้ว
- Two Handed Defense: ตัดกลไก "ยิ่งชาร์จนานยิ่งแรง" ที่ต้องนับเวลาแบบ real-time ออก เปลี่ยนเป็นนับเป็น "จำนวนเทิร์น" ให้เข้ากับ D&D round system ราคา 5 mana เพราะให้ resistance เต็มรูปแบบ (ของแรง เทียบเท่า Steel Heart ที่ resistance เหมือนกันแต่ตัวนี้อยู่ได้นานกว่ามาก)
- **Hack and Slasher ตัดออกถาวร**: ซ้ำกับกลไก "AoE โจมตีรอบตัว" ที่มีอยู่แล้วหลายตัวในสายนี้ (Magnum Break, Bowling Bash, Impact Blade) ไม่ได้เพิ่มอะไรใหม่เชิงกลไกให้ tier นี้
- **Dragonic Ride ตัดออกถาวร**: ตัดตามคำสั่งผู้ใช้โดยตรง — ผลคือ 4 ท่าที่เลื่อนไว้ตอน Rune Knight ซึ่งผูกกับการขี่มังกร (Dragon Training, Dragon Breath - Fire/Water, Inverse Scale) ยังไม่มี feature ใดใน tier นี้ปลดล็อกการขี่มังกรจริงให้ — ยังคงสถานะเป็นวัตถุดิบ Mastery Branch เฉยๆ รอการออกแบบระบบนั้นตัดสินใจอีกที (อาจจะให้ Mastery Branch เองเป็นตัวปลดล็อกการขี่แทนก็ได้)
- **ยังเลื่อนไปเป็นวัตถุดิบ Mastery Branch**: Charging Pierce (ผูกกับ combo ท่าหอกที่ถูกเลื่อนไปหมดแล้วตั้งแต่ Knight 2nd/Lord Knight/Rune Knight), Madness Crusher ("hurls your spear" ตามคำอธิบายต้นฉบับ ผูกหอกโดยตรง)
- **เช็ค Day Math ที่ level 15**: pool 30 + short rest 2 ครั้ง×5 = 40 mana/วัน — นับ avg cost เฉพาะ **ท่าที่เสีย mana จริง** (5 ท่า active: Servant Weapon - Phantom, Servant Weapon - Demolition, Dragonic Aura, Vigor, Two Handed Defense) ไม่รวม 2 ท่า Passive (Servant Weapon, Storm Slash) — avg cost = (4+4+6+2+5)/5 = **4.2** อยู่ในกรอบ 4-6 ของ level 13-16 band พอดี → 40/4.2 ≈ 9.5 ครั้ง/วัน อยู่ในกรอบเป้าหมาย 6-10 ครั้ง/วัน ถือว่าลงตัว (ไม่เปลี่ยนจากก่อนตัด Dragonic Ride ออก เพราะตัวนั้นเป็น Passive 0 mana ที่ไม่เคยถูกนับในค่าเฉลี่ยนี้อยู่แล้ว)

## ROX Skill Reference — Swordsman → Knight

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1100, 1110-1113) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) ทุกอาชีพยังมี Talent skill กลางชื่อ "Skill #1000107" (Toggle, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตารางเพราะไม่มีข้อมูลให้อ้างอิง

#### Swordsman (1st Class)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Bash | Active | 10 | Deal (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy. After learning Fatal Blow, this skill has a chance of stunning the target. The chance to stun increases as Fatal Blow's skill level increases. |
| Magnum Break | Active | 10 | Deals (%s% of ATK + %s) Fire physical damage to enemies within 3 meters. After casting this skill, your weapon will gain the Fire attribute, and normal attacks will deal 20% more damage for %s seconds. |
| Endure | Active | 5 | Gain the Endure effect, preventing you from being interrupted or knocked back when being attacked. Also increases DEF and M.DEF by %s. The Endure effect will be removed after 10 seconds or being attacked %s times. |
| Provoke | Active | 10 | Provoke an enemy unit within 4 meters, decreasing their DEF by %s%, increasing their ATK by %s%, and forcing them to attack you for 10 seconds. This skill does not affect players. |
| Increase HP Recovery | Toggle | 10 | Increases the effectiveness of HP recovery items by %s%. When your HP falls below 30% of Max HP, heal yourself for 4% of Max HP every 1 second for %s second(s). This effect can only trigger once every 60 seconds. After activating Self-Ignite in PVP, the skill's recovery effect will not be triggered. |
| Battle Will | Toggle | 10 | Whenever your normal attacks hit, your Physical Damage Bonus is increased by 20, increasing by %s more for every 50 STR. Can stack up to 8 times. Lasts for 5 seconds. |
| Fatal Blow | Toggle | 5 | When casting Bash, there's a %s% chance to apply Armor Break to the enemy for 5 seconds, stunning the target for 2 seconds. |
| Sword Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% of STR) when equipped with a One-Handed Sword/Two-Handed Sword. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1100)

#### Knight (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Spear Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% of STR) when equipped with a Spear. |
| Sword Speed Boost | Active | 10 | For the next %s seconds, Final ASPD increases %s% (for every 25 AGI, effect increases 1%) points. |
| Steel Heart | Active | 10 | Within 12 seconds of using this skill, damage received decreases by %s% (increases by an additional 1% for every 50 VIT you have) and prevents you from being interrupted when being attacked. This effect will be removed after being attacked %s times. |
| Pierce | Active | 10 | Can only be used when equipped with a Spear. Continuously attack an enemy for a short time, dealing 5 attacks that inflict a total of (%s% of ATK + %s) physical damage of your weapon's attribute. Deals %s% more damage to Large targets. |
| Cavalry Combat | Toggle | 5 | Can mount Pecopeco while fighting, but Final ASPD decreases by %s% due to the restrictions of mounted combat. At max level of this skill, Final ASPD will return to normal. |
| Auto Counter | Active | 10 | Enters the Counter state and gains a shield that absorbs damage up to %s% of Max HP for 4.5 seconds. When the shield ends (it will end earlier if it reaches the damage limit), deals Neutral P.DMG equal to %s% of Max HP to all enemy units within 3 meters, and increases the target's Threat by a large amount. |
| Spear Stab | Active | 10 | Can only be used when equipped with a Spear. Deals weapon attribute P.DMG equal to (%s% P.ATK + %s) to enemy units within a 4x2 rectangular area in the direction you are facing, stunning them for 2 seconds. |
| Cavalry Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% × STR) during Cavalry Combat. Each release of Normal Attacks or skills grants 1 stack of Courage, which increases MSPD by %s% and P.DEF by %s%. Stacks up to 3 times and lasts 6 seconds. Up to 1 stack of Courage can be obtained per second. |
| Bowling Bash | Active | 10 | Pulls up to 8 enemy units within 4 meters toward you, clashing with them to deal (%s% + (Number of Monsters - 1) × 50%) × ATK physical damage of your weapon's attribute. Affected targets are stunned for a short time and then knocked back 1 meter, toward their original location. |
| Spear Boomerang | Active | 10 | Can only be used when equipped with a Spear. Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy unit. |
| Charge Attack | Active | 10 | Charges towards a faraway enemy target (cannot be silenced after the charge starts), dealing (%s% of ATK + %s) Neutral physical damage to enemies in a straight line and stunning them for 2 seconds. |
| Aura Blade | Active | 10 | Infuses your weapon with power, increasing Final Crit Rate by %s% (increases by an additional 1% for every 50 AGI you have) and Crit Damage Bonus by %s% (increases by an additional 1% for every 50 STR you have) for 10 seconds. Each critical hit refreshes the remaining buff time. |
| Double Blow | Toggle | 10 | When equipped with a Sword, each normal attack has a 20% chance (every 50 STR increases an additional 1%, up to 30%) of dealing bonus weapon attribute P.DMG equal to (%s% P.ATK + %s) that ignores defense. If the normal attack is critical, the bonus damage will also be critical. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1110)

#### Lord Knight (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Brandish Spear | Active | 10 | Can only be used when mounted in Cavalry Combat. Deals neutral attribute P.DMG equal to %s% of P.ATK to a single enemy target. (Every 60 STR increases the P.ATK coefficient by an additional %s%, up to 2,000%.) Also reduces the target's ASPD by %s% and MSPD by %s% for 4 seconds. Using a spear inflicts an additional %s% damage. |
| Weapon Blocking | Active | 10 | Enters Blocking status upon use. Has a %s% chance to weapon block enemy attacks when taking P.DMG from front enemies, up to 15 times within 6 seconds. Successful blocks negate the physical damage taken this time, and deal weapon attribute P.DMG equal to %s% P.ATK to the target (can trigger crit). When equipped with Two-Handed Sword, increases the damage coefficient by 100%. |
| Head Crush | Active | 10 | Increases P.ATK by %s% and Crit DMG by 50% for 40 seconds. Normal attacks now have a %s% chance to cause the target to Bleed for 5 seconds. When Bleeding, the target will take Neutral attribute P.DMG equal to 20% of the caster's P.ATK every second, reducing their P.ATK by 25% and their ASPD by 25%. They are not able to naturally recover HP and SP for the duration of the effect. |
| Spiral Pierce | Active | 10 | Can only be used when equipped with a Spear. Twirls the spear and rapidly thrusts at an enemy target, dealing weapon attribute P.DMG equal to (%s × STR + %s% of P.ATK). Every 80 STR increases the P.ATK coefficient by an additional %s%, up to 2,000%. |
| Concentration | Active | 10 | Marks the target on use. All friendly targets within 30 meters gain the Endure effect and deal %s% more damage to the marked target for 10 seconds. A party member will lose the Endure effect if they are more than 30 meters away from the caster. |
| Call of Justice | Toggle | 10 | Converts VIT to ATK, increasing ATK by 2 for every %s VIT (not including VIT gained through buffs) you have. |
| Joint Beat | Active | 10 | Damage an enemy's joints, reducing their combat capabilities. Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy unit and has a %s% chance to cause them to gain a random debuff for 5 seconds. |
| Self-Ignite | Type 5 | 10 | Gain the Self-Ignite effect on use to inflict heavy damage upon enemies at the cost of your own HP. You will lose 1% of your Max HP every second while also dealing (%s% of Max HP + %s) Neutral sacred physical damage that ignores DEF to nearby enemies. This effect will be removed when your HP falls below 10%. You will be unable to naturally recover HP and SP while under the effect of Self-Ignite, and will be unable to trigger Increase HP Recovery's HP regen effect in PVP. This skill's damage does not work with Lifesteal. |
| Lord's Aura | Active | 10 | After using this skill, ATK of all party members within 30 meters increases by %s% for 120 seconds. A party member will lose this effect if they are more than 30 meters from the caster. |
| Berserk | Active | 10 | Gain the Berserk effect on use. Fully restores HP and empties SP, increases Max HP by %s%, ATK by %s%, and Movement Speed by 30%. Grants the Endure effect, and decreases DEF and M.DEF by 50%. While Berserk is in effect, you cannot actively use skills or healing items, healing effects are decreased by 100%, and HP and SP will not recover naturally. This effect is removed after 30 seconds or when HP falls below 5%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1111)

#### Rune Knight (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Dragon Training | Toggle | 10 | Increases damage dealt by Dragon's Breath by %s% after mounting your dragon, and damage dealt to small and medium Monsters by %s% when mounted with a spear. |
| Dragon Breath - Fire | Active | 10 | The dragon breathes scorching fire, dealing Fire attribute P.DMG equal to %s% of P.ATK to enemies in a 6-meter, 120-degree fan-shaped area at the front. Hit enemies have a %s% chance of being burned, losing 2% Max HP per second for 3 seconds. The burn effect is ineffective against MVP, MINI, and Boss. |
| Dragon Breath - Water | Active | 10 | The dragon breathes chilling air, dealing Water attribute P.DMG equal to %s% of P.ATK to enemies in a 6-meter, 120-degree fan-shaped area at the front. Hit enemies have a %s% chance of being frozen for 3 seconds. |
| Inverse Scale | Active | 10 | Your dragon projects a massive roar, dealing Regular Physical Damage equal to %s% Physical Attack to enemy targets within a 4-meter range, with a %s% chance of inflicting Terror. Targets suffering from Terror will move at random for 3 sec. Terror cannot affect Boss, MVP, or MINI targets. |
| Death Bound | Active | 10 | Inflicts Death Bound on an enemy. When attacked, %s% of lost HP will be converted into Regular Physical Damage and dealt to the bound enemy, along with multiple stacks of Threat for 4 sec (cannot be dispelled). Death Bound will be lifted when the distance between you and the target is greater than 12 meters. |
| Impact Blade | Active | 10 | Charges forward 8 meters in the desired direction and delivers a powerful blow, dealing weapon attribute P.DMG equal to (%s% P.ATK + %s% Max HP) in a 4-meter radius. |
| Rune Shield | Toggle | 10 | Summons the power of the Runes and enchants a shield, increasing the effect of [Unbreakable] when attacked. Each stack of [Unbreakable] increases Final Physical Defense and Final Magic Defense by %s% for 6 sec. Can be stacked up to 5 times, after which a Rune Shield equal to %s% of Max HP for 6 sec. This effect may be triggered once every 24 sec as long as a shield is equipped. |
| Phantom Strike | Active | 10 | Hurls a Spectral Spear in the desired direction, dragging the first enemy it touches back to you and dealing weapon attribute P.DMG equal to %s% of P.ATK. Can only be used when equipped with a Spear. The enemy will be immobilized, and their damage taken will be increased by %s% for 3 seconds when they are dragged back to you. |
| Hundred Spears | Active | 10 | Wields a lance, inflicting 10 quick jabs at a 150-degree fan-shaped area in 3 seconds and dealing weapon attribute P.DMG equal to (%s% of P.ATK + %s × STR) to all targets in range. Each time the target takes damage, the damage of the next Hundred Spears will be increased by 6%. Grants the Endure effect during the effective period. Each jab deals increased damage based on the number of enemies in range, and the increased amount equals the number of targets × 10%. |
| Wind Cutter | Toggle | 10 | Grants 1 stack of Wind Cutter effect every time a normal attack triggers a crit, increasing Crit DMG Bonus by %s% for 3 sec. Stacks up to 6 times. Upon reaching max stacks, deals an additional weapon attribute P.DMG equal to %s% P.ATK to the target each time a crit is triggered. Additional damage can crit as well. |
| Enchant Blade | Toggle | 10 | Enchants a weapon and modifies its attributes. After enhancement, normal attacks and damage will reflect the weapon's skill, with an increased %s% in corresponding elemental damage. This effect will not be triggered if a weapon's attributes are reset. |
| Dark Flame Sword | Active | 10 | Activate the power within your sword, creating a Dark Flame Sword array that follows you and grants you the Dark Flame Sword state for 24 seconds. While Dark Flame Sword is active, each normal attack that hits a target grants the party members within 30 meters a stack of the Dark Flame effect. Each stack of Dark Flame increases the Final Hit by %s% and the Final Crit by %s%. Stacks up to 12 times and lasts for 4 seconds. |
| Ignition Break | Active | 10 | Unleash a downward attack with a weapon, causing the ground to erupt in a violent explosion, inflicting Fire attribute P.DMG equal to %s% of the P.ATK to enemies within a 4-meter range. (Every 80 STR increases the P.ATK coefficient by an additional %s%, up to 1,500%.) Also inflicts a 25% Slow effect on the targets within range for 12 seconds, stacking up to 3 times. This skill can trigger crits, and the cooldown for this skill is reduced by 2 seconds every time a crit is triggered by a normal attack. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1112)

#### Dragon Knight (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Servant Weapon | Toggle | 10 | The Dark Flame Sword summons 6 energy swords that transform into Servant Weapons for the duration the Dark Flame Sword exists. During normal attacks, there is a %s% chance to consume 1 energy sword to deal weapon attribute P.DMG equal to %s% of P.ATK to the target and deal weapon attribute P.DMG equal to %s% of P.ATK to all enemies within 4 meters of the target. The energy sword's damage can trigger crits. Every 5 seconds, 1 new energy sword is replenished, and for every 250% of Final ASPD, the replenishment time is reduced by 0.5 seconds, with a minimum replenishment time of 2.5 seconds for 1 energy sword. |
| Servant Weapon - Sign | Toggle | 10 | When equipped with a Servant Weapon, the range of normal attacks increases by 2 meters. Damage dealt by the Servant Weapon marks the primary target (splash damage does not mark additional enemies). While the target is marked, each time they are attacked by a member of the caster's party, there is a 20% chance to apply 1 additional mark for 10 seconds. When the mark reaches %s stacks, 1 Ultimate Servant Weapon will drop and it lasts for 10 seconds. When a party member picks it up, they instantly replenish 6 energy swords and gain the lv.%s Servant Weapon's damage effect for 10 seconds. If the caster picks it up, their energy swords will be fully replenished. No more than 1 Ultimate Servant Weapon can drop per %s seconds. |
| Servant Weapon - Phantom | Active | 10 | Teleports instantly to the target's side, dealing weapon attribute P.DMG equal to %s% of P.ATK to the target and all enemies within 6 meters of the target. This damage can trigger critical hits, and there's a %s% chance to inflict Blind to the target for 3 seconds. Casting this skill consumes all energy swords. For each 1 energy sword consumed, it increases the damage coefficient by %s%. You need at least 1 energy sword to use this skill. |
| Servant Weapon - Demolition | Active | 10 | Summons the Demolition Sword that orbits around you, with each energy sword dealing weapon attribute P.DMG equal to %s% of P.ATK every second to enemies within 6 meters. This damage can trigger critical damage. Casting this skill consumes all energy swords, and each critical hit restores 1 energy sword. The Demolition Sword lasts for %s seconds. You need at least 1 energy sword to use this skill. |
| Storm Slash | Toggle | 10 | Normal attacks and skills have a chance to grant 1 stack of Storm Force (12% chance for normal attacks, 36% for skills), lasting 8 seconds. Once you've gathered %s stacks of Storm Force, your next attack will trigger a Storm Slash, hitting the target 5 times, with each strike dealing weapon attribute P.DMG equal to %s% of P.ATK. The effect varies by weapon: Two-Handed Sword can trigger critical hits; One-Handed Sword + Shield gains +1% coefficient per 24 VIT (cap 520%); Spear gains +1% coefficient per 24 STR (cap 520%). |
| Dragonic Aura | Active | 10 | Summons a dragon from the sky to rain down blazing flames, scorching the ground and dealing Fire attribute P.DMG equal to %s% of P.ATK to enemies in a straight line. |
| Charging Pierce | Active | 10 | Using Pierce, Spear Stab, Spear Boomerang, Spiral Stab, Phantom Strike, Hundred Spears, or Madness Crusher grants you 1 stack of the Charge effect. When it reaches 12 stacks, you can activate the Pierce effect, dealing extra %s% damage with the skills listed above when using a spear, up to a maximum of 10 times. The Charging Pierce effect lasts for 12 seconds, and no further Charge stacks can be gained during that period. |
| Hack and Slasher | Active | 10 | Unleashes a powerful weapon swing, striking all targets within 4 meters and dealing weapon attribute P.DMG equal to %s% of P.ATK. If wielding a spear, deals bonus damage equal to 40 × STR. If attacking with a one-handed sword, deals bonus damage equal to 1.5% of Max HP and draws a lot of Threat. |
| Madness Crusher | Active | 10 | Harnesses the power of madness and hurls your spear at a targeted area, smashing the ground and dealing weapon attribute P.DMG equal to (%s% P.ATK + 40 × STR) to all enemies within a 6-meter radius. The impact creates a tremor that pulls enemies toward the center of the area and slows them by 33% for 5 seconds. |
| Vigor | Active | 10 | Sacrifices %s% of your Max HP to leave behind a Vigor at your location, lasting up to 12 seconds; it cannot be absorbed by you, but 1 party member can absorb it, gaining the Vigor buff. While under the effect, the party member's skill will be boosted by %s times, and their skill attacks deal bonus damage equal to %s% of the Dragon Knight's Max HP, capped at 400% of their own ATK. The Vigor buff lasts 15 seconds. If no one absorbs it, the caster recovers 10% of their HP when it disappears. |
| Two Handed Defense | Active | 10 | Charges up to enter a defensive stance, gaining %s% Final P.DMG RED and Final M.DMG RED. While charging, MSPD is reduced by %s%. When the charge ends, deals weapon attribute P.DMG equal to %s% of Max HP to all enemies within a 3-meter radius and taunts them for 0.5 seconds. For every additional 0.5 seconds of charging, the taunt range expands by 0.5 meters, the duration extends by 0.5 seconds, and extra damage equal to 0.5% of Max HP is added. |
| Dragonic Ride | Toggle | 10 | A dragon can be mounted during combat. When mounted, using Dragon Breath - Fire, Dragon Breath - Water, and Dragonic Aura increases the skill's damage coefficient by 1% for every %s STR/VIT possessed, up to 400%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1113)
