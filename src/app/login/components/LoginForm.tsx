"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Fieldset, Label, Input } from "@headlessui/react"
import { Button } from "@/src/components/ui/Button"
import CreateAccountDialog from "./CreateAccountDialog"
import { LoginResult, validateLogin } from "../../api/login/actions"
import { getPendingGroupCode } from "../../api/auth/actions"

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  let [createAccountIsOpen, setIsOpen] = useState(false)
    const [state, setState] = useState<LoginResult | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const validation = await validateLogin(formData)
    if (!validation.success) {
      setState(validation)
      return
    }

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    })

    if (result?.error) {
      setState({
        success: false,
        errors: { general: ["Invalid email or password"] },
      })
    } else if (result?.ok) {
      const pendingCode = await getPendingGroupCode();
      router.push(pendingCode ? `/group/join/${pendingCode}` : '/pick');
    } else {
      router.push("/")
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      handleSubmit(formData)
    }}>
      <Fieldset>
       <Label>
         Email
         <Input 
           className="pl-2 border-b"
           name="email" 
           type="text"
           placeholder="email@website.com"
         />
         {state?.errors?.email?.map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}
       </Label>
       <Label>
         Password
         <Input 
           className="pl-2 mb-2 border-b"
           name="password" 
           type="password" 
           placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
         />
         {state?.errors?.password?.map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}
       </Label>
       </Fieldset>
       <Button type="submit" className="mx-2">Sign In</Button>
       <Button onClick={() => setIsOpen(true)} className="mx-2">Create Account</Button>
      <CreateAccountDialog isOpen={createAccountIsOpen} onClose={() => setIsOpen(false)} />
      {error && <p className="text-red-500">{error}</p>}
      {state?.errors?.general?.map((err, i) => (
          <p key={i} className="text-red-500 text-sm">{err}</p>
        ))}
    </form>
  )
}
