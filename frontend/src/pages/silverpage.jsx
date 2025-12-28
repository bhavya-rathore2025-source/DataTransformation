import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataTable from '../components/DataTable'
import '../styles/silverpage.css'
import '../styles/common.css'

const PAGE_SIZE = 100

export function SilverPage() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('customers')
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [summary, setSummary] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const [custRes, prodRes, summaryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/silver/customers'),
        axios.get('http://localhost:5000/api/silver/products'),
        axios.get('http://localhost:5000/api/silver/summary'),
      ])

      setCustomers(custRes.data)
      setProducts(prodRes.data)
      setSummary(summaryRes.data)
    } catch (err) {
      console.error('Failed to fetch silver data', err)
    } finally {
      setLoading(false)
    }
  }

  const activeData = activeTab === 'customers' ? customers : products
  const displayedData = activeData.slice(0, visibleCount)

  return (
    <div className='layer-page silver-page'>
      {/* LEFT */}
      <div className='layer-left'>
        {/* Navigation + Tabs */}
        <div className='tabs-row'>
          <div className='left-controls'>
            <button className='dashboard-arrow' onClick={() => navigate('/')} title='Back to Dashboard'>
              ←
            </button>
            <button className='layer-nav-btn bronze' onClick={() => navigate('/bronze')}>
              Bronze
            </button>
          </div>

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
          <div className='right-controls'>
            <button className='layer-nav-btn gold' onClick={() => navigate('/gold')}>
              Gold
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className='loading'>Loading silver data...</p>
        ) : (
          <>
            <DataTable data={displayedData} />

            {visibleCount < activeData.length && (
              <div className='load-more'>
                <button onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>Load more</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className='layer-right'>
        <h3>Summary</h3>

        {summary && (
          <>
            <div className='summary-block'>
              <p>
                <strong>Layer:</strong> Silver
              </p>
              <p>
                <strong>Dataset:</strong> {activeTab}
              </p>
              <p>
                <strong>Bronze Records:</strong> {summary.bronzeTotal}
              </p>
              <p>
                <strong>Silver Records:</strong> {summary.silverTotal}
              </p>
              <p>
                <strong>Removed Records:</strong> {summary.removedRecords}
              </p>
            </div>

            <div className='summary-block'>
              <h4>Cleaning Applied</h4>
              <p>Trimmed strings: {summary.trimmedStrings}</p>
              <p>Date corrections: {summary.dateCorrections}</p>
            </div>
          </>
        )}

        <div className='summary-text'>
          <h4>Silver Layer</h4>
          <p>
            This layer contains cleaned and standardized data. Invalid records have been removed and data consistency has been enforced to make the
            dataset analysis-ready.
          </p>
        </div>

        <div className='status'>
          <h4>Data Quality</h4>
          <p className='status-ok'>✔ Clean</p>
        </div>
      </div>
    </div>
  )
}
