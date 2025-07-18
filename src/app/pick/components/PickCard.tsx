'use client'


import { useEffect } from "react"

export interface UserUiData {
  name: string,
  color: string
}

export interface PickProps {
  artist: string,
  year: number,
  spotifyUrl: string,
  notes?: string
}

export interface PickCardProps {
  user: UserUiData,
  pick?: PickProps
}

export default function PickCard(props: PickCardProps) {


  return (
    <>
      <div className="size-56 p-2 border">
        <div style={{ backgroundColor: props.user.color}} className="text-soft-black">{props.user.name}</div>
        {(props.pick && <div>
            <div>Artist: {props.pick.artist}</div>
            <div>Year: {props.pick.year}</div>
            <div>spotify link: <a href={props.pick.spotifyUrl} target="_blank" rel="noreferrer">URL</a></div>
            <div>Notes: {props.pick.notes}</div>
          </div>)
          || (props.user.name === "Joe" && <div>Click to Pick</div>) // mock active user zero state
          || <div>This dang ol' boy ain't picked!</div>
        }
        
      </div>
    </>
  )
}