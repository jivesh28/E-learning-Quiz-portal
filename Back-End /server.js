import express from "express";
import cors from "cors";        
dotenv.config();
import loginSignUp from "./routes/loginSignUp";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import AdminRoutes from "./routes/AdminRoutes";
const PORT = 8080;

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
