import express from 'express'
import colors from 'colors' // colors
import connectDB from './config/db.js' // the database
import sampleRoutes from './routes/sampleRoutes.js' // routes
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js' // error handler
import dotenv from 'dotenv' // .env
dotenv.config()
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

//   @connect db
connectDB()
//   end


const port = process.env.PORT
const app = express()

//   @middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//   @end


//   @main route
app.use('/api/sample', sampleRoutes )
app.use('/api/users', userRoutes )
//   @end

//to use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//production
if(process.env.NODE_ENV === 'production'){
     app.use(express.static(path.join(__dirname, '../client/build')))
     app.get('*', (req, res) => 
          res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
     app.get('/', (req, res) => res.send('please set to production'))
}

//   @errorhandler
app.use(errorHandler)
//   @end

app.listen(port,() => console.log(`server is running on port : ${port}`.brightCyan.underline))
