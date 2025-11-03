import { getNextUtcDateForDay } from "@/src/lib/dayjs"
import { db } from "@/src/lib/db"

const insertGroup = db.prepare(`
  INSERT INTO [Group] (
    Name, 
    ThemeLengthDays, 
    ThemesPerSeason,
    EndDayOfWeek, 
    EndTimeSeconds
  )
  VALUES (?, ?, ?, ?, ?)`)

export const insertGroupMember = db.prepare(`
  INSERT INTO [GroupMember] (GroupId, UserId)
  VALUES (?, ?)`)

const insertGroupTheme = db.prepare(`
  INSERT INTO [GroupTheme] (GroupId, ThemeId, EndDateUTC)
  VALUES (?, ?, ?)`)

export const insertGroupPickLog = db.prepare(`
  INSERT INTO [PickLog] (groupId, userId, lastPickedAtUtc)
  VALUES (?, ?, ?)`)


interface CreateAndJoinGroupCommand {
userId: number
groupName: string
seasonLength: number
themeLengthDays: number
endDay: number
endTimeSecondsFromMidnight: number // TODO: how to figure end date time
}
export const createAndJoinGroup = db.transaction((command: CreateAndJoinGroupCommand) => {
  const groupResult = insertGroup.run(
    command.groupName,
    command.themeLengthDays,
    command.seasonLength,
    command.endDay,
    command.endTimeSecondsFromMidnight
  );

  
  const groupId = groupResult.lastInsertRowid as number;

  const INITIAL_THEME_ID = -1;

  insertGroupMember.run(groupId, command.userId);

  insertGroupTheme.run(groupId, INITIAL_THEME_ID, getNextUtcDateForDay(command.endDay, command.themeLengthDays, command.endTimeSecondsFromMidnight));

  const MIN_UTC_DATE = '0000-01-01 00:00:00.000Z';
  insertGroupPickLog.run(groupId, command.userId, MIN_UTC_DATE);

  return groupId;
});