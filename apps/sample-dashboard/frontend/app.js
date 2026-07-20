async function loadStatus() {
  const el = document.getElementById('status');
  try {
    const res = await fetch('../backend/status.json');
    const data = await res.json();
    el.textContent = `Backend status: ${data.status} · ${data.message}`;
  } catch (e) {
    el.textContent = 'Backend status: unavailable (expected until BE agent writes status.json)';
  }
}
loadStatus();
