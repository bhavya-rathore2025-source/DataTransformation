import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataTable from '../components/DataTable'
import '../styles/goldpage.css'
import '../styles/common.css'

const PAGE_SIZE = 100

// Gold-only date formatter
function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function GoldPage() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('customers')
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [summary, setSummary] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [searchBy, setSearchBy] = useState('order_number')
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [salesRows, setSalesRows] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  // Gold Customers (backend paginated)
  const [customerRows, setCustomerRows] = useState([])
  const [customerPage, setCustomerPage] = useState(1)
  const [customerHasMore, setCustomerHasMore] = useState(true)
  // Gold Products (backend paginated)
  const [productRows, setProductRows] = useState([])
  const [productPage, setProductPage] = useState(1)
  const [productHasMore, setProductHasMore] = useState(true)

  useEffect(() => {
    fetchGoldData()
  }, [])
  useEffect(() => {
    // Reset search when tab changes
    const defaultSearchBy = searchOptions[activeTab][0]?.value || ''
    setSearchBy(defaultSearchBy)
    setSearchValue('')
    setSortBy('')
    if (activeTab === 'customers' && customerRows.length === 0) {
      fetchGoldCustomers({ reset: true })
    }
    if (activeTab === 'products' && productRows.length === 0) {
      fetchGoldProducts({ reset: true })
    }
  }, [activeTab])

  const fetchGoldData = async () => {
    try {
      setLoading(true)
      const [summaryRes] = await Promise.all([axios.get('http://localhost:5000/api/gold/summary')])
      setSummary(summaryRes.data)
    } catch (err) {
      console.error('Failed to fetch gold data', err)
    } finally {
      setLoading(false)
    }
  }
  const handleSearch = () => {
    if (activeTab === 'sales') {
      setSalesRows([])
      setPage(1)
      setHasMore(true)
      fetchGoldSales({ reset: true })
    }

    if (activeTab === 'customers') {
      setCustomerRows([])
      setCustomerPage(1)
      setCustomerHasMore(true)
      fetchGoldCustomers({ reset: true })
    }

    if (activeTab === 'products') {
      setProductRows([])
      setProductPage(1)
      setProductHasMore(true)
      fetchGoldProducts({ reset: true })
    }
  }
  const handleSearchByChange = (value) => {
    setSearchBy(value)
    setSearchValue('') // 👈 clear input

    // Reset based on active tab
    if (activeTab === 'sales') {
      setSalesRows([])
      setPage(1)
      setHasMore(true)
      fetchGoldSales({ reset: true })
    }

    if (activeTab === 'customers') {
      setCustomerRows([])
      setCustomerPage(1)
      setCustomerHasMore(true)
      fetchGoldCustomers({ reset: true })
    }

    if (activeTab === 'products') {
      setProductRows([])
      setProductPage(1)
      setProductHasMore(true)
      fetchGoldProducts({ reset: true })
    }
  }
  const handleSearchInputChange = (value) => {
    setSearchValue(value)

    // If input cleared → reload unfiltered data
    if (value === '') {
      if (activeTab === 'sales') {
        setSalesRows([])
        setPage(1)
        setHasMore(true)
        fetchGoldSales({ reset: true })
      }

      if (activeTab === 'customers') {
        setCustomerRows([])
        setCustomerPage(1)
        setCustomerHasMore(true)
        fetchGoldCustomers({ reset: true })
      }

      if (activeTab === 'products') {
        setProductRows([])
        setProductPage(1)
        setProductHasMore(true)
        fetchGoldProducts({ reset: true })
      }
    }
  }

  const fetchGoldSales = async ({ reset = false } = {}) => {
    try {
      setLoading(true)

      const nextPage = reset ? 1 : page

      const res = await axios.get('http://localhost:5000/api/gold/sales', {
        params: {
          searchBy,
          searchValue,
          sortBy: sortBy ? sortBy.split('_')[0] : undefined,
          order: sortBy?.endsWith('_desc') ? 'desc' : 'asc',
          page: nextPage,
          limit: 100,
        },
      })

      const { data, hasMore } = res.data

      setSalesRows((prev) => (reset ? data : [...prev, ...data]))

      setHasMore(hasMore)
      setPage(nextPage + 1)
    } catch (err) {
      console.error('Failed to fetch gold sales', err)
    } finally {
      setLoading(false)
    }
  }
  const fetchGoldCustomers = async ({ reset = false } = {}) => {
    try {
      setLoading(true)
      const nextPage = reset ? 1 : customerPage

      const res = await axios.get('http://localhost:5000/api/gold/customers', {
        params: {
          searchBy,
          searchValue,
          page: nextPage,
          limit: PAGE_SIZE,
        },
      })

      const { data, hasMore } = res.data

      setCustomerRows((prev) => (reset ? data : [...prev, ...data]))

      setCustomerHasMore(hasMore)
      setCustomerPage(nextPage + 1)
    } catch (err) {
      console.error('Failed to fetch gold customers', err)
    } finally {
      setLoading(false)
    }
  }
  const fetchGoldProducts = async ({ reset = false } = {}) => {
    try {
      setLoading(true)

      const nextPage = reset ? 1 : productPage

      const res = await axios.get('http://localhost:5000/api/gold/products', {
        params: {
          searchBy,
          searchValue,
          page: nextPage,
          limit: PAGE_SIZE,
        },
      })

      const { data, hasMore } = res.data

      setProductRows((prev) => (reset ? data : [...prev, ...data]))

      setProductHasMore(hasMore)
      setProductPage(nextPage + 1)
    } catch (err) {
      console.error('Failed to fetch gold products', err)
    } finally {
      setLoading(false)
    }
  }

  /* -----------------------------------
     Pick RAW active dataset (NO work)
  ----------------------------------- */
  const activeRawData = useMemo(() => {
    if (activeTab === 'customers') return customers
    if (activeTab === 'products') return products
    return salesRows
  }, [activeTab, customers, products, salesRows])
  const searchOptions = {
    customers: [
      { label: 'First Name', value: 'first_name' },
      { label: 'Customer Number', value: 'customer_number' },
      { label: 'Country', value: 'country' },
    ],
    products: [
      { label: 'Product Name', value: 'product_name' },
      { label: 'Category', value: 'category' },
    ],
    sales: [
      { label: 'Order Number', value: 'order_number' },
      { label: 'Customer Key', value: 'customer_key' },
      { label: 'Product Key', value: 'product_key' },
    ],
  }
  const sortOptions = {
    sales: [
      { label: 'Order Date (Newest)', value: 'order_date_desc' },
      { label: 'Sales Amount (High → Low)', value: 'sales_amount_desc' },
      { label: 'Sales Amount (Low → High)', value: 'sales_amount_asc' },
    ],
    customers: [],
    products: [],
  }

  /* -----------------------------------
     Slice FIRST (performance critical)
  ----------------------------------- */
  const slicedData = useMemo(() => {
    return activeRawData.slice(0, visibleCount)
  }, [activeRawData, visibleCount])

  /* -----------------------------------
     Format ONLY visible sales rows
  ----------------------------------- */
  const displayedData = useMemo(() => {
    if (activeTab !== 'sales') return slicedData

    return slicedData.map((row) => ({
      ...row,
      order_date: formatDate(row.order_date),
      shipping_date: formatDate(row.shipping_date),
      due_date: formatDate(row.due_date),
    }))
  }, [activeTab, slicedData])
  const tableData = activeTab === 'sales' ? salesRows : activeTab === 'customers' ? customerRows : productRows

  return (
    <div className='layer-page gold-page'>
      {/* LEFT */}
      <div className='layer-left'>
        {/* Navigation + Tabs */}
        <div className='tabs-row'>
          <div className='left-controls'>
            <button className='dashboard-arrow' onClick={() => navigate('/')} title='Back to Dashboard'>
              ←
            </button>

            <button className='layer-nav-btn silver' onClick={() => navigate('/silver')}>
              Silver
            </button>
          </div>

          <div className='tabs'>
            <button
              className={activeTab === 'customers' ? 'active' : ''}
              onClick={() => {
                setActiveTab('customers')
                setVisibleCount(PAGE_SIZE)
              }}>
              Customers
            </button>

            <button
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => {
                setActiveTab('products')
                setVisibleCount(PAGE_SIZE)
              }}>
              Products
            </button>

            <button
              className={activeTab === 'sales' ? 'active' : ''}
              onClick={() => {
                setActiveTab('sales')
                setVisibleCount(PAGE_SIZE)
                setSalesRows([]) // clear old data
                setPage(1) // reset page
                setHasMore(true) // assume more data exists
                fetchGoldSales({ reset: true }) // fetch page 1
              }}>
              Sales
            </button>
          </div>

          <div className='right-controls' />
        </div>
        <div className='gold-controls'>
          <div className='gold-search'>
            <select value={searchBy} onChange={(e) => handleSearchByChange(e.target.value)}>
              {searchOptions[activeTab].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Search by {opt.label}
                </option>
              ))}
            </select>

            <input type='text' placeholder='Enter search value...' value={searchValue} onChange={(e) => handleSearchInputChange(e.target.value)} />

            <button className='search-btn' onClick={handleSearch}>
              Search
            </button>
          </div>

          {sortOptions[activeTab]?.length > 0 && (
            <div className='gold-sort'>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  console.log('SORT CHANGED', e.target.value)
                  // API call will go here later
                }}>
                <option value=''>Sort by</option>
                {sortOptions[activeTab].map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <p className='loading'>Loading gold data...</p>
        ) : (
          <>
            <DataTable data={tableData} loading={loading} />

            {activeTab === 'sales' && hasMore && (
              <div className='load-more'>
                <button onClick={() => fetchGoldSales()}>{loading ? 'Loading...' : 'Load more'}</button>
              </div>
            )}

            {activeTab === 'customers' && customerHasMore && (
              <div className='load-more'>
                <button onClick={() => fetchGoldCustomers()}>{loading ? 'Loading...' : 'Load more'}</button>
              </div>
            )}

            {activeTab === 'products' && productHasMore && (
              <div className='load-more'>
                <button onClick={() => fetchGoldProducts()}>{loading ? 'Loading...' : 'Load more'}</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className='layer-right'>
        <h3>Gold Summary</h3>

        {summary && (
          <div className='summary-block'>
            <p>
              <strong>Total Sales:</strong> ₹{summary.total_sales_amount.toLocaleString()}
            </p>
            <p>
              <strong>Total Orders:</strong> {summary.total_orders.toLocaleString()}
            </p>
            <p>
              <strong>Total Quantity:</strong> {summary.total_quantity.toLocaleString()}
            </p>
            <p>
              <strong>Avg Order Value:</strong> ₹{summary.avg_order_value.toLocaleString()}
            </p>
          </div>
        )}

        <div className='summary-text'>
          <h4>Gold Layer</h4>
          <p>
            This layer contains business-ready dimensions and a sales fact table. Data is fully curated, enriched, and optimized for analytics and
            reporting.
          </p>
        </div>

        <div className='status'>
          <h4>Status</h4>
          <p className='status-ok'>✔ Ready for Analytics</p>
        </div>
      </div>
    </div>
  )
}
