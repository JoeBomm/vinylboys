'use client'

import { submitPick } from "@/src/app/api/pick/actions";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend, Textarea } from "@headlessui/react";

export default function PickInput({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return(
            <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-soft-black p-12">
                    <DialogTitle className="font-bold">Your Pick</DialogTitle>
                    <form action={submitPick}>
                    <Fieldset>
                    <Legend>

                        <Field>
                          <Label htmlFor="pickArtist">Artist</Label>
                          <Input 
                            id="pickArtist"
                            name="pickArtist"
                            className="border-b" 
                            required
                          />
                        </Field>
                        
                        <Field>
                          <Label htmlFor="pickAlbumName">Album</Label>
                          <Input 
                            id="pickAlbumName"
                            name="pickAlbumName"
                            className="border-b" 
                            required
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="pickYear">Year</Label>
                          <Input 
                            id="pickYear"
                            name="pickYear"
                            className="border-b"
                            type="number" 
                            min="1888" 
                            max="2100" 
                            required 
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="pickLink">Link</Label>
                          <Input 
                            id="pickLink"
                            name="pickLink"
                            className="border-b" 
                            type="url"
                            required/>
                        </Field>

                        <Field>
                          <Label htmlFor="pickNotes">Notes</Label>
                          <Textarea
                            id="pickNotes"
                            name="pickNotes"
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
)
}