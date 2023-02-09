import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import { dbQueries } from "@/lib/queries/dbQueries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string
  if (!id) return res.status(404).send("Not found")
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) return res.status(404).send("Not Found")

  if (req.method === "POST") {
    const result = await dbQueries.saveSharedPlaylistToLibrary(session, id)

    if (!result) return res.status(404).send("Not found")

    return res.status(200).send("playlist added")
  }

  if (req.method === "DELETE") {
    const result = await dbQueries.deleteSharedPlaylistFromLibrary(session, id)

    if (!result) return res.status(404).send("Not found")

    return res.status(200).send("playlist removed")
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
