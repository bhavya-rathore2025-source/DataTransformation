import axios from 'axios'
import { useEffect, useState } from 'react'
export function AboutPage() {
  const [bronze, setBronze] = useState()
  const fetchBronze = async () => {
    const response = await axios.get('http://localhost:5000/api/bronze/customers')
    setBronze(response.data)
    console.log(response.data)
  }

  return (
    <>
      <section className='project-overview'>
        <h1>Project Overview</h1>

        <p>
          This project is built to demonstrate how raw data can be transformed into clean, structured, and analysis-ready data using a layered data
          architecture.
        </p>

        <p>
          The backend handles data processing and transformation across Bronze, Silver, and Gold layers using SQL Server, while Node.js and Express
          expose APIs to access each stage of the data.
        </p>

        <p>
          A React-based frontend is used to fetch and display the transformed data, allowing users to visually explore how data improves at each stage
          of the pipeline.
        </p>
      </section>

      <button onClick={fetchBronze}>Bronze data</button>
    </>
  )
}
