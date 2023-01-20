import React, { useEffect, useState } from "react"
import { LayoutContext } from "./LayoutContext"

type Props = {
  children?: React.ReactNode
}

export const LayoutProvider: React.FunctionComponent<Props> = ({
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
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
