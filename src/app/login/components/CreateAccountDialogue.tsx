'use client'

import { Button } from "@/src/components/ui/button";
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { createAccount } from "../../api/login/action";
import { useState } from "react";

export default function CreateAccountDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);

    const result = await createAccount(formData);

    if (!result) return;

    if (!result.success) {
      setErrors(result.errors ?? {});
      return;
    }
    
  return(
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-soft-black p-12">
          <DialogTitle className="font-bold">Create an account</DialogTitle>
          <form action={handleSubmit}>
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
          </form>
        </DialogPanel>
        </div>
    </Dialog>
)}