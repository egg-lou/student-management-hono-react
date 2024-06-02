import { Context, Hono} from "hono"
    import { PrismaClient } from "@prisma/client";
import {zValidator} from "@hono/zod-validator";


const prisma = new PrismaClient()

export const studentsRoute = new Hono()
.get('/', async (c: Context) => {
    try {
        const page = Number(c.req.query('page')) || 1
        const limit = Number(c.req.query('limit')) || 10
        const searchValue = c.req.query('search')


    }
})