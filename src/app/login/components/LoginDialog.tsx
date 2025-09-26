'use client'

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import LoginForm from "./LoginForm";

export default function LoginDialog({ isOpen, onClose}: 
  {isOpen: boolean; onClose: () => void }) {

    return (
      <Dialog open={isOpen} onClose={() => onClose()}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">

        <DialogPanel className="max-w-lg space-y-4 border bg-soft-black p-12">
          <DialogTitle>Enter your credentials</DialogTitle>
          <LoginForm />
        </DialogPanel>
        </div>
      </Dialog>
    )
  }