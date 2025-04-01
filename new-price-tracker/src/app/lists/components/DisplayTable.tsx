"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUniqueStores from "../../stores/queries/getUniqueStores"
import getItemsByName from "../../items/queries/getItemsByName"
import { Store } from "@/src/app/stores/components/Store"
import { CompareLists } from "@/src/app/lists/components/CompareLists"
import styles from "../../styles/Home.module.css"
import { store } from "next/dist/build/output/store"
import { Item } from "db"
import getUniqueItems from "../../items/queries/getUniqueItems"
import getItems from "../../items/queries/getItems"

export const DisplayTable = ({ listItems }: { listItems: string[] }) => {
  const [stores] = useQuery(getUniqueStores, {})

  const itemList: Item[] = [] //THIS IS THE ARRAY HOLDING ALL ITEM OBJECTS THAT ARE MENTIONED IN LISTITEMS (theoretically)

  const [uniqueItems] = useQuery(getItems, {})
  uniqueItems.items.forEach((item) => {
    listItems.includes(item.name) ? itemList.push(item) : []
  })


  let numOfItems = listItems.length
  let numOfStores = stores.length
  let priceTotal = new Map()
  let prices: number[] = []
  let prices2 = new Map()
  let beststore = new Map()
  let stores2 = new Map()
  let avg = new Map()
  let lowest = new Map()
  stores.forEach((store) => {
    stores2.set(store.name, 1)
    priceTotal.set(store.name, 0)
  })
  //Iterates through the array of items
  itemList.forEach((item1) => {
    //total is used for avg calculation
    let total = 0
    let num = 0
    let a = false
    let low = 0
    let best = ""
    stores.forEach((store) => {
      store.items.forEach((item) => {
        if (item.name == item1.name) {
          if (low == 0) {
            low = item.price
            best = store.name
          } else {
            if (low > item.price) {
              low = item.price
              best = store.name
            }
          }
          let j = priceTotal.get(store.name)
          priceTotal.set(store.name, (j += item.price))
          total += item.price
          num++
          prices.push(item.price)
          a = true
        }
      })
      if (!a) {
        prices.push(0)
      }
      a = false
    })
    prices2.set(item1.id, prices)
    prices = []
    avg.set(item1.id, total / num)
    lowest.set(item1.id, low)
    let temp = []
    temp.push(best)
    beststore.set(item1.id, temp)
    temp = stores2.get(best) + 1
    stores2.set(best, temp)
  })



  let temp = 0
  let best = ""

  stores.forEach((store) => {
    if (temp == 0) {
      temp = stores2.get(store.name)
      best = store.name
    } else {
      if (temp < stores2.get(store.name)) {
        temp = stores2.get(store.name)
        best = store.name
      }
    }
  })

  let i = 0
  return (
    <>
      <div>
        <table className={styles.tableMain}>
          <thead>
          <tr>
            {<th>Items</th>}
            {stores.map((store) => (
              <th key={store.name}>{store.name}</th>
            ))}
            {<th>Best Store</th>}
            {<th>Avg Price</th>}
          </tr>
          </thead>
          <tbody>
            {itemList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                {stores.map((store) => (
                  <td key={store.id}>
                    {prices2.get(item.id)[i++] == 0 ? <p>N/A</p> : prices2.get(item.id)[i-1] === lowest.get(item.id) ? <strong>{prices2.get(item.id)[i - 1]}</strong> : <p>{prices2.get(item.id)[i - 1]}</p>}</td>
                ))}
                <td>{beststore.get(item.id)[(i = 0)]}</td>
                {<td>{avg.get(item.id).toFixed(2)}</td>}
              </tr>
            ))}
            <tr>
              <td>Price Total</td>
              {stores.map((store) => (
                <td key={store.name}>{priceTotal.get(store.name).toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <h2>
          The best store to shop from is {best} due to it have the lowest price on the most items
        </h2>
        <br />
      </div>
    </>
  )
}
