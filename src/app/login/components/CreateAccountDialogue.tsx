'use client'

import { Button } from "@/src/components/ui/button";
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { createAccount } from "../../api/login/action";
import { useActionState } from "react";

const initialState = {
  message: '',
}

export default function CreateAccountDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [state, formAction] = useActionState(createAccount, initialState)

  return(
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
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
                />
              </Field>

              <Field>
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName"
                  name="displayName"
                  type="text"
                  className="border-b pl-2" 
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="text"
                  className="border-b pl-2" 
                  required
                />
              </Field>
            </Legend>
            </Fieldset>
            <div className="flex gap-4">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={() => onClose()}>Cancel</Button>
            </div>
            {state?.message && <p aria-live="polite">{state.message}</p>}
          </form>
        </DialogPanel>
        </div>
    </Dialog>
)}