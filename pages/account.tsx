import { useSession, signIn, signOut } from "next-auth/react"

const Account = () => {
  const { data: session, status } = useSession({ required: true })

  console.log("client side", session, status)

  if (!session) {
    return <h2>not logged in</h2>
  } else {
    return (
      <>
        <h2>Hello, {session.user?.name}</h2>
        <button
          onClick={() => {
            signOut()
          }}
        >
          log out
        </button>
      </>
    )
  }
}

export default Account
