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
  const [sales, setSales] = useState([])
  const [summary, setSummary] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGoldData()
  }, [])

  const fetchGoldData = async () => {
    try {
      setLoading(true)

      const [custRes, prodRes, salesRes, summaryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/gold/customers'),
        axios.get('http://localhost:5000/api/gold/products'),
        axios.get('http://localhost:5000/api/gold/sales'),
        axios.get('http://localhost:5000/api/gold/summary'),
      ])

      setCustomers(custRes.data)
      setProducts(prodRes.data)
      setSales(salesRes.data)
      setSummary(summaryRes.data)
    } catch (err) {
      console.error('Failed to fetch gold data', err)
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
    return sales
  }, [activeTab, customers, products, sales])

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
              }}>
              Sales
            </button>
          </div>

          <div className='right-controls' />
        </div>

        {/* Table */}
        {loading ? (
          <p className='loading'>Loading gold data...</p>
        ) : (
          <>
            <DataTable data={displayedData} />

            {visibleCount < activeRawData.length && (
              <div className='load-more'>
                <button onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>Load more</button>
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
