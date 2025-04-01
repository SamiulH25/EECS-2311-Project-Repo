//Run 'blitz prisma studio' to see and edit the database in your browser
//Run 'blitz prisma migrate reset' in commmand line to reset db.
//Run 'blitz db seed' to run this program to seed the database

import db from "./index"
import stubDB from './DBData.json'

const seed = async () => {

  for (var store of stubDB.stores) {

    let storeItems = [];

    for (var item of store.items) { storeItems.push(item); }

    await db.store.create({ data: { name: store.name, items: { create: storeItems }}})

  }



}

export default seed