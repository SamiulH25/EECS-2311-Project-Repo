import { resolver } from "@blitzjs/rpc"
import db, { Item, User } from "db"
import { CreateListSchema } from "../schemas"
import { Ctx } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateListSchema),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const userId = ctx.session.userId || undefined
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } })

    var listItems: Item[] = []

    for (var i = 0; i < (input.items?.length || 0); i++) {
      const item = await db.item.findMany({ where: { name: input.items?.at(i) } })
      listItems.push(...item)
    }

    const list = await db.list.create({
      data: {
        name: input.name,
        user: { connect: { id: user?.id } },
        items: { connect: listItems.map((c) => ({ id: c?.id })) || [] },
      },
    })

    return list
  }
)
