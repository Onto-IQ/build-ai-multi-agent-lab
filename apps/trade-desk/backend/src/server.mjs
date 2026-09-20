import cors from 'cors'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
const ledgerPath = path.join(dataDir, 'ledger.json')
const fixturePath = path.join(dataDir, 'prices.fixture.json')
const PORT = Number(process.env.TRADE_DESK_PORT || 4180)

const emptyTickers = [
  { symbol: 'BTC', price: null, source: 'empty' },
  { symbol: 'ETH', price: null, source: 'empty' },
  { symbol: 'SOL', price: null, source: 'empty' },
]

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(value, null, 2))
}

/** Lab 02: เรียกตอนต่อกระเป๋า paper */
function ensureLedger() {
  if (!fs.existsSync(ledgerPath)) {
    writeJson(ledgerPath, {
      usdt: 10000,
      positions: [],
      orders: [],
    })
  }
}

/** Lab 02: public feed — ไม่ต้องมี API key */
async function fetchLivePrices() {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
  const res = await fetch(url, { signal: AbortSignal.timeout(4000) })
  if (!res.ok) throw new Error(`coingecko ${res.status}`)
  const body = await res.json()
  return {
    mode: 'live',
    prices: [
      { symbol: 'BTC', price: body.bitcoin?.usd ?? null, source: 'coingecko' },
      { symbol: 'ETH', price: body.ethereum?.usd ?? null, source: 'coingecko' },
      { symbol: 'SOL', price: body.solana?.usd ?? null, source: 'coingecko' },
    ],
  }
}

/** Lab 02: ใช้เมื่อเน็ตพัง — ไฟล์อยู่ที่ data/prices.fixture.json */
function fixturePrices() {
  const fx = readJson(fixturePath, { prices: emptyTickers })
  return { mode: 'fixture', prices: fx.prices }
}

/** Lab 02 / Lab 05: mark-to-market จากราคา + position */
function markToMarket(ledger, prices) {
  const map = Object.fromEntries(prices.map((p) => [p.symbol, p.price ?? 0]))
  const positionsValue = (ledger.positions ?? []).reduce(
    (sum, pos) => sum + Number(pos.qty || 0) * Number(map[pos.symbol] || 0),
    0,
  )
  return Number(ledger.usdt || 0) + positionsValue
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'trade-desk-backend' })
})

// Starter: แผงมีโครง แต่ยังไม่ดึง live/fixture — Lab 02 ต่อจาก fetchLivePrices / fixturePrices
app.get('/api/prices', async (_req, res) => {
  res.json({ mode: 'empty', prices: emptyTickers })
})

// Starter: ยังไม่เปิดกระเป๋า — Lab 02 เรียก ensureLedger แล้วคืน usdt + markToMarket
app.get('/api/portfolio', async (_req, res) => {
  res.json({ usdt: null, positions: [], markToMarket: null })
})

app.get('/api/orders', (_req, res) => {
  res.json({ orders: [] })
})

// Starter: รับ request แต่ยังไม่ลง ledger — Lab 05 เติม paper buy/sell ให้ตอบ 201
app.post('/api/orders', async (_req, res) => {
  res.status(501).json({ error: 'ยังไม่พร้อม — Lab 05 จะเติม paper order' })
})

app.listen(PORT, () => {
  console.log(`trade-desk backend http://127.0.0.1:${PORT}`)
})
