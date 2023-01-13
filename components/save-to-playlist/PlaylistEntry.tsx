import {
  CheckboxBlankIcon,
  CheckboxCheckedIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/icons"
import { api } from "@/lib/api"
import classNames from "classnames"
import { useMutation, useQueryClient } from "react-query"
import styles from "./save-to-playlist.module.css"

type Props = {
  title: string
  isChecked: boolean
  isPublic: boolean
  playlistId: string
  romId: string
}

export const PlaylistEntry: React.FunctionComponent<Props> = ({
  title,
  isChecked,
  isPublic,
  playlistId,
  romId,
}) => {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: api.playlistEntries.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists-with-rom"],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: api.playlistEntries.deleteByRomId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists-with-rom"],
      })
    },
  })

  const onClick = () => {
    if (isChecked) {
      deleteMutation.mutate({ playlistId, romId })
    }

    if (!isChecked) {
      addMutation.mutate({ playlistId, romId })
    }
  }

  return (
    <div className={styles["item"]} onClick={onClick}>
      <div
        className={classNames(styles["item-checkbox"], {
          [styles["item-checkbox--checked"]]: isChecked,
        })}
      >
        {isChecked ? <CheckboxCheckedIcon /> : <CheckboxBlankIcon />}
      </div>
      <div>{title}</div>
      <div className={styles["item-visibility"]}>
        {isPublic ? <GlobeIcon /> : <LockIcon />}
      </div>
    </div>
  )
}
