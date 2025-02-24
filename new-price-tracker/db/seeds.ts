//Run 'blitz prisma studio' to see and edit the database in your browser
//Run 'blitz prisma migrate reset' in commmand line to reset db.
//Run 'blitz db seed' to run this program to seed the database

import db from "./index"
import stubDB from './stubDB.json'

const itemNames = ["Apple", "Banana", "Fish", "Beef", "Cat Food"];
const itemPrices = [1.99, 0.99, 5.99, 10.99, 13.99];

const seed = async () => {

  for (let i = 0; i < 5; i++) {
    
    await db.store.create({ data: { 

      name: stubDB.stores[i].name , location: stubDB.stores[i].location, 

      items: {
        create: [
          {
            name: stubDB.stores[i].items[0].name, price: stubDB.stores[i].items[0].price, upvotes: 0, downvotes: 0
          },
          {
            name: stubDB.stores[i].items[1].name, price: stubDB.stores[i].items[1].price, upvotes: 0, downvotes: 0
          },
          {
            name: stubDB.stores[i].items[2].name, price: stubDB.stores[i].items[2].price, upvotes: 0, downvotes: 0
          },
          {
            name: stubDB.stores[i].items[3].name, price: stubDB.stores[i].items[3].price, upvotes: 0, downvotes: 0
          },
          {
            name: stubDB.stores[i].items[4].name, price: stubDB.stores[i].items[4].price, upvotes: 0, downvotes: 0
          },
        ]
      }
    } 
  })
  }



}

export default seed