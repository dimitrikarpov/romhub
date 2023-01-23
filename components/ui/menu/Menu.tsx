import classNames from "classnames"
import React, { useEffect, useRef, useState } from "react"
import styles from "./Menu.module.css"
import { MenuContext, useMenuContext } from "./MenuContext"

type TMenuComposition = {
  Handler: typeof Handler
  List: typeof List
  Item: typeof Item
}

type MenuProps = {
  children: React.ReactNode
}

const Menu: React.FunctionComponent<MenuProps> & TMenuComposition = ({
  children,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [menuRef])

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      <div ref={menuRef} className={styles["menu"]}>
        {children}
      </div>
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
  position?: "left" | "right"
  children: React.ReactNode
}

export const List: React.FunctionComponent<ListProps> = ({
  position = "right",
  children,
}) => {
  const { isOpen } = useMenuContext()

  if (!isOpen) return null

  return (
    <div
      className={classNames(styles["list"], {
        [styles["list--open-to-left"]]: position === "left",
      })}
    >
      {children}
    </div>
  )
}

type TItemComposition = {
  IconAndText: typeof IconAndText
  Divider: typeof Divider
}

type ItemProps = {
  children: React.ReactNode
}

const Item: React.FunctionComponent<ItemProps> & TItemComposition = ({
  children,
}) => {
  const { setIsOpen } = useMenuContext()

  const handleClick = (e: React.MouseEvent) => {
    setIsOpen(false)
  }

  return <div onClick={handleClick}>{children}</div>
}

type IconAndTextProps = {
  icon: React.ElementType
  text: string
}

export const IconAndText: React.FunctionComponent<IconAndTextProps> = ({
  icon: Icon,
  text,
}) => {
  const { setIsOpen } = useMenuContext()

  const handleClick = (e: React.MouseEvent) => {
    setIsOpen(false)
  }

  return (
    <div onClick={handleClick} className={styles["item--with-icon-and-text"]}>
      <Icon />
      <div>{text}</div>
    </div>
  )
}

export const Divider: React.FunctionComponent = () => {
  return <div className={styles["item--with-divider"]}></div>
}

Item.IconAndText = IconAndText
Item.Divider = Divider

Menu.Handler = Handler
Menu.List = List
Menu.Item = Item

export { Menu, Item }
