import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetItemsByName = z.object({
  // This accepts type of undefined, but is required at runtime
  name: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetItemsByName),
  resolver.authorize(),
  async ({ name }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const item = await db.item.findMany({
      where: { name },
      select: { id: true, name: true, price: true, store: true },
    })

    if (!item) throw new NotFoundError()

    return item
  }
)
