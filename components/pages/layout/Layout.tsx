import TopBar from "./top-bar/TopBar"
import styles from "./Layout.module.css"
import { Sidebar } from "./sidebar/Sidebar"

type Props = {
  children?: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles["sidebar-and-main-container"]}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
