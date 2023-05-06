import { useRouter } from "next/router"
import { useGenericMutation } from "~/lib/fetcher"
import { type PatchPlaylist } from "~/lib/queries/db/patchPlaylist"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select/select"

type Props = {
  isPublic: boolean
}

export const PrivacySelect: React.FunctionComponent<Props> = ({ isPublic }) => {
  const router = useRouter()
  const { id } = router.query

  const playlistMutation = useGenericMutation<PatchPlaylist>(
    {
      url: `/api/playlists/${id}`,
      options: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      },
    },
    { invalidateQueries: [`/api/playlists/${id}`] },
  )

  const onChange = (value: string): void => {
    const isPublic = value === "public" ? true : false
    playlistMutation.mutate({
      options: {
        body: JSON.stringify({ isPublic }),
      },
    })
  }

  const defaultValue = isPublic ? "public" : "private"

  return (
    <div className="ml-[-4px]">
      <Select
        value={isPublic ? "public" : "private"}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="public">Public</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
