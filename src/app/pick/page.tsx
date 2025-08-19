import { db } from "@/lib/db";
import PickCard from "./components/PickCard";
import { PickDto, PickReadModel, toPickDtos } from "./model";
import { getUser } from "@/lib/auth/getUser";
import { ThemeDto, ThemeReadModel as ThemeReadModel, toThemeDto } from "../context/model";
import ThemeInput from "./components/ThemeInput";

export default async function Pick() {
  
  const user = await getUser();
  
  const theme = getTheme(user.userId);
  console.log("theme: ", theme);

  const picks = getPicks(user.userId);

  return (
    <>
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
      || (theme.PickerUserId == user.userId 
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
    return toThemeDto(theme);
  }