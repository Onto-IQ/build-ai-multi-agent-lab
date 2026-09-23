import { describe, it, expect } from 'vitest';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Lab tests — expected RED on a fresh template.
 * Lab 05 implements insertContact / guestbook helpers so these pass.
 */
describe('lab05 api persistence', () => {
  const dataDir = join(process.cwd(), 'data', 'vitest-lab');

  it('insertContact persists a row', async () => {
    process.env.DATA_DIR = dataDir;
    rmSync(dataDir, { recursive: true, force: true });
    mkdirSync(dataDir, { recursive: true });
    const { insertContact, getDb } = await import('../../src/lib/db');
    // Force re-init by dynamic import after env set — module may cache; call getDb first
    getDb();
    const row = insertContact({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello from lab test',
    });
    expect(row.id).toBeGreaterThan(0);
    expect(row.email).toBe('ada@example.com');
  });

  it('guestbook list/insert roundtrip', async () => {
    process.env.DATA_DIR = dataDir;
    const { insertGuestbook, listGuestbook } = await import('../../src/lib/db');
    insertGuestbook({ name: 'Bob', message: 'Nice site' });
    const rows = listGuestbook();
    expect(rows.some((r) => r.name === 'Bob')).toBe(true);
  });
});
