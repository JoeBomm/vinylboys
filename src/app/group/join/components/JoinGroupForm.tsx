'use client'

import { joinGroup } from "@/src/app/api/group/actions";
import { Button } from "@/src/components/ui/Button";
import { Input, Label } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

export function JoinGroupForm({ initialCode }: { initialCode?: string}) {
  const [code, setCode] = useState(initialCode || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession()

  async function handleSubmit(e: React.FormEvent)  {

    e.preventDefault();

    if (!code.trim()) {
      setError('Please enter a code');
      return;
    }

    setLoading(true);
    setError('');

    const result = await joinGroup(code.trim());

    if (result.success) {
      await update({trigger: "update"});
      router.refresh();
      router.push('/group');
    } else {
      setError(result.error || 'Failed to join group');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter group code"
          disabled={loading}
          required
        />
      </div>

      {error && (
        <div role="alert" className="text-red-500">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading || !code.trim()}>
        {loading ? 'Joining...': 'Join Group'}
      </Button>
    </form>
  )

}