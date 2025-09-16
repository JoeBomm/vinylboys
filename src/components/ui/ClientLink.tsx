"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

interface ClientLinkProps {
  initialSession: Session | null;
  placeholder: ReactNode;
}

function ClientLinkInner({ placeholder }: { placeholder: ReactNode }) {
  const { data: session } = useSession();
  return <>{session ? placeholder : null}</>;
}

export default function ClientLink({ initialSession, placeholder }: ClientLinkProps) {
  return (
    <SessionProvider session={initialSession}>
      <ClientLinkInner placeholder={placeholder} />
    </SessionProvider>
  );
}
