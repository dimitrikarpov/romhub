import { MenuIcon } from "~/components/ui/icons"
import { useDispatch } from "react-redux"
import { toggle } from "~/components/pages/layout/sidebar/sideBarSlice"
import { useWindowSizeForSidebar } from "./sidebar/useWindowSizeForSidebar"

const TogglerAndLogo = () => {
  const dispatch = useDispatch()
  const variation = useWindowSizeForSidebar()

  return (
    <div className="flex cursor-pointer select-none items-center gap-[10px]">
      <div
        className="c-svg-32 c-svg-w p-2 hover:rounded-full hover:bg-[#ffffff1a]"
        onClick={() => dispatch(toggle(variation))}
      >
        <MenuIcon />
      </div>
      <a href="/">
        <div className="flex h-5 items-center gap-[5px] text-[21px] font-black text-white">
          <img
            src="/assets/mushroom.png"
            className="h-full w-full"
            alt="romhub logo"
          />
          <span>RomHub</span>
        </div>
      </a>
    </div>
  )
}

export default TogglerAndLogo
