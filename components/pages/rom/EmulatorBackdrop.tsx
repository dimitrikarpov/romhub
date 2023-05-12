import { type RetroarchStatus } from "holy-retroarch"

type Props = {
  status: RetroarchStatus
  image: string | undefined
  onStartClick: () => void
}

export const EmulatorBackdrop: React.FunctionComponent<Props> = ({
  status,
  image,
  onStartClick,
}) => {
  return (
    <div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex h-full w-full items-center justify-center backdrop-blur">
        {status !== "inited" && <span>loading...</span>}
        {status === "inited" && (
          <button
            onClick={onStartClick}
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            start!
          </button>
        )}
      </div>
    </div>
  )
}

// TODO: add "started" status ro RAStatuses
