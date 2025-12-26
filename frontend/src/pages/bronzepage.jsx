import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export function BronzePage() {
  const navigate = useNavigate()
  const [bronze, setBronze] = useState()
  const fetchBronze = async () => {
    const response = await axios.get('http://localhost:5000/api/bronze/customers')
    setBronze(response.data)
    console.log(response.data)
  }
  return (
    <>
      <button onClick={fetchBronze}>Show data</button>
      <button onClick={() => navigate('/')}>Back</button>
    </>
  )
}
