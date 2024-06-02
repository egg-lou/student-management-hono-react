import { Context, Hono } from 'hono'
import { logger } from 'hono/logger'
import { professorsRoute } from './routes/professors'
import { cors } from 'hono/cors'
import { majorsRoute } from './routes/majors'
import { studentsRoute } from './routes/students'

const app = new Hono()

app.use(cors())
app.use('*', logger())
app.get('/', async (c: Context): Promise<any> => {
    return c.json({ message: 'Server is running...' }, 200)
})

app.route('/api/professors', professorsRoute)
app.route('/api/majors', majorsRoute)
app.route('/api/students', studentsRoute)

export default {
    port: 3000,
    fetch: app.fetch,
}
