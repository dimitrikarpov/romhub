import { DiceIcon, HomeIcon } from "@/components/ui/icons"
import styles from "./Sidebar.module.css"

export const MiniSidebarContent = () => {
  return (
    <>
      <div className={styles.sideBarSection}>
        <a href="/">
          <div className={styles.sideBarSectionItem}>
            <HomeIcon />
            <p>Home</p>
          </div>
        </a>
      </div>

      <div className={styles.sideBarSection}>
        <a href="/random">
          <div className={styles.sideBarSectionItem}>
            <DiceIcon />
            <p>Random</p>
          </div>
        </a>
      </div>
    </>
  )
}
