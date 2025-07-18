'use client'

import { useEffect, useState } from "react";

export default function Hello() {
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.name))

  }, [])

  return (
    <>
      <div>
        {message ? <p>Message: {message} </p> : <p>No Message</p>}
      </div>
    </>
  );
}
