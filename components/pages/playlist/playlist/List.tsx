import { UiPlaylistEntry } from "@/types/index"
import styles from "./List.module.css"

type Props = {
  entries: UiPlaylistEntry[]
}

export const List: React.FunctionComponent<Props> = ({ entries }) => {
  return (
    <div className={styles["playlist-container"]}>
      {entries.map(() => null)}
    </div>
  )
}
