import { DiceIcon, HomeIcon } from "@/components/ui/icons"
import { useSession } from "next-auth/react"
import { Playlists } from "../sidebar/Playlists"
import { SignInButton } from "../top-bar/SignInButton"

export const FullSidebarContent = () => {
  const { data: session } = useSession()

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
          <p>Random Roms</p>
        </div>
      </a>

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
