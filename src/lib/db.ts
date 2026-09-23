/**
 * SQLite helpers for contact + guestbook.
 * Implemented (Lab 05 / coach run).
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

function requireText(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Invalid ${field}`);
  }
  return value.trim();
}

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const name = requireText(input?.name, 'name');
  const email = requireText(input?.email, 'email');
  const message = requireText(input?.message, 'message');
  if (!email.includes('@')) throw new Error('Invalid email');
  const database = getDb();
  const info = database
    .prepare(
      'INSERT INTO contact_messages (name, email, message) VALUES (@name, @email, @message)',
    )
    .run({ name, email, message });
  const row = database
    .prepare('SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?')
    .get(info.lastInsertRowid) as ContactMessage;
  return row;
}

export function listGuestbook(): GuestbookEntry[] {
  const database = getDb();
  return database
    .prepare(
      'SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC',
    )
    .all() as GuestbookEntry[];
}

export function insertGuestbook(input: {
  name: string;
  message: string;
}): GuestbookEntry {
  const name = requireText(input?.name, 'name');
  const message = requireText(input?.message, 'message');
  const database = getDb();
  const info = database
    .prepare('INSERT INTO guestbook (name, message) VALUES (@name, @message)')
    .run({ name, message });
  return database
    .prepare('SELECT id, name, message, created_at FROM guestbook WHERE id = ?')
    .get(info.lastInsertRowid) as GuestbookEntry;
}
