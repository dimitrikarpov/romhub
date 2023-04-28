import React from "react"

type MenuContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggle: () => void
}

export const MenuContext = React.createContext<MenuContextType | null>(null)

export function useMenuContext() {
  const context = React.useContext(MenuContext)

  if (!context) {
    throw new Error(`'This component must be used within a <Menu> component.'`)
  }

  return context
}
