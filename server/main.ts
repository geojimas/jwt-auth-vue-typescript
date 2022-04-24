// Libraries
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { json } from 'body-parser'
// import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

//Error handler
import { handleErrors } from './middleware/errorHandler'
// Database
import { connectDB } from './database/db'
// Router
import { router } from './routes/router'

const app: Application = express()

// Middlewares
app.use(
  cors({
    credentials: true,
    // frontend URL's
    origin: ['http://localhost:3000'],
  })
)

app.use(helmet())
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
// api prefix
app.use('/api', router)
app.use(handleErrors)

if (!process.env.PORT) {
  process.exit(1)
}

if ((process.env.NODE_ENV as string) !== 'production') {
  app.use(morgan('dev'))

  /*ENABLE THIS FOR DEPLOYMENT */

  // app.use(express.static(path.join(__dirname, './dist')))
  // app.get('/*', (_req, res) => {
  //   res.sendFile(path.join(__dirname, './dist', 'index.html'))
  // })
}

// call and connect to Database
connectDB()

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
  console.log('-----------------------------')
  console.log(`server start running at port ${process.env.PORT}`)
  console.log(`Server is Live here -> http://localhost:${process.env.PORT}/api/dashboard`)
})
