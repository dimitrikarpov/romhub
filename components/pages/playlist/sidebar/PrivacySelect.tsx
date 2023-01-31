import { usePlaylistMutation } from "@/lib/queries/react/usePlaylistMutation"
import { useRouter } from "next/router"
import styles from "./PlaylistSidebar.module.css"

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
    <div className={styles["privacy"]}>
      <select onChange={onChange} defaultValue={defaultValue}>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
    </div>
  )
}
