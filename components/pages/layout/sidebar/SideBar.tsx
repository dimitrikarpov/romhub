import { useContext } from "react"
import cn from "classnames"
import TogglerAndLogo from "../TogglerAndLogo"
import { DiceIcon, HomeIcon } from "@/components/ui/icons"
import { Playlists } from "./Playlists"
import { SidebarContext } from "./SidebarContext"
import styles from "./Sidebar.module.css"

const SideBar = () => {
  const { isSidebarOpen } = useContext(SidebarContext)

  return (
    <>
      <aside
        className={cn(styles.sideBarContainer, {
          [styles.sideBarContainerVisible]: isSidebarOpen,
        })}
      >
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

        <Playlists />
      </aside>

      <div
        className={cn(styles.sideBarBackdrop, {
          [styles.sideBarBackdropVisible]: isSidebarOpen,
        })}
      ></div>
    </>
  )
}

export default SideBar
