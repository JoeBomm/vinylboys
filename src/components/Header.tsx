import Link from "next/link";
import ProfileButton from "./ProfileButton";
import { auth } from "@/auth";
import ClientLink from "./ui/ClientLink";

export default async function Header() {  
  const session = await auth()

  return (
    <header className="py-3 border-b">
      <nav className="flex">
        <Link href="/" className="px-5">Home</Link>
        <ClientLink 
          initialSession={session} 
          placeholder={<Link href="/pick" className="px-5">Picks</Link>}
        />
        <ClientLink
          initialSession={session}
          placeholder={<Link href="/group">Group</Link>}
        />
        <ProfileButton initialSession = {session}/>
      </nav>
    </header>
  )
}