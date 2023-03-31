import SideBar from "./sidebar/SideBar"
import TopBar from "./top-bar/TopBar"
import styles from "./Layout.module.css"
import { Aside } from "./aside/Aside"

type Props = {
  children?: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles["sidebar-and-main-container"]}>
        <Aside />
        {/* <SideBar /> */}
        {children}
      </div>
    </div>
  )
}

/*

775 и ниже - нет сайдбара
1297 и выше - появляется полный сайдбар

сайдбар есть на страницах
- главная
- плейлист

не появляется на странце видео
*/
