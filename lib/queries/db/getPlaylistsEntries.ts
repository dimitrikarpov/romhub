import { convertEntity } from '@/lib/convertEntity'
import prisma from '@/lib/prismadb'

export const getPlaylistsEntries = async (playlistId: string) => {
  const found = await prisma.playlistEntry.findMany({
    where: { playlistId: playlistId },
    include: { rom: true, playlist: true },
  })

  return found.map((entry) => ({
    ...entry,
    rom: convertEntity.rom.toUiRom(entry.rom),
  }))
}
