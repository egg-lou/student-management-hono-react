import { Context, Hono } from 'hono'
import { logger } from 'hono/logger'
import { professorsRoute } from './routes/professors'
import { cors } from 'hono/cors'
import { majorsRoute } from './routes/majors'

const app = new Hono()

app.use(cors())
app.use('*', logger())
app.get('/', async (c: Context): Promise<any> => {
    return c.json({ message: 'Server is running...' }, 200)
})

app.route('/api/professors', professorsRoute)
app.route('/api/majors', majorsRoute)

export default {
    port: 3000,
    fetch: app.fetch,
}
