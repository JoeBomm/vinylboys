import { redirect } from "next/navigation";
import Login from "./login/page";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    redirect('/pick')
  }

  return (
    <>
      <Login />
    </>
  )  
}