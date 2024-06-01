import { z } from 'zod'

export const majorSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
})

export const addMajorSchema = majorSchema.omit({ id: true })
export const updateMajorSchema = z.object({
    name: z.string().optional(),
})

export type Major = z.infer<typeof majorSchema>
