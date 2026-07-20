async function loadJson(relativePath) {
  const res = await fetch(relativePath);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${relativePath}`);
  return res.json();
}

function formatNumber(n) {
  return new Intl.NumberFormat('th-TH').format(n);
}

async function boot() {
  const statusEl = document.getElementById('backend-status');
  const totalEl = document.getElementById('token-total');
  const limitEl = document.getElementById('token-limit');
  const bodyEl = document.getElementById('runs-body');

  try {
    const status = await loadJson('../backend/status.json');
    const ok = status.status === 'ok';
    statusEl.textContent = ok ? `ok · ${status.message}` : `${status.status} · ${status.message || 'no message'}`;
    statusEl.className = `value ${ok ? 'ok' : 'warn'}`;
    limitEl.textContent = status.budget_tokens_limit != null
      ? formatNumber(status.budget_tokens_limit)
      : 'ไม่ระบุ';
  } catch (e) {
    statusEl.textContent = 'อ่าน status.json ไม่ได้';
    statusEl.className = 'value warn';
  }

  try {
    const data = await loadJson('../backend/runs.json');
    const runs = Array.isArray(data.runs) ? data.runs : [];
    const total = runs.reduce((sum, r) => sum + (Number(r.tokens_estimate) || 0), 0);
    totalEl.textContent = formatNumber(total);

    if (runs.length === 0) {
      bodyEl.innerHTML = '<tr><td colspan="4">ยังไม่มีรอบ — ให้ Backend agent เติม runs.json</td></tr>';
      return;
    }

    bodyEl.innerHTML = runs.map((r) => `
      <tr>
        <td>${r.agent || '—'}</td>
        <td>${r.tool || '—'}</td>
        <td>${formatNumber(Number(r.tokens_estimate) || 0)}</td>
        <td>${r.gate_status || '—'}</td>
      </tr>
    `).join('');
  } catch (e) {
    totalEl.textContent = '—';
    bodyEl.innerHTML = '<tr><td colspan="4">อ่าน runs.json ไม่ได้</td></tr>';
  }
}

boot();
