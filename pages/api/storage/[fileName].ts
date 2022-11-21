import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const staticPath = path.join(__dirname, "../../../../../", "roms")
  const { fileName } = req.query

  if (!fileName) return res.status(404).json("no such file")

  const filePath = path.resolve(staticPath, fileName as string)
  try {
    const fileBuffer = fs.readFileSync(filePath)
    // res.setHeader("Content-Type", "image/png")
    res.send(fileBuffer)
  } catch (e) {
    res.status(404).json("no such file")
  }
}
