import { usePlaylistMutation } from "@/lib/queries/react/usePlaylistMutation"
import { useRouter } from "next/router"

type Props = {
  isPublic: boolean
}

export const PrivacySelect: React.FunctionComponent<Props> = ({ isPublic }) => {
  const playlistMutation = usePlaylistMutation({})

  const router = useRouter()
  const { id } = router.query

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isPublic = e.target.value === "public" ? true : false
    playlistMutation.mutate({ id: id as string, data: { isPublic } })
  }

  const defaultValue = isPublic ? "public" : "private"

  return (
    <div className="ml-[-4px]">
      <select
        onChange={onChange}
        defaultValue={defaultValue}
        className="border-none bg-transparent text-sm leading-5 tracking-wide text-white outline-none"
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
