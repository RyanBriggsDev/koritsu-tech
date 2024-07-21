import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.get("/login", (req: Request, res: Response) => {
  // Ideally, you would handle login logic here
  res.json({ token: "test123" });
});

// Server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}/login`);
});
