import LoginForm from "./components/LoginForm";

export default function Login() {

  return (
    <>
      <div className="flex justify-center mt-90">
        <div className="border rounded p-6 shadow min-w">
          <LoginForm/>
        </div>
      </div>
    </>
  )
}