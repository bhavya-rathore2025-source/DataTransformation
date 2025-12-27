export default function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>
  }

  const headers = Object.keys(data[0])

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((key) => (
                <td key={key} title={row[key]}>
                  {row[key] === null || row[key] === '' ? 'NULL' : String(row[key]).length > 30 ? String(row[key]).slice(0, 30) + '...' : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
