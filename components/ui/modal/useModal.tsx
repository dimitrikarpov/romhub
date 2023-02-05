import { useCallback, useState } from "react"

export const useModal = (defaultVisible = false) => {
  const [isVisible, setIsVisible] = useState(defaultVisible)

  return {
    visible: isVisible,
    show: useCallback(() => setIsVisible(true), []),
    close: useCallback(() => setIsVisible(false), []),
  }
}
