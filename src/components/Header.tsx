import Link from "next/link";
import ProfileButton from "./ProfileButton";
import { auth } from "@/auth";
import ClientLink from "./ui/ClientLink";

export default async function Header() {
  const initialSession = await auth()

  return (
    <header className="py-3 border-b">
      <nav className="flex">
        <Link href="/" className="px-5">Home</Link>
        <ClientLink 
          initialSession={initialSession} 
          placeholder={<Link href="/pick" className="px-5">Pick</Link>}
        />
        <ProfileButton initialSession = {initialSession}/>
      </nav>
    </header>
  )
}