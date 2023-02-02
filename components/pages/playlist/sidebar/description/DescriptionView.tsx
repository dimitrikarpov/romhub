import { IconButton } from "@/components/ui/icon-button/IconButton"
import { PencilIcon } from "@/components/ui/icons"
import styles from "../PlaylistSidebar.module.css"

type Props = {
  text: string
  editable: boolean
  toggleToEdit: () => void
}

export const DescriptionView: React.FunctionComponent<Props> = ({
  text,
  editable,
  toggleToEdit,
}) => {
  return (
    <div className={styles["view"]}>
      <div className={styles["view-text--description"]}>{text}</div>
      {editable && <IconButton icon={PencilIcon} onClick={toggleToEdit} />}
    </div>
  )
}
