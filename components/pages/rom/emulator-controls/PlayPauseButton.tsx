import { useState } from "react"
import { PauseIcon, PlayIcon } from "@/components/ui/icons"
import styles from "../EmulatorComponent.module.css"

export const PlayPauseButton = () => {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <>
      {isPaused && (
        <span
          onClick={() => setIsPaused(false)}
          title="Play"
          className={styles["controls-icon"]}
        >
          <PlayIcon />
        </span>
      )}
      {!isPaused && (
        <span
          onClick={() => setIsPaused(true)}
          title="Pause"
          className={styles["controls-icon"]}
        >
          <PauseIcon />
        </span>
      )}
    </>
  )
}
