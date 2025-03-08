"use client"
import { Suspense } from "react"
import updateList from "../mutations/updateList"
import getList from "../queries/getList"
import { UpdateListSchema } from "../schemas"
import { FORM_ERROR, ListForm } from "./ListForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditList = ({ listId }: { listId: number }) => {
  const [list, { setQueryData }] = useQuery(
    getList,
    { id: listId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateListMutation] = useMutation(updateList)
  const router = useRouter()
  const itemNames: string[] = []
  list.items.forEach((value) => {
    !itemNames.includes(value.name) ? itemNames.push(value.name) : {}
  })
  return (
    <>
      <div>
        <h1>Edit List {list.id}</h1>
        <pre>{JSON.stringify(list, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ListForm
            submitText="Update List"
            schema={UpdateListSchema}
            initialValues={{ id: list.id, name: list.name, items: itemNames }}
            onSubmit={async (values) => {
              try {
                const updated = await updateListMutation(values)
                await setQueryData(updated)
                router.refresh()
                router.push(`/lists/${list.id}`)
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
