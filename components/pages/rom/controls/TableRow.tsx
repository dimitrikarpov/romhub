import classNames from "classnames"
import { TControlIcons } from "./NesControls"
import styles from "./Controls.module.css"

type Props = {
  name: string
  hovered: string | undefined
  icons: TControlIcons
}

export const TableRow: React.FunctionComponent<Props> = ({
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
        {icons.keyboard.map(({ path, tooltip }) => (
          <img
            src={path}
            alt=""
            className={styles["control-icon"]}
            title={tooltip}
          />
        ))}
      </td>

      <td>
        {icons.gamepad.map(({ path, tooltip }) => (
          <img
            src={path}
            alt=""
            className={styles["control-icon"]}
            title={tooltip}
          />
        ))}
      </td>
    </tr>
  )
}
