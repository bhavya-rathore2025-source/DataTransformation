import express from 'express'
import { goldRoutes } from './routes/gold.routes.js'
import { bronzeRoutes } from './routes/bronze.routes.js'
import { silverRoutes } from './routes/silver.routes.js'
const app = express()

app.use(express.json())
app.use('/api/gold', goldRoutes)
app.use('/api/bronze', bronzeRoutes)
app.use('/api/silver', silverRoutes)

export { app }
