//import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import colors from 'colors'
// import productRoutes from './routes/productRoutes.js'
 import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'
//import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'
import { createCheckoutSesssion } from './controllers/checkOut.js'






 dotenv.config()

 connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors({origin: true}))

app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/', checkoutRoutes)

app.post('/create-checkout-session', createCheckoutSesssion)

//app.get('*',(req, res) => res.send('Hello World'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold))



