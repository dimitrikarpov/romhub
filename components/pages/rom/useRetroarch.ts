import { RefObject, useEffect, useRef, useState } from "react"
import { Retroarch } from "holy-retroarch"

export type RAStatuses = "not-inited" | "in-init-progress" | "inited" | "error"

export const useRetroarch = (
  coreUrl: string | undefined,
  canvas: RefObject<HTMLCanvasElement>,
) => {
  let retroarch = useRef<Retroarch>()
  const [status, setStatus] = useState<RAStatuses>("not-inited")

  useEffect(() => {
    if (!coreUrl || canvas.current === null || status !== "not-inited") return

    const init = async () => {
      try {
        setStatus("in-init-progress")
        retroarch.current = new Retroarch(
          coreUrl,
          canvas.current as HTMLCanvasElement,
        )
        await retroarch.current.init()
        setStatus("inited")
      } catch (e) {
        setStatus("error")
      }
    }

    init()
  }, [coreUrl, canvas])

  return { status, retroarch }
}
