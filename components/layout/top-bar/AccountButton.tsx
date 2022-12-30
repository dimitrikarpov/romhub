import { useSession } from "next-auth/react"
import { useContext, useRef } from "react"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { AccountMenu } from "./AccountMenu"
import styles from "./styles.module.css"

export const AccountButton = () => {
  const { isAccountMenuOpen, toggleAccountMenu } = useContext(LayoutContext)
  const { data: session } = useSession()
  const buttonRef = useRef<HTMLImageElement>(null)

  return (
    <div className={styles.accountDropdownBoxRegistered}>
      <img
        ref={buttonRef}
        src={session?.user?.image || ""}
        alt="avatar"
        onClick={toggleAccountMenu}
      />

      {isAccountMenuOpen && <AccountMenu buttonRef={buttonRef} />}
    </div>
  )
}
