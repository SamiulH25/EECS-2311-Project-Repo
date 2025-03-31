"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteItem from "../mutations/deleteItem"
import getItem from "../queries/getItem"
import getStore from "../../stores/queries/getStore"
import getItemsByName from "../queries/getItemsByName"
import styles from "../../styles/Home.module.css"

export const Item = ({ itemId }: { itemId: number }) => {
  const router = useRouter()
  const [deleteItemMutation] = useMutation(deleteItem)
  const [item] = useQuery(getItem, { id: itemId })

  const [itemS] = useQuery(getItemsByName, { name: item.name })

  return (
    <>
      <div>
        <div className={styles.globe} />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>{item.name}</h1>
          </div>

          <div className={styles.centerIt}>
            <table className={styles.tableMain}>
              <thead>
                
                <th>Stores </th>
                <th>Prices </th>
                
              </thead>
              <tbody>
                {itemS.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link href={`/stores/${item.store.id}`}>{item.store.name}</Link>
                    </td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>

          <div className={styles.buttonContainer}>
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

        </div>
      </div>
      <h4>Add It to A List</h4>
    </>
  )
}
