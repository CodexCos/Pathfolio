import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import authRoute from "./routes/authRoute.js";
import portfolioRouter from "./routes/portfolioRoute.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", authRoute);
app.use("/api/portfolio", portfolioRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on PORT:${PORT}`);
});
