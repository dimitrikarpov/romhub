import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { TitleView } from "./TitleView"
import { IFormInput, TitleForm } from "./TitleForm"
import { useRouter } from "next/router"
import { useGenericMutation } from "~/lib/fetcher"
import { type PatchPlaylist } from "~/lib/queries/db/patchPlaylist"

type Props = {
  text: string
  editable: boolean
}

export const Title: React.FunctionComponent<Props> = ({ text, editable }) => {
  const router = useRouter()
  const { id } = router.query
  const [inEditMode, setInEditMode] = useState(false)

  const playlistMutation = useGenericMutation<PatchPlaylist>(
    { url: `/api/playlists/${id}` },
    {
      invalidateQueries: [`/api/playlists/${id}`],
      onSuccess: () => {
        setInEditMode(false)
      },
    },
  )

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    playlistMutation.mutate({
      options: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    })
  }

  return (
    <div>
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
