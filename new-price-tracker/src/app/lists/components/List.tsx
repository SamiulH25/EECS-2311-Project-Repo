"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteList from "../mutations/deleteList"
import getList from "../queries/getList"
import getUniqueStores from "../../stores/queries/getUniqueStores"

export const List = ({ listId }: { listId: number }) => {
  const router = useRouter()
  const [deleteListMutation] = useMutation(deleteList)
  const [list] = useQuery(getList, { id: listId })

  const listItems: string[] = []
  list.items.forEach((item) => {
    !listItems.includes(item.name) ? listItems.push(item.name) : []
  })

  /* Yooo This could easily be its own component.. It basically gets total price of list by each store */
  /* ----------------------------------------------------------------------------------------------------- */
  let priceTotal = new Map()
  let itemTotal = new Map()
  const [stores] = useQuery(getUniqueStores, {})

  let i = 0
  stores.forEach((store) => {
    let pTotal = 0
    let iTotal = 0
    priceTotal.set(store.id, 0)
    store.items.forEach((item) => {
      listItems.includes(item.name) ? (pTotal += item.price) && iTotal++ : []
    })
    priceTotal.set(store.id, pTotal)
    itemTotal.set(store.id, iTotal)
    i++
  })
  /* ------------------------------------------------------------------------------------------------------ */

  return (
    <>
      <div>
        <h1>{list.name}</h1>
        {/*<pre>{JSON.stringify(list, null, 2)}</pre>*/}
        {/* -------------------------------------Same here for the new component---------------------------------------------- */}
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              {store.name}: {priceTotal.get(store.id)}, Total # of Items:{itemTotal.get(store.id)}
            </li>
          ))}
        </ul>
        {/* -------------------------------------------------------------------------------------------------------------------- */}

        {/* Below, it just lists all items available */}
        <ul>
          {list.items
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
