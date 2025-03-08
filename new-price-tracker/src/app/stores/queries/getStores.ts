import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetStoresInput
  extends Pick<
    Prisma.StoreFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStoresInput) => {
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
      query: (paginateArgs) =>
        db.store.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      stores,
      nextPage,
      hasMore,
      count,
    };
  }
);
