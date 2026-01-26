import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SalesAnalytics() {
  const [trendData, setTrendData] = useState([])
  const [kpis, setKpis] = useState(null)

  // Fetch sales over time
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/sales-over-time')
      .then((res) => {
        const formatted = res.data.map((row) => ({
          period: `${row.order_year}-${String(row.order_month).padStart(2, '0')}`,
          total_sales: row.total_sales,
          total_orders: row.total_orders,
        }))
        setTrendData(formatted)
      })
      .catch((err) => console.error(err))
  }, [])

  // Fetch sales KPIs
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/sales-kpis')
      .then((res) => setKpis(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      {/* KPI SECTION */}
      {kpis && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div className='kpi-box'>
            <p>Total Sales</p>
            <h4>₹ {kpis.total_sales.toLocaleString()}</h4>
          </div>
          <div className='kpi-box'>
            <p>Total Orders</p>
            <h4>{kpis.total_orders}</h4>
          </div>
          <div className='kpi-box'>
            <p>Total Quantity</p>
            <h4>{kpis.total_quantity}</h4>
          </div>
          <div className='kpi-box'>
            <p>Avg Order Value</p>
            <h4>₹ {Math.round(kpis.avg_order_value)}</h4>
          </div>
        </div>
      )}

      {/* Chart 1: Sales Over Time */}
      <h3>Sales Over Time</h3>
      <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='period' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='total_sales' stroke='#2563eb' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Orders Per Month */}
      <h3>Orders Per Month</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='period' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='total_orders' fill='#22c55e' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
