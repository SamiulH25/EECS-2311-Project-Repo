"use client"
import { usePaginatedQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import getUniqueItems from "../queries/getUniqueItems"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { Route } from "next"
import styles from "../styles/Home.module.css"
import { useState } from "react"

const ITEMS_PER_PAGE = 50

export const ItemsList = () => {
  const searchparams = useSearchParams()!
  const page = Number(searchparams.get("page")) || 0
  const [{ items, hasMore }] = usePaginatedQuery(getUniqueItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const router = useRouter()
  const pathname = usePathname()

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchparams)
    params.set("page", (page - 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }
  const goToNextPage = () => {
    const params = new URLSearchParams(searchparams)
    params.set("page", (page + 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }

//SearchBar
  const [searchItem, setSearchItem] = useState('')
  const [filteredItems, setFilteredItems] = useState(items)
  const handleInputChange = (e: { target: { value: any } }) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    {searchTerm.length > 0 ? setFilteredItems(filteredItems) : setFilteredItems(items)}
    setFilteredItems(filteredItems);
  }

  return (
    <div >
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to Search'
        style={{width: "100%", height: "32px"}}
      />

      {searchItem.length > 0 
        ? 
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id} style={{margin: "5px"}}>
              <Link href={`/items/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        :
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{margin: "5px"}}>
              <Link href={`/items/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      }

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore || (searchItem.length > 0)} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}
