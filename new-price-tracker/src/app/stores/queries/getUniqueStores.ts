import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

interface GetUniqueStoresInput
  extends Pick<Prisma.StoreFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUniqueStoresInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const store = await db.store.findMany({
      select: { id: true, name: true, location: true, items: true, totalPrice: true },
    })

    if (!store) throw new NotFoundError()

    return store
  }
)
