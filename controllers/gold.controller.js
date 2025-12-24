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
