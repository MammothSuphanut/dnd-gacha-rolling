/**
 * Setup Gilded City — the Thai "Waterdeep: Dragon Heist & Dungeon of the Mad Mage" (repo: gilded-city-mad-depths) journals + tidy the Plutonium-imported Waterdeep scenes.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Build the data from the repo (once per change to the campaign .md files):
 *        python adventures/gilded-city-mad-depths/tools/build_foundry_journal.py "D:/FoundryVTT_Data/Data/assets/campaigns/gilded-city-mad-depths/journal"
 *   2. Import "Waterdeep: Dragon Heist", "Waterdeep: Dungeon of the Mad Mage" and the Companion with Plutonium (scenes included).
 *   3. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * What it does:
 *   - Journals: 📁 Campaigns › 📁 Waterdeep: Dragon Heist & Dungeon of the Mad Mage holds the campaign journals (00-03) and one folder per Act
 *     (00 · ภาพรวม Act, CH briefs, EPs) — one journal per .md file, one page per "##" section. All GM only.
 *     Links between campaign files open the linked journal.
 *   - The English Plutonium journals (WDH / WDMM / WDMMC) move to 📁 Waterdeep: Dragon Heist & Dungeon of the Mad Mage › 📁 Archive, untouched.
 *   - Scenes: every imported WDH / WDMM / WDMMC scene moves to 🗺 Waterdeep: Dragon Heist & Dungeon of the Mad Mage › Act › EP, gets a clear
 *     name ("Level 03 · The Sargauth Level") and opens that EP's journal from the scene's Journal note button.
 *     The DM copy of each map (room numbers on the image) goes to the EP's "DM Reference" sub-folder as "<name> (DM)".
 *     Nothing is deleted.
 *   Re-running is safe: journals, pages and scenes are matched by flag; generated pages are overwritten with the repo
 *   text, pages you add yourself are left alone. Edit the campaign in the repo, not in Foundry.
 */
(async () => {
  const DATA = "assets/campaigns/gilded-city-mad-depths/journal/gilded-city.json";
  const JOURNAL_PARENT = "Campaigns";
  const JOURNAL_FOLDER = "Waterdeep: Dragon Heist & Dungeon of the Mad Mage";
  const ARCHIVE_FOLDER = "Archive";
  const SCENE_FOLDER = "Waterdeep: Dragon Heist & Dungeon of the Mad Mage";
  // earlier names, renamed in place on re-run
  const OLD_JOURNAL_FOLDERS = ["Gilded City, Mad Depths", "Waterdeep: Heist & Dungeon"];
  const OLD_SCENE_FOLDERS = ["Gilded City & Mad Depths", "Waterdeep: Heist & Dungeon"];
  const DM_FOLDER = "DM Reference";
  const SOURCES = ["WDH", "WDMM", "WDMMC"];
  const FLAG = "world"; // getFlag only accepts a registered scope; keys are prefixed instead
  const { NONE } = CONST.DOCUMENT_OWNERSHIP_LEVELS;

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const res = await fetch(encodeURI(DATA), { cache: "no-store" });
  if (!res.ok) return ui.notifications.error(`Missing ${DATA} — run the build script first.`);
  const data = await res.json();

  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: `Setup ${SCENE_FOLDER}` },
    content: `<p>Create or update ${data.journals.length} journals in ${JOURNAL_PARENT} › ${JOURNAL_FOLDER},
      and sort ${data.scenes.length} imported Waterdeep scenes into ${SCENE_FOLDER}.</p>
      <p>The English Plutonium journals move to ${ARCHIVE_FOLDER}. Nothing is deleted.</p>`
  });
  if (!ok) return;

  const findFolder = (type, name, parentId) =>
    game.folders.find(f => f.type === type && f.name === name && (f.folder?.id ?? null) === parentId);
  const ensureFolder = async (type, name, parentId = null, sort = 0) => {
    const f = findFolder(type, name, parentId);
    if (f) return f;
    return Folder.create({ name, type, folder: parentId, sort, sorting: "m" });
  };
  const renameFolder = async (type, oldName, name, parentId = null) => {
    const old = findFolder(type, oldName, parentId);
    if (old && !findFolder(type, name, parentId)) await old.update({ name });
  };
  const findEntry = key => game.journal.find(j => j.getFlag(FLAG, "gcmdJournal") === key);
  const findPage = (entry, key) => entry.pages.find(p => p.getFlag(FLAG, "gcmdPage") === key);
  const actSort = act => (parseInt(act.slice(3, 5)) || 0) * 1000;

  // ---------------------------------------------------------------- journals
  const parent = await ensureFolder("JournalEntry", JOURNAL_PARENT);
  for (const old of OLD_JOURNAL_FOLDERS) await renameFolder("JournalEntry", old, JOURNAL_FOLDER, parent.id);
  for (const old of OLD_SCENE_FOLDERS) await renameFolder("Scene", old, SCENE_FOLDER);
  const root = await ensureFolder("JournalEntry", JOURNAL_FOLDER, parent.id);
  const actFolders = {};
  for (const act of [...new Set(data.journals.map(j => j.act).filter(Boolean))])
    actFolders[act] = await ensureFolder("JournalEntry", act, root.id, actSort(act));

  // Pass 1: every journal and generated page exists (links need their ids)
  for (const j of data.journals) {
    const base = {
      name: j.name,
      folder: j.act ? actFolders[j.act].id : root.id,
      sort: j.sort,
      ownership: { default: NONE },
      flags: { [FLAG]: { gcmdJournal: j.key } }
    };
    let entry = findEntry(j.key);
    if (entry) await entry.update(base);
    else entry = await JournalEntry.create(base);

    const missing = j.pages.filter(p => !findPage(entry, p.key)).map(p => ({
      name: p.name, type: "text", flags: { [FLAG]: { gcmdPage: p.key } }
    }));
    if (missing.length) await entry.createEmbeddedDocuments("JournalEntryPage", missing);
  }

  // @CAMPAIGN[<journal key>]{text} → a link to that campaign journal
  const resolve = html => html.replace(/@CAMPAIGN\[([^\]]+)\]\{([^}]*)\}/g, (_, key, text) => {
    const target = findEntry(key);
    return target ? `@UUID[${target.uuid}]{${text}}` : text;
  });

  // Pass 2: page text and order
  for (const j of data.journals) {
    const entry = findEntry(j.key);
    await entry.updateEmbeddedDocuments("JournalEntryPage", j.pages.map((p, i) => ({
      _id: findPage(entry, p.key).id,
      name: p.name,
      sort: (i + 1) * 1000,
      title: { show: true, level: 1 },
      text: { content: resolve(p.html), format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML }
    })));
    const known = new Set(j.pages.map(p => p.key));
    const stale = entry.pages.filter(p => p.getFlag(FLAG, "gcmdPage") && !known.has(p.getFlag(FLAG, "gcmdPage")));
    if (stale.length) console.warn(`Waterdeep ${j.name}: generated pages no longer in the repo (not deleted):`, stale.map(p => p.name));
  }

  // English Plutonium journals → Archive
  const archive = await ensureFolder("JournalEntry", ARCHIVE_FOLDER, root.id, 99000);
  const english = game.journal.filter(j => SOURCES.includes(j.flags?.plutonium?.source) && j.folder?.id !== archive.id);
  for (const j of english) await j.update({ folder: archive.id });

  // ---------------------------------------------------------------- scenes
  const sceneRoot = await ensureFolder("Scene", SCENE_FOLDER);
  const folderIds = {}; // "<act>|<folder>|<dm>" → folder id
  const folderOrder = {};
  data.scenes.forEach(s => folderOrder[`${s.act}|${s.folder}`] ??= Object.keys(folderOrder).length);
  const sceneFolder = async s => {
    const id = `${s.act}|${s.folder}|${s.dm}`;
    if (folderIds[id]) return folderIds[id];
    const act = await ensureFolder("Scene", s.act, sceneRoot.id, actSort(s.act));
    const ep = await ensureFolder("Scene", s.folder, act.id, (folderOrder[`${s.act}|${s.folder}`] + 1) * 1000);
    const target = s.dm ? await ensureFolder("Scene", DM_FOLDER, ep.id, 99000) : ep;
    return (folderIds[id] = target.id);
  };

  const missing = [];
  const updates = [];
  for (const [i, s] of data.scenes.entries()) {
    const scene = game.scenes.find(x => x.getFlag(FLAG, "gcmdScene") === `${s.source}|${s.original}`)
      ?? game.scenes.find(x => x.flags?.plutonium?.source === s.source && x.name === s.original && !x.getFlag(FLAG, "gcmdScene"));
    if (!scene) { missing.push(`${s.source}: ${s.original}`); continue; }
    updates.push({
      _id: scene.id,
      name: s.name,
      folder: await sceneFolder(s),
      sort: (i + 1) * 100,
      navigation: false,
      journal: s.dm ? scene.journal?.id ?? null : findEntry(s.journal)?.id ?? scene.journal?.id ?? null,
      flags: { [FLAG]: { gcmdScene: `${s.source}|${s.original}` } }
    });
  }
  if (updates.length) await Scene.updateDocuments(updates);
  if (missing.length) console.warn("Waterdeep: scenes not found (not imported?):", missing);

  ui.notifications.info(`${SCENE_FOLDER} — ${data.journals.length} journals, ${updates.length} scenes sorted`
    + (english.length ? `, ${english.length} English journal(s) archived` : "")
    + (missing.length ? ` — ${missing.length} scene(s) not found, see console (F12)` : "") + ".");
})();
