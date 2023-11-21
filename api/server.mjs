import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.mjs';
import authRouter from './routes/auth.route.mjs'
import doctorRouter from './routes/doctor.route.mjs'
import cookieParser from "cookie-parser";

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to db");
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Interntal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

