import nextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import TwitchProvider from "next-auth/providers/twitch"
import YandexProvider from "next-auth/providers/yandex"
import prisma from "~/lib/prismadb"
import { dbQueries } from "~/lib/queries/dbQueries"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: "pkce",
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      checks: "pkce",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
      checks: "pkce",
    }),
  ],
  events: {
    createUser: async (message) => {
      // TODO: do not create playlists if user already exists (with email account linking)

      /* creates default playlists for new user */
      await dbQueries.createPlaylist(message.user.id, {
        type: "history",
        title: "History",
        isPublic: false,
      })

      await dbQueries.createPlaylist(message.user.id, {
        type: "watch_later",
        title: "Watch Later",
        isPublic: false,
      })

      await dbQueries.createPlaylist(message.user.id, {
        type: "custom",
        title: "Favorites",
        isPublic: false,
      })
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id

      return session
    },
  },
  secret: process.env.JWT_SECRET,
}

export default nextAuth(authOptions)
