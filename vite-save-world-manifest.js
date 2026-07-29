import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WORLD_SETTINGS_DIR = path.resolve(__dirname, 'world-settings')

// worldId comes straight from the request body, so it's restricted to a safe
// slug shape and required to already have a folder — this only ever
// overwrites an existing manifest.json, never creates arbitrary paths.
function isSafeWorldId(worldId) {
  return typeof worldId === 'string' && /^[a-z0-9-]+$/.test(worldId)
}

export function saveWorldManifestPlugin() {
  return {
    name: 'save-world-manifest',
    configureServer(server) {
      server.middlewares.use('/__save-world-manifest', (req, res, next) => {
        if (req.method !== 'POST') return next()
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const { worldId, manifest } = JSON.parse(body)
            if (!isSafeWorldId(worldId)) throw new Error('worldId ไม่ถูกต้อง')
            const dir = path.join(WORLD_SETTINGS_DIR, worldId)
            if (!fs.existsSync(dir)) throw new Error('ไม่พบโฟลเดอร์ world setting นี้')
            fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })
    },
  }
}
