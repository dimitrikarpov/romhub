import styles from "./InputMapping.module.css"

export const InputMapping = () => {
  return (
    <div>
      <h4>controls</h4>
      <div className={styles.controlsGrid}>
        {Object.entries(keyConfig).map(([gamepadKey, keyboardKey]) => (
          <>
            <div className={styles.controlsGamepadKeyWrapper} key={gamepadKey}>
              {gamepadKey}
            </div>
            <div>{keyboardKey}</div>
          </>
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
