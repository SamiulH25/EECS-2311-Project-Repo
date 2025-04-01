"use client"
import { FORM_ERROR, ItemForm } from "./ItemForm"
import { CreateItemSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createItem from "../mutations/createItem"
import { useRouter } from "next/navigation"

export function New__Item() {
  const [createItemMutation] = useMutation(createItem)
  const router = useRouter()
  return (
    <ItemForm
      submitText="Create Item"
      schema={CreateItemSchema}
      onSubmit={async (values) => {
        try {
          const item = await createItemMutation(values)
          router.push(`/items/${item.id}`)
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
