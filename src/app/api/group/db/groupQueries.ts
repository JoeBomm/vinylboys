import { db } from "@/src/lib/db";

export const groupDetailsQuery = db.prepare(`
WITH NextThemePicker AS (
  SELECT userId, groupId
  FROM main.[PickLog]
  WHERE [GroupId] = @groupId
  ORDER BY [LastPickedAtUtc] ASC
  LIMIT 1
),
CurrentGroupTheme AS (
  SELECT [GroupId], [EndDateUtc], [UserId], [ThemeId]
  FROM main.[GroupTheme]
  WHERE [GroupId] = @groupId
  ORDER BY [EndDateUtc] DESC
  LIMIT 1
)
SELECT
  g.[Name] AS groupName,
  t.[Name] AS currentThemeName,
  t.[Description] AS currentThemeDescription,
  gt.[EndDateUtc] AS themeEndDateUtc,
  u.[UserName] AS themePickUserName,
  pu.[UserName] AS nextThemePickUserName
FROM NextThemePicker np
JOIN main.[Group] g ON g.[Id] = np.[GroupId]
JOIN [CurrentGroupTheme] gt ON gt.[GroupId] = g.[Id]
JOIN main.[Theme] t ON t.[Id] = gt.[ThemeId]
JOIN main.[User] u ON u.[Id] = gt.[UserId]
JOIN main.[User] pu ON pu.[Id] = np.[UserId];`);

export const groupMembersQuery = db.prepare(`
SELECT 
  u.[Id] AS userId
  ,u.[UserName] AS userName
  ,u.[HexColor] AS color
FROM main.[GroupMember] m
JOIN main.[User] u on m.[UserId] = u.[Id]
WHERE m.[GroupId] = @groupId
AND u.[IsActive] = 1;`)