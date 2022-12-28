import path from "path"
import { copyFile, readdir, readFile } from "node:fs/promises"
import { Rom } from "../types"
import { prisma } from "./db"

const findDescriptions = async (inDir: string) => {
  const files = await readdir(inDir)

  return files.filter(
    (fileName) => path.extname(path.join(inDir, fileName)) === ".json",
  )
}

async function main() {
  const inDir = path.join(__dirname, "..", "storage", "import")
  const outDir = path.join(__dirname, "..", "storage", "roms")

  const files = await findDescriptions(inDir)

  for (let c = 0; c < files.length; c++) {
    let infoData = await readFile(path.join(inDir, files[c]), {
      encoding: "utf8",
    })
    const meta: Rom = JSON.parse(infoData)

    if (!meta.platform) {
      console.log("--->", meta)
      continue
    }

    /* copying rom file */
    await copyFile(path.join(inDir, meta.file), path.join(outDir, meta.file))

    /* copying images of rom */
    meta.images?.forEach(async (file) => {
      await copyFile(path.join(inDir, file), path.join(outDir, file))
    })

    /* copying json meta file */
    await copyFile(path.join(inDir, files[c]), path.join(outDir, files[c]))

    /* add rom meta to db */
    await prisma.rom.upsert({
      where: {
        sha1: meta.sha1,
      },
      update: {},
      create: {
        name: meta.name,
        platform: meta.platform,
        file: meta.file,
        crc32: meta.crc32,
        sha1: meta.sha1,
        ...(meta.images && { images: JSON.stringify(meta.images) }),
      },
    })

    console.log(`${c} of ${files.length}: [${meta.platform}] ${meta.name}`)
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

/*
  {
    "name":"Casino Derby (Japan)",
    "images":["0a4f206eef8f5e31508547af2ea349c952fb4a5f-snap.png","0a4f206eef8f5e31508547af2ea349c952fb4a5f-title.png"],
    "file":"0a4f206eef8f5e31508547af2ea349c952fb4a5f.nes",
    "crc32":"67f0c00f",
    "sha1":"0a4f206eef8f5e31508547af2ea349c952fb4a5f",
    "platform":"nes"
  }
  */
