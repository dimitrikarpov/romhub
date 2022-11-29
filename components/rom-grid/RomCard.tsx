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
      <h4>{rom.title}</h4>
      <img src={rom.images?.[0]} className={styles.image} alt="asd" />
      <div>
        {rom.tags?.map((tag, index) => (
          <span className={styles.tag} key={index}>
            {tag}
          </span>
        ))}
      </div>
      {rom.description && <p>{rom.description}</p>}
    </article>
  )
}
