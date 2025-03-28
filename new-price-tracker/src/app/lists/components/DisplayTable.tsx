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

  stores.forEach((store) => {
    let pTotal = 0
    let iTotal = 0;
    priceTotal.set(store.id, 0)
    itemTotal.set(store.id, 0)
    store.items.forEach((item) => {
      listItems.includes(item.name) ? (pTotal += item.price && iTotal++) : [];
    })
    priceTotal.set(store.id, pTotal.toFixed(2))
    itemTotal.set(store.id, iTotal)
  })

//stores the id of the best store
  let beststoreid = 0;
  //temporaryily stores the lowest price, can be used to show the price if you want.
  let currentlowest = 0;
  //boolean for the next loops
  let hasallitems = false;
  //offset for the number of items
  let n = 0;
  //loops till a store with (number of items in the list - n) items is found
  while (hasallitems == false) {
    //loops over all stores
    stores.forEach((store) => {
      //if a store with the correct number of items is found then does code or skips to next iteration
      if (itemTotal.get(store.id) == numOfItems-n) {
        //if the currentlowest has yet to be set
        if (currentlowest == 0) {
          currentlowest = priceTotal.get(store.id);
          beststoreid = store.id;
          hasallitems = true;
        } //if the currentlowest has already been set then it compares the currentlowest to the price total of the store we are currrently on
        else {
          if (currentlowest > priceTotal.get(store.id)) {
            currentlowest = priceTotal.get(store.id);
            beststoreid = store.id;
            hasallitems = true;
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
    </>
  )
}
