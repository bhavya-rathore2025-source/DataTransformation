import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <p>Welocme to home page</p>
      <button onClick={() => navigate('/about')}>Go to About</button>
      <button onClick={() => navigate('/bronze')}>Go to Bronze</button>
    </>
  )
}
