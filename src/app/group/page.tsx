import { getUser } from "@/src/lib/auth/getUser"
import GroupZeroState from "./components/GroupZeroState";
import { GetGroupDetails } from "../api/group/actions";
import { GroupDetailsDto } from "../pick/model";
import { group } from "console";


export default async function Group() {
  const user = await getUser();
  let groupDetails: GroupDetailsDto | null = null;

  if (user.groupId) {
    groupDetails = await GetGroupDetails(user.groupId);
  }

  console.log(groupDetails);
  return(
    <>
      {
      user.groupId != null
        ? 
        groupDetails != null ?
        <div>
        <div>Group Details</div>
        <div>Name: {groupDetails.groupName}</div>
        <div>Current Theme</div>
        <div>Name: {groupDetails.currentThemeName}</div>
        <div>Description: {groupDetails.currentThemeDescription}</div>
        <div>End Date: {groupDetails.themeEndDateUtc.toString()}</div>
        <div>Picked By: {groupDetails.themePickUserName}</div>
        <div>Next Theme Picker: {groupDetails.nextThemePickUserName}</div>
        <div>Members: {"TODO"}</div>
        <div>Greatist Hits: {"TODO"}</div>
      </div>
      : <div>Having trouble fetching group details</div>
      : <GroupZeroState/> 
      }
    </>
  )
}