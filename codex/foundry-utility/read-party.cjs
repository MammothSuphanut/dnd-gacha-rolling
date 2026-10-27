/**
 * Read Party — read the live Foundry world from disk (read-only) and list / dump party (Group) actors.
 * Run with Node, NOT inside Foundry. Safe while Foundry is running: it copies the actors DB to a temp
 * folder first (skipping the LOCK file) and never writes to the world.
 *
 * Usage:
 *   node read-party.cjs                 → list every Group actor + its members
 *   node read-party.cjs "W"             → full stat dump of each member of group "W"
 *   node read-party.cjs "W" --json      → same, as JSON
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

/* ------------------------------------------------------------------ */
/*  Settings                                                          */
/* ------------------------------------------------------------------ */
const FOUNDRY_APP = "D:/Foundry Virtual Tabletop/resources/app";
const WORLD_DIR = "D:/FoundryVTT_Data/Data/worlds/novaris";

const { ClassicLevel } = require(path.join(FOUNDRY_APP, "node_modules/classic-level"));

function copyDb(collection) {
  const src = path.join(WORLD_DIR, "data", collection);
  const dst = fs.mkdtempSync(path.join(os.tmpdir(), `fvtt-${collection}-`));
  for (const f of fs.readdirSync(src)) {
    if (f === "LOCK") continue;
    fs.copyFileSync(path.join(src, f), path.join(dst, f));
  }
  return dst;
}

async function loadActors() {
  const dir = copyDb("actors");
  const db = new ClassicLevel(dir, { valueEncoding: "json" });
  const actors = new Map();
  const items = {};
  for await (const [k, v] of db.iterator()) {
    if (k.startsWith("!actors.items!")) {
      const actorId = k.split("!")[2].split(".")[0];
      (items[actorId] ??= []).push(v);
    } else if (k.startsWith("!actors!")) actors.set(v._id, v);
  }
  await db.close();
  fs.rmSync(dir, { recursive: true, force: true });
  return { actors, items };
}

const memberId = (m) => (m.actor || m.uuid || "").split(".").pop();

function summarize(a, its) {
  const s = a.system ?? {};
  const pick = (types) => its.filter((i) => types.includes(i.type));
  return {
    name: a.name,
    type: a.type,
    classes: pick(["class"]).map((i) => `${i.name} ${i.system.levels}`),
    subclass: pick(["subclass"]).map((i) => i.name),
    species: pick(["race"]).map((i) => i.name),
    level: pick(["class"]).reduce((n, i) => n + (i.system.levels ?? 0), 0) || null,
    cr: a.type === "npc" ? s.details?.cr : undefined,
    abilities: Object.fromEntries(Object.entries(s.abilities ?? {}).map(([k, v]) => [k, v.value])),
    hp: { value: s.attributes?.hp?.value, max: s.attributes?.hp?.max, temp: s.attributes?.hp?.temp },
    ac: s.attributes?.ac,
    equipped: its.filter((i) => ["weapon", "equipment"].includes(i.type) && i.system.equipped).map((i) => i.name),
    spells: its.filter((i) => i.type === "spell").map((i) => `${i.name} (${i.system.level})`),
    features: its.filter((i) => i.type === "feat").map((i) => i.name),
  };
}

(async () => {
  const [groupName, ...flags] = process.argv.slice(2);
  const { actors, items } = await loadActors();
  const groups = [...actors.values()].filter((a) => a.type === "group");

  if (!groupName) {
    if (!groups.length) return console.log("No Group actors in this world.");
    for (const g of groups) {
      const names = (g.system?.members ?? []).map((m) => actors.get(memberId(m))?.name).filter(Boolean);
      console.log(`${g.name}  (${names.length} members): ${names.join(", ")}`);
    }
    return;
  }

  const g = groups.find((x) => x.name.toLowerCase() === groupName.toLowerCase());
  if (!g) return console.error(`No group named "${groupName}". Groups: ${groups.map((x) => x.name).join(", ")}`);
  const out = (g.system?.members ?? [])
    .map((m) => actors.get(memberId(m)))
    .filter(Boolean)
    .map((a) => summarize(a, items[a._id] ?? []));

  if (flags.includes("--json")) return console.log(JSON.stringify(out, null, 2));
  for (const c of out) {
    console.log(`\n=== ${c.name} [${c.type}] ${c.level ? "Lv " + c.level : c.cr != null ? "CR " + c.cr : ""}`);
    console.log(`${c.classes.join(" / ")} ${c.subclass.length ? "(" + c.subclass.join(", ") + ")" : ""} ${c.species.join(", ")}`);
    console.log(`HP ${c.hp.value}/${c.hp.max ?? "auto"}  temp ${c.hp.temp ?? 0} | ${Object.entries(c.abilities).map(([k, v]) => k + " " + v).join("  ")}`);
    if (c.equipped.length) console.log("Equipped: " + c.equipped.join(", "));
    if (c.spells.length) console.log("Spells: " + c.spells.join(", "));
    if (c.features.length) console.log("Features: " + c.features.join(", "));
  }
})();
