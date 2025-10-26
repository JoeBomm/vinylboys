'use server'

import { withUser } from "@/src/lib/api/withUser";
import { getNextUtcDateForDay, HHmmToSecondsSinceMidnight } from "@/src/lib/dayjs"
import { db } from "@/src/lib/db";
import { createGroupSchema } from "@/src/lib/zod";
import { Session } from "next-auth";
import z from "zod";
import { GroupDetailsDto, GroupDetailsReadModel, toGroupDetailsDto } from "../../pick/model";

export const createGroup = withUser(_createGroupImpl)

export interface CreateGroupResult {
  success: boolean,
  groupId?: number,
  errors?: {
    groupName?: string[]
    seasonLength?: string[]
    themeLength?: string[]
    endDay?: string[]
    endTime?: string[]
    general?: string[]
  },
  values?: {
    groupName?: string
    seasonLength?: number
    themeLength?: number
    endDay?: number
    endTime?: string
  }
}

async function _createGroupImpl(
  session: Session,
  prevState: CreateGroupResult | undefined,
  formData: FormData
  ): Promise<CreateGroupResult> {  

  // const { update } = useSession();
  
  const parsed = createGroupSchema.safeParse({
    groupName: formData.get("groupName"),
    seasonLength: formData.get("seasonLength"),
    themeLength: formData.get("themeLength"),
    endDay: formData.get("endDayOfWeek"),
    endTime: formData.get("endTime")
  })

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    const errors: Record<string, string[]> = {};
    for (const [field, detail] of Object.entries(tree.properties ?? {})) {
      errors[field] = detail.errors;
    }

    return {
      success: false,
      errors,
      values: {
        groupName: String(formData.get("groupName") ?? ""),
        seasonLength: Number(formData.get("seasonLength") ?? 24),
        themeLength: Number(formData.get("themeLength") ?? 1),
        endDay: Number(formData.get("endDayOfWeek") ?? 0),
        endTime: String(formData.get("endTime") ?? "")
      }
    };  
  }
  
  
  try  {
    const groupId = createAndJoinGroup({
      userId: parseInt(session.user.id, 10),
      endTimeSecondsFromMidnight: HHmmToSecondsSinceMidnight(parsed.data.endTime), 
      ...parsed.data
    })

    // await update({ user: {...session.user, groupId: groupId}})

    return {
      success: true, groupId: groupId
    }
  } catch (err:any) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE" || err.message?.includes("UNIQUE")) {
      return {
        success: false,
        errors: { groupName: ["This group name is already registered. Select a new group name"] },
        values: {...parsed.data}
      }
    }

    return {
      success: false,
      errors: { general: ["Something went wrong. Please try again later."] },
    }
  }  
}

const insertGroup = db.prepare(`
  INSERT INTO [Group] (
    Name, 
    ThemeLengthDays, 
    ThemesPerSeason,
    EndDayOfWeek, 
    EndTimeSeconds
  )
  VALUES (?, ?, ?, ?, ?)`)

const insertGroupMember = db.prepare(`
  INSERT INTO [GroupMember] (GroupId, UserId)
  VALUES (?, ?)`)

const insertGroupTheme = db.prepare(`
  INSERT INTO [GroupTheme] (GroupId, ThemeId, EndDateUTC)
  VALUES (?, ?, ?)`)

const insertGroupPickLog = db.prepare(`
  INSERT INTO [PickLog] (groupId, userId, lastPickedAtUtc)
  VALUES (?, ?, ?)`)

interface CreateAndJoinGroupCommand {
  userId: number
  groupName: string
  seasonLength: number
  themeLength: number
  endDay: number
  endTimeSecondsFromMidnight: number // TODO: how to figure end date time
}

const createAndJoinGroup = db.transaction((command: CreateAndJoinGroupCommand) => {
  const groupResult = insertGroup.run(
    command.groupName,
    command.themeLength,
    command.seasonLength,
    command.endDay,
    command.endTimeSecondsFromMidnight
  );

  const groupId = groupResult.lastInsertRowid as number;
  const INITIAL_THEME_ID = -1;

  insertGroupMember.run(groupId, command.userId);

  insertGroupTheme.run(groupId, INITIAL_THEME_ID, getNextUtcDateForDay(command.endDay, command.themeLength, command.endTimeSecondsFromMidnight));

  const MIN_UTC_DATE = '0000-01-01 00:00:00.000Z';
  insertGroupPickLog.run(groupId, command.userId, MIN_UTC_DATE);

  return groupId;
});

export async function GetGroupDetails(groupId: string): Promise<GroupDetailsDto> {
  const query = db.prepare(`
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
JOIN main.[User] pu ON pu.[Id] = np.[UserId];`)

 const result = query.get({ groupId }) as GroupDetailsReadModel
 return toGroupDetailsDto(result)
}