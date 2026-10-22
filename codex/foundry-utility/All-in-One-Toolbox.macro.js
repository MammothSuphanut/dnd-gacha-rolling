// ============================================================
// Macro รวม: All-in-One Toolbox
// รวมฟังก์ชันไว้ใน Modal เดียว:
// 1. Token Image Toggle (สลับรูปฮูด/รูปจริง)
// 2. Token Size Resizer
// 3. Swap Initiative
// 4. Trigger Clone View (Lock View module)
// 5. Dice Tools: บังคับหน้าสูงสุด / ต่ำสุด / เจาะจง (1-20)
//    (ซ่อนไว้ในถาดพับได้ กดลูกศรใต้ Combat Tools เพื่อเปิด/ปิด)
// 6. Token Light: ตั้ง Bright / Dim light ให้ Token ที่เลือก
// 7. Macro Shortcuts: ปุ่มเปิด macro อื่น (Sound Board, Encounter Table Directory ฯลฯ)
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
    .toolbox-btn.gargantuan {
      background: #191c33;
      border-color: #2b3766;
      color: #9db3ff;
      font-size: 11px;
      padding: 8px 2px;
    }
    .toolbox-btn.gargantuan:hover {
      background: #212a4c;
      border-color: #4a5da3;
      color: #ffffff;
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

    /* ---- ลูกศรพับ/กางถาด Dice Tools ---- */
    .toolbox-drawer-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 22px;
      margin: -10px 0 8px 0;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 6px;
      color: #8f8dab;
      font-size: 13px;
      cursor: pointer;
      box-shadow: none;
      transition: color 0.12s ease, background 0.12s ease;
    }
    .toolbox-drawer-toggle:hover {
      background: #1d1c2e;
      color: #ffffff;
      box-shadow: none;
    }
    .toolbox-drawer-toggle i {
      margin: 0;
      transition: transform 0.18s ease;
    }
    .toolbox-drawer-toggle.open i {
      transform: rotate(180deg);
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
    <div class="toolbox-label" style="margin-top: 12px;">Gargantuan Sizes</div>
    <div class="toolbox-grid cols-5-wrap">
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="4">G (4)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="5">G (5)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="6">G (6)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="7">G (7)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="8">G (8)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="9">G (9)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="10">G (10)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="11">G (11)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="12">G (12)</button>
      <button type="button" class="toolbox-btn gargantuan" data-toolbox-action="resize" data-size="13">G (13)</button>
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

  <button type="button" class="toolbox-drawer-toggle" data-toolbox-drawer-toggle title="เปิด/ปิด Dice Tools">
    <i class="fas fa-chevron-down"></i>
  </button>

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
      }
    });
  });
}

// ------------------------------------------------------------
// ลูกศรพับ/กางถาด Dice Tools
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

if (DialogV2) {
  const app = new DialogV2({
    window: {
      title: "All-in-One Toolbox",
      icon: "fas fa-toolbox"
    },
    position: { width: 420 },
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
    bindDrawerToggle(root, () => app.setPosition({ height: "auto" }));
    bindLightControls(root);
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
      bindDrawerToggle(root, () => d.setPosition({ height: "auto" }));
      bindLightControls(root);
      bindMacroShortcuts(root);
    }
  }, {
    width: 420
  });

  d.render(true);
}
