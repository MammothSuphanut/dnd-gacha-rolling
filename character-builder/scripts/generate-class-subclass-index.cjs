#!/usr/bin/env node
/**
 * Generates codex/General/class-subclass-index.md by scanning every
 * class/subclass definition mirrored under src/data/5etools/ (official +
 * homebrew). Run this any time the 5etools data changes:
 *
 *   node character-builder/scripts/generate-class-subclass-index.cjs
 *
 * Why this exists: official classes each live in their own clean
 * class-<name>.json file, but homebrew subclasses are buried inside giant
 * per-book compendium JSON files (Valda's Spire of Secrets alone has ~190
 * subclasses in one file). That made it easy to miss homebrew subclasses
 * when consulting during /build-character or /level-up-character. This
 * script builds one flat, complete index so nothing gets skipped.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const DATA_5E = path.join(ROOT, "src", "data", "5etools");
const OUT_FILE = path.join(ROOT, "codex", "General", "class-subclass-index.md");
const CLASSES_JSON = path.join(ROOT, "src", "data", "classes.json");

const EDITION_LABEL = { classic: "2014", one: "2024" };

// Subclass `source` abbreviations that don't match their id in books.json.
const OFFICIAL_SOURCE_ALIASES = {
  PSA: "PS-A",
  PSK: "PS-K",
  PSX: "PS-X",
  PSI: "PS-I",
  PSD: "PS-D",
};

// Abbreviations that don't appear in books.json at all (UA docs, etc.).
const OFFICIAL_SOURCE_MANUAL = {
  DSotDQ: "Dragonlance: Shadow of the Dragon Queen",
  UATheMysticClass: "Unearthed Arcana: The Mystic Class",
};

const HOMEBREW_FOLDER_LABELS = {
  "grim-hollow": "Grim Hollow (Ghostfire Gaming)",
  "valdas-spire": "Valda's Spire of Secrets (Mage Hand Press)",
};

// Classes this project invented from scratch (own prose .md doc under
// codex/homebrew-subclass/<ClassName>/<ClassName>.md, picked up by the
// generic codex glob in homebrewRules.js) —
// they have no 5etools mirror and, unlike a finished homebrew subclass,
// aren't registered in classes.json until they have at least one complete
// subclass (see each doc's own "ข้อจำกัดของแอปนี้" section for why). Listed
// here by hand so the index still links to the class doc itself in the
// meantime. Once a class gets its first subclass into classes.json it'll
// start showing subclass rows too (loadProjectHomebrewSubclasses handles
// that part automatically) — leave the manual entry here regardless, since
// this is what makes the *class heading itself* clickable to the doc.
const PROJECT_ORIGINAL_CLASSES = [
  {
    name: "Sacred Knight",
    link: "/codex/homebrew-subclass/Sacred-Knight/Sacred-Knight-concept",
    book: "Homebrew",
  },
];

// Classes this project plays that are 3rd-party (not this project's own
// invention, unlike PROJECT_ORIGINAL_CLASSES above) but have no 5etools-style
// JSON mirror under src/data/5etools/ at all — so loadOfficialClasses/
// loadHomebrewFolder never see them either. Listed here by hand for the same
// reason as PROJECT_ORIGINAL_CLASSES: makes the class heading link somewhere
// real even before/regardless of a JSON mirror existing. Their subclasses
// come from classes.json via loadProjectHomebrewSubclasses (see its comment)
// same as project-original ones.
const EXTERNAL_HOMEBREW_CLASSES = [
  {
    name: "Tactician",
    link: "https://roll20.net/compendium/dnd5e/Tactician",
    book: "Drizzt's Travelogue of Everything (DMs Guild)",
  },
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function buildOfficialSourceNames() {
  const books = readJson(path.join(DATA_5E, "official", "books.json"));
  const arr = books.book || books;
  const names = {};
  for (const b of arr) names[b.id] = b.name;
  return names;
}

function officialSourceName(abbrev, officialNames) {
  const aliased = OFFICIAL_SOURCE_ALIASES[abbrev] || abbrev;
  return (
    officialNames[aliased] ||
    OFFICIAL_SOURCE_MANUAL[abbrev] ||
    abbrev
  );
}

// Many subclass entries omit their own `edition` field, but the class
// variant they attach to (keyed by className + classSource) almost always
// carries one. Populated while reading class[] arrays, consulted as a
// fallback while reading subclass[] arrays.
function editionKey(className, sourceAbbrev) {
  return `${className}::${sourceAbbrev}`;
}

function editionFromExplicitField(rawEdition) {
  return EDITION_LABEL[rawEdition] || rawEdition || null;
}

// Some homebrew products have no `edition` field on the class/subclass at
// all, but their resolved source title spells out the year (e.g. "Valda's
// Spire of Secrets (2014)" vs "... (2024)").
function editionFromSourceName(fullSourceName) {
  if (/\(2014\)/.test(fullSourceName)) return "2014";
  if (/\(2024\)/.test(fullSourceName)) return "2024";
  return null;
}

function loadOfficialClasses(officialNames, classSourceEdition) {
  const dir = path.join(DATA_5E, "official", "class");
  const classes = new Map(); // name -> { name, entries: [{source, edition, book:'Official'}] }
  const subclasses = []; // { className, name, source, edition, page, book }

  for (const file of fs.readdirSync(dir)) {
    if (!file.startsWith("class-")) continue;
    const d = readJson(path.join(dir, file));

    for (const c of d.class || []) {
      const sourceName = officialSourceName(c.source, officialNames);
      const edition = editionFromExplicitField(c.edition) || editionFromSourceName(sourceName);
      if (!classes.has(c.name)) classes.set(c.name, { name: c.name, entries: [] });
      classes.get(c.name).entries.push({
        source: sourceName,
        sourceAbbrev: c.source,
        edition: edition || "?",
        book: "Official",
      });
      if (edition) classSourceEdition.set(editionKey(c.name, c.source), edition);
    }

    for (const s of d.subclass || []) {
      subclasses.push({
        className: s.className,
        name: s.name,
        source: officialSourceName(s.source, officialNames),
        sourceAbbrev: s.source,
        edition: editionFromExplicitField(s.edition),
        classSourceAbbrev: s.classSource,
        page: s.page,
        book: "Official",
      });
    }
  }

  return { classes, subclasses };
}

function loadHomebrewFolder(folderName, classSourceEdition) {
  const dir = path.join(DATA_5E, "homebrew", folderName);
  const bookLabel = HOMEBREW_FOLDER_LABELS[folderName] || folderName;
  const classes = new Map();
  const subclasses = [];
  const sourceNames = {};

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const d = readJson(path.join(dir, file));

    for (const src of (d._meta && d._meta.sources) || []) {
      sourceNames[src.json] = src.full;
    }

    for (const c of d.class || []) {
      const sourceName = sourceNames[c.source] || c.source;
      const edition = editionFromExplicitField(c.edition) || editionFromSourceName(sourceName);
      if (!classes.has(c.name)) classes.set(c.name, { name: c.name, entries: [] });
      classes.get(c.name).entries.push({
        source: sourceName,
        sourceAbbrev: c.source,
        edition: edition || "?",
        book: bookLabel,
      });
      if (edition) classSourceEdition.set(editionKey(c.name, c.source), edition);
    }

    for (const s of d.subclass || []) {
      subclasses.push({
        className: s.className,
        name: s.name,
        source: sourceNames[s.source] || s.source,
        sourceAbbrev: s.source,
        edition: editionFromExplicitField(s.edition),
        classSourceAbbrev: s.classSource,
        page: s.page,
        book: bookLabel,
      });
    }
  }

  return { classes, subclasses };
}

function resolveSubclassEditions(subclasses, classSourceEdition) {
  for (const s of subclasses) {
    s.edition =
      s.edition ||
      classSourceEdition.get(editionKey(s.className, s.classSourceAbbrev)) ||
      editionFromSourceName(s.source) ||
      "?";
  }
}

function mergeClassMaps(target, source) {
  for (const [name, info] of source) {
    if (!target.has(name)) target.set(name, { name, entries: [] });
    target.get(name).entries.push(...info.entries);
  }
}

function classBookSummary(entries) {
  const books = [...new Set(entries.map((e) => e.book))];
  return books.join(" + ");
}

// A subclass reprinted for 2024 shows up twice in the raw data (once per
// edition, same name) — collapse those down to a single row, keeping the
// 2024 printing when one exists since it's the newer/current book. A
// subclass with no 2024 reprint keeps its 2014 (or "?") row untouched.
const EDITION_RANK = { 2024: 2, 2014: 1 };

function dedupeSubclassesByName(subs) {
  const best = new Map();
  for (const s of subs) {
    const key = s.name.trim().toLowerCase();
    const existing = best.get(key);
    if (!existing || (EDITION_RANK[s.edition] || 0) > (EDITION_RANK[existing.edition] || 0)) {
      best.set(key, s);
    }
  }
  return [...best.values()];
}

// src/data/classes.json backs the gacha "box" feature, but each item there
// also carries a real 5e.tools deep link (className + subclass name ->
// exact subclass entry on the class page). Reuse it here so the index
// table can link out instead of just naming the subclass — shared with
// generate-subclass-overview-tier-list.cjs so both generated docs link out
// identically. See lib/subclass-links.cjs for the actual lookup.
const { buildSubclassLinkMap, resolveSubclassLink: resolveSubclassLinkByName } = require("./lib/subclass-links.cjs");

function resolveSubclassLink(s, linkMap) {
  return resolveSubclassLinkByName(s.className, s.name, linkMap);
}

// Class heading link: a project-original class (see PROJECT_ORIGINAL_CLASSES)
// points at its own doc; everything else (official/Grim Hollow/Valda's
// Spire) has no single reliable "class page" anchor across every printing,
// so fall back to the same 5e.tools search-link pattern resolveSubclassLink
// already uses for subclasses with no exact match.
function resolveClassLink(classInfo) {
  return classInfo.link || `https://5e.tools/search.html?q=${encodeURIComponent(classInfo.name)}`;
}

// Two kinds of subclass never show up in the three JSON scans above, so both
// need a fallback source: (a) this project's own bespoke homebrew (prose .md
// files under codex/homebrew-subclass/, e.g. The Ruined Flame, Sacred
// Knight's Thrones — link starts with /codex/homebrew-subclass/), and (b) a
// wholly external 3rd-party class this project plays but never got a
// 5etools-format JSON file for at all (e.g. Tactician — Drizzt's Travelogue
// of Everything, DMs Guild; see EXTERNAL_HOMEBREW_CLASSES). Both *are*
// registered in classes.json for the gacha box though (group = class name),
// so reuse that as the source of truth instead of inventing a second
// manifest, filtering out anything whose class was already sourced from a
// real JSON mirror (`coveredClassNames`) to avoid duplicating those.
// classes.json can list the same subclass more than once (it backs multiple
// boxes), so dedupe by class+name.
function loadProjectHomebrewSubclasses(coveredClassNames) {
  const seen = new Set();
  const subclasses = [];
  for (const box of readJson(CLASSES_JSON)) {
    for (const item of box.items || []) {
      if (!item.group || !item.name || !item.link) continue;
      const isOwnHomebrew = item.link.startsWith("/codex/homebrew-subclass/");
      if (!isOwnHomebrew && coveredClassNames.has(item.group)) continue;
      const key = `${item.group}|${item.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const book = isOwnHomebrew
        ? "Homebrew"
        : (EXTERNAL_HOMEBREW_CLASSES.find((c) => c.name === item.group) || {}).book || "External Homebrew";
      subclasses.push({
        className: item.group,
        name: item.name,
        source: book,
        sourceAbbrev: "Homebrew",
        // Neither codex/homebrew-subclass/ nor any EXTERNAL_HOMEBREW_CLASSES
        // entry so far carries per-file edition metadata — this is a fixed
        // assumption rather than something detected. Revisit if a 2014-only
        // entry shows up here.
        edition: "2024",
        book,
      });
    }
  }
  return subclasses;
}

function main() {
  const linkMap = buildSubclassLinkMap(CLASSES_JSON);
  const officialNames = buildOfficialSourceNames();
  const classSourceEdition = new Map();
  const official = loadOfficialClasses(officialNames, classSourceEdition);
  const grimHollow = loadHomebrewFolder("grim-hollow", classSourceEdition);
  const valdasSpire = loadHomebrewFolder("valdas-spire", classSourceEdition);
  const coveredClassNames = new Set([...official.classes.keys(), ...grimHollow.classes.keys(), ...valdasSpire.classes.keys()]);
  const projectHomebrew = loadProjectHomebrewSubclasses(coveredClassNames);

  const allClasses = new Map();
  mergeClassMaps(allClasses, official.classes);
  mergeClassMaps(allClasses, grimHollow.classes);
  mergeClassMaps(allClasses, valdasSpire.classes);

  // Project-original and external-no-JSON-mirror classes (see
  // PROJECT_ORIGINAL_CLASSES / EXTERNAL_HOMEBREW_CLASSES above) — registered
  // even before they have a single finished subclass, purely so the class
  // heading itself links somewhere real instead of a nonsense 5e.tools search.
  for (const proj of [...PROJECT_ORIGINAL_CLASSES, ...EXTERNAL_HOMEBREW_CLASSES]) {
    if (!allClasses.has(proj.name)) allClasses.set(proj.name, { name: proj.name, entries: [] });
    const info = allClasses.get(proj.name);
    info.link = proj.link;
    info.entries.push({ source: proj.book, sourceAbbrev: "Homebrew", edition: "2024", book: proj.book });
  }

  const allSubclasses = [
    ...official.subclasses,
    ...grimHollow.subclasses,
    ...valdasSpire.subclasses,
    ...projectHomebrew,
  ];
  resolveSubclassEditions(allSubclasses, classSourceEdition);

  // Also register classes that only ever appear as a subclass's className
  // target but weren't in any class[] array we scanned (shouldn't normally
  // happen, but keeps the index complete if it does).
  for (const s of allSubclasses) {
    if (!allClasses.has(s.className)) {
      allClasses.set(s.className, { name: s.className, entries: [{ source: "?", edition: "?", book: "?" }] });
    }
  }

  const subclassesByClass = new Map();
  for (const s of allSubclasses) {
    if (!subclassesByClass.has(s.className)) subclassesByClass.set(s.className, []);
    subclassesByClass.get(s.className).push(s);
  }

  const classNames = [...allClasses.keys()].sort((a, b) => a.localeCompare(b));

  const lines = [];
  lines.push("# Class & Subclass Index");
  lines.push("");
  lines.push(
    "> **Auto-generated — อย่าแก้ไฟล์นี้ตรงๆ** รันคำสั่งนี้ใหม่ทุกครั้งที่ข้อมูลใน `src/data/5etools/` เปลี่ยน:"
  );
  lines.push("> `node character-builder/scripts/generate-class-subclass-index.cjs`");
  lines.push(">");
  lines.push(
    "> **จุดประสงค์**: ก่อนเสนอ/เปรียบเทียบ subclass ให้ผู้ใช้ตอน `/build-character` หรือ `/level-up-character` ให้ไล่ดูตารางของ class นั้นในไฟล์นี้ก่อน แทนที่จะเปิด compendium JSON ของ homebrew ตรงๆ (โดยเฉพาะ Valda's Spire ที่ subclass เกือบ 200 ตัวปนอยู่ในไฟล์เดียว) เพื่อไม่ให้พลาดตัวเลือก official/homebrew ตัวใดตัวหนึ่งไปแบบไม่ตั้งใจ — ยังต้องเสนอ official และ homebrew เท่าเทียมกันตามกติกาใน [README.md](README.md) เหมือนเดิม"
  );
  lines.push(">");
  lines.push(
    "> **ก่อนอ่านตารางด้านล่างเพื่อสร้าง/ปรึกษาตัวละคร**: ต้องถามผู้ใช้ 4 คำถามก่อนเสมอ — (1) edition 2014/2024 (2014 = ใช้เฉพาะ edition 2014, 2024 = ใช้ทั้งหมดแต่ถ้าซ้ำกันให้ใช้เวอร์ชัน 2024), (2) ขอบเขต class หลัก(official)/เสริม(homebrew)/ทั้งคู่, (3) กฎพิเศษของ campaign ถ้ามี (เช่น Grim Hollow: Grievous Wounds, Gritty Realism), (4) level ที่จะสร้าง/ปรึกษา — รายละเอียดเต็มดูที่ [README.md § Ruleset ก่อนเริ่มสร้าง/ปรึกษาตัวละคร](README.md#ruleset-ก่อนเริ่มสร้างปรึกษาตัวละคร)"
  );
  lines.push(
    `> Generated: ${new Date().toISOString().slice(0, 10)} • ${classNames.length} classes • ${allSubclasses.length} subclasses (official: ${official.subclasses.length}, Grim Hollow: ${grimHollow.subclasses.length}, Valda's Spire: ${valdasSpire.subclasses.length}, This Project: ${projectHomebrew.length})`
  );
  lines.push(">");
  lines.push(
    "> **หาว่า subclass ไหนแรง/อ่อน (ไม่ใช่แค่ว่ามีอะไรบ้าง)**: ไฟล์นี้เป็นแค่ดัชนี ไม่มีข้อมูล tier — ระบบ tier แบบเก่า (00-sub-class-overview-tier-list-2024.md) ถูกลบไปแล้ว 2026-08-07 กำลังทำใหม่ทั้งหมดตามกติกาใน [00-scorecard-methodology.md](../2024-tier-list/00-scorecard-methodology.md) — เช็คความคืบหน้าได้ที่ [00-scorecard-progress.md](../2024-tier-list/00-scorecard-progress.md)"
  );
  lines.push("");
  lines.push("## สารบัญ class");
  lines.push("");
  for (const name of classNames) {
    const anchor = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    lines.push(`- [${name}](#${anchor})`);
  }
  lines.push("");

  for (const name of classNames) {
    const classInfo = allClasses.get(name);
    lines.push(`## [${name}](${resolveClassLink(classInfo)})`);
    lines.push("");
    lines.push(`_${classBookSummary(classInfo.entries)}_`);
    lines.push("");

    const subs = dedupeSubclassesByName(subclassesByClass.get(name) || []).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (subs.length === 0) {
      lines.push("_(ไม่มี subclass ในข้อมูล local ที่ mirror ไว้)_");
    } else {
      lines.push("| Subclass | Edition | Source | Book |");
      lines.push("|---|---|---|---|");
      for (const s of subs) {
        const link = resolveSubclassLink(s, linkMap);
        // Skip the redundant "(`Abbrev`)" suffix when it's just the same
        // word as the source name (e.g. this project's own homebrew rows,
        // source="Homebrew"/sourceAbbrev="Homebrew" — showing "Homebrew
        // (`Homebrew`)" would be silly).
        const sourceCell = s.source === s.sourceAbbrev ? s.source : `${s.source} (\`${s.sourceAbbrev}\`)`;
        lines.push(`| [${s.name}](${link}) | ${s.edition} | ${sourceCell} | ${s.book} |`);
      }
    }
    lines.push("");
  }

  fs.writeFileSync(OUT_FILE, lines.join("\n"));
  console.log(`Wrote ${OUT_FILE}`);
  console.log(`${classNames.length} classes, ${allSubclasses.length} subclasses`);
}

main();
