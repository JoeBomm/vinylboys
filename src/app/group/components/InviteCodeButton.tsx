'use client'

import { Button } from "@/src/components/ui/Button"
import { useState } from "react"
import ShortUniqueId from "short-unique-id"
import { setGroupInviteCode } from "../../api/group/actions"

export default function InviteCodeButton() {
  const [code, setCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  // TODO: set link to env url
  const inviteText = `Join my group on VinylBoys using this link!
  https://localhost:3000/group/join`;
  

  async function handleClick() {
    const uid = new ShortUniqueId({ length: 6 });
    const newCode = uid.randomUUID()
    
    
    if (await setGroupInviteCode(newCode)) {
      setCode(newCode);
      await copyText(newCode);
    }
    else {
      setErrorMessage("Error Creating Group Code")
    }

    await delay(2000)
    setIsCopied(false)
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function copyText(code: string) {
    await navigator.clipboard.writeText(`${inviteText}/${code}`)
    setIsCopied(true);
  }

  return (
    <div className="flex">
      <Button onClick={() => handleClick()} disabled={isCopied}>
        {!isCopied 
          ? "Generate Invite Code"
          : "Invite Link copied to clipboard"}</Button>
      <div className="px-2">{code}</div>
      <div className="text-red-500">{errorMessage}</div>
    </div>
  )

}