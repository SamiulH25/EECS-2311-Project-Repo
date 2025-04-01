"use client"
import { FORM_ERROR, ListForm } from "./ListForm"
import { CreateListSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createList from "../mutations/createList"
import { useRouter } from "next/navigation"
import { useSession } from "@blitzjs/auth"

export function New__List() {
  const [createListMutation] = useMutation(createList)
  const router = useRouter()
  return (
    <ListForm
      submitText="Create List"
      schema={CreateListSchema}
      onSubmit={async (values) => {
        try {
          const list = await createListMutation(values)
          router.push(`/lists/${list.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
