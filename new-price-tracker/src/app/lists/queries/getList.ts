import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { ItemsList } from "../../items/components/ItemsList"

const GetList = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetList), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const list = await db.list.findFirst({
    where: { id },
    select: { id: true, name: true, items: true },
  })

  if (!list) throw new NotFoundError()

  return list
})
