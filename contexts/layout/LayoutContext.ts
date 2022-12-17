import { createContext } from "react"

type TLayoutContext = {
  isSidebarOpen: boolean
  isAccountMenuOpen: boolean
  toggleSidebar: () => void
  toggleAccountMenu: () => void
}

export const LayoutContext = createContext<TLayoutContext>({
  isSidebarOpen: false,
  isAccountMenuOpen: false,
  toggleSidebar: () => {},
  toggleAccountMenu: () => {},
})
