'use client'

import { useEffect, useState } from "react";
import PickCard, { PickCardPickProps, PickCardProps, UserUiData } from "./components/PickCard";
import { PickDto } from "./model";

export interface PickProps {
  className?: string,
  activeUserId: number
}

export default function Pick(props: PickProps) {
  const [picks, setPicks] = useState<PickDto[]>([]);

  useEffect(() => {
    const userId = props.activeUserId
    fetch(`/api/pick?activeUserId=${userId}`)
      .then(res => res.json())
      .then((data: PickDto[]) => setPicks(data))

      console.log(picks)
  }, [props.activeUserId])

  
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