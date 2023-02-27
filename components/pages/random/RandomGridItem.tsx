import { UiRom } from "@/types/index"
import classNames from "classnames"
import { useState } from "react"
import styles from "./RandomGridItem.module.css"

type Props = {
  rom: UiRom
}

export const RandomGridItem: React.FunctionComponent<Props> = ({ rom }) => {
  const [visible, setVisible] = useState(false)

  const image = rom.images[0] || "/assets/placeholder.png"

  const onClick = () => {
    if (!visible) {
      setVisible(true)
    }
  }

  return (
    <div
      className={classNames(styles["item"], [styles[rom.platform]])}
      onClick={onClick}
    >
      <div
        className={classNames(styles["cover"], {
          [styles["cover-visible"]]: !visible,
        })}
      ></div>
      <div className={styles["content"]}>
        <img className={styles["item-image"]} src={image} alt={rom.name} />
        <p className={styles["item-name"]}>{rom.name}</p>
        <p className={styles["item-platform"]}>{rom.platform}</p>
      </div>
    </div>
  )
}
