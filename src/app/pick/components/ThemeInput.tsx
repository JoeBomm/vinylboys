`use client`

import { Button } from "@/components/ui/button";
import { Field, Fieldset, Input, Label, Legend, Textarea } from "@headlessui/react";

export default function ThemeInput() {
  return (
    <>
      <div>It's your turn to select a theme</div>
      <Fieldset>
        <Legend>
          <Field>
            <Label>Name</Label>
            <Input className="border-b" required></Input>
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea className="border-b" required></Textarea>
          </Field>
          </Legend>
      </Fieldset>
      <div className="flex gap-4">
      <Button type="submit">Submit</Button>
      </div>
    </>
  )
}

/** TODO Post THEME
 * 
 * 
 Declare @ThemeId NUMBER;

INSERT INTO [Theme] ([Name], [Description], [UserId])
OUTPUT @ThemeId = INSERTED.[Id]
VALUES(?, ?, ?)

INSERT INTO [GroupTheme] ([GroupId], [UserId], [ThemeId], [UserId], [EndDateUTC])
VALUES(?, ?, @ThemeId, ?, ? /*DateADD(?, Group theme length)
 * 
 */