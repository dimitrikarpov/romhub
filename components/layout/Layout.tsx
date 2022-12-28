import styles from "../../styles/Layout.module.css"
import SideBar from "./SideBar"
import TopBar from "./TopBar"

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
