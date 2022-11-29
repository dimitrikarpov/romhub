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
  const roms = await prisma.rom.findMany()

  res.status(200).json(roms.map(transformRom))
}
