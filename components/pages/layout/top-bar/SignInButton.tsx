import { signIn } from "next-auth/react"
import { UserIcon } from "lucide-react"

export const SignInButton = () => (
  <div
    onClick={() => signIn()}
    className="mx-[15px] my-0 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#878787bf] px-[15px] py-0 leading-9 hover:border-transparent hover:bg-[#3ea5ff7a]"
  >
    <UserIcon color="#3ea6ff" />
    <span className="text-[#3ea6ff]">Sign in</span>
  </div>
)
