`use client`

import { submitTheme } from "@/src/app/api/pick/actions";
import { Button } from "@/src/components/ui/Button";
import { Field, Fieldset, Input, Label, Legend, Textarea } from "@headlessui/react";

export default function ThemeInput() {
  return (
    <form action={submitTheme} className="space-y-4">
      <div>It's your turn to select a theme</div>

      <Fieldset>
        <Legend>Theme Info</Legend>

          <Field>
            <Label htmlFor="themeName">Name</Label>
            <Input 
              id="themeName"
              name="themeName"
              className="border-b" 
              required
            />
          </Field>

          <Field>
            <Label htmlFor="themeDescription">Description</Label>
            <Textarea 
              id="themeDescription"
              name="themeDescription"
              className="border-b" 
              required
            />
          </Field>

      </Fieldset>

      <div className="flex gap-4">
      <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}