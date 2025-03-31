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
import styles from "../../styles/Home.module.css"

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
    listItems.includes(item.name) ? (uniqueItemList.push(item)) : []
  })

  return (
    <>
    <div className={styles.globe} />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{list.name}</h1>
        </div>

        {/* Below, it just lists all items available */}
        
        <div className={styles.centerBox}>
          <ul>
            {uniqueItemList.map((items) => (
              <li key={items.id}>
                <Link href={`/items/${items.id}`}>{items.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.centerIt}>
          <DisplayTable listItems={listItems} />
        </div>

        <div className={styles.buttonContainer}>
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
      </div>
    </>
  )
}
