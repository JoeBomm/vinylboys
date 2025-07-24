import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login/page";

export default async function Home() {
  const jwt = (await cookies()).get('auth_token')?.value;
  
  if (jwt) {
    redirect('/pick')
  }
  return (
    <>
      <Login />
    </>
  )
}
