import { filename } from "./filename"
import { createUrl } from "./storage"

const extToCoreMap: Record<string, string> = {
  nes: "fceumm",
  sfc: "snes9x",
  md: "genesis_plus_gx",
}

export const getCoreUrlByRomName = (
  romFileName: string,
): string | undefined => {
  const extension = filename.getExtension(romFileName)

  const core = extToCoreMap[extension]

  if (!core) return undefined

  return createUrl(`${core}_libretro.js`, "cores")
}
