"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteItem from "../mutations/deleteItem"
import getItem from "../queries/getItem"
import getStore from "../../stores/queries/getStore"
import getItemsByName from "../queries/getItemsByName"

export const Item = ({ itemId }: { itemId: number }) => {
  const router = useRouter()
  const [deleteItemMutation] = useMutation(deleteItem)
  const [item] = useQuery(getItem, { id: itemId })

  const [itemS] = useQuery(getItemsByName, { name: item.name })

  return (
    <>
      <div>
        <h1>{item.name}</h1>

        <table>
          <thead>
            <tr>
              <th>Stores Found In</th>
              <th>Prices</th>
            </tr>
          </thead>
          <tbody>
            {itemS.map((item) => (
              <tr key={item.id}>
                <td>{item.store.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />

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
