import { resolver, useQuery } from "@blitzjs/rpc"
import db, { Item, List } from "db"
import { UpdateListSchema } from "../schemas"
import getList from "../queries/getList"

export default resolver.pipe(
  resolver.zod(UpdateListSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    var listItems: Item[] = []

    const dList = await db.list.update({
      where: { id: input.id },
      data: { name: { set: "" }, items: { set: [] } },
      select: { id: true, name: true, items: true },
    })

    for (var i = 0; i < (input.items?.length || 0); i++) {
      const item = await db.item.findMany({ where: { name: input.items?.at(i) } })
      item.forEach((ind) => {
        !listItems.includes(ind) ? listItems.push(ind) : []
      })
    }

    const list = await db.list.update({
      where: { id: input.id },
      data: {
        name: input.name,
        items: { connect: listItems.map((c) => ({ id: c?.id })) || [] },
      },
      select: { id: true, name: true, items: true },
    })

    return list
  }
)
