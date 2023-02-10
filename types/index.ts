import { Playlist, PlaylistEntry, Rom } from "@prisma/client"
import { Override } from "./utils"

export type UiRom = Override<Rom, { images: string[] }>

export type UiPlaylistEntry = PlaylistEntry & { rom: UiRom; playlist: Playlist }

export const playlistTypes = ["history", "watch_later", "custom"] as const

export type TPlaylistType = typeof playlistTypes[number]

export type TPlatforms = {
  [slug: string]: { name: string; shortName: string }
}

export type TCreatePlaylistFormData = {
  type: TPlaylistType
  title: string
  isPublic: boolean
}
