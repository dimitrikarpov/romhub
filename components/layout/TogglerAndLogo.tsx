import { useContext } from "react"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import { MenuIcon } from "../icons"
import styles from "./TogglerAndLogo.module.css"

const TogglerAndLogo = () => {
  const { toggleSidebar } = useContext(LayoutContext)

  return (
    <div className={styles.menuAndLogoBox}>
      <div className={styles.menuBox} onClick={toggleSidebar}>
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
