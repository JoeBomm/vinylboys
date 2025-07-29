import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend, Textarea } from "@headlessui/react";

export default function PickInput({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return(
        <>
            <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-soft-black p-12">
                    <DialogTitle className="font-bold">Your Pick</DialogTitle>
                    <Fieldset>
                    <Legend>
                        <Field>
                        <Label>Artist</Label>
                        <Input className="border-b" required></Input>
                        </Field>
                        <Field>
                        <Label>Album</Label>
                        <Input className="border-b" required></Input>
                        </Field>
                        <Field>
                        <Label>Year</Label>
                        <Input className="border-b"
                            type="number" min="1888" max="2100" required></Input>
                        </Field>
                        <Field>
                        <Label>Link</Label>
                        <Input className="border-b" required></Input>
                        </Field>
                        <Field>
                        <Label>Notes</Label>
                        <Textarea></Textarea>
                        </Field>
                    </Legend>
                    </Fieldset>
                    <div className="flex gap-4">
                    <Button type="submit">Submit</Button>
                    <Button variant="secondary" onClick={() => onClose()}>Cancel</Button>
                    </div>
                </DialogPanel>
                </div>
            </Dialog>
        </>
)
}