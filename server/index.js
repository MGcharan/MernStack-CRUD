import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
import connectDB from "./db.js";
import router from "./Router/userRouter.js";
import { useRouter } from "./Router/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// router connect
app.use("/api", router);
app.use("/auth", useRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
