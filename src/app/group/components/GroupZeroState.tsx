import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

export default function GroupZeroState() {

  return (
    <>
      <div>Zero State</div>
      <Link href="/group/manage">
        <Button>Create a group</Button>
      </Link>
      <Link href="/group/join">
        <Button>Join a Group</Button>
      </Link>
    </>
  )
}