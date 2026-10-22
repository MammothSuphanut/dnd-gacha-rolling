/**
 * The Fragment (Aeorian Cataclysm) — rebalance 2026-10-13
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - Rewrites Core + the 5 Fragment items, matched by name: the world Items AND every copy
 *     embedded on an actor (PCs/NPCs that already hold a Fragment).
 *   - Rules text goes ONLY into "Unidentified Description" (GM eyes). Description and
 *     Chat Description are cleared so players can't read the mechanics.
 *   - Sets attunement, uses (per Long Rest), and replaces all activities.
 *     Free Action = activation "Special" with condition "Free Action" (dnd5e has no free type).
 *   - Embedded copies keep their spent uses (clamped to the new max). Item effects
 *     (e.g. Wisdom's animation) are left untouched.
 *   - Source of truth: adventures/aeorian-cataclysm/01-the-fragments.md
 */
(async () => {
  if ( !game.user.isGM ) return ui.notifications.warn("GM only.");

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const rid = () => foundry.utils.randomID();
  const FREE = { type: "special", value: null, override: false, condition: "Free Action" };
  const LR = max => ({ spent: 0, max: String(max), recovery: [{ period: "lr", type: "recoverAll" }] });
  const CONSUME = { spellSlot: true, scaling: { allowed: false }, targets: [{ type: "itemUses", value: "1", target: "", scaling: {} }] };

  const act = (type, name, extra = {}) => ({
    _id: rid(), type, name,
    activation: FREE,
    consumption: CONSUME,
    duration: { units: "inst", concentration: false, override: false },
    range: { units: "self", override: false },
    target: { affects: { type: "", count: "", choice: false }, template: { type: "" }, override: false, prompt: true },
    description: { chatFlavor: "" },
    ...extra
  });
  const sight = { units: "spec", special: "มองเห็น", override: false };
  const one = { affects: { type: "creature", count: "1", choice: false }, template: { type: "" }, override: false, prompt: true };
  const zenith = (name, formula) => act("damage", name, {
    range: sight, target: one,
    damage: { critical: { allow: false }, parts: [{
      number: null, denomination: null, bonus: "", types: ["force"],
      custom: { enabled: true, formula }, scaling: { mode: "", number: null, formula: "" }
    }] }
  });

  const CORE_NOTE = `<p><em>อยู่ภายใต้ Core Rules: Free Action, ใช้ Fragment ได้ 1 ชนิดต่อเทิร์น, "ระดับ" = Tier of Being</em></p>`;

  /* ------------------------------------------------------------------ */
  /*  Fragment data                                                     */
  /* ------------------------------------------------------------------ */
  const FRAGMENTS = {
    "Core": {
      attunement: "",
      uses: { spent: 0, max: "", recovery: [] },
      activities: [],
      html: `<h3>Core Rules (กฎพื้นฐานการใช้งาน)</h3><ul>
<li><p><strong>Attunement:</strong> Fragment ทุกชิ้นต้อง Attune และใช้ช่องร่วมกับไอเทมเวทมนตร์อื่น (สูงสุด 3 ชิ้น) — ถ้าช่องเต็มแล้วจะผสาน Fragment เพิ่มไม่ได้</p></li>
<li><p><strong>การใช้งาน:</strong> Fragment ทุกชิ้นใช้ <strong>Free Action</strong> ในเทิร์นของตัวเอง</p></li>
<li><p><strong>1 ชนิดต่อเทิร์น:</strong> ในแต่ละเทิร์นใช้ Fragment ได้แค่ <strong>1 ชนิด</strong> — ใช้ชนิดเดียวกันซ้ำหลายครั้งในเทิร์นเดียวได้ตามโควตาที่เหลือ (เช่น Wisdom 3 ครั้ง) แต่ห้ามผสมคนละชนิด (เช่น Void + Zenith) — Genesis ที่ทำงานอัตโนมัติไม่นับ</p></li>
<li><p><strong>โควตา:</strong> แต่ละชิ้นมีจำนวนครั้งของตัวเอง ฟื้นคืนทั้งหมดเมื่อจบ Long Rest</p></li>
<li><p><strong>การถอดออก:</strong> หลุดจากร่างได้แค่ 2 ทาง คือโฮสต์ตายจริง (<strong>True Death</strong>) หรือให้ <strong>Messenger</strong> ถอดให้</p></li>
<li><p><strong>"ระดับ"</strong> หมายถึง Tier of Being (Mortal → Ascendant → Divine → Sovereign → Law)</p></li></ul>`
    },

    "The Fragment of Wisdom": {
      uses: LR(3),
      activities: [act("utility", "Analyze", { range: sight, target: one })],
      keepEffectLink: true,
      html: `<h3>The Fragment of Wisdom</h3><p>ชิ้นส่วนแห่งปัญญาที่เปิดเผยความลับของสรรพสิ่ง</p>
<h4>Analyze</h4><ul>
<li><p><strong>Usage:</strong> Free Action เลือกเป้าหมาย 1 ตัวที่มองเห็น</p></li>
<li><p><strong>Effect:</strong> รู้ข้อมูลบางอย่างของเป้าหมาย ยิ่งเป้าหมายระดับสูงกว่าผู้ใช้ ยิ่งได้ข้อมูลน้อยลง — DM เป็นคนตัดสินว่าได้ข้อมูลอะไรบ้าง</p></li>
<li><p><strong>Limit:</strong> <strong>3 ครั้ง/Long Rest</strong></p></li></ul>${CORE_NOTE}`
    },

    "The Fragment of Void": {
      uses: LR(3),
      activities: [act("utility", "Void Step", { range: { units: "ft", value: "30", override: false } })],
      html: `<h3>The Fragment of Void</h3><p>ชิ้นส่วนแห่งความว่างเปล่า ฉีกระยะทางให้หายไปในพริบตา</p>
<h4>Void Step</h4><ul>
<li><p><strong>Usage:</strong> Free Action</p></li>
<li><p><strong>Effect:</strong> เทเลพอร์ตตัวเองพร้อมของที่สวมใส่/ถือ ไปยังพื้นที่ว่างที่มองเห็นในระยะ <strong>30 ฟุต</strong></p></li>
<li><p><strong>Limit:</strong> <strong>3 ครั้ง/Long Rest</strong></p></li></ul>${CORE_NOTE}`
    },

    "The Fragment of Stasis": {
      uses: LR(1),
      activities: [act("utility", "Haste")],
      html: `<h3>The Fragment of Stasis</h3><p>ชิ้นส่วนแห่งการหยุดนิ่ง บิดห้วงเวลาให้ผู้ใช้เคลื่อนไหวเร็วกว่าโลกรอบตัว</p>
<h4>Haste</h4><ul>
<li><p><strong>Usage:</strong> Free Action</p></li>
<li><p><strong>Effect:</strong> ได้ผลของ <em>Haste</em> จนจบเทิร์นนี้ — AC +2, Advantage ใน DEX Save, Speed ×2 และได้ <strong>Action เพิ่ม 1 Action</strong> (ใช้ทำอะไรก็ได้ตามปกติ) — ไม่มีผลอ่อนแรง (lethargy) ตอนหมดผล</p></li>
<li><p><strong>Limit:</strong> <strong>1 ครั้ง/Long Rest</strong></p></li></ul>${CORE_NOTE}`
    },

    "The Fragment of Genesis": {
      uses: LR(1),
      activities: [
        act("utility", "Rebirth", { activation: { type: "special", value: null, override: false, condition: "อัตโนมัติ เมื่อผู้ถือ True Death" } })
      ],
      html: `<h3>The Fragment of Genesis</h3><p>ชิ้นส่วนแห่งการก่อกำเนิด พลังแห่งชีวิตที่ดึงวิญญาณของผู้ถือกลับคืนร่าง</p>
<h4>Rebirth</h4><ul>
<li><p><strong>Usage:</strong> อัตโนมัติ (Passive)</p></li>
<li><p><strong>Effect:</strong> เมื่อผู้ถือเข้าสู่ <strong>True Death</strong> จะฟื้นขึ้นทันทีด้วย <strong>HP เต็ม</strong> (ทำงานก่อนกฎ "Fragment หลุดเมื่อ True Death" จึงไม่หลุดออกจากร่าง)</p></li>
<li><p><strong>Limit:</strong> <strong>1 ครั้ง/Long Rest</strong></p></li></ul>${CORE_NOTE}`
    },

    "The Fragment of Zenith": {
      uses: LR(1),
      activities: [
        zenith("Zenith — เป้าหมายระดับต่ำกว่า", "(2 * @details.level)d10"),
        zenith("Zenith — เป้าหมายระดับเท่ากัน", "(@details.level)d10"),
        zenith("Zenith — เป้าหมายระดับสูงกว่า", "(max(1, floor(@details.level / 2)))d10")
      ],
      html: `<h3>The Fragment of Zenith</h3><p>ชิ้นส่วนแห่งจุดสูงสุด ปลดปล่อยพลังทั้งหมดใส่เป้าหมายเดียว</p>
<h4>Absolute Zenith</h4><ul>
<li><p><strong>Usage:</strong> Free Action เลือกเป้าหมาย 1 ตัวที่มองเห็น — <strong>โดนอัตโนมัติ</strong> ไม่ต้องทอยโจมตีหรือเซฟ</p></li>
<li><p><strong>Effect:</strong> ทำ <strong>Force damage</strong> ตามระดับของเป้าหมาย (lv = เลเวลตัวละครของผู้ใช้)</p><ul>
<li><p><strong>ต่ำกว่า:</strong> (2 × lv)d10</p></li>
<li><p><strong>เท่ากัน:</strong> (lv)d10</p></li>
<li><p><strong>สูงกว่า 1 ขั้นขึ้นไป:</strong> (lv ÷ 2 ปัดลง, ขั้นต่ำ 1)d10</p></li></ul></li>
<li><p><strong>Limit:</strong> <strong>1 ครั้ง/Long Rest</strong></p></li></ul>${CORE_NOTE}`
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Apply                                                             */
  /* ------------------------------------------------------------------ */
  const buildSystem = (item, data) => {
    const sys = item.toObject().system;
    sys.description = { ...(sys.description ?? {}), value: "", chat: "" };
    sys.unidentified = { ...(sys.unidentified ?? {}), description: data.html };
    sys.attunement = data.attunement ?? "required";
    const spent = item.parent ? Math.min(Number(sys.uses?.spent) || 0, Number(data.uses.max) || 0) : 0;
    sys.uses = { ...data.uses, spent };
    const acts = foundry.utils.deepClone(data.activities);
    // Keep Wisdom's animation effect linked to its activity
    if ( data.keepEffectLink && item.effects.size ) acts[0].effects = item.effects.map(e => ({ _id: e.id }));
    sys.activities = Object.fromEntries(acts.map((a, i) => [a._id, { sort: (i + 1) * 100000, ...a }]));
    return sys;
  };

  const targets = [];
  for ( const item of game.items ) if ( FRAGMENTS[item.name] ) targets.push(item);
  for ( const actor of game.actors ) for ( const item of actor.items ) if ( FRAGMENTS[item.name] ) targets.push(item);

  const log = [];
  for ( const item of targets ) {
    try {
      await item.update({ system: buildSystem(item, FRAGMENTS[item.name]) }, { recursive: false, diff: false });
      log.push(`✅ ${item.parent ? item.parent.name + " → " : "[World] "}${item.name}`);
    } catch (err) {
      console.error(err);
      log.push(`❌ ${item.parent ? item.parent.name + " → " : "[World] "}${item.name}: ${err.message}`);
    }
  }

  const missing = Object.keys(FRAGMENTS).filter(n => !game.items.getName(n));
  ChatMessage.create({
    whisper: [game.user.id],
    content: `<h3>Fragment rebalance</h3><p>${log.join("<br>")}</p>`
      + (missing.length ? `<p>⚠️ ไม่พบใน World Items: ${missing.join(", ")}</p>` : "")
  });
  ui.notifications.info(`Fragment rebalance: updated ${log.filter(l => l.startsWith("✅")).length}/${targets.length} items.`);
})();
