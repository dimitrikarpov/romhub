import { UiPlaylistEntry } from "@/types/index"
import styles from "./styles.module.css"

type Props = {
  entry: UiPlaylistEntry
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  const image = entry.rom.images[0] || "/assets/placeholder.png"

  return (
    <div className={styles["item"]}>
      <a href={`/rom/${entry.rom.id}`} target="_blank">
        <img src={image} alt={entry.rom.name} />
      </a>
      <div>
        <a href={`/rom/${entry.rom.id}`} target="_blank">
          <p className={styles["item__name"]}>{entry.rom.name}</p>
        </a>
        <p className={styles["item__date"]}>
          {entry.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
