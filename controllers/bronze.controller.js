import { poolPromise } from '../Db/sql.js'

export const getBronzeCustomers = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from Bronze.crm_cust_info
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch gold customers', error: err })
  }
}
export const getBronzeProducts = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select * from bronze.crm_prd_info
    `)

    res.json(result.recordset)
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch bronze products', error: err })
  }
}
