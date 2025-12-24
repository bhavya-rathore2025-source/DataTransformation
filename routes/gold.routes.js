import express from 'express'
import { getGoldCustomers } from '../controllers/gold.controller.js'

const router = express.Router()

router.get('/customers', getGoldCustomers)

export { router as goldRoutes }
