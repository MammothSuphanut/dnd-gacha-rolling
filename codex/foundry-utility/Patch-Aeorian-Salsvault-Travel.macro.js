/**
 * Patch Aeorian Salsvault Travel — Syrinlya → Salsvault on the map scale (canon rule 22, 2026-10-30).
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * The Act 1 pages of "Act 1 · Wisdom — Eiselcross" are copies of the played Exandria journal, not built
 * from the repo, so the repo change (adventures/aeorian-cataclysm/ACT01-escape-to-palebank/EP05*.md)
 * has to be patched in by hand: the overland trip was 200 mi / 9 days, the Novaris map (hex 20 px = 24 mi)
 * measures ~700 mi = 29 days at Normal pace.
 * Only the numbers, day headings and the sub-EP's title change; the rest of each page is left as it is.
 * Running it again does nothing (every swap is skipped once its new text is there).
 */
(async () => {
  const JOURNAL_FLAG = "act01";
  const PAGES = [
    {
      name: "EP5: Salsvault Expedition",
      swaps: [
        ["เดินทางบกฝ่าน้ำแข็ง/หิมะราว 200 ไมล์เข้าสู่", "เดินทางบกฝ่าน้ำแข็ง/หิมะราว 700 ไมล์ (ราว 29 วัน) เข้าสู่"],
        ["เดินทาง 200 ไมล์ผ่านน้ำแข็ง/หิมะ", "เดินทางราว 700 ไมล์ (Medium ราว 29 วัน · Fast ราว 24 · Slow ราว 39) ผ่านน้ำแข็ง/หิมะ"],
        ["หลังเดินทาง 40 ไมล์ เข้าสู่ภูมิภาค", "หลังเดินทางราว 550 ไมล์ (วันที่ 24) เข้าสู่ภูมิภาค"]
      ]
    },
    {
      name: "EP5w1: Nine Days Through Foren",
      rename: "EP5w1: Twenty-Nine Days Through Foren",
      swaps: [
        ["— เดินทางบก 200 ไมล์จาก Syrinlya", "— เดินทางบกราว 700 ไมล์จาก Syrinlya"],
        ["พวกเขาใช้เวลา 9 วันเดินเท้าฝ่าน้ำแข็ง/หิมะ 200 ไมล์", "พวกเขาใช้เวลา 29 วันเดินเท้าฝ่าน้ำแข็ง/หิมะราว 700 ไมล์"],
        ["เมื่อถึงวันที่เก้า แผนที่ของ Hank", "เมื่อถึงวันที่ยี่สิบเก้า แผนที่ของ Hank"],
        ["Day 1–2: The Coastal Road", "Day 1–8: The Coastal Road"],
        ["Day 3–5: The Foren Pass", "Day 9–11: The Foren Pass"],
        ["(รวมเป็น 10 วันแทนที่จะเป็น 9)", "(รวมเป็น 30 วันแทนที่จะเป็น 29)"],
        ["Day 6: Old Footprints in the Snow", "Day 15: Old Footprints in the Snow"],
        ["Day 7: Under the Snow", "Day 20: Under the Snow"],
        ["Day 8–9: Into the Thin Sheets", "Day 24–29: Into the Thin Sheets"],
        ["เมื่อเข้าสู่วันที่แปด —", "เมื่อเข้าสู่วันที่ยี่สิบสี่ —"],
        ["ท่ามกลางแสงสลัวของวันที่เก้า", "ท่ามกลางแสงสลัวของวันที่ยี่สิบเก้า"],
        ["การเดินทาง 200 ไมล์สิ้นสุดลง", "การเดินทางราว 700 ไมล์สิ้นสุดลง"],
        ["อ่อนล้าจากการเดินทาง 9 วัน", "อ่อนล้าจากการเดินทาง 29 วัน"]
      ],
      // after the pace table (first table on the page)
      insertAfterFirstTable: '<p class="mb-3 leading-relaxed text-stone-700">ระยะทั้งหมดราว <strong class="font-semibold text-stone-900">700 ไมล์</strong> (canon ข้อ 22: hex 20 px = 24 ไมล์) — Medium ใช้ <strong class="font-semibold text-stone-900">29 วัน</strong> · Fast ราว 24 วัน · Slow ราว 39 วัน (ถ้าตัวละครที่ช้าที่สุดมีความเร็ว 15–20 ft ให้ใช้แถวล่าง) วันที่ไม่มีฉากด้านล่างให้เล่าผ่านเป็นช่วงๆ แล้วเช็ค extreme cold และเสบียง — ทั้งเส้นทางไม่มีแหล่งเติมเสบียง ควรเตือนผู้เล่นให้ซื้ออาหารจาก Syrinlya ไว้ให้พอราว 30 วัน</p>'
    }
  ];

  if (!game.user.isGM) return ui.notifications.error("GM only.");
  const journal = game.journal.find(j => j.getFlag("world", "aeorianJournal") === JOURNAL_FLAG);
  if (!journal) return ui.notifications.error(`Journal with aeorianJournal flag "${JOURNAL_FLAG}" not found.`);

  const report = [];
  for (const def of PAGES) {
    const page = journal.pages.find(p => p.name === def.name || p.name === def.rename);
    if (!page) { report.push(`${def.name}: page not found`); continue; }
    let html = page.text.content ?? "";
    let done = 0, already = 0;
    const missing = [];
    for (const [from, to] of def.swaps) {
      if (html.includes(to)) { already++; continue; }
      if (!html.includes(from)) { missing.push(from); continue; }
      html = html.replace(from, to); done++;
    }
    if (def.insertAfterFirstTable && !html.includes(def.insertAfterFirstTable)) {
      const m = html.match(/<\/table>(?:<\/div>)?/);
      if (m) { html = html.slice(0, m.index + m[0].length) + def.insertAfterFirstTable + html.slice(m.index + m[0].length); done++; }
      else missing.push("pace table");
    }
    const update = { "text.content": html };
    if (def.rename && page.name !== def.rename) update.name = def.rename;
    if (done || update.name) await page.update(update);
    report.push(`${def.rename ?? def.name}: ${done} changed, ${already} already done` + (missing.length ? `, ${missing.length} not found` : ""));
    if (missing.length) console.warn(`${def.name}: text not found:`, missing);
  }
  ui.notifications.info(report.join(" · "));
})();
