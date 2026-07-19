// One-off backfill — adds a `link` field to existing campaigns.json entries
// that exact-match a name in the normalized 5etools adventure/book data.
// Campaigns with no exact match are left untouched (homebrew, custom names).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CAMPAIGNS_PATH = path.join(ROOT, 'src/data/campaigns.json')
const DATA_DIR = path.join(ROOT, 'public/data/5etools')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function normName(s) {
  return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ')
}
function buildLink(entry) {
  return `https://5e.tools/${entry.page}.html#${entry.id.toLowerCase()}`
}

function buildIndex() {
  const idx = new Map()
  for (const a of readJson(path.join(DATA_DIR, 'adventure.json'))) {
    idx.set(normName(a.name), { id: a.id, page: 'adventure' })
  }
  for (const b of readJson(path.join(DATA_DIR, 'book.json'))) {
    const key = normName(b.name)
    if (!idx.has(key)) idx.set(key, { id: b.id, page: 'book' })
  }
  return idx
}

const idx = buildIndex()
const campaigns = readJson(CAMPAIGNS_PATH)

let matched = 0
let unmatched = 0
for (const campaign of campaigns) {
  const entry = idx.get(normName(campaign.name))
  if (!entry) {
    unmatched++
    continue
  }
  campaign.link = buildLink(entry)
  matched++
}

fs.writeFileSync(CAMPAIGNS_PATH, JSON.stringify(campaigns, null, 2) + '\n')
console.log(`Backfilled links: ${matched} matched, ${unmatched} unmatched (left without link).`)
