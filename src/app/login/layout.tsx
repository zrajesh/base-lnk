import NavBar from "../components/nav"

export default function LoginLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {children}
      </section>
    )
}