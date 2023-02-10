import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { TPlatforms } from "@/types/index"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { SearchProvider } from "../contexts/search/SearchProvider"
import { SidebarProvider } from "@/components/pages/layout/sidebar/SidebarProvider"
import "../styles/globals.css"

const client = new QueryClient()

export const platforms: TPlatforms = {
  nes: { name: "Nintendo Entertainment System", shortName: "NES" },
  md: { name: "Sega Genesis", shortName: "MEGADRIVE" },
  sfc: { name: "Super Nintendo Entertainment System", shortName: "SNES" },
} as const

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <SearchProvider>
          <SidebarProvider>
            {getLayout(<Component {...pageProps} />)}
          </SidebarProvider>
        </SearchProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
