import clsx from "clsx"
import { platforms } from "config"
import { SlidersHorizontalIcon } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { YTButton } from "~/components/ui/button/YTButton"
import { TPlatformSlug } from "~/types/index"
import { selectPlatform, setPlatform, setSkip } from "./searchSlice"

export const Filters = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)

  const [isVisible, setIsVisible] = useState(false)

  const toggle = () => {
    setIsVisible((value) => !value)
  }

  const select = (shortName: TPlatformSlug | undefined) => {
    dispatch(setPlatform(shortName))
    dispatch(setSkip(0))
    setIsVisible(false)
  }

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "border-0 border-b border-[rgba(255,255,255,0.2)]",
          isVisible && "border-b-0",
        )}
      >
        <YTButton variant="transparent-transpared" onClick={toggle}>
          <SlidersHorizontalIcon width={16} height={16} />
          Filters
        </YTButton>
      </div>

      {isVisible && (
        <div className="flex justify-between border-0 border-b border-[rgba(255,255,255,0.2)]">
          <div>
            <div className="mx-0 my-1 border-0 border-b border-[rgba(255,255,255,0.2)] px-0 py-4 text-sm font-medium uppercase leading-4 text-[#f1f1f1]">
              platform
            </div>

            <p
              onClick={() => select(undefined)}
              className={clsx(
                "cursor-pointer px-0 py-4 text-sm text-[#aaa]",
                !platform && "font-medium text-[#f1f1f1]",
              )}
            >
              All
            </p>
            {Object.entries(platforms).map(([slug, { name, shortName }]) => (
              <p
                key={shortName}
                onClick={() => select(slug as TPlatformSlug)}
                className={clsx(
                  "cursor-pointer px-0 py-4 text-sm text-[#aaa]",
                  platform === slug && "font-medium text-[#f1f1f1]",
                )}
              >
                {name}
              </p>
            ))}
          </div>

          <div>
            <div className="mx-0 my-1 border-0 border-b border-[rgba(255,255,255,0.2)] px-0 py-4 text-sm font-medium uppercase leading-4 text-[#f1f1f1]">
              type
            </div>
            <p className="cursor-not-allowed px-0 py-[15px] text-sm text-[#aaa] ">
              Rom
            </p>
            <p className="cursor-not-allowed px-0 py-[15px] text-sm text-[#aaa]">
              Playlist
            </p>
          </div>

          <div>
            <div className="mx-0 my-1 border-0 border-b border-[rgba(255,255,255,0.2)] px-0 py-4 text-sm font-medium uppercase leading-4 text-[#f1f1f1]">
              Sort By
            </div>
            <p className="cursor-not-allowed px-0 py-4 text-sm text-[#aaa]">
              Rating
            </p>
            <p className="cursor-not-allowed px-0 py-4 text-sm text-[#aaa]">
              Upload date
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
