import express from 'express'
import { getSilverCustomers, getSilverProducts } from '../controllers/silver.controller.js'

const router = express.Router()

router.get('/customers', getSilverCustomers)
router.get('/products', getSilverProducts)

export { router as silverRoutes }
