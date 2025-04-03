"use client"
import styles from "../../styles/Home.module.css"
import logout from "../mutations/logout"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

export function LogoutButton(obj: {textin: string}) {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  
  const text = obj.textin 
  return (
    <>
      <button
        className={styles.button}
        onClick={async () => {
          await logoutMutation()
          router.refresh()
        }}
      >
        {text === null ? <p>Logout</p> : text}
      </button>
    </>
  )
}
