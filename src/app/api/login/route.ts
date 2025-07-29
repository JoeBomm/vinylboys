import { signJwt } from '@/lib/auth/jwt';
import { JwtPayload } from '@/types/jwt';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  // Replace with real auth check
  const jwtPayload: JwtPayload = {userId: '6', role: "admin"};

  console.log(Date.now())
  if (!jwtPayload) {
    return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
  }

  const token = await signJwt(jwtPayload, "1h");
  
  const SEVEN_DAYS = 60 * 60 * 24 * 7;
  
  const res = NextResponse.json({ success: true, token: token });
  
  res.headers.set('Set-Cookie', serialize('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS,
  }));

  return res
}
