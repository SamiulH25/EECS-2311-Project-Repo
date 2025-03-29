"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUniqueStores from "../../stores/queries/getUniqueStores"
import {Store} from "@/src/app/stores/components/Store";

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
    let mItem= listItems
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
    missingItems.set(store.id, mItem)
  })

//stores the id of the best store
  let bestStoreId = 0;
  let bestStoreName = "";
  //temporaryily stores the lowest price, can be used to show the price if you want.
  let currentLowest = 0;
  //boolean for the next loops
  let hasAllItems = false;
  //offset for the number of items
  let n = 0;
  //loops till a store with (number of items in the list - n) items is found
  while (hasAllItems == false) {
    //loops over all stores
    stores.forEach((store) => {
      //if a store with the correct number of items is found then does code or skips to next iteration
      if (itemTotal.get(store.id) == numOfItems-n) {
        //if the currentlowest has yet to be set
        if (currentLowest == 0) {
          currentLowest = priceTotal.get(store.id);
          bestStoreId = store.id;
          bestStoreName = store.name;
          hasAllItems = true;
        } //if the currentlowest has already been set then it compares the currentlowest to the price total of the store we are currrently on
        else {
          if (currentLowest > priceTotal.get(store.id)) {
            currentLowest = priceTotal.get(store.id);
            bestStoreId = store.id;
            bestStoreName = store.name;
            hasAllItems = true;
          }
        }
      }
    })
    //increments the offset
    n++
  }

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
      <h3>{bestStoreName} has most of your items and offers the best bang for your buck!</h3>
    </>
  )
}
