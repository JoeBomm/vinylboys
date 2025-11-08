'use server'

import { withUser } from "@/src/lib/api/withUser";
import dayjs, { HHmmToSecondsSinceMidnight } from "@/src/lib/dayjs"
import { createGroupSchema } from "@/src/lib/zod";
import { Session } from "next-auth";
import z, { success } from "zod";
import { GroupDetailsDto, GroupDetailsReadModel, toGroupDetailsDto } from "../../pick/model";
import { toUsers, User, UserReadModel } from "@/src/types/user";
import { createAndJoinGroup, insertGroupMember, insertGroupPickLog } from "./db/groupCommands";
import { groupDetailsQuery, groupMembersQuery } from "./db/groupQueries";
import { getUser } from "@/src/lib/auth/getUser";
import { cookies } from "next/headers";
import { db } from "@/src/lib/db";
import { auth } from "@/auth";

 export async function joinGroup(code: string) {
  const user = await getUser();

  
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  if (!!user.groupId) {
    return { success: false, error: "Already assigned to a group" }
  }
  
  // Validate code and add user to group
  try {
    // Your validation logic here
    const groupId = await getGroupIdByCode(code);
    
    await addUserToGroup(user.id, groupId);
    
    // Clear the pending code cookie if it exists
    (await cookies()).delete('pending_group_code');
    
    return { success: true, groupId: groupId };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid code' 
    };
  }
}

async function addUserToGroup(userId: string, groupId: number) {
  db.transaction(() => {
    insertGroupMember.run(groupId, userId);
    insertGroupPickLog.run(groupId, userId, new Date().toISOString()); 
  })();
}

async function getGroupIdByCode(code: string) {
  const group = db.prepare(`
    SELECT [Id] AS [GroupId] 
    FROM [Group] 
    WHERE [InviteCode] = @code 
      AND [InviteCodeExpirationUTC] > DATETIME('now')
    LIMIT 1
  `).get({ code }) as { GroupId: number } | undefined;

  if (!group) {
    throw new Error("Invalid Code")
  }

  return group.GroupId;
}

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
    themeLengthWeeks?: number
    endDay?: number
    endTime?: string
  }
}

async function _createGroupImpl(
  session: Session,
  prevState: CreateGroupResult | undefined,
  formData: FormData
  ): Promise<CreateGroupResult> {  
 
  const parsed = createGroupSchema.safeParse({
    groupName: formData.get("groupName"),
    seasonLength: formData.get("seasonLength"),
    themeLengthWeeks: formData.get("themeLengthWeeks"),
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
        themeLengthWeeks: Number(formData.get("themeLengthWeeks") ?? 1),
        endDay: Number(formData.get("endDayOfWeek") ?? 0),
        endTime: String(formData.get("endTime") ?? "")
      }
    };  
  }
  
  try  {
    const DAYS_IN_WEEK = 7;

    const groupId = createAndJoinGroup({
      userId: parseInt(session.user.id, 10),
      endTimeSecondsFromMidnight: HHmmToSecondsSinceMidnight(parsed.data.endTime), 
      themeLengthDays: parsed.data.themeLengthWeeks * DAYS_IN_WEEK,
      ...parsed.data
    })

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

export async function GetGroupDetails(groupId: string): Promise<GroupDetailsDto> {
  const result = groupDetailsQuery.get({ groupId }) as GroupDetailsReadModel
  return toGroupDetailsDto(result)
}

export async function GetGroupMembers(groupId: string): Promise<User[]> {
  const result = groupMembersQuery.all({ groupId }) as UserReadModel[];

  return toUsers(result);
}

export async function setGroupInviteCode(code: string): Promise<boolean> {
    const session = await auth();

    const groupId = session?.user.groupId;
    const expirationDate = dayjs().add(1, 'hour').utc().format();

    const updateCodeStmnt = db.prepare(`
UPDATE [Group]
SET [InviteCode] = @code, [InviteCodeExpirationUTC] = @expirationDate
WHERE [Id] = @groupId;`);

try{
  const info = updateCodeStmnt.run({code, expirationDate, groupId});
  return info.changes === 1
} catch(e) {
  return false
}
}