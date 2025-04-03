import { useQuery, usePaginatedQuery } from "@blitzjs/rpc"
import React, { Suspense, useState } from "react"
import { Form, FormProps } from "src/app/components/Form"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import getItems from "src/app/items/queries/getItems"
import { Field } from "formik"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { Route } from "next"
import { useRouter } from "next/navigation"
import getUniqueItems from "../../items/queries/getUniqueItems"

import { z } from "zod"
export { FORM_ERROR } from "src/app/components/Form"

const ITEMS_PER_PAGE = 50

export function ListForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
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
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
      <h2>Name Your List</h2>
      <LabeledTextField label="" name="name" type="text" placeholder="Type Here" style={{width: "100%", height: "32px"}} />

      <div>
        <h3>Available Items</h3>
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
                <label key={item.id}>
                <Field type="checkbox" name="items" value={item.name} />
                {item.name} <br />
              </label>
              ))}
            </ul>
            :
            <ul>
              {items.map((item) => (
                <label key={item.id}>
                <Field type="checkbox" name="items" value={item.name} />
                {item.name} <br />
              </label>
              ))}
            </ul>
          }

        <button type="button" disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>

        <button type="button" disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
        <br />
        <br />
      </div>
    </Form>
  )
}
