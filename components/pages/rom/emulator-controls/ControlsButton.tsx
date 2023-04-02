import { GamepadIcon } from "@/components/ui/icons"
import styles from "../EmulatorComponent.module.css"

type Props = {
  show: () => void
}

export const ControlsButton: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <span onClick={show} title="Controls" className={styles["controls-icon"]}>
      <GamepadIcon />
    </span>
  )
}
