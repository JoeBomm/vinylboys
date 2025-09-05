'use server';

import { withUser } from '@/lib/api/withUser';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export const submitTheme = withUser(async (user, formData: FormData) => {
  const themeName = formData.get('themeName') as string;
  const themeDescription = formData.get('themeDescription') as string;

  const insertTheme = db.prepare(`
INSERT INTO [Theme] ([Name], [Description], [UserId])
VALUES(?, ?, ?)`);

  const themeResult = insertTheme.run(themeName, themeDescription, user.userId)
  const themeId = themeResult.lastInsertRowid as number;

  const insertGroupTheme = db.prepare(`
INSERT INTO [GroupTheme] ([ThemeId], [UserId], [GroupId], [EndDateUTC])
SELECT 
  ? [ThemeId]
  ,? [UserId]
  ,? [GroupId] 
  ,DATETIME(gt.[EndDateUTC], '+' || g.[ThemeLengthDays] || ' day') [EndDateUtc]
FROM [Group] g
JOIN [GroupTheme] gt ON g.Id = gt.[GroupId]
ORDER BY gt.[EndDateUtc] DESC
LIMIT 1
`);

  insertGroupTheme.run(themeId, user.userId, user.groupId);
});

export const submitPick = withUser(async (user, formData: FormData) => {
  
  const groupThemeId = Number((await cookies()).get("groupThemeId")?.value);

  if (!groupThemeId) throw new Error("Missing groupThemeId");
  
  const pickArtist = formData.get('pickArtist') as string;
  const pickAlbumName = formData.get('pickAlbumName') as string;
  const pickYear = Number(formData.get('pickYear') as string);
  const pickLink = formData.get('pickLink') as string;
  const pickNotes = formData.get('pickNotes') as string;

  console.log({
    userId: user.userId,
    groupThemeId: groupThemeId,
    pickArtist: pickArtist,
    pickAlbumName: pickAlbumName,
    pickYear: pickYear,
    pickLink: pickLink,
    pickNotes: pickNotes,
  })

  const insertPick = db.prepare(`
INSERT INTO [Pick] (UserID, GroupThemeId, Artist, AlbumName, Year, SpotifyUrl, Note)
VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

  insertPick.run(
    user.userId, 
    groupThemeId, 
    pickArtist, 
    pickAlbumName, 
    pickYear, 
    pickLink, 
    pickNotes
  );
})


