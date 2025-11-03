// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
    
  // Check if this is a join page with a code
  const joinMatch = pathname.match(/^\/group\/join\/(.+)$/);
  
  if (joinMatch) {
    const code = joinMatch[1];
    
    // Check for session cookie
    const sessionToken = request.cookies.get('authjs.session-token')
        
    if (!sessionToken) {
      // set cookie and redirect if no session
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('pending_group_code', code, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60
      });
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/group/join/:path*',
  ],
};