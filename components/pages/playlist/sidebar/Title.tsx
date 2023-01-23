import { useState } from "react"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { PencilIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button/Button"
import styles from "./Title.module.css"

type Props = {
  text: string
}

export const Title: React.FunctionComponent<Props> = ({ text }) => {
  const [inEditMode, setInEditMode] = useState(true)

  return (
    <div className={styles["title-container"]}>
      {!inEditMode && (
        <TitleView text={text} toggleToEdit={() => setInEditMode(true)} />
      )}
      {inEditMode && (
        <TitleForm value={text} toggleToView={() => setInEditMode(false)} />
      )}
    </div>
  )
}

type TitleViewProps = {
  toggleToEdit: () => void
  text: string
}

const TitleView: React.FunctionComponent<TitleViewProps> = ({
  text,
  toggleToEdit,
}) => {
  return (
    <div className={styles["title-view"]}>
      <div className={styles["title-view-text"]}>{text}</div>
      <IconButton icon={PencilIcon} onClick={toggleToEdit} />
    </div>
  )
}

type TitleFormProps = {
  toggleToView: () => void
  value: string
}

const TitleForm: React.FunctionComponent<TitleFormProps> = ({
  value,
  toggleToView,
}) => {
  return (
    <div className={styles["title-form"]}>
      <div className={styles["input-underline"]}>
        <input type="text" name="" id="" value={value} />
      </div>

      <div className={styles["title-form-controls"]}>
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
