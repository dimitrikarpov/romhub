import { useRouter } from "next/router"
import { useEffect } from "react"
import { TPlatformSlug } from "~/types/index"

export const useGalleryDeepLink = () => {
  const router = useRouter()
  const {
    skip: RSkip,
    platform: RPlatform,
    startsWithLetter: RStartsWithLetter,
  } = router.query

  const skip = RSkip ? Number(RSkip) : 0
  const platform = RPlatform ? (String(RPlatform) as TPlatformSlug) : undefined
  const startsWithLetter = RStartsWithLetter ? String(RStartsWithLetter) : "a"

  useEffect(() => {
    // set url defaults
    const urlParams = new URLSearchParams({
      startsWithLetter: "a",
      skip: String(0),
    })
    router.push(`/?${urlParams.toString()}`, undefined, { shallow: true })
  }, [])

  const updateRoute = ({
    platform,
    skip,
    startsWithLetter,
  }: {
    platform?: TPlatformSlug
    skip?: number
    startsWithLetter?: string
  }) => {
    const urlParams = new URLSearchParams({
      ...(startsWithLetter ? { startsWithLetter } : { startsWithLetter: "a" }),
      ...(skip ? { skip: String(skip) } : { skip: "0" }),
      ...(platform && { platform }),
    })

    router.push(`/?${urlParams.toString()}`, undefined, { shallow: true })
  }

  return { skip, platform, startsWithLetter, updateRoute }
}
