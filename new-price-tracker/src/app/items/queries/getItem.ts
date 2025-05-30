import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetItem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
  name: z.string().optional(),
})

export default resolver.pipe(resolver.zod(GetItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const item = await db.item.findFirst({
    where: { id },
    select: { id: true, name: true, price: true, store: true },
  })

  if (!item) throw new NotFoundError()

  return item
})
