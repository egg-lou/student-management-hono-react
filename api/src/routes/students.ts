import { Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { zValidator } from '@hono/zod-validator'
import {
    addStudentSchema,
    updateStudentSchema,
    Student,
} from '../schemas/student'

const prisma = new PrismaClient()

export const studentsRoute = new Hono()
    .get('/', async (c: Context) => {
        try {
            const page = Number(c.req.query('page')) || 1
            const limit = Number(c.req.query('limit')) || 10
            const searchValue = c.req.query('search')
            const majorId = c.req.query('majorId')

            const skip = (page - 1) * limit
            const take = limit

            let where = {}

            if (searchValue) {
                where = {
                    name: {
                        contains: searchValue.toLowerCase(),
                    },
                }

                if (majorId) {
                    where = {
                        AND: [
                            where,
                            {
                                majorId,
                            },
                        ],
                    }
                }
            }

            const students = await prisma.student.findMany({
                skip,
                take,
                where,
            })

            const filteredStudents = students.filter((student) => {
                // @ts-ignore
                return student.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            })

            return c.json({ students: filteredStudents }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .get('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            const student = await prisma.student.findUnique({
                where: { id },
            })
            if (!student) {
                return c.json({ message: 'Student not found!' }, 404)
            }
            return c.json({ student: student }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addStudentSchema), async (c: Context) => {
        try {
            // @ts-ignore
            const studentData: Student = c.req.valid('json')
            const student = await prisma.student.create({
                data: studentData,
            })
            return c.json({ message: 'Student added!', student }, 201)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .put(
        '/:id{[a-fA-F0-9-]+}',
        zValidator('json', updateStudentSchema),
        async (c: Context) => {
            try {
                const id = c.req.param('id')
                // @ts-ignore
                const studentData: Student = c.req.valid('json')
                const student = await prisma.student.update({
                    where: { id },
                    data: studentData,
                })
                if (!student) {
                    return c.json({ message: 'Student not found!' }, 404)
                }
                return c.json({ message: 'Student updated!', student }, 200)
            } catch (error) {
                return c.json({ message: 'An error occurred!', error }, 500)
            }
        }
    )
    .delete('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            await prisma.student.delete({
                where: { id },
            })
            if (!id) {
                return c.json({ message: 'Student not found!' }, 404)
            }
            return c.json({ message: 'Student deleted!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
