# แผนที่ Novaris

แยกโฟลเดอร์ตามระดับ:

- `world/` — แผนที่โลกทั้งใบ (ใช้เป็น `mapImage` หลักใน `manifest.json`)
- `map-brief-935pd.md` — พิมพ์เขียวชั้นอารยธรรมปี 935 PD (เมือง ขนาด ไร่นา เส้นทาง) สำหรับวาดลงแผนที่โลก
- `azgaar/` — แผนที่โลก Novaris ที่สร้างใน Azgaar (heightmap, biome map, สคริปต์, patch) — ดู `azgaar/README.md`
- `<ทวีป>/` — แผนที่ทวีป (ใช้เป็น `categories[].map.image`) และแผนที่ย่อยของภูมิภาค/เมือง/สถานที่ในทวีปนั้น

ไฟล์ตั้งต้นคัดลอกมาจาก `world-settings/exandria/` — เปลี่ยนเป็นแผนที่ homebrew ได้เลย ถ้าเปลี่ยนชื่อไฟล์ต้องแก้ path ใน `manifest.json` ตามด้วย

รองรับ `.jpg` `.jpeg` `.png` `.webp`
