import { db } from './db'

const stmt = db.prepare('INSERT INTO hello (name) VALUES (?)');
stmt.run('Hello');
stmt.run('World');
