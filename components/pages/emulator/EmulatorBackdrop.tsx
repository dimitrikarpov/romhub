import styles from "../../../styles/Emulator.module.css"
import { RAStatuses } from "./useRetroarch"

type Props = {
  status: RAStatuses
  image: string | undefined
  onStartClick: () => void
}

export const EmulatorBackdrop: React.FunctionComponent<Props> = ({
  status,
  image,
  onStartClick,
}) => {
  return (
    <div
      className={styles.skeleton}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.skeletonBackDrop}>
        {status !== "inited" && <span>loading...</span>}
        {status === "inited" && <button onClick={onStartClick}>start!</button>}
      </div>
    </div>
  )
}

// TODO: add "started" status ro RAStatuses
