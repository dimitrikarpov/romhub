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
import clsx from "clsx"

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
        className={clsx(
          "absolute z-[9] bg-[#0f0f0f] opacity-0 transition-opacity duration-200",
          isDrawerOpen && "inset-0 opacity-30",
        )}
      ></div>
      <div
        data-sidebar={variant}
        className={clsx(
          "bg-[#0f0f0f]",
          variant === "full" && "w-[240px] min-w-[240px]",
          variant === "mini" && "w-[72px] min-w-[72px]",
          variant === "drawer" && "fixed inset-0 z-10 w-[240px]",
          variant === "drawer" &&
            isDrawerOpen &&
            "block animate-[fade-in-show_0.1s]",
          variant === "drawer" &&
            !isDrawerOpen &&
            "hidden animate-[fade-in-show_0.1s]",
        )}
      >
        {variant === "full" && <FullSidebarContent />}
        {variant === "mini" && <MiniSidebarContent />}
        {variant === "drawer" && (
          <>
            <div className="flex h-14 items-center pl-[10px]">
              <TogglerAndLogo />
            </div>
            <FullSidebarContent />
          </>
        )}
      </div>
    </>
  )
}
