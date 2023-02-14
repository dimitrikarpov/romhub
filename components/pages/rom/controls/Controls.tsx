import { useState } from "react"
import { ControllerDotMark } from "./ControllerDotMark"
import { ControlsTableRow } from "./ControlsTableRow"
import styles from "./Controls.module.css"
import { TControlsConfig } from "./controls-configs"

type Props = {
  config: TControlsConfig
}

export const Controls: React.FunctionComponent<Props> = ({ config }) => {
  const [hovered, setHovered] = useState<string>()

  const highlight = (value: string | undefined) => {
    setHovered(value)
  }

  return (
    <div className={styles["dialog-container"]}>
      <div className={styles["image-container"]}>
        <img src={config.image} alt="" />

        {config.elements.map(({ name, mark: { top, left } }) => (
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
          {config.elements.map(({ name, icons }) => (
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
