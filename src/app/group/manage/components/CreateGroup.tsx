"use client"

import { createGroup, CreateGroupResult } from "@/src/app/api/group/actions";
import { Button } from "@/src/components/ui/Button";
import { Fieldset, Input, Label, Legend, Select } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";

export default function CreateGroup() {
  const { data: session, update } = useSession()
  const [time, setTime] = useState("");
  const handleTimeChange = (event: any) => {
    setTime(event.target.value);
  }

  const [state, formAction, isPending] = useActionState<CreateGroupResult | undefined, FormData>(
    async(_prev, formData) => {
      const response = await createGroup(_prev, formData);

      if (response.success && response.groupId) {
        update({trigger: "update"})
      }

      return response
    }, 
    { success: false }
  );

  return (
    <>
      <form action={formAction}>
        <Fieldset>
          <Legend>Create Group</Legend>
          <Label>
            Name
            <Input 
              name="groupName" 
              id="groupName"
              type="text" 
            />
          </Label>

          <Label>
            Season Length (Theme Picks)
            <Input 
              type="number" 
              id="seasonLength" 
              name="seasonLength" 
              min="4" 
              max="100" 
              defaultValue={24}
            />
          </Label>

          <Legend>Theme Info</Legend>
          <Label>
            Length (weeks)
            <Input 
              type="number" 
              id="themeLengthWeeks" 
              name="themeLengthWeeks" 
              min="1" 
              max="4" 
              defaultValue={1}
            />
          </Label>

          <Label>
            End Day
            <Select 
              name="endDayOfWeek" 
              id="endDayOfWeek"
              aria-label="End Day"
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Select>
          </Label>

          <Label>
            End Time
            <Input 
              aria-label="Time" 
              type="time" 
              name="endTime"
              id="endTime"
              onChange={handleTimeChange}
              value={time}
            />           
          </Label>
        </Fieldset>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  )
}