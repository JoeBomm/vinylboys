import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login/page";
import { verifyJwt } from "@/src/lib/auth/jwt";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  // const cookieStore = await cookies();

  // const jwt = cookieStore.get('auth_token')?.value;

  if (session) {
    // const verified = await verifyJwt(jwt);

    // if (verified && (verified.exp && verified.exp < Date.now()))
    // {
    redirect('/pick')
    // }
  }
  return (
    <>
      <Login />
    </>
  )  
}