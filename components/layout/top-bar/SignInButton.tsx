import { useSession, signIn, signOut } from "next-auth/react"
import { SignInIcon, SignOutIcon } from "../../icons"
import styles from "./styles.module.css"

export const SignInButton = () => (
  <div className={styles.accountDropdownBoxAnonBox} onClick={() => signIn()}>
    <SignInIcon />
    <span>Sing in</span>
  </div>
)
