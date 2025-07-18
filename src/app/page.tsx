import Hello from "./hello-world/hello";
import Pick from "./pick/page";


export default function Home() {
  
  return (
    <>
    <div className="flex h-screen">
      <Pick className="m-auto"/>
      {/* <Hello/> */}
     </div>
    </>
  );
}
