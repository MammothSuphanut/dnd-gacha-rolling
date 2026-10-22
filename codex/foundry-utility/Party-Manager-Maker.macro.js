/**
 * ═══════════════════════════════════════════════════════════════
 *  PARTY MANAGER MACRO GENERATOR
 *  รัน macro นี้ → กรอก/ลาก UUID ของ Party Actor และสมาชิก →
 *  กด "สร้าง Macro" → ระบบจะ gen macro Party Manager ตัวเต็ม
 *  (พร้อมปุ่ม HP/Temp/HD, Rest, Journal Link, Notes)
 *  ให้อัตโนมัติ และเพิ่มเข้า Macro Directory ให้เลย
 * ═══════════════════════════════════════════════════════════════
 */

// ── Template ของ macro ที่จะถูก gen ออกมา (มี Journal Link รวมอยู่แล้ว) ──
const _TEMPLATE = `// ════════════════════════════════════════════════════════════
//  PARTY CONFIG — แก้ตรงนี้อย่างเดียวเมื่อย้าย macro
// ════════════════════════════════════════════════════════════
const PARTY_CONFIG = {
  key:        __KEY_JSON__,
  partyActor: __PARTY_ACTOR_JSON__,
  members: __MEMBERS_JSON__,
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
  uuid: __JOURNAL_JSON__,
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
  const row = root.querySelector(\`tr[data-uuid="\${uuid}"]\`);
  if (!row) return;

  const hpPct   = m.hpMax > 0 ? Math.round((m.hp / m.hpMax) * 100) : 0;
  const hpColor = hpPct > 50 ? "#4caf50" : hpPct > 25 ? "#ff9800" : "#f44336";
  const hpBar   = row.querySelector(".hp-bar-fill");
  const hpInput = row.querySelector(".hp-input");
  if (hpBar)   { hpBar.style.width = hpPct + "%"; hpBar.style.background = hpColor; }
  if (hpInput) { hpInput.value = m.hp; hpInput.dataset.max = m.hpMax; }
  const hpLabel = row.querySelector(".hp-label");
  if (hpLabel) hpLabel.textContent = \`/\${m.hpMax}\`;

  const tempInput = row.querySelector(".temp-input");
  if (tempInput) tempInput.value = m.temp;

  const hdInput = row.querySelector(".hd-input");
  const hdLabel = row.querySelector(".hd-label");
  if (hdInput) { hdInput.value = m.hd; hdInput.dataset.max = m.hdMax; }
  if (hdLabel) hdLabel.textContent = \`/\${m.hdMax}\`;
}

function _buildTable(members) {
  const inputStyle = \`
    width:38px;text-align:center;background:#1a1a2e;border:1px solid #555;
    border-radius:3px;color:#fff;font-size:13px;padding:1px 2px;
    -moz-appearance:textfield;\`;

  // Foundry ใส่ width:100% ให้ button เป็นค่า default → ต้องล็อกขนาดเอง ไม่งั้นปุ่มจะเรียงลงแนวตั้ง
  const orderBtnStyle = \`
    flex:0 0 20px;width:20px;min-width:20px;max-width:20px;margin:0;
    height:20px;padding:0;font-size:10px;line-height:1;cursor:pointer;
    border-radius:3px;border:1px solid #666;background:#333;color:#ccc;\`;

  const rows = members.map((m, i) => {
    const hpPct   = m.hpMax > 0 ? Math.round((m.hp / m.hpMax) * 100) : 0;
    const hpColor = hpPct > 50 ? "#4caf50" : hpPct > 25 ? "#ff9800" : "#f44336";
    return \`
    <tr data-uuid="\${m.uuid}">
      <td style="padding:4px 6px;white-space:nowrap;">
        <div style="display:flex;align-items:center;gap:6px;">
          <img src="\${m.img}" alt=""
            style="width:28px;height:28px;object-fit:cover;border-radius:4px;border:1px solid #555;flex-shrink:0;">
          <span class="actor-name-link" data-uuid="\${m.uuid}"
            style="font-size:13px;cursor:pointer;text-decoration:underline dotted #666;transition:color .15s;"
            title="เปิด \${m.name} Sheet">\${m.name}</span>
        </div>
      </td>
      <td style="padding:4px 6px;min-width:150px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="hp" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">−</button>
          <div style="position:relative;flex:1;min-width:60px;">
            <div style="height:20px;background:#222;border-radius:3px;overflow:hidden;">
              <div class="hp-bar-fill" style="width:\${hpPct}%;height:100%;background:\${hpColor};transition:width .25s;"></div>
            </div>
            <div style="position:absolute;top:0;left:0;width:100%;display:flex;align-items:center;
                        justify-content:center;gap:1px;height:20px;">
              <input type="text" class="hp-input" value="\${m.hp}"
                data-uuid="\${m.uuid}" data-max="\${m.hpMax}"
                style="\${inputStyle}width:34px;background:transparent;border:none;color:#fff;
                       font-size:12px;text-shadow:0 0 4px #000;">
              <span class="hp-label" style="font-size:12px;color:#ddd;text-shadow:0 0 4px #000;">/\${m.hpMax}</span>
            </div>
          </div>
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="hp" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;min-width:90px;">
        <div style="display:flex;align-items:center;gap:4px;justify-content:center;">
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="temp" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">−</button>
          <input type="number" class="temp-input" value="\${m.temp}"
            data-uuid="\${m.uuid}" min="0"
            style="\${inputStyle}color:#7ec8e3;">
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="temp" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;min-width:90px;">
        <div style="display:flex;align-items:center;gap:4px;justify-content:center;">
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="hd" data-delta="-1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">−</button>
          <input type="number" class="hd-input" value="\${m.hd}"
            data-uuid="\${m.uuid}" data-max="\${m.hdMax}"
            min="0" max="\${m.hdMax}"
            style="\${inputStyle}color:#ce9eff;">
          <span class="hd-label" style="font-size:13px;color:#ce9eff;">/\${m.hdMax}</span>
          <button class="adj-btn" data-uuid="\${m.uuid}" data-field="hd" data-delta="+1"
            style="width:20px;height:20px;padding:0;font-size:14px;line-height:1;cursor:pointer;
                   border-radius:3px;border:1px solid #666;background:#333;color:#ccc;">+</button>
        </div>
      </td>
      <td style="padding:4px 6px;text-align:center;white-space:nowrap;width:1%;">
        <div style="display:flex;flex-direction:row;flex-wrap:nowrap;gap:3px;justify-content:center;align-items:center;">
        <button class="order-btn" data-uuid="\${m.uuid}" data-move="-1" title="เลื่อนขึ้น" \${i === 0 ? "disabled" : ""}
          style="\${orderBtnStyle}\${i === 0 ? "opacity:.3;cursor:default;" : ""}">▲</button>
        <button class="order-btn" data-uuid="\${m.uuid}" data-move="1" title="เลื่อนลง" \${i === members.length - 1 ? "disabled" : ""}
          style="\${orderBtnStyle}\${i === members.length - 1 ? "opacity:.3;cursor:default;" : ""}">▼</button>
        <button class="remove-member-btn" data-uuid="\${m.uuid}" title="เอาออกจากเมนู (กด Sync เพื่อดึงกลับ)"
          style="\${orderBtnStyle}border-color:#a33;background:#2a1a1a;color:#f88;">✕</button>
        </div>
      </td>
    </tr>\`;
  }).join("");

  return \`
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
    <tbody>\${rows}</tbody>
  </table>\`;
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
  if (rem100 >= 11 && rem100 <= 13) return \`\${n}th\`;
  switch (n % 10) {
    case 1: return \`\${n}st\`;
    case 2: return \`\${n}nd\`;
    case 3: return \`\${n}rd\`;
    default: return \`\${n}th\`;
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
  return \`
  <style>
    .adj-btn:hover  { background: #555 !important; }
    .rest-btn:hover { filter: brightness(1.2); }
    .actor-name-link:hover { color: #c9a227 !important; }
    .order-btn:not([disabled]):hover, .remove-member-btn:hover { filter: brightness(1.4); }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  </style>

  <div style="display:flex;align-items:center;border-bottom:1px solid #444;margin-bottom:10px;padding-bottom:6px;">
    <span style="flex:1;font-size:14px;color:#c9a227;font-weight:bold;">⚔️ Party \${grp}</span>
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

  \${_buildTable(members)}

  <div style="margin-top:10px;">
    <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">📅 Day/Time — Party \${grp}</label>
    <div style="display:flex;gap:6px;align-items:center;">
      <button id="day-sub" class="rest-btn"
        style="width:24px;height:26px;padding:0;font-size:14px;line-height:1;cursor:pointer;
               border-radius:4px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">−</button>
      <input type="number" id="party-day" value="\${_escapeAttr(dayValue)}" min="0"
        title="Day"
        style="width:52px;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;
               border-radius:4px;color:#ddd;padding:5px 2px;font-size:13px;text-align:center;
               font-family:inherit;-moz-appearance:textfield;flex-shrink:0;">
      <button id="day-add" class="rest-btn"
        style="width:24px;height:26px;padding:0;font-size:14px;line-height:1;cursor:pointer;
               border-radius:4px;border:1px solid #666;background:#333;color:#ccc;flex-shrink:0;">+</button>
      <input type="text" id="party-time" value="\${_escapeAttr(timeValue)}"
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
    <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">📝 Note — Party \${grp}</label>
    <textarea id="party-note" rows="3"
      style="width:100%;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;
             border-radius:4px;color:#ddd;padding:6px;font-size:12px;resize:vertical;font-family:inherit;"
      placeholder="บันทึกสำหรับ Party \${grp}...">\${noteValue}</textarea>
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
  </div>\`;
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
const _APP_ID   = \`party-manager-\${_GRP}\`;
const _SETTINGS_KEY = \`partyNote_\${_GRP}\`;
const _DAY_KEY       = \`partyDay_\${_GRP}\`;
const _TIME_KEY      = \`partyTime_\${_GRP}\`;
const _MEMBERS_KEY   = \`partyMembers_\${_GRP}\`;

if (!game.settings.settings.has(\`world.\${_MEMBERS_KEY}\`)) {
  game.settings.register("world", _MEMBERS_KEY, {
    name: \`Party \${_GRP} Members\`, scope: "world", config: false, type: String, default: "",
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
    if (typeof a === "string") return a.includes(".") ? a : \`Actor.\${a}\`;
    return a.uuid ?? (a.id ? \`Actor.\${a.id}\` : null);
  }).filter(Boolean);
}

if (!game.settings.settings.has(\`world.\${_SETTINGS_KEY}\`)) {
  game.settings.register("world", _SETTINGS_KEY, {
    name: \`Party \${_GRP} Note\`, scope: "world", config: false, type: String, default: "",
  });
}

if (!game.settings.settings.has(\`world.\${_DAY_KEY}\`)) {
  game.settings.register("world", _DAY_KEY, {
    name: \`Party \${_GRP} Day\`, scope: "world", config: false, type: String, default: "1",
  });
}

if (!game.settings.settings.has(\`world.\${_TIME_KEY}\`)) {
  game.settings.register("world", _TIME_KEY, {
    name: \`Party \${_GRP} Time\`, scope: "world", config: false, type: String, default: "",
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
    window: { title: \`🛡️ \${_GRP}\`, resizable: true },
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
        ui.notifications.info(\`เอา \${name} ออกจากเมนู Party \${_GRP} แล้ว (กด Sync Members เพื่อดึงกลับ)\`);
      })
    );

    // Sync Members — ดึงรายชื่อล่าสุดจาก Party Actor (เพิ่ม/ลบคนใน Party Sheet แล้วกดปุ่มนี้)
    root.querySelector("#sync-members").addEventListener("click", async () => {
      const a = await fromUuid(_PUUID);
      if (!a) return ui.notifications.warn("ไม่พบ Party Actor");
      // ข้าม actor ที่ถูกลบไปแล้วแต่ยังค้างอยู่ใน Party Actor
      const next = _readPartyMemberUuids(a).filter(u => fromUuidSync(u));
      if (!next.length) return ui.notifications.warn(\`ไม่พบสมาชิกใน "\${a.name}" — ไม่ได้เปลี่ยนรายชื่อ\`);

      const nameOf = async uuid => (await fromUuid(uuid))?.name ?? uuid;
      const added   = await Promise.all(next.filter(u => !_MEMBERS.includes(u)).map(nameOf));
      const removed = await Promise.all(_MEMBERS.filter(u => !next.includes(u)).map(nameOf));
      if (!added.length && !removed.length && next.join() === _MEMBERS.join())
        return ui.notifications.info(\`สมาชิก Party \${_GRP} ตรงกับ Party Actor อยู่แล้ว\`);

      await game.settings.set("world", _MEMBERS_KEY, JSON.stringify(next));
      _MEMBERS = next;
      const parts = [];
      if (added.length)   parts.push(\`เพิ่ม: \${added.join(", ")}\`);
      if (removed.length) parts.push(\`ออก: \${removed.join(", ")}\`);
      ui.notifications.info(\`Sync Party \${_GRP} แล้ว (\${next.length} คน)\${parts.length ? " — " + parts.join(" | ") : ""}\`);
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
      const timePart = t ? \`, \${t}\` : "";
      const era = CALENDAR_CONFIG.eraSuffix ? \` \${CALENDAR_CONFIG.eraSuffix}\` : "";
      calPreview.textContent =
        \`\${result.weekday}, the \${result.dayOrdinal} of Month \${result.month}, \${result.year}\${era}\${timePart} (\${result.season})\`;
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
      ui.notifications.info(\`บันทึก Day/Time Party \${_GRP} แล้ว\`);
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
      ui.notifications.info(\`บันทึก Notes Party \${_GRP} แล้ว\`);
    };
    noteInput.addEventListener("blur", () => _saveNotes());
  }
}

const existing = foundry.applications.instances.get(_APP_ID);
if (existing) existing.bringToFront();
else new PartyManagerApp().render(true);
`;

// ── UI: Dialog สำหรับกรอกข้อมูล ──────────────────────────────

// ดึง UUID ของสมาชิกจาก field ต่างๆ ที่ Party/Group Actor อาจใช้เก็บ (รองรับหลายรูปแบบ
// เพราะ dnd5e เก็บ system.members ต่างกันไปตามเวอร์ชัน: array ของ string, Set, หรือ object {actor: ...})
function _resolveUuidFromMemberEntry(m) {
  if (!m) return null;
  if (typeof m === "string") return m.includes(".") ? m : `Actor.${m}`;
  if (typeof Actor !== "undefined" && m instanceof Actor) return m.uuid;
  if (m.actor) {
    if (typeof m.actor === "string") return m.actor.includes(".") ? m.actor : `Actor.${m.actor}`;
    if (typeof Actor !== "undefined" && m.actor instanceof Actor) return m.actor.uuid;
    if (m.actor.uuid) return m.actor.uuid;
  }
  if (m.uuid) return m.uuid;
  if (m.id) return `Actor.${m.id}`;
  return null;
}

function _extractMemberUuidsFromPartyActor(partyActor) {
  const candidates = [
    partyActor?.system?.members,
    partyActor?.system?.member,
    partyActor?.system?.party?.members,
  ];
  for (const raw of candidates) {
    if (!raw) continue;
    let arr;
    if (Array.isArray(raw)) arr = raw;
    else if (raw instanceof Set) arr = Array.from(raw);
    else if (raw instanceof Map) arr = Array.from(raw.values());
    else if (typeof raw === "object") arr = Object.values(raw);
    else continue;
    const uuids = arr.map(_resolveUuidFromMemberEntry).filter(Boolean);
    if (uuids.length) return uuids;
  }
  return [];
}

function _memberRowHTML(index) {
  return `
  <div class="member-row" data-idx="${index}" style="display:flex;gap:6px;margin-bottom:6px;align-items:center;">
    <span style="width:18px;text-align:right;color:#888;font-size:12px;">${index + 1}.</span>
    <input type="text" class="member-uuid" placeholder="ลาก Actor จาก Directory มาวางที่นี่ หรือพิมพ์ Actor UUID"
      style="flex:1;box-sizing:border-box;background:#1a1a2e;border:1px solid #444;border-radius:4px;
             color:#ddd;padding:6px;font-size:12px;font-family:inherit;">
    <button type="button" class="remove-member" title="ลบแถวนี้"
      style="width:26px;height:26px;flex-shrink:0;border-radius:4px;border:1px solid #a33;
             background:#2a1a1a;color:#f88;cursor:pointer;font-size:13px;">✕</button>
  </div>`;
}

function _dialogContentHTML() {
  return `
  <style>
    .pmg-field label { display:block; font-size:12px; color:#aaa; margin-bottom:3px; }
    .pmg-field input[type=text] {
      width:100%; box-sizing:border-box; background:#1a1a2e; border:1px solid #444;
      border-radius:4px; color:#ddd; padding:6px; font-size:13px; font-family:inherit;
    }
    #pmg-add-member:hover, .remove-member:hover { filter:brightness(1.25); }
  </style>
  <div class="pmg-field" style="margin-bottom:10px;">
    <label>🏷️ ชื่อ Party (key) — ใช้เป็นชื่อ macro และ settings key เช่น ATS, W</label>
    <input type="text" id="pmg-key" placeholder="เช่น ATS">
  </div>
  <div class="pmg-field" style="margin-bottom:10px;">
    <label>🛡️ Party Actor UUID — ลาก Party Actor จาก Actors Directory มาวาง หรือพิมพ์เอง</label>
    <div style="display:flex;gap:6px;">
      <input type="text" id="pmg-party-actor" placeholder="ลาก Party Actor มาวางที่นี่ หรือพิมพ์ Actor UUID" style="flex:1;width:auto;">
      <button type="button" id="pmg-fetch-members"
        style="padding:5px 12px;background:#1a2a3a;border:1px solid #2196f3;color:#2196f3;
               border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap;">🔍 ดึงสมาชิกอัตโนมัติ</button>
    </div>
    <p style="font-size:11px;color:#777;margin:4px 0 0;">
      วาง/ลาก UUID แล้วระบบจะลองดึงรายชื่อสมาชิกจากในตัว Party Actor ให้อัตโนมัติ
      (ถ้าดึงไม่ได้ค่อยเพิ่มสมาชิกเองด้านล่าง)
    </p>
  </div>
  <div class="pmg-field" style="margin-bottom:10px;">
    <label>📖 Adventure Journal UUID (ไม่บังคับ) — ลาก Journal จาก Journal Directory มาวาง หรือพิมพ์เอง</label>
    <input type="text" id="pmg-journal" placeholder="เช่น JournalEntry.xxxx — เว้นว่างได้ แก้ทีหลังที่ JOURNAL_CONFIG หัวไฟล์">
  </div>
  <div class="pmg-field">
    <label style="display:flex;align-items:center;justify-content:space-between;">
      <span>👥 สมาชิกปาร์ตี้ — เติมอัตโนมัติจาก Party Actor หรือลาก Actor มาเพิ่ม/แก้เอง</span>
      <button type="button" id="pmg-add-member"
        style="padding:3px 10px;background:#1a2a1a;border:1px solid #4caf50;color:#4caf50;
               border-radius:4px;cursor:pointer;font-size:12px;">+ เพิ่มแถว</button>
    </label>
    <div id="pmg-members-container" style="margin-top:6px;max-height:260px;overflow-y:auto;padding-right:4px;">
      ${_memberRowHTML(0)}
    </div>
  </div>`;
}

function _attachDropHandler(input) {
  input.addEventListener("dragover", e => e.preventDefault());
  input.addEventListener("drop", e => {
    e.preventDefault();
    try {
      const raw = e.dataTransfer.getData("text/plain");
      const data = JSON.parse(raw);
      if (data?.uuid) { input.value = data.uuid; return; }
      // เผื่อบางระบบส่ง type+id มาแทน uuid ตรงๆ
      if (data?.type && data?.id) { input.value = `${data.type}.${data.id}`; }
    } catch (err) { /* ไม่ใช่ drag data ที่รู้จัก ปล่อยผ่าน */ }
  });
}

function _wireMemberRow(row, container) {
  const input = row.querySelector(".member-uuid");
  _attachDropHandler(input);
  row.querySelector(".remove-member").addEventListener("click", () => {
    if (container.querySelectorAll(".member-row").length <= 1) {
      ui.notifications.warn("ต้องมีสมาชิกอย่างน้อย 1 คน");
      return;
    }
    row.remove();
  });
}

function _setMemberRows(container, uuids) {
  container.innerHTML = "";
  const list = uuids.length ? uuids : [""];
  list.forEach((uuid, i) => {
    const div = document.createElement("div");
    div.innerHTML = _memberRowHTML(i).trim();
    const row = div.firstElementChild;
    if (uuid) row.querySelector(".member-uuid").value = uuid;
    container.appendChild(row);
    _wireMemberRow(row, container);
  });
}

async function _autoFillFromPartyActor(root, { silent = false } = {}) {
  const partyInput = root.querySelector("#pmg-party-actor");
  const uuid = partyInput.value.trim();
  if (!uuid) return;

  let partyActor;
  try { partyActor = await fromUuid(uuid); } catch (e) { partyActor = null; }
  if (!partyActor) {
    if (!silent) ui.notifications.warn("ไม่พบ Actor จาก UUID ที่ใส่ — ตรวจสอบ Party Actor UUID");
    return;
  }

  // เติมชื่อ Party (key) อัตโนมัติถ้ายังไม่ได้กรอก
  const keyInput = root.querySelector("#pmg-key");
  if (!keyInput.value.trim()) {
    const suggested = (partyActor.name || "PARTY").replace(/[^a-zA-Z0-9ก-๙]+/g, "").slice(0, 16);
    if (suggested) keyInput.value = suggested;
  }

  const memberUuids = _extractMemberUuidsFromPartyActor(partyActor);
  const container = root.querySelector("#pmg-members-container");
  if (!memberUuids.length) {
    if (!silent) ui.notifications.warn(`ไม่พบรายชื่อสมาชิกใน "${partyActor.name}" อัตโนมัติ — กรุณาเพิ่ม Actor UUID ของสมาชิกเอง`);
    return;
  }

  _setMemberRows(container, memberUuids);
  ui.notifications.info(`ดึงสมาชิกจาก "${partyActor.name}" มาแล้ว ${memberUuids.length} คน`);
}

function _wireDialog(root) {
  const container = root.querySelector("#pmg-members-container");

  container.querySelectorAll(".member-row").forEach(row => _wireMemberRow(row, container));

  const partyInput = root.querySelector("#pmg-party-actor");
  _attachDropHandler(partyInput);
  _attachDropHandler(root.querySelector("#pmg-journal"));
  // ลากวางหรือพิมพ์ UUID แล้วออกจากช่อง → ลองดึงสมาชิกให้อัตโนมัติทันที
  partyInput.addEventListener("drop", () => setTimeout(() => _autoFillFromPartyActor(root, { silent: true }), 50));
  partyInput.addEventListener("blur", () => _autoFillFromPartyActor(root, { silent: true }));

  root.querySelector("#pmg-fetch-members").addEventListener("click", () => _autoFillFromPartyActor(root));

  root.querySelector("#pmg-add-member").addEventListener("click", () => {
    const idx = container.querySelectorAll(".member-row").length;
    const div = document.createElement("div");
    div.innerHTML = _memberRowHTML(idx).trim();
    const row = div.firstElementChild;
    container.appendChild(row);
    _wireMemberRow(row, container);
  });
}

function _collectValues(root) {
  const key = root.querySelector("#pmg-key").value.trim();
  const partyActor = root.querySelector("#pmg-party-actor").value.trim();
  const members = Array.from(root.querySelectorAll(".member-uuid"))
    .map(i => i.value.trim())
    .filter(v => v.length > 0);
  const journal = root.querySelector("#pmg-journal").value.trim();
  return { key, partyActor, members, journal };
}

async function _createMacroFromValues({ key, partyActor, members, journal = "" }) {
  if (!partyActor) { ui.notifications.error("กรุณาใส่ Party Actor UUID"); return null; }

  // fallback: ถ้ายังไม่มีสมาชิกเลย ลองดึงจาก Party Actor อีกครั้งตรงนี้ (เผื่อ dialog ไม่ทัน auto-fill)
  if (!members.length) {
    try {
      const partyActorDoc = await fromUuid(partyActor);
      if (partyActorDoc) members = _extractMemberUuidsFromPartyActor(partyActorDoc);
    } catch (e) { /* ignore, จะไปเจอ validation ด้านล่างแทน */ }
  }

  if (!key) { ui.notifications.error("กรุณาใส่ชื่อ Party (key)"); return null; }
  if (!members.length) { ui.notifications.error("กรุณาใส่ Actor UUID ของสมาชิกอย่างน้อย 1 คน (ดึงอัตโนมัติไม่สำเร็จ)"); return null; }

  // ใช้ function replacer กัน "$" ในค่า (เช่น "$&") ถูกตีความเป็น pattern ของ String.replace
  const command = _TEMPLATE
    .replace("__KEY_JSON__", () => JSON.stringify(key))
    .replace("__PARTY_ACTOR_JSON__", () => JSON.stringify(partyActor))
    .replace("__MEMBERS_JSON__", () => JSON.stringify(members, null, 4).replace(/\n/g, "\n  "))
    .replace("__JOURNAL_JSON__", () => JSON.stringify(journal));

  const macroName = `Party Manager - ${key}`;

  // ถ้ามี macro ชื่อเดียวกันอยู่แล้ว ให้ถามก่อนทับ
  const existing = game.macros.find(m => m.name === macroName);
  if (existing) {
    const overwrite = await foundry.applications.api.DialogV2.confirm({
      window: { title: "มี Macro นี้อยู่แล้ว" },
      content: `<p>พบ Macro ชื่อ "<b>${macroName}</b>" อยู่แล้ว ต้องการเขียนทับหรือไม่?</p>`,
    });
    if (!overwrite) return null;
    await existing.update({ command });
    ui.notifications.info(`อัปเดต Macro "${macroName}" เรียบร้อย`);
    return existing;
  }

  const macro = await Macro.create({
    name: macroName,
    type: "script",
    scope: "global",
    img: "icons/svg/dice-target.svg",
    command,
  });

  if (macro) {
    // วางลง hotbar ช่องว่างแรกที่หาเจอให้อัตโนมัติ (ไม่บังคับ ถ้าเต็มก็ข้าม)
    const emptySlot = Array.from({ length: 50 }, (_, i) => i + 1)
      .find(slot => !game.user.getHotbarMacros().find(h => h.slot === slot));
    if (emptySlot) await game.user.assignHotbarMacro(macro, emptySlot);
    ui.notifications.info(`สร้าง Macro "${macroName}" เรียบร้อย${emptySlot ? ` (วางที่ hotbar ช่อง ${emptySlot})` : ""}`);
  }
  return macro;
}

// ── เปิด Dialog ────────────────────────────────────────────
(async () => {
  const result = await foundry.applications.api.DialogV2.wait({
    window: { title: "🛠️ สร้าง Party Manager Macro", resizable: true },
    position: { width: 560 },
    content: _dialogContentHTML(),
    buttons: [
      {
        action: "create",
        label: "✅ สร้าง Macro",
        icon: "fas fa-wand-magic-sparkles",
        default: true,
        callback: (event, button, dialog) => _collectValues(dialog.element),
      },
      {
        action: "cancel",
        label: "ยกเลิก",
        icon: "fas fa-xmark",
      },
    ],
    render: (event, dialog) => _wireDialog(dialog.element),
    rejectClose: false,
  });

  if (!result || result === "cancel") return;
  await _createMacroFromValues(result);
})();