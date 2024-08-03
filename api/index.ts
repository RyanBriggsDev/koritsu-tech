import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { login, register } from "./routes/users";
import middleware from "./middleware/middleware";

const app = express();
const PORT = process.env.PORT || 8080;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Body parsing middleware
app.use(express.json());

// Middleware
app.use((req, res, next) => {
  if (req.path === "/api/login" || req.path === "/api/register") {
    return next();
  }
  middleware(req, res, next);
});

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

// Dummy protected route
app.get("/api/protected", (req: Request, res: Response) => {
  res.json({ message: "This is a protected route" });
});

// Start server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

module.exports = app;
