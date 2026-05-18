// import dotenv from "dotenv";
import 'dotenv/config';

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import leadRoutes from "./routes/lead.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and url: http://localhost:${PORT}`);
});