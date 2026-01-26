import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function ProductAnalytics() {
  const [topBySales, setTopBySales] = useState([])
  const [topByQty, setTopByQty] = useState([])
  const [salesByCategory, setSalesByCategory] = useState([])
  const COLORS = ['#2563eb', '#22c55e', '#f97316', '#e11d48', '#8b5cf6']

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/gold/analytics/top-products-by-sales?limit=10')
      .then((res) => setTopBySales(res.data))
      .catch((err) => console.error(err))

    axios
      .get('http://localhost:5000/api/gold/analytics/top-products-by-quantity?limit=10')
      .then((res) => setTopByQty(res.data))
      .catch((err) => console.error(err))

    axios
      .get('http://localhost:5000/api/gold/analytics/sales-by-category')
      .then((res) => setSalesByCategory(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      {/* CHART: Top Products by Sales */}
      <h3>Top Products by Sales</h3>
      <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <BarChart data={topBySales}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='product_name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='total_sales' fill='#2563eb' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE: Top Products by Quantity */}
      <h3>Top Products by Quantity</h3>
      <div className='table-wrapper' style={{ marginBottom: '2rem' }}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {topByQty.map((p, idx) => (
              <tr key={idx}>
                <td>{p.product_name}</td>
                <td>{p.total_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PIE CHART: Sales by Category */}
      <h3>Sales by Category</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={salesByCategory} dataKey='total_sales' nameKey='category' cx='50%' cy='50%' outerRadius={100} label>
              {salesByCategory.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
