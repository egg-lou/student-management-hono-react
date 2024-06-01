import { z } from 'zod'

export const professorSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    department: z.string(),
})

export const addProfessorSchema = professorSchema.omit({ id: true })

export const updateProfessorSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    department: z.string().optional(),
});

export type Professor = z.infer<typeof professorSchema>
