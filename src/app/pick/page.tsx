'use client'

import { useEffect, useState } from "react";
import PickCard, { PickCardPickProps, UserUiData } from "./components/PickCard";
import { PickDto } from "./model";

export interface PickProps {
  className?: string,
}

export default function Pick(props: PickProps) {
  const [picks, setPicks] = useState<PickDto[]>([]);

  // TODO: Move this login to another page
  useEffect(() => {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username: 'userName', password: 'password' }),
      credentials: 'include',
    })
  }, [])

  useEffect(() => {
    fetch(`/api/pick`)
      .then(res => res.json())
      .then((data: PickDto[]) => setPicks(data))
  }, [])

  
  return (
    <>
    <div className={`${props.className} gap-4 flex`}>
      {picks.map((p) => {
        const user: UserUiData = {
          name: p.User.UserName,
          color: p.User.Color
        }

        const pickCardProps: PickCardPickProps = {
          artist: p.Artist,
          year: p.Year,
          spotifyUrl: p.SpotifyUrl,
          notes: p.Note
        }
        
        return (
        <PickCard
          key={p.User.UserId}
          user={user}
          pick={!!p.PickId ? pickCardProps : undefined}
        />
      )
      })}
    </div>
    </>
  )
}