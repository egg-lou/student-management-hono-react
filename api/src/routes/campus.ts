import { PrismaClient } from "@prisma/client";
import { Context, Hono} from "hono";
import { zValidator } from "@hono/zod-validator";

const prisma = new PrismaClient();


export const campusRoute = new Hono()
    .get('/', async(c: Context) => {
        try {
            const campus = await prisma.campus.findMany()
            return c.json(campus)
        } catch (error) {
            return c.json({error: error.message}, 500)
        }
    })
    .get('/id{[a-fA-F0-9-]+}', async(c: Context) => {
        try {
            const id = c.req.param('id')
            const campus = await prisma.campus.findUnique({
                where: { id }
            })
            if (!campus) {
                return c.json({ message: 'Campus not found!' }, 404)
            }
            return c.json(campus)
        } catch (error) {
            return c.json({ message: 'An error occurred!', error }, 500)
        }
    })
    .post('/', zValidator('json', addCampus))
