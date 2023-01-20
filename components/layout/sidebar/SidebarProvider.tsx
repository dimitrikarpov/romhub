import React, { useEffect, useState } from "react"
import { SidebarContext } from "./SidebarContext"

type Props = {
  children?: React.ReactNode
}

export const SidebarProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.height = "100vh"
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.height = "auto"
      document.body.style.overflow = "initial"
    }
  }, [isSidebarOpen])

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
