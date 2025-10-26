'use client'

import { useState } from "react"
import { PickDto } from "../model"
import { Button } from "@/src/components/ui/Button"
import PickInput from "./PickInput"

interface PickCardProps {
  pick: PickDto
  activeUserId: string
}

export default function PickCard({pick, activeUserId}: PickCardProps) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="size-[10rem] p-2 border">
        <div style={{ backgroundColor: pick.user.color}} className="text-soft-black">{pick.user.userName}</div>
        {(pick.pickId && <div>
            <div>{pick.artist}</div>
            <div>{pick.albumName}</div>
            <div>{pick.year}</div>
            <div><a href={pick.spotifyUrl} target="_blank" rel="noreferrer">Spotify</a></div>
            <div>Notes: {pick.note}</div>
          </div>)
          /* not strict equals because
          pick.user.userId is number here, activeUserId is string
          Looking at the stack where pick.user.userId comes from, at no point
          should it be a number, but I don't want to spend time digging into it
          further for minimal payoff, curious but not worth it.
          */
          || (pick.user.userId == activeUserId && 
            <div>
              <Button onClick={() => setIsOpen(true)}>Pick</Button>
              <PickInput isOpen={isOpen} onClose={() => setIsOpen(false)}></PickInput>
            </div>
                ) // mock active user zero state
          || <div>This dang ol' boy ain't picked!</div>
        }
      </div>
    </>
  )
}