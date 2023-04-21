import { Playlist, PlaylistEntry, Rom, User } from "@prisma/client"
import { UiRom } from "../types"
import { createUrl } from "./storage"
import { ConvertDatePropToString } from "~/types/utils"

export const convertEntity = {
  user: {
    serializeDates: (user: User) => ({
      ...user,
      emailVerified:
        user.emailVerified === null ? null : user.emailVerified.toString(),
    }),

    unserializeDates: (user: ConvertDatePropToString<User>) => ({
      ...user,
      emailVerified:
        user.emailVerified === null ? null : new Date(user.emailVerified),
    }),
  },

  rom: {
    toUiRom: (rom: Rom): UiRom => {
      const file = createUrl(rom.file, "roms")
      const images = rom.images
        ? JSON.parse(rom.images).map((image: string) =>
            createUrl(image, "roms"),
          )
        : undefined

      return { ...rom, file, ...(images && { images }) }
    },
  },

  playlist: {
    serializeDates: (playlist: Playlist) => {
      return { ...playlist, updatedAt: playlist.updatedAt.toString() }
    },
    unserializeDates: (playlist: ConvertDatePropToString<Playlist>) => {
      return { ...playlist, updatedAt: new Date(playlist.updatedAt) }
    },
  },

  playlistEntry: {
    serializeDates: (entry: PlaylistEntry) => {
      return { ...entry, assignedAt: entry.assignedAt.toString() }
    },
    unserializeDates: (entry: ConvertDatePropToString<PlaylistEntry>) => {
      return { ...entry, assignedAt: new Date(entry.assignedAt) }
    },
  },
}
