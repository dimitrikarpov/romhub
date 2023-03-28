import { useSession } from "next-auth/react"
import { SearchInput } from "../SearchInput"
import TogglerAndLogo from "../TogglerAndLogo"
import styles from "./styles.module.css"
import { SignInButton } from "./SignInButton"
import { AccountButton } from "./AccountButton"
import { useRouter } from "next/router"

const TopBar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const shouldDisplaySearchInput = router.route !== "/rom/[id]"

  return (
    <div className={styles.topBar}>
      <TogglerAndLogo />
      {shouldDisplaySearchInput && <SearchInput />}
      {session ? <AccountButton /> : <SignInButton />}
    </div>
  )
}

export default TopBar
