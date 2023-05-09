import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "~/lib/cn"

const buttonVariants = cva(
  "flex cursor-pointer items-center gap-2 rounded-3xl border-none px-3 py-0 text-sm/9 transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#ffffff14] text-white hover:bg-[#717171]",
        "transparent-blue": "bg-transparent text-[#3ea6ff] hover:bg-[#263850]",
        "blue-blue": "bg-[#3ea6ff] text-[#0f0f0f] hover:bg-[#65b8ff]",
        "transparent-transpared":
          "bg-transparent text-white hover:bg-[#ffffff1a]",
      },
      width: {
        default: "w-fit",
        max: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      width: "default",
    },
  },
)

export interface YTButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const YTButton = React.forwardRef<HTMLButtonElement, YTButtonProps>(
  ({ className, variant, width, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, width, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
YTButton.displayName = "Button"

export { YTButton, buttonVariants }
