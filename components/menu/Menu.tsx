import { MouseEvent, useState } from "react"
import styles from "./Menu.module.css"
import { MenuContext, useMenuContext } from "./MenuContext"

type TMenuComposition = {
  Handler: React.FunctionComponent<HandlerProps>
  List: React.FunctionComponent<ListProps>
  Item: React.FunctionComponent<ItemProps>
}

type MenuProps = {
  children: React.ReactNode
}

const Menu: React.FunctionComponent<MenuProps> & TMenuComposition = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      <div className={styles["menu"]}>{children}</div>
    </MenuContext.Provider>
  )
}

type HandlerProps = {
  children: React.ReactNode
}

export const Handler: React.FunctionComponent<HandlerProps> = ({
  children,
}) => {
  const { toggle } = useMenuContext()

  return <div onClick={toggle}>{children}</div>
}

type ListProps = {
  children: React.ReactNode
}

export const List: React.FunctionComponent<ListProps> = ({ children }) => {
  const { isOpen } = useMenuContext()

  if (!isOpen) return null

  return <div className={styles["list"]}>{children}</div>
}

type ItemProps = {
  icon: React.ElementType
  text: string
}

export const Item: React.FunctionComponent<ItemProps> = ({
  icon: Icon,
  text,
}) => {
  const { setIsOpen } = useMenuContext()

  const handleClick = (e: MouseEvent) => {
    setIsOpen(false)

    console.log(`${text} [clicked]`)
  }

  return (
    <div onClick={handleClick} className={styles["item"]}>
      <Icon />
      <div>{text}</div>
    </div>
  )
}

type IconAndTextProps = {
  icon: React.ElementType
  text: string
}

export const IconAndText: React.FunctionComponent<IconAndTextProps> = () => {
  return <div className={styles["item--with-icon-and-text"]}></div>
}

Menu.Handler = Handler
Menu.List = List
Menu.Item = Item

export { Menu }
