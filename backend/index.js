import express from 'express'
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRouter from './router/user.router.js';
import mediRouter from './router/medicine.router.js';
import docterRouter from './router/doctor.router.js';
import orderRouter from './router/order.router.js';
import cartRouter from './router/cart.router.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


const app = express()

dotenv.config();


app.use(express.json()); // most importent

// midlle layer
app.use(cookieParser());

app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods:"GET,PUT,POST,DELETE",
  allowedHeaders:["Content-Type" , "Authoriztion"],
}))

try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log("mongodb connected")
} catch (error) {
    console.log(error);
}
//router
app.use("/user", userRouter) //for user
app.use("/medicine", mediRouter)
app.use("/doctor", docterRouter)
app.use("/order", orderRouter )
app.use("/cart", cartRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })