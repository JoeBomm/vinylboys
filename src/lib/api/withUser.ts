import { NextRequest } from "next/server";
import { getUser } from "../auth/getUser";
import { JwtPayload } from "@/types/jwt";

type HandlerWithUser = (user: JwtPayload, req: NextRequest) => Promise<Response>;

export function withUser(handler: HandlerWithUser) {
  return async (req: NextRequest) => {
    try {
      const user = await getUser(req);
      return handler(user, req);
    } catch {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  };
}