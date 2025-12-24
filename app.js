import express from 'express'
import { goldRoutes } from './routes/gold.routes.js'

const app = express()

app.use(express.json())
app.use('/api/gold', goldRoutes)

export { app }
