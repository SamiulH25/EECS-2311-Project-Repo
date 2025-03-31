import { z } from "zod"

export const CreateListSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z.string().transform(value => value.replace(/\s+/g, ''))
  .pipe(z.string().min(2, { message: 'This field is required' })),
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
