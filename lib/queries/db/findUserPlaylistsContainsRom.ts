import prisma from "@/lib/prismadb"

export const findUserPlaylistsContainsRom = async (
  userId: string,
  romId: string,
) => {
  const found = await prisma.playlist.findMany({
    where: {
      AND: [{ entries: { some: { romId } } }, { users: { some: { userId } } }],
      NOT: [{ type: "history" }],
    },
  })

  return found
}
