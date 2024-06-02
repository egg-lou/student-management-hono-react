import { z } from 'zod';

export const studentSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    campusAddress: z.string(),
    majorId: z.string().uuid(),
})

const addStudentSchema = studentSchema.omit({ id: true})
const updateStudentSchema = z.object({
    name: z.string().optional(),
    campusAddress: z.string().optional(),
    majorId: z.string().uuid().optional(),
})

export type Student = z.infer<typeof studentSchema>