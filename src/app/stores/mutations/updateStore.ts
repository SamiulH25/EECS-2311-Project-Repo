import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateStoreSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateStoreSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const store = await db.store.update({ where: { id }, data });

    return store;
  }
);
