import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetUniqueItemsInput
  extends Pick<Prisma.ItemFindManyArgs, "where" | "orderBy" | "skip" | "take" | "distinct"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ distinct = ["name"], where, orderBy, skip = 0, take = 100 }: GetUniqueItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: items,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.item.count({ where }),
      query: (paginateArgs) =>
        db.item.findMany({
          ...paginateArgs,
          where,
          orderBy,
          distinct,
        }),
    })

    return {
      items,
      nextPage,
      hasMore,
      count,
    }
  }
)
