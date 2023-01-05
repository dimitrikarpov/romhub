import React from "react"
import styles from "./InputMapping.module.css"

export const InputMapping = () => {
  return (
    <div>
      <h4>controls</h4>
      <div className={styles.controlsGrid}>
        {Object.entries(keyConfig).map(([gamepadKey, keyboardKey]) => (
          <React.Fragment key={gamepadKey}>
            <div className={styles.controlsGamepadKeyWrapper}>{gamepadKey}</div>
            <div>{keyboardKey}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const keyConfig = {
  "⬆️": "up",
  "⬇️": "down",
  "⬅️": "left",
  "➡️": "right",
  start: "enter",
  select: "space",
  A: "x",
  B: "z",
  X: "s",
  Y: "a",
  L: "q",
  R: "w",
}
