import classNames from "classnames"
import styles from "./Controls.module.css"

type Props = {
  name: string
  hovered: string
  children?: React.ReactNode
}

export const TableRow: React.FunctionComponent<Pros> = ({
  name,
  hovered,
  children,
}) => {
  return (
    <tr
      className={classNames({
        [styles["table-row--active"]]: hovered === name,
      })}
    >
      {children}
    </tr>
  )
}
