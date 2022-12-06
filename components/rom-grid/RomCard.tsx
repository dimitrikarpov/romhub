import { Rom } from "../../types"
import styles from "../../styles/RomGrid.module.css"

type Props = {
  rom: Rom
}

export const RomCard: React.FunctionComponent<Props> = ({ rom }) => {
  return (
    <a href={`/emulator?id=${rom.id}`} target="_blank">
      <article className={styles.article}>
        <img
          src={rom.images?.[0] || "/assets/placeholder.png"}
          className={styles.image}
          alt="asd"
        />
        <p className={styles.title}>{rom.title}</p>
      </article>
    </a>
  )
}
