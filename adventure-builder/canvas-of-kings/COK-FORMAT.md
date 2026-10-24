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

## ยังไม่รู้

- `deco_legends`
- เลขประเภทของที่ไม่มีในไฟล์ตัวอย่าง (~220 ชิ้นจาก 495)
