# Chapter 2 — Runestone Caverns
**Undermountain Level 20** — เลเวลตัวละครแนะนำ 16-17 (จบชั้นแล้วควรถึงกลางเลเวล 17)

## Quick Notes
- **ชั้นนี้คือจุดบรรจบของหลายฝ่าย** โดยเฉพาะถ้าใช้ทุกส่วนเสริมของ Companion: Shadowdusk Expedition (อุโมงค์ไป L21), เผ่า Myconid (area 4), หน่วยจู่โจม duergar (area 7), the Gentlemen Bastards (area 3), และ Stonecloak golems ที่คอยเป็นฉากหลังทั่วชั้น
- **หอคอย Stalagmite คือ lair ของ Ezzat** — ทำให้ CR ของมันขึ้นเป็น 22 ขณะอยู่ในหอคอย ปาร์ตี้ควรพยายามล่อมันออกมาสู้นอกหอคอย แต่ด้วย Intelligence 20 ไม่มีอะไรโน้มน้าวมันให้ออกมาได้ง่ายๆ แม้แต่ Ipses เพื่อนคู่ใจก็ตาม
- **หอคอยเข้าได้ทางประตูหน้าเท่านั้น** ประตูมีเวทดักไว้ Teleportation และเวทแบบ *passwall* ใช้ไม่ได้กับหอคอย ซึ่งยังต้านทานความเสียหายทุกชนิดด้วย
- **"Dealing with Ezzat"** — ปาร์ตี้ควรเริ่มชั้นนี้โดยรู้เป้าหมายอยู่แล้ว (จาก Send-Off ของ L19): ตามหา Ezzat แล้วขโมย phylactery ทางที่ดีที่สุดคือสู้มันนอก lair แต่ Ezzat ไม่ชอบออกจากหอคอยเลย การล่อมันออกมาต้องจับ Ipses เป็นตัวประกัน, สร้างสถานการณ์หลอกล่อ, หรือยุให้ฝ่ายอื่นปะทะกับมันแทน (Shadowdusk Expedition, duergar, Gentlemen Bastards)
- **"Maximum Absurdity" ตัวแปรเสริม**: Companion แนะนำเพลงลิขสิทธิ์จริงประกอบบางฉาก (Thriller ตอน Gorka Tharn ตื่น, U Can't Touch This ตอนสู้ golem area 11a) — เป็นตัวเลือกเสริมเท่านั้น ไม่ใช่มาตรฐาน
- **Dramatized Visions of the Past** — ตารางสุ่ม d8 ที่ Companion อ้างถึงเป็น compendium table แยกต่างหาก ไม่มีเนื้อหาอยู่ในไฟล์ source ที่ดึงมาได้ (ไม่ปรากฏใน JSON dump) — EP02 เติมตารางนี้เองให้สอดคล้องกับธีมความสัมพันธ์ Halaster/Ezzat โดยอ้างอิงบริบทที่มีอยู่แล้ว (ธงไว้ว่าเป็นเนื้อหาที่ AI แต่งเติม ไม่ใช่ต้นฉบับ)

### Previously on Dungeon of the Mad Mage
- **Retrieve a Runestone Fragment** — เควสต์ค้างจาก Jalester Silvermane ใน Waterdeep (Dragon Heist) ยังใช้ได้ในชั้นนี้ — Runestone fragment หาได้จากพื้นรอบหอคอย (area 14) หรือชามคริสตัลในห้องแล็บ (area 20)
- ถ้าปาร์ตี้เคยเจอ duergar เผ่า Ironeye นำโดย Skella ที่ L6 (Lost Level) — Skella กลับมาปรากฏตัวได้ที่ area 7 ในชั้นนี้ ในฐานะนักรบที่เลื่อนขั้นเป็น duergar warlord แล้ว เป็นสะพานเชื่อมไปยัง Terminus Level (L21) ที่เธอผูกมิตรกับเจ้าชาย duergar ที่ถูกเนรเทศ
- ถ้าปาร์ตี้เคยเจอ Gentlemen Bastards ที่ L7/L8 (Maddgoth's Castle/Slitherswamp) — พวกเขากลับมาที่ area 3 ในชั้นนี้ ท่าทีขึ้นอยู่กับความสัมพันธ์เดิม (พันธมิตรถ้าเคยช่วยเหลือ, ศัตรูซุ่มโจมตีถ้าเคยทรยศ/ทอดทิ้ง)
- ถ้าปาร์ตี้เคยเจอ myconid sovereign Chanterella ที่ L13 (Trobriand's Graveyard) — สามารถแทนที่ Floot ด้วย Chanterella ในชั้นนี้ได้ เป็นหน้าคุ้นเคยให้ปาร์ตี้เจอ
- **ปม Ezzat** ต่อยอดจาก Act 5 (Dweomercore Tournament) ที่คืนชีพลิชตนนี้ขึ้นมา — ดูหัวข้อ "หมายเหตุโครงสร้าง" ด้านล่าง

## Story Overview
Halaster ไม่สามารถลงมือจัดการ Ezzat ด้วยตัวเองได้ (ผิดกฎของสิ่งมีชีวิตระดับสูง) จึงต้องใช้ปาร์ตี้เป็นหมากในเกมแมวไล่จับหนู ชั้นนี้แบ่งเป็นสองส่วนใหญ่: **Runestone Caverns** (areas 1-14) ถ้ำธรรมชาติที่เต็มไปด้วย Stonecloak golems, มัมมี่ลอร์ด duergar, อาณานิคม myconid, และหน่วยสำรวจบ้าคลั่ง Shadowdusk — ทั้งหมดวนเวียนรอบ **หอคอย Stalagmite** ที่มี Runestone เรืองแสงอยู่ยอด และ **Stalagmite Tower** (areas 15-23) lair ส่วนตัวของ Ezzat เอง ที่ปาร์ตี้ต้องบุกเข้าไปขโมย phylactery ให้ได้

## EP ในบทนี้
- [EP02: Runestone Caverns (Level 20)](<./EP02 - Runestone Caverns (Level 20).md>) ✅

## หมายเหตุโครงสร้าง
- **1 ไฟล์ EP เดียว** — แม้เนื้อหาใหญ่ (WDMM 92K + Companion 83K ตัวอักษร เทียบเคียง L12/L14/L17) แต่ทั้งหมดยังเกิดในสถานที่เดียวต่อเนื่องกัน (ถ้ำ → หอคอยกลางถ้ำ) ไม่มีการย้ายสถานที่แบบ Alterdeep/Mecha-Halaster's March จึงไม่มีเหตุผลต้องแตก EP ตามเกณฑ์ที่ใช้มาตลอดแคมเปญ
- **ไขปม "เจือด้วยคำโกหก" จาก Send-Off ของ L19**: ส่วนที่จริง — Ezzat เคยมีโอกาสเป็นลูกศิษย์ของ Halaster (WDMM ระบุตรงๆ) และครั้งหนึ่งทั้งคู่เคยผูกพันกันเหมือนพี่น้อง (Companion ขยายความ) ส่วนที่ Halaster บิดเบือน — การกล่าวหาว่า Ezzat "ทรยศ/แย่งชิงอำนาจ" เป็นเรื่องเกินจริงของ Halaster เอง ความจริงคือ Ezzat แค่ปฏิเสธเส้นทางชั่วร้ายตามคำแนะนำของนักบวชเพื่อนสนิท แล้วภายหลังเลือกเป็นลิชด้วยเหตุผลของตัวเอง ไม่ใช่แผนคืนชีพมาแย่งชิง Undermountain ตั้งแต่แรก — สอดคล้องกับนิสัยเล่าเรื่องตัวเองเข้าข้างตัวเองของ Halaster ที่ปรากฏมาตลอดแคมเปญ
- **Halaster's Gate ที่ยืนยัน/แก้ไขในชั้นนี้**: Gate #26 "The Jigsaw Gate" (L15↔L20, พื้นที่ 9b) — ยืนยันตำแหน่งฝั่ง L20 ที่ค้างมาตั้งแต่เขียน L15 แล้ว **พบข้อแตกต่างเล็กน้อยจากที่เคยบันทึกไว้**: L15's EP03 เขียนว่าถอดชิ้นผิด = adult white dragon โจมตี แต่ต้นฉบับ WDMM หน้า L20 area 9b ระบุว่าเป็น beholder — คงทั้งสองเวอร์ชันไว้ตามต้นฉบับแต่ละฝั่ง (ให้ DM เลือกใช้ตัวไหนก็ได้เวลาต้องตัดสินใจจริง)
- **Special Event "The Gentleman's Hello"** ใช้เฉพาะถ้าใส่ Gentlemen Bastards เป็นศัตรูในชั้นนี้ — อยู่ในหัวข้อ Aftermath ของ EP02
- **จุดเชื่อม Act 5 (Dweomercore)**: ต้นตอการคืนชีพ Ezzat มาจาก Dweomercore Tournament (EP04) — ชั้นนี้คือจุดที่ปมนั้นจบลง ไม่ว่าปาร์ตี้จะทำลาย Ezzat สำเร็จหรือไม่

---
[← Act 9 outline](./00-act-outline.md)
