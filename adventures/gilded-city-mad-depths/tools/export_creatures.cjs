// Export the Plutonium "Creatures" folder (actor id, name, source) for build_token_data.py.
// Reads a COPY of the world's actors + folders LevelDB (copy D:/FoundryVTT_Data/Data/worlds/novaris/data first;
// opening the live folders while Foundry runs fails on the LOCK file).
// Usage: node export_creatures.cjs <copied data dir> <out creatures.json>
const { ClassicLevel } = require("D:/Foundry Virtual Tabletop/resources/app/node_modules/classic-level");
const fs = require("fs");

(async () => {
  const [dir, out] = process.argv.slice(2);
  const folders = {};
  const fdb = new ClassicLevel(`${dir}/folders`, { valueEncoding: "json" });
  for await (const [, v] of fdb.iterator()) folders[v._id] = v;
  await fdb.close();

  const creatures = [];
  const adb = new ClassicLevel(`${dir}/actors`, { valueEncoding: "json" });
  for await (const [k, v] of adb.iterator()) {
    if (!/^!actors![^.]*$/.test(k) || folders[v.folder]?.name !== "Creatures") continue;
    creatures.push({ id: v._id, name: v.name, src: v.flags?.plutonium?.source ?? "" });
  }
  await adb.close();
  fs.writeFileSync(out, JSON.stringify(creatures));
  console.log(`${creatures.length} creatures -> ${out}`);
})();
