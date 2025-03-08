import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetUniqueStoresInput
  extends Pick<Prisma.StoreFindManyArgs, "where" | "orderBy" | "skip" | "take" | "distinct"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ distinct = ["name"], where, orderBy, skip = 0, take = 100 }: GetUniqueStoresInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: stores,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.store.count({ where }),
      query: (paginateArgs) => db.store.findMany({ ...paginateArgs, where, orderBy, distinct }),
    })

    return {
      stores,
      nextPage,
      hasMore,
      count,
    }
  }
)
