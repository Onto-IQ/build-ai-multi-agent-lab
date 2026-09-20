import { useEffect, useState } from 'react'

const DONE_WHEN = [
  { id: 'prices', label: 'ราคา BTC / ETH / SOL (live หรือ fixture)' },
  { id: 'wallet', label: 'กระเป๋า paper เริ่มต้น USDT' },
  { id: 'order', label: 'ส่งซื้อ/ขาย paper ได้' },
  { id: 'mtm', label: 'พอร์ต mark-to-market' },
  { id: 'history', label: 'มีประวัติออเดอร์' },
  { id: 'ship', label: 'มี URL สาธารณะจริง' },
]

export default function App() {
  const [events, setEvents] = useState([])
  const [checklist, setChecklist] = useState({})
  const [agentsHint, setAgentsHint] = useState('')
  const [error, setError] = useState('')

  async function refresh() {
    try {
      const res = await fetch('/api/state')
      if (!res.ok) throw new Error('state failed')
      const body = await res.json()
      setEvents(body.events ?? [])
      setChecklist(body.checklist ?? {})
      setAgentsHint(body.agentsHint ?? '')
      setError('')
    } catch {
      setError('Command Center server ยังไม่ขึ้น — รัน npm run server ที่ apps/command-center')
    }
  }

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 4000)
    return () => clearInterval(t)
  }, [])

  const dispatches = events.filter((e) => e.type === 'dispatch')

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="border-b border-zinc-800 pb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Watch layer · thin</p>
        <h1 className="text-3xl font-semibold">Command Center</h1>
        <p className="text-zinc-400 text-sm mt-1">
          จอรวมข้ามเครื่องมือ — ไม่แทนที่ Agent View · คลิกคำแนะนำด้านล่างแล้วเปิด session แท้
        </p>
      </header>

      {error && (
        <div className="rounded-lg border border-amber-700/50 bg-amber-950/40 px-4 py-3 text-amber-100 text-sm">{error}</div>
      )}

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 lg:col-span-2">
          <h2 className="text-lg font-medium mb-2">จอใกล้ (ทำบนเครื่องคุณ)</h2>
          <ol className="list-decimal list-inside text-sm text-zinc-300 space-y-2">
            <li>
              เปิด Windows Terminal แล้วรัน <code className="font-mono text-sky-300">claude agents</code>
            </li>
            <li>ในเซสชัน OpenCode สลับ child session ด้วยปุ่มใน TUI</li>
            <li>อย่าเรนเดอร์แชทปลอมที่นี่ — ฟังคุยที่เครื่องมือจริง</li>
          </ol>
          {agentsHint && <pre className="mt-3 text-xs font-mono text-zinc-500 whitespace-pre-wrap">{agentsHint}</pre>}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
          <h2 className="text-lg font-medium mb-2">เกณฑ์ผ่าน Trade Desk</h2>
          <ul className="space-y-2 text-sm">
            {DONE_WHEN.map((item) => {
              const on = Boolean(checklist[item.id])
              return (
                <li key={item.id} className="flex gap-2 items-start">
                  <span className={on ? 'text-emerald-400' : 'text-zinc-600'}>{on ? '●' : '○'}</span>
                  <span className={on ? 'text-zinc-100' : 'text-zinc-500'}>{item.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
        <h2 className="text-lg font-medium mb-3">ลูกศร CLI ข้ามเครื่องมือ</h2>
        {dispatches.length === 0 ? (
          <p className="text-sm text-zinc-500">ยังไม่มี — Lab 03 จะให้ skill log-dispatch บันทึกที่นี่</p>
        ) : (
          <ul className="space-y-2">
            {dispatches.slice().reverse().map((e, i) => (
              <li key={`${e.at}-${i}`} className="flex flex-wrap gap-2 items-center text-sm font-mono border-b border-zinc-800 py-2">
                <span className="text-zinc-500">{e.at}</span>
                <span className="text-violet-300">{e.from}</span>
                <span className="text-zinc-600">→</span>
                <span className="text-sky-300">{e.to}</span>
                <span className="text-zinc-400">{e.summary}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
        <h2 className="text-lg font-medium mb-3">เส้นเวลาทั้งวัน</h2>
        {events.length === 0 ? (
          <p className="text-sm text-zinc-500">เช้าโล่ง — เมื่อมี dispatch / checklist อัปเดต จะแน่นที่นี่</p>
        ) : (
          <ul className="space-y-2 text-sm font-mono">
            {events.slice().reverse().map((e, i) => (
              <li key={`${e.at}-all-${i}`} className="border-b border-zinc-800 py-2 text-zinc-300">
                <span className="text-zinc-500">{e.at}</span> [{e.type}] {e.summary || e.from || ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
