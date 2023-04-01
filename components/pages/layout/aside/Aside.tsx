import cn from "classnames"
import { FullSidebarContent } from "./FullSidebarContent"
import { useWindowSizeForSidebar } from "./useWindowSizeForSidebar"
import { MiniSidebarContent } from "./MiniSidebarContent"
import { useDispatch, useSelector } from "react-redux"
import {
  selectIsSidebarOpen,
  selectSidebarVariant,
  resetSidebar,
} from "../sidebar/sideBarSlice"
import { useEffect } from "react"
import TogglerAndLogo from "../TogglerAndLogo"
import styles from "./Aside.module.css"

export const Aside = () => {
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector(selectIsSidebarOpen)
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
          [styles["drawer-backdrop--visible"]]: isSidebarOpen,
        })}
      ></div>
      <div
        className={cn(styles["aside-container"], {
          [styles["aside-container--full"]]: variant === "full",
          [styles["aside-container--mini"]]: variant === "mini",
          [styles["aside-container--drawer"]]: variant === "drawer",
          [styles["aside-container--drawer_visible"]]:
            variant === "drawer" && isSidebarOpen,
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
