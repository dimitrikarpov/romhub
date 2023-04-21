import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import { dbQueries } from "~/lib/queries/dbQueries"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method === "DELETE") {
    const { playlistId, romId } = req.query

    if (!session || !playlistId || !romId)
      return res.status(404).send("Not found")

    const result = await dbQueries.deletePlaylistEntryByRom(
      playlistId as string,
      romId as string,
      session,
    )

    if (!result) return res.status(404).send("Not found")

    return res.status(200).send("Entry deleted")
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
