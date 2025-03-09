import { z } from "zod"

export const CreateStoreSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z.string(),
  location: z.string(),
})
export const UpdateStoreSchema = CreateStoreSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteStoreSchema = z.object({
  id: z.number(),
})
