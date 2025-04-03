# The Price is Right

Welcome to Team 2's Project! The Price is Right is a web app created to help consumers find the best prices for their grocery list.

## Run Through Link

Access the website through the link:

https://thepriceisright-271225738013.us-central1.run.app/


## Run Locally

Clone the project

```bash
  git clone https://github.com/SamiulH25/EECS-2311-Project-Repo
```

Go to the project directory

```bash
  cd new-price-tracker
```

Install Blitz

```bash
  npm install -g blitz
```

Install dependencies

```bash
  npm install
```

Reset the Database

```bash
  blitz prisma migrate reset
```

Seed the database

```bash
  blitz db seed
```

Start the development server

```bash
  blitz dev
```

Navigate to http://localhost:3000 to see the website in action!

## Features

- Create, View, Edit, and Delete Items
- Create, View, Edit, and Delete Stores
- Create, View, Edit, and Delete Grocery Lists
- Compare Prices of Items from Different Stores
- Find the Store with the Cheapest Overall Price for your Grocery List
- Etc.

## Usage/Examples

Using Blitz eliminates the need for traditional APIs. Instead, we have Queries and Mutations for 'get' and 'set' functions respectively. For example, the following code imports the native useQuery and useMutation from blitz, as well as 2 developer-created queries and mutations: getList, and deleteList. The function getList is an API that gets a user-created List from the database by querying the listId. On the other hand, the function deleteList deletes the list by querying the listId. Since every List has an id, name, and an array of items, all stored directly in a relational database, we can simply call and display the name of the list using list.name in html. Since Blitz is built on React, html code can be written directly in javascript. To display the complete list of items that is stored in the user-created list, we can use list.items and then use the native '.map' javascript function to render a list of items in html. For the deleteList mutation, we can create a button in html code, and call the deleteListMutation function when the button is clicked using onClick(). The function is best used asynchronously so we call it in an async () function and use 'await' to prevent timeouts. We then call the deleteListMutation function by using list.id as a parameter.

```javascript
import { useMutation, useQuery } from "@blitzjs/rpc"
import getList from "../queries/getList"
import deleteList from "../mutations/deleteList"


function List (listId) {
  const [list] = useQuery(getList, { id: listId })
  const [deleteListMutation] = useMutation(deleteList)

  return {
    <>
      <h1>{list.name}</h1>

      <ul>
        list.items.map((item) => (
          <li key = {items.id}>
            {items.name} from {items.storeName} at {items.storeLocation}
          </li>
        ))
      </ul>

      <button type="button" onClick = { async () => { await deleteListMutation({ id: list.id }) }> Delete this List </button>

    </>
  }
}
```

## Query API Reference

#### Get Items

```http
  import getItems from "src/app/items/queries/getItems"; //get multiple items
  import getItem from "src/app/items/queries/getItems"; //get a single item

  const [items] = useQuery(getItems, {}) // the second parameter is a filter of sorts. By using {} we are asking for ALL items.
  const [item] = useQuery(getItem, {id})

  item.id
  item.name
  item.price
  item.store
  item.storeId
  item.storeName
  item.storeLocation
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `Int`    | **Required**. An item's unique identifier       |
| `name`    | `String` | **Required**. An item's name                    |
| `price`   | `Float`  | **Required**. An item's price                   |
| `store`   | `Store`  | **Required**. The store where this item is sold |

#### Get Stores

```http
  import getStores from "src/app/stores/queries/getStores"; //get multiple stores
  import getStore from "src/app/stores/queries/getStores"; //get a single store

  const [stores] = useQuery(getStores, {}) // the second parameter is a filter of sorts. By using {} we are asking for ALL stores.
  const [store] = useQuery(getStore, {id})

  store.id
  store.name
  store.location
  store.items
```

| Parameter  | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `id`       | `Int`    | **Required**. A store's unique identifier    |
| `name`     | `String` | **Required**. A store's name                 |
| `location` | `String` | **Required**. A store's location             |
| `items`    | `Item[]` | **Required**. The array of items a store has |

#### Get Lists

```http
  import getLists from "src/app/lists/queries/getLists"; //get multiple lists
  import getList from "src/app/lists/queries/getLists"; //get a single list

  const [lists] = useQuery(getLists, {}) // the second parameter is a filter of sorts. By using {} we are asking for ALL lists.
  const [list] = useQuery(getList, {id})

  list.id
  list.name
  list.items
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `Int`    | **Required**. A list's unique identifier    |
| `name`    | `String` | **Required**. A list's name                 |
| `items`   | `Item[]` | **Required**. The array of items a list has |

## Running Tests

To run tests, run the following command

```bash
  blitz test
```

## Troubleshooting

- P: The link is not working or the website is showing error 404.
- A: If the link does not work it is likely the website host is having errors or the website is currently offline. In this case it is reccomended to run the website locally using the steps indicated under run locally.

- P: I am getting errors when running npm -install.
- A: These are ghost errors and do not negatively effect the function of the program.

## Improvements Over Deliverable 1
- A great deal of work has gone into the optimization of the program, turning pages that would originally take a couple of seconds to load into feeling instant.

- The comparison feature has been added where the prices are compared and the best store is recommended. This feature is viewable in the item page and the list page.

- After receiving feedback from the professor, large changes were made to the final product. The list display was changed to feature each item as an individual row, and the comparison now occurs over each item rather than total price. The table also highlights the best price and store while also showcasing the average price. The item page for each item now also highlights the best store and its price. A search function was added to make searching for products easier, and many parts of the code have been refactored and optimized to take even larger amounts of data in the future.

- A user profile page has been added so the user can view their email and role.

- The website is fully functional and runs using a link rather than locally running the program. Furthermore, this website is accessible from anywhere and on any device.


## Authors

- [@Nevan](https://github.com/naug-nevan-216527657)
- [@Samiul](https://github.com/SamiulH25)
