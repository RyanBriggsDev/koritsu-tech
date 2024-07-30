import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { login, register } from "./routes/users";

const app = express();
const PORT = process.env.PORT || 8080;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Body parsing middleware
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
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

module.exports = app;
