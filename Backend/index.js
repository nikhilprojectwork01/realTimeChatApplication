import express from "express";
import dotenv from 'dotenv';
import connectDb from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/MessageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({})


//middleware this middleware required before parsing the data 
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
}

app.use(cors(corsOptions));

//routing 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute)

server.listen(port, () => {
  connectDb();
  console.log(`Connection Establish with the port ${port}`)
}) 