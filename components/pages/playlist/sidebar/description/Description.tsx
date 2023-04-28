import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { DescriptionForm, IFormInput } from "./DescriptionForm"
import { DescriptionView } from "./DescriptionView"
import { useRouter } from "next/router"
import { useGenericMutation } from "~/lib/fetcher"
import { type PatchPlaylist } from "~/lib/queries/db/patchPlaylist"

type Props = {
  text: string
  editable: boolean
}

export const Description: React.FunctionComponent<Props> = ({
  text,
  editable,
}) => {
  const router = useRouter()
  const { id } = router.query
  const [inEditMode, setInEditMode] = useState(false)

  const playlistMutation = useGenericMutation<PatchPlaylist>(
    {
      url: `/api/playlists/${id}`,
      options: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      },
    },
    {
      invalidateQueries: [`/api/playlists/${id}`],
      onSuccess: () => {
        setInEditMode(false)
      },
    },
  )

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    playlistMutation.mutate({
      options: { body: JSON.stringify(data) },
    })
  }

  return (
    <div>
      {!inEditMode && (
        <DescriptionView
          text={text}
          editable={editable}
          toggleToEdit={() => setInEditMode(true)}
        />
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
