import { DicesIcon, HomeIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { Playlists } from "../sidebar/Playlists"
import { SignInButton } from "../top-bar/SignInButton"
import Link from "next/link"

export const FullSidebarContent = () => {
  const { data: session } = useSession()

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
          <p>Random Roms</p>
        </div>
      </Link>

      {!session && (
        <div className="flex flex-col gap-3 border-0 border-b border-t border-[#ffffff33] px-3 py-5 text-sm  font-normal leading-5">
          <div>
            Login to create private or public playlists, share them or save
            shared playlists
          </div>
          <SignInButton />
        </div>
      )}

      <Playlists />
    </>
  )
}
