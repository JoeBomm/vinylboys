import { db } from "@/src/lib/db";
import PickCard from "./components/PickCard";
import { PickDto, PickReadModel, toPickDtos } from "./model";
import { getUser } from "@/src/lib/auth/getUser";
import { ThemeDto, ThemeReadModel as ThemeReadModel, toThemeDto } from "../context/model";
import ThemeInput from "./components/ThemeInput";
import { cookies } from "next/headers";
import SetGroupThemeIdCookie from "./components/SetGroupThemeIdCookie";
import { Button } from "@/src/components/ui/Button";

export default async function Pick() {
  
  const user = await getUser();

  if (!!!user.groupId) {
    return (
    <>
    <div className="flex flex-col h-screen items-center justify-center">
      <div>You don't have any groups</div>
      <div>Create or join a group</div>
      <Button>Groups</Button>
    </div>
    </>)
  }
  
  const theme = await getTheme(user.id);

  const groupThemeIdCookie = (await cookies()).get("groupThemeId");

  const setCookieHtml = !groupThemeIdCookie || groupThemeIdCookie.toString() !== theme.GroupThemeId?.toString() ? 
  <SetGroupThemeIdCookie groupThemeId={theme.GroupThemeId !== null ? theme.GroupThemeId.toString() : null} />
  : <></>;
  
  const picks = await getPicks(user.id);
  


  return (
    <>
    { setCookieHtml }
    {!!theme.GroupThemeId &&
      <div>
        <div>{theme.ThemeName}</div>
        <div>{theme.Description}</div>
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
      </div>
      || (theme.PickerUserId == user.id 
        && 
          <div>
            <ThemeInput />
          </div>)
      || <div>waiting for {theme.PickerUserId} to pick the theme</div>
      }
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

const getTheme = (activeUserId: string): ThemeDto => { 
    const query = `
WITH userGroup AS (
  SELECT groupId
  FROM GroupMember
  WHERE userId = ?
  LIMIT 1
),
activeTheme AS (
  SELECT gt.groupId, gt.userId AS pickerUserId, gt.id AS groupThemeId, t.name, t.description
  FROM GroupTheme gt
  JOIN Theme t ON t.id = gt.themeId
  WHERE gt.groupId = (SELECT groupId FROM userGroup)
    AND gt.endDateUTC > DATE('now')
  LIMIT 1
),
nextPicker AS (
  SELECT userId
  FROM PickLog
  WHERE groupId = (SELECT groupId FROM userGroup)
  ORDER BY lastPickedAtUtc ASC
  LIMIT 1
)
SELECT
  ug.groupId,
  COALESCE(at.groupThemeId, NULL) AS groupThemeId,
  COALESCE(at.pickerUserId, np.userId) AS pickerUserId,
  COALESCE(at.name, NULL) AS themeName,
  COALESCE(at.description, NULL) AS description
FROM userGroup ug
LEFT JOIN activeTheme at ON at.groupId = ug.groupId
LEFT JOIN nextPicker np ON at.groupId IS NULL;`;
    
    const theme = db.prepare(query).get(activeUserId) as ThemeReadModel;
    // todo: update to .all() and ensure single()
    return toThemeDto(theme);
  }