# Dungeondraft — เขียนแมพด้วยสคริปต์ แล้วเอาเข้า Foundry

ตรวจกับ Dungeondraft **1.2.0.1** (ติดตั้งที่ `D:\Dungeondraft`) ตอนทำ Bandit Cave (2026-10-25) ผู้ใช้อนุมัติผลแล้ว
ตัวอย่างเต็ม: [maps/bandit-cave.cjs](maps/bandit-cave.cjs)

## ที่อยู่ไฟล์
| อะไร | ที่ไหน |
|---|---|
| แพ็ก asset (27 แพ็ก: 2MT 25, FA Starter, DnDungeon demo) | `D:\Dungeondraft Assets\` (ผู้ใช้เปิดใช้ครบทุกแพ็กแล้ว) |
| แมพของผู้ใช้ + `cave-test.dungeondraft_map` (แม่แบบ) | `D:\Dungeondraft Maps\` |
| config ของโปรแกรม | `%APPDATA%\Dungeondraft\config.ini` (`active_asset_packs` จะว่างจนกว่าจะปิดโปรแกรม ดูแพ็กที่เปิดจาก `header.asset_manifest` ในไฟล์แมพแทน) |

## รูปแบบไฟล์ `.dungeondraft_map` (JSON)
- **เริ่มจากไฟล์ที่ผู้ใช้เซฟเสมอ** (`cave-test`) แล้วแก้เฉพาะ `world.width/height` และ `levels["0"]` — header, `asset_manifest` และ field ใหม่ ๆ ของเวอร์ชันนี้จะถูกต้องเอง
- 1 ช่อง = 256 หน่วย · ตำแหน่ง `"Vector2( x, y )"` · มุมเป็นเรเดียน
- `cave.bitmap` / `cave.entrance_bitmap`: `PoolByteArray` ขนาด (4W+3)×(4H+3) **บิต** เรียงแถว บิตต่ำก่อน (LSB-first) · บิตที่ i ↔ ตำแหน่ง (i−1)/4 ช่อง · 1 = พื้นถ้ำ
- material bitmap: (2W+3)×(2H+3) บิต แบบเดียวกัน
- `terrain.splat`: 4W×4H จุด × 4 ไบต์ = น้ำหนักของ texture_1..4 ต่อจุด
- `tiles.cells` = `PoolIntArray` W×H ค่า −1 · `tiles.colors` = array W×H ของ `"ffffffff"`
- object: `position, rotation, scale, mirror, texture, layer, shadow, node_id` (ผู้ใช้เซฟแล้วจะมี `block_light` เพิ่ม) · `node_id` เป็น hex ไล่ขึ้น แล้วตั้ง `world.next_node_id` เป็นตัวถัดไป
- light: `position, rotation, range (ช่อง), intensity, color "ffRRGGBB", texture "res://textures/lights/soft.png", shadows, node_id`
- texture จากแพ็ก: `res://packs/<packId>/textures/<objects|caves|terrain|portals|…>/<ไฟล์>` · ของในตัวโปรแกรม: `res://textures/...`

## หา asset
- `.dungeondraft_pack` คือ Godot PCK: `node adventure-builder/dungeondraft/pcklist.cjs "<pack>"` แสดงรายชื่อไฟล์ทั้งหมด · ทำ index ทุกแพ็ก:
  `for f in "D:/Dungeondraft Assets/"*.dungeondraft_pack; do node adventure-builder/dungeondraft/pcklist.cjs "$f"; done > <scratch>/all.txt`
- ขนาดภาพ: `node adventure-builder/dungeondraft/webpdim.cjs "<pack>" "<ไฟล์>.webp" …`
- **เช็คทุก texture ที่ใช้ว่ามีอยู่ใน index ก่อนส่ง** — ของที่ path ผิดจะหายไปเงียบ ๆ
- ของที่ใช้แล้วสวยในถ้ำ/หิมะ: texture ถ้ำ 2MT `H0qJGoEK/.../caves/Dark - Cave Wall 1/floor.webp` · ค่ายโจร 2MT Bandit Camp `LHSXqd1D` · ประตู 2MT `4wr6VQOg` `Door - Square/Round - Wood/Bars - Large - 3x1` · หิน/ต้นสน FA `FA30DDXY` · หิมะ DnDungeon `snow_scatter_01`, terrain `snow_flats` · พื้นหิน FA terrain `Rock_Ground_02_A.png`

## บทเรียน (ผิดมาแล้วทั้งนั้น)
- **ของจากแพ็กแสดงครึ่งเดียวของขนาดในชื่อไฟล์** (ประตู "3x1" ที่ scale 1 = กว้าง 1.5 ช่อง) — **ขยายเฉพาะของที่ต้องคร่อมอะไร (ประตู)** ของอื่นใช้ scale ~1 ดูถูกแล้ว ผู้ใช้ไม่เอาการขยายทุกชิ้น ×2
- ทางเชื่อมที่แคบกว่า ~3 ช่อง **หายไปใต้แถบผนังถ้ำ** → ประตู/ทางเข้าห้องกว้าง 3 · ทางลับ 2 · ช่อง Tiny ใช้ ~1.6 แล้วให้ DM ตัดสิน · ช่องยิงธนูขุดเป็นรูไม่ได้ ใช้ภาพหน้าต่างวางบนผนัง (layer 700)
- noise ขอบถ้ำ ±0.5 ช่องพอ — มากกว่านั้นห้องทะลุกัน · เว้นหินระหว่างห้อง ≥ 1.5 ช่อง
- พื้นที่นอกถ้ำ = terrain (ไม่ใช่ถ้ำ) · `entrance_bitmap` ต้อง**คลุมฝั่งหินรอบปากถ้ำด้วย** ไม่งั้นมีแถบผนังโผล่กลางหิมะ
- ประตูไว้ **layer 400** (ใต้ผนัง) กว้างกว่าช่องทาง ~0.3 ช่องต่อข้าง ผนังจะทับปลายประตูพอดี (ผู้ใช้ชอบแบบนี้) · layer 700 = ทับบนหิน
- ภาพประตูแบบ portal (เช่น DnDungeon `metal_door_*`) **ไม่ขึ้นเมื่อวางเป็น object**
- FA `Cave_Pillar_*` ขึ้นเป็นวงดำ — ใช้ `Rock_Stone_Slate_*` แทน
- เงาต้นไม้ FA (`Pine_Shadow_*`) เป็นเงาทิศเดียวอบไว้แล้ว — **ห้ามหมุน** วางตรงโคนต้น หมุนได้แค่ตัวต้นไม้
- กองหิมะ/ของโปรยบนพื้น `shadow: false`
- **ผู้ใช้เซฟแมพแล้ว = ห้ามสร้างใหม่จากสคริปต์ทับ** — backup แล้วแก้ไฟล์ที่ผู้ใช้เซฟโดยตรง (เติม object ต่อท้าย ใช้ `next_node_id` ของไฟล์นั้น) · บอกให้ผู้ใช้ปิด-เปิดแมพใหม่ และห้ามกด Save จากหน้าต่างเก่า

## เข้า Foundry (ใช้ module Universal Battlemap Importer `dd-import` 6.1.1)
1. ผู้ใช้ export ใน Dungeondraft: **Export Mode = Universal VTT** · Grid OFF · Lighting OFF · **Grid PPI 150** (คมพอ ไฟล์ไม่หนัก; 256 ใหญ่เกิน) · บันทึกที่ `D:\Dungeondraft Maps\<ชื่อ>.dd2vtt`
2. ผู้ใช้ import ใน Foundry (Scenes → Universal Battlemap Import): Scene Name ตรงกับ `sceneName` ในข้อมูล · Storage User Data · WebP ✅ quality 0.9 · Custom Grid PPI ☐ · Upload Path = `assets/world/novaris/<Continent>/<Region>/<Map>` · **Fidelity ขวาสุด** · **Object Walls ☐** (ไม่งั้นรูปประตูกลายเป็นกำแพงทึบ) · Padding 0.25 · Offset 0
3. Claude: เพิ่มแมพใน `MAPS` ของ [build_foundry_battlemap.py](../../world-settings/novaris/tools/build_foundry_battlemap.py) แล้วรัน — อ่านประตูจาก `.dungeondraft_map` ที่ผู้ใช้เซฟ (รูปประตู = object ไม่ถูก export) ยืดปลายประตูจนชนเส้นกำแพงใน `.dd2vtt` (เส้นนี้อยู่ลึกในหินกว่าขอบที่เห็น) ย้ายประตูที่อยู่ตรงช่วงที่ทางกว้างแล้วไปจุดแคบสุด (`move_door`) เขียน `<key>.json` ข้างภาพ
4. ผู้ใช้รัน macro [Add-Battlemap-Extras.macro.js](../../codex/foundry-utility/Add-Battlemap-Extras.macro.js) (ตั้ง `MAP`): ประตูไม้/ลูกกรง/ลับ + เสียง (`woodHeavy`, `jail`, `jailHeavy`, `slidingWood`) + ล็อก, ช่องยิงธนู → window, แต่งแสง (torch/flame/lantern/daylight), ฉาก: vision on, fog ดำ, darkness ตามข้อมูล, global light off · รันซ้ำได้
