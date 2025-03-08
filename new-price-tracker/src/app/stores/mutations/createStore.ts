import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateStoreSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateStoreSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const store = await db.store.create({ data: input });

    return store;
  }
);
