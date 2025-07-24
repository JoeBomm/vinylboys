import { db } from "@/lib/db";
import PickCard from "./components/PickCard";
import { PickDto, PickReadModel, toPickDtos } from "./model";
import { getUser } from "@/lib/auth/getUser";

export default async function Pick() {
  
  const user = await getUser();
  
  const picks = getPicks(user.userId);

  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto gap-4 flex">
          {picks.map((p) => {
            return (
            <PickCard
            key={p.user.userId}
            {...p}       
            />
          )})}
        </div>
      </div>
    </>
  )
}

const getPicks = ( activeUserId: string ) : PickDto[] => {
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
  return toPickDtos(pickData)
}