"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUniqueStores from "../../stores/queries/getUniqueStores"
import {Store} from "@/src/app/stores/components/Store";
import {CompareLists} from "@/src/app/lists/components/CompareLists";

export const DisplayTable= ({ listItems }: { listItems: string[] }) => {
  const [stores] = useQuery(getUniqueStores, {})

  let numOfItems = listItems.length
  let priceTotal = new Map()
  //this stores the amount of items available in any store.
  let itemTotal = new Map()
  let missingItems = new Map()

  stores.forEach((store) => {
    let pTotal = 0
    let iTotal = 0;
    let mItem = listItems
    priceTotal.set(store.id, 0)
    itemTotal.set(store.id, 0)
    missingItems.set(store.id, mItem.toString())
    store.items.forEach((item) => {
      listItems.includes(item.name) ? (pTotal += item.price) : [];
      listItems.includes(item.name) ? (iTotal++) : [];
      listItems.includes(item.name) ? (mItem = mItem.filter((it) => (it != item.name))) : [];
    })
    priceTotal.set(store.id, pTotal.toFixed(2))
    itemTotal.set(store.id, iTotal)
    if (mItem.length == 0) {
      missingItems.set(store.id, "nothing")
    }
    else {
      missingItems.set(store.id, mItem.toString())
    }

  })
  const list: string[] = listItems
  //constains the name and id of the best store as a map
  //use "bestStoreId" and "bestStoreName" to access the data
  let compareResults = new Map()
  //calls CompareLists which does everything that was refactored
  compareResults = CompareLists(list,priceTotal,itemTotal,missingItems);

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
      <br/>
        <h3>{compareResults.get("bestStoreName")} has most of your items and offers the best bang for your buck! It is missing {missingItems.get(compareResults.get("bestStoreId"))} from your list</h3>
    </>
  )
}
