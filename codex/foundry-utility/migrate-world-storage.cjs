/**
 * One-off migration (2026-10-27): world "astral-nexus-constellation-protocol" -> "novaris",
 * and every shared asset folder moved out of the world into Data/assets/ (see FOUNDRY-STORAGE.md).
 * Kept as the template for any later folder move: edit OPS, run --dry-run, then --apply.
 *
 *   node codex/foundry-utility/migrate-world-storage.cjs --dry-run
 *   node codex/foundry-utility/migrate-world-storage.cjs --apply      (Foundry must be fully closed)
 *
 * --apply order: rewrite DB refs in place -> move files -> rename world folder -> world.json.
 * Rollback = restore D:/FoundryVTT_Data/Backups/manual-pre-novaris-2026-10-27.
 */
const fs = require("fs");
const path = require("path");
const { ClassicLevel } = require("D:/Foundry Virtual Tabletop/resources/app/node_modules/classic-level");

const DATA = "D:/FoundryVTT_Data/Data";
const OLD_ID = "astral-nexus-constellation-protocol";
const NEW_ID = "novaris";
const NEW_TITLE = "Novaris";
const OLD_W = `worlds/${OLD_ID}`;
const NEW_W = `worlds/${NEW_ID}`;
const HOLD = "D:/FoundryVTT_Data/Backups/manual-pre-novaris-2026-10-27/_to-delete"; // removed-but-not-deleted
const APPLY = process.argv.includes("--apply");

const GEN = `${OLD_W}/Campaigns/00 Gerneral Campaigns Data`;
const AEO = "assets/campaigns/aeorian-cataclysm";
const ECHO_OLD = `${OLD_W}/Campaigns/Echoes of the Heroes`;
const ECHO = "assets/campaigns/echoes-of-the-heroes";

// [from, to] — Data-relative, run in order. A folder rename happens before moves inside its new home.
const OPS = [
  [`${OLD_W}/Actors`, "assets/characters"],
  [`${GEN}/Gerneral Face Token`, "assets/tokens/face-tokens"],
  [`${GEN}/Default NPC`, "assets/tokens/npc-default"],
  [`${GEN}/Homebrew NPC`, "assets/tokens/npc-homebrew"],
  [`${GEN}/assets`, "assets/map-assets"],
  [`${GEN}/scenes`, "assets/scenes"],
  [`${OLD_W}/World_Setting/Novaris`, "assets/world/novaris"],
  ...ls(`${OLD_W}/World_Setting/Novaris`).filter(f => f.startsWith("novaris-v3-"))
    .map(f => [`assets/world/novaris/${f}`, `assets/world/novaris/atlas/${f}`]),
  [`${OLD_W}/Campaigns/Aeorian Cataclysm`, AEO],
  [`${AEO}/Aeorian Cataclysm.png`, `${AEO}/cover.png`],
  [`${AEO}/The Fragment`, `${AEO}/fragments`],
  ...ls(ECHO_OLD).map(f => [`${ECHO_OLD}/${f}`,
    f === "Banner.png" ? `${ECHO}/banner.png` : f.startsWith("The ") ? `${ECHO}/scenes/${f}` : `${ECHO}/actors/${f}`]),
  [`${OLD_W}/Campaigns/Frozen Sick The Plague Covenant`, "assets/campaigns/frozen-sick"],
  [`${OLD_W}/Campaigns/The Descent of Phandelver`, "assets/campaigns/descent-of-phandelver"],
  [`${OLD_W}/audio/soundfxlibrary`, "assets/audio/sfx"],
  [`${OLD_W}/D&D_SRC/Aeorian Cataclysm`, "assets/source/aeorian-cataclysm"],
  [`${OLD_W}/D&D_SRC/Heroic Trial`, "assets/source/heroic-trial"],
  ...ls(`${OLD_W}/D&D_SRC`).filter(f => f.endsWith(".pdf")).map(f => [`${OLD_W}/D&D_SRC/${f}`, `assets/source/shop-catalog/${f}`]),
  [`${OLD_W}/Astral Nexus.png`, `${OLD_W}/background.png`],
  [`${OLD_W}/Astral Nexus.webp`, `${OLD_W}/background.webp`],
  // cleanup: exact duplicates / stray files go to HOLD, the user deletes them
  ["assets/source/aeorian-cataclysm/Img_Gerneral/Gerneral Face Token", `${HOLD}/duplicate Gerneral Face Token`],
  ...ls(`${OLD_W}/World_Setting/Novaris`).filter(f => f.startsWith("thumb-")).map(f => [`assets/world/novaris/${f}`, `${HOLD}/stray-thumbs/${f}`]),
];

// Reference rewrites: old path (as stored, decoded) -> new path. Longest first wins.
// Composed from OPS so a file moved twice maps straight to its final home.
function buildRefMap() {
  const map = [];
  for (const [from, to] of OPS) {
    if (to.startsWith(HOLD)) continue;
    // a later op may move something inside `to` again; those are added as their own (longer) entries
    const origin = map.find(([, t]) => from === t || from.startsWith(t + "/"));
    const src = origin ? origin[0] + from.slice(origin[1].length) : from;
    map.push([src, to]);
  }
  // refs that were already broken before the move, pointed at where the file really is
  map.push([`${OLD_W}/imported-from-worldA/audio/soundfxlibrary`, "assets/audio/sfx"]);
  map.push([`${OLD_W}/imported-from-worldA/characters/Vampire Mind Flayer`, "assets/tokens/npc-default/Vampire Mind Flayer"]);
  map.push([`${OLD_W}/Campaigns/A Most Potent Brew/scenes/Beer Cella.jpg`, "assets/campaigns/descent-of-phandelver/scenes/Beer Cella.jpg"]);
  map.push([OLD_W, NEW_W]); // everything still inside the world folder
  // the background renames also live inside the world folder
  for (const m of map) if (m[1].startsWith(OLD_W)) m[1] = NEW_W + m[1].slice(OLD_W.length);
  return map.sort((a, b) => b[0].length - a[0].length);
}

function ls(rel) { const p = path.join(DATA, rel); return fs.existsSync(p) ? fs.readdirSync(p) : []; }

// Each stored path can be raw ("00 Gerneral"), encodeURI'd ("00%20Gerneral") or space-only encoded.
const variants = s => [...new Set([s, encodeURI(s), s.replace(/ /g, "%20"), encodeURI(s).replace(/&/g, "%26")])];

function rewrite(str, refMap, stats) {
  let out = "", i = 0;
  for (;;) {
    const j = str.indexOf(OLD_W, i);
    if (j < 0) return out + str.slice(i);
    out += str.slice(i, j);
    let hit = null;
    for (const [from, to] of refMap) {
      for (const v of variants(from)) {
        if (!str.startsWith(v, j)) continue;
        const next = str[j + v.length];
        // a file mapping must end there; a folder mapping must be followed by "/" (or end)
        if (next === undefined || /["'\\\/?#<>)\s]/.test(next)) { hit = [v, to]; break; }
      }
      if (hit) break;
    }
    out += hit[1];
    i = j + hit[0].length;
    stats.count++;
    // collect the full new path for the existence check
    const m = (hit[1] + str.slice(i)).match(/^[^"'\\?#<>\n]*/)[0];
    stats.paths.add(m);
  }
}

function exists(rel) {
  let p = rel.replace(/[)\s]+$/, "");
  try { p = decodeURIComponent(p); } catch {}
  return fs.existsSync(path.join(DATA, p));
}

async function main() {
  const refMap = buildRefMap();
  const W = path.join(DATA, OLD_W);
  if (!fs.existsSync(W)) throw new Error(`world folder not found: ${W}`);
  if (fs.existsSync(path.join(W, "data", "actors", "LOCK")) && APPLY) {
    // LevelDB keeps a LOCK file; classic-level will refuse to open if Foundry still holds it.
  }

  console.log(`== ${APPLY ? "APPLY" : "DRY RUN"}  ${OLD_ID} -> ${NEW_ID}\n`);
  console.log("-- moves");
  for (const [from, to] of OPS) {
    const ok = fs.existsSync(path.isAbsolute(from) ? from : path.join(DATA, from)) || OPS.some(([, t]) => from === t || from.startsWith(t + "/"));
    const clash = !to.startsWith(HOLD) && fs.existsSync(path.join(DATA, to));
    console.log(`${ok ? "  " : "!!"}${clash ? " CLASH" : ""} ${from}  ->  ${to}`);
    if (clash) throw new Error(`target already exists: ${to}`);
  }

  console.log("\n-- DB reference rewrite");
  const stats = { count: 0, paths: new Set() };
  for (const base of ["data", "packs"]) for (const c of fs.readdirSync(path.join(W, base))) {
    const db = new ClassicLevel(path.join(W, base, c), { valueEncoding: "utf8" });
    const batch = [];
    const before = stats.count;
    for await (const [k, v] of db.iterator()) {
      if (!v.includes(OLD_W)) continue;
      batch.push({ type: "put", key: k, value: rewrite(v, refMap, stats) });
    }
    if (APPLY && batch.length) await db.batch(batch);
    await db.close();
    if (batch.length) console.log(`  ${base}/${c}: ${batch.length} docs, ${stats.count - before} refs`);
  }
  console.log(`  total ${stats.count} refs, ${stats.paths.size} distinct paths`);

  if (APPLY) {
    console.log("\n-- moving files");
    for (const [from, to] of OPS) {
      const src = path.join(DATA, from), dst = path.isAbsolute(to) ? to : path.join(DATA, to);
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.renameSync(src, dst);
    }
    removeEmptyDirs(W);
    for (const d of ["assets/campaigns", "assets/world"]) removeEmptyDirs(path.join(DATA, d));
    fs.renameSync(W, path.join(DATA, NEW_W));

    const wj = path.join(DATA, NEW_W, "world.json");
    const json = JSON.parse(fs.readFileSync(wj, "utf8"));
    json.id = NEW_ID;
    json.title = NEW_TITLE;
    json.background = `${NEW_W}/background.png`;
    for (const p of json.packs) p.packageName = NEW_ID;
    fs.writeFileSync(wj, JSON.stringify(json, null, 2));
    console.log("  world.json updated");
  }

  // Before --apply the files are still at their old homes, so check by mapping back.
  const back = p => { for (const [from, to] of refMap) if (p === to || p.startsWith(to + "/")) return from + p.slice(to.length); return p; };
  const missing = [...stats.paths].filter(p => !exists(APPLY ? p : back(p)));
  console.log(`\n-- paths that do not resolve on disk: ${missing.length}`);
  for (const p of missing) console.log("  " + p);
}

function removeEmptyDirs(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) if (e.isDirectory()) removeEmptyDirs(path.join(dir, e.name));
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

main().catch(e => { console.error(e); process.exit(1); });
