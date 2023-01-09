import nextAuth from "next-auth/next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prismadb"
import { NextAuthOptions } from "next-auth"

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
      await prisma.playlist.create({
        data: {
          type: "history",
          title: "History",
          isPublic: false,
          userId: message.user.id,
        },
      })

      await prisma.playlist.create({
        data: {
          type: "watch_later",
          title: "Watch Later",
          isPublic: false,
          userId: message.user.id,
        },
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
