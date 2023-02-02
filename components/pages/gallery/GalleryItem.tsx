import { UiRom } from "@/types/index"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import styles from "./Gallery.module.css"

type Props = {
  rom: UiRom
}

export const GalleryItem: React.FunctionComponent<Props> = ({ rom }) => {
  const { data: session } = useSession()

  const displayControls = canSaveRomToOwnPlaylist(session)

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card"]}>
        <a href={`/rom/${rom.id}`} target="_blank">
          <img src={rom.images?.[0] || "/assets/placeholder.png"} alt="img" />
        </a>

        <div className={styles["card__description"]}>
          <p className={styles["card__platform"]}>
            Nintendo Entertainment System
          </p>

          <a href={`/rom/${rom.id}`} target="_blank">
            <p className={styles["card__name"]}>{rom.name}</p>
          </a>

          {displayControls && (
            <div className={styles["card__controls"]}>
              <div>Watch later</div>
              <div>Save to Playlist</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// TODO: [permisson]
const canSaveRomToOwnPlaylist = (session: Session | null) => {
  return Boolean(session)
}
