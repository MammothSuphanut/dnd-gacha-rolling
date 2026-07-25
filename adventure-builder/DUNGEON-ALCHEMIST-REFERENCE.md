# Dungeon Alchemist — UI & Workflow Reference

เอกสารรวมข้อมูลการใช้งาน Dungeon Alchemist กันต้องลองผิดลองถูกซ้ำทุกครั้งที่ทำแมพใหม่ ใช้คู่กับ [MAP-WORKFLOW.md](./MAP-WORKFLOW.md) (ตัดสินใจว่าควรทำแมพนี้ด้วย AI image gen หรือ Dungeon Alchemist)

มี 2 ประเภทข้อมูลในไฟล์นี้ แยกกันชัดเจน:
- 🟢 **ยืนยันจากการใช้งานจริง** — เจอเองในโปรแกรมระหว่างทำแมพ เชื่อถือได้เต็มที่
- 🔵 **จากคู่มือทางการ (dungeonalchemist.fandom.com)** — ยังไม่ได้ลองทุกจุดด้วยมือ ถ้าเจอว่าไม่ตรงกับที่เห็นจริงในโปรแกรม ให้ยึดของจริงเป็นหลักและมาอัปเดตไฟล์นี้

---

## 🔵 Sidebar Tools (แถบไอคอนซ้ายสุด)

แต่ละไอคอนคือเครื่องมือแก้ไขแมพคนละด้าน:

| Tool | หน้าที่ |
|---|---|
| **Room** (Draw Rooms) | วาดผังห้อง — AI จะใส่กำแพง/ประตู/หน้าต่าง/ไฟให้เองตามรูปทรงที่วาด |
| **Floors** | เปลี่ยน/แต่งพื้นห้อง (ใช้ได้แค่ในห้องที่วาดไว้แล้ว) พื้นบางแบบ เช่น มอส/ดิน จะ blend เข้ากับพื้นข้างเคียงเอง |
| **Doors** | วางหรือเปลี่ยนประตูบนกำแพง |
| **Windows** | วางหรือเปลี่ยนหน้าต่างบนกำแพง |
| **Walls** | เปลี่ยนวัสดุกำแพงทั้งห้อง (Change All Walls) หรือทีละผนัง (Change Wall) หรือเพิ่มกำแพงใหม่เอง (Add Wall) |
| **Lights** | ปรับแสงธรรมชาติ/เวลาในฉาก (เช้า/เที่ยง/เย็น/กลางคืน — โปรแกรมปรับสีและทิศแสงให้อัตโนมัติ) กับแสง Abstract light (แสงล่องหนที่ปรับเองได้ ไม่ผูกกับ prop) — **คนละอย่างกับหมวด "Lights" ใน Place Objects** ด้านล่าง (นั่นคือ prop เทียน/โคมไฟที่วางเห็นตัว)
| **Objects** (Place Objects) | วาง prop/เฟอร์นิเจอร์/ของตกแต่งลงในฉาก |
| **Token** | วาง token ตัวละคร/มอนสเตอร์ และมีโหมด first-person view ดูฉากจากมุมตัวละคร |
| **Overlay** | ใส่ compass, label ข้อความ, กรอบภาพ, watermark ทับแมพ |

---

## 🟢 Draw Rooms — Room Preset ทั้งหมด (ยืนยันจากของจริง)

รายการ Category (ซ้าย) → Room Preset (ขวา) ในเมนู Draw Rooms:

### Abandoned Ruins
Random, Burnt House, Chapel, Hovel, Mansion, Spider Lair, Temple
> ทุก preset ในหมวดนี้มาพร้อมดีเทล "ร้างมานานหลายปี" เสมอ (มอส เถาวัลย์ ใยแมงมุม เฟอร์นิเจอร์พัง) — ใช้เฉพาะฉากที่ต้องการสื่อว่าไม่มีคนอยู่จริงๆ **ห้ามใช้กับสถานที่ที่ตัวละครในเรื่องยังอาศัย/ใช้งานอยู่** แม้จะขัดสน/โทรมก็ตาม เพราะจะได้ลุคผิดจากที่ตั้งใจ

### Alchemists' Laboratory
Random, Blast Room, Dissection Room, Laboratory, Library, Storage Room

### Balcony
รายการนี้จริงๆ คือ **วัสดุกำแพง/พื้น** ไม่ใช่ประเภทห้อง: Random, Castiron, Desert Stone 1, Gothic Stone 1–5, Gothic Wood, Marble Black, Marble Gilded 1, Masonry 1–3, Mausoleum 1–2, Metal, Rough Stone, Skeletal, Stone Elegant/Heavy/Old/Regular/Simple, Temple, Wonky, Wood Driftwood/Elegant/Simple/Rough/Rough 2

### Castle
Random, Armoury, Barracks, Bedroom, Brewery, Chapel, Coach House, Dungeon, Dungeon Cell, Entrance, Hallway, Kennels, Kitchen, Mausoleum, Rookery, Stable Box, Stables, Throne Room, Treasury

### Crypt
Random, Burial Chamber, Chapel, Dungeon, Dungeon Cell, Great Hall, Hallway

### Desert
Random, Hovel, Laboratory, Palace Baths, Palace Hammam, Palace Tearoom, Palace Throne Room, Palace Treasury, Residential Tent, Teahouse Tent, Tent Shop

### Mansion
Random, Bathroom, Bedroom Master, Bedroom Servants, Dining Room, Great Hall, Greenhouse, Hallway, Kitchen, Lavatory, Living Room, Pantry, Study, Topiary Garden, Wine Cellar

### Pits
Random, Acid Pit, Blood Canal, Bottomless Pit, Canal, Clear Canal, Earthen Dig, Lava Pit, Pit, Rock Dig, Treasure Pit

### Skeletal Palace
Random, Skeletal Throne Room

### Special
Random, Extradimensional Room, Gingerbread House, Ice Palace

### Tavern
Random, Bedroom, Brewery, Great Hall, Hallway, Kitchen, Latrine, Pantry

### Village
Random, Alley, Artificer's Workshop, Artist's Atelier, Bakery, Butcher's Shop, Cabin, Cathedral, Cemetery, Crop Bed, Farmstead, Field, Garden, Magic Shop, Mineshaft, Park, Potion Class, Smithy, Town Square, Witch's Hut, Wizard's Tower, Wonky House
> **ไม่มี Hovel ในหมวดนี้** — Hovel มีอยู่แค่ใน Abandoned Ruins กับ Desert เท่านั้น

**ไม่มี preset "Warehouse/Storage" ทั่วไปในโปรแกรม** ใกล้เคียงสุดคือ `Abandoned Ruins > Hovel` (แต่มาพร้อมดีเทลร้างมานาน) หรือ `Alchemists' Laboratory > Storage Room` (แต่มาพร้อมของแล็บปนด้วย) — ยังไม่เจอ preset ที่ตรง "โกดังธรรมดาที่มีคนใช้งานอยู่จริง" 100%

### 🔵 ฉากกลางแจ้ง/ไม่มีผนัง — ยังต้องใช้ Draw Room preset เสมอ

แม้ฉากจะเป็นกลางแจ้งไม่มีผนังจริงในเนื้อเรื่อง (เช่น ถนนบนเขา, ลานนอกอาคาร) **ก็ต้องระบุ Category > Preset ที่ใกล้เคียงที่สุดเสมอ ห้ามข้าม Draw Room ไปเฉยๆ** เพราะ preset ไม่ได้กำหนดแค่กำแพง แต่กำหนดพื้น/แสง/การจัดวางของอัตโนมัติที่ตรงธีมด้วย — ขั้นตอนที่แนะนำ (🔵 ยังไม่ได้ยืนยันด้วยมือทีละขั้นในโปรแกรมจริง):
1. วาด Draw Room ตาม preset ที่ใกล้เคียงบรรยากาศที่สุดตามปกติ
2. ใช้เครื่องมือ **Walls** (Change All Walls / Change Wall) เอากำแพงที่ AI ใส่มาให้ออก เพื่อให้ฉากอ่านเป็นพื้นที่เปิดโล่ง
3. ถ้า Category ที่มีไม่ตรงภูมิประเทศเลย (เช่น ถนนบนเขาไม่มี preset ตรงในหมวดไหนเลย) ให้เลือก preset ที่ให้พื้น/แสงใกล้เคียงที่สุดแล้วพึ่ง Terrain + Structural/Natural Items ช่วยเสริมรายละเอียดแทน

⚠️ *ยังไม่ได้ลองเองว่ากด "เอากำแพงออก" ได้จริงแบบไหนในโปรแกรม (ลบทีละผนังด้วย Change Wall เป็น "None"/invisible หรือมีปุ่มลบเฉพาะ) — ลองของจริงแล้วมาอัปเดตส่วนนี้*

---

## 🔵 Place Objects — หมวดหมู่ Prop (จากคู่มือ ยังไม่ได้ไล่เช็คทีละอันในโปรแกรม)

หมวดหลักที่ควรจะมีในแถบซ้ายของ Place Objects:
Favorite Items, New Items, Decorations, Statues, Paintings, Rugs, Hangings, Food & Drink, Furniture, Lights (prop เทียน/โคมไฟ ไม่ใช่ tool ปรับแสง), Natural Items, Storage Items, Structural Items, Utility Items, Kickstarter Exclusive Items, Abstract Items

รายละเอียดที่ยืนยันแล้วบางหมวด:
- **Structural Items** — โครงสร้างอาคารเสริม แบ่งย่อยเป็น: Accessibility, Bollards, Bridges, Columns, Constructions, Dungeon, Engineering, Fireplaces, Free-standing Walls, Hatches, Masonry, Pipes, Pits, Metal/Stone/Wood Platforms, Pools, Rails, Round Constructions, Ruins, Stairs Down, Stairs Up, Stone Constructions, Tents, Traps, Woodwork
- **Utility Items** — ของใช้เฉพาะอาชีพ (ช่างตีเหล็ก, นักเล่นแร่แปรธาตุ, คนทำขนมปัง ฯลฯ)
- **Decorations** — ของแต่งทั่วไป: หน้ากาก, ภาพวาด, พรม, ของตกแต่งเทศกาล, ผ้าแขวนผนัง (ธง/gobelin)

⚠️ *ชื่อหมวดพวกนี้อาจไม่ตรง 100% กับที่เห็นในโปรแกรมจริง (คู่มือกับ build ปัจจุบันอาจต่างกัน) — ถ้าเจอว่าไม่ตรง ให้แก้ตามของจริงแล้วมาอัปเดต*

---

## 🔵 Terrain & Create New Map settings

Terrain ที่มีให้เลือก (🟢 ยืนยันจากของจริง): Dark Parchment, Badlands, Caves, Desert, Fey Plane, Forest, Grasslands, Jungle, Skeletal Plains, Snow, Green Screen Background

Terrain คือพื้นดินรอบนอกเท่านั้น **ไม่ใช่ตัวกำหนดว่าฉากเป็นในร่มหรือกลางแจ้ง** — ในร่มมาจากผังห้องที่วาดเอง (มีหลังคา/กำแพง) ทับพื้น terrain อีกที terrain จึงแทบไม่โผล่ให้เห็นถ้าฉากเป็นภายในอาคารทั้งหมด เลือกอะไรก็ได้ที่ใกล้เคียงบรรยากาศรอบนอกสุด (เช่น Badlands สำหรับย่านสลัม/อุตสาหกรรม, Grasslands สำหรับตัวเลือกกลางๆ ไม่มีอะไรพิเศษ)

### 🟢 Change Terrain Type — sub-options (ยืนยันจากของจริง)

แต่ละ Terrain type ที่เลือกจะมีแผงตั้งค่าย่อยเพิ่ม 4 หมวด (แต่ละ terrain มีตัวเลือกในหมวดไม่เหมือนกัน): **Elevation, Vegetation, Water, Weather** — เท่าที่เจอ ไม่ใช่ทุก terrain จะมีครบทั้ง 4 หมวด และตัวเลือกในแต่ละหมวดต่างกันไปตาม terrain ที่เลือกไว้

**Badlands** (🟢 ยืนยันครบจากภาพจริงในโปรแกรม):
- **Elevation**: Flat, Hills, Mountains, Flooded Mountains, Ravine, Flooded Ravine, Grand Canyon, Floodplains, Mesa, Crater, Cave System
- **Vegetation**: No Vegetation, Cacti, Dry Bushes
- **Water**: No Water, Island, Lake, Lakeside, Lava Flow, Lava Lake, Oasis, River
- **Weather**: No Weather, Snow

**Caves** (🟢 ยืนยันครบจากภาพจริงในโปรแกรม — มีหมวดที่ 5 เพิ่มมาคือ **Lights** แทนที่ Weather จะอยู่ตำแหน่งเดิม):
- **Elevation**: Solid Rock, Cave System, Labyrinth, Large Cavern, Ravine, Burrow, Tunnel, Ridge
- **Vegetation**: Cave, Empty Cave, Crystal Cave, Glowing Mushroom Cave
- **Water**: No Water, Island, Lake, Lakeside, River
- **Weather**: No Weather, Snow
- **Lights**: No Lights, Torches, Castle Lights, Crypt Lights, Desert Lights, Laboratory Lights, Mansion Lights, Village Lights

Terrain type อื่นๆ ที่เหลือ (🔵 ยังไม่ได้เปิดดูของจริงทีละอัน — จากคำอธิบาย biome ทั่วไปในคู่มือ/รีวิว ใช้เป็นแนวทางกว้างๆ เท่านั้น):
- **Forest / Grasslands** — มีระบบ Elevation (เช่น Mountains, Hills, Canyon), Vegetation (เช่น Broadleaf Forest, Evergreen Forest, Steppe), Water (เช่น River, Lake, Island) คล้ายกับ Badlands แต่ตัวเลือกในแต่ละหมวดต่างกัน — ยังไม่ยืนยัน list เต็ม
- **Desert** — เน้นเนินทราย พืชพรรณเบาบาง มีโอเอซิสเป็นตัวเลือก water ได้
- **Dark Parchment** — ออกแบบมาให้ไม่เน้น terrain ภายนอกเลย เหมาะกับฉาก indoor/dungeon floorplan ล้วนๆ ที่ไม่ต้องการพื้นหลังธรรมชาติแสดงผล — อาจไม่มี sub-option ให้ปรับเพราะจุดประสงค์คือ "เรียบที่สุด"

⚠️ *ถ้าจะเลือก terrain อื่นนอกจาก Badlands/Caves และต้องการ sub-option ที่แม่นยำ ให้เปิดโปรแกรมเช็คของจริงก่อน (หรือขอ screenshot จากผู้ใช้) แล้วมาอัปเดตส่วนนี้ — อย่าเดา list เต็มจากข้อมูล 🔵 ด้านบน*

**Room Placement** (🔵 จากคู่มือ) = "room placement height" — กำหนดว่าตึก/อาคารจะถูกวางสูงแค่ไหนบน terrain ที่มีความสูงต่างระดับ (เช่น เนินเขา/หน้าผา) ค่า default คือ **Water Level** (ระดับเดียวกับผิวน้ำ/พื้นราบ) ถ้าฉากเป็นพื้นราบธรรมดาแบบโกดัง Brack ปล่อย default ไว้ได้เลย ไม่กระทบอะไร

---

## 🔵 Export → Foundry VTT

1. เปิด **Export panel** ในโปรแกรม เลือก export สำหรับ Foundry โดยเฉพาะ (มีตัวเลือก lighting: render lights ทั้งในภาพและ VTT / เฉพาะภาพ / เฉพาะ VTT)
2. จะได้ไฟล์ภาพ (JPG หรือวิดีโอ) **+ ไฟล์ .json ที่มีข้อมูล wall กับ lighting**
3. ใน Foundry: สร้าง scene เปล่าใหม่ → คลิกขวาที่ scene → **Import Data** → เลือกไฟล์ .json → wall/lighting จะถูก import ทันที
4. คลิกขวาที่ scene อีกครั้ง → **Configure** เพื่อปรับตั้งค่า scene ให้เรียบร้อย (grid alignment, background image ฯลฯ)
5. ถ้าแมพมีหลายชั้น (multi-level) ใช้ Foundry module **"Dungeon Alchemist Level Importer"** — อ่านไฟล์คู่ (ภาพ+json) ทั้งโฟลเดอร์ แล้วรวมเป็น Scene เดียวที่แต่ละชั้นเป็น native Foundry Scene Level ผูก wall/door/light ตามชั้นให้อัตโนมัติ

---

## 🟢 ข้อสังเกต/กับดักที่เจอมาแล้วระหว่างใช้งานจริง

- **วาดห้องแยกกันเพื่อให้ได้กำแพง+ประตูเชื่อมระหว่างห้อง**: ถ้าต้องการ 2 ห้องที่เชื่อมกันด้วยประตู (เช่น ห้องหลัก + ห้องด้านในที่มียามขวางทาง) ต้องวาดเป็น **2 room object แยกกัน** ให้ขอบชนกัน โปรแกรมจะสร้างกำแพง+ช่องประตูให้อัตโนมัติตรงจุดที่ชน — ถ้าลากเป็นสี่เหลี่ยมก้อนเดียวยาวๆ จะได้ห้องเดียว ไม่มีกำแพงแบ่งใดๆ
- **Abandoned Ruins ทุก preset ใส่ลุคร้างมานานอัตโนมัติ** (ดูหัวข้อ Draw Rooms ด้านบน)

---

## แหล่งอ้างอิง (ส่วน 🔵)
ข้อมูลจาก [dungeonalchemist.fandom.com](https://dungeonalchemist.fandom.com/wiki/DungeonAlchemist_Wiki) (Sidebar, Objects, Menu – Export, Sidebar – Room Menu, Objects Category – Structural) และหน้า [Import to Foundry V10 or Newer](https://www.dungeonalchemist.com/import-to-foundry-v10)
