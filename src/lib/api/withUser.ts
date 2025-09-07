import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { JwtPayload } from "@/src/types/jwt";
import { verifyJwt } from "../auth/jwt";

type RouteHandler<T = any> = (user: JwtPayload, req: NextRequest) => Promise<T>;
type ActionHandler<T = any> = (user: JwtPayload, ...args: any[]) => Promise<T>;

export function withUser(handler: RouteHandler): (req: NextRequest) => Promise<Response>;
export function withUser(handler: ActionHandler): (...args: any[]) => Promise<any>;

export function withUser(handler: any) {
  return async (...args: any[]) => {
    let token: string | undefined;

    // Case 1: Route Handler → first arg is NextRequest
    if (args[0] instanceof NextRequest) {
      token = args[0].cookies.get("auth_token")?.value;
    } 
    // Case 2: Server Action → no NextRequest, grab cookies()
    else {
      token = (await cookies()).get("auth_token")?.value;
    }

    const user = await verifyJwt(token!);
    if (!user) {
      if (args[0] instanceof NextRequest) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
      throw new Error("Unauthorized"); // in server actions, throw
    }

    return handler(user, ...args);
  };
}
