'use server';

import { withUser } from '@/src/lib/api/withUser';
import { db } from '@/src/lib/db';
import { Session } from 'next-auth';
import { cookies } from 'next/headers';

export const submitTheme = withUser(async (session: Session, formData: FormData) => {
  const themeName = formData.get('themeName') as string;
  const themeDescription = formData.get('themeDescription') as string;

  const insertTheme = db.prepare(`
INSERT INTO [Theme] ([Name], [Description], [UserId])
VALUES(?, ?, ?)`);

  const themeResult = insertTheme.run(themeName, themeDescription, session.user.id)
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

  insertGroupTheme.run(themeId, session.user.id, session.user.groupId);
});

export const submitPick = withUser(async (session: Session, formData: FormData) => {  

  const groupThemeId = Number((await cookies()).get("groupThemeId")?.value);

  if (!groupThemeId) throw new Error("Missing groupThemeId");
  
  const pickArtist = formData.get('pickArtist') as string;
  const pickAlbumName = formData.get('pickAlbumName') as string;
  const pickYear = Number(formData.get('pickYear') as string);
  const pickLink = formData.get('pickLink') as string;
  const pickNotes = formData.get('pickNotes') as string;


  const insertPick = db.prepare(`
INSERT INTO [Pick] (UserID, GroupThemeId, Artist, AlbumName, Year, SpotifyUrl, Note)
VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

  insertPick.run(
    session.user.id, 
    groupThemeId, 
    pickArtist, 
    pickAlbumName, 
    pickYear, 
    pickLink, 
    pickNotes
  );
})


