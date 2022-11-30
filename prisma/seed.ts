import path from "path"
import { copyFile, readdir, readFile } from "node:fs/promises"
import { PrismaClient } from "@prisma/client"
import { Rom } from "../types"

const prisma = new PrismaClient()

async function main() {
  try {
    const inDir = path.join(__dirname, "in")
    const outDir = path.join(__dirname, "..", "storage", "roms")

    const files = await readdir(inDir)

    files
      .filter(
        // get only meta json file to parse
        (fileName) => path.extname(path.join(inDir, fileName)) === ".json",
      )
      .forEach(async (fileName) => {
        console.log({ fileName })

        const infoData = await readFile(path.join(inDir, fileName), {
          encoding: "utf8",
        })
        const meta: Rom = JSON.parse(infoData)

        /* copying rom file */
        await copyFile(
          path.join(inDir, meta.file),
          path.join(outDir, meta.file),
        )

        /* copying images of rom */
        meta.images?.forEach(async (file) => {
          await copyFile(path.join(inDir, file), path.join(outDir, file))
        })

        /* add rom meta to db */
        await prisma.rom.upsert({
          where: {
            sha1: meta.sha1,
          },
          update: {},
          create: {
            title: meta.title,
            file: meta.file,
            crc32: meta.crc32,
            sha1: meta.sha1,
            tags: JSON.stringify(meta.tags),
            ...(meta.images && { images: JSON.stringify(meta.images) }),
          },
        })

        /* add tags */
        meta.tags?.forEach(async (name) => {
          await prisma.tag.upsert({
            where: { name },
            update: {},
            create: {
              name,
            },
          })
        })
      })
  } catch (err) {
    console.error(err)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
