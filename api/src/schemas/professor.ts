import { z } from 'zod'

export const professorSchema = z.object({
    id: z.number().int().positive().min(1),
    name: z.string(),
    email: z.string().email(),
    department: z.string(),
})

export const addProfessorSchema = professorSchema.omit({ id: true })


export type Professor = z.infer<typeof professorSchema>