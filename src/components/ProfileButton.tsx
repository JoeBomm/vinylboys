"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import LogOutButton from "../app/login/components/LogOutButton";

interface ProfileButtonProps {
  initialSession: Session | null;
}

function ProfileButtonInner() {
  const { data: session } = useSession();

  const authedOptions = (
    <>
      <a href="">Settings</a>
      <LogOutButton />
    </>
  );

  const noAuthOptions = (
    <>
      <a href="">Login</a>
      <a href="">Create Account</a>
    </>
  );

  const panelOptions = session ? authedOptions : noAuthOptions;

  return (
    <Popover className="px-5 relative">
      <PopoverButton className="cursor-pointer">Profile</PopoverButton>
      <PopoverPanel className="absolute flex flex-col bg-opacity-100 bg-[var(--background)] p-3 border-x border-b mt-3">
        {panelOptions}
      </PopoverPanel>
    </Popover>
  );
}

export default function ProfileButton({ initialSession }: ProfileButtonProps) {
  return (
    <SessionProvider session={initialSession}>
      <ProfileButtonInner />
    </SessionProvider>
  );
}
