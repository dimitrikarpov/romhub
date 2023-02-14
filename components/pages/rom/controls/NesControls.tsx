import { useState } from "react"
import { ControllerDotMark } from "./ControllerDotMark"
import { ControlsTableRow } from "./ControlsTableRow"
import styles from "./Controls.module.css"

type TControlIconData = {
  path: string
  tooltip: string
}

export type TControlIcons = {
  [key: string]: TControlIconData
}

type TControlMark = {
  top: string
  left: string
}

type TControlElement = {
  name: string
  mark: TControlMark
  icons: TControlIcons
}

const nesKeys: TControlElement[] = [
  {
    name: "up",
    mark: {
      top: "80",
      left: "73",
    },
    icons: {
      keyboard: { path: "/assets/controls/k-up.png", tooltip: "UP ARROW" },
      ps: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
      xbox: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
    },
  },
  {
    name: "down",
    mark: { top: "135", left: "73" },
    icons: {
      keyboard: { path: "/assets/controls/k-down.png", tooltip: "DOWN ARROW" },
      ps: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
      xbox: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
    },
  },
  {
    name: "left",
    mark: { top: "106", left: "46" },
    icons: {
      keyboard: { path: "/assets/controls/k-left.png", tooltip: "LEFT ARROW" },
      ps: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
      xbox: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
    },
  },
  {
    name: "right",
    mark: { top: "106", left: "100" },
    icons: {
      keyboard: {
        path: "/assets/controls/k-right.png",
        tooltip: "RIGHT ARROW",
      },
      ps: {
        path: "/assets/controls/ps-right.png",
        tooltip: "D-PAD RIGHT",
      },
      xbox: {
        path: "/assets/controls/ps-right.png",
        tooltip: "D-PAD RIGHT",
      },
    },
  },
  {
    name: "select",
    mark: { top: "126", left: "174" },
    icons: {
      keyboard: { path: "/assets/controls/k-space.png", tooltip: "space" },
      ps: {
        path: "/assets/controls/ps-options.png",
        tooltip: "ps options",
      },
      xbox: { path: "/assets/controls/x-options.png", tooltip: "xbox options" },
    },
  },
  {
    name: "start",
    mark: { top: "126", left: "238" },
    icons: {
      keyboard: { path: "/assets/controls/k-enter.png", tooltip: "enter" },
      ps: { path: "/assets/controls/ps-share.png", tooltip: "ps share" },
      xbox: { path: "/assets/controls/x-share.png", tooltip: "xbox share" },
    },
  },
  {
    name: "b",
    mark: { top: "107", left: "309" },
    icons: {
      keyboard: { path: "/assets/controls/k-z.png", tooltip: "Z" },
      ps: { path: "/assets/controls/ps-cross.png", tooltip: "ps cross" },
      xbox: { path: "/assets/controls/x-a.png", tooltip: "xbox A" },
    },
  },
  {
    name: "a",
    mark: { top: "107", left: "369" },
    icons: {
      keyboard: { path: "/assets/controls/k-x.png", tooltip: "X" },
      ps: { path: "/assets/controls/ps-circle.png", tooltip: "ps circle" },
      xbox: { path: "/assets/controls/x-b.png", tooltip: "xbox B" },
    },
  },
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

        {nesKeys.map(({ name, mark: { top, left } }) => (
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
            <td>ps</td>
            <td>xbox</td>
          </tr>
        </thead>
        <tbody>
          {nesKeys.map(({ name, icons }) => (
            <ControlsTableRow
              name={name}
              hovered={hovered}
              icons={icons}
              key={name}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
