import { Rom } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { createUrl } from "../../../lib/storage"
import { prisma } from "../../../prisma/db"

const transformRomImages = (
  images: string | null | undefined,
): string[] | undefined => {
  return images
    ? JSON.parse(images).map((image: string) => createUrl(image, "roms"))
    : undefined
}

const transformRomTags = (
  tags: string | null | undefined,
): string[] | undefined => {
  return tags ? JSON.parse(tags) : undefined
}

const transfromFile = (file: string): string => {
  return createUrl(file, "roms")
}

export const transformRom = (rom: Rom) => {
  const images = transformRomImages(rom.images)
  const tags = transformRomTags(rom.tags)
  const file = transfromFile(rom.file)

  return { ...rom, file, ...(images && { images }), ...(tags && { tags }) }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log("req", req.query)

  const { skip = 0, take = 15 } = req.query

  const total = await prisma.rom.count()
  const roms = await prisma.rom.findMany({
    skip: Number(skip),
    take: Number(take),
  })

  console.log({ total })

  res.status(200).json({ total, take, skip, data: roms.map(transformRom) })
}
