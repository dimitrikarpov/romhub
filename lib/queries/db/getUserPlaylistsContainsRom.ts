import prisma from "~/lib/prismadb"

export type GetUserPlaylistsContainsRom = {
  params: Parameters<typeof getUserPlaylistsContainsRom>[0]
  data: Awaited<ReturnType<typeof getUserPlaylistsContainsRom>>
}

export const getUserPlaylistsContainsRom = async ({
  userId,
  romId,
}: {
  userId: string
  romId: string
}) => {
  const found = await prisma.playlist.findMany({
    where: {
      AND: [{ entries: { some: { romId } } }, { users: { some: { userId } } }],
      NOT: [{ type: "history" }],
    },
  })

  return found
}
