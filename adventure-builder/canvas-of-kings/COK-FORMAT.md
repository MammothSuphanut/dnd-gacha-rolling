# Canvas of Kings — รูปแบบไฟล์ `.mommap` (สำหรับให้ Claude เขียนแผนที่เอง)

> แกะจากไฟล์ตัวอย่างที่ผู้ใช้เซฟจากแอปจริง (2026-10-24, Canvas of Kings **0.1.0.44** ตัวเต็ม): `test01` (ของพื้นฐาน + ป้าย), `test03` (ห้อง + ที่ราบสูง), `test_city` (เมืองเต็ม ~7,700 วัตถุ / ~2,150 path), `test_cave` (ถ้ำ), `test_floor` (อาคาร 2 ชั้นด้วย layer) — อยู่ใน `D:\Steam\steamapps\common\Canvas of Kings\Save\`
> ตารางเลขประเภททั้งหมดอยู่ใน [`cok-types.json`](cok-types.json) (สร้างจากไฟล์ตัวอย่าง — ห้ามเดาเลขที่ไม่มีในตาราง)

## บทเรียนจากการลองเขียนเอง

- ไฟล์ที่มีของผิดรูปแบบ **ไม่ทำให้แอปพัง** — แอปข้ามของชิ้นนั้นไปเฉย ๆ
- **`path_type` และ `object_type` ต้องตรงกับของจริง** ไม่งั้นของไม่ขึ้น (ลองไล่เลข 0–99 แล้ว — กำแพง/ภูเขาไม่ขึ้นสักเลขเพราะ `object_type` ของชิ้นส่วนผิดด้วย) → ใช้เลขจาก `cok-types.json` เท่านั้น ถ้าต้องการของที่ไม่มีในตาราง ให้ผู้ใช้วางในแอปแล้วเซฟเป็นตัวอย่าง
- แอป**ไม่สร้างชิ้นส่วนของเส้นให้เอง**ตอนเปิดไฟล์ — กำแพง รั้ว ถนน หลังคา ต้องใส่ชิ้นส่วนใน `lines_objects` เอง (ยกเว้นพวกพื้นที่ที่วาดจากเส้นขอบ เช่น ทะเลสาบ ที่ราบสูง)

## โครงไฟล์

`info` (version, camera, `last_uid`) · `layers {last_idx, map_layers[]}` (ดูหัวข้อ Layer) · `objects[]` (ของวางเดี่ยว) · `paths[]` (เส้นและพื้นที่) · `environment` · `map_settings` · `deco_labels[]` (ป้ายตัวหนังสือ) · `deco_legends[]` · `deco_images[]`

พิกัด: `position_x` / `position_z` หน่วยโลก (ประมาณ 1 หน่วย ≈ 1 ช่องกริด) · `position_y` = ความสูง · `rotation_y` เป็นองศา

### ของวางเดี่ยว (`objects[]`)

```json
{"filename": "res://Source/World/WorldObjects/woDecos/wo_tree_b.tscn", "position_x": -2.4, "position_y": 0.0, "position_z": -1.88,
 "rotation_y": -174.0, "scale_x": 0.93, "scale_z": 0.93, "object_type": 3}
```
ของจาก Steam Workshop: `"filename": "steam://<id>/data/scene.tscn"`, `"object_type": -1`, `"steam_file_id": <id>`, `"name": ...`

### ป้ายตัวหนังสือ (`deco_labels[]`)

```json
{"filename": "res://Source/Environment/du_deco_text_label.tscn", "position_x": 0.25, "position_y": 0.0, "position_z": 2.96,
 "rotation_y": 0.0, "scale_x": 1.35, "scale_z": 0.43, "text": "test label", "assigned_deco_legend_idx": 0}
```

### เส้นและพื้นที่ (`paths[]`) — ช่องที่ทุกอันมี

`filename` (`res://Source/World/Paths/...` หรือ `.../Plots/...`) · `position_*` = 0 · `path_type` · `main_points [{x,z}]` (พื้นที่ปิด: จุดสุดท้าย = จุดแรก + `"is_closed": true`) · `in_out_handles` (เส้นโค้ง; ว่างได้) · `points_objects` (1 ชิ้นต่อจุด — ปกติ `wo_placeholder.tscn` object_type 1, กำแพงใช้หอคอยแทน) · `lines_objects [{objects: [...]}]` (1 รายการต่อช่วงเส้น) · `lines_custom_objects` (ของพิเศษบนเส้น เช่น ประตู หน้าต่าง ประตูเมือง) · `lines_leaned_points` · `lines_custom_scales` (1 ค่าต่อช่วง) · `click_and_placing_wo` (`wo_placeholder_area.tscn`, object_type 113, `uid` ไม่ซ้ำ) · `height_changing_position_y` (ความสูง ถ้ามี) · พื้นที่ปิดมี `area_objects` (ของข้างใน)

ชิ้นส่วนบนเส้น (1 ชิ้นต่อช่วงตรง): ตำแหน่ง = จุดกึ่งกลางช่วง · `rotation_y = -atan2(dz, dx)` (องศา) · `scale_x` = `custom_data_g_size` = ความยาวช่วง · `assigned_path_line_idx` = เลขช่วง

### ตัวอย่างสำคัญ

| ของ | path_type | ชิ้นส่วน |
|---|---|---|
| กำแพงหิน `pa_stone_wall_1/2/3` | 11 / 12 / 13 | จุด: `wo_wall_stone_tower_c` (object_type 32) · เส้น: `wo_wall_stone_a` (29) · ประตูเมืองใน `lines_custom_objects` (`..._gate_b` 58) |
| ห้อง `Plots/Rooms/papr_blacksmith` | 57 | เส้น: `wo_room_wood_wall_b` (116) · `line_object_type: 116`, `texture_type` (พื้น), `window_scene_idx` · ประตู (125)/หน้าต่าง (126) ใน `lines_custom_objects` · เฟอร์นิเจอร์ใน `area_objects` |
| หลังคา (= ตัวบ้านในเมือง) `par_roof_tiles/wooden/thatched` | 41 / 42 / 43 | เส้นสันหลังคา 2 จุด สูง `height_changing_position_y: 3` · ชิ้น `wo_roof_tiles_b` (98) `scale_z` = ความกว้าง · เสา `..._pillar_a` (88) ใน `area_objects` · `line_object_type_idx` |
| กำแพงทึบ `Plots/PlotsLands/papl_wall` | 49 | จุด: `wo_wall_stone_tower_d` (105) · เส้นว่าง · สูง 2.35 |
| ที่ราบสูง/ก้อนหิน `Plots/Plateaus/papl_plateau_plateau` | 68 | วาดจากเส้นขอบเอง (เส้นว่าง) · `texture_type` (1 = หิน, 12/13/14 แบบอื่น) · `edge_texture_type: 2` · `custom_gradient` · ความสูง `height_changing_position_y` |
| ถนน `pa_road` | 17–23 (แบบถนน) | ชิ้น `wo_road_a` (41) `scale_z` = ความกว้าง |

เลขอื่นที่รู้แล้ว: hedge 1 · hedge_trees 2 · salad_row 3 · palisade 9/10 · fence 14/16 · forest 25 · field 26 · market 27 · cottages 28 · lumberyard 30 · tent_camp 31 · lake 32 · ocean 33 · bridge 34/35 · river_deep 36 · farmers 65 · merchants 67 — ดู `cok-types.json`

## Plot tool — แปลงทั้งหมดในแอป (ชื่อจากแอป ยืนยันโดยผู้ใช้ 2026-10-24)

| ชื่อในแอป | ไฟล์ | path_type | แอปใส่อะไรให้ |
|---|---|---|---|
| Forest | `Plots/pap_forest` | 25 | ต้นไม้ พุ่มไม้ |
| Field | `Plots/pap_field` | 26 | ทุ่งนามีรั้ว แถวพืช |
| Market | `Plots/pap_market` | 27 | แผงตลาดกระจายเป็นกลุ่ม |
| Cottages | `Plots/pap_cottages` | 28 | กระท่อม + รั้วล้อม |
| Logging camp | `Plots/pap_lumberyard` | 30 | โรงไม้ กองซุง |
| Campsite | `Plots/pap_tent_camp` | 31 | เต็นท์ + กองไฟ |
| District of Farmers / Craftsmen / Merchants | `Plots/PlotsDistricts/papd_farmers/craftmen/merchants` | 65 / 66 / 67 | บ้านสำเร็จรูป ถนนภายใน คน เกวียน ฯลฯ · District Design ที่ผู้ใช้ชอบ = `layout_type: 4` |
| Lake | `Plots/PlotsWater/papw_lake` | 32 | น้ำ (วาดจากขอบเอง) · สีของแปลงเอง = `water_color: "d42a00ff"` (RRGGBBAA) + `is_individual: true` (ลาวาของผู้ใช้ใน twinhold) · Gradient 0.5 ไม่ถูกเซฟลงไฟล์ (น่าจะเป็นค่าตั้งต้น) |
| Sea | `Plots/PlotsWater/papw_ocean` | 33 | ทะเล |
| Plateau | `Plots/Plateaus/papl_plateau_plateau` | 68 | ที่ราบสูง/หิน/พื้นปู (texture_type) |
| **Castle surface** | `Plots/PlotsLands/papl_wall` | 49 | **ลานปราสาทยกพื้นทึบ มีกำแพง+หอคอยรอบ** — ไม่ใช่กำแพงล้อมลานโล่ง (ของที่วางข้างในจะจม) |
| Citizens | `Plots/pap_citizens` | ? (ยังไม่มีตัวอย่าง) | ฝูงคน |

**ค่าตั้งของแปลง (เก็บต่อแปลง เฉพาะเมื่อผู้ใช้เคยเปลี่ยน — จาก `twinhold-level1-filled`):** `layout_type` (District Design: 2/3 ค่าตั้งต้นของพ่อค้า/ชาวนา · **4 = ช่องหลายเหลี่ยม** ที่ผู้ใช้ชอบ · ปุ่ม Triangles = ค่าใดค่าหนึ่งในชุดนี้ ยังไม่ยืนยันเลข) · `roads` · `buildings` · `nature` · `busy_roads` · `roadside_deco` (true/false) · **จากแปลง Field ใน `twinhold` ของผู้ใช้ (2026-10-24):** Density = `custom_density` (0.5–0.9 ที่ผู้ใช้ใช้) · ปิด Populate Border = `has_no_border: true` · Layout Rotation = `layout_rotation` (องศา 0–180) — ยังไม่เห็นในแปลง District เพราะผู้ใช้ไม่ได้เปลี่ยน · ชุดค่าตามสถานที่: `cok.PRESETS` / `cok.preset(place, quarter)` — เมืองในถ้ำ `nature: false` เสมอ

แปลงที่ "สร้างของเอง" (ทุกอันยกเว้น Lake/Sea/Plateau/Castle surface) — ไฟล์ที่เขียนมาจะว่าง ผู้ใช้ต้องขยับแปลงในแอปให้สร้าง · ใช้แปลงที่ผู้ใช้เซฟเป็นแม่แบบ (`cok.district_plot`) แล้วลบของข้างในทิ้ง
- **แม่แบบแปลงทุกชนิด + แผนที่เปล่า อยู่ใน [`cok-templates.json`](cok-templates.json) แล้ว** (`cok.PLOT_TEMPLATES[kind]`, `cok.Map()` ไม่ต้องใส่ไฟล์) — ไม่ต้องพึ่งไฟล์ในโฟลเดอร์ Save อีก (ไฟล์ตัวอย่างเดิมทั้งหมดย้ายไป `Save/backup/old/` เมื่อ 2026-10-24 ตามที่ผู้ใช้ขอล้างโฟลเดอร์ Save)
- `cok.district_plot` ใช้ได้กับทุกชนิดแปลง (2026-10-24): แม่แบบ District/Cottages จาก `test_districts` · Market/Campsite/Field/Castle surface จาก `test_city` · Castle surface เก็บความสูง 2.35 + หอคอย `wo_wall_stone_tower_d` ที่มุมให้เอง · `sub_paths` ใส่เฉพาะชนิดที่แม่แบบมี
- ค่าตั้ง (`layout_type`, `nature` ฯลฯ) ใส่เฉพาะแปลง District — Market/Campsite/Field/Cottages ยังไม่เคยเห็นค่าตั้งในไฟล์ จึงปล่อยตามแม่แบบ · ผลลองใน `twinhold-level1-plots` (2026-10-24): Field / Cottages / Castle surface ขึ้นได้ · **Campsite ~19,800 ตร.ฟุต ขึ้น "area too large" แล้วไม่สร้างของ** — แอปมีเพดานขนาดต่อชนิดแปลง
- **ขนาดแปลงที่ใช้ได้จริง** (ตร.ฟุต จากไฟล์ผู้ใช้): Campsite 3,200–5,100 · Market ~6,500 · Cottages 6,400–33,700 · Field 19,000–112,000 · Logging camp 10,300–63,600 · Castle surface 600–17,800 · Merchants 14,500–80,400 · Craftsmen 55,000–140,800 · Farmers 68,600–202,300 → พื้นที่ใหญ่กว่านี้ให้ผ่าเป็นหลายแปลงคั่นทางเดิน
- **ยืนยันเพิ่มจาก `twinhold` ที่ผู้ใช้ Populate แล้ว (2026-10-24):** Craftsmen **213,400** ขึ้นได้ (769 ชิ้น) · Merchants **98,900** ได้ · Logging camp เล็กสุด **6,900** ได้ · Campsite ≤ 4,200 ได้ทุกแปลง · Market ≤ 5,930 ได้ทุกแปลง · แปลงเศษ < 3,000 ตร.ฟุต (เหลือจากการผ่า) ผู้ใช้ไม่ได้ Populate — ควรรวมเข้าแปลงข้างเคียง

## ทำถ้ำ / ชั้นใต้ดิน (จาก `test_cave`)

- ผนังถ้ำ = **ที่ราบสูงหลายก้อน** (`papl_plateau_plateau`, 44 ก้อนในตัวอย่าง) `texture_type` 1 (หิน) บางก้อน 12/14 · ความสูงต่างกัน 0–5 ให้ดูขรุขระ · ช่องว่างระหว่างก้อน = ทางเดิน/โพรง
- แสงมืด: `light_energy 0.3`, `light_color bad4eb` (ฟ้าเย็น) · `glow_light_*` (ไฟเรืองแสง) วางกระจายเป็นแหล่งแสง
- ของแต่งในถ้ำ: เครื่องจักร ลัง เศษหิน แหล่งน้ำ ป้าย · แม่น้ำ/ทะเลสาบใต้ดินใช้ `paw_river_deep` / `papw_lake`
- ทางเข้าเหมืองใช้ของ Workshop "mine entrance" (`steam://3404732845`)

## Layer / หลายชั้น (จาก `test_floor` — ในแอปปรับที่แผง **Groups** มุมขวาบน)

```json
"layers": {"last_idx": 7, "map_layers": [
  {"idx": 3, "name": "floor 1", "is_unlocked": false},
  {"idx": 5, "name": "Floor 2", "is_visible": false}]}
```
- `idx` ไม่ซ้ำ ไม่ต้องเรียง · `last_idx` = idx สูงสุด · ไม่มี `is_visible` = แสดง · `is_unlocked: false` = ล็อกไว้ (กันแก้พลาด) · `info.map_layers_open: true` = เปิดแผงไว้
- ทุกชิ้นที่อยู่ใน layer มี `"assigned_map_layer_idx": <idx>` — **ทั้งตัว path/object และทุกชิ้นข้างใน** (`points_objects`, `lines_objects[].objects`, `area_objects`)
- ตัวอย่างแยกแต่ละชั้นเป็น 3 layer: พื้น / ผนัง / ของแต่ง (ชั้น 1 แสดง ชั้น 2 ซ่อน) — ทุกชั้นอยู่ที่ความสูง 0 เท่ากัน ใช้การเปิด/ปิด layer สลับดูทีละชั้น แล้ว export ทีละชั้น
- พื้นห้อง = `papl_plateau_plateau` `texture_type 2`, `edge_texture_type 1` (พื้นเรียบ) · ผนัง = `pa_fence_3` ชิ้น `wo_fence_c` (35) + เสา `wo_fence_pillar_c` · บันได `pas_stairs_stone` ชิ้น `wo_stairs_stone_a/b` (112)

## Environment (แผง Environment ในแอป → `environment` ในไฟล์ · ใช้ร่วมกันทั้งแผนที่ แยกต่อ layer ไม่ได้)

- แท็บ Light: Sun Light = `light_color` / `light_energy` / `light_is_negative` · Ambient = `ambient_color` / `ambient_brightness` / `ambient_contrast` / `ambient_saturation` · Shadows = `shadow_position` / `shadow_length` / `shadow_opactiy` (สะกดผิดตามแอป) · Water = `water_color` · Objects = `glow_light_alpha` (Light) / `glow_light_color` / `objects_no_smoke` / `smoke_color` · Textures = `black_level`
- แท็บ Weather: `fog_color` / `fog_density` / `fog_brightness` / `fog_threshold` · `cloud_threshold` · `wind_direction` / `wind_strength` · `snow_*`
- สี = RRGGBBAA · ธีมของ Twinhold (forge / sepia / deep) อยู่ใน `twinhold_atmos.py` `THEMES` · ปุ่ม Open/Save As Template ยังไม่รู้ว่าเก็บไฟล์ที่ไหน (ยังไม่มีใน `%APPDATA%\Godot\app_userdata\Canvas of Kings`)
- **ระวัง:** แปลง Field / Logging camp สร้างต้นไม้ (`wo_tree`) ให้เองแม้ในถ้ำ — ใน twinhold มี 426 ต้น

## Export (Export Mode + แผง Map Settings — จาก Twinhold 2026-10-24)

- กรอบที่ export = **Map Area กรอบเส้นแดง** (ไม่ใช่ขอบหินของแผนที่) ตั้งที่แผง **Map Settings** (ไอคอนลายตารางแถบซ้าย) แท็บ Print / Digital · Print: Paper Size, Orientation, Unit (cm/inch), Width × Height, Tile Size, Fit Tile Size · Multi Pages (Horizontal/Vertical) · Map Size Scale
- ขนาดกรอบบนแผนที่ขึ้นกับความกว้างกระดาษ (~3 ฟุตต่อ cm ที่ Map Size Scale 1) · จำนวนพิกเซล = กระดาษ (นิ้ว) × DPI — MAX DPI = 1200 · ค่าตั้งต้น A4 → กรอบเล็กแค่ราวร้อยฟุต
- ภาพใหญ่ระดับ ~13,500 px export ได้ปกติ (PNG ~270 MB) · ภาพไปอยู่ที่ `%APPDATA%\Godot\app_userdata\Canvas of Kings\user_projects\exports\`
- ค่า Map Area เซฟลง `map_settings` เฉพาะตอนผู้ใช้กดเซฟ — ไม่ต้องพึ่งค่านี้: หาตำแหน่งภาพจากตัวภาพเอง (วงปล่อง/จุดที่รู้พิกัด) ด้วย `world-settings/novaris/tools/crop_city_map.py`

## ยังไม่รู้

- `deco_legends`
- เลขประเภทของที่ไม่มีในไฟล์ตัวอย่าง (~220 ชิ้นจาก 495)
