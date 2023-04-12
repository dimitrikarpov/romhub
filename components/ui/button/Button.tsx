import clsx from "clsx"

type Props = {
  type?: "button" | "submit"
  variant?:
    | "default"
    | "transparent-blue"
    | "blue-blue"
    | "transparent-transpared"
  maxWidth?: boolean
  startIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FunctionComponent<Props> = ({
  variant = "default",
  maxWidth = false,
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "c-svg-24 c-svg-w flex cursor-pointer items-center gap-2 rounded-3xl border-none px-3 py-0 text-sm/9 transition-colors duration-300 disabled:pointer-events-none disabled:opacity-75",
        maxWidth ? "w-full" : "w-fit",
        variant === "default" && "bg-[#ffffff14] text-white hover:bg-[#717171]",
        variant === "transparent-blue" &&
          "bg-transparent text-[#3ea6ff] hover:bg-[#263850]",
        variant === "blue-blue" &&
          "bg-[#3ea6ff] text-[#0f0f0f] hover:bg-[#65b8ff]",
        variant === "transparent-transpared" &&
          "bg-transparent text-white hover:bg-[#ffffff1a]",
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
