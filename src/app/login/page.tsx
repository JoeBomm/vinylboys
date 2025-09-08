import { signIn } from "@/auth";
import { Fieldset, Input, Label } from "@headlessui/react";
import { Button } from "@/src/components/ui/button";
import LoginForm from "./components/LoginForm";

export default function Login() {

  return (
    <>
      <LoginForm/>
    </>
    // <form
    //   action={async (formData) => {
    //     "use server"
    //     try {
    //       await signIn("credentials", formData)
    //     } catch (signInError) {
    //       console.log("error!")
    //     }
    //   }}
    // >
    //   <Fieldset>
    //   <Label>
    //     Email
    //     <Input 
    //       className="pl-2"
    //       name="email" 
    //       type="email" 
    //     />
    //   </Label>
    //   <Label>
    //     Password
    //     <Input 
    //       className="pl-2"
    //       name="password" 
    //       type="text" 
    //     />
    //   </Label>
    //   </Fieldset>
    //   <Button type="submit">Sign In</Button>
    // </form>
  )
}