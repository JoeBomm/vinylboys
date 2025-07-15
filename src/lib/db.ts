import Database from 'better-sqlite3'
import path from 'path'


const dbPath = path.resolve(process.cwd(), 'data', 'app.db')

export const db = new Database(dbPath)

// Ensure schema exists (example: hello table)
db.exec(`
  CREATE TABLE IF NOT EXISTS hello (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`)