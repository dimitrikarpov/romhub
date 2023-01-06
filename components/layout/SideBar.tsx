import { useContext } from "react"
import cn from "classnames"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import TogglerAndLogo from "./TogglerAndLogo"
import styles from "../../styles/Layout.module.css"
import { HomeIcon } from "../icons"
import { Playlists } from "./Playlists"

const SideBar = () => {
  const { isSidebarOpen } = useContext(LayoutContext)

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
          <div className={styles.sideBarSectionItem}>
            <HomeIcon />
            <p>Home</p>
          </div>
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
