import { parse } from 'cookie';
import { verifyJwt } from './jwt';

export async function getUserIdFromReq(req: Request): Promise<string | null> {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const cookies = parse(cookieHeader);
  const token = cookies.auth_token;
  if (!token) return null;

  try {
    const payload = await verifyJwt(token);
    return payload?.userId ?? null;
  } catch {
    return null;
  }
}
