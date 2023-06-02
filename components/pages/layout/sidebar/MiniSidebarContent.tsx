import { DicesIcon, HomeIcon } from "lucide-react"
import Link from "next/link"

export const MiniSidebarContent = () => {
  return (
    <>
      <Link href="/">
        <div className="sidebarItem">
          <HomeIcon />
          <p>Home</p>
        </div>
      </Link>

      <Link href="/random">
        <div className="sidebarItem">
          <DicesIcon />
          <p>Random</p>
        </div>
      </Link>
    </>
  )
}
