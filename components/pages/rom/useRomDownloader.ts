import { useEffect, useState } from "react"
import { toUint8Array } from "holy-retroarch"

type useRomDownloaderStatuses = "idle" | "in-progress" | "done" | "error"

export const useRomDownloader = (romUrl: string | undefined) => {
  const [status, setStatus] = useState<useRomDownloaderStatuses>("idle")
  const [rom, setRom] = useState<Uint8Array>()

  useEffect(() => {
    if (!romUrl || status === "done" || status === "error") return

    const downloadRom = async (romUrl: string) => {
      try {
        setStatus("in-progress")

        const rom = await toUint8Array.fromUrl(romUrl)
        setRom(rom)
        setStatus("done")
      } catch (e) {
        setStatus("error")
      }
    }

    downloadRom(String(romUrl))
  }, [romUrl])

  return { status, rom }
}
