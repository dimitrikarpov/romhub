import { DicesIcon, HomeIcon } from "lucide-react"

export const MiniSidebarContent = () => {
  return (
    <>
      <a href="/">
        <div className="sidebarItem">
          <HomeIcon />
          <p>Home</p>
        </div>
      </a>

      <a href="/random">
        <div className="sidebarItem">
          <DicesIcon />
          <p>Random</p>
        </div>
      </a>
    </>
  )
}
