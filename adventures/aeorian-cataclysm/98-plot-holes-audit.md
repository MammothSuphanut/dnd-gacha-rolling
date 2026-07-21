# Plot Hole Audit — อ่านครบ ACT01-06 (2026-07-21)

Checklist ติดตามงานแก้ปม จากการอ่านทวน EP ทั้ง 34 ตอน (ACT01-06) เทียบกับ canon ใน [00-overview.md](./00-overview.md), [01-the-fragments.md](./01-the-fragments.md), [99-notes.md](./99-notes.md), [RESTRUCTURE-PROPOSAL-wildemount-only.md](./RESTRUCTURE-PROPOSAL-wildemount-only.md)

> ทำทีละข้อได้ตามลำดับ — กลุ่ม A คือปมใหญ่ระดับ cross-act ควรแก้ก่อน กลุ่ม B คือปัญหาเฉพาะ Act กลุ่ม C คือของที่ควรเพิ่มเสริม

## A. ปมใหญ่ระดับ cross-act (แก้ก่อน)

- [x] **A1. Fragment of Wisdom "ชี้ทาง" ไม่มีกลไกรองรับ** — ตั้งแต่ Act 2 (EP3/EP4) ถึง Act 5 ใช้ Fragment of Wisdom ชี้ตำแหน่ง Fragment ถัดไปซ้ำๆ แต่ [01-the-fragments.md](./01-the-fragments.md) นิยามไว้แค่ Advantage/Disadvantage ในการต่อสู้เท่านั้น (ใน Act 1 ความสามารถชี้ทางเป็นของ Messenger ไม่ใช่ Fragment) → ต้องเพิ่ม entry "ชี้ทาง Fragment อื่น" ให้ Fragment of Wisdom อย่างเป็นทางการ ✅ แก้แล้วที่ **01-the-fragments.md**: เพิ่ม "ชี้ทาง (Extended Effect)" ใช้ได้ 1 ครั้ง/วัน บอกทิศทางกว้างๆ เว้นแต่อยู่ใกล้มาก — ออกแบบให้จำกัดเหมือน Fragment อื่น และบังคับให้ต้องมี travel/exploration session จริง (ช่วยแก้ปัญหา Act2/Act4 เรื่องการเดินทางถูกข้ามไปด้วย)
- [x] **A2. ตำแหน่ง Fragment of Zenith ขัดกัน** — Act5 EP2 (Abandoned Ritual Chamber) ปูว่าจุดที่ 5 บนแผนที่ (ถูกลบซ้ำๆ) คือตำแหน่งซ่อน Zenith ให้ตามหาต่อ แต่ EP5 (The Truth Behind Everything) เฉลยว่า Thess ถือ Zenith ติดตัวเองมาตลอด ปมแผนที่จุดที่ 5 หายไปเฉยๆ → ตัดทิ้ง หรือรีไรท์ให้จุดที่ 5 หมายถึงอย่างอื่น (เช่น Aeor Crash Site) ✅ แก้แล้วที่ **EP02 - The Abandoned Ritual Chamber.md**: ตัดประโยค "นี่คือจุดที่ Zenith ถูกซ่อนอยู่" ทิ้ง เหลือแค่ปริศนาจุดที่ 5 ที่ยังไม่มีคำตอบ (ไม่ผูกกับ Zenith อีกต่อไป) — ระหว่างตรวจสอบพบปัญหา pattern เดียวกันใน Act 4 ด้วย ดูรายละเอียดที่ B-Act4
- [x] **A3. "กระจาย Fragment ทั้ง 5" ขัดกับ "เก็บ Zenith ไว้เองตลอด"** — บทเฉลยของ Thess (Act5 EP5) พูดสองอย่างที่ขัดกันในประโยคใกล้กัน → แก้ถ้อยคำให้ชัดว่า "กระจาย 4 ชิ้น เก็บ Zenith ไว้เอง" ✅ แก้แล้วที่ **EP05 - The Truth Behind Everything.md** บรรทัด 58
- [x] **A4. ตรรกะ "ใช้ Fragment กัดกร่อนโลก" ไม่ครอบคลุมตัว Thess เอง** — ไม่เคยอธิบายว่าทำไม Thess ถือ/ใช้ Zenith มานับพันปีไม่ทำให้โลกพังไปนานแล้ว → เพิ่มบทอธิบาย (เช่น Lich ไม่สร้าง Stress แบบสิ่งมีชีวิต หรือเขาระงับการใช้ Zenith จนจำเป็นจริงๆ) ✅ แก้แล้วที่ **00-overview.md**: Fragment ทั้ง 5 ชิ้นคือทั้งส่วนประกอบ+ตัวควบคุมของ Ofear พลังของมันมหาศาลเกินกว่าจะควบคุมได้ด้วยตัวเอง — Fragment ชิ้นเดียวที่แยกอยู่ (Zenith กับ Thess) กัดกร่อนกฎเกณฑ์แค่ทีละน้อยเท่านั้น ต่างจากตอนรวมครบ 5 ชิ้นที่จะปลดปล่อยพลังทำลายล้างเต็มรูปแบบ — นี่คือเหตุผลที่ Zenith อยู่กับ Thess มานับพันปีโดยไม่ทำให้โลกพังไปก่อน
- [x] **A5. พิธีคืน Fragment (Act6 EP2-3) ข้ามกฎการถอด Fragment** — กฎหลักบอกว่าถอด Fragment ได้เฉพาะ True Death หรือ Messenger's Ritual (เสีย 1HP+2 Exhaustion ต่อชิ้น ยกเว้น Genesis) แต่ Act 6 ให้วางลงแท่นเฉยๆ ทั้ง 5 ชิ้นไม่มีพิธีถอด → เพิ่มประโยคอธิบาย (เช่น พิธีปิดผนึกทำหน้าที่แทน Messenger's Ritual โดยไม่มีผลเสีย) ✅ แก้แล้วที่ **EP03 - The Return of the Fragments.md**: เพิ่มบทพูด Messenger อธิบายว่าแท่นบูชาเชื่อมตรงกับ Ofear เอง ดึง Fragment ออกโดยไม่มีผลเสีย
- [x] ~~A6. Messenger พูดว่า "เพิ่งมีคนขโมย Fragment เมื่อไม่นานมานี้"~~ — **ไม่ใช่ปัญหาจริง**: ตรวจสอบกับ [EP05 Act5 "The Truth Behind Everything"](./ACT05-what-the-sea-consumed/EP05%20-%20The%20Truth%20Behind%20Everything.md#L58) และ [99-notes.md](./99-notes.md#L9) แล้วพบว่า Thess เองคือ "ผู้บุกรุก" ที่กลับไปเดินเครื่อง Ofear ที่ Aeor Crash Site และกระจาย Fragment ออกไปจริง — บทพูดเดิมของ Messenger ถูกต้องอยู่แล้ว ตัวปัญหาจริงคือ **00-overview.md** (บรรทัด Ofair คืออะไร) ที่ยังมี lore เก่าค้าง (เขียนว่า "ซ่อนมาตั้งแต่ Calamity" + "ตราประทับเสื่อมตามกาลเวลา") ไม่ตรงกับ Act 5 ✅ **แก้แล้วที่ 00-overview.md** แทน — ปรับข้อความให้ตรงกับเนื้อเรื่องจริง (Thess จงใจกระจาย 4 ชิ้น เก็บ Zenith ไว้เอง)
- [x] **A7. Messenger เพศสลับ** — Act1 EP6 เรียก "เขา" (ผู้ชาย) แต่ตั้งแต่ EP7 เป็นต้นไปจนจบเรื่องเรียก "เธอ" ตลอด → แก้จุดเดียวใน EP6 ให้เป็น "เธอ" ✅ แก้แล้ว
- [x] **A8. Terasaq ตื่นโดยไม่มีสาเหตุชัดเจน** (Act5 EP2 ท้ายตอน) — ห้องเริ่มสั่นระหว่างตัวละครแค่ตรวจสอบแท่นบูชา ไม่มี action ของผู้เล่นที่ชัดว่าเป็นตัวกระตุ้น → ผูก trigger ให้ชัด (เช่น ทอย check พลาด/หยิบไอเทมเฉพาะ) ✅ แก้แล้วที่ **EP02 - The Abandoned Ritual Chamber.md**: ผูก trigger กับการแตะแท่นหินเพื่อดูนิมิต (สายเวทมนตร์ตอบสนองต่อการรบกวนแบบดีเลย์) นอกจากนี้ยังทำให้โน้ต "Terasaq เป็นเนื้อหาเสริมหลังแคมเปญจบ" เป็นทางการชัดเจนขึ้น (Optional Level 20 Endgame Quest) ที่ **99-notes.md** และ **Act6 EP03**
- [x] **A9. EP1 Act1 ไม่ได้ foreshadow "ลัทธิเป็นหมากของ Thess" ให้ผู้เล่นจริง** — ข้อความนี้มีแค่ใน DM-only note ไม่มี read-aloud/เบาะแสที่ผู้เล่นค้นพบได้ → ฝัง hint เล็กๆ ที่ผู้เล่นสัมผัสได้จริงตั้งแต่ EP1 เพื่อให้ Act 5 reveal รู้สึก earned มากขึ้น ✅ แก้แล้วที่ **EP01 - Escape from the Cult.md** (A2. Guard Post): เพิ่ม Perception/Investigation check ให้เห็นสัญลักษณ์ดวงตาแตกร้าวบนเข็มขัดยามลัทธิ — ใช้ motif เดียวกับที่ปรากฏซ้ำใน Act 3 (Vault of Shadows), Act 4 (เข็มกลัดของ Rennick), Act 5 (แผ่นจารึก EP2) ทำให้เป็นเส้นด้ายที่ผู้เล่นสัมผัสได้จริงตลอดแคมเปญ

## B. ปัญหาเฉพาะ Act

### Act 1
- [ ] Mila Teno, Grok, Chin หายไปเฉยๆ หลัง EP1/EP6 ไม่ถูกพูดถึงอีก
- [ ] Hank จ่ายรางวัล 500gp สำหรับเควสเล็ก มากกว่ารางวัลรวมจาก Elro (200+200gp) หลายเท่า โดยไม่มีเหตุผลในเรื่อง
- [ ] ความสามารถใหม่ของ Fragment of Wisdom ที่ Messenger มอบท้าย Act (EP7) ไม่ถูกบันทึกใน 01-the-fragments.md

### Act 2
- [ ] Brother Kesh (NPC มีชื่อ มีบทพูดใน EP5) หายไปตอนบอสไฟต์ EP6 ไม่ระบุชะตากรรม
- [ ] Druvenlode ทั้งเมือง (Uvilia Whek, Fenny Oskett, Grum Vashtel, Brack Ferrowint) ไม่มี epilogue เลยใน EP7 ทั้งที่ Uthodurn ได้ wrap-up เต็ม — ไม่สมดุล
- [ ] ช่วงเดินทาง Rexxentrum→Druvenlode ถูกข้ามไปเฉยๆ ไม่มีฉากคั่น

### Act 3
- [ ] Penumbra Range ถูกอธิบายว่าคั่นระหว่าง Xhorhas กับ "Blightshore" (ไม่เคยนิยามที่อื่น) แต่ Ghor Veles ถูกอ้างว่าเป็นดินแดน Kryn ("หน่วยลาดตระเวนของเรา") — ขัดกันเรื่องเขตแดน
- [ ] Fragment of Stasis มี AoE ทรงกลม 20ft แต่ทุกฉากใช้แบบ single-target เท่านั้น ไม่เคยโชว์ AoE จริง
- [ ] EP4 มีคำว่า "charges" ของ Fragment ทั้งที่กลไกจริงเป็น Stress-based ไม่มีระบบ charge

### Act 4
- [x] EP3 มี DC16 save แย่ง Fragment คืนจาก Rennick แต่ไม่ระบุผลถ้าเซฟผ่าน ✅ แก้แล้วที่ **EP03 - The Thief in Silver.md** และ **EP05 - The Ruins of Sepesca.md**: พบว่าปัญหารากลึกกว่านั้น — Fragment of Genesis ถูกเขียนเป็นไอเทมพกพาธรรมดา (ถุงผ้าในมือ Rennick) ตลอด Act 4 ขัดกับกฎ core rule ที่ Fragment ต้องผสานเข้าร่างกาย ถอดได้เฉพาะ True Death เท่านั้น (ตรวจพบระหว่างค้นหา pattern เดียวกับ A2) แก้โดยให้ Rennick ผสานกับ Fragment จริงตั้งแต่ EP3 (ระบุผลทั้งสองแบบของ DC16 save ชัดเจน — ผลลัพธ์เหมือนกันคือผสานสำเร็จ ต่างแค่ flavor) และแก้ EP5 ให้ต้องสังหาร Rennick จริง (True Death) เท่านั้นถึงจะได้ Fragment คืน ตัดทางลัด "หนีสำเร็จแต่ Fragment หลุดมือ" ออก
- [ ] Capt. Meris Vale ถูกโปรยชื่อ 3 ครั้งว่าจะโผล่มา แต่ไม่เคยปรากฏตัวจริงในบทพูด
- [ ] เฟรม "ระยะทางไกลสุดในแคมเปญ" ไม่ค่อยรู้สึกจริง เพราะ EP1 กับ EP4 ใช้โครง skill challenge เดียวกันทุกอย่าง
- [ ] Selka Windrow หายไปหลัง EP3 ไม่มีคำอธิบาย

### Act 5
- [ ] ไม่มีปัญหาใหญ่เพิ่มเติมนอกจากที่ระบุในกลุ่ม A (จุดเฉลยหลักครบตามที่ตั้งใจ)

### Act 6
- [ ] ไม่มีการอธิบายวิธีเดินทางจาก Darktow Isle กลับ Eiselcross เลย (เรือ? กี่วัน?)
- [ ] ทางเลือก Astral Nexus ให้ DM "บรรยายแยกทีละคน" แต่ไม่มีฉากสคริปต์สำหรับโมเมนต์ที่เพื่อนร่วมทีมเลือกต่างกัน (คนหนึ่งไปเป็นเทพ อีกคนอยู่ต่อ)

## C. สิ่งที่ควรเพิ่ม

- [ ] เขียนกลไก "ชี้ทาง" ของ Fragment of Wisdom ลงใน 01-the-fragments.md อย่างเป็นทางการ (ผูกกับ A1)
- [x] เพิ่มบรรทัดอธิบายว่าทำไมการใช้ Fragment ของ Thess เองไม่กัดกร่อนโลกเหมือนของตัวละคร (ผูกกับ A4) ✅ แก้แล้วที่ 00-overview.md
- [ ] เพิ่มฉาก/บทพูดสั้นๆ ระบุ trigger ที่ชัดเจนว่าอะไรทำให้ Terasaq ตื่น (Act5 EP2, ผูกกับ A8)
- [ ] เพิ่ม epilogue ของ Druvenlode ใน Act2 EP7 ให้สมดุลกับ Uthodurn
- [ ] เพิ่มฉากสคริปต์สั้นๆ สำหรับโมเมนต์อำลาระหว่างตัวละครที่เลือกต่างกันใน Astral Nexus ending (Act6 EP3)
- [x] แก้ประโยค Messenger เพศ/ไทม์ไลน์ผิดใน Act1 EP6 จุดเดียว (ผูกกับ A6, A7) ✅ เพศแก้แล้ว (A7) — ส่วนไทม์ไลน์พบว่าไม่ใช่บั๊กจริง (A6 non-issue)

---
[← ภาพรวม](./00-overview.md) · [Notes](./99-notes.md)
