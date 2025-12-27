import express from 'express'
import { getSilverCustomers, getSilverProducts, getSilverSummary } from '../controllers/silver.controller.js'

const router = express.Router()

router.get('/customers', getSilverCustomers)
router.get('/products', getSilverProducts)
router.get('/summary', getSilverSummary)
export { router as silverRoutes }
