import { signIn } from "next-auth/react"
import { SignInIcon } from "../../icons"
import styles from "./styles.module.css"

export const SignInButton = () => (
  <div className={styles.accountDropdownBoxAnonBox} onClick={() => signIn()}>
    <SignInIcon />
    <span>Sign in</span>
  </div>
)
