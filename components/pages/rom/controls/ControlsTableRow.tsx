import { TControlIcons } from "./controls-configs"
import clsx from "clsx"

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
    <tr className={clsx(hovered === name && "bg-[cadetblue]")}>
      <td>{name}</td>

      <td>
        <img
          src={icons.keyboard.path}
          alt=""
          className="pixelated h-8 max-w-none"
          title={icons.keyboard.tooltip}
          key={icons.keyboard.path}
        />
      </td>

      <td>
        <img
          src={icons.ps.path}
          alt=""
          className="pixelated h-8 max-w-none"
          title={icons.ps.tooltip}
          key={icons.ps.path}
        />
      </td>

      <td>
        <img
          src={icons.xbox.path}
          alt=""
          className="pixelated h-8 max-w-none"
          title={icons.xbox.tooltip}
          key={icons.xbox.path}
        />
      </td>
    </tr>
  )
}
