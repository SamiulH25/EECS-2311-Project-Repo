import { z } from "zod";

export const CreateStoreSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateStoreSchema = CreateStoreSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteStoreSchema = z.object({
  id: z.number(),
});
