import { GamepadIcon } from "./Icons"

type Props = {
  show: () => void
}

export const ControlsButton: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <span onClick={show} title="Controls">
      <GamepadIcon />
    </span>
  )
}
