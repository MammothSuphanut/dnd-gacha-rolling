/**
 * Sanguine Thorn — magic dagger with Blood Magic: Magic Missile (1/dawn, upcast by self-damage)
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - Creates the world Item "Sanguine Thorn", or rebuilds it in place if it already exists
 *     (same ID, same image, same folder).
 *   - Also rebuilds every copy already owned by an actor (keeps equipped / quantity / uses spent).
 *   - Activities on the dagger:
 *       • Attack                         — normal dagger attack (finesse, light, thrown 20/60, Nick mastery)
 *       • Blood Price                    — rolls the self-damage; pick the scale = spell level (2d4 per level)
 *       • Blood Magic: Magic Missile (N) — casts Magic Missile at level N; uses the 1/dawn charge
 *   - Magic Missile is linked from a compendium (2024 PHB first, then SRD) or the world's Items.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ITEM_NAME = "Sanguine Thorn";
  const SPELL_NAME = "Magic Missile";
  const MAX_CAST_LEVEL = 5;   // how many "Blood Magic" cast activities to make (level 1 → this)
  const FALLBACK_IMG = "icons/svg/sword.svg";   // used only when creating a brand-new item

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const activation = (type, extra = {}) => ({ type, value: 1, override: false, condition: "", ...extra });
    const act = (type, data = {}) => ({ _id: rid(), type, ...data });

    // Find Magic Missile: 2024 PHB pack → any "24" pack → any pack → world Items.
    const findSpell = async () => {
      const packs = game.packs.filter(p => p.documentName === "Item");
      const rank = p => p.collection.includes("players-handbook") ? 0 : p.collection.includes("24") ? 1 : 2;
      for ( const pack of packs.sort((a, b) => rank(a) - rank(b)) ) {
        const index = await pack.getIndex({ fields: ["type"] });
        const hit = index.find(e => (e.type === "spell") && (e.name.toLowerCase() === SPELL_NAME.toLowerCase()));
        if ( hit ) return hit.uuid ?? `Compendium.${pack.collection}.Item.${hit._id}`;
      }
      const world = game.items.find(i => (i.type === "spell") && (i.name.toLowerCase() === SPELL_NAME.toLowerCase()));
      return world?.uuid ?? null;
    };

    const spellUuid = await findSpell();
    if ( !spellUuid ) ui.notifications.warn(`"${SPELL_NAME}" wasn't found in any compendium or the world's Items. The cast activities were skipped — import it and run the macro again.`);

    /* ------------------------------------------------------------------ */
    /*  Activities                                                        */
    /* ------------------------------------------------------------------ */
    const activities = [];

    activities.push(act("attack", {
      name: "",
      activation: activation("action"),
      attack: { ability: "", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
      damage: { includeBase: true, parts: [] }
    }));

    // Self-damage. Scale 1 = 2d4 (1st level), each extra step adds 2d4 (2nd = 4d4, 3rd = 6d4 ...).
    activities.push(act("damage", {
      name: "Blood Price",
      img: "icons/magic/unholy/strike-body-life-soul-red.webp",
      activation: activation("special", { condition: "Part of casting Blood Magic: Magic Missile" }),
      range: { units: "self", override: false },
      target: { affects: { type: "self" }, override: false, prompt: false },
      consumption: { spellSlot: false, scaling: { allowed: true, max: "8" }, targets: [] },
      damage: { critical: { allow: false }, parts: [
        { number: 2, denomination: 4, bonus: "", types: ["piercing"], scaling: { mode: "whole", number: 2 } }
      ] },
      description: { chatFlavor: "Self-damage — ignores resistance and immunity. Scale = spell level." }
    }));

    if ( spellUuid ) {
      for ( let lvl = 1; lvl <= MAX_CAST_LEVEL; lvl++ ) {
        activities.push(act("cast", {
          name: `Blood Magic: Magic Missile (Lv ${lvl} · ${lvl * 2}d4 self)`,
          img: "icons/magic/unholy/projectile-missile-red.webp",
          activation: activation("action"),
          consumption: { spellSlot: false, targets: [USE_ITEM] },
          spell: {
            uuid: spellUuid,
            level: lvl,
            properties: [],          // no V/S/M needed — the blood pays for it
            spellbook: false,
            challenge: { override: false, attack: null, save: null }
          }
        }));
      }
    }

    /* ------------------------------------------------------------------ */
    /*  Item data                                                         */
    /* ------------------------------------------------------------------ */
    const description = `
<p><strong>Mastery: Nick.</strong> When you make the extra attack of the Light property, you can make it as part of the <strong>Attack</strong> action instead of as a <strong>Bonus Action</strong>. You can make this extra attack only once per turn.</p>
<p><strong>Blood Magic: Magic Missile</strong> As an action, you can cut yourself with this dagger, taking <strong>2d4 piercing damage</strong> (this damage ignores resistance and immunity) to cast the <em>Magic Missile</em> spell at 1st level.</p>
<p><strong><em>Upcasting with Blood.</em></strong> When you cast the spell in this way, you can choose to suffer additional damage to empower the spell. For every additional <strong>2d4 piercing damage</strong> you take, the spell is cast at one level higher (e.g., taking 4d4 damage casts it at 2nd level, 6d4 at 3rd level, and so on).</p>
<p><em>Once used, this feature can't be used again until the next dawn.</em></p>
<hr>
<p><em>Foundry: use <strong>Blood Price</strong> (pick the scale = spell level) and apply the damage to yourself ignoring resistance/immunity, then use the matching <strong>Blood Magic: Magic Missile (Lv N)</strong> activity — that one spends the 1/dawn charge.</em></p>`;

    const buildData = (old) => ({
      name: ITEM_NAME,
      type: "weapon",
      img: old?.img ?? FALLBACK_IMG,
      ...(old?.folder ? { folder: old.folder.id ?? old.folder } : {}),
      system: {
        type: { value: "simpleM", baseItem: "dagger" },
        quantity: old?.system.quantity ?? 1,
        weight: { value: 1, units: "lb" },
        price: { value: 2, denomination: "gp" },
        equipped: old?.system.equipped ?? false,
        proficient: null,
        identified: true,
        rarity: old?.system.rarity ?? "",
        attunement: old?.system.attunement ?? "",
        magicalBonus: null,
        mastery: "nick",
        properties: ["fin", "lgt", "thr", "mgc"],
        range: { value: 20, long: 60, reach: null, units: "ft" },
        damage: { base: { number: 1, denomination: 4, bonus: "", types: ["piercing"] } },
        uses: { spent: old?.system.uses?.spent ?? 0, max: "1", recovery: [{ period: "dawn", type: "recoverAll" }] },
        description: { value: description, chat: "" },
        source: { book: "Homebrew", page: "", custom: "" },
        activities: Object.fromEntries(activities.map((a, i) => [a._id, { sort: (i + 1) * 100000, ...a }]))
      }
    });

    /* ------------------------------------------------------------------ */
    /*  World item: create or rebuild (keeps ID so links stay valid)      */
    /* ------------------------------------------------------------------ */
    const worldOld = game.items.find(i => i.name === ITEM_NAME);
    if ( worldOld ) {
      const data = { ...buildData(worldOld), _id: worldOld.id };
      await worldOld.delete();
      await Item.implementation.create(data, { keepId: true });
    } else {
      await Item.implementation.create(buildData(null));
    }

    /* ------------------------------------------------------------------ */
    /*  Actor-owned copies: rebuild in place + clear stale cached spells  */
    /* ------------------------------------------------------------------ */
    let actorCount = 0;
    for ( const actor of game.actors ) {
      const owned = actor.items.filter(i => i.name === ITEM_NAME);
      for ( const old of owned ) {
        const data = { ...buildData(old), _id: old.id };
        const stale = actor.items.filter(i => {
          const cachedFor = i.getFlag("dnd5e", "cachedFor");
          return cachedFor && String(cachedFor).includes(old.id);
        }).map(i => i.id);
        await actor.deleteEmbeddedDocuments("Item", [old.id, ...stale]);
        await actor.createEmbeddedDocuments("Item", [data], { keepId: true });
        actorCount++;
      }
    }

    ui.notifications.info(`${ITEM_NAME} ${worldOld ? "rebuilt" : "created"}${actorCount ? ` (+ ${actorCount} actor cop${actorCount === 1 ? "y" : "ies"} updated)` : ""}.`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Sanguine Thorn macro failed: ${err.message}`);
  }
})();
