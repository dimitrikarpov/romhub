import { signIn } from "next-auth/react"
import { SignInIcon } from "@/components/ui/icons"

export const SignInButton = () => (
  <div
    onClick={() => signIn()}
    className="child-svg-24-w mx-[15px] my-0 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#878787bf] px-[15px] py-0 leading-9 hover:border-transparent hover:bg-[#3ea5ff7a] [&_svg]:fill-[#3ea6ff]"
  >
    <SignInIcon />
    <span className="text-[#3ea6ff]">Sign in</span>
  </div>
)
