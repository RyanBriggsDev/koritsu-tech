import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { login, register } from "./routes/users";

const app = express();
const PORT = process.env.PORT || 8080;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routes
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "CORS is working" });
});

// Login
app.post("/api/login", async (req: Request, res: Response) => {
  login(req, res);
});

// Register
app.post("/api/register", async (req: Request, res: Response) => {
  register(req, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
