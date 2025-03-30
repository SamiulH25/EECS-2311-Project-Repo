import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetUserProfile = z.object({
});

export default resolver.pipe(
  resolver.zod(GetUserProfile),
  resolver.authorize(),
  async (_input, ctx) => {
    const user = await db.user.findFirst({
      where: { id: ctx.session.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }
);