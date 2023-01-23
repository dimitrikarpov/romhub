import { useContext } from "react"
import { MenuIcon } from "@/components/ui/icons"
import { SidebarContext } from "./sidebar/SidebarContext"
import styles from "./TogglerAndLogo.module.css"

const TogglerAndLogo = () => {
  const { toggleSidebar } = useContext(SidebarContext)

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
