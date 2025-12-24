import express from 'express'
import { getBronzeCustomers, getBronzeProducts } from '../controllers/bronze.controller.js'

const router = express.Router()

router.get('/customers', getBronzeCustomers)
router.get('/products', getBronzeProducts)

export { router as bronzeRoutes }
