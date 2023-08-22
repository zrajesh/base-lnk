import NavBar from "@/components/nav";
import { cookies } from "next/headers"

export default function EditProfileLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    const isToken = cookies().has("token");
    
    return (
      <section>
        <NavBar isLogin={isToken} />
        {children}
      </section>
    )
}