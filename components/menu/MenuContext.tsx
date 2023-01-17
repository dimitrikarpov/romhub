import React from "react"

export type MenuContextType = {
  isOpen: boolean
  setIsBoolean: () => void
}

export const MenuContext = React.createContext<MenuContextType | null>(null)

export function useMenuContext() {
  const context = React.useContext(MenuContext)

  if (!context) {
    throw new Error(
      `Menu components cannot be rendered outside the TabsProvider`,
    )
  }

  return context
}
