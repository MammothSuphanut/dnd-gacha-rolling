/**
 * Update Fragments — rewrite The Fragment items (Aeorian Cataclysm) to the Novaris rules
 * (adventures/aeorian-cataclysm-novaris/01-the-fragments.md).
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. A preview lists every item it will change (world items + copies on actors). Confirm to apply.
 *
 * Replaces the 2026-10-13 rebalance version of this macro (still in git history).
 *
 * What it does, for "Core" and the 5 "The Fragment of ..." items, wherever they are:
 *   - Rules text goes ONLY into "Unidentified Description" (GM eyes). Description and
 *     Chat Description are cleared so players can't read the mechanics.
 *   - Fragments: 1 use per Long Rest (spent is kept, capped at 1), flags.world.fragment = <key>.
 *   - Fragments: replaces the old activities with one Free Action utility activity that
 *     spends the use and rolls 1d20. Wisdom keeps the effect linked to its old activity.
 *   - Zenith: adds 3 effects to apply from the chat card ("+1 Tier (1 นาที)", "+1 Tier (1 เทิร์น)",
 *     "−1 Tier (1 เทิร์น)"). They set flags.world.tierBoost, which Mammoth Tweaks adds to the Tier.
 *   Re-running is safe: items already up to date are skipped.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTIVITY_ID = "frgActivity00001";        // fixed id so re-runs can tell it is already done
  const VERSION = 4;                            // flags.world.fragmentRules — bump to force a rewrite
  const CORE_FOOT = `<p><em>อยู่ภายใต้ Core Rules: Free Action, ใช้ Fragment ได้ 1 ชิ้นต่อเทิร์น, "ระดับ" = Tier of Being</em></p>`;

  const fragmentHtml = (title, tagline, ability, usage, limit = "1 ครั้งต่อ Long Rest") =>
    `<h3>${title}</h3><p>${tagline}</p><h4>${ability}</h4><ul>`
    + `<li><p><strong>Usage:</strong> ${usage}</p></li>`
    + `<li><p><strong>Limit:</strong> <strong>${limit}</strong></p></li></ul>${CORE_FOOT}`;

  const CORE_HTML = `<h3>Core Rules (กฎพื้นฐานการใช้งาน)</h3><ul>`
    + `<li><p><strong>Attunement:</strong> Fragment ทุกชิ้นต้อง Attune และใช้ช่องร่วมกับไอเทมเวทมนตร์อื่น (สูงสุด 3 ชิ้น) — ถ้าช่องเต็มแล้วจะผสาน Fragment เพิ่มไม่ได้</p></li>`
    + `<li><p><strong>การใช้งาน:</strong> Fragment ทุกชิ้นใช้ <strong>Free Action</strong> ในเทิร์นของตัวเอง และ<strong>ทอย d20 ทุกครั้ง</strong> — DM เป็นคนตัดสินผล</p></li>`
    + `<li><p><strong>1 ชิ้นต่อเทิร์น:</strong> ในแต่ละเทิร์นใช้ Fragment ได้แค่ 1 ชิ้น</p></li>`
    + `<li><p><strong>โควตา:</strong> Fragment ทุกชิ้นใช้ได้ <strong>1 ครั้งต่อ Long Rest</strong></p></li>`
    + `<li><p><strong>การถอดออก:</strong> หลุดจากร่างได้แค่ 2 ทาง คือโฮสต์ตายจริง (<strong>True Death</strong>) หรือให้ <strong>Messenger</strong> ถอดให้</p></li>`
    + `<li><p><strong>"ระดับ"</strong> หมายถึง Tier of Being (Mortal → Ascendant → Divine → Sovereign → Law)</p></li></ul>`;

  const SIGHT = { units: "spec", special: "มองเห็น" };
  const ONE_CREATURE = { type: "creature", count: "1", choice: false };
  const NONE = { type: "", count: "", choice: false };

  const FRAGMENTS = {
    wisdom: {
      name: "The Fragment of Wisdom", ability: "Insight", range: { units: "" }, affects: NONE,
      html: fragmentHtml("The Fragment of Wisdom", "ชิ้นส่วนแห่งปัญญาที่เปิดเผยความลับของสรรพสิ่ง", "Insight",
        "Free Action ใช้เพื่อขอดูข้อมูลบางอย่าง ทอย d20 ทุกครั้งที่ใช้ DM เป็นคนตัดสินว่าจะเปิดเผยอะไร ตามความเป็นไปได้")
    },
    void: {
      name: "The Fragment of Void", ability: "Void Anchor", range: { units: "spec", special: "Mark ของตัวเอง" }, affects: NONE,
      html: fragmentHtml("The Fragment of Void", "ชิ้นส่วนแห่งความว่างเปล่า ฉีกระยะทางให้หายไปในพริบตา", "Void Anchor",
        "Free Action ทำได้ 2 อย่าง: <strong>วาง Mark</strong> ความว่างเปล่าไว้ ณ จุดที่ยืนอยู่ (มีได้สูงสุด 1 อัน เมื่อวางอันใหม่ อันเก่าจะหายไป) <strong>หรือ</strong> ฉีกมิติตรงหน้าไปยัง Mark นั้น ประตูเปิดค้างอยู่ 6 วินาที ทอย d20 ทุกครั้งที่ฉีกมิติ DM เป็นคนตัดสินว่าจะไปโผล่ใกล้ Mark แค่ไหน", "ฉีกมิติได้ 1 ครั้งต่อ Long Rest (การวาง Mark ไม่นับ)")
    },
    stasis: {
      name: "The Fragment of Stasis", ability: "Stasis", range: SIGHT, affects: ONE_CREATURE,
      html: fragmentHtml("The Fragment of Stasis", "ชิ้นส่วนแห่งการหยุดนิ่ง บิดห้วงเวลาของสรรพสิ่ง", "Stasis",
        "Free Action เลือกเป้าหมาย 1 ตัวที่มองเห็น บิดห้วงเวลาของเป้าหมายนั้น ทอย d20 ทุกครั้งที่ใช้ DM เป็นคนตัดสินว่าเวลาของเป้าหมายจะเป็นอย่างไร")
    },
    genesis: {
      name: "The Fragment of Genesis", ability: "Genesis", range: SIGHT, affects: ONE_CREATURE,
      html: fragmentHtml("The Fragment of Genesis", "ชิ้นส่วนแห่งการก่อกำเนิด พลังแห่งชีวิตที่ให้กำเนิดสรรพสิ่ง", "Genesis",
        "Free Action เลือกเป้าหมาย 1 ตัวที่มองเห็น หลั่งพลังแห่งชีวิตใส่เป้าหมายนั้น ทอย d20 DM ตัดสินว่าเกิดอะไรขึ้น")
    },
    zenith: {
      name: "The Fragment of Zenith", ability: "Zenith", range: { units: "self" }, affects: NONE,
      html: fragmentHtml("The Fragment of Zenith", "ชิ้นส่วนแห่งจุดสูงสุด ผลักตัวตนให้ทะยานเหนือขีดจำกัด", "Zenith",
        "Free Action ผลักระดับตัวตนของตัวเองให้สูงขึ้น ทอย d20 ทุกครั้งที่ใช้ DM เป็นคนตัดสินว่าเกิดอะไรขึ้น"),
      effects: [
        { name: "Zenith: +1 Tier (1 นาที)", boost: 1, duration: { value: 10, units: "rounds", expiry: "sourceStart" } },
        { name: "Zenith: +1 Tier (1 เทิร์น)", boost: 1, duration: { value: 1, units: "turns", expiry: "sourceStart" } },
        { name: "Zenith: −1 Tier (1 เทิร์น)", boost: -1, duration: { value: 1, units: "turns", expiry: "sourceStart" } }
      ]
    }
  };

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Find every copy (world items + items on actors)                   */
    /* ------------------------------------------------------------------ */
    const byName = new Map(Object.entries(FRAGMENTS).map(([key, f]) => [f.name, key]));
    const isTarget = i => byName.has(i.name) || ((i.name === "Core") && (i.folder?.name === "The Fragment"));
    const docs = [...game.items.filter(isTarget)];
    for ( const actor of game.actors ) docs.push(...actor.items.filter(i => byName.has(i.name)));

    const upToDate = i => (i.getFlag("world", "fragmentRules") ?? 0) >= VERSION;
    const todo = docs.filter(i => !upToDate(i));
    if ( !todo.length ) return ui.notifications.info("Fragments are already up to date.");

    const esc = s => foundry.utils.escapeHTML(String(s));
    const rows = todo.map(i => `<li>${esc(i.name)} — ${i.actor ? esc(i.actor.name) : "World item"}</li>`).join("");
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Update Fragments" },
      content: `<p>Rewrite ${todo.length} item(s) to the Novaris Fragment rules?</p><ul>${rows}</ul>`
    });
    if ( !ok ) return;

    /* ------------------------------------------------------------------ */
    /*  Apply                                                             */
    /* ------------------------------------------------------------------ */
    for ( const item of todo ) {
      const key = byName.get(item.name);
      if ( !key ) {                                // Core
        await item.update({
          "system.description.value": "",
          "system.description.chat": "",
          "system.unidentified.description": CORE_HTML,
          "flags.world.fragmentRules": VERSION
        });
        continue;
      }
      const frag = FRAGMENTS[key];

      // Zenith effects (created once, matched by name)
      const effectRefs = [];
      for ( const e of frag.effects ?? [] ) {
        let effect = item.effects.find(x => x.name === e.name);
        if ( !effect ) [effect] = await item.createEmbeddedDocuments("ActiveEffect", [{
          name: e.name, img: item.img, transfer: false, duration: e.duration,
          system: { magical: true, changes: [{ key: "flags.world.tierBoost", type: "override", value: String(e.boost), phase: "initial" }] }
        }]);
        effectRefs.push({ _id: effect.id });
      }

      // Old activities: Wisdom's linked effect carries over to the new one
      for ( const activity of [...(item.system.activities ?? [])] ) {
        for ( const ref of activity.effects ?? [] ) {
          if ( !effectRefs.some(r => r._id === ref._id) ) effectRefs.push({ _id: ref._id });
        }
        await item.deleteActivity(activity.id);
      }

      await item.update({
        "system.description.value": "",
        "system.description.chat": "",
        "system.unidentified.description": frag.html,
        "system.uses.max": "1",
        "system.uses.spent": Math.min(item.system.uses?.spent ?? 0, 1),
        "system.uses.recovery": [{ period: "lr", type: "recoverAll" }],
        "flags.world.fragment": key,
        "flags.world.fragmentRules": VERSION
      });

      await item.createActivity("utility", {
        _id: ACTIVITY_ID,
        name: frag.ability,
        activation: { type: "special", condition: "Free Action", override: false },
        consumption: { spellSlot: true, scaling: { allowed: false }, targets: [{ type: "itemUses", value: "1", target: "" }] },
        duration: { units: "inst", concentration: false, override: false },
        range: { ...frag.range, override: false },
        target: { affects: frag.affects, override: false, prompt: false },
        roll: { formula: "1d20", name: "d20", prompt: false, visible: true },
        effects: effectRefs
      }, { renderSheet: false });
    }

    ui.notifications.info(`Updated ${todo.length} Fragment item(s).`);
  } catch ( err ) {
    console.error("Update Fragments |", err);
    ui.notifications.error(`Update Fragments failed: ${err.message}`);
  }
})();
