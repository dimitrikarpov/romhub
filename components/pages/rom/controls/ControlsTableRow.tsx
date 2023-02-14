import classNames from "classnames"
import { TControlIcons } from "./controls-configs"
import styles from "./Controls.module.css"

type Props = {
  name: string
  hovered: string | undefined
  icons: TControlIcons
}

export const ControlsTableRow: React.FunctionComponent<Props> = ({
  name,
  hovered,
  icons,
}) => {
  return (
    <tr
      className={classNames({
        [styles["table-row--active"]]: hovered === name,
      })}
    >
      <td>{name}</td>

      <td>
        <img
          src={icons.keyboard.path}
          alt=""
          className={styles["control-icon"]}
          title={icons.keyboard.tooltip}
          key={icons.keyboard.path}
        />
      </td>

      <td>
        <img
          src={icons.ps.path}
          alt=""
          className={styles["control-icon"]}
          title={icons.ps.tooltip}
          key={icons.ps.path}
        />
      </td>

      <td>
        <img
          src={icons.xbox.path}
          alt=""
          className={styles["control-icon"]}
          title={icons.xbox.tooltip}
          key={icons.xbox.path}
        />
      </td>
    </tr>
  )
}
