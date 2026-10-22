# GachaRolling

## ⚠️ ทำก่อนเริ่มงานบนเครื่อง Windows (หลังย้ายงานจาก Mac — 2026-10-22)

บน Mac เปลี่ยนชื่อไฟล์และโฟลเดอร์ของ Novaris จากชื่อ CR เป็นชื่อ Novaris แล้ว (commit `70fa61d`, `fb8a758`) — โฟลเดอร์ `world-settings/novaris/maps/azgaar/app/` ไม่อยู่ใน git จึงต้องอัปเดตเองบนเครื่องนี้

1. เช็คงานค้างก่อน pull
   ```bash
   git status
   ```
   ถ้ามีไฟล์ที่แก้ค้างอยู่ใน `world-settings/novaris/` ให้ commit แล้ว push ก่อน (โฟลเดอร์ถูกเปลี่ยนชื่อ จะชนกันตอน pull)
2. ดึงงานล่าสุดพร้อม tag เวอร์ชันแผนที่ (`novaris-map-v1`, `novaris-map-v3`)
   ```bash
   git checkout devMammoth
   git pull --tags
   ```
3. อัปเดต Azgaar ใน `app/` ให้ใช้ heightmap id ใหม่ (`exandria` → `novaris`)
   - แก้ `world-settings/novaris/maps/azgaar/app/src/data/precreated-heightmaps.ts`
     `exandria: { id: 23, name: "Exandria" }` → `novaris: { id: 23, name: "Novaris" }`
   - หรือสร้าง `app/` ใหม่ตามหัวข้อ "สร้าง `app/` ใหม่" ใน `world-settings/novaris/maps/azgaar/README.md` (patch ชื่อใหม่ `novaris-azgaar.patch`)
4. copy ข้อมูลแผนที่ชื่อใหม่เข้า app แล้วลบไฟล์ชื่อเก่า
   ```bash
   cd world-settings/novaris/maps/azgaar
   cp heightmaps/novaris* app/public/heightmaps/
   rm app/public/heightmaps/exandria*
   ```
5. เปิด Azgaar (preview config `azgaar`, port 5179) แล้วเปิด `novaris.map` ให้ขึ้นปกติ — URL เดิม (endpoint `__exandria` ไม่ได้เปลี่ยน)
6. ภาพใน `world-settings/novaris/maps/azgaar/exports/` (atlas v1–v3, ภาพร่างผัง v3/v4) ไม่อยู่ใน git — ถ้าต้องการให้ copy จาก Mac หรือ export ใหม่
7. ถ้าสร้าง heightmap / biome map ใหม่จากภาพต้นฉบับ (`make_heightmap.py`, `make_biomemap.py`) ต้องรัน `python scripts/layout/move_eldmere.py` ซ้ำ ให้ Eldmere อยู่ตำแหน่งผัง v3
8. ทำครบแล้ว **ลบหัวข้อนี้ออกจาก README** แล้ว commit
