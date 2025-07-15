import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const message = db.prepare('SELECT name FROM hello LIMIT 1').get()
  return NextResponse.json(message)
}