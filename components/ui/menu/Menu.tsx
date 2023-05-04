import React, { useEffect, useRef, useState } from "react"
import { MenuContext, useMenuContext } from "./MenuContext"
import clsx from "clsx"

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
      <div ref={menuRef} className="relative w-fit">
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
      className={clsx(
        "absolute z-[1] flex min-w-[192px] flex-col rounded-lg bg-[#282828] px-0 py-2 text-sm font-normal",
        position === "left" && "right-0",
      )}
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
    <div
      onClick={handleClick}
      className="flex min-h-[36px] cursor-pointer items-center gap-4 py-0 pl-3 pr-4 hover:bg-[#ffffff1a]"
    >
      <Icon className="shrink-0" />
      <div>{text}</div>
    </div>
  )
}

export const Divider: React.FunctionComponent = () => {
  return (
    <div className="mx-0 my-2 h-0 w-full border-0 border-t border-[#ffffff1a]"></div>
  )
}

Item.IconAndText = IconAndText
Item.Divider = Divider

Menu.Handler = Handler
Menu.List = List
Menu.Item = Item

export { Menu, Item }
