import { UiPlaylistEntry } from "../../types/index"
import { Item } from "./Item"
import styles from "./styles.module.css"

type Props = {
  entries: UiPlaylistEntry[]
}

export const List: React.FunctionComponent<Props> = ({ entries }) => {
  return (
    <div className={styles["list-conteiner"]}>
      <h2 className={styles["title"]}>Watch history</h2>

      {entries.map((entry) => (
        <Item entry={entry} />
      ))}
    </div>
  )
}
