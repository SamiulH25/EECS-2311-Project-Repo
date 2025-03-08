"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteItem from "../mutations/deleteItem"
import getItem from "../queries/getItem"
import getStore from "../../stores/queries/getStore"

export const Item = ({ itemId }: { itemId: number }) => {
  const router = useRouter()
  const [deleteItemMutation] = useMutation(deleteItem)
  const [item] = useQuery(getItem, { id: itemId })
  const [store] = useQuery(getStore, { id: item.storeId })

  return (
    <>
      <div>
        <h1>{item.name}</h1>
        <h3>{item.price}</h3>
        <h5>
          From {store.name}, {store.location}
        </h5>
        <pre>{JSON.stringify(item, null, 2)}</pre>

        <Link href={`/items/${item.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemMutation({ id: item.id })
              router.push("/items")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
