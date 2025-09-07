"use client";
import { useEffect } from "react";

export default function SetGroupThemeIdCookie({ groupThemeId }: { groupThemeId: string | null }) {

  if (groupThemeId == null) return
  useEffect(() => {
    fetch(`/set-context?groupThemeId=${groupThemeId}`);
  }, [groupThemeId]);

  return null;
}
