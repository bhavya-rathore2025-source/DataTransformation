import express from 'express'
import { getGoldCustomers, getGoldProducts } from '../controllers/gold.controller.js'

const router = express.Router()

router.get('/customers', getGoldCustomers)
router.get('/products', getGoldProducts)

export { router as goldRoutes }
