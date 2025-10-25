import { getUser } from "@/src/lib/auth/getUser";
import CreateGroup from "./components/CreateGroup";
import GroupSettings from "./components/GroupSettings";

export default async function ManageGroup() {

  const user = await getUser();

  const userInGroup = user.groupId !== null;

  return (
    <>
      {
        userInGroup
        ? <GroupSettings/>
        : <CreateGroup/> 
      }
    </>
  )
}

