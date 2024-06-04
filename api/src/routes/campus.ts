import { PrismaClient } from '@prisma/client'
import { Context, Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { addCampusSchema } from '../schemas/campus'

const prisma = new PrismaClient()

export const campusRoute = new Hono()
    .get('/', async (c: Context) => {
        try {
            const campus = await prisma.campus.findMany()
            return c.json(campus)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .get('/id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            const campus = await prisma.campus.findUnique({
                where: { id },
            })
            if (!campus) {
                return c.json({ message: 'Campus not found!' }, 404)
            }
            return c.json(campus)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addCampusSchema), async (c: Context) => {
        try {
            // @ts-ignore
            const campusData = c.req.valid('json')
            const campus = await prisma.campus.create({
                data: campusData,
            })
            return c.json({ message: 'Campus added!', campus }, 201)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .put(
        '/id{[a-fA-F0-9-]+}',
        zValidator('json', addCampusSchema),
        async (c: Context) => {
            try {
                const id = c.req.param('id')
                // @ts-ignore
                const campusData = c.req.valid('json')
                const campus = await prisma.campus.update({
                    where: { id },
                    data: campusData,
                })
                if (!campus) {
                    return c.json({ message: 'Campus not found!' }, 404)
                }
                return c.json({ message: 'Campus updated!', campus }, 200)
            } catch (error) {
                return c.json({ message: 'An error occurred!', error }, 500)
            }
        }
    )
    .delete('/id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            await prisma.campus.delete({
                where: { id },
            })
            if (!id) {
                return c.json({ message: 'Campus not found!' }, 404)
            }
            return c.json({ message: 'Campus deleted!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
