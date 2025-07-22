'use client'

import { useEffect, useState } from "react";
import PickCard from "./components/PickCard";
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
        return (
        <PickCard
        key={p.user.userId}
        {...p}       
        />
      )
      })}
    </div>
    </>
  )
}