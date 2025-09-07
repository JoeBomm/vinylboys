import { signIn } from "@/auth";
import LoginButton from "./components/LoginButton";
import { Fieldset, Input, Label } from "@headlessui/react";
import { Button } from "@/src/components/ui/button";
import { saltAndHashPassword } from "@/src/utils/password";

export default function Login() {

  // return (
  //   <>
  //     <LoginButton/>
  //   </>
  // )
  return (
    <>
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <Fieldset>
      <Label>
        Email
        <Input name="email" type="email" />
      </Label>
      <Label>
        Password
        <Input name="password" type="text" />
      </Label>
      </Fieldset>
      <Button type="submit">Sign In</Button>
    </form>
    </>
  )
}