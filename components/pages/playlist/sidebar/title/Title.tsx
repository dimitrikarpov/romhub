import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { TitleView } from "./TitleView"
import { IFormInput, TitleForm } from "./TitleForm"
import styles from "../PlaylistSidebar.module.css"
import { usePlaylistMutation } from "@/lib/queries/react/usePlaylistMutation"
import { useRouter } from "next/router"

type Props = {
  text: string
  editable: boolean
}

export const Title: React.FunctionComponent<Props> = ({ text, editable }) => {
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
    <div className={styles["title-container"]}>
      {!inEditMode && (
        <TitleView
          text={text}
          editable={editable}
          toggleToEdit={() => setInEditMode(true)}
        />
      )}
      {inEditMode && (
        <TitleForm
          value={text}
          toggleToView={() => setInEditMode(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}
