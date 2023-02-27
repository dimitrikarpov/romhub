import { UiRom } from "@/types/index"
import styles from "./RandomGrid.module.css"
import { RandomGridItem } from "./RandomGridItem"

type Props = {
  roms: UiRom[]
}

export const RandomGrid: React.FunctionComponent<Props> = ({ roms }) => {
  return (
    <div className={styles["grid-wrapper"]}>
      <div className={styles["grid"]}>
        {roms.map((rom) => (
          <RandomGridItem rom={rom} key={rom.id} />
        ))}
      </div>
    </div>
  )
}
