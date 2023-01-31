import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { DescriptionForm, IFormInput } from "./DescriptionForm"
import { DescriptionView } from "./DescriptionView"
import styles from "../PlaylistSidebar.module.css"
import { usePlaylistMutation } from "@/lib/queries/react/usePlaylistMutation"
import { useRouter } from "next/router"

type Props = {
  text: string
}

export const Description: React.FunctionComponent<Props> = ({ text }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const playlistMutation = usePlaylistMutation({
    onSuccess: () => {
      setInEditMode(false)
    },
  })

  const router = useRouter()
  const { id } = router.query

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    playlistMutation.mutate({ id: id as string, data })
  }

  return (
    <div className={styles["description-container"]}>
      {!inEditMode && (
        <DescriptionView text={text} toggleToEdit={() => setInEditMode(true)} />
      )}
      {inEditMode && (
        <DescriptionForm
          value={text}
          toggleToView={() => setInEditMode(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}
