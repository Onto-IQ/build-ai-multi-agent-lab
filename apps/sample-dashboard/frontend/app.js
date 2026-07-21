// Agent Cost Board — frontend logic
// Reads ../backend/status.json and ../backend/runs.json only (no real cloud telemetry).
// Surfaces FE↔BE↔QA disagreements until gate can pass (multi-round lab).

const FETCH_TIMEOUT_MS = 4000;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

function formatNumber(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return '—';
  return new Intl.NumberFormat('th-TH').format(num);
}

async function loadJson(relativePath) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(relativePath, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${relativePath}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function runRow(r) {
  const agent = escapeHtml(r.agent || '—');
  const tool = escapeHtml(r.tool || '—');
  const tokens = escapeHtml(formatNumber(r.tokens_estimate));
  const gate = escapeHtml(r.gate_status || '—');
  return `<tr><td>${agent}</td><td>${tool}</td><td class="num">${tokens}</td><td>${gate}</td></tr>`;
}

function setStatus(value, kind) {
  const el = document.getElementById('backend-status');
  el.textContent = value;
  el.className = `value ${kind === 'ok' ? 'ok' : 'warn'}`;
}

function setConflict(messages) {
  const el = document.getElementById('conflict-banner');
  if (!messages.length) {
    el.classList.remove('is-visible');
    el.textContent = '';
    return;
  }
  el.classList.add('is-visible');
  el.innerHTML = `<strong>ยังไม่พร้อมปล่อยผ่าน</strong> — ทีมต้องจัดรอบถัดไป:<ul>${
    messages.map((m) => `<li>${escapeHtml(m)}</li>`).join('')
  }</ul>`;
}

function collectConflicts(status, runs) {
  const msgs = [];
  if (!status || status.status !== 'ok') {
    msgs.push(`สถานะ Backend ยังไม่ ok (ตอนนี้: ${status?.status ?? 'อ่านไม่ได้'})`);
  }
  if (!status || status.qa_ready !== true) {
    msgs.push('qa_ready ยังไม่ true — QA ยังไม่ยอมรับว่าพร้อม Ship');
  }
  const list = Array.isArray(runs) ? runs : [];
  const total = list.reduce((sum, r) => sum + (Number(r.tokens_estimate) || 0), 0);
  const limit = status && typeof status.budget_tokens_limit === 'number'
    ? status.budget_tokens_limit
    : null;
  if (limit == null) {
    msgs.push('ยังไม่มี budget_tokens_limit ใน status.json — Backend ต้องใส่เพดาน');
  } else if (total > limit && status.budget_exception_ack !== true) {
    msgs.push(`ยอดโทเคน ${formatNumber(total)} เกินเพดาน ${formatNumber(limit)} (ต้องลดรอบ หรือ ack งบกับคน/QA)`);
  }
  const bad = list.filter((r) => {
    const g = String(r.gate_status || '').toLowerCase();
    return g === 'pending' || g === 'fail';
  });
  if (bad.length) {
    msgs.push(`มี ${bad.length} รอบที่ gate_status เป็น pending/fail — Backend/QA ต้องเคลียร์ก่อน PASS`);
  }
  return msgs;
}

async function boot() {
  const totalEl = document.getElementById('token-total');
  const limitEl = document.getElementById('token-limit');
  const bodyEl = document.getElementById('runs-body');

  let status = null;
  let runs = [];

  try {
    status = await loadJson('../backend/status.json');
    const ok = status.status === 'ok';
    const msg = status.message ? ` · ${status.message}` : '';
    setStatus(ok ? `ok${msg}` : `${status.status || 'unknown'}${msg}`, ok ? 'ok' : 'warn');
    limitEl.textContent = status.budget_tokens_limit != null
      ? formatNumber(status.budget_tokens_limit)
      : 'ไม่ระบุ';
  } catch (e) {
    console.error('status.json load failed:', e);
    setStatus('อ่าน status.json ไม่ได้', 'warn');
    limitEl.textContent = '—';
  }

  try {
    const data = await loadJson('../backend/runs.json');
    runs = Array.isArray(data.runs) ? data.runs : [];
    const total = runs.reduce((sum, r) => sum + (Number(r.tokens_estimate) || 0), 0);
    totalEl.textContent = formatNumber(total);

    if (runs.length === 0) {
      bodyEl.innerHTML = '<tr><td colspan="4">ยังไม่มีรอบ — ให้ Backend agent เติม runs.json</td></tr>';
    } else {
      bodyEl.innerHTML = runs.map(runRow).join('');
    }
  } catch (e) {
    console.error('runs.json load failed:', e);
    totalEl.textContent = '—';
    bodyEl.innerHTML = '<tr><td colspan="4">อ่าน runs.json ไม่ได้</td></tr>';
  }

  setConflict(collectConflicts(status, runs));
}

boot();
