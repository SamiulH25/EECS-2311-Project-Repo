"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteList from "../mutations/deleteList"
import getList from "../queries/getList"
import getUniqueStores from "../../stores/queries/getUniqueStores"
import { DisplayTable } from "./DisplayTable"
import { Item } from "db"
import getUniqueItems from "../../items/queries/getUniqueItems"

export const List = ({ listId }: { listId: number }) => {
  const router = useRouter()
  const [deleteListMutation] = useMutation(deleteList)
  const [list] = useQuery(getList, { id: listId })

  const listItems: string[] = []
  
  list.items.forEach((item) => {
    !listItems.includes(item.name) ? listItems.push(item.name) : []
  })

  const uniqueItemList: Item[] = []
  const [uniqueItems] = useQuery(getUniqueItems, {})
  uniqueItems.items.forEach((item) => {
    listItems.includes(item.name) ? uniqueItemList.push(item) : []
  })

  return (
    <>
      <div>
        <h1>{list.name}</h1>

        {/* Below, it just lists all items available */}
        <ul>
          {uniqueItemList.map((items) => (
            <li key={items.id}>
              <Link href={`/items/${items.id}`}>{items.name}</Link>
            </li>
          ))}
        </ul>

        <DisplayTable listItems={listItems} />
        <br />

        <Link href={`/lists/${list.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteListMutation({ id: list.id })
              router.push("/lists")
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
