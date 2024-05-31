import { Context, Hono } from 'hono'
import { Professor, addProfessorSchema } from '../schemas/professor'
import { zValidator } from '@hono/zod-validator'

const fakeProfessors: Professor[] = [
    {
        id: 1,
        name: 'Professor John Doe',
        email: 'john.doe@university.edu',
        department: 'Computer Science',
    },
    {
        id: 2,
        name: 'Professor Jane Smith',
        email: 'jane.smith@university.edu',
        department: 'Mathematics',
    },
    {
        id: 3,
        name: 'Professor Richard Roe',
        email: 'richard.roe@university.edu',
        department: 'Physics',
    },
]

export const professorsRoute = new Hono()
    .get('/', async (c: Context) => {
        try {
            return c.json(
                { message: 'Professors: ', professors: fakeProfessors },
                200
            )
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addProfessorSchema), async (c: Context) => {
        try {
            const professor: Professor = await c.req.valid('json')
            fakeProfessors.push({ ...professor, id: fakeProfessors.length + 1 })
            return c.json(
                { message: 'Professor added successfully!', professor },
                201
            )
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .put('/:id{[0-9]+}', async (c: Context) => {
        try {
            const id = Number.parseInt(c.req.param('id'))
            const professor = fakeProfessors.find((p) => p.id === id)
            if (!professor) {
                return c.json({ message: 'Professor not found!' }, 404)
            }

            return c.json({ message: 'Professor updated successfully!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .delete('/:id{[0-9]+}', async (c: Context) => {
        try {
            const id = Number.parseInt(c.req.param('id'))
            const index = fakeProfessors.findIndex((p) => p.id === id)
            if (index === -1) {
                return c.json({ message: 'Professor not found!' }, 404)
            }
            return c.json({ message: 'Professor deleted successfully!' }, 200)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
