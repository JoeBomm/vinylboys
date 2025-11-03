import { getUser } from "@/src/lib/auth/getUser";
import { redirect } from "next/navigation";
import { JoinGroupForm } from "../components/JoinGroupForm";

export default async function JoinPage({ params }: {params: {code?: string[]}}) {
  const resolvedParams = await params;
  const code = resolvedParams.code?.[0];
  var user = null;
  try {
    user = await getUser();
  }
  catch (e) {
    redirect(`/`)
  }

  return (
    <div>
      <h1>Join Group</h1>
      {code ? (<p>Ready to join group with code: <strong>{code}</strong></p>
      ) : (<p>Enter  your group code below to join</p>)}
      <JoinGroupForm initialCode= {code}/>
    </div>
  )

}