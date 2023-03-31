import cn from "classnames"
import TogglerAndLogo from "../TogglerAndLogo"
import { DiceIcon, HomeIcon } from "@/components/ui/icons"
import { Playlists } from "../sidebar/Playlists"
import { SignInButton } from "../top-bar/SignInButton"
import { useSession } from "next-auth/react"
import styles from "./Aside.module.css"

export const DrawerSidebarContent = () => {
  const { data: session } = useSession()

  return (
    <>
      <div className={styles.sideBarTogglerContainer}>
        <TogglerAndLogo />
      </div>

      <div className={styles.sideBarSection}>
        <a href="/">
          <div className={styles.sideBarSectionItem}>
            <HomeIcon />
            <p>Home</p>
          </div>
        </a>
      </div>

      <div className={styles.sideBarSection}>
        <a href="/random">
          <div className={styles.sideBarSectionItem}>
            <DiceIcon />
            <p>Random Roms</p>
          </div>
        </a>
      </div>

      {!session && (
        <div className={styles.sideBarSection}>
          <div className={styles.registerSectionContent}>
            <div>
              Login to create private or public playlists, share them or save
              shared playlists
            </div>
            <SignInButton />
          </div>
        </div>
      )}

      <Playlists />
    </>
  )
}
