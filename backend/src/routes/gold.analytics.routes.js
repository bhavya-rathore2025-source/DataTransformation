import express from 'express'
import {
  getSalesOverTime,
  getSalesKPIs,
  getTopCustomers,
  getSalesByCountry,
  getTopProductsBySales,
  getTopProductsByQuantity,
  getSalesByCategory,
} from '../controllers/gold.analytics.controller.js'

const router = express.Router()

// Sales
router.get('/sales-over-time', getSalesOverTime)
router.get('/sales-kpis', getSalesKPIs)

// Customers
router.get('/top-customers', getTopCustomers)
router.get('/sales-by-country', getSalesByCountry)

// Products
router.get('/top-products-by-sales', getTopProductsBySales)
router.get('/top-products-by-quantity', getTopProductsByQuantity)
router.get('/sales-by-category', getSalesByCategory)

export { router as goldAnalyticsRoutes }
