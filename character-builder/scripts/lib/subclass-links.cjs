// Shared deep-link resolution for "class + subclass name" -> a real 5e.tools
// (or homebrew doc) URL, backed by src/data/classes.json (the gacha box roll
// table — each item there carries a real link even though this file's own
// job is just the box roll). Used by both generate-class-subclass-index.cjs
// and generate-subclass-overview-tier-list.cjs so the two generated docs
// link out identically instead of drifting apart.
const fs = require('fs');

// Keyed case-insensitively since casing has drifted between datasets here
// and there (e.g. "the Totem Warrior" vs "The Totem Warrior").
function buildSubclassLinkMap(classesJsonPath) {
  const map = new Map();
  const boxes = JSON.parse(fs.readFileSync(classesJsonPath, 'utf8'));
  for (const box of boxes) {
    for (const item of box.items || []) {
      if (item.group && item.name && item.link) {
        map.set(`${item.group.trim().toLowerCase()}|${item.name.trim().toLowerCase()}`, item.link);
      }
    }
  }
  return map;
}

// Not every subclass has a matching entry in classes.json (that file only
// tracks what's been added to the gacha box roll) — fall back to a 5e.tools
// search link so every row is still clickable instead of leaving some as
// plain text.
function resolveSubclassLink(className, subclassName, linkMap) {
  const key = `${className.trim().toLowerCase()}|${subclassName.trim().toLowerCase()}`;
  return linkMap.get(key) || `https://5e.tools/search.html?q=${encodeURIComponent(subclassName)}`;
}

module.exports = { buildSubclassLinkMap, resolveSubclassLink };
