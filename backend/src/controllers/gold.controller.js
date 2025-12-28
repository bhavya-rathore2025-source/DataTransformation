import { poolPromise } from '../Db/sql.js'

export const getGoldCustomers = async (req, res) => {
  try {
    const pool = await poolPromise

    const result = await pool.request().query(`
      SELECT * FROM Gold.dm_customers
    `)

    res.json(result.recordset)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch gold customers', error: err })
  }
}
export const getGoldProducts = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from Gold.dm_products
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch Gold products', error: err })
  }
}
export const getGoldSales = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from Gold.fact_sales
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch Gold products', error: err })
  }
}
export const getGoldSummary = async (req, res) => {
  try {
    const pool = await poolPromise
    const tSales = await pool.request().query(`
      SELECT
  SUM(sales_amount) AS total_sales_amount,
  COUNT(DISTINCT order_number) AS total_orders,
  SUM(quantity) AS total_quantity,
  AVG(sales_amount) AS avg_order_value
FROM Gold.fact_sales;
    `)

    res.json(tSales.recordset[0])
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch Gold products', error: err })
  }
}
