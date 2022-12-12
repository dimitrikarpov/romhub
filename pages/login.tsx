import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()

  console.log({ session })

  if (session) {
    return (
      <>
        <h2>Welcome, {session.user?.email}</h2>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  } else {
    return (
      <>
        <h2>You are not signed in</h2>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
}
