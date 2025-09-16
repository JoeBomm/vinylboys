'use client'

import { Button } from "@/src/components/ui/Button";
import { signOut } from "next-auth/react";

export default function LogOutButton() {

  async function handleLogOut() {
      signOut({ callbackUrl: "/" });
  }

  return ( 
    <Button 
      onClick={async () => handleLogOut()}>Log Out</Button>
  );
}