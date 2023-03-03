import { RefObject, useEffect, useState } from "react"
import { FullscreenExitIcon, FullscreenIcon } from "@/components/ui/icons"

type Props = {
  canvasBoxRef: RefObject<HTMLDivElement>
}

export const FullscreenButton: React.FunctionComponent<Props> = ({
  canvasBoxRef,
}) => {
  const [isInFullscreen, setIsInFullscreen] = useState(false)

  useEffect(() => {
    if (!canvasBoxRef || !canvasBoxRef.current) return

    const fullscreenchanged = () => {
      if (document.fullscreenElement) {
        setIsInFullscreen(true)
      } else {
        setIsInFullscreen(false)
      }
    }

    document.addEventListener("fullscreenchange", fullscreenchanged, false)

    return () =>
      document.removeEventListener("fullscreenchange", fullscreenchanged, false)
  }, [canvasBoxRef])

  const onFullscreen = () => {
    canvasBoxRef.current?.requestFullscreen().catch((err) => {
      console.log({ err })
    })
  }

  const onExitFullscreen = () => {
    document.exitFullscreen()
  }

  return (
    <>
      {isInFullscreen && (
        <span onClick={onExitFullscreen} title="Exit full screen">
          <FullscreenExitIcon />
        </span>
      )}
      {!isInFullscreen && (
        <span onClick={onFullscreen} title="Full screen">
          <FullscreenIcon />
        </span>
      )}
    </>
  )
}
