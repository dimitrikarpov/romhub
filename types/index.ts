import { PlaylistEntry, Rom } from "@prisma/client"
import { Override } from "./utils"

export type UiRom = Override<Rom, { images: string[] }>

export type UiPlaylistEntry = PlaylistEntry & { rom: UiRom }
