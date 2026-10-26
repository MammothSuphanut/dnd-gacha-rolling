/**
 * Create Aeorian Journal — the Aeorian Cataclysm (Novaris) campaign journals, built from the campaign .md files.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Build the data from the repo (once per change to the campaign .md files):
 *        python adventures/aeorian-cataclysm-novaris/tools/build_foundry_journal.py "D:/FoundryVTT_Data/Data/worlds/astral-nexus-constellation-protocol/Campaigns/Aeorian Cataclysm/journal"
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * What it does:
 *   - 📁 Campaigns › 📁 Aeorian Cataclysm holds one journal per campaign part (00 · Aeorian Cataclysm, Act 1, Act 2, ...),
 *     one page per section of the .md files. Pages marked for players are Observer; the rest are GM only.
 *   - Links in the text open the place's Novaris journal (made by Create-Novaris-Journal) or another campaign journal.
 *   - First run only: the old single journal "Aeorian Cataclysm" (Exandria version) is renamed
 *     "Aeorian Cataclysm (Exandria)" and moved to 📁 Archive, untouched; copies of its Act 1 pages
 *     (ACT01 → EP7ats1, played and canon) go into the "Act 1" journal after its overview page.
 *   Re-running is safe: journals and pages are matched by flag, the generated pages are overwritten with the repo
 *   text, and pages you add yourself (session EPs) are left alone. Edit the campaign in the repo, not in Foundry.
 */
(async () => {
  const DATA = "worlds/astral-nexus-constellation-protocol/Campaigns/Aeorian Cataclysm/journal/aeorian-novaris.json";
  const PARENT_FOLDER = "Campaigns";
  const FOLDER = "Aeorian Cataclysm";
  const ARCHIVE_FOLDER = "Archive";
  const OLD_NAME = "Aeorian Cataclysm";
  const OLD_NEW_NAME = "Aeorian Cataclysm (Exandria)";
  const FLAG = "world"; // getFlag only accepts a registered scope; keys are prefixed instead
  const { NONE, LIMITED, OBSERVER } = CONST.DOCUMENT_OWNERSHIP_LEVELS;

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const res = await fetch(encodeURI(DATA), { cache: "no-store" });
  if (!res.ok) return ui.notifications.error(`Missing ${DATA} — run the build script first.`);
  const data = await res.json();

  const findFolder = (name, parentId) =>
    game.folders.find(f => f.type === "JournalEntry" && f.name === name && (f.folder?.id ?? null) === parentId);
  const ensureFolder = async (name, parentId = null) =>
    findFolder(name, parentId) ?? Folder.create({ name, type: "JournalEntry", folder: parentId });
  const findEntry = key => game.journal.find(j => j.getFlag(FLAG, "aeorianJournal") === key);
  const findPage = (entry, key) => entry.pages.find(p => p.getFlag(FLAG, "aeorianPage") === key);
  const oldJournal = () => game.journal.find(j => j.name === OLD_NAME && !j.getFlag(FLAG, "aeorianJournal"));

  const old = oldJournal();
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Create Aeorian Journal" },
    content: `<p>Create or update ${data.journals.length} journal(s): ${data.journals.map(j => j.name).join(", ")}.</p>`
      + (old ? `<p>The old journal "${OLD_NAME}" will be renamed "${OLD_NEW_NAME}" and moved to ${ARCHIVE_FOLDER}; its Act 1 pages are copied into the Act 1 journal.</p>` : "")
  });
  if (!ok) return;

  const parent = await ensureFolder(PARENT_FOLDER);
  const folder = await ensureFolder(FOLDER, parent.id);

  // Pass 1: every journal and generated page exists (links need their ids)
  for (const j of data.journals) {
    const hasPlayerPage = j.pages.some(p => p.player);
    const base = {
      name: j.name,
      folder: folder.id,
      sort: j.sort,
      ownership: { default: hasPlayerPage ? LIMITED : NONE },
      flags: { [FLAG]: { aeorianJournal: j.key } }
    };
    let entry = findEntry(j.key);
    if (entry) await entry.update(base);
    else entry = await JournalEntry.create(base);

    const missing = j.pages.filter(p => !findPage(entry, p.key)).map(p => ({
      name: p.name, type: "text", flags: { [FLAG]: { aeorianPage: p.key } }
    }));
    if (missing.length) await entry.createEmbeddedDocuments("JournalEntryPage", missing);
  }

  // Links: @NOVARIS[<place file>]{text} → the place's Novaris journal, @CAMPAIGN[<journal>(/<page>)]{text} → a campaign journal
  const resolve = html => html
    .replace(/@NOVARIS\[([^\]]+)\]\{([^}]*)\}/g, (_, key, text) => {
      const target = game.journal.find(e => e.getFlag(FLAG, "novarisKey") === key);
      return target ? `@UUID[${target.uuid}]{${text}}` : text;
    })
    .replace(/@CAMPAIGN\[([^\]/]+)(?:\/([^\]]+))?\]\{([^}]*)\}/g, (_, jKey, pKey, text) => {
      const entry = findEntry(jKey);
      const target = entry && pKey ? findPage(entry, pKey) : entry;
      return target ? `@UUID[${target.uuid}]{${text}}` : text;
    });

  // Pass 2: page text, order and visibility
  for (const j of data.journals) {
    const entry = findEntry(j.key);
    await entry.updateEmbeddedDocuments("JournalEntryPage", j.pages.map((p, i) => ({
      _id: findPage(entry, p.key).id,
      name: p.name,
      sort: (i + 1) * 1000,
      title: { show: true, level: 1 },
      text: { content: resolve(p.html), format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML },
      ownership: { default: p.player ? OBSERVER : NONE }
    })));
    const known = new Set(j.pages.map(p => p.key));
    const stale = entry.pages.filter(p => p.getFlag(FLAG, "aeorianPage") && !known.has(p.getFlag(FLAG, "aeorianPage")));
    if (stale.length) console.warn(`Aeorian ${j.name}: generated pages no longer in the repo (not deleted):`, stale.map(p => p.name));
  }

  // First run: archive the old Exandria journal and copy its Act 1 pages
  if (old) {
    const act1 = findEntry("act01");
    const pages = old.pages.contents.sort((a, b) => a.sort - b.sort);
    const start = pages.findIndex(p => p.name === "ACT01");
    const end = pages.findIndex(p => p.name === "ACT02");
    if (act1 && start >= 0 && end > start) {
      const copied = new Set(act1.pages.map(p => p.getFlag(FLAG, "aeorianOldPage")).filter(Boolean));
      const copies = pages.slice(start + 1, end).filter(p => !copied.has(p.id)).map((p, i) => {
        const src = p.toObject();
        delete src._id;
        return {
          ...src,
          sort: 100000 + (i + 1) * 1000,
          ownership: { default: NONE },
          flags: { ...src.flags, [FLAG]: { ...(src.flags?.[FLAG] ?? {}), aeorianOldPage: p.id } }
        };
      });
      if (copies.length) await act1.createEmbeddedDocuments("JournalEntryPage", copies);
    } else {
      ui.notifications.warn(`"${OLD_NAME}": could not find the ACT01 / ACT02 pages — Act 1 pages not copied.`);
    }
    const archive = await ensureFolder(ARCHIVE_FOLDER, folder.id);
    await old.update({ name: OLD_NEW_NAME, folder: archive.id, flags: { [FLAG]: { aeorianArchived: true } } });
  }

  ui.notifications.info(`Aeorian Cataclysm: ${data.journals.length} journal(s) updated${old ? ", old journal archived" : ""}.`);
})();
