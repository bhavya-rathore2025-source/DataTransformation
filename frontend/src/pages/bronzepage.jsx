import { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from '../components/DataTable'
import '../styles/bronze.css'

const PAGE_SIZE = 100

export function BronzePage() {
  const [activeTab, setActiveTab] = useState('customers')
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [custRes, prodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/bronze/customers'),
        axios.get('http://localhost:5000/api/bronze/products'),
      ])
      setCustomers(custRes.data)
      setProducts(prodRes.data)
    } catch (err) {
      console.error('Failed to fetch bronze data', err)
    } finally {
      setLoading(false)
    }
  }

  const activeData = activeTab === 'customers' ? customers : products
  const displayedData = activeData.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  return (
    <div className='bronze-page'>
      {/* LEFT SIDE */}
      <div className='bronze-left'>
        {/* Tabs */}
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
        </div>

        {/* Table */}
        {loading ? (
          <p className='loading'>Loading raw bronze data...</p>
        ) : (
          <>
            <DataTable data={displayedData} />

            {visibleCount < activeData.length && (
              <div className='load-more'>
                <button onClick={loadMore}>Load more</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className='bronze-right'>
        <h3>Summary</h3>

        <div className='summary-block'>
          <p>
            <strong>Layer:</strong> Bronze
          </p>
          <p>
            <strong>Dataset:</strong> {activeTab}
          </p>
          <p>
            <strong>Total Rows:</strong> {activeData.length}
          </p>
          <p>
            <strong>Rows Shown:</strong> {displayedData.length}
          </p>
        </div>

        <div className='summary-text'>
          <h4>Bronze Layer</h4>
          <p>
            This layer contains raw data ingested directly from source systems. No cleaning, validation, or transformations have been applied. Data
            quality issues are intentionally preserved.
          </p>
        </div>

        <div className='status'>
          <h4>Pipeline Status</h4>
          <p className='status-ok'>● Ingestion Complete</p>
        </div>

        <div className='future-note'>
          <small>Data quality metrics will be available in Silver and Gold layers.</small>
        </div>
      </div>
    </div>
  )
}
