import nextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prismadb"
import { dbQueries } from "@/lib/queries/dbQueries"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async (message) => {
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
