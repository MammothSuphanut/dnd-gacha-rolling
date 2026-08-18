# Novice Job Line: Mage → Wizard/Sage

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 6 สาย)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว

## ROX Skill Reference — Mage → Wizard/Sage

#### Mage (1st Class)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Cold Bolt / Fire Bolt / Lightning Bolt | เรียกสายฟ้า/ไฟ/น้ำแข็งลงมาโจมตีเป้าเดียว (สกิลโจมตีธาตุพื้นฐานของ Mage) |
| Napalm Beat | โจมตีเวท ghost property รอบตัวเป้าหมาย ต้นทางของสาย Mage |
| Soul Strike | เรียกวิญญาณศักดิ์สิทธิ์โจมตี ghost property เพิ่มดาเมจใส่ undead |
| Fire Ball | ลูกไฟระเบิด AoE เล็ก (ต้องมี Fire Bolt lv4) |
| Fire Wall | สร้างกำแพงไฟกันทาง สร้างดาเมจ+knockback ให้ศัตรูที่เดินผ่าน |
| Frost Diver | โจมตีน้ำแข็ง มีโอกาสแช่แข็งเป้าหมาย (ต้องมี Cold Bolt lv5) |
| Stone Curse | สาปเป้าหมายกลายเป็นหินชั่วคราว ใช้ Red Gemstone |
| Thunderstorm | พายุฟ้า AoE ต่อเนื่อง (ต้องมี Lightning Bolt lv4) |
| Safety Wall | กำแพงเวทกันดาเมจกายภาพระยะประชิด (ต้องมี Napalm Beat + Soul Strike, ใช้ Blue Gemstone) |
| Sight | ตรวจจับศัตรูซ่อนตัวรอบตัว |
| Energy Coat | โล่เวทลดดาเมจกายภาพ แลก SP ต่อเนื่อง |
| Increase SP Recovery | Passive ฟื้น SP เร็วขึ้นเมื่อยืนนิ่ง |

*หมายเหตุ*: ROX รีเนม/ปรับบางสกิลจากชื่อ RO classic ข้างต้น (เช่น Frost Diver → "Frost Driver", Increase SP Recovery → "Zen") — ใช้ชื่อ RO classic เป็นหลักในตารางนี้เพื่อความชัดเจนของแหล่งอ้างอิง

*Source:* [Ragnarok Online (Renewal) Mage Skills](https://renewal.playragnarok.com/gameguide/classes_skill.aspx?c=3), [Ragnarok X: Next Generation Mage Skill Database](https://hthgaming.com/rox-mage-skill-database/) (ใช้เฉพาะส่วนที่ยืนยันเป็น 1st Class จริง — บางรายการในฐานข้อมูลนี้ปนกับ tier Wizard/High Wizard จึงตัดออกไม่ใส่ซ้ำ)

#### Wizard (2nd)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Fire Bolt / Cold Bolt / Lightning Bolt | โจมตีธาตุเป้าเดียว (ไฟ/น้ำแข็ง/ฟ้า) |
| Soul Strike | โจมตีเวท ghost property |
| Fire Ball | ลูกไฟ AoE เล็ก |
| Frost Diver | แช่แข็ง unable to move |
| Stone Curse | กลายเป็นหินชั่วคราว |
| Napalm Beat | โจมตีเวทเป้าเดียว ต้นทาง |
| Fire Wall / Ice Wall | สร้างกำแพงธาตุกันทาง |
| Frost Nova | ระเบิดน้ำแข็งรอบตัว หน่วง speed |
| Jupitel Thunder | โจมตีฟ้าเป้าเดียว |
| Lord of Vermilion | ระเบิดฟ้า AoE ใหญ่ |
| Quagmire | ดีบัฟลด ASPD/Speed พื้นที่ |
| Sightrasher | เวทเป้าเดียวธาตุ neutral |
| Water Ball | ลูกน้ำโจมตี AoE |

#### High Wizard (Transcendent)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Meteor Storm | ฝนดาวตก ดาเมจ AoE ต่อเนื่อง |
| Storm Gust | พายุหิมะ AoE + freeze |
| Chain Lightning | ฟ้ากระโดดหลายเป้า |
| Napalm Vulcan | ระเบิดเวท AoE รอบเป้าหมาย |
| Abyssal Swamp | ดีบัฟพื้นที่ ลดสเตตัส |
| Heaven's Drive | เวท AoE พร้อมโอกาส stun |
| Mystical Amplification | บัฟเพิ่มดาเมจเวทครั้งถัดไป |

#### Warlock (3rd)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Crimson Rock | หินไฟระเบิด AoE |
| Comet | ดาวหางดาเมจสูงมาก AoE |
| Jack Frost | น้ำแข็งดาเมจ + freeze |
| Frost Misty | หมอกน้ำแข็งดีบัฟพื้นที่ |
| Sienna Execration | ดีบัฟลบเวทป้องกันศัตรู |
| Tetra Vortex | รวมธาตุ 4 แบบ ดาเมจสูงเป้าเดียว |
| Marsh of Abyss | ดีบัฟหน่วง Speed/ASPD พื้นที่ |
| White Imprison | ขังเป้าหมายในเวทมนตร์ |
| Hell Inferno | โจมตีธาตุมืด/ไฟผสม |
| Recognized Spell | เพิ่มพลังเวทให้ skill ถัดไป |

#### Arch Mage (4th)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Astral Strike | ดาเมจ AoE สูงมาก |
| Climax | บัฟอัพเกรด skill Arch Mage ที่เลือกไว้ |
| (mastery ธาตุ undead/shadow) | ปลดล็อก mastery ธาตุใหม่ที่ tier ก่อนไม่มี |

#### Sage (2nd)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Free Cast | เดินระหว่างร่ายเวทได้ |
| Dispel | ล้างบัฟ/สถานะเวทของเป้าหมาย |
| Elemental Change (Aqua/Fervor/Ventus/Terra) | เปลี่ยนธาตุอาวุธ/ตัวเอง |
| Earth Spike | โจมตีธาตุดินเป้าเดียว |
| Deluge/Volcano/Violent Gale/Land Protector | สร้างพื้นที่ธาตุเสริม/ป้องกันปาร์ตี้ |

#### Scholar (Transcendent) — *(alt name ของ "Professor" ในภาคหลักด้วย ไม่ใช่ชื่อ ROX เฉพาะ)*

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Soul Exhale | ปล่อย SP สะสมคืนให้ปาร์ตี้ |
| Indulge | มอบ SP ให้พันธมิตรโดยตรง |
| Soul Siphon | ดูด SP จากศัตรู/แหล่งอื่นมาใช้ |

#### Sorcerer (3rd) *(ชื่อ+skill ยืมจาก RO classic)*

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Varetyr Spear | หอกฟ้าจากฟากฟ้า ดาเมจสูง |
| Psychic Wave | คลื่นเวท AoE เส้นตรง |
| Earth Grave | หนามดินทิ่มจากพื้น AoE |
| Diamond Dust | น้ำแข็ง AoE ใหญ่ |
| Cloud Kill | เมฆพิษดาเมจต่อเนื่อง |
| Fire/Water/Wind/Earth Insignia | เสริมพลังธาตุพื้นที่ให้ทีม |
| Spell Fist | รวมเวทเข้าหมัดโจมตีประชิด |
| Summon Elemental Spirit (Agni/Aqua/Ventus/Tera) | เรียกวิญญาณธาตุมาช่วยรบ |

#### Elemental Master (4th)

| Skill | ความสามารถคร่าวๆ |
|---|---|
| Activity Burn | ดาเมจต่อเนื่องจากวิญญาณธาตุ |
| Conflagration | ไฟลุกไหม้พื้นที่ |
| Diamond Storm | พายุน้ำแข็ง AoE |
| Elemental Buster | ระเบิดพลังวิญญาณธาตุ ดาเมจสูง |
| Elemental Spirit Mastery | Passive เสริมพลังวิญญาณธาตุ |
| Elemental Veil | บัฟป้องกันจากวิญญาณธาตุ |
| Increasing Activity | เร่งวิญญาณธาตุให้ทำดาเมจไวขึ้น |
| Lightning Land | สายฟ้าฟาดพื้นที่ |
| Magic Book Mastery | Passive เพิ่มดาเมจเวท |
| Psychic Stream | คลื่นเวทต่อเนื่อง |
| Spell Enchanting | เสริมเอฟเฟกต์พิเศษให้เวท |
| Summon Elemental Ardor/Diluvio/Procella/Serpens/Terremotus | เรียก High Elemental Spirit ตามธาตุ |
| Terra Drive | พลังธาตุดินระเบิด AoE |
| Venom Swamp | บึงพิษดาเมจต่อเนื่อง |

*Source:* [Ragnarok Mobile Mage/Wizard/High Wizard Guide](https://99porings.com/mobile.php?guide=ragnarok-mobile-mage-wizard-high-wizard-guide), [Sage + Scholar Preview (YouTube)](https://www.youtube.com/watch?v=Kqphlbvaz3E)
