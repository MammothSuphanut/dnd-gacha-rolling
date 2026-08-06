# Aura Knight — Subclass Concepts (ร่างแนวคิด ยังไม่ใช่กติกาเต็ม)

> ไฟล์นี้เป็น **scratch doc เก็บ concept** สำหรับ subclass ทั้ง 6 ของ Aura Knight ก่อนลงมือออกแบบกลไกเต็มทีละตัว — ไม่ใช่กติกาที่เล่นได้จริง ยังต้องผ่านรอบออกแบบ+balance check ตามระบบ `/build-class` ก่อนใช้ในเกม
>
> ธีมทั้ง 6 บัลลังก์อิงจาก canon จริงของ **Throne of Seal (神印王座)** — ดูที่มา/แหล่งอ้างอิงใน [Aura-Knight.md § Designer's Note](Aura-Knight.md#designers-note)
>
> **หมายเหตุ**: เดิมมีบัลลังก์ที่ 7 "อัศวินบำเพ็ญคู่" (concept ใหม่ของโปรเจกต์ ไม่มีใน canon) เก็บไว้ในไฟล์นี้ด้วย — ย้ายไปเป็น **Path ที่ 3 ("Formless") ในเลเวล 1 — Choose Your Path** แทนแล้ว เพราะแก่นของ concept คือการสลับสไตล์การเล่น ไม่ใช่การเรียนรู้ technique พิเศษแบบ subclass ดูรายละเอียดที่ [Aura-Knight.md § เลเวล 1 — Choose Your Path](Aura-Knight.md#เลเวล-1--choose-your-path)
>
> **แนวทางออกแบบร่วม** (ตามที่วางไว้ใน [Aura-Knight.md § Subclass](Aura-Knight.md#subclass)): แต่ละ subclass ควร "ต่อยอด/อัพเกรด Technique ที่มีอยู่แล้ว" เป็นหลัก ไม่ใช่เพิ่มกลไกใหม่แยกขาด — ในตารางด้านล่าง คอลัมน์ "ต่อยอดจาก" คือ technique/feature เดิมที่ subclass นั้นควรผูกด้วย

---

## 1. บัลลังก์แห่งนิรันดร์และการสรรค์สร้าง
**EN**: Throne of Eternity and Creation · **CN**: 永恒与创造之神印王座

- **Flavor**: บัลลังก์สูงสุด/ต้นแบบแท้จริงในเรื่อง (ของ Long Haochen พระเอก) — ไม่ใช่ของจำลองเหมือนอีก 5 บัลลังก์ สื่อถึง "การสร้างสิ่งใหม่จากความว่างเปล่า" และ "ความคงอยู่ชั่วนิรันดร์"

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- เลเวล 3: Eternity: Action, 1 Aura ต่อ stack: รักษา HP ให้ตัวเองหรือพันธมิตร 1 คนในระยะ 30 ft เท่ากับ **1d4 ต่อ stack** ไม่มีเพดาน stack
- เลเวล 6: Creation: Pure White Blade สามารถจ่าย Aura เพิ่มเพื่อโจมตีเป้าหมายเพิ่มในการโจมตีครั้งเดียวกัน (ทุกเป้าหมายต้องอยู่ในระยะที่ Pure White Blade คำนวณไว้) — จ่ายเพิ่ม **5 Aura** โจมตีเป้าหมายที่ 2 ได้, จ่ายเพิ่มอีก **10 Aura** (รวม 15) โจมตีเป้าหมายที่ 3 ได้
- เลเวล 10: True Eternity: สามารถจ่าย **1 Aura ต่อ stack** (อัตราเดียวกับ Eternity) เพื่อเพิ่ม Temp HP ได้ **1d4 ต่อ stack** ไม่มีเพดาน stack
- เลเวล 14: True Creation: Pure White Blade ทะลวง Resistance กายภาพ และ ได้ Resistance ต่อกายภาพ 1 นาที *(ย้ายมาจาก lv6 เดิม — เลื่อนช้าลงเพราะแรงเกินไปสำหรับเลเวลต้น)*
- เลเวล 17: Throne of Eternity and Creation (1 min / longrest): Aura 30 ft ภายใน 1 Action สามารถโจมตีด้วย Pure White Blade หรือ Eternity ได้สูงสุด Wis เป้าหมาย ต่อ Action (จ่าย cost แยกต่อเป้าหมาย)

---

## 2. บัลลังก์แห่งความหวาดกลัวและโศกเศร้า
**EN**: Throne of Fear and Sorrow · **CN**: 恐惧与悲伤之神印王座

- **Flavor**: เจ้าของจริงในเรื่อง (Han Yu) มีตำแหน่ง "อัศวินแห่งการทำลายและการให้อภัย" — dual เข้ากับความขัดแย้งในตัว: ทำลายล้างสุดขั้ว แต่กลับให้อภัยได้ เหมาะกับอัศวินที่ทำให้ศัตรูหวาดกลัวก่อนจะจบด้วยความเมตตา

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- เลเวล 3: Sorrow's Bargain: **ทุกครั้งที่ใช้ BA แปลง Aura** จะสามารถจ่าย HP = 3×WIS **modifier** เพื่อรับ Aura เพิ่มเท่ากับ WIS modifier
- เลเวล 6: Fear's Bargain: การโจมตีที่ใช้ Focused Edge ถ้า Attack Roll >= AC เป้าหมาย +15 + Proficiency Bonus ของเป้าหมาย จะนับว่าเป็นการ Critical Hit — **ใช้ได้สูงสุด 1 ครั้ง/เทิร์น** แม้เทิร์นนั้นจะโจมตีหลายครั้ง (แต่ละครั้งยังต้องจ่าย Focused Edge cost แยกกันตามกฎ [Aura-Knight.md § Technique หลายครั้งต่อเทิร์น](Aura-Knight.md#aura-technique) ตามปกติ — cap นี้กันไม่ให้ combo กับ technique ที่โจมตีถี่แล้วได้ auto-crit รัวหลายจานต่อเทิร์น)
- เลเวล 10: True Sorrow's Bargain: เมื่อใช้ BA แปลง Aura จะสามารถจ่าย HP = 2×WIS modifier เพื่อรับ Aura เพิ่มเท่ากับ WIS modifier
- เลเวล 14: True Fear's Bargain: การโจมตีที่ใช้ Focused Edge และดาเมจ Critical Hit ในครั้งนี้จะเป็น 3 เท่า จาก 2 เท่า (ยังอยู่ภายใต้ cap 1 ครั้ง/เทิร์นจาก Fear's Bargain)
- เลเวล 17: Throne of Fear and Sorrow (1 min / longrest): เมื่อใช้ BA consume Spell slot มาเป็น Aura สามารถจ่าย **Max HP 20** (หายไปจนกว่าจะทำ Long Rest ครั้งถัดไป จึงฟื้นคืนเต็ม ไม่ใช่เสียถาวร) เพื่อรับ Aura เพิ่ม **10 หน่วย** ได้ dash และ disengage

---

## 3. บัลลังก์แห่งวันวิบัติและการเข่นฆ่า
**EN**: Throne of Doom and Slaughter · **CN**: 末日与杀戮之神印王座

- **Flavor**: เจ้าของจริง (Long Xingyu) ตำแหน่ง "อัศวินแห่งการพิพากษาและการไต่สวน" — สายบุกทำลายล้างเพียวๆ ธีม "ผู้พิพากษาที่ลงทัณฑ์ด้วยกำลัง" ตรงกับ Retribution path เป๊ะที่สุดในบรรดา 6 บัลลังก์

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- ต้องเลือก Retribution เท่านั้น
- เลเวล 3: The Slaughter: เมื่อโจมตีครั้งที่ 3 ด้วย Cross Slash (นับการโจมตีปกติด้วย) จะโจมตีเพิ่มอีก 1 ครั้ง
- เลเวล 6: The Doom: การโจมตีด้วย Cross Slash จะได้รับโบนัสดาเมจ +Wisdom bonus ทุกครั้งที่โจมตี 
- เลเวล 10: The True Slaughter: เมื่อโจมตีครั้งที่ 6 ด้วย Cross Slash (นับการโจมตีปกติ และ The Slaughter ด้วย) จะโจมตีเพิ่มอีก 1 ครั้ง
- เลเวล 14: The True Doom: การโจมตีด้วย Cross Slash จะได้รับโบนัสดาเมจ +Proficiency bonus ทุกครั้งที่โจมตี 
- เลเวล 17: Throne of Doom and Slaughter (1 min / longrest): ทุกครั้งที่โจมตีการโจมตีครั้งถัดไปจะแรงขึ้น 2 จนกว่าจะจบเทิน และได้ speed +10 ทุกครั้งที่โจมตี

---

## 4. บัลลังก์แห่งการพิทักษ์และความเมตตา
**EN**: Throne of Protection and Mercy · **CN**: 守护与怜悯之神印王座

- **Flavor**: เจ้าของจริง (Yang Haohan) ตำแหน่ง "อัศวินแห่งการป้องกันและการประสานงาน" — จับคู่ตรงกับ Guardian path เป๊ะที่สุดในบรรดา 6 บัลลังก์ เน้นปกป้องทีมและงานประสานงาน (support จริงจัง ไม่ใช่แค่ tank เดี่ยว)

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- ต้องเลือก Guardian เท่านั้น
- เลเวล 3: The Protection: เลือกเพื่อนร่วมทีม 1 คน (ไม่ใช่ตัวเอง) ในระยะ 30 ft เป็นเป้าหมาย — ใช้ Aegis Aura ปกป้องเป้าหมายนั้นแทนตัวเองได้ โดยต้องจ่าย **Reaction** เพิ่มจาก Aura cost ปกติ (ใช้กับตัวเองยังฟรีเหมือนเดิม ไม่เสีย Reaction)
- เลเวล 6: The Mercy: ทุก 2 hp ที่เสียไปจะได้ 1 Aura
- เลเวล 10: The True Protection: Steadfast Aura ใช้กับเป้าหมายเดียวกับ The Protection (เพื่อน 1 คนในระยะ 30 ft) ได้เช่นกัน โดยต้องจ่าย **Reaction** เหมือนกัน
- เลเวล 14: The True Mercy: เป้าหมายได้ temp hp 1 หน่วยทุก 2 Aura ที่ใช้ไปใน Aegis Aura หรือ Steadfast
- เลเวล 17: Throne of Protection and Mercy (1 min / longrest): **ตัวเอง** Speed เหลือ 0 ตลอดช่วงเวลานี้ (สละการเคลื่อนที่ตัวเองเพื่อโปรเจกต์บัฟ) แลกกับเพื่อนร่วมทีมในระยะ 120 ft ได้รับ: ศัตรูที่โจมตีพวกเขา disadvantage, พวกเขาได้ Advantage ใน Saving Throw, และได้ AC+1

---

## 5. บัลลังก์แห่งปัญญาและจิตวิญญาณ
**EN**: Throne of Wisdom and Spirit · **CN**: 智慧与精神之神印王座

- **Flavor**: เจ้าของจริง (Zhang Fangfang) ตำแหน่ง "อัศวินแห่งการตรัสรู้และการสืบทอด" — ธีมนักปราชญ์/ผู้ถ่ายทอดความรู้ เหมาะกับสายที่เก่ง utility นอกคอมแบตและ "ส่งต่อพลัง"

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- เลเวล 3: The Wisdom: Clarity Aura ใช้กับเพื่อนในระยะ 30 ft ได้
- เลเวล 6: The Spirit: เมื่อใช้ Clarity Aura กับ Skill Check ใดๆ ถ้าจ่าย Aura รวมอย่างน้อย **5 หน่วย** ในครั้งนั้น (นับรวมกับ stack +1/Aura ปกติ) สามารถ **reroll** ผลการทอย Skill Check นั้นได้ 1 ครั้ง โดยต้องใช้ผลที่ทอยใหม่เสมอ (เลือกกลับไปใช้ผลเดิมไม่ได้)
- เลเวล 10: The True Wisdom: Adventage ในการทอย Skill check เมื่อใช้ Clarity Aura
- เลเวล 14: The True Spirit: เกณฑ์ขั้นต่ำของ The Spirit ลดลงจาก **5 Aura เหลือ 3 Aura** *(ตัวเลขนี้เป็นข้อเสนอ ปรับได้ถ้าต้องการ)*
- เลเวล 17: Throne of Wisdom and Spirit (1 min / longrest): เลือกเพื่อน 1 คน (ไม่ใช่ตัวเอง) ในระยะ 30 ft — เป้าหมายนั้นได้ advantage ในการทอย attack roll และ skill check ตลอดช่วงเวลานี้ ศัตรูที่ทำ Saving Throw ต่อเอฟเฟกต์ที่เป้าหมายนั้นสร้างขึ้นจะ disadvantage

---

## 6. บัลลังก์แห่งระเบียบและกฎเกณฑ์
**EN**: Throne of Order and Law · **CN**: 秩序与法则之神印王座

- **Flavor**: เจ้าของจริง (Long Tianyin) ตำแหน่ง "อัศวินแห่งการควบคุมและการจำกัด" — ธีมนี้ผูกกับข้อกำหนด **Lawful alignment** ของทั้งคลาสได้แนบสนิทที่สุด (ระเบียบ/กฎ = แก่นของ Lawful) เหมาะเป็น subclass "ตัวแทนแท้ๆ" ของธีม Aura Knight

**เลเวลที่ได้ (เว้นว่างไว้ก่อน — จะแปลง concept ด้านบนมาใส่ทีหลัง)**
- เลเวล 3: The Order: Swift Aura ใช้กับเพื่อนร่วมทีมในระยะ 30 ft เคลื่อนที่ได้ทันทีเท่ากับ speed ของ Swift Aura — เพื่อนที่ยินยอมสามารถจ่าย **Reaction** ของตัวเองเพื่อโจมตีด้วยอาวุธ 1 ครั้งทันทีหลังเคลื่อนที่จบ
- เลเวล 6: The Law: Swift Aura ทำให้ไม่โดน Opportunity Attack
- เลเวล 10: The True Order: เพื่อที่ได้รับผลของ Swift Aura จะได้รับ Speed เท่ากับของ Swift Aura เมื่อเข้าเทินตัวเอง
- เลเวล 14: The True Law: Swift Aura ทำให้ได้รับสถาณะ Dodge
- เลเวล 17: Throne of Order and Law (1 min / longrest): สามารถเลือกเป้าหมาย Swift Aura ได้ครั้งละ Wis เป้าหมาย