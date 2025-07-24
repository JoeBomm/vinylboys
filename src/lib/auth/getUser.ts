import { NextRequest } from 'next/server';
import { verifyJwt } from './jwt';
import { cookies } from 'next/headers';

export async function getUser(req: NextRequest | null = null) {
  var token: string | undefined;
  
  token = !!!req 
    ? (await cookies()).get('auth_token')?.value 
    : req.cookies?.get('auth_token')?.value;

  if (!token) throw new Error('Unauthorized');

  const payload = await verifyJwt(token);
  if (!payload) throw new Error('Unauthorized');
  return payload;
}
