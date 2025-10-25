import { NextRequest } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/auth";

// For route handlers (e.g., GET, POST)
type RouteHandler<T = any> = (session: Session, req: NextRequest) => Promise<T>;

// For server actions (like form submissions)
type ActionHandler<T = any, A extends any[] = any[]> = (session: Session, ...args: A) => Promise<T>;

export function withUser<T>(handler: RouteHandler<T>): (req: NextRequest) => Promise<Response>;
export function withUser<T, A extends any[]>(handler: ActionHandler<T, A>): (...args: A) => Promise<T>;
export function withUser(handler: any) {
  return async (...args: any[]) => {
    const session = await auth();

    if (!session?.user) {
      if (args[0] instanceof NextRequest) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error("Unauthorized");
    }

    return handler(session, ...args);
  };
}


// import { NextRequest } from "next/server";
// import { Session } from "next-auth";
// import { auth } from "@/auth";

// type RouteHandler<T = any> = (session: Session, req: NextRequest) => Promise<T>;
// type ActionHandler<T = any> = (session: Session, ...args: any[]) => Promise<T>;

// export function withUser(handler: RouteHandler): (req: NextRequest) => Promise<Response>;
// export function withUser(handler: ActionHandler): (...args: any[]) => Promise<any>;

// export function withUser(handler: any) {
//   return async (...args: any[]) => {
//     // Get session from NextAuth
//     const session = await auth();

//     if (!session?.user) {
//       // Case 1: Route Handler → first arg is NextRequest
//       if (args[0] instanceof NextRequest) {
//         return new Response(JSON.stringify({ error: "Unauthorized" }), {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         });
//       }
//       // Case 2: Server Action → no NextRequest
//       throw new Error("Unauthorized");
//     }

//     // Pass the session to your handler
//     return handler(session, ...args);
//   };
// }