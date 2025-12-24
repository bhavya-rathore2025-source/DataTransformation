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
