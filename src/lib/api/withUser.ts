import { NextResponse } from 'next/server';
import { getUserIdFromReq } from '../auth/getUserFromReq';


export function withUser(
  handler: (userId: string, req: Request) => Promise<Response | NextResponse>
) {
  return async (req: Request) => {
    const userId = await getUserIdFromReq(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(userId, req);
  };
}
