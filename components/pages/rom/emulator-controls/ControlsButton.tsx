import { GamepadIcon } from "~/components/ui/icons"

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
