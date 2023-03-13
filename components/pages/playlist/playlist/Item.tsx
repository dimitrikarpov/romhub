import { UiPlaylistEntry } from "@/types/index"
import { ItemMenu } from "./ItemMenu"
import { platforms } from "config/index"
import styles from "./Item.module.css"

type Props = {
  entry: UiPlaylistEntry
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  return (
    <>
      <div className={styles["item"]}>
        <div className={styles["image-box"]}>
          <a href={`/rom/${entry.rom.id}`} target="_blank">
            <img src={entry.rom.images?.[0] || "/assets/placeholder.png"} />
          </a>
        </div>

        <div className={styles["item-text"]}>
          <div className={styles["item-text__name"]}>
            <a href={`/rom/${entry.rom.id}`} target="_blank">
              {entry.rom.name}
            </a>
          </div>
          <div className={styles["item-text__platform"]}>
            {platforms[entry.rom.platform].shortName}
          </div>
        </div>

        <div className={styles["item-menu"]}>
          <ItemMenu entry={entry} />
        </div>
      </div>
    </>
  )
}
