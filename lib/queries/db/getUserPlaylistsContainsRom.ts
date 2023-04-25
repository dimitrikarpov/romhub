import prisma from "~/lib/prismadb"

export type TGetUserPlaylistsContainsRomParams = Parameters<
  typeof getUserPlaylistsContainsRom
>[0]
export type TGetUserPlaylistsContainsRomReturn = ReturnType<
  typeof getUserPlaylistsContainsRom
>

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
