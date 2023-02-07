import {
  CheckboxBlankIcon,
  CheckboxCheckedIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/ui/icons"
import { useCreatePlaylistEntryMutation } from "@/lib/queries/react/useCreatePlaylistEntryMutation"
import { useDeletePlaylistEntryByRomMutation } from "@/lib/queries/react/useDeletePlaylistEntryByRomMutation"
import classNames from "classnames"
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
  const addMutation = useCreatePlaylistEntryMutation({})
  const deleteMutation = useDeletePlaylistEntryByRomMutation({})

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
