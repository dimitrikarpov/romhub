import { SaveToPlaylist } from "@/components/save-to-playlist/SaveToPlaylist"
import { UiPlaylistEntry } from "@/types/index"
import { useRef } from "react"
import styles from "./Item.module.css"
import { ItemMenu } from "./ItemMenu"

type Props = {
  entry: UiPlaylistEntry
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  const saveToDialogRef = useRef<HTMLDialogElement>(null)

  const openSaveToPlaylistModal = () => {
    saveToDialogRef.current?.showModal()
  }

  const closeSaveToPlaylistModal = () => {
    saveToDialogRef.current?.close()
  }

  return (
    <>
      <div className={styles["item"]}>
        <div className={styles["image-box"]}>
          <a href={`/rom?id=${entry.rom.id}`} target="_blank">
            <img src={entry.rom.images?.[0] || "/assets/placeholder.png"} />
          </a>
        </div>

        <div className={styles["item-text"]}>
          <div className={styles["item-text__name"]}>
            <a href={`/rom?id=${entry.rom.id}`} target="_blank">
              {entry.rom.name}
            </a>
          </div>
          <div className={styles["item-text__platform"]}>
            {entry.rom.platform}
          </div>
        </div>

        <div className={styles["item-menu"]}>
          <ItemMenu
            entry={entry}
            onSaveToPlaylistClick={openSaveToPlaylistModal}
          />
        </div>
      </div>

      <dialog ref={saveToDialogRef}>
        <SaveToPlaylist
          romId={entry.rom!.id}
          onClose={closeSaveToPlaylistModal}
        />
      </dialog>
    </>
  )
}
