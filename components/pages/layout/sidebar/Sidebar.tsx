import cn from "classnames"
import { FullSidebarContent } from "./FullSidebarContent"
import { useWindowSizeForSidebar } from "./useWindowSizeForSidebar"
import { MiniSidebarContent } from "./MiniSidebarContent"
import { useDispatch, useSelector } from "react-redux"
import {
  selectisDrawerOpen,
  selectSidebarVariant,
  resetSidebar,
} from "./sideBarSlice"
import { useEffect } from "react"
import TogglerAndLogo from "../TogglerAndLogo"
import styles from "./Sidebar.module.css"

export const Sidebar = () => {
  const dispatch = useDispatch()
  const isDrawerOpen = useSelector(selectisDrawerOpen)
  const storedVariant = useSelector(selectSidebarVariant)
  const variation = useWindowSizeForSidebar()

  const variant = storedVariant || variation

  useEffect(() => {
    dispatch(resetSidebar())
  }, [variation])

  return (
    <>
      <div
        className={cn(styles["drawer-backdrop"], {
          [styles["drawer-backdrop--visible"]]: isDrawerOpen,
        })}
      ></div>
      <div
        className={cn(styles["sidebar-container"], {
          [styles["sidebar-container--full"]]: variant === "full",
          [styles["sidebar-container--mini"]]: variant === "mini",
          [styles["sidebar-container--drawer"]]: variant === "drawer",
          [styles["sidebar-container--drawer_visible"]]:
            variant === "drawer" && isDrawerOpen,
        })}
      >
        {variant === "full" && <FullSidebarContent />}
        {variant === "mini" && <MiniSidebarContent />}
        {variant === "drawer" && (
          <>
            <div className={styles.sideBarTogglerContainer}>
              <TogglerAndLogo />
            </div>
            <FullSidebarContent />
          </>
        )}
      </div>
    </>
  )
}
