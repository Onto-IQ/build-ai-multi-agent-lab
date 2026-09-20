import cors from 'cors'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', '..', '..')
const eventsPath = path.join(root, 'workspace', 'command-center', 'events.jsonl')
const checklistPath = path.join(root, 'workspace', 'command-center', 'checklist.json')
const PORT = Number(process.env.COMMAND_CENTER_PORT || 4181)

function readEvents() {
  try {
    const raw = fs.readFileSync(eventsPath, 'utf8').trim()
    if (!raw) return []
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line)
        } catch {
          return null
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

function readChecklist() {
  try {
    return JSON.parse(fs.readFileSync(checklistPath, 'utf8'))
  } catch {
    return {}
  }
}

async function agentsHint() {
  try {
    const { stdout } = await execFileAsync('claude', ['agents', '--json'], {
      timeout: 4000,
      windowsHide: true,
    })
    const trimmed = stdout.trim()
    if (!trimmed) return 'claude agents --json: (ว่าง — ยังไม่มี background session)'
    return `claude agents --json\n${trimmed.slice(0, 1200)}`
  } catch {
    return 'ยังอ่าน claude agents --json ไม่ได้ในตอนนี้ — เปิด `claude agents` ใน Windows Terminal เอง'
  }
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'command-center' })
})

app.get('/api/state', async (_req, res) => {
  res.json({
    events: readEvents(),
    checklist: readChecklist(),
    agentsHint: await agentsHint(),
  })
})

app.get('/api/events', (_req, res) => {
  res.json({ events: readEvents() })
})

app.get('/api/checklist', (_req, res) => {
  res.json(readChecklist())
})

app.post('/api/events', (req, res) => {
  const event = {
    at: new Date().toISOString(),
    type: req.body?.type || 'note',
    from: req.body?.from || null,
    to: req.body?.to || null,
    summary: req.body?.summary || '',
  }
  fs.mkdirSync(path.dirname(eventsPath), { recursive: true })
  fs.appendFileSync(eventsPath, `${JSON.stringify(event)}\n`)
  res.status(201).json(event)
})

app.post('/api/checklist', (req, res) => {
  const next = { ...readChecklist(), ...(req.body || {}) }
  fs.mkdirSync(path.dirname(checklistPath), { recursive: true })
  fs.writeFileSync(checklistPath, JSON.stringify(next, null, 2))
  res.json(next)
})

app.listen(PORT, () => {
  console.log(`command-center api http://127.0.0.1:${PORT}`)
})
