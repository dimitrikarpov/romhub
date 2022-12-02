import { Rom } from "../../types"
import styles from "../../styles/RomGrid.module.css"
import { RomCard } from "./RomCard"

type Props = {
  roms: Rom[]
}

export const RomGrid: React.FunctionComponent<Props> = ({ roms = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {roms.map((rom) => (
          <RomCard rom={rom} key={rom.id} />
        ))}
      </div>
    </div>
  )
}
