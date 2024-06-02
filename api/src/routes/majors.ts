import { Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { zValidator } from '@hono/zod-validator'
import { addMajorSchema, Major, updateMajorSchema } from '../schemas/major'

const prisma = new PrismaClient()

export const majorsRoute = new Hono()
    .get('/', async (c: Context) => {
        try {
            const page = Number(c.req.query('page')) || 1
            const limit = Number(c.req.query('limit')) || 10
            const searchValue = c.req.query('search')

            const skip = (page - 1) * limit
            const take = limit

            let where = {}

            if (searchValue) {
                where = {
                    name: {
                        contains: searchValue.toLowerCase(),
                    },
                }
            }

            const majors = await prisma.major.findMany({
                skip,
                take,
                where,
            })

            const filteredMajors = majors.filter((major) => {
                // @ts-ignore
                return major.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            })
            return c.json({ majors: filteredMajors }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .get('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            const major = await prisma.major.findUnique({
                where: { id },
            })
            if (!major) {
                return c.json({ message: 'Major not found!' }, 404)
            }
            return c.json({ major: major }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addMajorSchema), async (c: Context) => {
        try {
            // @ts-ignore
            const majorData: Major = c.req.valid('json')
            const major = await prisma.major.create({ data: majorData })
            return c.json({ message: 'Major added!', major }, 201)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .put(
        '/:id{[a-fA-F0-9-]+}',
        zValidator('json', updateMajorSchema),
        async (c: Context) => {
            try {
                const id = c.req.param('id')
                // @ts-ignore
                const majorData: Major = c.req.valid('json')
                const major = await prisma.major.update({
                    where: { id },
                    data: majorData,
                })
                if (!major) {
                    return c.json({ message: 'Major not found!' }, 404)
                }
                return c.json({ message: 'Major updated!', major }, 200)
            } catch (error) {
                return c.json({ message: 'An error occurred!', error }, 500)
            }
        }
    )
    .delete('/:id{[a-fA-F0-9-]+}', async (c: Context) => {
        try {
            const id = c.req.param('id')
            await prisma.major.delete({
                where: { id },
            })
            if (!id) {
                return c.json({ message: 'Major not found!' }, 404)
            }
            return c.json({ message: 'Major deleted!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
