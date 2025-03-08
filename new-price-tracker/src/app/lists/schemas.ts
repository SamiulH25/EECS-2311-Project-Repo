import { z } from "zod"

export const CreateListSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z.string(),
  items: z.string().array().optional(),
})
export const UpdateListSchema = CreateListSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteListSchema = z.object({
  id: z.number(),
})
