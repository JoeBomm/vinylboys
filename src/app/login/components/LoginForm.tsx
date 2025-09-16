"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Fieldset, Label, Input } from "@headlessui/react"
import { Button } from "@/src/components/ui/Button"
import CreateAccountDialogue from "./CreateAccountDialogue"

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  let [createAccountIsOpen, setIsOpen] = useState(false)

  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, 
    })

    if (result?.error) {
      setError("Invalid email or password") 
    } else {
      router.push("/pick") 
    }
  }

  return (
    <form action={handleSubmit}>
      <Fieldset>
       <Label>
         Email
         <Input 
           className="pl-2"
           name="email" 
           type="email"
           placeholder="email@website.com"
         />
       </Label>
       <Label>
         Password
         <Input 
           className="pl-2"
           name="password" 
           type="password" 
           placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
         />
       </Label>
       </Fieldset>
       <Button type="submit" className="mx-2">Sign In</Button>
       <Button onClick={() => setIsOpen(true)} className="mx-2">Create Account</Button>
      <CreateAccountDialogue isOpen={createAccountIsOpen} onClose={() => setIsOpen(false)} />
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
