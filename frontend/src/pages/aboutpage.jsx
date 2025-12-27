import { useNavigate } from 'react-router-dom'

import '../styles/aboutpage.css'

export function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className='about-container'>
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

        <div className='button-group'>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </section>
    </div>
  )
}
