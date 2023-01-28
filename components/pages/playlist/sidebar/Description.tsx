import { useState } from "react"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { PencilIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button/Button"
import styles from "./PlaylistSidebar.module.css"

type Props = {
  text: string
}

export const Description: React.FunctionComponent<Props> = ({ text }) => {
  const [inEditMode, setInEditMode] = useState(false)

  return (
    <div className={styles["description-container"]}>
      {!inEditMode && (
        <DescriptionView text={text} toggleToEdit={() => setInEditMode(true)} />
      )}
      {inEditMode && (
        <DescriptionForm
          value={text}
          toggleToView={() => setInEditMode(false)}
        />
      )}
    </div>
  )
}

type DescriptionViewProps = {
  toggleToEdit: () => void
  text: string
}

const DescriptionView: React.FunctionComponent<DescriptionViewProps> = ({
  text,
  toggleToEdit,
}) => {
  return (
    <div className={styles["view"]}>
      <div className={styles["view-text--description"]}>{text}</div>
      <IconButton icon={PencilIcon} onClick={toggleToEdit} />
    </div>
  )
}

type DescriptionFormProps = {
  toggleToView: () => void
  value: string
}

const DescriptionForm: React.FunctionComponent<DescriptionFormProps> = ({
  value,
  toggleToView,
}) => {
  return (
    <div className={styles["form"]}>
      <div className={styles["input-underline"]}>
        <textarea className={styles["textarea"]} value={value} />
      </div>

      <div className={styles["form-controls"]}>
        <Button variant="transparent-transpared" onClick={toggleToView}>
          Cancel
        </Button>
        <Button type="submit" variant="transparent-transpared">
          Submit
        </Button>
      </div>
    </div>
  )
}
