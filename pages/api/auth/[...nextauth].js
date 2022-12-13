import nextAuth from "next-auth/next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prismadb"

export default nextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    createUser: async (message) => {
      /* creates default playlist for new user */
      await prisma.playlist.create({
        data: {
          name: "Watch Later",
          description: "Default playlist",
          isPublic: false,
          userId: message.user.id,
        },
      })
    },
  },
  secret: process.env.JWT_SECRET,
})
