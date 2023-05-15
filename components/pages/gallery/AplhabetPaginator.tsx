import clsx from "clsx"

type Props = {
  value: string
  onChange: (letter: string) => void
}

export const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

export const AlphabetPaginator: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex h-14 items-center gap-3 bg-[#0f0f0f] px-2 py-0">
      {["#", ...alphabet].map((letter) => (
        <span
          key={letter}
          onClick={() => onChange(letter)}
          className={clsx(
            "min-w-fit cursor-pointer rounded-md px-3 py-1 text-sm capitalize tracking-wide",
            value !== letter && "bg-[#ffffff1a] text-white",
            value === letter && "bg-white text-black",
          )}
        >
          {letter}
        </span>
      ))}
    </div>
  )
}
