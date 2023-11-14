import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.mjs';
import authRouter from './routes/auth.route.mjs'

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to db");
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

