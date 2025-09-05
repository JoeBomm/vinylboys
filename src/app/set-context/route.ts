import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/getUser";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {

  const user = await getUser(req);
  if (!user) return NextResponse.redirect("/login");
  // TODO: Redirect here won't work

  const url = new URL(req.url);
  const groupThemeId = url.searchParams.get("groupThemeId") ?? "";
  
  console.log("groupThemeId", groupThemeId);

  (await cookies()).set({
    name: "groupThemeId",
    value: groupThemeId,
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return new NextResponse();
}
