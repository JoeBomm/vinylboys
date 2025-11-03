'use server';

import { cookies } from 'next/headers';

export async function getPendingGroupCode() {
  const cookieStore = await cookies();
  return cookieStore.get('pending_group_code')?.value || null;
}