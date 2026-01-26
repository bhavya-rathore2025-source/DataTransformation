import { useState } from 'react'
import '../styles/visualization.css'
import { SalesAnalytics } from '../components/SalesAnalytics'

export function Visualization() {
  const [activeTab, setActiveTab] = useState('sales')

  return (
    <div className='visualization-container'>
      {/* Page Heading */}
      <h1>Data Visualization</h1>
      <p className='subtitle'>Insights derived from Gold layer analytics</p>

      {/* Tabs */}
      <div className='viz-tabs'>
        <button className={activeTab === 'sales' ? 'active' : ''} onClick={() => setActiveTab('sales')}>
          Sales Analytics
        </button>

        <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
          Customer Analytics
        </button>

        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
          Product Analytics
        </button>
      </div>

      {/* Content Area */}
      <div className='viz-content'>
        {activeTab === 'sales' && (
          <div className='viz-section'>
            <h2>Sales Analytics</h2>
            <p>Sales trends and performance over time.</p>
            <SalesAnalytics />
          </div>
        )}

        {activeTab === 'customers' && (
          <div className='viz-section'>
            <h2>Customer Analytics</h2>
            <p>Top customers and geographic distribution.</p>
            {/* charts will go here */}
          </div>
        )}

        {activeTab === 'products' && (
          <div className='viz-section'>
            <h2>Product Analytics</h2>
            <p>Top products, quantities, and categories.</p>
            {/* charts will go here */}
          </div>
        )}
      </div>
    </div>
  )
}
