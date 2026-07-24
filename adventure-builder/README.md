# Adventure Builder — วิธีใช้

โฟลเดอร์นี้รวมเครื่องมือช่วยออกแบบ D&D Adventure แบบสัมภาษณ์ทีละคำถาม จนได้ adventure outline ที่มีรายละเอียดครบ มี 2 วิธีใช้งาน แล้วแต่ว่าจะใช้ที่ไหน

ทุก adventure ที่สร้างผูกอยู่กับ meta-campaign หลัก **"Astral Nexus: Constellation Protocol"** (ดูเนื้อเรื่องเต็มที่ [astral-nexus-lore.md](./astral-nexus-lore.md)) — บทสัมภาษณ์จะมีคำถามเพิ่มว่า adventure นี้เชื่อมกับ "เมล็ดพันธุ์แห่งการทำลายล้าง" ในเรื่องหลักอย่างไร แล้วแทรกเป็นบทนำสั้นๆ ใน `00-overview.md` และบทส่งท้ายใน EP สุดท้าย

ทุก adventure ยังใช้**ระบบ Stress กลางเดียวกัน**ตามกฎใน [stress-system.md](./stress-system.md) ถ้ามีกลไกในเรื่องที่ให้ตัวละครรับ Stress (เช่น item พิเศษ, สภาพแวดล้อมสุดขั้ว) — ให้ลิงก์ไปไฟล์นั้นแทนการนิยามผลลัพธ์ของ Stress ซ้ำเอง

ทุก adventure ยังใช้**กฎอ้างอิง Critical Role Wiki**ตามใน [canon-reference.md](./canon-reference.md) — ก่อนแต่งรายละเอียดสถานที่/NPC/องค์กรที่ชื่อซ้ำหรือใกล้เคียงกับ Critical Role canon (Rexxentrum, Uthodurn, Kryn Dynasty ฯลฯ) ให้ค้น Wiki ก่อนเสมอ แทนการเดาขึ้นเอง

ทุก adventure ยังใช้**โครงสร้างไฟล์/โฟลเดอร์เดียวกัน**ตามกฎใน [structure-guide.md](./structure-guide.md) — สรุปสั้นๆ: root มีไฟล์ชุดเดิมเสมอ (`00-overview.md`, `01-hook-and-antagonist.md`, `02-npcs.md`, `99-notes.md`) และ**มีโฟลเดอร์ `ACT0X-slug/` อย่างน้อย 1 อันเสมอ** (แม้แต่ one-shot ก็มี `ACT01-slug/` หนึ่งโฟลเดอร์ ไม่มีข้อยกเว้น) Chapter brief เป็นไฟล์แบน `CH0X-slug.md` ส่วนไฟล์ journal เต็มของแต่ละ EP ตั้งชื่อ `EP0Y - ชื่อตอนเต็ม.md` (เลขนับต่อเนื่องทั้ง Act ไม่รีเซ็ตต่อ Chapter, ไม่มี `CH0X-` นำหน้าแม้ Act จะมีหลาย Chapter ก็ตาม) — ไม่มีโฟลเดอร์ `journal/` แยก ไฟล์ journal เต็มอยู่ชั้นเดียวกับไฟล์ outline/brief ของมันเสมอ

## วิธีที่ 1: ใช้ผ่าน Claude Code (แนะนำ)

พิมพ์คำสั่งนี้ในเทอร์มินัล Claude Code ที่รันอยู่ในโปรเจกต์นี้:

```
/build-adventure
```

หรือใส่ชื่อ adventure ไปด้วยเลยก็ได้:

```
/build-adventure บุกรังหมาป่าเงา
```

Claude จะสัมภาษณ์ทีละหัวข้อ (ขนาด adventure, level range, theme, setting, hook, antagonist, stakes, จุดเชื่อมกับ Constellation Protocol, จำนวน EP/session, NPC, องค์ประกอบพิเศษ) — คำถามแบบเลือกตัวเลือกจะเด้งเป็นปุ่มให้กด ส่วนคำถามปลายเปิดให้พิมพ์ตอบเป็นข้อความ

เมื่อตอบครบทุกข้อ Claude จะสร้างโฟลเดอร์ `adventures/<ชื่อ-adventure>/` ในโปรเจกต์ ประกอบด้วยไฟล์:

| ไฟล์ | เนื้อหา |
|---|---|
| `00-overview.md` | สรุปภาพรวม + จุดเชื่อมกับ Astral Nexus meta-campaign + สารบัญลิงก์ไปแต่ละ Act |
| `01-hook-and-antagonist.md` | Hook, ตัวร้าย, เดิมพัน |
| `02-npcs.md` | ตาราง NPC สำคัญ |
| `99-notes.md` | องค์ประกอบพิเศษ + จุดที่เปิดกว้างให้ DM ปรับหน้างาน |
| `ACT01-<slug>/00-act-outline.md` (และ `ACT02-.../`, ... ถ้ามีหลาย Act) | สรุป Act + สารบัญ Chapter → EP — **ทุก adventure มีโฟลเดอร์ Act อย่างน้อย 1 อันเสมอ แม้แต่ one-shot** ตามกฎใน [structure-guide.md](./structure-guide.md) |
| `ACT0X-<slug>/EP01-...md`, `CH0X-....md`, ... | ไฟล์ Chapter/EP แบนอยู่ในโฟลเดอร์ Act นั้น — ถ้า EP รวมทั้งเรื่อง ≤10 จะมี outline เต็มทุก EP ตั้งแต่ตอนนี้เลย ถ้ายาวกว่านั้น (long campaign) จะมีแค่สรุปย่อ รอลงรายละเอียดทีหลังด้วย `/build-ep` |

หลังสร้างเสร็จ สามารถขอให้ Claude **ขยาย EP ไหนให้ละเอียดขึ้น** (session-by-session, encounter, NPC dialogue) ได้ต่อในแชทเดียวกัน แค่บอกชื่อ EP ที่ต้องการ

ไฟล์คำสั่งอยู่ที่ [.claude/commands/build-adventure.md](../.claude/commands/build-adventure.md) ถ้าอยากปรับหัวข้อคำถามหรือรูปแบบไฟล์ผลลัพธ์ แก้ที่ไฟล์นั้นได้เลย

### ขยายเป็น Journal เต็ม (boxed read-aloud text แบบ published module)

ไฟล์ outline ที่ `/build-adventure` สร้างให้เป็นแบบสรุปย่อ (bullet point) เหมาะกับ DM ที่คุ้นเรื่องแล้ว ถ้าอยากได้เวอร์ชันเต็มแบบอ่านออกเสียงหน้าโต๊ะได้จริง (boxed text, DC/stat block ระบุอินไลน์, breakdown ห้องต่อห้อง) ให้พิมพ์คำสั่งนี้ในเทอร์มินัล Claude Code:

```
/build-ep
```

หรือระบุชื่อ/slug adventure ไปด้วยเลย (ชี้ที่ "เรื่อง" ไม่ใช่ไฟล์ EP ใดไฟล์หนึ่ง):

```
/build-ep บุกรังหมาป่าเงา
```

คำสั่งนี้ใช้ได้กับทุก adventure ในโปรเจกต์เหมือนกันหมด (ไม่ต้องแยกกรณีตามขนาด เพราะทุกเรื่องมีโฟลเดอร์ Act อยู่แล้ว) Claude จะหาโฟลเดอร์ adventure ที่ตรงกัน (ถ้าไม่ระบุหรือหาไม่เจอจะ list ให้เลือก) แล้ว**ถามว่ารอบนี้อยากสร้างอะไรบ้าง** — เลือกได้หลายอย่างพร้อมกัน เช่น "ภาพรวมทั้งเรื่อง" และ/หรือ EP ใดก็ได้ (ถ้ามีหลาย Act จะถามว่า Act ไหนก่อน ดึงความต่อเนื่องจาก EP/Act ก่อนหน้ามาให้อัตโนมัติ) จากนั้นอ่านกฎ + syntax + ตัวอย่างจาก [journal-template.md](./journal-template.md) และถามยืนยันจุดที่ outline เดิมยังไม่ระบุ (treasure, NPC tactics, เอกสารในเกม ฯลฯ) ก่อนขยายให้เต็มรูปแบบ

ผลลัพธ์จะถูกบันทึกไว้ชั้นเดียวกับไฟล์ต้นทางเสมอ (ไม่มีโฟลเดอร์ `journal/` แยก — ดู [structure-guide.md](./structure-guide.md)):

| ไฟล์ | เนื้อหา |
|---|---|
| `00-overview.md` (root) | ภาพรวมทั้งเรื่องแบบ prose เต็ม (ไม่ลงรายละเอียดห้อง/encounter) |
| `ACT0X-<slug>/EP0Y - ชื่อตอนเต็ม.md` | แต่ละ EP แยกไฟล์ ลงรายละเอียดห้องต่อห้อง/encounter เต็มรูปแบบ อยู่ในโฟลเดอร์ Act เดียวกับ chapter brief — เลข EP นับต่อเนื่องทั้ง Act ไม่มี `CH0X-` นำหน้าแม้ Act จะมีหลาย Chapter — ถ้า EP นั้นเคยมีไฟล์ outline แยก (`EP0Y-slug.md`) มาก่อน ไฟล์นั้นจะถูกรวมเข้า journal นี้แล้วลบทิ้ง เหลือไฟล์เดียวต่อ EP เสมอ |

ไฟล์คำสั่งอยู่ที่ [.claude/commands/build-ep.md](../.claude/commands/build-ep.md) ถ้าอยากปรับกฎการขยายหรือรูปแบบไฟล์ผลลัพธ์ แก้ที่ไฟล์นั้นได้เลย ส่วน [journal-template.md](./journal-template.md) ยังใช้เป็น reference กลาง (คู่มือ syntax + ตัวอย่างเต็ม) ที่คำสั่งนี้อ่านอ้างอิงทุกครั้ง

## วิธีที่ 2: ใช้กับ AI เว็บอื่น (ChatGPT, Claude เว็บ ฯลฯ)

เปิดไฟล์ [adventure-builder-prompt.md](./adventure-builder-prompt.md) copy เนื้อหาตั้งแต่หัวข้อ "## บทบาทของคุณ" เป็นต้นไป วางเป็นข้อความแรกในแชท แล้ว AI จะสัมภาษณ์คุณทีละหัวข้อเหมือนกัน แต่ผลลัพธ์จะเป็น Markdown เดียวจบในแชท (ไม่ได้สร้างไฟล์ในเครื่องให้อัตโนมัติ เพราะ AI เว็บทั่วไปไม่มีสิทธิ์เขียนไฟล์) — ต้อง copy ผลลัพธ์มาเก็บเองภายหลัง

## เลือกใช้วิธีไหนดี

- อยู่ในโปรเจกต์นี้อยู่แล้วและอยากได้ไฟล์แยกละเอียดพร้อมใช้งานทันที → **วิธีที่ 1**
- อยากลองร่างไอเดียเร็วๆ นอกโปรเจกต์ หรือใช้ AI ตัวอื่นที่ถนัดกว่า → **วิธีที่ 2**
