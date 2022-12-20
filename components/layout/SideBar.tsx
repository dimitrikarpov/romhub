import { useContext } from "react"
import cn from "classnames"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import TogglerAndLogo from "./TogglerAndLogo"
import styles from "../../styles/Layout.module.css"
import { WatchLaterIcon } from "../icons"

type Props = {}

const SideBar: React.FunctionComponent<Props> = () => {
  const { isSidebarOpen } = useContext(LayoutContext)

  return (
    <>
      <aside
        className={cn(styles.sideBarContainer, {
          [styles.sideBarContainerVisible]: isSidebarOpen,
        })}
      >
        <div className={styles.sideBarTogglerContainer}>
          <TogglerAndLogo />
        </div>

        <div className={styles.sideBarSection}>
          <div className={styles.sideBarSectionItem}>
            <HomeIcon />
            <p>Home</p>
          </div>
        </div>

        <div className={styles.sideBarSection}>
          <div className={styles.sideBarSectionItem}>
            <HistoryIcon />
            <p>History</p>
          </div>
        </div>

        <div className={styles.sideBarSection}>
          <div className={styles.sideBarSectionItem}>
            <WatchLaterIcon />
            <p>Watch later</p>
          </div>
        </div>

        <div className={styles.sideBarSection}>
          <div className={styles.sideBarSectionItem}>
            <PlaylistIcon />
            <p>my dendy games</p>
          </div>
        </div>
      </aside>

      <div
        className={cn(styles.sideBarBackdrop, {
          [styles.sideBarBackdropVisible]: isSidebarOpen,
        })}
      ></div>
    </>
  )
}

export default SideBar

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z"></path>
    </g>
  </svg>
)

const HistoryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z"></path>
    </g>
  </svg>
)

const PlaylistIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path>
    </g>
  </svg>
)
