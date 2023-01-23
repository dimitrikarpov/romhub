import { useSession, signOut } from "next-auth/react"
import { SignOutIcon } from "@/components/ui/icons"
import { Menu } from "@/components/ui/menu/Menu"
import styles from "./styles.module.css"

export const AccountButton = () => {
  const { data: session } = useSession()

  return (
    <Menu>
      <Menu.Handler>
        <div className={styles.accountDropdownBoxRegistered}>
          <img src={session?.user?.image || ""} alt="avatar" />
        </div>
      </Menu.Handler>
      <Menu.List position="left">
        <Menu.Item>
          <div className={styles.accountDropdownMenuUserBox}>
            <img src={session?.user?.image || ""} alt="avatar" />
            <p>{session?.user?.name}</p>
          </div>
        </Menu.Item>
        <Menu.Item.Divider />
        <div onClick={() => signOut()}>
          <Menu.Item.IconAndText icon={SignOutIcon} text="Sign out" />
        </div>
      </Menu.List>
    </Menu>
  )
}
