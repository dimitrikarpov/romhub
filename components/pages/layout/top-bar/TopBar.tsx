import { useSession } from "next-auth/react"
import { SearchInput } from "../SearchInput"
import TogglerAndLogo from "../TogglerAndLogo"
import styles from "./styles.module.css"
import { SignInButton } from "./SignInButton"
import { AccountButton } from "./AccountButton"

const TopBar = () => {
  const { data: session } = useSession()

  return (
    <div className={styles.topBar}>
      <TogglerAndLogo />

      <SearchInput />

      {session ? <AccountButton /> : <SignInButton />}
    </div>
  )
}

export default TopBar
