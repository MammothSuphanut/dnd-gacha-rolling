# Progress — Aeorian Cataclysm

Checklist ติดตามงานที่เหลือ หลังปรับโครงเรื่องให้ทั้งแคมเปญเกิดขึ้นใน **Wildemount ล้วนๆ** (Act 1/6 เปิด-ปิดที่ Eiselcross) ดูที่มาการปรับที่ [RESTRUCTURE-PROPOSAL-wildemount-only.md](./RESTRUCTURE-PROPOSAL-wildemount-only.md)

## เสร็จแล้ว
- [x] เก็บเนื้อหา Act 2–5 เวอร์ชันเก่า (ทวีปอื่น: Wildemount เดิม/Tal'Dorei/Issylra/Marquet) ไว้ที่ [_archive/](./_archive/) — ไม่ใช่เนื้อเรื่องหลักอีกต่อไป แต่ยังอ่านอ้างอิงได้ (บาง NPC/ฉากเลือกนำมาใช้ซ้ำแล้ว เช่น Druvenlode, Rosohna, Bazzoxan)
- [x] สร้างโฟลเดอร์ Act 2–5 ใหม่ตามโครงเรื่อง Wildemount-only พร้อม `00-act-outline.md` + Chapter brief (`CH0X-*.md`) ครบทุก Act — ระดับ outline + CR แนะนำ + ลิสต์ "EP ที่แนะนำ" เท่านั้น ยังไม่ใช่ journal เต็ม
- [x] เขียนใหม่ `ACT06-return-to-aeor-lab/00-act-outline.md` — ปรับให้สอดคล้องกับการเฉลย/ปะทะ Vaelkor Thess ที่ย้ายมา Act 5 แล้ว เพิ่มทางเลือกปิดแคมเปญ Astral Nexus (Constellation vs. อยู่ปกปักโลกเดิม)
- [x] sync `00-overview.md` (สารบัญ Act + level range + Fragment ต่อ Act) และ `99-notes.md` (จุดตัดสินใจ, ตารางเลเวล, อ้างอิง Exandria) ให้ตรงกับโครงใหม่
- [x] Act 1 คงเดิม 100% ไม่ต้องแก้เนื้อหา (แก้แค่ลิงก์ท้ายไฟล์ให้ชี้ไป Act 2 โฟลเดอร์ใหม่)

## ตาราง Act ใหม่
| Act | ชื่อ | Fragment | เส้นทาง |
|---|---|---|---|
| 1 | หนีจากลัทธิ สู่ Palebank Village | Wisdom | Palebank Village → Syrinlya → Aeor Crash Site → Fortress of the Dead Jarl (คงเดิม) |
| 2 | เงื้อมเงาแห่ง Dwendalian Empire | Void | Palebank Village → Uthodurn → Rexxentrum → Druvenlode/Ruins of Shattengrod → Rexxentrum |
| 3 | ทางแยกสู่ Xhorhas | Stasis | Rexxentrum → Rosohna → Bazzoxan → Ghor Veles → Rosohna |
| 4 | ห้องนิรภัยแห่งชีวิตนิรันดร์ | Genesis | Ghor Veles → Ruins of Draconia → Ruins of Sepesca |
| 5 | สิ่งที่ทะเลกลืนกิน | Zenith | Ruins of Sepesca → Diver's Grave → Darktow Isle — เฉลย + ปะทะ Vaelkor Thess (last boss) |
| 6 | คืน Fragment สู่ Aeor Lab (บทส่งท้าย) | ปิดเรื่อง | เก็บกวาดภัยร้าย → Aeor Lab → Astral Nexus |

## งานที่เหลือ
- [ ] ตัดสินใจว่าจะ**ลบ** `_archive/` ทิ้งถาวรเมื่อไหร่ หรือเก็บไว้เป็น reference ต่อไปเรื่อยๆ (ไม่บังคับ ไม่กระทบเนื้อเรื่องหลัก)
- [ ] ลง detail ระดับ EP จริง (stat block เต็ม, DC เฉพาะจุด, boxed read-aloud text, NPC ตั้งชื่อ+tactics ครบ) สำหรับ Act 2–6 ทั้งหมด — ตอนนี้มีแค่ระดับ Chapter brief ทำแบบ just-in-time ด้วย `/build-ep` ก่อนใกล้เล่นถึง EP นั้นจริง ไม่ต้องลงล่วงหน้าทั้งแคมเปญ (ดูกฎ 3 ของ [structure-guide.md](../../adventure-builder/structure-guide.md))
- [ ] ทำไฟล์ NPC reference รวม (สไตล์ `02-npcs.md` ของ frozen-sick) รวมชื่อทั้งหมดที่ตั้งไปแล้วในโครงใหม่: Elro Aldataur, Uvilia Whek, Prelate Iskavel Thorn, ศาสตราจารย์ Ilyana Marrow, Rennick, Vaelkor Thess, Messenger
- [ ] pass ภูมิศาสตร์ละเอียด (ชื่อย่านในเมือง/จุด landmark เฉพาะ) สำหรับ Ruins of Draconia, Ruins of Sepesca, Diver's Grave, Darktow Isle ที่ยังไม่เคยเขียนละเอียดมาก่อน (ต่างจาก Rexxentrum/Druvenlode/Rosohna/Bazzoxan/Ghor Veles ที่มี texture ระดับหนึ่งอยู่แล้วจากเนื้อหาเก่าใน `_archive/`)
- [ ] จุด confirm อื่นๆ ที่ยังเปิดอยู่ — ดูท้าย [RESTRUCTURE-PROPOSAL-wildemount-only.md](./RESTRUCTURE-PROPOSAL-wildemount-only.md#จุดที่ต้อง-confirm-ก่อนเริ่มลงมือจริง)
