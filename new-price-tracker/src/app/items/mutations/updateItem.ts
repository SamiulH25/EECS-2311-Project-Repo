import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateItemSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const storeId = await db.store.findFirst({ where: { name: data.store } })

    const item = await db.item.update({
      where: { id },
      data: { name: data.name, price: data.price, store: { connect: { id: storeId?.id } } },
      select: { id: true, name: true, price: true, store: true },
    })

    return item
  }
)
