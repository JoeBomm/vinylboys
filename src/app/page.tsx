import Hello from "./hello-world/hello";
import Pick from "./pick/page";


export default function Home() {
  
  // TODO: Get actual active user after auth is implemented
  const activeUserId = 6

  return (
    <>
    <div className="flex h-screen">
      <Pick 
        className="m-auto"
        activeUserId={activeUserId}
      />
      {/* <Hello/> */}
     </div>
    </>
  );
}
