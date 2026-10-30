/* ==========================================================================
   Mammoth Tweaks — small toggleable fixes for this table.
   Each fix has its own on/off switch in Configure Settings → Mammoth Tweaks.
   ========================================================================== */

const MODULE_ID = "mammoth-tweaks";

Hooks.once("init", () => {
  registerTokenBarFix();
  registerPhbTravelPace();
  registerTierGap();
  registerNoteAnchor();
  registerHandOrder();
  registerPlayerNameFit();
});

/* --------------------------------------------------------------------------
   Player list: long names no longer hide the raised hand
   Core cuts .player-name with "…", and raise-my-hand appends its ✋ inside
   that same span, so a long "Player [Character]" pushes the hand (and the
   queue number) out of sight. This wraps the name text in its own span; the
   CSS (body.mammoth-player-name-fit) then cuts only that text and keeps the
   ✋ + number at the end. The full name is still in the hover tooltip.
   -------------------------------------------------------------------------- */
function registerPlayerNameFit() {
  const key = "playerNameFit";
  game.settings.register(MODULE_ID, key, {
    name: "Player list: keep raised hand visible on long names",
    hint: "Shortens a long player/character name with … so the ✋ and its queue number always fit in the player list.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => document.body.classList.toggle("mammoth-player-name-fit", value)
  });
  document.body.classList.toggle("mammoth-player-name-fit", game.settings.get(MODULE_ID, key));
  Hooks.on("renderPlayers", (app, html) => {
    const root = html instanceof HTMLElement ? html : html?.[0];
    for ( const name of root?.querySelectorAll(".player-name") ?? [] ) {
      const text = [...name.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if ( !text ) continue;
      const label = Object.assign(document.createElement("span"), { className: "mammoth-name-text" });
      text.replaceWith(label);
      label.append(text);
    }
  });
}

/* --------------------------------------------------------------------------
   Raise My Hand: queue number next to each raised hand
   raise-my-hand only puts a ✋ (.raise-my-hand-indicator) after the player's
   name. This watches the player list and adds 1, 2, 3… after each hand in the
   order the hands went up; lowering a hand moves everyone behind it up one.
   The order is kept per client, from when each ✋ appeared on that screen,
   so a client that reloads starts a fresh queue (raise-my-hand drops its
   icons on reload too).
   -------------------------------------------------------------------------- */
const handQueue = [];
let handObserved = null;

function registerHandOrder() {
  const key = "handOrder";
  game.settings.register(MODULE_ID, key, {
    name: "Raise My Hand: show queue number",
    hint: "Adds 1, 2, 3… next to each raised hand in the player list, in the order the hands went up.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => syncHandOrder()
  });
  if ( !game.modules.get("raise-my-hand")?.active ) return;

  const observer = new MutationObserver(() => syncHandOrder());
  const watch = root => {
    if ( !root || root === handObserved ) return syncHandOrder();
    observer.disconnect();
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    handObserved = root;
    syncHandOrder();
  };
  Hooks.on("renderPlayers", (app, html) => watch(html instanceof HTMLElement ? html : html?.[0]));
  Hooks.once("ready", () => watch(ui.players?.element));
}

function syncHandOrder() {
  if ( !handObserved ) return;
  const icons = [...handObserved.querySelectorAll(".raise-my-hand-indicator:not(.fade-out)")];
  const raised = icons.map(icon => icon.dataset.userId);

  // Drop lowered hands, then append new ones in the order they appeared
  for ( let i = handQueue.length - 1; i >= 0; i-- ) {
    if ( !raised.includes(handQueue[i]) ) handQueue.splice(i, 1);
  }
  for ( const id of raised ) if ( !handQueue.includes(id) ) handQueue.push(id);

  const show = game.settings.get(MODULE_ID, "handOrder");
  for ( const badge of handObserved.querySelectorAll(".mammoth-hand-order") ) {
    const icon = badge.previousElementSibling;
    if ( !show || !icon?.matches(".raise-my-hand-indicator:not(.fade-out)") ) badge.remove();
  }
  if ( !show ) return;
  for ( const icon of icons ) {
    const number = String(handQueue.indexOf(icon.dataset.userId) + 1);
    let badge = icon.nextElementSibling;
    if ( !badge?.matches(".mammoth-hand-order") ) {
      badge = Object.assign(document.createElement("span"), { className: "mammoth-hand-order" });
      icon.after(badge);
    }
    if ( badge.textContent !== number ) badge.textContent = number;
  }
}

/* --------------------------------------------------------------------------
   Map pins open at a heading
   Core notes only remember a journal page. A note with
   flags["mammoth-tweaks"].anchor (a page TOC slug) also scrolls the page to
   that heading on double-click — e.g. room "6d. Sleeping Quarters" on a map.
   -------------------------------------------------------------------------- */
function registerNoteAnchor() {
  const key = "noteAnchor";
  game.settings.register(MODULE_ID, key, {
    name: "Map pins: open at the room's heading",
    hint: "Double-clicking a map pin that remembers a heading (set by the Link-Gilded-City-Pins macro) scrolls its journal page straight to that heading.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  Hooks.on("activateNote", (note, options) => {
    if ( !game.settings.get(MODULE_ID, key) ) return;
    const anchor = note.document.getFlag(MODULE_ID, "anchor");
    if ( anchor && options.pageId ) options.anchor = anchor;
  });
}

/* --------------------------------------------------------------------------
   Monk's TokenBar request-roll card fix
   The CSS lives in css/mammoth-tweaks.css, scoped under body.mammoth-tokenbar-fix,
   so the switch just adds or removes that class (no reload needed).
   -------------------------------------------------------------------------- */
function registerTokenBarFix() {
  const key = "tokenBarFix";
  game.settings.register(MODULE_ID, key, {
    name: "Monk's TokenBar: fix request-roll result box",
    hint: "Stops the roll total (e.g. \"11\") from wrapping to \"1\" and the ✓ ✗ buttons from overlapping it on the Request Roll card.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => document.body.classList.toggle("mammoth-tokenbar-fix", value)
  });
  document.body.classList.toggle("mammoth-tokenbar-fix", game.settings.get(MODULE_ID, key));
}

/* --------------------------------------------------------------------------
   PHB travel pace on the ruler's travel-time label
   custom-dnd5e's "ruler travel time" uses exact feet-per-minute (Fast 400 /
   Normal 300 / Slow 200 ft/min = 3.41 mph Normal → 27.3 mi per 8-hour day).
   The PHB travel pace table rounds to 4 / 3 / 2 mph (Normal 24 mi per day),
   so its labels ran ~14% faster than the table. This recomputes the times at
   the PHB rates: every pace × 0.88 (264 / 300).
   Only does anything when custom-dnd5e's travel-time label is turned on.
   -------------------------------------------------------------------------- */
const PHB_PACE_FACTOR = 264 / 300; // 3 mph = 264 ft/min
const BASE_FPM = [400, 300, 200];  // custom-dnd5e Fast / Normal / Slow
const SPEED_MULTIPLIERS = [4 / 3, 1, 2 / 3];
const ACTION_SPEED_MAP = { walk: "walk", fly: "fly", swim: "swim", burrow: "burrow", climb: "climb", crawl: "walk", jump: "walk" };

let hoveredTokenId = null;

function registerPhbTravelPace() {
  const key = "phbTravelPace";
  game.settings.register(MODULE_ID, key, {
    name: "Ruler travel time: use PHB pace (24 mi/day)",
    hint: "Recomputes custom-dnd5e's ruler travel-time label at the PHB rates — Fast 4 / Normal 3 / Slow 2 mph, 8-hour days (30 / 24 / 18 mi per day). Off = custom-dnd5e's own figures.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });
  if (!game.settings.get(MODULE_ID, key)) return;
  if (!globalThis.libWrapper) return console.warn(`${MODULE_ID} | libWrapper not active — PHB travel pace skipped.`);

  Hooks.on("hoverToken", (token, hovered) => { if (hovered) hoveredTokenId = token.id; });

  libWrapper.register(MODULE_ID, "CONFIG.Canvas.rulerClass.prototype._getWaypointLabelContext", function (wrapped, waypoint, state) {
    const context = wrapped(waypoint, state);
    if (!context) return context;

    // libWrapper doesn't fix the order between us and custom-dnd5e, so handle both:
    // if it already wrote travelTime we correct it now, and if it writes it after us
    // the setter corrects it then.
    let travelTime = context.travelTime;
    Object.defineProperty(context, "travelTime", {
      configurable: true,
      enumerable: true,
      get: () => travelTime,
      set: value => { travelTime = phbTravelTime(value, waypoint); }
    });
    if (travelTime) context.travelTime = travelTime;
    return context;
  }, "WRAPPER");
}

function phbTravelTime(travelTime, waypoint) {
  if (!travelTime?.paces?.length) return travelTime;
  const distance = waypoint.measurement?.distance;
  if (!distance || distance <= 0) return travelTime;

  const units = canvas.grid.units?.toLowerCase();
  const distanceFeet = ["mi", "mi.", "miles"].includes(units) ? distance * 5280 : distance;

  const tokenFpm = getTokenFpm(waypoint);
  const paces = travelTime.paces.map((pace, i) => {
    const fpm = (tokenFpm ? tokenFpm * SPEED_MULTIPLIERS[i] : BASE_FPM[i]) * PHB_PACE_FACTOR;
    return { ...pace, time: formatTime(distanceFeet / fpm) };
  });
  return { ...travelTime, paces };
}

// Same token lookup as custom-dnd5e: the hovered token, if the measurement starts on it
function getTokenFpm(waypoint) {
  const token = hoveredTokenId ? canvas.tokens.get(hoveredTokenId) : null;
  if (!token) return null;
  let first = waypoint;
  while (first.previous) first = first.previous;
  if (!token.bounds.contains(first.x, first.y)) return null;

  const speeds = token.actor?.system?.attributes?.movement?.speeds;
  if (!speeds) return null;
  const action = token.document?.movementAction || "walk";
  if (["blink", "displace"].includes(action)) return null;

  let speed = speeds[ACTION_SPEED_MAP[action] || "walk"] || speeds.walk || 0;
  if (["crawl", "jump"].includes(action)) speed /= 2;
  if (action === "climb" && !speeds.climb) speed = (speeds.walk || 0) / 2;
  return speed > 0 ? speed * 10 : null;
}

// Same format as custom-dnd5e: 8-hour travel days ("24d 5h")
function formatTime(totalMinutes) {
  if (totalMinutes < 1) return `${Math.round(totalMinutes * 60)} sec`;
  const days = Math.floor(totalMinutes / 480);
  const rest = totalMinutes - days * 480;
  const hours = Math.floor(rest / 60);
  const minutes = Math.round(rest % 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 && days === 0) parts.push(`${minutes}m`);
  return parts.join(" ") || "< 1m";
}

/* --------------------------------------------------------------------------
   Tier of Being: automatic Tier Gap bonus
   House rule (codex/Core-Rules/astral-nexus-lore.md): a creature gets +5 per tier
   it is above the other creature on every d20 Test that involves it, and +5 AC per
   tier against that creature's attacks. Apart from that AC, the lower side's rolls
   are unchanged. Tier is read from the "<Tier> Being" feature, then from "Tier of Being:
   <Tier>" in a feature's description, then flags.world.tierOfBeing; no tier = Mortal.
   Covered:
   - Attack rolls against the targeted token(s): +5 per tier if the attacker is above
     every target, or -5 per tier if it is below every target (the higher side's AC
     bonus, applied to the roll so dnd5e and Midi-QOL both compare it to the real AC).
     Mixed targets (some above, some below) get nothing. Smallest gap counts.
   - Saves and checks rolled from a chat card's button: the other side is whoever
     posted that card (dnd5e stores it as the roll message's system.origin).
   - Saves and checks Midi-QOL rolls for its workflow: the other side owns the
     item in config.midiOptions.saveActivityUuid / saveItemUuid.
   Rolls with no known opponent (a plain sheet roll, concentration) are left alone.
   -------------------------------------------------------------------------- */
const TIERS = ["Mortal", "Ascendant", "Divine", "Sovereign", "Law"];
const TIER_BONUS = 5;
const TIER_PATTERN = TIERS.join("|");

function registerTierGap() {
  const key = "tierGap";
  game.settings.register(MODULE_ID, key, {
    name: "Tier of Being: add Tier Gap bonus automatically",
    hint: "+5 per tier of difference on attacks against a lower-tier target and on saves/checks against a lower-tier creature's chat card; -5 per tier on attacks against a higher-tier target (its AC bonus).",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  Hooks.on("dnd5e.preRollD20TestV2", (config, dialog, message) => {
    if (!game.settings.get(MODULE_ID, key)) return;
    const subject = config.subject;
    const actor = subject instanceof Actor ? subject : subject?.actor;
    if (!actor) return;
    const isAttack = config.hookNames?.includes("attack");
    const opponents = isAttack ? targetActors() : [originActor(config, message)].filter(Boolean);
    if (!opponents.length) return;

    // Tiers this roller is above (+) or below (-) each opponent
    const mine = tierIndex(actor);
    const gaps = opponents.map(o => mine - tierIndex(o));
    let modifier = 0;
    if (gaps.every(g => g > 0)) modifier = Math.min(...gaps) * TIER_BONUS;
    else if (isAttack && gaps.every(g => g < 0)) modifier = Math.max(...gaps) * TIER_BONUS;
    if (!modifier) return;

    const roll = config.rolls?.[0];
    if (!roll) return;
    roll.parts ??= [];
    roll.data ??= {};
    roll.parts.push("@tierGap");
    roll.data.tierGap = modifier;
  });
}

// Base tier plus flags.world.tierBoost, a temporary change set by an Active Effect
// (e.g. Fragment of Zenith's "+1 Tier"), kept within Mortal..Law
function tierIndex(actor) {
  const boost = Number(foundry.utils.getProperty(actor, "flags.world.tierBoost")) || 0;
  return Math.clamp(baseTierIndex(actor) + boost, 0, TIERS.length - 1);
}

function baseTierIndex(actor) {
  for (const item of actor.items) {
    const name = item.name.match(new RegExp(`^(${TIER_PATTERN}) Being$`, "i"));
    if (name) return TIERS.findIndex(t => t.toLowerCase() === name[1].toLowerCase());
  }
  for (const item of actor.items) {
    const desc = (item.system.description?.value ?? "").match(new RegExp(`Tier of Being:\s*(${TIER_PATTERN})`, "i"));
    if (desc) return TIERS.findIndex(t => t.toLowerCase() === desc[1].toLowerCase());
  }
  return Math.max(0, TIERS.indexOf(actor.getFlag("world", "tierOfBeing")));
}

function targetActors() {
  return [...game.user.targets].map(t => t.actor).filter(Boolean);
}

// The actor whose effect forced this save/check: Midi-QOL's workflow item, or whoever
// posted the chat card whose save/check button was clicked
function originActor(config, message) {
  const midiUuid = config.midiOptions?.saveActivityUuid ?? config.midiOptions?.saveItemUuid;
  const midiSource = midiUuid ? fromUuidSync(midiUuid) : null;
  if (midiSource?.actor) return midiSource.actor;
  const originId = message?.data?.system?.origin;
  const origin = originId ? game.messages.get(originId) : null;
  return origin ? ChatMessage.getSpeakerActor(origin.speaker) : null;
}
