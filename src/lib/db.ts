/**
 * SQLite helpers for contact + guestbook.
 * Lab 05 (OpenCode) implements persistence. Stubs return null until finishe.
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dir = process.env.DATA_DIR || join(process.cwd(), 'data');
  mkdirSync(dir, { recursive: true });
  db = new Database(join(dir, 'site.sqlite'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/** Stub: Lab 05 must implement validation + insert. */
export function insertContact(_input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  throw new Error('NOT_IMPLEMENTED: insertContact — Lab 05 OpenCode');
}

/** Stub: Lab 05 must implement. */
export function listGuestbook(): GuestbookEntry[] {
  throw new Error('NOT_IMPLEMENTED: listGuestbook — Lab 05 OpenCode');
}

/** Stub: Lab 05 must implement. */
export function insertGuestbook(_input: {
  name: string;
  message: string;
}): GuestbookEntry {
  throw new Error('NOT_IMPLEMENTED: insertGuestbook — Lab 05 OpenCode');
}
