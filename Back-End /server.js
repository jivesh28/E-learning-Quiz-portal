import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginSignUp from "./routes/loginSignUp.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import AdminRoutes from "./routes/AdminRoutes.js";

const app = express();
const PORT = 8080;

dotenv.config();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/api/login", loginSignUp);
app.use("/api/user", userRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
