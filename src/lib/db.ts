import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'data', 'app.db')

export const db = new Database(dbPath)