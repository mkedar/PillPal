import  Express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.mjs';

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to db");
})
.catch((err) => {
  console.log(err);
});

const app = Express();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})

app.use("/api/user", userRouter);