"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import LogOutButton from "../app/login/components/LogOutButton";
import CreateAccountDialog from "../app/login/components/CreateAccountDialog";
import { useState } from "react";
import { Button } from "./ui/Button";
import LoginDialog from "../app/login/components/LoginDialog";

interface ProfileButtonProps {
  initialSession: Session | null;
}

function ProfileButtonInner() {
  let [createAccountIsOpen, setCreateAccountIsOpen] = useState(false)
  let [loginIsOpen, setLoginIsOpen] = useState(false)
  const { data: session } = useSession();

  const authedOptions = (
    <>
      <a href="">Settings</a>
      <LogOutButton />
    </>
  );

  const noAuthOptions = (
    <>
      <Button onClick={() => setLoginIsOpen(true)} className="mx-2">Login</Button>
      <LoginDialog isOpen={loginIsOpen} onClose={() => setLoginIsOpen(false)}/>
      <Button onClick={() => setCreateAccountIsOpen(true)} className="mx-2">Create Account</Button>
      <CreateAccountDialog isOpen={createAccountIsOpen} onClose={() => setCreateAccountIsOpen(false)} />
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
