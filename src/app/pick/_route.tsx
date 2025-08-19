import { db } from "@/lib/db";
import { ThemeDto, ThemeReadModel, toThemeDto } from "../context/model";
import { withUser } from "@/lib/api/withUser";
import { JwtPayload } from "@/types/jwt";
import { NextRequest, NextResponse } from "next/server";



export const GET = withUser(async (user: JwtPayload, req: NextRequest) => {  
    const query = `
WITH userGroup AS (
  SELECT groupId
  FROM GroupMember
  WHERE userId = ?
  LIMIT 1
),
activeTheme AS (
  SELECT gt.groupId, gt.userId AS pickerUserId, gt.id AS groupThemeId, t.name
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
  COALESCE(at.name, NULL) AS themeName
FROM userGroup ug
LEFT JOIN activeTheme at ON at.groupId = ug.groupId
LEFT JOIN nextPicker np ON at.groupId IS NULL;`;
    
    const initialContext = db.prepare(query).get(user.userId) as ThemeReadModel;

    return NextResponse.json(toThemeDto(initialContext));
});