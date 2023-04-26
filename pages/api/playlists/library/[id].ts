import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import { saveSharedPlaylistToLibrary } from "~/lib/queries/db/saveSharedPlaylistToLibrary"
import { deleteSharedPlaylistFromLibrary } from "~/lib/queries/db/deleteSharedPlaylistFromLibrary"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string
  if (!id) return res.status(404).send("Not found")
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) return res.status(404).send("Not Found")

  if (req.method === "POST") {
    const result = await saveSharedPlaylistToLibrary({
      session,
      playlistId: id,
    })

    if (!result) return res.status(404).send("Not found")

    return res.status(200).json({ result: "playlist added" })
  }

  if (req.method === "DELETE") {
    const result = await deleteSharedPlaylistFromLibrary(session, id)

    if (!result) return res.status(404).send("Not found")

    return res.status(200).json({ result: "playlist removed" })
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
