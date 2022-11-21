import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { toUint8Array } from "holy-retroarch"
import { EmulatorComponent } from "../components/emulator/EmulatorComponent"

export default function Emulator() {
  const [rom, setRom] = useState<Uint8Array>()

  const router = useRouter()
  const { coreUrl, romUrl } = router.query

  useEffect(() => {
    if (!coreUrl || !romUrl) return

    console.log({ coreUrl, romUrl })

    const downloadRom = async (romUrl: string) => {
      const rom = await toUint8Array.fromUrl(romUrl)
      setRom(rom)
    }

    downloadRom(String(romUrl))
  }, [coreUrl, romUrl])

  return (
    <>
      {rom && coreUrl && (
        <EmulatorComponent coreUrl={String(coreUrl)} rom={rom} />
      )}
    </>
  )
}
/*
http://localhost:3000/emulator?romUrl=http://localhost:3000/api/storage/Excitebike.nes&coreUrl=https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores/fceumm_libretro.js
*/
