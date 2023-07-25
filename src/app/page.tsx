import NavBar from "./components/nav";
import { cookies } from "next/headers"

export default function Home() {
  const isToken = cookies().has("token");
  return (
    <>
    <NavBar isLogin={isToken} />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
    </>
  )
}
