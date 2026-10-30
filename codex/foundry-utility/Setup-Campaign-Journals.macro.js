/**
 * Setup Campaign Journals — lay out the Phandelver, Frozen Sick and Echoes journals like the Waterdeep campaign.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. python codex/foundry-utility/build_campaign_journals.py  (writes the repo text to assets/campaigns/<slug>/journal/)
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * Layout, per campaign: 📁 Campaigns › 📁 <campaign>
 *   - Phandelver (Novaris version of the repo) and Frozen Sick: 00-02 campaign journals, then one folder per Act with
 *     its outline, CH briefs and EPs — one journal per repo file, one page per section. Links between campaign
 *     files become real journal links. Everything is GM only.
 *   - Echoes of the Heroes has no repo text: each page of the old journal becomes its own journal ("01 · Banner" …),
 *     with the old page's text, images and ownership.
 *   - The old single journal moves to 📁 <campaign> › 📁 Archive. Nothing is deleted.
 *   Re-running is safe: repo journals/pages are matched by flag and their text is refreshed from the repo (edit the
 *   campaign in the repo, not in Foundry); Echoes journals already made are left alone.
 */
(async () => {
  const PARENT = "Campaigns";
  const ARCHIVE = "Archive";
  const FLAG = "world";
  const CAMPAIGNS = [
    { name: "Phandelver and Below: The Shattered Obelisk", data: "assets/campaigns/descent-of-phandelver/journal/descent-of-phandelver.json" },
    { name: "Frozen Sick: The Plague Covenant", data: "assets/campaigns/frozen-sick/journal/frozen-sick.json" },
    { name: "Echoes of the Heroes", data: null }
  ];
  const { NONE } = CONST.DOCUMENT_OWNERSHIP_LEVELS;

  if ( !game.user.isGM ) return ui.notifications.error("GM only.");
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Setup Campaign Journals" },
    content: `<p>Lay out ${CAMPAIGNS.map(c => c.name).join(", ")} in ${PARENT} like the Waterdeep campaign.</p>
      <p>Each old single journal moves to its campaign's ${ARCHIVE} folder. Nothing is deleted.</p>`
  });
  if ( !ok ) return;

  const findFolder = (name, parentId) =>
    game.folders.find(f => f.type === "JournalEntry" && f.name === name && (f.folder?.id ?? null) === parentId);
  const ensureFolder = async (name, parentId = null, sort = 0) =>
    findFolder(name, parentId) ?? Folder.create({ name, type: "JournalEntry", folder: parentId, sort, sorting: "m" });
  const actSort = act => (parseInt(act.slice(3, 5)) || 0) * 1000;

  const parent = await ensureFolder(PARENT);
  const report = [];

  for ( const campaign of CAMPAIGNS ) {
    const root = await ensureFolder(campaign.name, parent.id);
    const archive = await ensureFolder(ARCHIVE, root.id, 99000);
    const old = game.journal.find(j => j.name === campaign.name && [parent.id, archive.id].includes(j.folder?.id));
    if ( old && old.folder?.id !== archive.id ) await old.update({ folder: archive.id });

    // ------------------------------------------------ Echoes: split the old journal's pages
    if ( !campaign.data ) {
      if ( !old ) { report.push(`${campaign.name}: old journal not found`); continue; }
      const pages = old.pages.contents.sort((a, b) => a.sort - b.sort);
      let made = 0;
      for ( const [i, page] of pages.entries() ) {
        if ( game.journal.some(j => j.getFlag(FLAG, "splitFrom") === page.uuid) ) continue;
        const data = page.toObject();
        delete data._id;
        await JournalEntry.create({
          name: `${String(i + 1).padStart(2, "0")} · ${page.name}`,
          folder: root.id,
          sort: (i + 1) * 1000,
          ownership: foundry.utils.deepClone(old.ownership),
          flags: { [FLAG]: { splitFrom: page.uuid } },
          pages: [data]
        });
        made++;
      }
      report.push(`${campaign.name}: ${pages.length} journals (${made} new)`);
      continue;
    }

    // ------------------------------------------------ repo campaigns
    const res = await fetch(encodeURI(campaign.data), { cache: "no-store" });
    if ( !res.ok ) { report.push(`${campaign.name}: missing ${campaign.data} — run build_campaign_journals.py`); continue; }
    const { journals } = await res.json();
    const tag = campaign.data;                          // keys are only unique within one campaign
    const findEntry = key => game.journal.find(j => j.getFlag(FLAG, "campaignJournal") === `${tag}#${key}`);
    const findPage = (entry, key) => entry.pages.find(p => p.getFlag(FLAG, "campaignPage") === key);

    const actFolders = {};
    for ( const act of [...new Set(journals.map(j => j.act).filter(Boolean))] )
      actFolders[act] = await ensureFolder(act, root.id, actSort(act));

    // Pass 1: every journal and page exists (links need their ids)
    for ( const j of journals ) {
      const base = {
        name: j.name,
        folder: j.act ? actFolders[j.act].id : root.id,
        sort: j.sort,
        ownership: { default: NONE },
        flags: { [FLAG]: { campaignJournal: `${tag}#${j.key}` } }
      };
      let entry = findEntry(j.key);
      if ( entry ) await entry.update(base);
      else entry = await JournalEntry.create(base);
      const missing = j.pages.filter(p => !findPage(entry, p.key)).map(p => ({
        name: p.name, type: "text", flags: { [FLAG]: { campaignPage: p.key } }
      }));
      if ( missing.length ) await entry.createEmbeddedDocuments("JournalEntryPage", missing);
    }

    // @CAMPAIGN[<journal key>]{text} → a link to that campaign journal
    const resolve = html => html.replace(/@CAMPAIGN\[([^\]]+)\]\{([^}]*)\}/g, (_, key, text) => {
      const target = findEntry(key);
      return target ? `@UUID[${target.uuid}]{${text}}` : text;
    });

    // Pass 2: page text and order
    for ( const j of journals ) {
      const entry = findEntry(j.key);
      await entry.updateEmbeddedDocuments("JournalEntryPage", j.pages.map((p, i) => ({
        _id: findPage(entry, p.key).id,
        name: p.name,
        sort: (i + 1) * 1000,
        title: { show: true, level: 1 },
        text: { content: resolve(p.html), format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML }
      })));
      const known = new Set(j.pages.map(p => p.key));
      const stale = entry.pages.filter(p => p.getFlag(FLAG, "campaignPage") && !known.has(p.getFlag(FLAG, "campaignPage")));
      if ( stale.length ) console.warn(`${campaign.name} › ${j.name}: pages no longer in the repo (not deleted):`, stale.map(p => p.name));
    }
    report.push(`${campaign.name}: ${journals.length} journals, ${Object.keys(actFolders).length} Acts`);
  }

  console.log(`Setup Campaign Journals\n${report.join("\n")}`);
  ui.notifications.info(report.join(" | "), { permanent: true });
})();
