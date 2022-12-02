import { useRouter } from "next/router"
import { Rom } from "../../types"
import styles from "../../styles/RomGrid.module.css"

type Props = {
  rom: Rom
}

export const RomCard: React.FunctionComponent<Props> = ({ rom }) => {
  const router = useRouter()

  const onClick = (id: string) => {
    router.replace(`/emulator?id=${id}`)
  }

  return (
    <article className={styles.article} onClick={() => onClick(rom.id)}>
      <img
        src={rom.images?.[0] || "/assets/placeholder.png"}
        className={styles.image}
        alt="asd"
      />
      <p className={styles.title}>{rom.title}</p>
    </article>
  )
}
