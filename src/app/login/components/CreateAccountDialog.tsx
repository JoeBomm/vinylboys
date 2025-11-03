'use client'

import { Button } from "@/src/components/ui/Button";
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { CreateAccountResult, createAccount } from "../../api/login/actions";
import { useActionState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getPendingGroupCode } from "../../api/auth/actions";


export default function CreateAccountDialog({ isOpen, onClose }: 
  { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState<CreateAccountResult | undefined, FormData>(
    async (_prev, formData) => {
      return await createAccount(_prev, formData);
    },
    { success: false }
  );

useEffect(() => {
  if (state?.success && state?.credentials) {
    onClose();
    
    signIn("credentials", {
      email: state.credentials.email,
      password: state.credentials.password,
      redirect: false,
    }).then(async (result) => {
      if (result?.ok) {
        // Check for pending group code
        const pendingCode = await getPendingGroupCode();
        router.push(pendingCode ? `/group/join/${pendingCode}` : '/');

      } else if (result?.error) {
        console.error('Sign in failed after account creation:', result.error);
      }
    });
  }
}, [state, onClose, router]);

  return(
    <Dialog open={isOpen} onClose={() => onClose()} className="relative">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-soft-black p-12">
          <DialogTitle className="font-bold">Create an account</DialogTitle>
          <form action={formAction}>
            <Fieldset>
            <Legend>

              <Field>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  className="border-b pl-2" 
                  required
                  defaultValue={state?.values?.email ?? ""}
                />
                {state?.errors?.email?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm">{err}</p>
                ))}
              </Field>

              <Field>
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName"
                  name="displayName"
                  type="text"
                  className="border-b pl-2" 
                  required
                  defaultValue={state?.values?.displayName ?? ""}
                />
                {state?.errors?.displayName?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm">{err}</p>
                ))}
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="text"
                  className="border-b pl-2" 
                  required
                  defaultValue={state?.values?.password ?? ""}
                />
              {state?.errors?.password?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm">{err}</p>
              ))}
              </Field>
            </Legend>
            </Fieldset>
            <div className="flex gap-4">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={() => onClose()}>Cancel</Button>
            </div>
          </form>
        </DialogPanel>
        </div>
    </Dialog>
)}