import { useContext } from "react"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import styles from "../../styles/Layout.module.css"

const TogglerAndLogo = () => {
  const { toggleSidebar } = useContext(LayoutContext)

  return (
    <div className={styles.menuAndLogoBox}>
      <div className={styles.menuBox} onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <div className={styles.logoBox}>
        <img src="/assets/mushroom.png" />
        <span>RomHub</span>
      </div>
    </div>
  )
}

export default TogglerAndLogo

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
    </g>
  </svg>
)
