import { z } from "zod"

export const CreateItemSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z.string(),
  price: z.coerce.number(),
  store: z.string(),
})
export const UpdateItemSchema = CreateItemSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteItemSchema = z.object({
  id: z.number(),
})
