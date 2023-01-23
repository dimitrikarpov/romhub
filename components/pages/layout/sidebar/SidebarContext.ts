import { createContext } from "react"

type TSidebarContext = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<TSidebarContext>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
})
