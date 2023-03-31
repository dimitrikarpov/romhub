import cn from "classnames"
import { FullSidebarContent } from "./FullSidebarContent"
import { useWindowSizeForSidebar } from "./useWindowSizeForSidebar"
import { MiniSidebarContent } from "./MiniSidebarContent"
import { useDispatch, useSelector } from "react-redux"
import {
  selectIsSidebarOpen,
  selectSidebarVariant,
  setVariant,
} from "../sidebar/sideBarSlice"
import { DrawerSidebarContent } from "./DrawerSidebarContent"
import styles from "./Aside.module.css"
import { useEffect } from "react"

export const Aside = () => {
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector(selectIsSidebarOpen)
  const storedVariant = useSelector(selectSidebarVariant)
  const variation = useWindowSizeForSidebar()

  useEffect(() => {
    dispatch(setVariant(undefined))
  }, [variation])

  console.log({ variation })

  // const isSidebarOpen = true

  return (
    <>
      <div
        className={cn(styles["drawer-backdrop"], {
          [styles["drawer-backdrop--visible"]]: isSidebarOpen,
        })}
      ></div>
      <div
        className={cn(
          styles["aside-container"],
          variation === "drawer" &&
            isSidebarOpen &&
            styles["aside-container--drawer"],
        )}
      >
        {variation === "full" && <FullSidebarContent />}
        {variation === "mini" && <MiniSidebarContent />}
        {variation === "drawer" && <DrawerSidebarContent />}
      </div>
    </>
  )
}
