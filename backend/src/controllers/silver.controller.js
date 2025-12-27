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
export const getSilverSummary = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      Select count(*) r1 from Bronze.crm_cust_info
    `)
    const result2 = await pool.request().query(`
      Select count(*) r2 from Silver.crm_cust_info
    `)
    const trimed = await pool.request().query(`
      Select count(*) t1 from Bronze.crm_cust_info
      where cst_firstname != TRIM(cst_firstname)
      or cst_lastname != TRIM(cst_lastname)
    `)
    const dateCorrections = await pool.request().query(`
      Select count(*) d1 from Bronze.crm_prd_info
      where prd_end_dt<prd_start_dt
    `)
    const bronzeTotal = result.recordset[0].r1
    const silverTotal = result2.recordset[0].r2
    const removed = bronzeTotal - silverTotal
    const totalDateCorrections = dateCorrections.recordset[0].d1
    res.json({
      bronzeTotal: bronzeTotal,
      silverTotal: silverTotal,
      removedRecords: removed,
      trimmedStrings: trimed.recordset[0].t1,
      dateCorrections: totalDateCorrections,
    })
  } catch {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch silver products', error: err })
  }
}
