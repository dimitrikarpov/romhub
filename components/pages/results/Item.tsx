import { UiRom } from "@/types/index"
import styles from "./Item.module.css"

type Props = {
  rom: UiRom
}

export const Item: React.FunctionComponent<Props> = ({ rom }) => {
  const image = rom.images[0] || "/assets/placeholder.png"

  return (
    <div className={styles["item"]}>
      <a href={`/rom/${rom.id}`} target="_blank">
        <img src={image} alt={rom.name} />
      </a>

      <div>
        <a href={`/rom/${rom.id}`} target="_blank">
          <p className={styles["item__name"]}>{rom.name}</p>
        </a>
        <p className={styles["item__date"]}>{rom.platform}</p>
      </div>
    </div>
  )
}
