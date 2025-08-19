import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login/page";
import { verifyJwt } from "@/lib/auth/jwt";

export default async function Home() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get('auth_token')?.value;

  if (jwt) {
    const verified = await verifyJwt(jwt);

    if (verified && (verified.exp && verified.exp < Date.now()))
    {
      redirect('/pick')
    }
  }
  return (
    <>
      <Login />
    </>
  )  
}