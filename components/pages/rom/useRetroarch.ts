import { RefObject, useEffect, useRef } from "react"
import { Retroarch } from "holy-retroarch"

export const useRetroarch = (
  coreUrl: string | undefined,
  canvas: RefObject<HTMLCanvasElement>,
) => {
  let retroarch = useRef<Retroarch>()

  useEffect(() => {
    console.log("RRRRRRRRRRrrr", retroarch.current?.status)

    if (
      !coreUrl ||
      canvas.current === null ||
      retroarch.current?.status !== undefined
    )
      return

    const init = async () => {
      console.log("in init")

      try {
        retroarch.current = new Retroarch(
          coreUrl,
          canvas.current as HTMLCanvasElement,
        )

        retroarch.current.init()
        console.log("in iiiiiiiiiiiiinit")
      } catch (e) {}
    }

    init()
  }, [coreUrl, canvas])

  return { retroarch }
}
