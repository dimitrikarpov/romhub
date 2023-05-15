import { NextApiRequest, NextApiResponse } from "next"
import { getPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"
import superjson from "superjson"
import prisma from "~/lib/prismadb"
import { convertEntity } from "~/lib/convertEntity"
import { getPlaylistEntriesInfinite } from "~/lib/queries/db/getPlaylistEntriesInfinite"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId, cursor, orderBy } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await getPlaylistEntriesInfinite({
      playlistId: playlistId as string,
      cursor: cursor as string,
    })

    console.log({ found })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(superjson.stringify(found))

    //   const limit = 10
    //   const cursor = req.query.cursor ?? ""
    //   const cursorObj = cursor === "" ? undefined : { id: cursor as string }

    //   const data = await prisma.playlistEntry.findMany({
    //     where: { playlistId: playlistId as string },
    //     include: { rom: true, playlist: true },
    //     orderBy: { assignedAt: "desc" },
    //     take: limit,
    //     skip: cursor !== "" ? 1 : 0,
    //     cursor: cursorObj,
    //   })

    //   return res.json({
    //     data: data.map((item) => ({
    //       ...item,
    //       rom: convertEntity.rom.toUiRom(item.rom),
    //     })),
    //     nextCursor: data.length === limit ? data[limit - 1].id : undefined,
    //   })
    // }
  }
}
