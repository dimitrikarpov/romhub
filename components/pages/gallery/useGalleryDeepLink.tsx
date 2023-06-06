import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react"
import { TPlatformSlug } from "~/types/index"
import { platforms } from "config/index"

export const useGalleryDeepLink = () => {
  const router = useRouter()
  let {
    skip: RSkip,
    platform: RPlatform,
    startsWithLetter: RStartsWithLetter,
  } = router.query

  const USkip = RSkip ? Number(RSkip) : undefined
  const UPlatform = RPlatform ? (String(RPlatform) as TPlatformSlug) : undefined
  const UStartsWithLetter = RStartsWithLetter
    ? String(RStartsWithLetter)
    : undefined

  const LSkip = readFromLocalStorage("skip")
    ? Number(readFromLocalStorage("skip"))
    : null
  const LStartsWithLetter = readFromLocalStorage("startsWithLetter")
  const LPlatform = readFromLocalStorage("platform")

  const DSkip = 0
  const DPlatform = Object.keys(platforms)[0]
  const DStartsWithLetter = "a"

  const skip = USkip || LSkip || DSkip
  const platform = (UPlatform || LPlatform || DPlatform) as TPlatformSlug
  const startsWithLetter =
    UStartsWithLetter || LStartsWithLetter || DStartsWithLetter

  console.log("hook", { s: LSkip, p: LPlatform, l: LStartsWithLetter })

  useLayoutEffect(() => {
    console.log("mounted")

    const currentUrl = new URL(window.location.href)
    const WSkip = currentUrl.searchParams.get("skip")
    const WPlatform = currentUrl.searchParams.get("platform")
    const WStartsWithLetter = currentUrl.searchParams.get("startsWithLetter")

    console.log("w", { s: WSkip, p: WPlatform, l: WStartsWithLetter })

    const urlParams = new URLSearchParams({
      skip: WSkip || String(skip),
      startsWithLetter: WStartsWithLetter || startsWithLetter,
      platform: WPlatform || platform,
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

    router.push(`/?${urlParams.toString()}`, `/?${urlParams.toString()}`, {
      shallow: true,
    })

    saveToLocalStorage("skip", urlParams.get("skip"))
    saveToLocalStorage("platform", urlParams.get("platform"))
    saveToLocalStorage("startsWithLetter", urlParams.get("startsWithLetter"))
  }

  return { skip, platform, startsWithLetter, updateRoute }
}

export const readFromLocalStorage = (key: string) => {
  try {
    const galleryBookmarkRaw = localStorage.getItem("gallery-bookmark")
    if (!galleryBookmarkRaw) return null

    let galleryBookmark: Record<string, string>
    galleryBookmark = JSON.parse(galleryBookmarkRaw)

    return galleryBookmark[key] || null
  } catch (e) {
    return null
  }
}

const saveToLocalStorage = (key: string, value: string | null) => {
  try {
    const galleryBookmarkRaw = localStorage.getItem("gallery-bookmark") || "{}"

    let galleryBookmark: Record<string, string>
    galleryBookmark = JSON.parse(galleryBookmarkRaw)

    const newGalleryBookmark = { ...galleryBookmark }

    if (!value) {
      delete newGalleryBookmark[key]
    } else {
      newGalleryBookmark[key] = value
    }

    localStorage.setItem("gallery-bookmark", JSON.stringify(newGalleryBookmark))
  } catch (e) {}
}
