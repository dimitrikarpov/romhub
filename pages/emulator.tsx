import { useRouter } from "next/router"
import { EmulatorComponent } from "../components/emulator/EmulatorComponent"
import { useRomDownloader } from "../components/emulator/useRomDownloader"

export default function Emulator() {
  const router = useRouter()
  const { coreUrl, romUrl } = router.query
  const { rom } = useRomDownloader(romUrl as string)

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
