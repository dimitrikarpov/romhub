import TopBar from "./top-bar/TopBar"
import { Sidebar } from "./sidebar/Sidebar"

type Props = {
  children?: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      <TopBar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
