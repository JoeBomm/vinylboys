'use client'

import { useState } from "react"
import { PickDto } from "../model"
import { Button } from "@/components/ui/button"
import PickInput from "./PickInput"

export default function PickCard(pick: PickDto) {
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
          || (pick.user.userName === "Joe" && 
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