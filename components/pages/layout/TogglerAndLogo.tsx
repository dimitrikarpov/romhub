import { MenuIcon } from "@/components/ui/icons"
import { useDispatch } from "react-redux"
import { toggle } from "@/components/pages/layout/sidebar/sideBarSlice"
import styles from "./TogglerAndLogo.module.css"

const TogglerAndLogo = () => {
  const dispatch = useDispatch()

  return (
    <div className={styles.menuAndLogoBox}>
      <div className={styles.menuBox} onClick={() => dispatch(toggle())}>
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
