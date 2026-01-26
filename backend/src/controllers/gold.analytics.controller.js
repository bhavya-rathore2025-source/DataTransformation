import { poolPromise } from '../Db/sql.js'

/* SALES ANALYTICS */
const pool = await poolPromise
// Sales over time (monthly)
export const getSalesOverTime = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT
        YEAR(order_date)  AS order_year,
        MONTH(order_date) AS order_month,
        SUM(sales_amount) AS total_sales,
        COUNT(DISTINCT order_number) AS total_orders,
        SUM(quantity) AS total_quantity
      FROM Gold.fact_sales
      WHERE order_date IS NOT NULL
      GROUP BY YEAR(order_date), MONTH(order_date)
      ORDER BY order_year, order_month
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales over time', error: err.message })
  }
}

// Sales KPIs
export const getSalesKPIs = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT
        SUM(sales_amount) AS total_sales,
        COUNT(DISTINCT order_number) AS total_orders,
        SUM(quantity) AS total_quantity,
        AVG(sales_amount) AS avg_order_value
      FROM Gold.fact_sales
    `)

    res.json(result.recordset[0])
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales KPIs', error: err.message })
  }
}

/* CUSTOMER ANALYTICS */

// Top customers by sales
export const getTopCustomers = async (req, res) => {
  try {
    const limit = req.query.limit || 10

    const result = await pool.request().query(`
      SELECT TOP (${limit})
        c.customer_key,
        c.first_name,
        SUM(f.sales_amount) AS total_sales,
        COUNT(DISTINCT f.order_number) AS total_orders
      FROM Gold.fact_sales f
      JOIN Gold.dim_customers c
        ON f.customer_key = c.customer_key
      GROUP BY c.customer_key, c.first_name
      ORDER BY total_sales DESC
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top customers', error: err.message })
  }
}

// Sales by country
export const getSalesByCountry = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT
        c.country,
        SUM(f.sales_amount) AS total_sales,
        COUNT(DISTINCT f.order_number) AS total_orders
      FROM Gold.fact_sales f
      JOIN Gold.dim_customers c
        ON f.customer_key = c.customer_key
      GROUP BY c.country
      ORDER BY total_sales DESC
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales by country', error: err.message })
  }
}

/* PRODUCT ANALYTICS */

// Top products by sales
export const getTopProductsBySales = async (req, res) => {
  try {
    const limit = req.query.limit || 10

    const result = await pool.request().query(`
      SELECT TOP (${limit})
        p.product_id,
        p.product_name,
        SUM(f.sales_amount) AS total_sales
      FROM Gold.fact_sales f
      JOIN Gold.dim_products p
        ON f.product_id = p.product_id
      GROUP BY p.product_id, p.product_name
      ORDER BY total_sales DESC
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top products by sales', error: err.message })
  }
}

// Top products by quantity
export const getTopProductsByQuantity = async (req, res) => {
  try {
    const limit = req.query.limit || 10

    const result = await pool.request().query(`
      SELECT TOP (${limit})
        p.product_id,
        p.product_name,
        SUM(f.quantity) AS total_quantity
      FROM Gold.fact_sales f
      JOIN Gold.dim_products p
        ON f.product_id = p.product_id
      GROUP BY p.product_id, p.product_name
      ORDER BY total_quantity DESC
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top products by quantity', error: err.message })
  }
}

// Sales by category
export const getSalesByCategory = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT
        p.category,
        SUM(f.sales_amount) AS total_sales
      FROM Gold.fact_sales f
      JOIN Gold.dim_products p
        ON f.product_id = p.product_id
      GROUP BY p.category
      ORDER BY total_sales DESC
    `)

    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sales by category', error: err.message })
  }
}
