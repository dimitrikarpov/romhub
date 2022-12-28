import { useContext } from "react"
import { LayoutContext } from "../../contexts/layout/LayoutContext"
import styles from "../../styles/Layout.module.css"
import { SearchInput } from "./SearchInput"
import TogglerAndLogo from "./TogglerAndLogo"

type Props = {
  children?: React.ReactNode
}

const TopBar: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.topBar}>
      <TogglerAndLogo />

      <SearchInput />

      <div>{true ? <AccountLoggedIn /> : <AccountAnon />}</div>
    </div>
  )
}

export default TopBar

const AccountLoggedIn = () => {
  const { isAccountMenuOpen, toggleAccountMenu } = useContext(LayoutContext)

  return (
    <div className={styles.accountDropdownBoxRegistered}>
      <img
        src="https://via.placeholder.com/72"
        alt="avatar"
        onClick={toggleAccountMenu}
      />

      {isAccountMenuOpen && (
        <div className={styles.accountDropdownMenu}>
          <div className={styles.accountDropdownMenuUserBox}>
            <img src="https://via.placeholder.com/72" alt="avatar" />
            <p>Дмитрий Карпов</p>
          </div>

          <div className={styles.accountDropdownMenuSection}>
            <a href="http://#">
              <SignOutIcon />
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

const AccountAnon = () => (
  <div className={styles.accountDropdownBoxAnonBox}>
    <SignInIcon />
    <span>Sing in</span>
  </div>
)

const SignInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z"></path>
    </g>
  </svg>
)

const SignOutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <g>
      <path d="M20,3v18H8v-1h11V4H8V3H20z M11.1,15.1l0.7,0.7l4.4-4.4l-4.4-4.4l-0.7,0.7l3.1,3.1H3v1h11.3L11.1,15.1z"></path>
    </g>
  </svg>
)
