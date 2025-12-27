import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'

export function Dashboard() {
  const navigate = useNavigate()

  return (
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
  )
}
