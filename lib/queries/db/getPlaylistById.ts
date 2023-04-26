import prisma from "~/lib/prismadb"

export type GetPlaylistById = {
  params: Parameters<typeof getPlaylistById>[0]
  data: Awaited<ReturnType<typeof getPlaylistById>>
}

export const getPlaylistById = async ({ id }: { id: string }) => {
  const playlist = await prisma.playlist.findFirst({
    where: { id },
    include: { author: true },
  })

  if (!playlist) throw new Error("aa")

  return playlist
}
