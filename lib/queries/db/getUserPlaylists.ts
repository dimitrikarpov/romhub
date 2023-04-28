import prisma from "~/lib/prismadb"

export type GetUserPlaylists = {
  params: Parameters<typeof getUserPlaylists>[0]
  data: Awaited<ReturnType<typeof getUserPlaylists>>
}

export const getUserPlaylists = async ({ userId }: { userId: string }) => {
  const found = await prisma.playlist.findMany({
    where: { users: { some: { userId } } },
  })

  return found
}
