import { useState } from "react"
import { ControllerDotMark } from "./ControllerDotMark"
import styles from "./Controls.module.css"
import { TableRow } from "./TableRow"

const nesKeys = [
  { name: "up", top: "80", left: "73" },
  { name: "down", top: "135", left: "73" },
  { name: "left", top: "106", left: "46" },
  { name: "right", top: "106", left: "100" },
  { name: "select", top: "126", left: "174" },
  { name: "start", top: "126", left: "238" },
  { name: "b", top: "107", left: "309" },
  { name: "a", top: "107", left: "369" },
]

export const NesControls = () => {
  const [hovered, setHovered] = useState<string>()

  const highlight = (value: string | undefined) => {
    setHovered(value)
  }

  return (
    <div className={styles["dialog-container"]}>
      <div className={styles["image-container"]}>
        <img src="/assets/controls/nes-controller.png" alt="nes controller" />

        {nesKeys.map(({ name, top, left }) => (
          <ControllerDotMark
            name={name}
            top={top}
            left={left}
            highlight={highlight}
            key={name}
          />
        ))}
      </div>

      <table className={styles["table"]} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <td></td>
            <td>keyboard</td>
            <td>gamepad</td>
          </tr>
        </thead>
        <tbody>
          <TableRow name="up" hovered={hovered}>
            <td>up</td>
            <td>
              <img
                src="/assets/controls/k-up.png"
                alt=""
                className={styles["control-icon"]}
                title="UP"
              />
            </td>
            <td>
              <img
                src="/assets/controls/ps-up.png"
                alt=""
                className={styles["control-icon"]}
                title="D-PAD UP"
              />
            </td>
          </TableRow>
          <TableRow name="down" hovered={hovered}>
            <td>down</td>
            <td>down</td>
            <td>D-PAD down</td>
          </TableRow>
          <TableRow name="left" hovered={hovered}>
            <td>left</td>
            <td>left</td>
            <td>D-PAD left</td>
          </TableRow>
          <TableRow name="right" hovered={hovered}>
            <td>right</td>
            <td>right</td>
            <td>D-PAD right</td>
          </TableRow>

          <TableRow name="select" hovered={hovered}>
            <td>select</td>
            <td>
              <img
                src="/assets/controls/k-space.png"
                alt=""
                className={styles["control-icon"]}
                title="D-PAD UP"
              />
            </td>
            <td>
              <img
                src="/assets/controls/x-options.png"
                alt=""
                className={styles["control-icon"]}
                title="D-PAD UP"
              />

              <img
                src="/assets/controls/ps-options.png"
                alt=""
                className={styles["control-icon"]}
                title="D-PAD UP"
              />
            </td>
          </TableRow>
          <TableRow name="start" hovered={hovered}>
            <td>start</td>
            <td>start</td>
            <td>start</td>
          </TableRow>
          <TableRow name="b" hovered={hovered}>
            <td>B</td>
            <td>B</td>
            <td>B</td>
          </TableRow>
          <TableRow name="a" hovered={hovered}>
            <td>A</td>
            <td>A</td>
            <td>A</td>
          </TableRow>
        </tbody>
      </table>
    </div>
  )
}
