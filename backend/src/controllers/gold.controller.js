import { poolPromise } from '../Db/sql.js'

const SALES_SEARCH_FIELDS = {
  order_number: 'order_number',
  customer_key: 'customer_key',
  product_key: 'product_key',
}

const SALES_SORT_FIELDS = {
  sales_amount: 'sales_amount',
  order_date: 'order_date',
  quantity: 'quantity',
}

export const getGoldCustomers = async (req, res) => {
  try {
    const pool = await poolPromise

    const { searchBy, searchValue, page = 1, limit = 100 } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    // 🔒 Whitelisted search fields (MATCHING DB VIEW)
    const SEARCH_FIELDS = {
      first_name: 'first_name',
      customer_number: 'customer_number',
      country: 'country',
    }

    let whereClause = ''
    const request = pool.request()

    // 🔍 Backend search
    if (searchBy && searchValue && SEARCH_FIELDS[searchBy]) {
      whereClause = `WHERE ${SEARCH_FIELDS[searchBy]} LIKE @searchValue`
      request.input('searchValue', `%${searchValue}%`)
    }

    // ⚠️ ORDER BY is mandatory for pagination
    const query = `
      SELECT *
      FROM Gold.dim_customers
      ${whereClause}
      ORDER BY customer_number
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `

    request.input('offset', offset)
    request.input('limit', limitNum)

    const result = await request.query(query)

    res.json({
      data: result.recordset,
      page: pageNum,
      limit: limitNum,
      hasMore: result.recordset.length === limitNum,
    })
  } catch (err) {
    console.error('Failed to fetch Gold customers:', err)
    res.status(500).json({
      message: 'Failed to fetch Gold customers',
      error: err.message,
    })
  }
}
export const getGoldProducts = async (req, res) => {
  try {
    const pool = await poolPromise

    const { searchBy, searchValue, page = 1, limit = 100 } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    // 🔒 Allowed search fields ONLY
    const SEARCH_FIELDS = {
      product_name: 'product_name',
      category: 'category',
    }

    let whereClause = ''
    const request = pool.request()

    // 🔍 Backend search
    if (searchBy && searchValue && SEARCH_FIELDS[searchBy]) {
      whereClause = `WHERE ${SEARCH_FIELDS[searchBy]} LIKE @searchValue`
      request.input('searchValue', `%${searchValue}%`)
    }

    // ⚠️ ORDER BY is mandatory for pagination
    const query = `
      SELECT *
      FROM Gold.dm_products
      ${whereClause}
      ORDER BY product_name
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `

    request.input('offset', offset)
    request.input('limit', limitNum)

    const result = await request.query(query)

    res.json({
      data: result.recordset,
      page: pageNum,
      limit: limitNum,
      hasMore: result.recordset.length === limitNum,
    })
  } catch (err) {
    console.error('Failed to fetch Gold products:', err)
    res.status(500).json({
      message: 'Failed to fetch Gold products',
      error: err.message,
    })
  }
}

export const getGoldSales = async (req, res) => {
  try {
    const pool = await poolPromise

    const { searchBy, searchValue, sortBy, order = 'asc', page = 1, limit = 100 } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    // 🔒 Whitelisted fields
    const SEARCH_FIELDS = {
      order_number: 'order_number',
      customer_key: 'customer_key',
      product_key: 'product_key',
    }

    const SORT_FIELDS = {
      sales_amount: 'sales_amount',
      order_date: 'order_date',
      quantity: 'quantity',
    }

    let whereClause = ''
    let orderClause = 'ORDER BY order_date DESC'

    const request = await pool.request()

    // 🔍 Search
    if (searchBy && searchValue && SEARCH_FIELDS[searchBy]) {
      whereClause = `WHERE ${SEARCH_FIELDS[searchBy]} LIKE @searchValue`
      request.input('searchValue', `%${searchValue}%`)
    }

    // 🔃 Sort
    if (sortBy && SORT_FIELDS[sortBy]) {
      const direction = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
      orderClause = `ORDER BY ${SORT_FIELDS[sortBy]} ${direction}`
    }

    // 📄 SQL Server pagination
    const query = `
      SELECT *
      FROM Gold.fact_sales
      ${whereClause}
      ${orderClause}
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `

    request.input('offset', offset)
    request.input('limit', limitNum)

    const result = await request.query(query)

    res.json({
      data: result.recordset,
      page: pageNum,
      limit: limitNum,
      hasMore: result.recordset.length === limitNum,
    })
  } catch (err) {
    console.error('Failed to fetch Gold sales:', err)
    res.status(500).json({
      message: 'Failed to fetch Gold sales',
      error: err.message,
    })
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
