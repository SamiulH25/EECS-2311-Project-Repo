import { z } from "zod"

export const CreateItemSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z
    .string()
    .trim()
    .pipe(z.string().min(2, { message: "This field is required" })),
  price: z.coerce.number().positive({ message: "The price cannot be 0 or a negative number" }),
  store: z.enum(["Walmart", "NoFrills", "Sobeys", "Metro", "Food Basics"], {
    message: "It must be one of: 'Walmart', 'NoFrills', 'Sobeys', 'Metro', 'Food Basics'",
  }),
})
export const UpdateItemSchema = CreateItemSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteItemSchema = z.object({
  id: z.number(),
})
