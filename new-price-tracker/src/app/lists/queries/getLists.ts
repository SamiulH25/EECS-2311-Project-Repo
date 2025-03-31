import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";
import { Ctx } from "blitz"

interface GetListsInput
  extends Pick<
    Prisma.ListFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetListsInput, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId || undefined
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } })
    const {
      items: lists,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.list.count({ where }),
      query: (paginateArgs) =>
        db.list.findMany({ ...paginateArgs, where: {user: user}, orderBy }),
    });

    return {
      lists,
      nextPage,
      hasMore,
      count,
    };
  }
);
