import prisma from "@/lib/prismadb"

export const findUserPlaylists = async (userId: string) => {
  const found = await prisma.playlist.findMany({
    where: { users: { every: { userId } } },
  })

  return found
}
