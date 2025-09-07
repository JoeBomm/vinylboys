'use client'

import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {

  const router = useRouter()

  async function handleLogOut() {
      signOut({ callbackUrl: "/" });
  }

  return ( 
    <Button 
      onClick={async () => handleLogOut()}>Log Out</Button>
  );
}