import { DiceIcon, HomeIcon } from "~/components/ui/icons"

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
          <DiceIcon />
          <p>Random</p>
        </div>
      </a>
    </>
  )
}
