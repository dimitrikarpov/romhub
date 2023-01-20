import { createContext } from "react"

type TLayoutContext = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const LayoutContext = createContext<TLayoutContext>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
})
