import SideBar from "./sidebar/SideBar"
import TopBar from "./top-bar/TopBar"
import styles from "./Layout.module.css"

type Props = {
  children?: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <SideBar />
      {children}
    </div>
  )
}
