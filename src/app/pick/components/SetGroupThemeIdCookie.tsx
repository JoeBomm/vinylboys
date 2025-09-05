"use client";
import { useEffect } from "react";

export default function SetGroupThemeIdCookie({ groupThemeId }: { groupThemeId: string }) {
  useEffect(() => {
    fetch(`/set-context?groupThemeId=${groupThemeId}`);
  }, [groupThemeId]);

  return null;
}
