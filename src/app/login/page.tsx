import { signIn } from "@/auth";
import { Fieldset, Input, Label } from "@headlessui/react";
import { Button } from "@/src/components/ui/button";

export default function Login() {

  return (
    <>
    <div>
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <Fieldset>
      <Label>
        Email
        <Input 
          className="pl-2"
          name="email" 
          type="email" 
        />
      </Label>
      <Label>
        Password
        <Input 
          className="pl-2"
          name="password" 
          type="text" 
        />
      </Label>
      </Fieldset>
      <Button type="submit">Sign In</Button>
    </form>
    </div>
    </>
  )
}