import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function CustomerAnalytics() {
  const [topCustomers, setTopCustomers] = useState([])
  const [salesByCountry, setSalesByCountry] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/top-customers?limit=10')
      .then((res) => setTopCustomers(res.data))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/sales-by-country')
      .then((res) => setSalesByCountry(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      {/* TABLE: Top Customers by Sales */}
      <h3>Top Customers by Sales</h3>
      <div className='table-wrapper' style={{ marginBottom: '2rem' }}>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((c, idx) => (
              <tr key={idx}>
                <td>{c.first_name}</td>
                <td>₹ {c.total_sales.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHART: Sales by Country */}
      <h3>Sales by Country</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={salesByCountry}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='country' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='total_sales' fill='#22c55e' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
