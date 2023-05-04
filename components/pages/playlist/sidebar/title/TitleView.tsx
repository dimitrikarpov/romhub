import { IconButton } from "~/components/ui/icon-button/IconButton"
import { PencilIcon } from "lucide-react"

type Props = {
  text: string
  editable: boolean
  toggleToEdit: () => void
}

export const TitleView: React.FunctionComponent<Props> = ({
  text,
  editable,
  toggleToEdit,
}) => {
  return (
    <div className="flex  items-center justify-between">
      <div className="text-3xl font-bold leading-[2.375rem]">{text}</div>
      {editable && (
        <IconButton onClick={toggleToEdit}>
          <PencilIcon width={16} height={16} />
        </IconButton>
      )}
    </div>
  )
}
