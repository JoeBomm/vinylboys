import { PickReadModel, toPickDtos } from '@/src/app/pick/model';
import { withUser } from '@/src/lib/api/withUser';
import { db } from '@/src/lib/db'
import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export interface GetPicksQuery {
  activeUserId: number
}

export const GET = withUser(async (session: Session, req: NextRequest) => {  

  const activeUserId = session.user.id;

  const query = `
SELECT 
  gm.[UserId]
  ,u.[UserName]
  ,u.[HexColor]
  ,p.[Id] PickId
  ,p.[AlbumName]
  ,p.[Artist]
  ,p.[Year]
  ,p.[SpotifyUrl]
  ,p.[Note]
  ,t.[Name] ThemeName
FROM [GroupMember] gm
JOIN [User] u ON u.[Id] = gm.[UserId]
JOIN [GroupTheme] gt ON gt.[GroupId] = gm.[GroupId]
LEFT JOIN [Pick] p ON p.[UserId] = gm.[UserId] AND p.[GroupThemeId] = gt.[Id]
JOIN [Theme] t ON t.[Id] = gt.[ThemeId]
WHERE DATETIME('now') < gt.[EndDateUTC]
  AND gm.[GroupId] IN (
    SELECT [GroupId]
    FROM [GroupMember]
    WHERE [UserId] = ?
  )`;

  const pickData = db.prepare(query).all(activeUserId) as PickReadModel[];
  return NextResponse.json(toPickDtos(pickData))
});

export const POST = withUser(async (session: Session, req: NextRequest) => {  

  return NextResponse.json({});
});
