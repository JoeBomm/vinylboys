'use server';

import { withUser } from '@/lib/api/withUser';
import { db } from '@/lib/db';

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
