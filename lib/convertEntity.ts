import { Playlist, PlaylistEntry, Rom, User } from "@prisma/client"
import { UiRom } from "../types"
import { createUrl } from "./storage"

export const convertEntity = {
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
}
