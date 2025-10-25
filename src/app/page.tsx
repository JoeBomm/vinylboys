import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {

  const session = await auth()

  if (session?.user) {
    if (session.user.groupId) {
      redirect('/pick')
    }
    return (
      <>
      <p>no groupId</p>
      </>
    )
  }

  return (
    <>
      <div>Welcome to vinylboys</div>
    </>
  )  
}