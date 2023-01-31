import { IconButton } from "@/components/ui/icon-button/IconButton"
import { PencilIcon } from "@/components/ui/icons"
import styles from "../PlaylistSidebar.module.css"

type Props = {
  toggleToEdit: () => void
  text: string
}

export const TitleView: React.FunctionComponent<Props> = ({
  text,
  toggleToEdit,
}) => {
  return (
    <div className={styles["view"]}>
      <div className={styles["view-text--title"]}>{text}</div>
      <IconButton icon={PencilIcon} onClick={toggleToEdit} />
    </div>
  )
}
