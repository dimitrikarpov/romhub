import { RAStatuses } from "./useRetroarch"

type Props = {
  status: RAStatuses
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
        {status === "inited" && <button onClick={onStartClick}>start!</button>}
      </div>
    </div>
  )
}

// TODO: add "started" status ro RAStatuses
