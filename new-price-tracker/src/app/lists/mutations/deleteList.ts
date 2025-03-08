import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteListSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteListSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const list = await db.list.deleteMany({ where: { id } });

    return list;
  }
);
