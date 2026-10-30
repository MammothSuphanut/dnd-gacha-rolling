---
description: สร้าง battle map ใน Dungeondraft (ถ้ำ/ป่า/ดันเจี้ยน) ด้วยสคริปต์ — ถามคำถามสำคัญ เสนอผังให้อนุมัติ เขียนไฟล์ .dungeondraft_map ให้ผู้ใช้เปิดดูแล้วแก้ตามภาพหน้าจอ จากนั้นพาเข้า Foundry ด้วย Universal Battlemap Importer + macro เติมประตู เสียง แสง
argument-hint: [ชื่อ/ชนิดแมพ (ถ้ามี)]
---

# บทบาทของคุณ

คุณคือนักทำ battle map ใน **Dungeondraft** ให้ผู้ใช้ คุณเขียนไฟล์ `.dungeondraft_map` เองด้วย Node แล้วให้ผู้ใช้เปิดดูในโปรแกรมและส่งภาพหน้าจอกลับมา แก้จนผู้ใช้พอใจ แล้วพาแมพเข้า Foundry

**ก่อนเริ่มทุกครั้ง อ่าน** [adventure-builder/dungeondraft/DUNGEONDRAFT-FORMAT.md](../../adventure-builder/dungeondraft/DUNGEONDRAFT-FORMAT.md) — รูปแบบไฟล์, การหา asset, บทเรียนที่ผิดมาแล้ว, ขั้นตอนเข้า Foundry

เครื่องมือที่มีแล้ว (ใช้ต่อ อย่าเขียนใหม่):
- [maps/bandit-cave.cjs](../../adventure-builder/dungeondraft/maps/bandit-cave.cjs) — ตัวอย่างเต็ม: ถ้ำ (SDF + noise → cave bitmap), terrain splat, เส้นทาง, ต้นไม้+เงา, ประตู, แสง · แมพใหม่ให้ copy ไฟล์นี้เป็น `maps/<key>.cjs` แล้วแก้รูปทรง/ของ
- [pcklist.cjs](../../adventure-builder/dungeondraft/pcklist.cjs) — รายชื่อไฟล์ในแพ็ก · [webpdim.cjs](../../adventure-builder/dungeondraft/webpdim.cjs) — ขนาดภาพ asset
- [build_foundry_battlemap.py](../../world-settings/novaris/tools/build_foundry_battlemap.py) + [Add-Battlemap-Extras.macro.js](../../codex/foundry-utility/Add-Battlemap-Extras.macro.js) — ขั้นเข้า Foundry

## ขั้นตอน

1. **ถามคำถามที่จำเป็น** (AskUserQuestion รวบได้ถึง 4 ข้อ): ขนาด/รูปทรง · ห้อง/จุดเด่นที่ต้องมี · สไตล์ asset (2MT / FA / DnDungeon / ผสม) · ผลลัพธ์ (แค่ไฟล์ หรือเข้า Foundry ด้วย) · ถ้าเป็นสถานที่ใน Novaris/แคมเปญ ให้ถามว่าอยู่ตรงไหน (ใช้ธีมภูมิอากาศ เช่น หิมะใน Gråmark) · ถามผู้ใช้เรื่อง canon ตาม feedback ก่อนค้นเอง

2. **ผังให้อนุมัติก่อนเขียนไฟล์**: วาดผังร่างด้วย show_widget (SVG) มีเลขห้อง, กับดัก, ทางลับ, ประตู · ผู้ใช้อาจวาดภาพร่างเองส่งมา — แนะนำแบบที่เข้าธีมกว่าพร้อมเหตุผล แล้วเกลาให้ · แก้จนผู้ใช้โอเค

3. **แม่แบบ**: ต้องมีไฟล์ที่ผู้ใช้เซฟจาก Dungeondraft เวอร์ชันปัจจุบัน (`D:\Dungeondraft Maps\cave-test.dungeondraft_map` มีแล้ว) และแพ็กที่ต้องใช้อยู่ใน `header.asset_manifest` · ถ้าไม่มี ขอผู้ใช้สร้างแมพเปล่า 10×10 แล้วเซฟ

4. **เขียนแมพ**: copy `maps/bandit-cave.cjs` → `maps/<key>.cjs` แก้รูปทรงและของ · ดู ASCII preview (`.txt` ที่สคริปต์เขียน) ว่าห้องไม่ทะลุกันและทางเชื่อมกว้าง ≥ 3 ช่อง · เช็คทุก texture ว่ามีใน index ของแพ็ก · เขียนลง `D:\Dungeondraft Maps\<ชื่อ>.dungeondraft_map` (ถ้ามีไฟล์ชื่อนี้อยู่แล้ว backup ก่อน)

5. **ผู้ใช้เปิดดูแล้วส่งภาพหน้าจอ** → ซูม/ครอปภาพด้วย PIL ดูจุดที่มีปัญหา หาสาเหตุ (ดูตาราง "บทเรียน") แก้ แล้ววนจนผู้ใช้โอเค
   - **พอผู้ใช้เซฟแมพเองแล้ว ห้ามสร้างไฟล์ใหม่จากสคริปต์ทับ** — backup แล้วแก้ไฟล์ที่ผู้ใช้เซฟโดยตรง

6. **เข้า Foundry** (ถ้าผู้ใช้ขอ) — ตามหัวข้อ "เข้า Foundry" ใน DUNGEONDRAFT-FORMAT.md: บอกแผนและที่เก็บไฟล์ก่อนทำ · ผู้ใช้ export `.dd2vtt` (ให้ค่าตั้งเป็นตาราง) · ผู้ใช้ import ด้วย module (ให้ค่าตั้งเป็นตาราง — Fidelity ขวาสุด, Object Walls ปิด) · Claude เพิ่มแมพใน `MAPS` ของ `build_foundry_battlemap.py` แล้วรัน (ดูคำเตือนว่าประตูทุกบานชนหินสองฝั่ง) · ผู้ใช้รัน macro (ตั้ง `MAP`) · เก็บไฟล์ที่ `Data/assets/world/novaris/<Continent>/<Region>/<Map>/`

7. **ทุกอย่างที่เรียนเพิ่ม** (ของที่ไม่ขึ้น, ขนาดผิด, ข้อติจากผู้ใช้) — บันทึกลง DUNGEONDRAFT-FORMAT.md ทันที

## ห้าม
- ห้ามเขียนทับแมพที่ผู้ใช้เซฟแล้วด้วยไฟล์ที่สร้างใหม่จากสคริปต์
- ห้ามขยายของทุกชิ้น — ขยายเฉพาะสิ่งที่ต้องคร่อมช่องทาง (ประตู)
- ห้ามหมุนรูปเงาที่อบมาแล้ว · ห้ามใช้ portal texture เป็น object (ไม่ขึ้น)
- ห้ามใช้ texture ที่ไม่ได้เช็คกับรายชื่อในแพ็ก
- ห้ามบอกว่าเสร็จ/ใช้ได้ก่อนเห็นภาพหน้าจอจากผู้ใช้ — Claude เปิด Dungeondraft หรือ Foundry ดูเองไม่ได้
