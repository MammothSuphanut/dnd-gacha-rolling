// ════════════════════════════════════════════════════════════
//  PARTY CONFIG — แก้ตรงนี้อย่างเดียวเมื่อย้าย macro
// ════════════════════════════════════════════════════════════
const PARTY_CONFIG = {
  key:        "W",
  partyActor: "Actor.IJVSvl59VHEh22Kb",
  members: [
      "Actor.GSRrcF6EM5TFXRP2",
      "Actor.uHgQkvkLlrGK6efG",
      "Actor.Ryys62HAAsPQDaiv",
      "Actor.Sjg9P1KUqgLmGyNc",
      "Actor.n4QXcSa3Z1NI8noP",
      "Actor.dZ5rZKrGG3oJU8Zj",
      "Actor.6F22y5vRbbDhHYFw"
  ],
};
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
//  CALENDAR CONFIG — วันเริ่มต้นที่ "Day 1" ชี้ถึง (แก้ตรงนี้ที่เดียว)
//  ปฏิทิน: 12 เดือน เดือนละ 4 สัปดาห์ (28 วัน) เท่ากันทุกเดือน = 336 วัน/ปี
// ════════════════════════════════════════════════════════════
const CALENDAR_CONFIG = {
  startDay:     1,     // 1-28
  startMonth:   1,     // 1-12
  startYear:    935,
  eraSuffix:    "PD",  // ต่อท้ายปี เช่น "835 PD" — ใส่ "" ถ้าไม่ต้องการ
  startWeekday: 0,      // วันในสัปดาห์ของ Day 1: 0=จันทร์ 1=อังคาร 2=พุธ 3=พฤหัสบดี 4=ศุกร์ 5=เสาร์ 6=อาทิตย์
};
// PD = Post-Divergence
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
//  JOURNAL CONFIG — UUID ของ Adventure Journal (แก้ตรงนี้ที่เดียว)
// ════════════════════════════════════════════════════════════
const JOURNAL_CONFIG = {
  uuid: "JournalEntry.GwByhz0P0I38YmBO",
};
// ════════════════════════════════════════════════════════════

// ── helper: escape ค่าที่จะใส่ใน HTML attribute ────────────────
function _escapeAttr(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── โหลดข้อมูล actor ────────────────────────────────────────
async function _loadActorData(uuids) {
  const list = [];
  for (const uuid of uuids) {
    const a = await fromUuid(uuid);
    if (!a) continue;
    list.push(_extractActorData(a, uuid));
  }
  return list;
}

function _extractActorData(a, uuid) {
  const hp    = a.system.attributes.hp;
  const hdVal = a.system.attributes.hd?.value ?? 0;
  const hdMax = a.system.attributes.hd?.max   ?? 0;
  return {
    uuid: uuid ?? a.uuid,
    name: a.name,
    img: a.img,
    hp: hp.value,
    hpMax: hp.effectiveMax ?? hp.max,
    temp: hp.temp ?? 0,
    hd: hdVal,
    hdMax,
  };
}

async function _refreshRow(root, uuid) {
  const a = await fromUuid(uuid);
  if (!a) return;
  const m = _extractActorData(a, uuid);
  const row = root.querySelector(`tr[data-uuid="${uuid}"]`);
  if (!row) return;

  const hpPct   = m.hpMax > 0 ? Math.round((m.hp / m.hpMax) * 100) : 0;
  const hpColor = hpPct > 50 ? "#4caf50" : hpPct > 25 ? "#ff9800" : "#f44336";
  const hpBar   = row.querySelector(".hp-bar-fill");
  const hpInput = row.querySelector(".hp-input");
  if (hpBar)   { hpBar.style.width = hpPct + "%"; hpBar.style.background = hpColor; }
  if (hpInput) { hpInput.value = m.hp; hpInput.dataset.max = m.hpMax; }
  const hpLabel = row.querySelector(".hp-label");
  if (hpLabel) hpLabel.textContent = `/${m.hpMax}`;

  const tempInput = row.querySelector(".temp-input");
  if (tempInput) tempInput.value = m.temp;

  const hdInput = row.querySelector(".hd-input");
  const hdLabel = row.querySelector(".hd-label");
  if (hdInput) { hdInput.value = m.hd; hdInput.dataset.max = m.hdMax; }
  if (hdLabel) hdLabel.textContent = `/${m.hdMax}`;
}

function _buildTable(members) {
  const inputStyle = `
    width:38px;text-align:center;background:#1a1a2e;border:1px solid #555;
    border-radius:3px;color:#fff;font-size:13px;padding:1px 2px;
    -moz-appearance:textfield;`;

  // Foundry ใส่ width:100% ให้ button เป็นค่า default → ต้องล็อกขนาดเอง ไม่งั้นปุ่มจะเรียงลงแนวตั้ง
  const orderBtnStyle = `
    flex:0 0 20px;width:20px;min-width:20px;max-width:20px;margin:0;
    height:20px;padding:0;font-size:10px;line-height:1;cursor:pointer;
    border-radius:3px;border:1px solid #666;background:#333;color:#ccc;`;

  const rows = members.map((m, i) => {
    const hpPct   = m.hpMax > 0 ? Math.round((m.hp / m.hpMax) * 100) : 0;
    const hpColor = hpPct > 50 ? "#4caf50" : hpPct > 25 ? "#ff9800" : "#f44336";
    return `
    <tr data-uuid="${m.uuid}">
      <td style="padding:4px 6px;white-space:nowrap;">
        <div style="display:flex;align-items:center;gap:6px;">
          <img src="${m.img}" alt=""
            style="width:28px;height:28px;object-fit:cover;border-radius:4px;border:1px solid #555;flex-shrink:0;">
          <span class="actor-name-link" data-uuid="${m.uuid}"
            style="font-size:13px;cursor:pointer;text-decoration:underline dotted #666;transition:color .15s;"
            title="เปิด ${m.name} Sheet">${m.name}</span>
        </div>
      </td>
      <td style="padding:4px 6px;min-width:150px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="hp" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">−</button>
          <div style="position:relative;flex:1;min-width:60px;">
            <div style="height:20px;background:#222;border-radius:3px;overflow:hidden;">
              <div class="hp-bar-fill" style="width:${hpPct}%;height:100%;background:${hpColor};transition:width .25s;"></div>
            </div>
            <div style="position:absolute;top:0;left:0;width:100%;display:flex;align-items:center;
                        justify-content:center;gap:1px;height:20px;">
              <input type="text" class="hp-input" value="${m.hp}"
                data-uuid="${m.uuid}" data-max="${m.hpMax}"
                style="${inputStyle}width:34px;background:transparent;border:none;color:#fff;
                       font-size:12px;text-shadow:0 0 4px #000;">
              <span class="hp-label" style="font-size:12px;color:#ddd;text-shadow:0 0 4px #000;">/${m.hpMax}</span>
            </div>
          </div>
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="hp" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;min-width:90px;">
        <div style="display:flex;align-items:center;gap:4px;justify-content:center;">
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="temp" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">−</button>
          <input type="number" class="temp-input" value="${m.temp}"
            data-uuid="${m.uuid}" min="0"
            style="${inputStyle}color:#7ec8e3;">
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="temp" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;min-width:90px;">
        <div style="display:flex;align-items:center;gap:4px;justify-content:center;">
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="hd" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">−</button>
          <input type="number" class="hd-input" value="${m.hd}"
            data-uuid="${m.uuid}" data-max="${m.hdMax}"
            min="0" max="${m.hdMax}"
            style="${inputStyle}color:#ce9eff;">
          <span class="hd-label" style="font-size:13px;color:#ce9eff;">/${m.hdMax}</span>
          <button class="adj-btn" data-uuid="${m.uuid}" data-field="hd" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;white-space:nowrap;width:1%;">
        <div style="display:flex;flex-direction:row;flex-wrap:nowrap;gap:3px;justify-content:center;align-items:center;">
        <button class="order-btn" data-uuid="${m.uuid}" data-move="-1" title="เลื่อนขึ้น" ${i === 0 ? "disabled" : ""}
          style="${orderBtnStyle}${i === 0 ? "opacity:.3;cursor:default;" : ""}">▲</button>
        <button class="order-btn" data-uuid="${m.uuid}" data-move="1" title="เลื่อนลง" ${i === members.length - 1 ? "disabled" : ""}
          style="${orderBtnStyle}${i === members.length - 1 ? "opacity:.3;cursor:default;" : ""}">▼</button>
        <button class="remove-member-btn" data-uuid="${m.uuid}" title="เอาออกจากเมนู (กด Sync เพื่อดึงกลับ)"
          style="${orderBtnStyle}border-color:#a33;background:#2a1a1a;color:#f88;">✕</button>
        </div>
      </td>
    </tr>`;
  }).join("");

  return `
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr style="border-bottom:1px solid #444;">
        <th style="padding:4px 6px;text-align:left;font-size:12px;color:#aaa;font-weight:normal;">ชื่อ</th>
        <th style="padding:4px 6px;text-align:center;font-size:12px;color:#aaa;font-weight:normal;">HP</th>
        <th style="padding:4px 6px;text-align:center;font-size:12px;color:#7ec8e3;font-weight:normal;">Temp HP</th>
        <th style="padding:4px 6px;text-align:center;font-size:12px;color:#ce9eff;font-weight:normal;">Hit Dice</th>
        <th style="padding:4px 6px;text-align:center;font-size:12px;color:#aaa;font-weight:normal;">ลำดับ</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

// ── แปลง Day counter ของ party (ตัวเลขล้วน ไม่แตะ world clock จริง) ──
// ปฏิทิน: 12 เดือน เดือนละ 4 สัปดาห์ (28 วัน) เท่ากันทุกเดือน = 336 วัน/ปี
const _DAYS_PER_MONTH  = 28;
const _MONTHS_PER_YEAR = 12;
const _DAYS_PER_YEAR   = _DAYS_PER_MONTH * _MONTHS_PER_YEAR; // 336

// Seasons (4 seasons based on month, meteorological, northern hemisphere)
function _getSeasonName(month) {
  if (month === 12 || month === 1 || month === 2) return "Winter";
  if (month >= 3 && month <= 5)  return "Spring";
  if (month >= 6 && month <= 8)  return "Summer";
  return "Autumn"; // 9,10,11
}

// ชื่อวันแบบแฟนตาซี อิงอักษรนำจากชื่อวันภาษาอังกฤษ (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
// index อิงตาม CALENDAR_CONFIG.startWeekday (0=Monday)
const _WEEKDAY_NAMES = ["Monvael", "Tuenor", "Wedrin", "Thurask", "Frivane", "Sathir", "Sunmere"];

// เลขลำดับแบบอังกฤษ: 1st, 2nd, 3rd, 4th, ... 11th-13th เป็น "th" เสมอ
function _ordinal(n) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function _formatCalendarDate(dayCount) {
  const n = parseInt(dayCount);
  if (isNaN(n)) return null;

  // Day 1 = วันเริ่มต้นเป๊ะๆ (CALENDAR_CONFIG.startDay/startMonth/startYear)
  const offset =
    Math.max(0, n - 1) +
    (CALENDAR_CONFIG.startDay - 1) +
    (CALENDAR_CONFIG.startMonth - 1) * _DAYS_PER_MONTH;

  const year      = CALENDAR_CONFIG.startYear + Math.floor(offset / _DAYS_PER_YEAR);
  const remaining = offset % _DAYS_PER_YEAR;
  const month     = Math.floor(remaining / _DAYS_PER_MONTH) + 1;
  const day       = (remaining % _DAYS_PER_MONTH) + 1;

  // 28 วัน/เดือน หารด้วย 7 ลงตัว → ทุกเดือนขึ้นต้นวันเดียวกันในสัปดาห์เสมอ
  const weekdayIdx  = ((offset + CALENDAR_CONFIG.startWeekday) % 7 + 7) % 7;
  const weekdayName = _WEEKDAY_NAMES[weekdayIdx];

  return { day, dayOrdinal: _ordinal(day), month, year, season: _getSeasonName(month), weekday: weekdayName };
}

function _buildContent(members, grp, noteValue, dayValue, timeValue) {
  return `
  <style>
    .adj-btn:hover  { background: #555 !important; }
    .rest-btn:hover { filter: brightness(1.2); }
    .actor-name-link:hover { color: #c9a227 !important; }
    .order-btn:not([disabled]):hover, .remove-member-btn:hover { filter: brightness(1.4); }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  </style>

  <div style="display:flex;align-items:center;border-bottom:1px solid #444;margin-bottom:10px;padding-bottom:6px;">
    <span style="flex:1;font-size:14px;color:#c9a227;font-weight:bold;">⚔️ Party ${grp}</span>
    <div style="display:flex;gap:4px;">
      <button id="sync-members" class="rest-btn" title="ดึงรายชื่อสมาชิกล่าสุดจาก Party Actor"
        style="padding:5px 12px;background:#2a2a1a;border:1px solid #c9a227;color:#c9a227;
               border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap;">
        🔄 Sync Members
      </button>
      <button id="open-party-sheet" class="rest-btn"
        style="padding:5px 12px;background:#1a1a2a;border:1px solid #7986cb;color:#7986cb;
               border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap;">
        📋 Party Sheet
      </button>
      <button id="place-party" class="rest-btn"
        style="padding:5px 12px;background:#1a2a1a;border:1px solid #4caf50;color:#4caf50;
               border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap;">
        🗺️ Place Party
      </button>
    </div>
  </div>

  ${_buildTable(members)}

  <div style="margin-top:10px;">
    <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">📅 Day/Time — Party ${grp}</label>
    <div style="display:flex;gap:6px;align-items:center;">
      <button id="day-sub" class="rest-btn"
        style="width:24px;height:26px;padding:0;font-size:14px;line-height:1;cursor:pointer;
               border-radius:4px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">−</button>
      <input type="number" id="party-day" value="${_escapeAttr(dayValue)}" min="0"
        title="Day"
        style="width:52px;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;
               border-radius:4px;color:#ddd;padding:5px 2px;font-size:13px;text-align:center;
               font-family:inherit;-moz-appearance:textfield;flex-shrink:0;">
      <button id="day-add" class="rest-btn"
        style="width:24px;height:26px;padding:0;font-size:14px;line-height:1;cursor:pointer;
               border-radius:4px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">+</button>
      <input type="text" id="party-time" value="${_escapeAttr(timeValue)}"
        placeholder="Time เช่น 5.00" title="Time"
        style="width:64px;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;
               border-radius:4px;color:#ddd;padding:5px;font-size:13px;text-align:center;
               font-family:inherit;flex-shrink:0;">
      <span id="calendar-preview"
        style="flex:1;font-size:13px;color:#c9a227;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></span>
      <button id="open-journal-link" class="rest-btn"
        style="padding:5px 14px;background:#1a2a3a;border:1px solid #2196f3;color:#2196f3;
               border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap;flex-shrink:0;">📖 Open Adventure Journal</button>
    </div>
  </div>

  <div style="margin-top:10px;">
    <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">📝 Note — Party ${grp}</label>
    <textarea id="party-note" rows="3"
      style="width:100%;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;
             border-radius:4px;color:#ddd;padding:6px;font-size:12px;resize:vertical;font-family:inherit;"
      placeholder="บันทึกสำหรับ Party ${grp}...">${noteValue}</textarea>
  </div>

  <hr style="border-color:#333;margin:10px 0;">

  <div style="display:flex;gap:6px;justify-content:center;align-items:center;margin-bottom:6px;">
    <button data-rest="short" class="rest-btn"
      style="padding:5px 14px;background:#1a3a1a;border:1px solid #4caf50;color:#4caf50;
             border-radius:4px;cursor:pointer;font-size:12px;">🍽️ Short Rest</button>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <span style="font-size:10px;color:#666;">Comfortable</span>
      <button data-rest="long" class="rest-btn"
        style="padding:5px 14px;background:#1a2a3a;border:1px solid #2196f3;color:#2196f3;
               border-radius:4px;cursor:pointer;font-size:12px;">⛺ Long Rest</button>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <span style="font-size:10px;color:#666;">Normal</span>
      <button data-rest="halfLong" class="rest-btn"
        style="padding:5px 14px;background:#3a1a2a;border:1px solid #e91e8c;color:#e91e8c;
               border-radius:4px;cursor:pointer;font-size:12px;">💗 Half Healing Long Rest</button>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <span style="font-size:10px;color:#666;">Strained</span>
      <button data-rest="zeroLong" class="rest-btn"
        style="padding:5px 14px;background:#1a1a3a;border:1px solid #9c27b0;color:#9c27b0;
               border-radius:4px;cursor:pointer;font-size:12px;">🌙 Zero Healing Long Rest</button>
    </div>
  </div>`;
}

async function _adjustField(uuid, field, delta) {
  const a = await fromUuid(uuid);
  if (!a) return false;
  if (field === "hp") {
    const hp  = a.system.attributes.hp;
    const max = hp.effectiveMax ?? hp.max;
    await a.update({ "system.attributes.hp.value": Math.min(max, Math.max(0, hp.value + delta)) });
    return true;
  }
  if (field === "temp") {
    await a.update({ "system.attributes.hp.temp": Math.max(0, (a.system.attributes.hp.temp ?? 0) + delta) });
    return true;
  }
  if (field === "hd") {
    const hd   = a.system.attributes.hd;
    const max  = hd?.max ?? 0;
    const next = Math.min(max, Math.max(0, (hd?.value ?? 0) + delta));
    const spent = max - next;
    const classItems = a.items.filter(i => i.type === "class");
    if (classItems.length) {
      let rem = spent;
      await a.updateEmbeddedDocuments("Item", classItems.map(cls => {
        const use = Math.min(cls.system.levels ?? 1, Math.max(0, rem));
        rem -= use;
        return { _id: cls.id, "system.hd.spent": use };
      }));
    }
    return true;
  }
  return false;
}

async function _setFieldDirect(uuid, field, rawValue) {
  const a = await fromUuid(uuid);
  if (!a) return false;
  if (field === "hp") {
    const str = String(rawValue).trim();
    const hp  = a.system.attributes.hp;
    const max = hp.effectiveMax ?? hp.max;
    if (str.startsWith("-")) {
      const dmg  = Math.abs(parseInt(str));
      const curT = hp.temp ?? 0;
      const abs  = Math.min(curT, dmg);
      await a.update({ "system.attributes.hp.value": Math.max(0, hp.value - (dmg - abs)), "system.attributes.hp.temp": curT - abs });
    } else if (str.startsWith("+")) {
      await a.update({ "system.attributes.hp.value": Math.min(max, hp.value + parseInt(str.slice(1))) });
    } else {
      await a.update({ "system.attributes.hp.value": Math.min(max, Math.max(0, parseInt(str))) });
    }
    return true;
  }
  if (field === "temp") {
    await a.update({ "system.attributes.hp.temp": Math.max(0, parseInt(rawValue)) });
    return true;
  }
  return false;
}

// ── Application ──────────────────────────────────────────────
const _GRP      = PARTY_CONFIG.key;
const _PUUID    = PARTY_CONFIG.partyActor;
const _APP_ID   = `party-manager-${_GRP}`;
const _SETTINGS_KEY = `partyNote_${_GRP}`;
const _DAY_KEY       = `partyDay_${_GRP}`;
const _TIME_KEY      = `partyTime_${_GRP}`;
const _MEMBERS_KEY   = `partyMembers_${_GRP}`;

if (!game.settings.settings.has(`world.${_MEMBERS_KEY}`)) {
  game.settings.register("world", _MEMBERS_KEY, {
    name: `Party ${_GRP} Members`, scope: "world", config: false, type: String, default: "",
  });
}

// รายชื่อสมาชิก: ใช้ค่าที่ Sync ไว้ล่าสุด (เก็บใน world setting) ถ้ายังไม่เคย Sync ใช้ PARTY_CONFIG.members
function _loadMemberList() {
  try {
    const saved = JSON.parse(game.settings.get("world", _MEMBERS_KEY) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (e) { /* ค่าเสีย ใช้ PARTY_CONFIG แทน */ }
  return [...PARTY_CONFIG.members];
}
let _MEMBERS = _loadMemberList();

// ดึง UUID สมาชิกจาก Party Actor (dnd5e group: system.members = [{ actor: Actor }])
function _readPartyMemberUuids(partyActor) {
  const raw = partyActor?.system?.members ?? [];
  const arr = Array.isArray(raw) ? raw : Array.from(raw?.values?.() ?? Object.values(raw));
  return arr.map(m => {
    const a = m?.actor ?? m;
    if (!a) return null;
    if (typeof a === "string") return a.includes(".") ? a : `Actor.${a}`;
    return a.uuid ?? (a.id ? `Actor.${a.id}` : null);
  }).filter(Boolean);
}

if (!game.settings.settings.has(`world.${_SETTINGS_KEY}`)) {
  game.settings.register("world", _SETTINGS_KEY, {
    name: `Party ${_GRP} Note`, scope: "world", config: false, type: String, default: "",
  });
}

if (!game.settings.settings.has(`world.${_DAY_KEY}`)) {
  game.settings.register("world", _DAY_KEY, {
    name: `Party ${_GRP} Day`, scope: "world", config: false, type: String, default: "1",
  });
}

if (!game.settings.settings.has(`world.${_TIME_KEY}`)) {
  game.settings.register("world", _TIME_KEY, {
    name: `Party ${_GRP} Time`, scope: "world", config: false, type: String, default: "",
  });
}

class PartyManagerApp extends foundry.applications.api.ApplicationV2 {
  constructor() {
    super();
    this._members = [];
    this._hookId  = null;
  }

  static DEFAULT_OPTIONS = {
    id: _APP_ID,
    window: { title: `🛡️ ${_GRP}`, resizable: true },
    // height "auto" = สูงพอดีเนื้อหา (Foundry จำกัดไม่ให้เกินจอเอง) — ยังลากปรับขนาดได้
    position: { width: 900, height: "auto" },
  };

  async _prepareContext() {
    this._members = await _loadActorData(_MEMBERS);
    return { members: this._members };
  }

  async _renderHTML(context) {
    const noteValue  = game.settings.get?.("world", _SETTINGS_KEY) ?? "";
    const dayValue   = game.settings.get?.("world", _DAY_KEY) ?? "1";
    const timeValue  = game.settings.get?.("world", _TIME_KEY) ?? "";
    const div = document.createElement("div");
    div.innerHTML = _buildContent(context.members, _GRP, noteValue, dayValue, timeValue);
    return div;
  }

  _replaceHTML(result, content) {
    content.replaceChildren(result);
    this._attachListeners(content);
  }

  async _onRender(context, options) {
    await super._onRender?.(context, options);
    // ถ้าเนื้อหาสูงเกินหน้าต่าง ให้ scroll ได้แทนการโดนตัด
    const wc = this.element?.querySelector(".window-content");
    if (wc) wc.style.overflowY = "auto";
    // render ซ้ำหลัง Sync/เอาคนออก จำนวนแถวเปลี่ยน → ปรับความสูงตามเนื้อหาใหม่
    if (!options.isFirstRender) this.setPosition({ height: "auto" });
    // render ซ้ำ (เช่นหลัง Sync) ต้องถอด hook เก่าก่อน ไม่งั้น hook ซ้อนกัน
    if (this._hookId !== null) Hooks.off("updateActor", this._hookId);
    this._hookId = Hooks.on("updateActor", (actor) => {
      if (!_MEMBERS.includes(actor.uuid)) return;
      const root = this.element;
      if (root) _refreshRow(root, actor.uuid);
    });
  }

  async _onClose(options) {
    if (this._hookId !== null) { Hooks.off("updateActor", this._hookId); this._hookId = null; }
    await super._onClose?.(options);
  }

  _attachListeners(root) {
    // Actor name → sheet
    root.querySelectorAll(".actor-name-link").forEach(el =>
      el.addEventListener("click", async () => { const a = await fromUuid(el.dataset.uuid); if (a) a.sheet.render(true); })
    );

    // +/- buttons
    root.querySelectorAll(".adj-btn").forEach(btn =>
      btn.addEventListener("click", async () => {
        const ok = await _adjustField(btn.dataset.uuid, btn.dataset.field, parseInt(btn.dataset.delta));
        if (ok) await _refreshRow(root, btn.dataset.uuid);
      })
    );

    // HP input
    root.querySelectorAll(".hp-input").forEach(input => {
      const commit = async () => {
        const raw = input.value.trim();
        if (!raw || isNaN(parseInt(raw.replace(/^[+-]/, "")))) return;
        await _setFieldDirect(input.dataset.uuid, "hp", raw);
        await _refreshRow(root, input.dataset.uuid);
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); commit(); } });
      input.addEventListener("wheel", e => e.preventDefault(), { passive: false });
    });

    // Temp HP input
    root.querySelectorAll(".temp-input").forEach(input => {
      const commit = async () => {
        const val = parseInt(input.value);
        if (isNaN(val)) return;
        await _setFieldDirect(input.dataset.uuid, "temp", val);
        await _refreshRow(root, input.dataset.uuid);
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); commit(); } });
      input.addEventListener("wheel", e => e.preventDefault(), { passive: false });
    });

    // HD input
    root.querySelectorAll(".hd-input").forEach(input => {
      const commit = async () => {
        const val = parseInt(input.value);
        if (isNaN(val)) return;
        const a = await fromUuid(input.dataset.uuid);
        if (!a) return;
        const max   = a.system.attributes.hd?.max ?? 0;
        const next  = Math.min(max, Math.max(0, val));
        const spent = max - next;
        const classItems = a.items.filter(i => i.type === "class");
        if (classItems.length) {
          let rem = spent;
          await a.updateEmbeddedDocuments("Item", classItems.map(cls => {
            const use = Math.min(cls.system.levels ?? 1, Math.max(0, rem));
            rem -= use;
            return { _id: cls.id, "system.hd.spent": use };
          }));
        }
        await _refreshRow(root, input.dataset.uuid);
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); commit(); } });
      input.addEventListener("wheel", e => e.preventDefault(), { passive: false });
    });

    // จัดลำดับ / เอาออกจากเมนู — แก้แค่รายชื่อใน Party Manager ไม่แตะ Party Actor (กด Sync เพื่อรีเซ็ต)
    const _saveMemberList = async (list) => {
      _MEMBERS = list;
      await game.settings.set("world", _MEMBERS_KEY, JSON.stringify(list));
      this.render();
    };

    root.querySelectorAll(".order-btn").forEach(btn =>
      btn.addEventListener("click", async () => {
        const i = _MEMBERS.indexOf(btn.dataset.uuid);
        const j = i + parseInt(btn.dataset.move);
        if (i < 0 || j < 0 || j >= _MEMBERS.length) return;
        const list = [..._MEMBERS];
        [list[i], list[j]] = [list[j], list[i]];
        await _saveMemberList(list);
      })
    );

    root.querySelectorAll(".remove-member-btn").forEach(btn =>
      btn.addEventListener("click", async () => {
        if (_MEMBERS.length <= 1) return ui.notifications.warn("ต้องเหลือสมาชิกอย่างน้อย 1 คน");
        const name = (await fromUuid(btn.dataset.uuid))?.name ?? btn.dataset.uuid;
        await _saveMemberList(_MEMBERS.filter(u => u !== btn.dataset.uuid));
        ui.notifications.info(`เอา ${name} ออกจากเมนู Party ${_GRP} แล้ว (กด Sync Members เพื่อดึงกลับ)`);
      })
    );

    // Sync Members — ดึงรายชื่อล่าสุดจาก Party Actor (เพิ่ม/ลบคนใน Party Sheet แล้วกดปุ่มนี้)
    root.querySelector("#sync-members").addEventListener("click", async () => {
      const a = await fromUuid(_PUUID);
      if (!a) return ui.notifications.warn("ไม่พบ Party Actor");
      // ข้าม actor ที่ถูกลบไปแล้วแต่ยังค้างอยู่ใน Party Actor
      const next = _readPartyMemberUuids(a).filter(u => fromUuidSync(u));
      if (!next.length) return ui.notifications.warn(`ไม่พบสมาชิกใน "${a.name}" — ไม่ได้เปลี่ยนรายชื่อ`);

      const nameOf = async uuid => (await fromUuid(uuid))?.name ?? uuid;
      const added   = await Promise.all(next.filter(u => !_MEMBERS.includes(u)).map(nameOf));
      const removed = await Promise.all(_MEMBERS.filter(u => !next.includes(u)).map(nameOf));
      if (!added.length && !removed.length && next.join() === _MEMBERS.join())
        return ui.notifications.info(`สมาชิก Party ${_GRP} ตรงกับ Party Actor อยู่แล้ว`);

      await game.settings.set("world", _MEMBERS_KEY, JSON.stringify(next));
      _MEMBERS = next;
      const parts = [];
      if (added.length)   parts.push(`เพิ่ม: ${added.join(", ")}`);
      if (removed.length) parts.push(`ออก: ${removed.join(", ")}`);
      ui.notifications.info(`Sync Party ${_GRP} แล้ว (${next.length} คน)${parts.length ? " — " + parts.join(" | ") : ""}`);
      this.render();
    });

    // Open Party Sheet — เปิดแล้วปิดหน้าต่าง Party Manager ไปด้วย
    root.querySelector("#open-party-sheet").addEventListener("click", async () => {
      const a = await fromUuid(_PUUID);
      if (!a) return ui.notifications.warn("ไม่พบ Party Actor");
      a.sheet.render(true);
      await this.close();
    });

    // Place Party — เปิด Party Sheet, กด placeMembers ให้ แล้วปิดหน้าต่าง Party Manager ไปด้วย
    root.querySelector("#place-party").addEventListener("click", async () => {
      const a = await fromUuid(_PUUID);
      if (!a) return ui.notifications.warn("ไม่พบ Party Actor");
      const sheet = a.sheet;
      sheet.render(true);
      await new Promise(r => setTimeout(r, 800));
      const btn = sheet.element.querySelector("[data-action='placeMembers']");
      if (btn) btn.click();
      else ui.notifications.warn("ไม่พบปุ่ม placeMembers บน Party Sheet");
      await this.close();
    });

    // Day +/- steppers + calendar/season preview
    const dayInput  = root.querySelector("#party-day");
    const timeInput = root.querySelector("#party-time");
    const calPreview = root.querySelector("#calendar-preview");

    const _refreshCalendarPreview = () => {
      if (!calPreview) return;
      const result = _formatCalendarDate(dayInput.value);
      if (!result) { calPreview.textContent = ""; return; }
      const t = timeInput?.value?.trim();
      const timePart = t ? `, ${t}` : "";
      const era = CALENDAR_CONFIG.eraSuffix ? ` ${CALENDAR_CONFIG.eraSuffix}` : "";
      calPreview.textContent =
        `${result.weekday}, the ${result.dayOrdinal} of Month ${result.month}, ${result.year}${era}${timePart} (${result.season})`;
    };
    _refreshCalendarPreview(); // แสดงทันทีตอนเปิดหน้าต่าง

    // ── Auto-save: Day/Time (แจ้งเตือนทุกครั้งที่บันทึก) ────────
    const _saveDayTime = async () => {
      const dVal = dayInput.value.trim();
      const tVal = timeInput.value.trim();
      await game.settings.set("world", _DAY_KEY, dVal).catch(() =>
        game.user.setFlag("world", _DAY_KEY, dVal)
      );
      await game.settings.set("world", _TIME_KEY, tVal).catch(() =>
        game.user.setFlag("world", _TIME_KEY, tVal)
      );
      ui.notifications.info(`บันทึก Day/Time Party ${_GRP} แล้ว`);
    };

    root.querySelector("#day-sub").addEventListener("click", async () => {
      const cur = parseInt(dayInput.value) || 0;
      dayInput.value = Math.max(0, cur - 1);
      _refreshCalendarPreview();
      await _saveDayTime();
    });
    root.querySelector("#day-add").addEventListener("click", async () => {
      const cur = parseInt(dayInput.value) || 0;
      dayInput.value = cur + 1;
      _refreshCalendarPreview();
      await _saveDayTime();
    });
    dayInput.addEventListener("input", _refreshCalendarPreview);
    dayInput.addEventListener("blur", () => _saveDayTime());
    dayInput.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); dayInput.blur(); } });

    timeInput.addEventListener("input", _refreshCalendarPreview);
    timeInput.addEventListener("blur", () => _saveDayTime());
    timeInput.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); timeInput.blur(); } });

    // Open Adventure Journal — UUID มาจาก JOURNAL_CONFIG ที่หัวไฟล์ ไม่มีช่องกรอกแล้ว
    root.querySelector("#open-journal-link").addEventListener("click", async () => {
      const raw = JOURNAL_CONFIG.uuid?.trim();
      if (!raw) return ui.notifications.warn("ยังไม่ได้ตั้งค่า JOURNAL_CONFIG.uuid ที่หัวไฟล์");

      try {
        const doc = await fromUuid(raw);
        if (doc) {
          if (doc.sheet) { doc.sheet.render(true); return; }
          if (doc.parent?.sheet) { doc.parent.sheet.render(true); return; }
        }
      } catch (e) { /* ไม่ใช่ UUID ที่ถูกต้อง */ }

      ui.notifications.warn("ไม่พบ Journal จาก UUID ที่ตั้งไว้ — ตรวจสอบ JOURNAL_CONFIG.uuid ที่หัวไฟล์");
    });

    // Rest
    root.querySelectorAll("[data-rest]").forEach(btn =>
      btn.addEventListener("click", async () => {
        const a = await fromUuid(_PUUID);
        if (!a) return ui.notifications.warn("ไม่พบ Party Actor");
        await a.initiateRest({ type: btn.dataset.rest });
        for (const uuid of _MEMBERS) await _refreshRow(root, uuid);
      })
    );

    // ── Auto-save: Notes (แจ้งเตือนทุกครั้งที่บันทึก) ──────────
    const noteInput = root.querySelector("#party-note");
    const _saveNotes = async () => {
      await game.settings.set("world", _SETTINGS_KEY, noteInput.value).catch(() =>
        game.user.setFlag("world", _SETTINGS_KEY, noteInput.value)
      );
      ui.notifications.info(`บันทึก Notes Party ${_GRP} แล้ว`);
    };
    noteInput.addEventListener("blur", () => _saveNotes());
  }
}

const existing = foundry.applications.instances.get(_APP_ID);
if (existing) existing.bringToFront();
else new PartyManagerApp().render(true);