// Auto-generates codex/General/00-sub-class-overview-tier-list-2024.md by
// rolling up every "### Subclass Name (Source) ICON — role" heading found
// across the 28 per-class `*-subclass-tier-list-2024.md` files (which live
// in codex/2024-tier-list/, a different folder — this doc was moved to
// General on purpose to sit next to class-subclass-index.md, which it's
// meant to be read as a companion to), grouped by tier (S/A/B/C/D) across
// all classes.
//
// This file does NOT re-analyze anything — it only reflects the tier/notes
// already written into the per-class files. Re-run this script any time a
// per-class subclass-tier-list file changes.
//
// Usage: node character-builder/scripts/generate-subclass-overview-tier-list.cjs
const fs = require('fs');
const path = require('path');
const { buildSubclassLinkMap, resolveSubclassLink } = require('./lib/subclass-links.cjs');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const TIER_LIST_DIR = path.join(REPO_ROOT, 'codex', '2024-tier-list');
const OUT_FILE = path.join(REPO_ROOT, 'codex', 'General', '00-sub-class-overview-tier-list-2024.md');
const CLASSES_JSON = path.join(REPO_ROOT, 'src', 'data', 'classes.json');

const CLASS_NAME_OVERRIDES = {
  'monster-hunter': 'Monster Hunter',
};

function classNameFromFile(file) {
  const base = file.replace(/-subclass-tier-list-2024\.md$/, '');
  if (CLASS_NAME_OVERRIDES[base]) return CLASS_NAME_OVERRIDES[base];
  return base.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

const files = fs
  .readdirSync(TIER_LIST_DIR)
  .filter(f => f.endsWith('-subclass-tier-list-2024.md'))
  .sort();

const ICONS = '🔵🔴🟢🟡🟣🕰️🔗';
// Most headings: "Name (Source) ICONS — role". A few: "Name ICONS (Source) — role".
const headingReSourceFirst = new RegExp(
  `^### (.+?)\\s*\\(([^)]+)\\)\\s*([${ICONS}]+)\\s*—\\s*(.+)$`,
  'u'
);
const headingReIconFirst = new RegExp(
  `^### (.+?)\\s*([${ICONS}]+)\\s*(?:\\(([^)]+)\\)\\s*)?—\\s*(.+)$`,
  'u'
);
function matchHeading(line) {
  let m = line.match(headingReSourceFirst);
  if (m) return { subclass: m[1], source: m[2], icons: m[3], role: m[4] };
  m = line.match(headingReIconFirst);
  if (m) return { subclass: m[1], source: m[3] || '', icons: m[2], role: m[4] };
  return null;
}
const tierRe = /^## ([SABCD](?:\/[SABCD])*) Tier/;

const rows = [];
const warnings = [];

for (const file of files) {
  const className = classNameFromFile(file);
  const text = fs.readFileSync(path.join(TIER_LIST_DIR, file), 'utf8');
  const lines = text.split(/\r?\n/);
  let currentTier = null;
  for (const line of lines) {
    const tm = line.match(tierRe);
    if (tm) {
      currentTier = tm[1];
      continue;
    }
    if (/^## /.test(line)) {
      currentTier = null;
      continue;
    }
    if (/^### /.test(line)) {
      if (!currentTier) {
        warnings.push(`${file}: ### heading outside a tier section: ${line}`);
        continue;
      }
      const hm = matchHeading(line);
      if (!hm) {
        warnings.push(`${file}: could not parse heading: ${line}`);
        continue;
      }
      rows.push({
        class: className,
        subclass: hm.subclass.trim(),
        source: hm.source ? hm.source.trim() : '',
        icons: hm.icons,
        tier: currentTier,
        role: hm.role.trim(),
        file,
      });
    }
  }
}

if (warnings.length) {
  console.warn(`${warnings.length} warning(s):`);
  warnings.forEach(w => console.warn('  WARN:', w));
}

const TIER_ORDER = ['S', 'S/A', 'A', 'B', 'C', 'D'];
const TIER_TITLES = {
  S: 'S Tier — Ceiling สูงสุดของทั้งโปรเจกต์',
  'S/A': 'S/A Tier — เก่งสุดในกลุ่ม/พลิกเกมได้ชัดเจน (เฉพาะ Gunslinger — ไฟล์ต้นฉบับไม่แยกย่อยระหว่าง S กับ A)',
  A: 'A Tier — พลิกเกมได้ชัดเจน/เสริมพลังคลาสสูง',
  B: 'B Tier — มั่นคง ใช้งานได้ดีสม่ำเสมอ',
  C: 'C Tier — ใช้ได้ แต่ niche หรือ combat impact ต่ำกว่ากลุ่มบน',
  D: 'D Tier — อ่อนสุดในกลุ่ม (หรือออกแบบมาเพื่อความสนุก/มุกมากกว่า optimize)',
};

const byTier = {};
for (const t of TIER_ORDER) byTier[t] = [];
for (const r of rows) {
  if (!byTier[r.tier]) byTier[r.tier] = [];
  byTier[r.tier].push(r);
}
for (const t of Object.keys(byTier)) {
  byTier[t].sort((a, b) => a.class.localeCompare(b.class) || a.subclass.localeCompare(b.subclass));
}

const dist = {};
for (const r of rows) dist[r.tier] = (dist[r.tier] || 0) + 1;

const fileSlugFor = className => {
  const found = files.find(f => classNameFromFile(f) === className);
  return found || null;
};

function sourceCell(r) {
  const parts = [r.icons];
  if (r.source) parts.push(r.source);
  return parts.join(' ');
}

// Absolute app path (not a relative "<file>.md" link) — this table is
// rendered by a dedicated React view (SubclassTierOverviewView), not passed
// through the markdown renderer's relative-link resolver, so it needs a
// ready-to-navigate href exactly like class-subclass-index.md's own links.
function classCell(r) {
  const file = fileSlugFor(r.class);
  if (!file) return r.class;
  const slug = file.replace(/\.md$/, '');
  return `[${r.class}](/codex/2024-tier-list/${slug})`;
}

// Same classes.json-backed deep link class-subclass-index.md uses, so a
// subclass looks and links identically in both docs — see lib/subclass-links.cjs.
const subclassLinkMap = buildSubclassLinkMap(CLASSES_JSON);
function subclassCell(r) {
  const link = resolveSubclassLink(r.class, r.subclass, subclassLinkMap);
  return `[${r.subclass}](${link})`;
}

let out = '';
out += '# Subclass Overview Tier List (Edition 2024)\n\n';
out += `**วันที่**: ${new Date().toISOString().slice(0, 10)}\n`;
out += `**ขอบเขต**: **ทุก subclass** จากทั้ง 28 class ที่มีข้อมูล subclass ในโปรเจกต์ (ไม่รวม Aura Knight — ยังไม่มี subclass, ไม่รวม 3 sidekick class — ไม่มีโครงสร้าง subclass) รวม **${rows.length} รายการ** (นับรวม subclass ที่แชร์ pool ข้าม class เช่น Dragon Banner ของ Captain/Gunslinger/Vagabond แยกเป็นคนละแถวเพราะเป็นตัวเลือกคนละอันตอนสร้างตัวละคร)\n`;
out += `**แหล่งข้อมูล**: รวบรวมจาก tier ที่วิเคราะห์ไว้แล้วในไฟล์ [\`<class>-subclass-tier-list-2024.md\`](.) ทั้ง 28 ไฟล์ — **ไม่ได้วิเคราะห์กลไกใหม่**, ดึงเฉพาะ tier + หมายเหตุสั้นจากหัวข้อ "###" ของแต่ละไฟล์มาจัดกลุ่มข้าม class ทั้งหมด อยากรู้จุดเด่น/จุดด้อย/วิธีเล่นแบบเต็มให้ตามลิงก์ในคอลัมน์ Class ไปที่ไฟล์รายคลาส — คอลัมน์ Subclass ลิงก์ตรงไป 5e.tools (หรือหน้า homebrew ของโปรเจกต์) แบบเดียวกับ [class-subclass-index.md](class-subclass-index.md)\n`;
out += `**หมายเหตุสำคัญ**: ⚠️ **Auto-generated — อย่าแก้ไฟล์นี้ตรงๆ** รันคำสั่งนี้ใหม่ทุกครั้งที่ไฟล์ subclass-tier-list รายคลาสไฟล์ใดไฟล์หนึ่งเปลี่ยน: \`node character-builder/scripts/generate-subclass-overview-tier-list.cjs\`\n\n`;
out += '---\n\n';
out += '## Legend\n';
out += '- 🔵 Official (WotC) — 🔴 Grim Hollow — 🟢 Valda\'s Spire — 🟡 Homebrew ของโปรเจกต์นี้ — 🟣 Official UA (playtest)\n';
out += '- 🕰️ 2014-only orphan (ยังไม่มีเวอร์ชัน 2024 reprint ในโปรเจกต์)\n';
out += '- 🔗 แชร์กลไกเดียวกับ subclass ชื่อเดียวกันใน class อื่น (reflavor เท่านั้น) — ดูรายละเอียดเต็มที่ class ต้นทางตามที่ระบุในหมายเหตุ\n\n';
out += '**การจัดกลุ่ม**: เรียงตาม **tier ก่อน (S→D) ข้าม class ทั้งหมด**, ภายใน tier เดียวกันเรียงตามชื่อ class แล้วชื่อ subclass — ไม่ใช่การวิเคราะห์ chassis ของทั้ง class เหมือน [00-class-overview-tier-list-2024.md](../2024-tier-list/00-class-overview-tier-list-2024.md), นี่คือการเทียบ subclass ต่อ subclass ล้วนๆ ข้าม class\n\n';
out += '---\n\n';
out += '## สรุปจำนวนต่อ tier\n\n';
out += '| Tier | จำนวน subclass | % ของทั้งหมด |\n|---|---|---|\n';
for (const t of TIER_ORDER) {
  const n = dist[t] || 0;
  if (!n) continue;
  out += `| ${t} | ${n} | ${((n / rows.length) * 100).toFixed(1)}% |\n`;
}
out += '\n---\n\n';

for (const t of TIER_ORDER) {
  const list = byTier[t];
  if (!list || !list.length) continue;
  out += `## ${TIER_TITLES[t] || t + ' Tier'} (${list.length})\n\n`;
  out += '| Subclass | Class | Source | หมายเหตุ |\n|---|---|---|---|\n';
  for (const r of list) {
    out += `| ${subclassCell(r)} | ${classCell(r)} | ${sourceCell(r)} | ${r.role} |\n`;
  }
  out += '\n---\n\n';
}

out += '## จุดสังเกตข้ามคลาส\n\n';
out += '- **"Portent-clone" mechanic** (บันทึกผล d20 ล่วงหน้าแล้วแทนที่ทีหลัง) เป็น pattern ที่ปรากฏซ้ำ 5 ครั้งทั่วโปรเจกต์ ทุกตัวจัดอยู่ A tier ขึ้นไป: Wizard\'s Diviner (จุดกำเนิด), Wizard\'s Chronurgy Magic, Investigator\'s Medium, Warlock\'s Future You Patron, Witch\'s Tea Magic\n';
out += '- **Mercenary-company subclass pool** ของ Valda\'s Spire (Dragon Banner, Eagle Banner, Jolly Roger ฯลฯ) ถูกใช้ซ้ำแบบกลไกเดียวกันเป๊ะๆ ข้าม 3 class (Captain/Gunslinger/Vagabond) เปลี่ยนแค่ฟลุคอาวุธ — tier ในตารางนี้เท่ากันทุก class เพราะเป็น subclass เดียวกัน แถวที่มี 🔗 คือแถวที่ชี้กลับไปดูรายละเอียดที่ Captain (ต้นทาง)\n';
out += '- **2024 buff เปลี่ยนเทียร์จริง** (ไม่ใช่แค่เปลี่ยนชื่อ) พบซ้ำในหลาย class: Wizard\'s Abjurer (C→B), Cleric\'s Abjurer, Monk\'s Warrior of the Elements, Ranger\'s Beast Master — เป็นสัญญาณว่า WotC ตั้งใจแก้ subclass อ่อนกลุ่มนี้เป็นพิเศษตอนออก 2024\n';
out += '- **S tier หายากมาก** (3/460 = 0.7%) — Bladesinger, Mechanauts\' Guild, Path of the Rage Mage ล้วนเป็น subclass ที่เปลี่ยนบทบาทพื้นฐานของ class ไปเลย (gish, pilot-a-mech, spellcasting barbarian) ไม่ใช่แค่บัฟกลไกเดิมให้แรงขึ้น\n';
out += '- ตารางนี้เป็น **rollup อัตโนมัติ** — ถ้า tier ของ subclass ไหนดูไม่ตรงกับที่คาดหวัง ให้เช็คไฟล์รายคลาสต้นทาง (ลิงก์คอลัมน์ Class) ก่อน แก้ที่ไฟล์ต้นทางแล้วรัน generate ใหม่ ไม่แก้ตารางนี้ตรงๆ\n';

fs.writeFileSync(OUT_FILE, out, 'utf8');
console.log(`Wrote ${OUT_FILE} (${rows.length} rows, ${warnings.length} warnings)`);
