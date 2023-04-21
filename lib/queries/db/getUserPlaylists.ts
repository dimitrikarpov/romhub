import prisma from "~/lib/prismadb"

export const getUserPlaylists = async (userId: string) => {
  const found = await prisma.playlist.findMany({
    where: { users: { some: { userId } } },
  })

  return found
}
