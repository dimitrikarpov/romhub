import { MenuIcon } from "@/components/ui/icons"
import { useDispatch } from "react-redux"
import { toggle } from "@/components/pages/layout/sidebar/sideBarSlice"
import { useWindowSizeForSidebar } from "./sidebar/useWindowSizeForSidebar"
import styles from "./TogglerAndLogo.module.css"

const TogglerAndLogo = () => {
  const dispatch = useDispatch()
  const variation = useWindowSizeForSidebar()

  return (
    <div className={styles.menuAndLogoBox}>
      <div
        className={styles.menuBox}
        onClick={() => dispatch(toggle(variation))}
      >
        <MenuIcon />
      </div>
      <a href="/">
        <div className={styles.logoBox}>
          <img src="/assets/mushroom.png" />
          <span>RomHub</span>
        </div>
      </a>
    </div>
  )
}

export default TogglerAndLogo

/*

if wstate === full => rstate = mini
if rstate === mini && wstate === full => full

if wstate === mini => drawer
if rstate === mini => drawer

*/
