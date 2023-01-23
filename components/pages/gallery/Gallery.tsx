import { UiRom } from "@/types/index"
import styles from "../../../styles/Gallery.module.css"
import { GalleryItem } from "./GalleryItem"

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
