import { z } from "zod"

export const CreateItemSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z
    .string()
    .trim()
    .pipe(z.string().min(2, { message: "This field is required" })),
  price: z.coerce
    .number()
    .positive({ message: "The price cannot be 0 or a negative number" })
    .lte(17),
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
