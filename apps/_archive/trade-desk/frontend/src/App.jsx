import { useEffect, useState } from 'react'

const emptyPrices = [
  { symbol: 'BTC', price: null, source: 'empty' },
  { symbol: 'ETH', price: null, source: 'empty' },
  { symbol: 'SOL', price: null, source: 'empty' },
]

export default function App() {
  const [prices, setPrices] = useState(emptyPrices)
  const [portfolio, setPortfolio] = useState({ usdt: null, positions: [], markToMarket: null })
  const [orders, setOrders] = useState([])
  const [symbol, setSymbol] = useState('BTC')
  const [side, setSide] = useState('buy')
  const [amount, setAmount] = useState('0.001')
  const [status, setStatus] = useState('starter — แผงยังว่าง รอ Lab เติม')
  const [error, setError] = useState('')

  async function refresh() {
    try {
      const [p, pf, o] = await Promise.all([
        fetch('/api/prices').then((r) => (r.ok ? r.json() : Promise.reject(r))),
        fetch('/api/portfolio').then((r) => (r.ok ? r.json() : Promise.reject(r))),
        fetch('/api/orders').then((r) => (r.ok ? r.json() : Promise.reject(r))),
      ])
      setPrices(p.prices ?? emptyPrices)
      setPortfolio(pf)
      setOrders(o.orders ?? [])
      // Lab 01: แยก live / fixture / error ให้ผู้ใช้อ่านชัด — ตอนนี้จงใจไม่ map โหมด
      setStatus('starter — แผงยังว่าง รอ Lab เติม')
      setError('')
    } catch {
      setError('backend ยังไม่พร้อมหรือ API ยังว่าง — เริ่ม backend แล้วทำ Lab 01–02')
    }
  }

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 8000)
    return () => clearInterval(t)
  }, [])

  async function submitOrder(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, side, amount: Number(amount) }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'order failed')
      await refresh()
    } catch (err) {
      setError(err.message || 'ยังส่งออเดอร์ไม่ได้ — Lab ต้องเติม endpoint')
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Paper only</p>
          <h1 className="text-3xl font-semibold">Crypto Trade Desk</h1>
          <p className="text-slate-400 text-sm">ไม่ส่งออเดอร์จริง · ไม่ขอ API key เทรด</p>
        </div>
        <div className="text-right text-sm">
          <div className="text-slate-400">สถานะฟีด</div>
          <div className="font-mono text-slate-500">{status}</div>
        </div>
      </header>

      {error && (
        <div className="rounded-lg border border-amber-700/50 bg-amber-950/40 px-4 py-3 text-amber-100 text-sm">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        {prices.map((row) => (
          <div key={row.symbol} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="text-slate-400 text-sm">{row.symbol}/USDT</div>
            <div className="mt-2 text-2xl font-mono">
              {row.price == null ? '—' : Number(row.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <div className="mt-1 text-xs text-slate-500">{row.source ?? 'pending'}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={submitOrder} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <h2 className="text-lg font-medium">Order ticket</h2>
          <p className="text-xs text-slate-500">แผงนี้มีโครงแล้ว — Lab จะต่อ backend ให้ส่ง paper order ได้</p>
          <label className="block text-sm">
            Symbol
            <select className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              <option>BTC</option>
              <option>ETH</option>
              <option>SOL</option>
            </select>
          </label>
          <label className="block text-sm">
            Side
            <select className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2" value={side} onChange={(e) => setSide(e.target.value)}>
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
          </label>
          <label className="block text-sm">
            Amount
            <input className="mt-1 w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 font-mono" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <button type="submit" className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-2 font-medium">
            Place paper order
          </button>
        </form>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <h2 className="text-lg font-medium">Portfolio</h2>
          <div className="font-mono text-2xl">
            {portfolio.usdt == null ? '—' : `${Number(portfolio.usdt).toLocaleString()} USDT`}
          </div>
          <div className="text-sm text-slate-400">
            Mark-to-market:{' '}
            <span className="font-mono text-slate-200">
              {portfolio.markToMarket == null ? '—' : Number(portfolio.markToMarket).toLocaleString()}
            </span>
          </div>
          <ul className="text-sm space-y-1">
            {(portfolio.positions ?? []).length === 0 && <li className="text-slate-500">ยังไม่มี position</li>}
            {(portfolio.positions ?? []).map((pos) => (
              <li key={pos.symbol} className="font-mono flex justify-between border-b border-slate-800 py-1">
                <span>{pos.symbol}</span>
                <span>{pos.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-lg font-medium mb-3">Order history</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead className="text-slate-400 text-left">
              <tr>
                <th className="py-2">Time</th>
                <th>Side</th>
                <th>Symbol</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-500">
                    ยังไม่มีออเดอร์ — Lab จะเติมเมื่อ ledger พร้อม
                  </td>
                </tr>
              )}
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-slate-800">
                  <td className="py-2">{o.at ?? '—'}</td>
                  <td className={o.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}>{o.side}</td>
                  <td>{o.symbol}</td>
                  <td>{o.amount}</td>
                  <td>{o.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
