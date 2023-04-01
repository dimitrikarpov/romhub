import { useState, useEffect } from "react"

export const useWindowSizeForSidebar = () => {
  const [windowWidth, setWindowWidth] = useState<number>()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !windowWidth
    ? "drawer"
    : windowWidth <= 775
    ? "drawer"
    : windowWidth <= 1250
    ? "mini"
    : "full"
}
