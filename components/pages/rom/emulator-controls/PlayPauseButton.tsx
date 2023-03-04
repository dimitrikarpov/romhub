import { PauseIcon, PlayIcon } from "@/components/ui/icons"
import { useState } from "react"

export const PlayPauseButton = () => {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <>
      {isPaused && (
        <span onClick={() => setIsPaused(false)} title="Play">
          <PlayIcon />
        </span>
      )}
      {!isPaused && (
        <span onClick={() => setIsPaused(true)} title="Pause">
          <PauseIcon />
        </span>
      )}
    </>
  )
}
