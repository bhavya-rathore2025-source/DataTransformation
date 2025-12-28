import express from 'express'
import { getGoldCustomers, getGoldProducts, getGoldSummary, getGoldSales } from '../controllers/gold.controller.js'

const router = express.Router()

router.get('/customers', getGoldCustomers)
router.get('/products', getGoldProducts)
router.get('/summary', getGoldSummary)
router.get('/sales', getGoldSales)

export { router as goldRoutes }
