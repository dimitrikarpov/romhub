import styles from "../../styles/RomGrid.module.css"

type Props = {
  onPlatformChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const RomGridControls: React.FunctionComponent<Props> = ({
  onPlatformChange,
}) => {
  return (
    <div className={styles.controlsContainer}>
      <label className={styles.controlsContainerPlatform}>
        Platform
        <select onChange={onPlatformChange}>
          <option value="all">----</option>
          <option value="nes">NES </option>
          <option value="md">Sega Genesis</option>
          <option value="sfc">SNES</option>
        </select>
      </label>
    </div>
  )
}
