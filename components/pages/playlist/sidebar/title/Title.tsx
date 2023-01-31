import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { TitleView } from "./TitleView"
import { IFormInput, TitleForm } from "./TitleForm"
import styles from "../PlaylistSidebar.module.css"
import { usePlaylistMutation } from "@/lib/queries/react/usePlaylistMutation"

type Props = {
  text: string
  playlistId: string
}

export const Title: React.FunctionComponent<Props> = ({ text, playlistId }) => {
  const [inEditMode, setInEditMode] = useState(false)
  const playlistMutation = usePlaylistMutation({})

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    playlistMutation.mutate({ id: playlistId, data })

    // await apiQueries.patchPlaylist({ id: playlistId, data })

    console.log({ data })
    setInEditMode(false)
  }

  return (
    <div className={styles["title-container"]}>
      {!inEditMode && (
        <TitleView text={text} toggleToEdit={() => setInEditMode(true)} />
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
