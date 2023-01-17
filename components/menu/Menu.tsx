import { useState } from "react"
import { IconButton } from "../icon-button/IconButton"
import { CollaborateIcon, RubbishBinIcon, ThreeDotsMenu } from "../icons"
import styles from "./Menu.module.css"

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles["menu"]}>
      <div onClick={toggle}>
        <IconButton icon={ThreeDotsMenu} />
      </div>

      {isOpen && (
        <MenuList>
          <MenuItem icon={CollaborateIcon} text="Collaborate" />
          <MenuItem icon={RubbishBinIcon} text="Delete Playlist" />
          <MenuItem icon={CollaborateIcon} text="Add all to..." />
        </MenuList>
      )}
    </div>
  )
}

type MenuListProps = {
  children: React.ReactNode
}
export const MenuList: React.FunctionComponent<MenuListProps> = ({
  children,
}) => {
  return <div className={styles["list"]}>{children}</div>
}

type MenuItemProps = {
  icon: React.ElementType
  text: string
}
export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  icon: Icon,
  text,
}) => {
  return (
    <div className={styles["item"]}>
      <Icon />
      <div>{text}</div>
    </div>
  )
}

/*


Menu
 - MenuHanlder

 - MenuItem


*/
