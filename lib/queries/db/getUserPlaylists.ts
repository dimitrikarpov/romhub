import prisma from "~/lib/prismadb"

export type TGetUserPlaylistsParams = Parameters<typeof getUserPlaylists>[0]
export type TGetUserPlaylistsReturn = ReturnType<typeof getUserPlaylists>

export const getUserPlaylists = async ({ userId }: { userId: string }) => {
  const found = await prisma.playlist.findMany({
    where: { users: { some: { userId } } },
  })

  return found
}
