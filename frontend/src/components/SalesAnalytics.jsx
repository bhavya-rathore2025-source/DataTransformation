import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SalesAnalytics() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/sales-over-time')
      .then((res) => {
        const formatted = res.data.map((row) => ({
          period: `${row.order_year}-${String(row.order_month).padStart(2, '0')}`,
          total_sales: row.total_sales,
          total_orders: row.total_orders,
        }))
        setData(formatted)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      {/* Chart 1: Sales Over Time */}
      <h3>Sales Over Time</h3>
      <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
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
          <BarChart data={data}>
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
