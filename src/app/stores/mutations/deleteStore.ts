import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteStoreSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteStoreSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const store = await db.store.deleteMany({ where: { id } });

    return store;
  }
);
