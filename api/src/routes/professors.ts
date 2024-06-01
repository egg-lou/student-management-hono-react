import { Context, Hono } from 'hono'
import {
    Professor,
    addProfessorSchema,
    updateProfessorSchema,
} from '../schemas/professor'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const professorsRoute = new Hono()
    .get('/', async (c: Context) => {
        try {
            const professors = await prisma.professor.findMany()
            return c.json({ message: 'Professors: ', professors }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .get('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            const professor = await prisma.professor.findUnique({
                where: { id },
            })
            if (!professor) {
                return c.json({ message: 'Professor not found!' }, 404)
            }
            return c.json({ message: 'Professor: ', professor }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addProfessorSchema), async (c: Context) => {
        try {
            // @ts-ignore
            const professorData: Professor = c.req.valid('json')
            const professor = await prisma.professor.create({
                data: professorData,
            })
            return c.json(
                { message: 'Professor added successfully!', professor },
                201
            )
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .put(
        '/:id{[a-fA-F0-9-]+}',
        zValidator('json', updateProfessorSchema),
        async (c: Context) => {
            try {
                const id = c.req.param('id')
                // @ts-ignore
                const professorData: Professor = c.req.valid('json')
                const professor = await prisma.professor.update({
                    where: { id },
                    data: professorData,
                })
                return c.json(
                    { message: 'Professor updated successfully!', professor },
                    200
                )
            } catch (error) {
                return c.json({ message: 'An error occurred!', error }, 500)
            }
        }
    )
    .delete('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            await prisma.professor.delete({ where: { id } })
            return c.json({ message: 'Professor deleted successfully!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
