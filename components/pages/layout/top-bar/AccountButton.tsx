import { useSession, signOut } from "next-auth/react"
import { SignOutIcon } from "@/components/ui/icons"
import { Menu } from "@/components/ui/menu/Menu"

export const AccountButton = () => {
  const { data: session } = useSession()

  return (
    <Menu>
      <Menu.Handler>
        <div className="mx-[15px] my-0">
          <img
            src={session?.user?.image || ""}
            className="h-8 w-8 rounded-full"
            alt="avatar"
          />
        </div>
      </Menu.Handler>
      <Menu.List position="left">
        <Menu.Item>
          <div className="flex items-center justify-center gap-4">
            <img
              src={session?.user?.image || ""}
              className="h-10 w-10 rounded-full"
              alt="avatar"
            />
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
