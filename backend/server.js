const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')

dotenv.config()

const fallbackEnvPath = path.resolve(__dirname, '../frontend/.env')
if (!process.env.MONGODB_URI && fs.existsSync(fallbackEnvPath)) {
  dotenv.config({ path: fallbackEnvPath })
}

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'].filter(
      Boolean,
    ),
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'curalink-auth' })
})

app.use('/api/auth', authRoutes)

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Server error'
  res.status(statusCode).json({ message })
})

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Curalink auth API listening on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start backend:', error.message)
    process.exit(1)
  }
}

start()
