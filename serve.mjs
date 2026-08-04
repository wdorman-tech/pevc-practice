// Zero-dependency static server for the built dashboard.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const START_PORT = Number(process.env.PORT) || 5273

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  let path = join(ROOT, normalize(decodeURIComponent(url.pathname)))
  if (!path.startsWith(ROOT)) {
    res.writeHead(403).end('forbidden')
    return
  }
  try {
    const info = await stat(path).catch(() => null)
    if (!info || info.isDirectory()) path = join(ROOT, 'index.html')
    const body = await readFile(path)
    res.writeHead(200, {
      'content-type': TYPES[extname(path)] ?? 'application/octet-stream',
      'cache-control': 'no-cache',
    })
    res.end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
})

function listen(port, attempt = 0) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < 12) listen(port + 1, attempt + 1)
    else throw err
  })
  server.listen(port, () => {
    const address = `http://localhost:${port}`
    console.log(`\n  Ember is live at ${address}\n  Close this window to stop the server.\n`)
    if (process.env.EMBER_OPEN !== '0') {
      import('node:child_process').then(({ execFile }) => execFile('open', [address]))
    }
  })
}

listen(START_PORT)
