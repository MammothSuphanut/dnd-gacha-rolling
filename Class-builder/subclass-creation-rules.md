# กฎการสร้าง Subclass ใหม่ (Homebrew, D&D 2024)

ใช้ไฟล์นี้เวลาออกแบบ **subclass ใหม่ของ class ที่มีอยู่แล้ว** (official หรือ homebrew class ที่มีอยู่ในโปรเจกต์ รวมถึง class ใหม่ที่เพิ่งสร้างเองด้วย) อ่าน [Class-builder/README.md](README.md) ก่อนเสมอเพื่อรู้แหล่งข้อมูลอ้างอิงและข้อจำกัดของแอป

## 1. ก่อนเริ่ม: สำรวจของเดิมก่อนเสมอ

1. เปิด [class-subclass-index.md](../codex/General/class-subclass-index.md) ไล่ดู**ทุกแถว**ของ subclass ที่ class เป้าหมายมีอยู่แล้ว (official + Grim Hollow + Valda's Spire) — ห้ามข้ามขั้นนี้แม้จะรู้สึกว่านึกออกแล้วว่ามีอะไรบ้าง เพราะ homebrew บางเล่ม (โดยเฉพาะ Valda's Spire) มี subclass เกือบ 200 ตัวปนกันในไฟล์เดียว โอกาสตกหล่นสูง
2. ถ้ามี [codex/2024-tier-list/](../codex/2024-tier-list/) ของ class เป้าหมายอยู่แล้ว เปิดอ่านประกอบ — ช่วยเห็นภาพว่า "จุดเด่น" ของ subclass ที่มีอยู่ถูกใช้ไปหมดแล้วกี่แบบ (roll manipulation, mobility, lifesteal ฯลฯ) กันไม่ให้ subclass ใหม่ซ้ำ niche เดิมแบบไม่ตั้งใจ
3. ถ้าคอนเซปต์ที่จะสร้างซ้ำกับ subclass ที่มีอยู่แล้วชัดเจน (กลไกหลักเหมือนกัน ต่างแค่ flavor) ให้ทักผู้ใช้ตรงๆ ก่อนเริ่มออกแบบต่อ

## 2. ระดับที่ปลดล็อก Feature — เช็คจาก class จริง อย่าเดา

**ระดับที่เลือก subclass ได้** (level 1/2/3) แตกต่างกันตาม class เป้าหมาย — เปิดไฟล์ class นั้นใน `src/data/5etools/official/class/` (หรือไฟล์ homebrew class ที่เกี่ยวข้อง) ดูค่าจริง อย่าอนุมานจาก class อื่น

**ระดับที่ feature ของ subclass ปลดล็อกหลังจากนั้น** มักจะ**เหมือนกันทุก subclass ภายใน class เดียวกัน** (เช่น Sorcerer 2024 ทุกสาย official ปลดล็อกที่เลเวล 3/6/14/18 ตามที่เห็นใน [The-Ruined-Flame.md](../homebrew-subclass/Sorcerer/The-Ruined-Flame.md), Warlock ปลดที่ 1/6/10/14, Cleric ปลดที่ 1/2/6/8/17 เป็นต้น) — **เปิดดู subclass official 2-3 ตัวของ class เป้าหมายจริงเพื่อหา pattern ที่ใช้ร่วมกัน** แล้วให้ subclass ใหม่ตามรอยระดับเดียวกัน เพื่อให้ผู้เล่นวางแผน build ข้าม subclass ได้สม่ำเสมอ

## 3. Power Budget — เทียบกับ Tier List ของ Class เดียวกัน

ใช้ [2024-tier-list/](../codex/2024-tier-list/) ของ class เป้าหมายเป็นตัวชี้วัดหลัก (ถ้ายังไม่มีไฟล์ tier list ของ class นั้น ให้เทียบกับ subclass official ที่ role ใกล้เคียงที่สุดแทน):

| ตั้งใจวาง Tier | ลักษณะที่ต้องมี |
|---|---|
| A (พลิกเกมได้ชัดเจน) | มี feature เด่น 1 ตัวที่ "ทำสิ่งที่ subclass อื่นทำไม่ได้" แต่ต้องแลกด้วยข้อจำกัด (resource cost, condition, situational) — ห้ามแรงแบบไม่มีข้อแลกเลย |
| B (มั่นคง ใช้งานได้ดีสม่ำเสมอ) | เสริมบทบาทหลักของ class ให้ดีขึ้นชัดเจนแต่ไม่ได้เปิดความสามารถใหม่ที่พลิกเกม |
| C (utility เฉพาะทาง/ความเสถียรต่ำ) | เน้น flavor/niche เฉพาะสถานการณ์ หรือมีองค์ประกอบสุ่มที่ควบคุมไม่ได้ |

subclass ใหม่ควรระบุ **ตั้งใจวาง tier ไหน** ตั้งแต่ต้นคุย (ถามผู้ใช้ตรงๆ ถ้าไม่ได้บอก) แล้วออกแบบ/เช็คตัวเลขให้สอดคล้องกับ tier นั้นตลอด ไม่ใช่ปล่อยให้ลอยแล้วมาเดาทีหลัง

## 4. Checklist ข้อผิดพลาดที่พบบ่อย

บทเรียนจริงจากรอบ balance review ของ [The Ruined Flame](../homebrew-subclass/Sorcerer/The-Ruined-Flame.md) (ดู memory `project_ruined_flame_balance`) — เช็คทุกข้อก่อนสรุปตัวเลขสุดท้าย:

- [ ] **No-save unlimited burst**: feature ที่เพิ่มดาเมจไม่ควรข้าม saving throw ของ spell ต้นทาง (ถ้า spell มี save ให้ดาเมจเสริมตามผลของ save เดิม — full เมื่อ fail, half เมื่อ pass — ไม่ใช่บวกดาเมจอัตโนมัติทุกกรณี)
- [ ] **Upcast scaling เกินสัดส่วนของ spell ต้นทาง**: ถ้า feature ให้โบนัสสเกลตาม spell slot level ที่ใช้ ต้องเทียบกับอัตราสเกลของ spell นั้นเอง (เช่น Fireball สเกล +1d6/level ปกติ — feature ที่ให้ +3d6/level คือสเกลเกิน 3 เท่าโดยไม่มีต้นทุนเพิ่ม)
- [ ] **Double-dipping เงื่อนไขเดียวกันซ้ำ**: เช็คว่า feature 2 ตัวใน subclass เดียวกันไม่ได้ให้โบนัสจากเงื่อนไขที่เกือบจะเป็นเงื่อนไขเดียวกันซ้ำ (เช่น "โบนัสถ้าโจมตีเป้าเดียว" ซ้ำกับกลไกที่ตัว subclass ออกแบบให้เล่นเป้าเดียวเป็นค่าเริ่มต้นอยู่แล้ว)
- [ ] **Stacking กับ class-native feature ที่ทำให้เกิดซ้ำได้หลายครั้ง/เทิร์น**: เช็คว่า metamagic/feature พื้นฐานของ class (เช่น Sorcerer's Quickened Spell) ไม่ทำให้ trigger ของ feature ใหม่เกิดซ้ำได้เกิน 1 ครั้ง/เทิร์นโดยไม่ตั้งใจ — ถ้าจำเป็นให้ระบุชัดว่า "the first [X] you cast on your turn" กันการ double-trigger
- [ ] **Capstone ไม่มีข้อจำกัดต่อ rest**: capstone/feature แรงระดับสูงควรมี cap ต่อ long rest (หรือ resource cost สูงพอที่ใช้ซ้ำได้จำกัดจริง) เทียบกับ capstone official/Grim Hollow ของ class เดียวกันว่า cap แบบไหน (ดูตัวอย่างการเทียบ capstone ข้าม splatbook ใน memory `project_ruined_flame_balance`)
- [ ] **MAD โดยไม่ตั้งใจ**: feature ใหม่ไม่ควรบังคับให้ต้องมีค่าพลังรองสูงเกินจำเป็น (เช่น subclass caster ที่จู่ๆ ต้องพึ่ง STR/DEX สูงเพื่อให้ feature ทำงานเต็มที่)

## 5. Balance Validation — ตัวอย่างจริง

วิธีที่ใช้จริงกับ The Ruined Flame (Sorcerer, ธีม single-target Fireball nova):

1. **หา benchmark**: เลือก spell หรือ feature official ระดับ/เลเวลใกล้เคียงที่สุดที่ทำหน้าที่คล้ายกัน (ตัวอย่าง: เทียบดาเมจ single-target ปลาย-เกมกับ Finger of Death ~64 เฉลี่ย, เทียบ slot ปลาย-เกมกับ Meteor Swarm/Disintegrate)
2. **คำนวณ DPR เฉลี่ยที่ benchmark level** (char level 17-20, ใช้ spell slot สูงสุดที่เข้าถึงได้) รวมโบนัสจาก feature ใหม่ทั้งหมดเข้าไปด้วย แล้วเทียบกับตัวเลขข้อ 1 — ถ้าเกินเยอะ (เช่น ~105 เทียบกับ benchmark ~64) คือสัญญาณ overtuned ชัดเจน ต้องลดสเกล/เพิ่มเงื่อนไข
3. **เช็ค action economy**: feature ใช้ action/bonus action/reaction เท่าไหร่ต่อ trigger และมี metamagic/feature อื่นในตัว class เดียวกันที่ทำให้ trigger ซ้ำในเทิร์นเดียวได้หรือไม่ (ดู checklist ข้อ 4 ด้านบน)
4. **เช็ค uses-per-rest cap เทียบข้าม splatbook**: ไล่ดู capstone/big-burst feature ของ subclass official + homebrew อื่นในclassเดียวกัน (รวม Grim Hollow ที่มักจะ power-creep กว่า official เล็กน้อย) ว่า cap ที่ใช้จริงคือเท่าไหร่ (1/long rest, N SP ต่อครั้ง ฯลฯ) แล้วเทียบให้ subclass ใหม่อยู่ในช่วงเดียวกัน ไม่ใช่หลุดออกไปเป็น outlier
5. หลังปรับตัวเลขแล้ว **สรุปให้ผู้ใช้เห็นตัวเลขก่อน-หลัง** พร้อมเหตุผล ให้ผู้ใช้เป็นคนตัดสินใจสุดท้ายว่าจะรับ fix หรือเลือกทางอื่น (เช่น การแลกด้วยข้อจำกัดการเลือก spell แทนตัวเลข — ให้เสนอเป็นทางเลือก ไม่ใช่บังคับ)

ดูรายละเอียดเต็มของเคสนี้ได้ที่ [homebrew-subclass/Sorcerer/The-Ruined-Flame.md](../homebrew-subclass/Sorcerer/The-Ruined-Flame.md)

## 6. Output File

บันทึกเป็น `homebrew-subclass/<ClassName>/<SubclassName>.md` (สร้างโฟลเดอร์ `<ClassName>` ถ้ายังไม่มี) โครงไฟล์แนะนำ (mirror จาก The Ruined Flame):

```markdown
# <ประเภท Subclass ของ Class เช่น "Sorcerous Origin">: <ชื่อ Subclass>

> Flavor quote สั้นๆ 1-3 ประโยค บอกธีม/บรรยากาศของ subclass

## Designer's Note (ถ้ามี)

แรงบันดาลใจ/ปัญหาที่อยากแก้ตอนออกแบบ subclass นี้ (optional แต่แนะนำให้มี)

## เลเวล <N> — <ชื่อ Feature>

*Flavor บรรทัดเดียว (optional)*

คำอธิบายกลไกเต็ม — ระบุ resource cost, เงื่อนไข, ผลลัพธ์ให้ชัดเจนแบบเดียวกับ official statblock

(ไล่ทุกเลเวลที่ subclass นี้มี feature ใหม่ ตามระดับที่หาได้จากข้อ 2 ด้านบน...)
```

## 7. ลงทะเบียนเข้า Gacha Pool (ถ้าผู้ใช้ต้องการ)

หลังสร้างไฟล์เสร็จ ถามผู้ใช้ว่าอยากให้ subclass นี้ roll ได้จริงในแอปไหม ถ้าใช่ เพิ่ม entry ใหม่เข้า box ที่เหมาะสมใน `src/data/classes.json`:

```json
{
  "id": "item-<uuid ใหม่>",
  "name": "<ชื่อ Subclass>",
  "weight": 1,
  "tag": "Core",
  "image": "",
  "note": "Source: Homebrew",
  "group": "<ClassName>",
  "link": "/homebrew-subclass/<ClassName>/<SubclassName>"
}
```

เลือก box (`Standard` / `Core` / `Supplement`) ให้สอดคล้องกับ box ที่ subclass อื่นของ class เดียวกันอยู่ (ดู `group` ที่ตรงกันในไฟล์เพื่อหาตำแหน่งที่ถูกต้อง)
