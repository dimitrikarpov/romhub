import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { SearchInput } from "../SearchInput"
import TogglerAndLogo from "../TogglerAndLogo"
import { AccountButton } from "./AccountButton"
import { SignInButton } from "./SignInButton"

const TopBar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const shouldDisplaySearchInput = router.route !== "/rom/[id]"

  return (
    <div className="flex h-14 items-center justify-between bg-[#0f0f0f] px-[10px] py-0">
      <TogglerAndLogo />
      {shouldDisplaySearchInput && <SearchInput />}
      {session ? <AccountButton /> : <SignInButton />}
    </div>
  )
}

export default TopBar
