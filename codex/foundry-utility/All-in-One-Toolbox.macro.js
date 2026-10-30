// ============================================================
// Macro รวม: All-in-One Toolbox
// รวมฟังก์ชันไว้ใน Modal เดียว:
// 1. Token Image Toggle (สลับรูปฮูด/รูปจริง)
// 2. Token Size Resizer
// 3. Swap Initiative
// 4. Trigger Clone View (Lock View module)
// 5. Dice Tools: บังคับหน้าสูงสุด / ต่ำสุด / เจาะจง (1-20)
//    (ซ่อนไว้ในถาดพับได้ คลิกแถบว่างใต้หมวดสุดท้ายเพื่อเปิด/ปิด — ตั้งใจให้มองไม่เห็น)
// 6. Token Light: ตั้ง Bright / Dim light ให้ Token ที่เลือก
// 7. Macro Shortcuts: ปุ่มเปิด macro อื่น (Sound Board, Encounter Table Directory ฯลฯ)
// 8. Tier & Legendary: เติมระดับตัวตน / LA LR สำรอง ให้ token ที่เลือก หรือทั้งโลก
// ============================================================

// ---- ตั้งค่ารูปฮูดตรงนี้ ----
const defaultImg = "path/to/hooded-token.png"; // ใส่ URL หรือ Path รูปใส่ฮูดตรงนี้

// ---- ตั้งค่า macro ที่จะมีปุ่มเปิดใน Toolbox ตรงนี้ ----
// ใส่ UUID ของ macro (คลิกขวาที่ macro ใน Macro Directory > Copy UUID หรือ "Macro.<id>")
// ชื่อ + ไอคอนบนปุ่มดึงจาก macro จริงอัตโนมัติ, ใส่ label เพื่อบังคับชื่อเองได้
const MACRO_SHORTCUTS = [
  { uuid: "Macro.jw1EOnPIVX6T4YPO" },
  { uuid: "Macro.tkdSuSMJKfH3yooY" }
];

// ------------------------------------------------------------
// ฟังก์ชันที่ 1: Toggle Token Image
// ------------------------------------------------------------
async function toggleTokenImage() {
  const tokens = canvas.tokens.controlled;
  if (tokens.length === 0) {
    return ui.notifications.warn("กรุณาเลือก Token อย่างน้อย 1 ตัวก่อน");
  }

  for (const token of tokens) {
    const actor = token.actor;
    if (!actor) continue;

    const originalImg = token.document.flags.world?.originalImg || token.document.texture.src;
    const currentImg = token.document.texture.src;

    let newImg;
    if (currentImg === defaultImg) {
      newImg = originalImg;
    } else {
      await token.document.setFlag("world", "originalImg", currentImg);
      newImg = defaultImg;
    }

    await token.document.update({ "texture.src": newImg });
  }
  ui.notifications.info("สลับรูป Token เรียบร้อย");
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 2: Resize Token
// ------------------------------------------------------------
function applyTokenSize(size) {
  const updates = canvas.tokens.controlled.map(t => ({
    _id: t.id,
    width: size,
    height: size
  }));
  if (updates.length > 0) {
    canvas.scene.updateEmbeddedDocuments("Token", updates);
    ui.notifications.info(`ปรับขนาด Token เป็น ${size}`);
  } else {
    ui.notifications.warn("กรุณาเลือก Token อย่างน้อย 1 ตัวก่อนกดปรับขนาด");
  }
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 3: Swap Initiative
// ------------------------------------------------------------
async function swapInitiative() {
  const combat = game.combat;
  if (!combat) return ui.notifications.warn("ยังไม่มี combat เริ่มอยู่");

  const tokens = canvas.tokens.controlled;
  if (tokens.length !== 2) return ui.notifications.warn("กรุณาเลือกโทเคนให้ครบ 2 ตัว");

  const combatants = tokens
    .map(t => combat.combatants.find(c => c.tokenId === t.id))
    .filter(Boolean);

  if (combatants.length !== 2) {
    return ui.notifications.warn("โทเคนที่เลือกต้องอยู่ใน combat นี้ทั้งคู่");
  }

  const [a, b] = combatants;
  const initA = a.initiative;
  const initB = b.initiative;

  await combat.updateEmbeddedDocuments("Combatant", [
    { _id: a.id, initiative: initB },
    { _id: b.id, initiative: initA }
  ]);

  ui.notifications.info(`สลับ initiative: ${a.name} (${initB}) <-> ${b.name} (${initA})`);
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 4: Trigger Clone View
// ------------------------------------------------------------
function triggerCloneView() {
  const action = game.keybindings.actions.get("LockView.cloneView");

  if (!action) {
    ui.notifications.warn("ไม่พบ keybinding LockView.cloneView");
  } else if (typeof action.onDown === "function") {
    action.onDown({});
    console.log("Clone View triggered via keybinding action");
    ui.notifications.info("Clone View ทำงานแล้ว");
  } else {
    ui.notifications.warn("action นี้ไม่มี onDown ให้เรียก");
  }
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 5: บังคับผลการทอยลูกเต๋าครั้งถัดไป
// - มีผลเฉพาะการทอยที่เกิดบน "เครื่องที่กดปุ่มนี้" เท่านั้น
// - "max" / "min" ใช้ option maximize / minimize ของ Foundry เอง
// - ตัวเลข (2-19) ทอยตามปกติก่อน แล้วเขียนทับผลของลูกเต๋าทุกลูกใน roll
//   ถ้าลูกเต๋ามีหน้าน้อยกว่าตัวเลขที่เลือก จะใช้หน้าสูงสุดของลูกนั้นแทน
// - ใช้ได้ครั้งเดียว: บังคับเฉพาะ roll แรกที่มีลูกเต๋า แล้วกลับเป็นปกติทันที
// - กดปุ่มอื่นระหว่างที่ยังรอทอยอยู่ = เปลี่ยนโหมดได้เลย
// - ไม่มีข้อความเด้งบนจอเลย ดูสถานะได้ใน console (F12) อย่างเดียว
// ------------------------------------------------------------
const FORCE_TIMEOUT_MS = 60000;

function forceRollLabel(mode) {
  if (mode === "max") return "หน้าสูงสุด";
  if (mode === "min") return "หน้าต่ำสุด";
  return `หน้า ${mode}`;
}

function getForceRollState() {
  globalThis.__toolboxForceRoll ??= { mode: null, timer: null, method: null, original: null };
  return globalThis.__toolboxForceRoll;
}

function installForceRollPatch() {
  const state = getForceRollState();
  const RollClass = foundry.dice?.Roll ?? globalThis.Roll;
  const proto = RollClass.prototype;

  // เก็บเมธอดต้นฉบับของ Foundry ไว้ครั้งแรกครั้งเดียว
  // _evaluate คือเมธอดที่ทอยลูกเต๋าจริง ครอบตรงนี้จะครอบคลุม roll ของระบบและโมดูลได้กว้างกว่า evaluate
  if (!state.original) {
    state.method = typeof proto._evaluate === "function" ? "_evaluate" : "evaluate";
    state.original = proto[state.method];
  }
  const method = state.method;
  const original = state.original;

  // เขียนตัวครอบใหม่ทับทุกครั้ง (ทับ patch ของ macro เวอร์ชันเก่าที่ค้างอยู่ด้วย)
  proto[method] = async function (options = {}) {
    const mode = state.mode;

    // ไม่มีคำสั่งค้างอยู่ หรือ roll นี้ไม่มีลูกเต๋า (เช่นสูตรตัวเลขล้วน) → ทอยปกติ
    if (!mode || !this.dice?.length) return original.call(this, options);

    // ใช้คำสั่งนี้แล้ว ล้างทิ้งทันที กัน roll อื่นมาใช้ซ้ำ
    state.mode = null;
    clearTimeout(state.timer);

    let result;
    if (mode === "max") {
      result = await original.call(this, { ...options, maximize: true });
    } else if (mode === "min") {
      result = await original.call(this, { ...options, minimize: true });
    } else {
      result = await original.call(this, options);
      const desired = Number(mode);

      // this.dice รวมลูกเต๋าทุกลูกใน roll (this.terms เห็นแค่ term ชั้นนอก)
      // เขียนทับทุกลูก รวมลูกที่ถูกทิ้งตอน advantage/disadvantage ด้วย
      // ไม่งั้นอาจเห็นลูกที่ถูกทิ้งได้แต้มสูงกว่าลูกที่เก็บไว้
      for (const die of this.dice) {
        const face = Math.min(desired, die.faces);
        for (const r of die.results) r.result = face;
      }

      // คำนวณผลรวมใหม่ให้ตรงกับหน้าที่บังคับ
      this._total = typeof this._evaluateTotal === "function"
        ? this._evaluateTotal()
        : RollClass.safeEval(this.terms.map(t => t.total).join(" "));
    }

    console.log(`Toolbox: บังคับผลทอยเป็น${forceRollLabel(mode)}แล้ว (${this.formula})`);
    return result;
  };
}

function forceNextRoll(mode) {
  installForceRollPatch();
  const state = getForceRollState();

  state.mode = mode; // กดซ้ำหรือกดปุ่มอื่น = เปลี่ยนโหมด
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    if (!state.mode) return;
    state.mode = null;
    console.log("Toolbox: ยกเลิกการบังคับผลทอย เพราะไม่มีการทอยภายใน 60 วินาที");
  }, FORCE_TIMEOUT_MS);

  console.log(`Toolbox: การทอยครั้งถัดไป (บนเครื่องนี้) จะออก${forceRollLabel(mode)}`);
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 6: ตั้งค่าแสง (Bright / Dim) ให้ Token ที่เลือก
// - bright = รัศมีแสงสว่าง, dim = รัศมีแสงสลัว (วัดจากกลาง token ออกไป หน่วยตาม scene เช่น ft)
// - dim ต้องไม่น้อยกว่า bright ไม่งั้นแสงสลัวจะถูกแสงสว่างกลบหมด จึงปัดให้ dim >= bright อัตโนมัติ
// - ใส่ 0 / 0 = ปิดไฟ
// ------------------------------------------------------------
async function applyTokenLight(bright, dim) {
  const tokens = canvas.tokens.controlled;
  if (tokens.length === 0) {
    return ui.notifications.warn("กรุณาเลือก Token อย่างน้อย 1 ตัวก่อนตั้งค่าแสง");
  }

  bright = Math.max(0, Number(bright) || 0);
  dim = Math.max(bright, Number(dim) || 0);

  const updates = tokens.map(t => ({
    _id: t.id,
    "light.bright": bright,
    "light.dim": dim
  }));
  await canvas.scene.updateEmbeddedDocuments("Token", updates);

  if (bright === 0 && dim === 0) {
    ui.notifications.info("ปิดแสงของ Token ที่เลือกแล้ว");
  } else {
    ui.notifications.info(`ตั้งแสง Token: Bright ${bright} / Dim ${dim}`);
  }
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 7: เปิด macro อื่นจาก UUID
// ------------------------------------------------------------
async function runMacroShortcut(uuid) {
  const macro = await fromUuid(uuid);
  if (!macro) {
    return ui.notifications.warn(`ไม่พบ macro: ${uuid} (เช็ค UUID ใน MACRO_SHORTCUTS)`);
  }
  if (!macro.canExecute) {
    return ui.notifications.warn(`ไม่มีสิทธิ์รัน macro "${macro.name}"`);
  }
  await macro.execute();
}

// ------------------------------------------------------------
// ฟังก์ชันที่ 8: Tier of Being + Legendary สำรอง
// ทำงานแบบเดียวกับ Set-Tier-Of-Being.macro.js และ Add-Legendary-Reserve.macro.js
// (RAISE_EXISTING = false) — ข้อความ/ตัวเลขต้องตรงกับสองไฟล์นั้น ถ้าแก้ที่นั่นให้แก้ที่นี่ด้วย
// - token ที่เลือก: เปิดหน้าต่างให้เลือกระดับ / ตั้ง LA LR เอง (token แบบ unlinked แก้เฉพาะ token ตัวนั้น)
// - ทั้งโลก: ขึ้นตารางให้ดูก่อน กดยืนยันถึงจะทำ
// - ยกตัวเลขที่ตั้งไว้แล้ว / ถอด Reserve ออก: ใช้ macro ไฟล์เดิม (ไม่มีปุ่ม กันเผลอกด)
// ------------------------------------------------------------
const TIER_SKIP_FOLDERS = ["Travel Pace Token"];
const TIER_LIST = [                            // [ชื่อ, เลเวล/CR สูงสุด, Legendary Action, Legendary Resistance, stage]
  ["Mortal", 10, 3, 2, "Void"],
  ["Ascendant", 20, 4, 3, "Premise"],
  ["Divine", 30, 5, 4, "Definition"],
  ["Sovereign", 40, 6, 5, "Name"],
  ["Law", Infinity, 7, 6, "Genesis"]
];
const TIER_NAMES = TIER_LIST.map(t => t[0]);
const TIER_NAME_RE = new RegExp(`^(${TIER_NAMES.join("|")}) Being$`, "i");
const TIER_DESC_RE = new RegExp(`Tier of Being:\\s*(${TIER_NAMES.join("|")})`, "i");
const TIER_GAP_RE = /<p><em>Tier Gap:<\/em>[\s\S]*?<\/p>/i;
const TIER_ITEM_FLAG = "tierTrait";            // flags.world.tierTrait = feature ระดับตัวตนที่ macro เขียน
const RESERVE_FLAG = "legendaryReserve";       // flags.world.legendaryReserve = ของที่ Legendary สำรองใส่
const TIER_FLAG = "tierOfBeing";               // flags.world.tierOfBeing บน actor = ชื่อระดับ

const tierNorm = s => TIER_NAMES.find(n => n.toLowerCase() === s?.toLowerCase());

function tierSkipped(actor) {
  if (!["character", "npc"].includes(actor.type)) return true;
  if (actor.getFlag("item-piles", "data")?.enabled) return true;
  for (let f = actor.folder; f; f = f.folder) if (TIER_SKIP_FOLDERS.includes(f.name)) return true;
  return false;
}

function tierItemOf(actor) {
  return actor.items.find(i => TIER_NAME_RE.test(i.name))
    ?? actor.items.find(i => TIER_DESC_RE.test(i.system.description?.value ?? ""));
}

// ระดับ: ชื่อ feature → "Tier of Being: X" ในคำอธิบาย → flag → เพดานเลเวล (PC) / CR (NPC)
function tierOfActor(actor) {
  const item = tierItemOf(actor);
  const n = actor.type === "character" ? (actor.system.details?.level ?? 0) : (actor.system.details?.cr ?? 0);
  return tierNorm(item?.name.match(TIER_NAME_RE)?.[1])
    ?? tierNorm(item?.system.description?.value?.match(TIER_DESC_RE)?.[1])
    ?? tierNorm(actor.getFlag("world", TIER_FLAG))
    ?? TIER_LIST.find(t => n <= t[1])[0];
}

function tierGapText(name, tier) {
  const i = TIER_NAMES.indexOf(tier);
  if (i === 0) return `<p><em>Tier Gap:</em> Mortal is the lowest tier. A creature above ${name} gains +5 per tier of difference `
    + `to every d20 Test that involves ${name} and +5 AC per tier against ${name}'s attacks `
    + `(Ascendant +5, Divine +10, Sovereign +15, Law +20). ${name}'s other rolls are unchanged.</p>`;
  const below = TIER_NAMES.slice(0, i).reverse().map((n, k) => `${n} +${(k + 1) * 5}`).join(", ");
  return `<p><em>Tier Gap:</em> For each tier ${name} is above another creature, it gains +5 to every d20 Test that involves `
    + `that creature (its attack rolls against it, its saving throws against its effects, and contested checks with it) `
    + `and +5 AC against that creature's attacks (${below}). The lower creature's other rolls are unchanged.</p>`;
}

function tierFullText(name, tier) {
  const stage = TIER_LIST.find(t => t[0] === tier)[4];
  const nature = {
    Mortal: `${name}'s body and soul are still separate.`,
    Ascendant: `${name}'s body and soul are fused into a single will. It doesn't age and can't die of old age.`,
    Divine: `${name} exists through its own Definition, not its body. It doesn't age and can't die of old age.`,
    Sovereign: `${name} bears a Name and is limitless within it. It doesn't age and can't die of old age.`,
    Law: `${name} is a law of the world itself. It doesn't age and can't die of old age.`
  }[tier];
  const todo = { Divine: "Domain", Sovereign: "Name + Signature Move", Law: "Global Passive" }[tier];
  return `<p><strong>Tier of Being: ${tier} (${stage}).</strong> ${nature}</p>${tierGapText(name, tier)}`
    + (todo ? `<p><em>DM:</em> this tier also has a ${todo} (NPC-Design-system.md §3). Not designed yet.</p>` : "");
}

// แผนของ actor 1 ตัว: null = ครบแล้ว / add = ใส่ใหม่ / rewrite = เขียนข้อความที่ macro ทำใหม่ /
// gap only = ข้อความที่เขียนเอง เปลี่ยนแค่ย่อหน้า Tier Gap / gap added = ข้อความเขียนเองที่ไม่มีย่อหน้า Tier Gap
function planTier(actor) {
  const tier = tierOfActor(actor);
  const name = foundry.utils.escapeHTML(actor.name);
  const item = tierItemOf(actor);
  const desc = item?.system.description?.value ?? "";
  const macroMade = !!(item?.getFlag("world", TIER_ITEM_FLAG) || item?.getFlag("world", RESERVE_FLAG));
  let action, newDesc;
  if (!item) [action, newDesc] = ["add", tierFullText(name, tier)];
  else if (macroMade) [action, newDesc] = ["rewrite", tierFullText(name, tier)];
  else if (TIER_GAP_RE.test(desc)) [action, newDesc] = ["gap only", desc.replace(TIER_GAP_RE, tierGapText(name, tier))];
  else [action, newDesc] = ["gap added", desc + tierGapText(name, tier)];
  const sameText = item && (newDesc === desc) && (!macroMade || item.name === `${tier} Being`);
  if (sameText && (actor.getFlag("world", TIER_FLAG) === tier) && !item.getFlag("world", RESERVE_FLAG)) return null;
  return { actor, tier, item, action, newDesc };
}

async function applyTierPlan({ actor, tier, item, action, newDesc }) {
  if (action === "add") {
    await actor.createEmbeddedDocuments("Item", [{
      name: `${tier} Being`,
      type: "feat",
      img: "icons/magic/symbols/star-solid-gold.webp",
      flags: { world: { [TIER_ITEM_FLAG]: true } },
      system: {
        type: { value: actor.type === "character" ? "" : "monster", subtype: "" },
        description: { value: newDesc }
      }
    }]);
  } else {
    const macroMade = !!(item.getFlag("world", TIER_ITEM_FLAG) || item.getFlag("world", RESERVE_FLAG));
    const update = { "system.description.value": newDesc };
    if (macroMade) Object.assign(update, { name: `${tier} Being`, [`flags.world.${TIER_ITEM_FLAG}`]: true });
    await item.update(update);
    // ถอด Legendary สำรองออกทีหลัง feature ระดับตัวตนจะไม่หายไปด้วย
    if (item.getFlag("world", RESERVE_FLAG)) await item.unsetFlag("world", RESERVE_FLAG);
  }
  await actor.setFlag("world", TIER_FLAG, tier);
}

// แผน Legendary สำรอง: เฉพาะ NPC ที่ LA หรือ LR ยังเป็น 0 — ตัวเลขที่ตั้งไว้แล้วไม่แตะ
function planReserve(actor) {
  if (actor.type !== "npc") return null;
  const tier = tierOfActor(actor);
  const [, , la, lr] = TIER_LIST.find(t => t[0] === tier);
  const curLA = actor.system.resources?.legact?.max ?? 0;
  const curLR = actor.system.resources?.legres?.max ?? 0;
  if (curLA && curLR) return null;
  const hasLegendaryItem = actor.items.some(i => !!i.system.activities?.some?.(x => x.activation?.type === "legendary"));
  const hasResistItem = actor.items.some(i => /legendary resistance/i.test(i.name));
  return {
    actor, tier, la, lr,
    raiseLA: !curLA, raiseLR: !curLR,
    addLA: !curLA && !hasLegendaryItem, addLR: !curLR && !hasResistItem
  };
}

const RESERVE_NOTE = "<p><em>Reserve (DM option):</em> not counted in this creature's CR. Use it only when the fight needs more push, "
  + "e.g. a smaller encounter, a big party, or players who think this one is a pushover.</p>";
const reserveResistName = lr => `Legendary Resistance (${lr}/Day, Reserve)`;
const reserveResistDesc = (name, lr) =>
  `<p>If ${name} fails a saving throw, it can choose to succeed instead. In its lair it has ${lr + 1} uses.</p>${RESERVE_NOTE}`;

// ท่า Reserve: wantLA = Strike + Shift, lr > 0 = Legendary Resistance (lr/Day)
function reserveItems(actor, wantLA, lr) {
  const name = foundry.utils.escapeHTML(actor.name);
  const LEGACT = { type: "attribute", target: "resources.legact.value", value: "1" };
  const LEGRES = { type: "attribute", target: "resources.legres.value", value: "1" };
  const feat = (itemName, img, desc, activation, consume) => {
    const id = foundry.utils.randomID();
    return {
      name: itemName, type: "feat", img,
      flags: { world: { [RESERVE_FLAG]: true } },
      system: {
        type: { value: "monster", subtype: "" },
        description: { value: desc },
        activities: { [id]: { _id: id, type: "utility", sort: 100000, activation, consumption: { spellSlot: true, targets: [consume] } } }
      }
    };
  };
  const items = [];
  if (lr > 0) items.push(feat(reserveResistName(lr), "icons/magic/symbols/star-solid-gold.webp", reserveResistDesc(name, lr),
    { type: "special", value: null, override: false, condition: "fails a saving throw" }, LEGRES));
  if (wantLA) items.push(
    feat("Reserve: Strike", "icons/skills/melee/strike-sword-slashing-red.webp",
      `<p>${name} makes one attack it could make with its Attack or Multiattack action. Only once per round.</p>${RESERVE_NOTE}`,
      { type: "legendary", value: 1, override: false, condition: "Once per round" }, LEGACT),
    feat("Reserve: Shift", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
      `<p>${name} moves up to half its Speed without provoking Opportunity Attacks.</p>${RESERVE_NOTE}`,
      { type: "legendary", value: 1, override: false, condition: "" }, LEGACT));
  return items;
}

async function applyReservePlan(p) {
  const items = reserveItems(p.actor, p.addLA, p.addLR ? p.lr : 0);
  if (items.length) await p.actor.createEmbeddedDocuments("Item", items);

  // จำค่าเดิม (0) ไว้ ให้ MODE "remove" ของ Add-Legendary-Reserve คืนค่าได้
  const set = { ...(p.actor.getFlag("world", RESERVE_FLAG) ?? {}) };
  const update = {};
  if (p.raiseLA) {
    set.legact ??= 0;
    Object.assign(update, { "system.resources.legact.max": p.la, "system.resources.legact.spent": 0 });
  }
  if (p.raiseLR) {
    set.legres ??= 0;
    Object.assign(update, { "system.resources.legres.max": p.lr, "system.resources.legres.spent": 0 });
  }
  update[`flags.world.${RESERVE_FLAG}`] = set;
  await p.actor.update(update);
}

// actor ของ token ที่เลือก (ไม่ซ้ำ) — token แบบ unlinked ได้ actor ของ token ตัวนั้นเอง
function selectedTokenActors() {
  const tokens = canvas.tokens.controlled;
  if (tokens.length === 0) {
    ui.notifications.warn("กรุณาเลือก Token อย่างน้อย 1 ตัวก่อน");
    return null;
  }
  const seen = new Set();
  return tokens.map(t => t.actor).filter(a => a && !seen.has(a.uuid) && seen.add(a.uuid));
}

// ตั้งระดับตัวตนที่เลือกเองให้ actor 1 ตัว
// - feature ที่ macro เขียน: เปลี่ยนชื่อ + เขียนข้อความใหม่ทั้งหมด
// - feature ที่เขียนเอง (บอส): เปลี่ยนแค่คำว่าระดับในชื่อ / "Tier of Being: X" + ย่อหน้า Tier Gap
//   ข้อความอื่น (เช่น Definition) ไม่แตะ → คืนค่า true ให้เตือนว่าต้องไปเช็คเอง
async function setActorTier(actor, tier) {
  const name = foundry.utils.escapeHTML(actor.name);
  const item = tierItemOf(actor);
  if (!item) {
    await applyTierPlan({ actor, tier, item: null, action: "add", newDesc: tierFullText(name, tier) });
    return false;
  }
  const macroMade = !!(item.getFlag("world", TIER_ITEM_FLAG) || item.getFlag("world", RESERVE_FLAG));
  if (macroMade) {
    await applyTierPlan({ actor, tier, item, action: "rewrite", newDesc: tierFullText(name, tier) });
    return false;
  }
  let desc = (item.system.description?.value ?? "").replace(TIER_DESC_RE, `Tier of Being: ${tier}`);
  desc = TIER_GAP_RE.test(desc) ? desc.replace(TIER_GAP_RE, tierGapText(name, tier)) : desc + tierGapText(name, tier);
  const update = { "system.description.value": desc };
  if (TIER_NAME_RE.test(item.name)) update.name = `${tier} Being`;
  const changed = tierOfActor(actor) !== tier;
  await item.update(update);
  await actor.setFlag("world", TIER_FLAG, tier);
  return changed;
}

// Dialog ฟอร์มเล็ก ๆ: คืนค่า FormData object หรือ null ถ้ากดยกเลิก
// onRender(root) = ผูก event เพิ่มเติมหลังหน้าต่างเปิด
async function askForm(title, html, okLabel, onRender) {
  return foundry.applications.api.DialogV2.prompt({
    window: { title },
    position: { width: 400 },
    content: `<div style="display:flex;flex-direction:column;gap:10px">${html}</div>`,
    ok: {
      label: okLabel,
      callback: (event, button) => Object.fromEntries(new FormData(button.form))
    },
    rejectClose: false,
    render: onRender ? (event, dialog) => onRender(dialog.element) : undefined
  }).catch(() => null);
}

// ตาราง LA/LR ของแต่ละระดับ — คลิกแถวเพื่อเติมตัวเลขลงช่องกรอก
function tierReserveTableHtml(highlight) {
  const rows = TIER_LIST.map(([t, , la, lr]) => {
    const on = t === highlight ? "background:rgba(200,140,240,.18);font-weight:700" : "";
    return `<tr data-tier-fill data-la="${la}" data-lr="${lr}" style="cursor:pointer;${on}" title="คลิกเพื่อใช้ค่าของ ${t}">`
      + `<td>${t}</td><td style="text-align:center">${la}</td><td style="text-align:center">${lr}</td></tr>`;
  }).join("");
  return `<table style="margin:0;font-size:12px">
    <tr><th style="text-align:left">ระดับ</th><th>LA / รอบ</th><th>LR / วัน</th></tr>${rows}</table>
    <p style="font-size:11px;opacity:.7;margin:0">คลิกแถวเพื่อใช้ค่าของระดับนั้น · ในที่ Lair LR +1</p>`;
}

function bindTierReserveTable(root) {
  root?.querySelectorAll("[data-tier-fill]").forEach(row => row.addEventListener("click", () => {
    root.querySelector('input[name="la"]').value = row.dataset.la;
    root.querySelector('input[name="lr"]').value = row.dataset.lr;
  }));
}

const tokenListHtml = (actors, line) =>
  `<div style="max-height:140px;overflow:auto;font-size:12px;line-height:1.5">${actors.map(a =>
    `• ${foundry.utils.escapeHTML(a.name)} — ${line(a)}`).join("<br>")}</div>`;

async function tierSelectedTokens() {
  if (!game.user.isGM) return ui.notifications.warn("ต้องเป็น GM ถึงจะใส่ระดับตัวตนได้");
  const actors = selectedTokenActors()?.filter(a => !tierSkipped(a));
  if (!actors) return;
  if (!actors.length) return ui.notifications.warn("token ที่เลือกไม่ใช่ PC หรือ NPC");

  const current = tierOfActor(actors[0]);
  const options = TIER_NAMES.map(t => `<option value="${t}" ${t === current ? "selected" : ""}>${t}</option>`).join("");
  const form = await askForm("ตั้งระดับตัวตน", `
    <div>Token ที่เลือก (${actors.length}):</div>
    ${tokenListHtml(actors, a => `ตอนนี้ ${tierItemOf(a) ? tierOfActor(a) : "ยังไม่มี"}`)}
    <label>ระดับตัวตน <select name="tier">${options}</select></label>`, "ตั้งระดับ");
  if (!form) return;

  const tier = tierNorm(form.tier);
  const check = [];
  for (const actor of actors) if (await setActorTier(actor, tier)) check.push(actor.name);
  ui.notifications.info(`ตั้งระดับ ${tier} ให้ ${actors.map(a => a.name).join(", ")} แล้ว`);
  if (check.length) ui.notifications.warn(`${check.join(", ")}: feature เขียนเองไว้ เปลี่ยนแค่ชื่อระดับกับ Tier Gap — เช็คข้อความที่เหลือเองด้วย`);
}

async function reserveSelectedTokens() {
  if (!game.user.isGM) return ui.notifications.warn("ต้องเป็น GM ถึงจะตั้ง LA/LR ได้");
  const actors = selectedTokenActors()?.filter(a => !tierSkipped(a) && a.type === "npc");
  if (!actors) return;
  if (!actors.length) return ui.notifications.warn("ต้องเลือก token ที่เป็น NPC (PC ไม่มี LA/LR)");

  const first = actors[0];
  const [, , tierLA, tierLR] = TIER_LIST.find(t => t[0] === tierOfActor(first));
  const curLA = first.system.resources?.legact?.max || 0;
  const curLR = first.system.resources?.legres?.max || 0;
  const form = await askForm("ตั้ง LA / LR", `
    <div>NPC ที่เลือก (${actors.length}):</div>
    ${tokenListHtml(actors, a => `${tierOfActor(a)} · ตอนนี้ LA ${a.system.resources?.legact?.max || 0} / LR ${a.system.resources?.legres?.max || 0}`)}
    <label>Legendary Action / รอบ <input type="number" name="la" min="0" step="1" value="${curLA || tierLA}"></label>
    <label>Legendary Resistance / วัน <input type="number" name="lr" min="0" step="1" value="${curLR || tierLR}"></label>
    ${tierReserveTableHtml(tierOfActor(first))}
    <label><input type="checkbox" name="items" checked> ใส่ท่า Reserve (Strike / Shift / Legendary Resistance) ให้ตัวที่ยังไม่มีท่าของตัวเอง</label>
    <p style="font-size:11px;opacity:.7;margin:0">ค่าตั้งต้น = ค่าบนชีทของ ${foundry.utils.escapeHTML(first.name)} (ถ้าเป็น 0 ใช้ค่าตามระดับ ${tierOfActor(first)}) · ใส่ 0 = ปิด และถอดท่า Reserve ของช่องนั้นออก</p>`, "ตั้งค่า", bindTierReserveTable);
  if (!form) return;

  const la = Math.max(0, parseInt(form.la) || 0);
  const lr = Math.max(0, parseInt(form.lr) || 0);
  const withItems = form.items === "on";
  for (const actor of actors) await setActorReserve(actor, la, lr, withItems);
  ui.notifications.info(`ตั้ง LA ${la} / LR ${lr} ให้ ${actors.map(a => a.name).join(", ")} แล้ว`);
}

// ตั้ง LA/LR เป็นตัวเลขที่กำหนดเอง + จัดท่า Reserve ให้ตรง
async function setActorReserve(actor, la, lr, withItems) {
  const name = foundry.utils.escapeHTML(actor.name);
  const reserve = actor.items.filter(i => i.getFlag("world", RESERVE_FLAG));
  const reserveLA = reserve.filter(i => i.system.activities?.some?.(x => x.activation?.type === "legendary"));
  const reserveLR = reserve.filter(i => /legendary resistance/i.test(i.name));
  const ownLA = actor.items.some(i => !i.getFlag("world", RESERVE_FLAG)
    && !!i.system.activities?.some?.(x => x.activation?.type === "legendary"));
  const ownLR = actor.items.some(i => !i.getFlag("world", RESERVE_FLAG) && /legendary resistance/i.test(i.name));

  // ปิดช่องไหน (0) ถอดท่า Reserve ของช่องนั้น
  const remove = [...(la ? [] : reserveLA), ...(lr ? [] : reserveLR)].map(i => i.id);
  if (remove.length) await actor.deleteEmbeddedDocuments("Item", remove);

  // Legendary Resistance (Reserve) ที่มีอยู่แล้ว: แก้ตัวเลขในชื่อ/คำอธิบายให้ตรง
  if (lr) for (const i of reserveLR) {
    await i.update({ name: reserveResistName(lr), "system.description.value": reserveResistDesc(name, lr) });
  }
  if (withItems) {
    const items = reserveItems(actor, la > 0 && !ownLA && !reserveLA.length, lr > 0 && !ownLR && !reserveLR.length ? lr : 0);
    if (items.length) await actor.createEmbeddedDocuments("Item", items);
  }

  // จำค่าเดิมครั้งแรกไว้ ให้ MODE "remove" ของ Add-Legendary-Reserve คืนค่าได้
  const set = { ...(actor.getFlag("world", RESERVE_FLAG) ?? {}) };
  set.legact ??= actor.system.resources?.legact?.max ?? 0;
  set.legres ??= actor.system.resources?.legres?.max ?? 0;
  await actor.update({
    "system.resources.legact.max": la, "system.resources.legact.spent": 0,
    "system.resources.legres.max": lr, "system.resources.legres.spent": 0,
    [`flags.world.${RESERVE_FLAG}`]: set
  });
}

// ตารางให้ดูก่อนทำทั้งโลก
async function confirmTable(title, intro, headers, rows) {
  const esc = foundry.utils.escapeHTML;
  return foundry.applications.api.DialogV2.confirm({
    window: { title },
    position: { width: 560 },
    content: `<p>${intro}</p>
      <div style="max-height:50vh;overflow:auto"><table>
        <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
        ${rows.map(r => `<tr>${r.map(c => `<td>${esc(String(c))}</td>`).join("")}</tr>`).join("")}
      </table></div>`
  });
}

async function tierWholeWorld() {
  if (!game.user.isGM) return ui.notifications.warn("ต้องเป็น GM ถึงจะใส่ระดับตัวตนได้");
  const plans = game.actors.filter(a => !tierSkipped(a)).map(planTier).filter(Boolean)
    .sort((x, y) => x.actor.type.localeCompare(y.actor.type) || x.actor.name.localeCompare(y.actor.name));
  if (!plans.length) return ui.notifications.info("PC และ NPC ทุกตัวมีระดับตัวตนครบแล้ว");
  const ok = await confirmTable("เติม Tier ทั้งโลก",
    `${plans.length} ตัว — add = ใส่ใหม่ · rewrite = เขียนข้อความใหม่ · gap only = เก็บข้อความเดิม เปลี่ยนแค่ย่อหน้า Tier Gap`,
    ["ชื่อ", "ประเภท", "ระดับ", "เปลี่ยน"],
    plans.map(p => [p.actor.name, p.actor.type === "character" ? "PC" : "NPC", p.tier, p.action]));
  if (!ok) return;
  for (const p of plans) await applyTierPlan(p);
  ui.notifications.info(`ใส่ระดับตัวตนแล้ว ${plans.length} ตัว`);
}

async function reserveWholeWorld() {
  if (!game.user.isGM) return ui.notifications.warn("ต้องเป็น GM ถึงจะเติม LA/LR ได้");
  const plans = game.actors.filter(a => !tierSkipped(a)).map(planReserve).filter(Boolean)
    .sort((x, y) => x.actor.name.localeCompare(y.actor.name));
  if (!plans.length) return ui.notifications.info("NPC ทุกตัวมี LA/LR ครบแล้ว");
  const ok = await confirmTable("เติม LA/LR ทั้งโลก",
    `${plans.length} NPC ที่ LA หรือ LR ยังเป็น 0 ("—" = มีอยู่แล้ว ไม่แตะ)`,
    ["NPC", "CR", "ระดับ", "Leg. Actions", "Leg. Resist"],
    plans.map(p => [p.actor.name, p.actor.system.details?.cr ?? "—", p.tier, p.raiseLA ? p.la : "—", p.raiseLR ? p.lr : "—"]));
  if (!ok) return;
  for (const p of plans) await applyReservePlan(p);
  ui.notifications.info(`เติม LA/LR แล้ว ${plans.length} ตัว`);
}

// HTML ปุ่ม macro (สร้างก่อนเปิด Dialog เพื่อดึงชื่อ + ไอคอนจาก macro จริง)
function buildMacroShortcutsHtml() {
  if (!MACRO_SHORTCUTS.length) return "";

  const buttons = MACRO_SHORTCUTS.map(({ uuid, label }) => {
    const macro = fromUuidSync(uuid);
    const name = foundry.utils.escapeHTML(label ?? macro?.name ?? uuid);
    const img = macro?.img;
    const icon = img
      ? `<img class="toolbox-macro-img" src="${img}" alt="">`
      : `<i class="fas fa-terminal"></i>`;
    return `<button type="button" class="toolbox-btn macro" data-toolbox-macro="${uuid}" title="${name}">${icon}<span>${name}</span></button>`;
  }).join("");

  return `
  <div class="toolbox-group">
    <div class="toolbox-label">Macro Shortcuts</div>
    <div class="toolbox-grid cols-2">
      ${buttons}
    </div>
  </div>`;
}

// ------------------------------------------------------------
// CSS: แทรกผ่าน document.head โดยตรง
// (DialogV2 จะตัด <style> ที่ฝังใน content ทิ้งเพื่อความปลอดภัย
//  จึงต้องแทรก CSS เข้า document.head ด้วย JS แทน)
// ------------------------------------------------------------
const STYLE_ID = "toolbox-custom-style";

function injectToolboxStyle() {
  // ลบของเก่าก่อน กันซ้ำเวลาเปิด macro หลายรอบ
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .custom-toolbox-dialog .window-content {
      background: #14131f !important;
      /* เลื่อนดูได้เมื่อเนื้อหายาวกว่าหน้าต่าง (เช่นตอน Detach หรือกางถาด Dice Tools) */
      overflow-y: auto !important;
      min-height: 0;
    }
    .custom-toolbox-dialog .window-content > * {
      flex-shrink: 0;
    }
    /* ซ่อนแถบปุ่ม "ปิด" ด้านล่าง (DialogV2 บังคับต้องมีปุ่มอย่างน้อย 1 ปุ่ม จึงซ่อนด้วย CSS แทน)
       ยังปิดหน้าต่างได้จากปุ่ม X มุมขวาบน */
    .custom-toolbox-dialog .form-footer {
      display: none !important;
    }
    .custom-toolbox-dialog .window-content::-webkit-scrollbar {
      width: 8px;
    }
    .custom-toolbox-dialog .window-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-toolbox-dialog .window-content::-webkit-scrollbar-thumb {
      background: #3c3a58;
      border-radius: 4px;
    }
    .custom-toolbox-dialog .window-content::-webkit-scrollbar-thumb:hover {
      background: #635fa0;
    }
    .custom-toolbox-dialog .dialog-content,
    .custom-toolbox-dialog form {
      padding: 0 !important;
    }
    .toolbox-dialog {
      background: transparent;
      color: #e6e5f0;
      padding: 14px 16px 4px 16px;
      font-family: inherit;
    }
    .toolbox-group {
      margin-bottom: 18px;
    }
    .toolbox-group:last-child {
      margin-bottom: 4px;
    }
    .toolbox-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #8f8dab;
      margin-bottom: 8px;
      letter-spacing: 0.6px;
      border-bottom: 1px solid #2a2840;
      padding-bottom: 6px;
    }
    .toolbox-grid {
      display: grid;
      gap: 6px;
    }
    .toolbox-grid.cols-1 { grid-template-columns: 1fr; }
    .toolbox-grid.cols-2 { grid-template-columns: 1fr 1fr; }
    .toolbox-grid.cols-5 { grid-template-columns: repeat(5, 1fr); }
    .toolbox-grid.cols-5-wrap { grid-template-columns: repeat(5, 1fr); margin-top: 8px; }
    .toolbox-btn {
      background: #23213a;
      border: 1px solid #3c3a58;
      border-radius: 7px;
      color: #d7d6e6;
      padding: 9px 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      line-height: 1.2;
      transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
    }
    .toolbox-btn:hover {
      background: #34324f;
      border-color: #635fa0;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(120, 110, 220, 0.35);
    }
    /* ---- Custom Size ---- */
    .toolbox-size-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 6px;
    }
    .toolbox-size-row input {
      width: 100%;
      height: 34px;
      background: #1b1a2b;
      border: 1px solid #3c3a58;
      border-radius: 7px;
      color: #e6e5f0;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
    .toolbox-size-row input::placeholder {
      color: #6d6b8a;
      font-weight: 500;
    }
    .toolbox-size-row input:focus {
      border-color: #635fa0;
      box-shadow: 0 0 8px rgba(120, 110, 220, 0.35);
      outline: none;
    }
    .toolbox-size-row .toolbox-btn {
      height: 34px;
      padding: 0 4px;
    }
    .toolbox-btn.wide {
      padding: 11px 6px;
      font-size: 13px;
    }
    .toolbox-btn.accent {
      background: #191c33;
      border-color: #2b3766;
      color: #9db3ff;
    }
    .toolbox-btn.accent:hover {
      background: #212a4c;
      border-color: #4a5da3;
      color: #ffffff;
    }

    /* ---- Macro Shortcuts ---- */
    .toolbox-btn.macro {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 6px 8px;
      background: #1f2a26;
      border-color: #2f5a4a;
      color: #9fe3c4;
    }
    .toolbox-btn.macro:hover {
      background: #273a33;
      border-color: #48907a;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(110, 220, 170, 0.3);
    }
    .toolbox-btn.macro span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .toolbox-macro-img {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border: none;
      border-radius: 4px;
      object-fit: cover;
    }

    /* ---- Token Light ---- */
    .toolbox-light-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      align-items: end;
    }
    .toolbox-light-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: #8f8dab;
    }
    .toolbox-light-field input {
      width: 100%;
      height: 34px;
      background: #1b1a2b;
      border: 1px solid #3c3a58;
      border-radius: 7px;
      color: #e6e5f0;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
    .toolbox-light-field input:focus {
      border-color: #635fa0;
      box-shadow: 0 0 8px rgba(120, 110, 220, 0.35);
      outline: none;
    }
    .toolbox-btn.light {
      background: #2a2416;
      border-color: #5a4a26;
      color: #f1d48a;
    }
    .toolbox-btn.light:hover {
      background: #3a321d;
      border-color: #8a7038;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(240, 200, 110, 0.3);
    }
    .toolbox-light-row .toolbox-btn {
      height: 34px;
      padding: 0 4px;
    }

    /* ---- Tier & Legendary ---- */
    .toolbox-btn.tier {
      background: #2a1f33;
      border-color: #5a3a6e;
      color: #e0b8ff;
    }
    .toolbox-btn.tier:hover {
      background: #3a2a47;
      border-color: #8a5aa8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(200, 140, 240, 0.3);
    }

    /* ---- ปุ่มลับพับ/กางถาด Dice Tools: แถบว่างใต้หมวดสุดท้าย มองไม่เห็นจนกว่าจะคลิก ---- */
    .toolbox-drawer-toggle,
    .toolbox-drawer-toggle:hover,
    .toolbox-drawer-toggle:focus {
      display: block;
      width: 100%;
      height: 22px;
      margin: -10px 0 8px 0;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      box-shadow: none;
      cursor: default;
    }
    .toolbox-drawer {
      display: none;
    }
    .toolbox-drawer.open {
      display: block;
      animation: toolbox-drawer-in 0.18s ease;
    }
    @keyframes toolbox-drawer-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// ------------------------------------------------------------
// HTML เนื้อหาของ Dialog
// ใช้ data-toolbox-action / data-value / data-size แทน onclick
// เพราะ DialogV2 sanitize attribute onclick ทิ้ง
// ------------------------------------------------------------
const content = `
<div class="toolbox-dialog">
${buildMacroShortcutsHtml()}

  <div class="toolbox-group">
    <div class="toolbox-label">Token Image Toggle</div>
    <div class="toolbox-grid cols-1">
      <button type="button" class="toolbox-btn wide" data-toolbox-action="toggle-image">สลับรูป (ฮูด / จริง)</button>
    </div>
  </div>

  <div class="toolbox-group">
    <div class="toolbox-label">Standard Sizes</div>
    <div class="toolbox-grid cols-5">
      <button type="button" class="toolbox-btn" data-toolbox-action="resize" data-size="0.5">Tiny (0.5)</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="resize" data-size="0.8">Small (0.8)</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="resize" data-size="1">Medium (1)</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="resize" data-size="2">Large (2)</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="resize" data-size="3">Huge (3)</button>
    </div>
    <div class="toolbox-label" style="margin-top: 12px;">Custom Size</div>
    <div class="toolbox-size-row">
      <input type="number" min="0.1" step="any" placeholder="Gargantuan 4-13" data-toolbox-size-input>
      <button type="button" class="toolbox-btn accent" data-toolbox-size-apply>ปรับขนาด</button>
    </div>
  </div>

  <div class="toolbox-group">
    <div class="toolbox-label">Token Light</div>
    <div class="toolbox-light-row">
      <label class="toolbox-light-field">Bright
        <input type="number" min="0" step="5" value="20" data-toolbox-light-input="bright">
      </label>
      <label class="toolbox-light-field">Dim
        <input type="number" min="0" step="5" value="40" data-toolbox-light-input="dim">
      </label>
      <button type="button" class="toolbox-btn light" data-toolbox-light="apply">ใส่แสง</button>
    </div>
    <div class="toolbox-grid cols-5-wrap">
      <button type="button" class="toolbox-btn light" data-toolbox-light="preset" data-bright="5" data-dim="10">Candle</button>
      <button type="button" class="toolbox-btn light" data-toolbox-light="preset" data-bright="20" data-dim="40">Torch</button>
      <button type="button" class="toolbox-btn light" data-toolbox-light="preset" data-bright="30" data-dim="60">Lantern</button>
      <button type="button" class="toolbox-btn light" data-toolbox-light="preset" data-bright="60" data-dim="120">Daylight</button>
      <button type="button" class="toolbox-btn" data-toolbox-light="preset" data-bright="0" data-dim="0">ปิดไฟ</button>
    </div>
  </div>

  <div class="toolbox-group">
    <div class="toolbox-label">Combat Tools</div>
    <div class="toolbox-grid cols-2">
      <button type="button" class="toolbox-btn accent" data-toolbox-action="swap-init">สลับ Initiative</button>
      <button type="button" class="toolbox-btn accent" data-toolbox-action="clone-view">Clone View</button>
    </div>
  </div>

  <div class="toolbox-group">
    <div class="toolbox-label">Tier &amp; Legendary</div>
    <div class="toolbox-grid cols-2">
      <button type="button" class="toolbox-btn tier" data-toolbox-action="tier-selected" title="เลือกระดับตัวตนให้ token ที่เลือก">Tier: token ที่เลือก</button>
      <button type="button" class="toolbox-btn tier" data-toolbox-action="reserve-selected" title="ตั้งจำนวน LA / LR ให้ NPC ที่เลือก">LA/LR: token ที่เลือก</button>
      <button type="button" class="toolbox-btn tier" data-toolbox-action="tier-world" title="ดูตารางก่อน แล้วกดยืนยัน">เติม Tier ทั้งโลก</button>
      <button type="button" class="toolbox-btn tier" data-toolbox-action="reserve-world" title="ดูตารางก่อน แล้วกดยืนยัน">เติม LA/LR ทั้งโลก</button>
    </div>
  </div>

  <button type="button" class="toolbox-drawer-toggle" data-toolbox-drawer-toggle aria-label="Dice Tools"></button>

  <div class="toolbox-group toolbox-drawer" data-toolbox-drawer>
    <div class="toolbox-label">Dice Tools</div>
    <div class="toolbox-grid cols-2">
      <button type="button" class="toolbox-btn accent" data-toolbox-action="force-roll" data-value="max">หน้าสูงสุด</button>
      <button type="button" class="toolbox-btn accent" data-toolbox-action="force-roll" data-value="min">หน้าต่ำสุด</button>
    </div>
    <div class="toolbox-label" style="margin-top: 12px;">Specific Face (1-20)</div>
    <div class="toolbox-grid cols-5-wrap">
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="2">2</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="3">3</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="4">4</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="5">5</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="6">6</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="7">7</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="8">8</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="9">9</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="10">10</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="11">11</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="12">12</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="13">13</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="14">14</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="15">15</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="16">16</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="17">17</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="18">18</button>
      <button type="button" class="toolbox-btn" data-toolbox-action="force-roll" data-value="19">19</button>
    </div>
  </div>

</div>
`;

// ------------------------------------------------------------
// ผูก event ให้ปุ่มทั้งหมดหลัง render (ไม่พึ่ง onclick / window globals)
// ------------------------------------------------------------
function bindToolboxEvents(root) {
  root.querySelectorAll("[data-toolbox-action]").forEach((btn) => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      const action = btn.dataset.toolboxAction;
      switch (action) {
        case "toggle-image":
          await toggleTokenImage();
          break;
        case "resize":
          applyTokenSize(parseFloat(btn.dataset.size));
          break;
        case "swap-init":
          await swapInitiative();
          break;
        case "clone-view":
          triggerCloneView();
          break;
        case "force-roll":
          forceNextRoll(btn.dataset.value);
          break;
        case "tier-selected":
          await tierSelectedTokens();
          break;
        case "reserve-selected":
          await reserveSelectedTokens();
          break;
        case "tier-world":
          await tierWholeWorld();
          break;
        case "reserve-world":
          await reserveWholeWorld();
          break;
      }
    });
  });
}

// ------------------------------------------------------------
// แถบลับพับ/กางถาด Dice Tools
// แยกจาก bindToolboxEvents เพื่อไม่ไปยุ่งกับปุ่มเดิม
// onResize = ให้หน้าต่างปรับความสูงตามเนื้อหาหลังกาง/พับ
// ------------------------------------------------------------
function bindDrawerToggle(root, onResize) {
  const toggle = root.querySelector("[data-toolbox-drawer-toggle]");
  const drawer = root.querySelector("[data-toolbox-drawer]");
  if (!toggle || !drawer) return;

  toggle.addEventListener("click", (ev) => {
    ev.preventDefault();
    const open = drawer.classList.toggle("open");
    toggle.classList.toggle("open", open);
    onResize?.();
  });
}

// ------------------------------------------------------------
// Token Light: ช่องกรอก Bright / Dim + ปุ่ม preset
// แยกจาก bindToolboxEvents เพื่อไม่ไปยุ่งกับปุ่มเดิม
// กด Enter ในช่องกรอก = ใส่แสงเลย (และกันไม่ให้ Enter ไป submit/ปิด Dialog)
// ------------------------------------------------------------
function bindLightControls(root) {
  const brightInput = root.querySelector('[data-toolbox-light-input="bright"]');
  const dimInput = root.querySelector('[data-toolbox-light-input="dim"]');
  if (!brightInput || !dimInput) return;

  const applyFromInputs = () => applyTokenLight(brightInput.value, dimInput.value);

  root.querySelectorAll("[data-toolbox-light]").forEach((btn) => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      if (btn.dataset.toolboxLight === "preset") {
        // preset จะเติมค่าลงช่องกรอกด้วย จะได้เห็นว่าตอนนี้ตั้งไว้เท่าไร
        brightInput.value = btn.dataset.bright;
        dimInput.value = btn.dataset.dim;
      }
      await applyFromInputs();
    });
  });

  [brightInput, dimInput].forEach((input) => {
    input.addEventListener("keydown", async (ev) => {
      if (ev.key !== "Enter") return;
      ev.preventDefault();
      ev.stopPropagation();
      await applyFromInputs();
    });
  });
}

// ------------------------------------------------------------
// Custom Size: ช่องกรอกขนาด Token เอง (แทนปุ่ม Gargantuan 4-13 เดิม)
// กด Enter ในช่องกรอก = ปรับขนาดเลย (และกันไม่ให้ Enter ไป submit/ปิด Dialog)
// ------------------------------------------------------------
function bindCustomSize(root) {
  const input = root.querySelector("[data-toolbox-size-input]");
  const btn = root.querySelector("[data-toolbox-size-apply]");
  if (!input || !btn) return;

  const applyFromInput = () => {
    const size = parseFloat(input.value);
    if (!(size > 0)) return ui.notifications.warn("กรุณาใส่ขนาดเป็นตัวเลขมากกว่า 0");
    applyTokenSize(size);
  };

  btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    applyFromInput();
  });
  input.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter") return;
    ev.preventDefault();
    ev.stopPropagation();
    applyFromInput();
  });
}

// ------------------------------------------------------------
// Macro Shortcuts: ผูกปุ่มเปิด macro อื่น
// ------------------------------------------------------------
function bindMacroShortcuts(root) {
  root.querySelectorAll("[data-toolbox-macro]").forEach((btn) => {
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      await runMacroShortcut(btn.dataset.toolboxMacro);
    });
  });
}

// ------------------------------------------------------------
// UI: Dialog รวม
// ใช้ DialogV2 (core class ตั้งแต่ Foundry v13+) เพื่อให้ได้ปุ่ม
// "Detach Window" ของแท้จาก core โดยอัตโนมัติ เหมือน Actor Sheet
// ------------------------------------------------------------
const DialogV2 = foundry.applications?.api?.DialogV2;

// กาง/พับถาด Dice Tools = ปรับความสูงตามเนื้อหา
// แต่ถ้าผู้ใช้ลากขยายหน้าต่างเองแล้ว จะไม่ไปรีเซ็ตขนาดที่ลากไว้ (เนื้อหาเกินก็เลื่อน scroll ดูได้)
function autoHeightUnlessResized(windowEl, resize) {
  let userResized = false;
  windowEl?.querySelector(".window-resize-handle, .window-resizable-handle")
    ?.addEventListener("pointerdown", () => { userResized = true; });
  return () => { if (!userResized) resize(); };
}

if (DialogV2) {
  const app = new DialogV2({
    window: {
      title: "All-in-One Toolbox",
      icon: "fas fa-toolbox",
      // ลากมุมขวาล่างเพื่อขยาย/ย่อหน้าต่างได้อิสระ (แบบหน้าต่าง Party Manager)
      resizable: true
    },
    position: { width: 420, height: "auto" },
    content: content,
    buttons: [
      {
        action: "close",
        label: "ปิด",
        icon: "fas fa-xmark",
        default: true
      }
    ]
  });

  const hookName = `render${DialogV2.name}`;
  const hookId = Hooks.on(hookName, (renderedApp, htmlEl) => {
    if (renderedApp !== app) return;
    const root = htmlEl?.classList ? htmlEl : (htmlEl?.[0] ?? app.element);
    root?.classList?.add("custom-toolbox-dialog");
    injectToolboxStyle();
    bindToolboxEvents(root);
    bindDrawerToggle(root, autoHeightUnlessResized(app.element ?? root, () => app.setPosition({ height: "auto" })));
    bindLightControls(root);
    bindCustomSize(root);
    bindMacroShortcuts(root);
  });

  Hooks.once(`close${DialogV2.name}`, (closedApp) => {
    if (closedApp !== app) return;
    Hooks.off(hookName, hookId);
  });

  app.render(true);

} else {
  // ---- ทางสำรอง: Foundry เวอร์ชันเก่ากว่า v13 ไม่มี DialogV2 ----
  ui.notifications.warn("ไม่พบ DialogV2 (ต้องการ Foundry v13+) จึงใช้ Dialog แบบเดิม ซึ่งจะไม่มีปุ่ม Detach Window");

  const d = new Dialog({
    title: "All-in-One Toolbox",
    content: content,
    buttons: {},
    render: (html) => {
      const root = html[0] ?? html;
      html.closest(".app").addClass("custom-toolbox-dialog");
      injectToolboxStyle();
      bindToolboxEvents(root);
      bindDrawerToggle(root, autoHeightUnlessResized(html.closest(".app")[0], () => d.setPosition({ height: "auto" })));
      bindLightControls(root);
      bindCustomSize(root);
      bindMacroShortcuts(root);
    }
  }, {
    width: 420,
    resizable: true
  });

  d.render(true);
}
