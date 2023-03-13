import { Playlist, PlaylistEntry, Rom } from "@prisma/client"
import { platforms, playlistTypes } from "config/index"
import { Override } from "./utils"

export type UiRom = Override<Rom, { images: string[]; platform: TPlatformSlug }>

export type UiPlaylistEntry = PlaylistEntry & { rom: UiRom; playlist: Playlist }

export type TPlaylistType = typeof playlistTypes[number]

export type TPlatforms = typeof platforms

export type TPlatformSlug = keyof TPlatforms

export type TCreatePlaylistFormData = {
  type: TPlaylistType
  title: string
  isPublic: boolean
}
