# Map Workflow — View / Region / Battle Map

เอกสารอ้างอิงสำหรับตัดสินใจว่าแมพแต่ละจุดในแคมเปญควรทำเป็นประเภทไหน และใช้เครื่องมืออะไร ใช้คู่กับทุกแอดเวนเจอร์ในโฟลเดอร์นี้ (ไม่ผูกกับแคมเปญใดแคมเปญหนึ่ง)

## เครื่องมือที่ใช้อยู่
- **AI image gen (Gemini)** — สำหรับภาพ illustration/บรรยากาศ และแมพสไตล์ top-down ที่ไม่ต้อง grid แม่นยำ
- **Dungeon Alchemist** — สำหรับ battle map ที่ใช้เล่นจริงใน FoundryVTT (ซื้อแล้ว)

## แมพ 3 ประเภท

| ประเภท | ลักษณะการใช้งาน | ความละเอียด | เครื่องมือ |
|---|---|---|---|
| **View map** | ใช้ประกอบการบรรยายเป็นหลัก (handout, cover art, ภาพบรรยากาศให้ผู้เล่นดู) | ไม่ต้อง grid, ไม่ต้องผังห้อง | **AI image gen** |
| **Region map** | แมพระดับเมือง/พื้นที่กว้าง ให้ตัวละครเดิน สำรวจ หรือเล่นได้จริง แต่ไม่ต้องละเอียดถึงระดับ combat encounter — ลูกครึ่งระหว่าง view map กับ battle map | มี layout คร่าวๆ (ถนน, โซน, จุดสำคัญ) แต่ไม่ต้อง grid/wall แม่นยำ | **AI image gen** (สไตล์ top-down/แผนที่) |
| **Battle map** | แมพที่ใช้ในการต่อสู้จริง เช่น dungeon, ภายในร้าน, ภายในบ้าน มี token วางบน Foundry | ต้องการ grid, wall, lighting data แม่นยำ | **Dungeon Alchemist** |

## เช็คลิสต์ตัดสินใจอย่างเร็ว
ถามทีละข้อ ข้อไหน "ใช่" ก่อน ให้ใช้ทางนั้น:
1. จะใช้แมพนี้ตอนต่อสู้ + วาง token ใน Foundry ไหม? → ถ้าใช่ = **Battle map (Dungeon Alchemist)**
2. ตัวละครจะเดิน/สำรวจในแมพนี้ได้ (เช่น เดินในเมือง, เลือกเส้นทาง) แต่ไม่ใช่ฉาก combat? → ถ้าใช่ = **Region map (AI image gen แบบ map-style)**
3. ถ้าไม่เข้า 2 ข้อบน = **View map (AI image gen ภาพประกอบ/บรรยากาศ)**

## Claude ช่วยอะไรได้ในแต่ละทาง

### ทาง View map (AI image gen)
- เขียนพรอมต์ภาษาอังกฤษละเอียด (สถานที่ โทนภาพ มุมกล้อง แสง) จากเนื้อเรื่องในไฟล์ EP/CH ที่เกี่ยวข้อง

### ทาง Region map (AI image gen แบบ map-style)
- สรุป layout คร่าวๆ จากเนื้อเรื่อง: โซน/ย่านสำคัญ, เส้นทางหลัก, จุดสังเกต (landmark) ที่ต้องเห็นในแมพ
- เขียนพรอมต์ภาษาอังกฤษสำหรับภาพแมพสไตล์ top-down/illustrated map (ไม่ใช่ scene illustration ธรรมดา) ระบุ art style, labels/landmark ที่ต้องการให้เห็น

### ทาง Battle map (Dungeon Alchemist)
Dungeon Alchemist **ไม่ใช่ text-to-map** — ต้องวาดผังห้องเองแล้วติด tag ธีมให้ AI ช่วยจัดของ Claude จึงช่วยได้โดย:
- สรุป **room list**: ห้องมีอะไรบ้าง ขนาดโดยประมาณ ทางเชื่อม จุดเด่นที่ต้องมี (จากเนื้อเรื่องในไฟล์ EP)
- แนะนำ **theme tag** ที่ควรเลือกให้แต่ละห้องในโปรแกรม (เช่น "ritual chamber", "collapsed corridor", "guard post")
- ช่วยตรวจสอบ/แก้ปัญหาตอน export ไป Foundry (wall/lighting JSON, grid alignment)

## กฎการเขียนพรอมต์ AI image gen (สำคัญ)
AI image gen มักเติมป้าย/label/รายละเอียดเกินที่สั่งเสมอ (เช่น เขียน "Road to Uthodurn", "Road to X" ตามชื่อสถานที่ที่พูดถึงในพรอมต์ทั้งที่ไม่ได้ขอให้ใส่ป้ายถนน) — ให้ระวังเป็นพิเศษตอนเขียนพรอมต์สำหรับ View/Region map:

- ใส่เฉพาะ label/ชื่อสถานที่ที่ระบุไว้ชัดเจนว่า "ต้องการให้เห็นในภาพ" เท่านั้น ห้ามให้ AI เดาเพิ่มป้ายชื่อถนน ทิศทาง หรือสถานที่นอกเหนือจากที่ระบุ
- ถ้าพูดถึงสถานที่อื่นในพรอมต์แค่เพื่อบอกบริบท (เช่น "ประตูเหนือที่เป็นทางไป Uthodurn") แต่ไม่ต้องการให้มีป้ายชื่อในภาพ ให้เขียนกำกับท้ายพรอมต์ชัดๆ ว่า **"no text labels other than the ones listed above — do not add road signs, direction labels, or place names not explicitly listed"**
- เขียน list ชื่อ label ที่ต้องการทั้งหมดแบบชัดเจนเป็นข้อๆ แยกจากส่วนบรรยายฉาก แล้วปิดท้ายด้วยประโยคห้ามเพิ่มเติมเสมอ

## หมายเหตุ export → Foundry
Dungeon Alchemist render แบบ 3D ตอนสร้าง แต่ export เป็นภาพ 2D top-down (Orthographic) + ไฟล์ wall/lighting JSON แยก ใช้กับ Foundry (2D) ได้ปกติ ไม่มีปัญหาเรื่องมิติ

## Reference เพิ่มเติม
- [DUNGEON-ALCHEMIST-REFERENCE.md](./DUNGEON-ALCHEMIST-REFERENCE.md) — sidebar tools, room preset ทั้งหมด, object categories, export → Foundry steps, และกับดักที่เจอมาแล้วตอนใช้งานจริง
- [canon-reference.md](./canon-reference.md) — ก่อนสรุป layout/landmark ของ Region/View map ที่เป็นสถานที่ Critical Role canon (เช่น Rexxentrum, Uthodurn) ให้ค้น Critical Role Wiki ก่อนแต่งเองตามกฎในไฟล์นี้
