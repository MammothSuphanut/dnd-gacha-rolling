# แผนที่ Exandria+ ใน Azgaar

แผนที่โลก Exandria+ สร้างด้วย [Azgaar's Fantasy Map Generator](https://github.com/Azgaar/Fantasy-Map-Generator) (MIT) ฉบับที่แก้โค้ดเองให้อ่าน heightmap และ biome ที่ดึงมาจากแผนที่ Exandria ของ occidentalavian (Speculative 2024, high res 16200×10800)

## ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | คืออะไร |
|---|---|
| `heightmaps/exandria.png` | heightmap สีเทา 1800×1200 (ค่าแดง/255 < 0.2 = น้ำ) — สร้างจาก `make_heightmap.py` |
| `heightmaps/exandria-biomes.png` | biome map 1620×1080 (ค่าแดง = biome id: 0–12 ของ Azgaar, 13+ ของ Exandria) — สร้างจาก `make_biomemap.py` |
| `heightmaps/exandria-rivers.json` | เส้นแม่น้ำที่ trace จากแผนที่ต้นฉบับ (polyline พิกัดแผนที่ 1800×1200, ต้นน้ำก่อน) — สร้างจาก `make_rivers.py` |
| `heightmaps/exandria-states.json` | 17 ประเทศ: ชื่อ รูปแบบการปกครอง เมืองหลวง (พิกัด) สี ขอบเขต (`region` polygon) — แก้มือได้ |
| `heightmaps/exandria-burgs.json` | 64 เมืองที่มีชื่อ (นอกจากเมืองหลวง): ชื่อ พิกัด ประชากรจริง (พันคน) — อ่านจากแผนที่ต้นฉบับ + Map Brief |
| `heightmaps/exandria-cultures.json` | 27 วัฒนธรรม: name base ของ Azgaar (ใช้ตั้งชื่อเมืองสุ่ม), ขอบเขต, ศาสนาประจำ |
| `heightmaps/exandria-religions.json` | 18 ศาสนา (ชื่อ, เทพ, รูปแบบ, สี) |
| `heightmaps/exandria-labels.json` | 32 ชื่อภูมิภาค/ทะเลบนแผนที่ (พิกัดจากแผนที่ต้นฉบับ) |
| `heightmaps/exandria-biomes.json` | ชื่อ/สี/habitability ของ biome เฉพาะ Exandria (id 13+) — สร้างคู่กับ biome map |
| `saves/exandria-plus.map` | **แผนที่หลัก** — ไฟล์ .map ของ Azgaar (เปิดได้ทั้งใน app เราและ azgaar.github.io) |
| `exandria-azgaar.patch` | โค้ดที่แก้ใน Azgaar (ลงทะเบียน heightmap "Exandria", อ่าน biome map + biome เพิ่ม, แทนแม่น้ำที่ Azgaar สร้างด้วยแม่น้ำที่ trace, cell สูงสุด 300K, ปิด iceberg, endpoint เซฟ/โหลดลง `saves/`) |
| `scripts/` | สคริปต์ Python สร้าง heightmap/biome map ใหม่จากแผนที่ต้นฉบับ |
| `app/` | Azgaar ที่แก้แล้วพร้อมรัน — **ไม่อยู่ใน git** (third-party + node_modules) สร้างใหม่ได้ตามขั้นตอนข้างล่าง |

## รัน Azgaar

```bash
cd world-settings/exandria-plus/maps/azgaar/app
npm ci --ignore-scripts
npx vite --port 5179 --strictPort
```

เปิดแผนที่หลักที่เซฟไว้ (ถ้าเปิดแค่ `http://localhost:5179/Fantasy-Map-Generator/` Azgaar จะ**สร้างแผนที่ใหม่** — ชื่อ/ประเทศสุ่มใหม่):

```
http://localhost:5179/Fantasy-Map-Generator/?maplink=http://localhost:5179/Fantasy-Map-Generator/__exandria/map%3Fname%3Dexandria-plus
```

## เซฟแผนที่ลงโปรเจกต์

endpoint `/Fantasy-Map-Generator/__exandria/map?name=<ชื่อ>` (มีเฉพาะตอนรัน dev server) — POST = เขียน `saves/<ชื่อ>.map`, GET = อ่าน รันใน console ของหน้า Azgaar:

```js
await fetch('/Fantasy-Map-Generator/__exandria/map?name=exandria-plus', { method: 'POST', body: await Services.Save.prepareMapData() }).then(r => r.text())
```

ชื่อไฟล์ใช้ได้แค่ `a-z 0-9 -` · เซฟทับไฟล์เดิมเสมอ ถ้าอยากเก็บเวอร์ชันเก่าให้ใช้ชื่อใหม่หรือ commit ก่อน

## สร้าง `app/` ใหม่ (ถ้าหายหรือเครื่องใหม่)

```bash
cd world-settings/exandria-plus/maps/azgaar
git clone https://github.com/Azgaar/Fantasy-Map-Generator.git app
git -C app checkout 8936c9c235d08fe3eac1b00ec5b74fb57ed791cc
git -C app apply ../exandria-azgaar.patch
cp heightmaps/exandria.png heightmaps/exandria-biomes.png heightmaps/exandria-biomes.json heightmaps/exandria-rivers.json heightmaps/exandria-states.json heightmaps/exandria-burgs.json heightmaps/exandria-cultures.json heightmaps/exandria-religions.json heightmaps/exandria-labels.json app/public/heightmaps/
```

## ค่าที่ตั้งใน Azgaar

**Options**
- Map size: **1800 × 1200** px (สัดส่วน 3:2 เท่าแผนที่ต้นฉบับ)
- Burgs number: **250** (เมืองสุ่มเพิ่มจากเมืองที่มีชื่อ — โลกชายแดน ไม่ต้องหนาแน่น)
- Points number: **15** (300K cells — patch เพิ่มขั้น 14 = 200K / 15 = 300K จากเดิมสูงสุด 100K เพื่อให้ชายฝั่ง แหลมแคบ และเกาะเล็กออกมาครบ · generate ราว 20–30 วินาที)
- Heightmap: **Exandria**

**Configure World**
- Equator **27°C** · North Pole **-30°C** · South Pole **-20°C**
- Tools → Units → Population: **170** คนต่อจุดประชากร (ทำให้รวมทั้งโลก ≈ 94 ล้าน: ชนบท ~81 ล้าน + เมือง ~13 ล้าน, ตาม canon ~100 ล้าน)
- Map size **75%** · Latitudes **15** → ขอบบน 83°N ถึงขอบล่าง 52°S (ทางเหนือหนาวพอเป็นหิมะ, Marquet ทางใต้ไม่เป็นน้ำแข็ง)

## สเกลโลก (canon ข้อ 22: ×4)

| ที่ไหน | ตั้งค่า |
|---|---|
| Azgaar → Tools → Units → Distance scale | **43.2** mi ต่อ px (ตั้งไว้ใน `.map` แล้ว) |
| Foundry scene แผนที่โลก (ภาพ 16200×10800) | 4.8 ไมล์/px → เลือกได้: **Grid 20 px / Distance 96 mi** (1 ช่อง = เดิน 4 วัน) หรือ **Grid 10 px / Distance 48 mi** (1 ช่อง = 2 วัน) |

เทียบสเกลเดิม (Grid 20 px / 24 mi = 1.2 ไมล์/px): ระยะทุกคู่ยาวขึ้น 4 เท่า เช่น Palebank → Uthodurn 524 → ~2,100 ไมล์ (≈ 87 วัน Normal pace)

## สร้าง heightmap / biome map ใหม่

ต้องมี Python + Pillow + numpy + scipy แผนที่ต้นฉบับ high res อยู่ใน Foundry: `D:/FoundryVTT_Data/Data/worlds/astral-nexus-constellation-protocol/Campaigns/00 Gerneral Campaigns Data/scenes/Exandria/Exandria - Speculative 2024 (high res).png`

```bash
python scripts/make_mid.py "<high res png>" mid.png
python scripts/make_heightmap.py mid.png heightmaps/exandria.png hm_preview.png
python scripts/make_biomemap.py mid.png heightmaps/exandria.png heightmaps/exandria-biomes.png biomes_preview.png
python scripts/make_rivers.py mid.png heightmaps/exandria.png heightmaps/exandria-rivers.json rivers_preview.png
cp heightmaps/exandria.png heightmaps/exandria-biomes.png heightmaps/exandria-biomes.json heightmaps/exandria-rivers.json heightmaps/exandria-states.json heightmaps/exandria-burgs.json heightmaps/exandria-cultures.json heightmaps/exandria-religions.json heightmaps/exandria-labels.json app/public/heightmaps/
```

`make_biomemap.py` และ `make_rivers.py` ต้องรันหลัง `make_heightmap.py` เสมอ (ใช้ heightmap เป็นตัวกำหนดแผ่นดิน/ภูเขา)

### ปรับได้ใน `make_heightmap.py`
- `boxes` — กรอบป้าย/legend บนแผนที่ต้นฉบับที่ต้องตัดทิ้ง (พิกัดแบบ 1620×1080)
- `CUT, GAP` — ขยายช่องแคบระหว่าง Tal'Dorei กับ Wildemount (`GAP = 0` = ตามต้นฉบับ)
- สัมประสิทธิ์ภูเขา `110 * ...` — สูงเกินไปยอดเขากลางทวีปจะกลายเป็นธารน้ำแข็ง

- ตัวหนังสือบนทะเล: ตัวกรองหมึกสีน้ำตาลแดงจับป้ายส่วนใหญ่ได้เอง ป้ายที่ใช้หมึกสีเดียวกับแผ่นดิน (SWAVAIN ISLANDS, MENAGERIE COAST) ต้องใส่ใน `boxes` เอง — ถ้าเจอป้ายกลายเป็นเกาะ ให้เพิ่มกรอบตรงนั้น
- ทะเลตื้นติดชายฝั่งตั้งไว้ที่ 50 (ต่ำกว่าเกณฑ์แผ่นดิน 51 นิดเดียว) เพื่อไม่ให้ Azgaar เฉลี่ยแหลมแคบ/เกาะเล็กจมหาย

### biome เฉพาะ Exandria (`CUSTOM` ใน `make_biomemap.py`)

| id | ชื่อ | สี | habitability | จับจาก |
|---|---|---|---|---|
| 13 | Xhorhas Badlands | `#a08660` | 15 | พื้นสีน้ำตาลฝั่งตะวันออกของ Wildemount (ตะวันออกของแนวเขา Ashkeeper) |
| 14 | Greying Wildlands | `#6f6680` | 6 | ป่าทึบสีม่วงเทาใต้แผ่นน้ำแข็งทางเหนือของ Wildemount (ส่วนที่เป็นหิมะยังเป็น Glacier) |
| 15 | Rosohna Blight | `#8e2b2b` | 2 | พื้นที่สีแดงกลาง Xhorhas |

เพิ่ม biome ใหม่: ใส่ใน `CUSTOM` (id ต้องเรียงต่อกันจาก 13) แล้ววาดลง `cls` — Azgaar จะสร้าง biome ให้เองตอน generate

### แม่น้ำ (`make_rivers.py` + `Rivers.applyTraced` ใน patch)
- จับเส้นแม่น้ำจากสี 2 แบบ: สีเดียวกับทะเลสาบ หรือ "ฟ้ากว่าพื้นรอบ ๆ" ชัดเจน (ตัดหิมะ ป่าม่วง Greying Wildlands และไอคอนเมืองสีขาวออก) → skeleton → แยกเป็นเส้น ยาวสุดก่อน (แม่น้ำสายหลักก่อนสาขา)
- ใน Azgaar: ลบแม่น้ำที่สร้างเองทิ้ง แล้ววาดตามเส้นที่ trace — หันปลายที่ติดน้ำ/ต่ำกว่าเป็นปากแม่น้ำ, ถ้าชนแม่น้ำสายอื่นกลายเป็นสาขา, ถ้ายังไม่ถึงน้ำจะไหลลงเนินต่อจนถึงทะเล/ทะเลสาบ
- ผล: 85% ของ cell แม่น้ำอยู่บนเส้นแม่น้ำของต้นฉบับ (เดิมที่ Azgaar สร้างเองตรงแค่ ~46%) · ทะเลสาบ (51 แห่ง) มาจาก heightmap ตรงกับต้นฉบับอยู่แล้ว

### ประเทศ (`exandria-states.json` + patch ใน burgs/states generator)
- แต่ละรายการ = 1 ประเทศ: Azgaar วางเมืองหลวงที่ `x,y` (cell ที่มีคนใกล้สุด) ใช้ `name`/`capital` ตามไฟล์ และขยายเขตแดนตามปกติ แต่**ห้ามออกนอก `region`** (polygon พิกัด 1800×1200, ขอบสั่นเล็กน้อยให้ดูเป็นธรรมชาติ)
- สี/ชื่อเต็ม/รูปแบบ ล็อกไว้ (`lock`) ไม่ให้ Azgaar เปลี่ยน · พื้นที่นอก region ทุกประเทศ = ดินแดนไร้รัฐ (Neutrals ~27% ของแผ่นดิน: Greying Wildlands, Xhorhas ใต้/Blightshore, Rifenmist/Verdant, Thorain, เกาะต่าง ๆ, Shattered Teeth)
- `expansionism` = ความไวในการขยายภายใน region (นครรัฐตั้ง 5 ให้เต็มพื้นที่เล็ก ๆ ของตัวเอง)
- ชื่อที่มี `(TBD)` = canon ยังไม่ได้ตั้งชื่อ (อาณาจักรจีน, แคว้นญี่ปุ่น) — แก้ในไฟล์แล้ว generate ใหม่

### เมือง (`exandria-burgs.json`)
- เมืองหลวง 17 แห่ง (จาก states) + เมืองมีชื่อ 64 แห่ง วางที่ cell มีคนใกล้พิกัดที่สุด (คลาดได้ ~10 px) · ประชากรตามไฟล์ (คนจริง ไม่ขึ้นกับ population scale) ตาม Map Brief หัวข้อ 3
- เมืองสุ่ม 250 แห่งเติมเฉพาะในเขต `region` ของประเทศ — ดินแดนไร้รัฐไม่มีเมืองสุ่ม (มีแค่เมืองที่มีชื่อ เช่น Palebank)

### วัฒนธรรม ศาสนา ชื่อภูมิภาค
- **วัฒนธรรม**: cell บนบกเป็นของวัฒนธรรมแรกในลิสต์ที่ `region` ครอบ (ลำดับสำคัญ: ชนเผ่า → นครรัฐเล็ก → รัฐใหญ่) ไม่มี region ไหนครอบ = วัฒนธรรมที่ศูนย์กลางใกล้สุด · ภาษาเมืองสุ่มตาม name base: Dwendalian=German, Kryn=Dark Elven, Clovis=Italian, Tal'Dorei=English, Othanzian=Korean, Celestial=Chinese, Utesspire=Japanese, Harelian=Roman, Jrusari=Vietnamese (ใกล้ไทยที่สุดที่ Azgaar มี), Yiosi=Karnataka, Ehrvarian=Greek, Shammeli=Nordic ฯลฯ
- **ศาสนา**: ทุก cell นับถือศาสนาประจำวัฒนธรรมของตน (`religion` ในไฟล์วัฒนธรรม) · เทพตาม canon "ที่อยู่ของเทพ" ที่มีระบุ (Bahamut, Luxon, Erathis, Pelor, Moradin, Bane, Sarenrae, Titania, Melora, Great Mother, Seren) — ศาสนาที่ deity ว่าง (Way of Heaven, Shrines of the Kami, Imperial Cult, Lambent Path, Old Blood ฯลฯ) และศาสนาของ Corellon ที่ Syngorn เป็น**ข้อเสนอ ยังไม่ใช่ canon**
- **ชื่อภูมิภาค**: added labels จาก `exandria-labels.json` ใส่ตอนสร้างแผนที่

### ข้อจำกัดที่รู้แล้ว
- เกาะจิ๋วระดับจุด (เล็กกว่า ~1 cell) ยังหาย เช่นเกาะหินเล็ก ๆ รอบ Shattered Teeth
- ป่าจับจาก "ความหนาแน่นไอคอนต้นไม้" (พิกเซลเขียวเข้มในรัศมี ~15px ของภาพ 3240 > 17%) แล้วแยกชนิดตามละติจูด: เหนือ = Taiga, กลาง = Temperate deciduous, ใต้ = Tropical rainforest — รอยต่อแถบละติจูดยังเห็นเป็นเส้นได้บางจุด (เช่นกลาง Tal'Dorei ใต้)
- แม่น้ำจับได้เฉพาะเส้นที่เห็นชัด (83 สาย) — เส้นจาง ๆ บางสายหลุด; ส่วนที่ไม่มีแม่น้ำในต้นฉบับจะไม่มีแม่น้ำเลย เพิ่มเองได้ด้วยปุ่ม "Add river" ของ Azgaar (คลิกจุดเดียว แม่น้ำไหลลงเนินจนถึงน้ำให้เอง)
