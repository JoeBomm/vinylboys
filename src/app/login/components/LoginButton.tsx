'use client'

import { useRouter } from "next/navigation";

export default function LoginButton() {

  const router = useRouter()

  async function handleLogin() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username: 'userName', password: 'password' }),
      credentials: 'include',
    })
    if (res.ok) {
      router.push('/');
    } else {
      alert('Login failed');
    }
  }

  return ( 
    <button 
      className="px-2 border"
      onClick={handleLogin}>Log In</button>
  );
}