import { UiRom } from "@/types/index"
import { GalleryItem } from "./GalleryItem"
import styles from "./Gallery.module.css"

type Props = {
  roms: UiRom[] | undefined
}

export const Gallery: React.FunctionComponent<Props> = ({ roms = [] }) => {
  return (
    <div className={styles["gallery"]}>
      {roms.map((rom) => (
        <GalleryItem rom={rom} key={rom.id} />
      ))}
    </div>
  )
}
