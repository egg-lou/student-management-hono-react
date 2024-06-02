import { z} from 'zod'

export const Campus = z.object({
    id: z.string().uuid(),
    name: z.string(),
    address: z.string(),
})

export const addCampusSchema = Campus.omit({ id: true })
export const updateCampusSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
})

export type Campus = z.infer<typeof Campus>