import { getUser } from "@/src/lib/auth/getUser"
import GroupZeroState from "./components/GroupZeroState";


export default async function Group() {
  const user = await getUser();

  return(
    <>
      {
      user.groupId != null
        ? <div>
        <div>Group Details</div>
        <div>Name: {}</div>
        <div>Current Season: {}</div>
        <div>Week: {}/{}</div>
        <div>Active Theme:{} </div>
        <div>Theme Length: {}</div>
        <div>Picked By: {}</div>
        <div>Next Theme Picker: {}</div>
        <div>Members: {}</div>
        <div>Greatist Hits: {}</div>
      </div>
      : <GroupZeroState/> 
      }
    </>
  )
}