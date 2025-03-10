"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUniqueStores from "../../stores/queries/getUniqueStores"

export const DisplayTable = ({ listItems }: { listItems: string[] }) => {
  const [stores] = useQuery(getUniqueStores, {})

  let priceTotal = new Map()
  stores.forEach((store) => {
    let pTotal = 0
    priceTotal.set(store.id, 0)
    store.items.forEach((item) => {
      listItems.includes(item.name) ? (pTotal += item.price) : []
    })
    priceTotal.set(store.id, pTotal.toFixed(2))
  })

  return (
    <>
      <table style={{ width: "100vh", textAlign: "center" }}>
        <thead>
          <tr>
            {stores.map((store) => (
              <th key={store.id}>{store.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {stores.map((store) => (
              <td key={store.id}>
                {store.items.map((item) =>
                  listItems.includes(item.name) ? (
                    <ul key={item.id}>
                      {item.name}: {item.price}
                    </ul>
                  ) : (
                    []
                  )
                )}
                <strong>Total: {priceTotal.get(store.id)}</strong>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}
