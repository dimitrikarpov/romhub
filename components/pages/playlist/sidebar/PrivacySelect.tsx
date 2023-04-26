import { useRouter } from "next/router"
import { useGenericMutation } from "~/lib/fetcher"
import { type PatchPlaylist } from "~/lib/queries/db/patchPlaylist"

type Props = {
  isPublic: boolean
}

export const PrivacySelect: React.FunctionComponent<Props> = ({ isPublic }) => {
  const router = useRouter()
  const { id } = router.query

  const playlistMutation = useGenericMutation<PatchPlaylist>(
    { url: `/api/playlists/${id}` },
    { invalidateQueries: [`/api/playlists/${id}`] },
  )

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isPublic = e.target.value === "public" ? true : false
    playlistMutation.mutate({
      options: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic }),
      },
    })
  }

  const defaultValue = isPublic ? "public" : "private"

  return (
    <div className="ml-[-4px]">
      <select
        onChange={onChange}
        defaultValue={defaultValue}
        className="border-none bg-transparent text-sm tracking-wide text-white outline-none"
      >
        <option value="private" className="bg-black text-white">
          Private
        </option>
        <option value="public" className="bg-black text-white">
          Public
        </option>
      </select>
    </div>
  )
}
