import { NextRequest } from 'next/server';
import { verifyJwt } from './jwt';

export async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies?.get('auth_token')?.value;

  if (!token) throw new Error('Unauthorized');

  const payload = await verifyJwt(token);
  if (!payload) throw new Error('Unauthorized');
  return payload;
}
