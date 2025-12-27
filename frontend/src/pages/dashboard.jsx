import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import '../styles/aboutpage.css'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <div className='layer-container'>
        <div className='layer-card bronze' onClick={() => navigate('/bronze')}>
          <h2>Bronze Layer</h2>
          <p className='subtitle'>Raw Data</p>
          <p className='desc'>Ingested directly from source systems</p>
          <span>View Raw Data →</span>
        </div>

        <div className='layer-card silver' onClick={() => navigate('/silver')}>
          <h2>Silver Layer</h2>
          <p className='subtitle'>Cleaned Data</p>
          <p className='desc'>Nulls & duplicates removed</p>
          <span>View Clean Data →</span>
        </div>

        <div className='layer-card gold' onClick={() => navigate('/gold')}>
          <h2>Gold Layer</h2>
          <p className='subtitle'>Business Ready</p>
          <p className='desc'>Aggregated for analytics</p>
          <span>View Final Data →</span>
        </div>
      </div>
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
            A React-based frontend is used to fetch and display the transformed data, allowing users to visually explore how data improves at each
            stage of the pipeline.
          </p>
        </section>
      </div>
    </>
  )
}
