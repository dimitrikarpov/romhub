import { UiRom } from "../../types"
import styles from "../../styles/Gallery.module.css"

type Props = {
  rom: UiRom
}

export const GalleryItem: React.FunctionComponent<Props> = ({ rom }) => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card"]}>
        <a href={`/emulator?id=${rom.id}`} target="_blank">
          <img src={rom.images?.[0] || "/assets/placeholder.png"} alt="img" />
        </a>

        <div className={styles["card__description"]}>
          <p className={styles["card__platform"]}>
            Nintendo Entertainment System
          </p>

          <a href={`/emulator?id=${rom.id}`} target="_blank">
            <p className={styles["card__name"]}>{rom.name}</p>
          </a>

          <div className={styles["card__controls"]}>
            <div>Watch later</div>
            <div>Save to Playlist</div>
          </div>
        </div>
      </div>
    </div>
  )
}
