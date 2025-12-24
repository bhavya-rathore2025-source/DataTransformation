import 'dotenv/config'
import sql from 'mssql'

const config = {
  user: 'node_user',
  password: 'StrongPass@123',
  server: 'DESKTOP-5EU8KIE',
  database: 'DataWarehouse',
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
}

export const poolPromise = new sql.ConnectionPool(config)
poolPromise
  .connect()
  .then(() => {
    console.log('✅ Connected to SQL Server (SQL Auth)')
  })
  .catch((err) => {
    console.error('❌', err)
    process.exit(1)
  })
