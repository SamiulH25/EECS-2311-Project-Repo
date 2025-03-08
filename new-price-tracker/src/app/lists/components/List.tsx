"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteList from "../mutations/deleteList"
import getList from "../queries/getList"
import db, { Item, Store } from "@/db"
import getItems from "../../items/queries/getItems"
import getStores from "../../stores/queries/getStores"
import getUniqueItems from "../../items/queries/getUniqueItems"
import getItem from "../../items/queries/getItem"
import getUniqueStores from "../../stores/queries/getUniqueStores"
import getStore from "../../stores/queries/getStore"

export const List = ({ listId }: { listId: number }) => {
  const router = useRouter()
  const [deleteListMutation] = useMutation(deleteList)
  const [list] = useQuery(getList, { id: listId })
  const [stors] = useQuery(getStores, {})
  const listItems = list.items
  const items: Item[] = []
  const stores: Store[] = []

  return (
    <>
      <div>
        <h1>{list.name}</h1>
        {/*<pre>{JSON.stringify(list, null, 2)}</pre>*/}

        <ul>
          {listItems
            .sort((pID, cID) => pID.storeName.localeCompare(cID.storeName))
            .map((items) => (
              <li key={items.id}>
                <Link href={`/items/${items.id}`}>
                  {items.name} from {items.storeName} at {items.storeLocation}
                </Link>
                <p>{items.price}</p>
              </li>
            ))}
        </ul>

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
