import { UiRom } from "~/types/index"
import { useState } from "react"
import clsx from "clsx"

type Props = {
  rom: UiRom
}

export const RandomGridItem: React.FunctionComponent<Props> = ({ rom }) => {
  const [visible, setVisible] = useState(false)

  const image = rom.images[0] || "/assets/placeholder.png"

  const onClick = () => {
    if (!visible) {
      setVisible(true)
    }
  }

  return (
    <div
      className={clsx(
        "relative h-[360px] w-[360px] rounded-lg border-2",
        rom.platform === "nes" &&
          "border-[#ffb84c] hover:shadow-[0px_0px_15px_11px_rgba(235,204,92,0.57)]",
        rom.platform === "md" &&
          "border-[#f16767] hover:shadow-[0px_0px_15px_11px_rgba(182,55,38,0.57)]",
      )}
    >
      <div
        onClick={onClick}
        className={clsx(
          "absolute flex h-full w-full flex-col justify-center bg-[#191919] text-center opacity-100",
          visible && "animate-[random-card-display_1000ms_ease_forwards]",
        )}
      >
        <div
          className={clsx(
            "px-0 py-8 text-2xl font-semibold uppercase",
            rom.platform === "nes" &&
              "border border-x-0 border-y-[#ffb84c] bg-[#ffb84c2e] text-[#ffb84c]",
            rom.platform === "md" &&
              "border border-x-0 border-y-[#f16767] bg-[#f1676733] text-[#f16767]",
          )}
        >
          {rom.platform}
        </div>
      </div>
      <a href={`/rom/${rom.id}`} target="_blank">
        <div className="h-full w-full">
          <img
            className="aspect-[1.78] w-full rounded-tl-[5.5px] rounded-tr-[5.5px] object-cover"
            src={image}
            alt={rom.name}
          />
          <p className={clsx("px-0 py-4 text-center text-base font-medium")}>
            {rom.name}
          </p>
          <p className="text-center text-base font-medium uppercase text-[#ababab]">
            {rom.platform}
          </p>
        </div>
      </a>
    </div>
  )
}
