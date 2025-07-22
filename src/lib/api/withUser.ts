import { NextRequest } from "next/server";
import { getUserFromRequest } from "../auth/getUserFromRequest";
import { JwtPayload } from "@/types/jwt";

type HandlerWithUser = (user: JwtPayload, req: NextRequest) => Promise<Response>;

export function withUser(handler: HandlerWithUser) {
  return async (req: NextRequest) => {
    try {
      const user = await getUserFromRequest(req);
      return handler(user, req);
    } catch {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  };
}