import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use('/api/auth', authRoutes);

app.use('/api/post',postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
