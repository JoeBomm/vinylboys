'use server';

import { db } from '@/lib/db';

export async function submitTheme(formData: FormData) {
  const themeName = formData.get('themeName') as string;
  // todo: Get form data, get active UserId from cookie

  db.prepare(
    `DECLARE @ThemeId NUMBER;

INSERT INTO [Theme] ([Name], [Description], [UserId])
OUTPUT @ThemeId = INSERTED.[Id]
VALUES(?, ?, ?)

INSERT INTO [GroupTheme] ([GroupId], [UserId], [ThemeId], [UserId], [EndDateUTC])
SELECT 
  ? [Name]
 ,? [Description]
 ,@ThemeId AS [ThemeId]
 ,? AS [UserId]
 ,DATETIME(gt.[EndDateUTC], '+' || g.[ThemeLengthDays] || ' day') [EndDateUtc]
FROM [Group] g
JOIN [GroupTheme] gt ON g.Id = gt.[GroupId]
ORDER BY gt.[EndDateUtc] DESC
LIMIT 1`
  ).run(themeName);

  // could return a redirect or revalidate cache here
}
