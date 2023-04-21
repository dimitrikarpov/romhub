import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { DescriptionForm, IFormInput } from "./DescriptionForm"
import { DescriptionView } from "./DescriptionView"
import { usePlaylistMutation } from "~/lib/queries/react/usePlaylistMutation"
import { useRouter } from "next/router"

type Props = {
  text: string
  editable: boolean
}

export const Description: React.FunctionComponent<Props> = ({
  text,
  editable,
}) => {
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
