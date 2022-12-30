import { useSession, signOut } from "next-auth/react"
import { RefObject, useContext, useEffect, useRef } from "react"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { SignOutIcon } from "../../icons"
import styles from "./styles.module.css"

type Props = {
  buttonRef: RefObject<HTMLImageElement>
}

export const AccountMenu: React.FunctionComponent<Props> = ({ buttonRef }) => {
  const { toggleAccountMenu } = useContext(LayoutContext)
  const { data: session } = useSession()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleAccountMenu()
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [menuRef])

  return (
    <div ref={menuRef} className={styles.accountDropdownMenu}>
      <div className={styles.accountDropdownMenuUserBox}>
        <img src={session?.user?.image || ""} alt="avatar" />
        <p>{session?.user?.name}</p>
      </div>

      <div className={styles.accountDropdownMenuSection}>
        <button onClick={() => signOut()}>
          <SignOutIcon />
          Logout
        </button>
      </div>
    </div>
  )
}
