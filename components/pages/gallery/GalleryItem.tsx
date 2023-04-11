import { UiRom } from "@/types/index"
import { platforms } from "config/index"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"

type Props = {
  rom: UiRom
}

export const GalleryItem: React.FunctionComponent<Props> = ({ rom }) => {
  const { data: session } = useSession()

  const displayControls = canSaveRomToOwnPlaylist(session)

  return (
    <div className="card-container">
      <div className="card">
        <a href={`/rom/${rom.id}`} target="_blank">
          <img src={rom.images?.[0] || "/assets/placeholder.png"} alt="img" />
        </a>

        <div className="pb-5 pl-2 pr-2 pt-4">
          <p className="text-xs font-medium uppercase text-[#ababab]">
            {platforms[rom.platform].shortName}
          </p>

          <a href={`/rom/${rom.id}`} target="_blank">
            <p className="line-clamp-2 text-base">{rom.name}</p>
          </a>

          {displayControls && (
            <div className="card__controls">
              <div>Watch later</div>
              <div>Save to Playlist</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// TODO: [permisson]
const canSaveRomToOwnPlaylist = (session: Session | null) => {
  return Boolean(session)
}
