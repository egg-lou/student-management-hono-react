import { z } from 'zod'

export const studentSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    campusId: z.string().uuid(),
    majorId: z.string().uuid(),
})

export const addStudentSchema = studentSchema.omit({ id: true })
export const updateStudentSchema = z.object({
    name: z.string().optional(),
    campusId: z.string().uuid().optional(),
    majorId: z.string().uuid().optional(),
})

export type Student = z.infer<typeof studentSchema>
