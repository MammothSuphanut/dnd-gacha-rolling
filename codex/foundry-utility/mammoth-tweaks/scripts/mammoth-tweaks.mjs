/* ==========================================================================
   Mammoth Tweaks — small toggleable fixes for this table.
   Each fix has its own on/off switch in Configure Settings → Mammoth Tweaks.
   ========================================================================== */

const MODULE_ID = "mammoth-tweaks";

Hooks.once("init", () => {
  registerTokenBarFix();
  registerPhbTravelPace();
});

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
