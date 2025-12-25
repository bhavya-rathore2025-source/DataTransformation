import { poolPromise } from '../Db/sql.js'

export const getSilverCustomers = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from silver.crm_cust_info
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch Silver customers', error: err })
  }
}
export const getSilverProducts = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from silver.crm_prd_info
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch silver products', error: err })
  }
}
